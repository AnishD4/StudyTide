import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const GEMINI_MODEL = 'gemini-2.5-flash'
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`

async function callGemini(prompt, maxTokens = 2000) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not configured')
  }

  const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: maxTokens, temperature: 0.7 }
    })
  })

  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
}

// GET - Fetch chat history for an assignment
export async function GET(request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const assignmentId = searchParams.get('assignmentId')

    let query = supabase
      .from('ai_chat_history')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true })

    if (assignmentId) {
      query = query.eq('assignment_id', assignmentId)
    }

    const { data: messages, error } = await query

    if (error) throw error

    return NextResponse.json(messages || [])
  } catch (error) {
    console.error('Error fetching chat history:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// POST - Generate study materials or chat with AI
export async function POST(request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { action, assignmentId, message, assignmentTitle, assignmentDescription } = await request.json()

    // Fetch assignment details if ID provided
    let assignment = null
    if (assignmentId) {
      const { data } = await supabase
        .from('assignments')
        .select('*, classes(name)')
        .eq('id', assignmentId)
        .eq('user_id', user.id)
        .single()

      assignment = data
    }

    // Build context for AI
    const context = assignment ? `
Assignment: ${assignment.title}
${assignment.classes?.name ? `Class: ${assignment.classes.name}` : ''}
Due Date: ${assignment.due_date}
Difficulty: ${assignment.difficulty}/10
` : `
Assignment: ${assignmentTitle || 'General Study'}
${assignmentDescription ? `Description: ${assignmentDescription}` : ''}
`

    let aiResponse = ''

    if (action === 'suggest-materials') {
      // Suggest what study materials would help
      const prompt = `You are a helpful study assistant. Based on this assignment, suggest what study materials would be most helpful:

${context}

Provide a short, friendly response suggesting:
1. Whether flashcards would help (and what topics)
2. Whether a study guide would help (and what to include)
3. Whether practice tests would help

Keep it brief and encouraging (2-3 sentences per suggestion).`

      aiResponse = await callGemini(prompt, 800)

      // Save AI response to chat history
      await supabase.from('ai_chat_history').insert({
        user_id: user.id,
        assignment_id: assignmentId,
        message_type: 'assistant',
        content: aiResponse,
        context: JSON.stringify({ action: 'suggest-materials', context })
      })

      return NextResponse.json({
        suggestion: aiResponse,
        assignmentId,
        actions: [
          { type: 'flashcards', label: '🃏 Generate Flashcards' },
          { type: 'study-guide', label: '📝 Create Study Guide' },
          { type: 'practice-test', label: '📋 Make Practice Test' }
        ]
      })
    }

    if (action === 'chat') {
      // Save user message
      await supabase.from('ai_chat_history').insert({
        user_id: user.id,
        assignment_id: assignmentId,
        message_type: 'user',
        content: message
      })

      // Get recent chat history for context
      const { data: recentMessages } = await supabase
        .from('ai_chat_history')
        .select('message_type, content')
        .eq('user_id', user.id)
        .eq('assignment_id', assignmentId || null)
        .order('created_at', { ascending: false })
        .limit(10)

      const chatHistory = (recentMessages || [])
        .reverse()
        .map(m => `${m.message_type === 'user' ? 'Student' : 'AI'}: ${m.content}`)
        .join('\n')

      const prompt = `You are a friendly, helpful study assistant. The student is working on this assignment:

${context}

Previous conversation:
${chatHistory}

Student: ${message}

Provide a helpful, encouraging response. If they ask for study materials, be specific about what you can help create.`

      aiResponse = await callGemini(prompt, 1000)

      // Save AI response
      await supabase.from('ai_chat_history').insert({
        user_id: user.id,
        assignment_id: assignmentId,
        message_type: 'assistant',
        content: aiResponse
      })

      return NextResponse.json({
        reply: aiResponse,
        assignmentId
      })
    }

    if (action === 'generate-flashcards') {
      const prompt = `Create 10 flashcards to help study for this assignment:

${context}

Return ONLY a JSON array of flashcards:
[
  {"front": "Question/Term", "back": "Answer/Definition"},
  ...
]

Make them focused on key concepts, terms, and ideas.`

      const response = await callGemini(prompt, 2000)
      const match = response.match(/\[[\s\S]*\]/)

      let flashcards = []
      if (match) {
        flashcards = JSON.parse(match[0])

        // Save flashcards to database
        const cardsToInsert = flashcards.map(card => ({
          user_id: user.id,
          topic: assignment?.title || assignmentTitle || 'Study Material',
          front: card.front,
          back: card.back
        }))

        await supabase.from('flashcards').insert(cardsToInsert)
      }

      return NextResponse.json({ flashcards })
    }

    if (action === 'generate-study-guide') {
      const prompt = `Create a comprehensive study guide for this assignment:

${context}

Include:
1. Key Concepts (bullet points)
2. Important Terms & Definitions
3. Main Topics to Focus On
4. Practice Questions (3-5)

Format with clear markdown headings and be thorough.`

      const guide = await callGemini(prompt, 3000)

      // Save study guide
      await supabase.from('study_guides').insert({
        user_id: user.id,
        topic: assignment?.title || assignmentTitle || 'Study Material',
        content: guide
      })

      return NextResponse.json({ guide })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })

  } catch (error) {
    console.error('AI study helper error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// DELETE - Clear chat history
export async function DELETE(request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { assignmentId } = await request.json()

    const { error } = await supabase
      .from('ai_chat_history')
      .delete()
      .eq('user_id', user.id)
      .eq('assignment_id', assignmentId)

    if (error) throw error

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error deleting chat history:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

