import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULT_DIFFICULTY = 5
const GEMINI_MODEL = 'gemini-2.5-flash'
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`

// Reference table for AI estimation
const ESTIMATION_PROMPT = `You are an academic task estimator. Estimate the time (in minutes) and difficulty (1-10 scale) for this assignment.

Reference guide:
| Task Type | Minutes | Difficulty |
|-----------|---------|------------|
| Math worksheet (10-20 problems) | 20 | 3 |
| Math homework (30-40 problems) | 45 | 4 |
| Reading assignment (10-20 pages) | 30 | 2 |
| Reading textbook chapter | 45 | 3 |
| Short essay (1-2 pages) | 90 | 4 |
| Essay (3-5 pages) | 180 | 5 |
| Lab report | 120 | 5 |
| Research paper (5-10 pages) | 600 | 8 |
| Major research paper (10+ pages) | 900 | 9 |
| Programming assignment (simple) | 60 | 6 |
| Programming project (complex) | 240 | 8 |
| Study for quiz | 30 | 3 |
| Study for test | 90 | 5 |
| Study for final exam | 240 | 7 |
| Group project | 300 | 6 |
| Presentation preparation | 120 | 5 |
| Problem set (physics/chemistry) | 60 | 6 |

Task: TASK_HERE

Reply with ONLY two numbers separated by comma: minutes,difficulty
Example: 45,4`

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Returns a date string (YYYY-MM-DD) for 2 days from now
 */
function getDefaultDueDate() {
  const date = new Date()
  date.setDate(date.getDate() + 2)
  return date.toISOString().split('T')[0]
}

/**
 * Calls Gemini AI to estimate task duration and difficulty
 */
async function getAIEstimate(title, description = '') {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY is not set!')
    return null
  }

  console.log('🔑 API Key found, calling Gemini...')

  const taskInfo = description ? `${title}: ${description}` : title
  const prompt = ESTIMATION_PROMPT.replace('TASK_HERE', taskInfo)

  try {
    const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 200, temperature: 0 }
      })
    })

    const data = await res.json()
    console.log('📦 Gemini response:', JSON.stringify(data, null, 2))

    if (data.error) {
      console.error('❌ Gemini API error:', data.error)
      return null
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
    console.log('📝 Raw AI text:', text)

    // Try to extract numbers (format: "minutes,difficulty" or just numbers)
    const cleanText = text.trim().replace(/[^\d,]/g, '') // Remove all non-digits and non-commas
    const parts = cleanText.split(',').filter(Boolean)

    console.log('🔢 Extracted parts:', parts)

    if (parts.length >= 2) {
      const minutes = Math.min(1440, Math.max(5, parseInt(parts[0], 10)))
      const difficulty = Math.min(10, Math.max(1, parseInt(parts[1], 10)))
      console.log('✅ Parsed result:', { minutes, difficulty })
      return { minutes, difficulty }
    }

    // Fallback: try to extract any numbers
    const numbers = text.match(/\d+/g)
    if (numbers && numbers.length >= 2) {
      const minutes = Math.min(1440, Math.max(5, parseInt(numbers[0], 10)))
      const difficulty = Math.min(10, Math.max(1, parseInt(numbers[1], 10)))
      console.log('✅ Parsed result (fallback):', { minutes, difficulty })
      return { minutes, difficulty }
    }

    if (numbers && numbers.length === 1) {
      const minutes = Math.min(1440, Math.max(5, parseInt(numbers[0], 10)))
      console.log('⚠️ Only got minutes:', minutes)
      return { minutes, difficulty: DEFAULT_DIFFICULTY }
    }

    console.warn('❌ Could not extract numbers from:', text)
    return null

  } catch (err) {
    console.error('❌ Fetch error:', err.message)
    return null
  }
}

/**
 * Fallback estimate when AI is unavailable
 */
function getFallbackEstimate(text = '') {
  const words = (text || '').trim().split(/\s+/).filter(Boolean).length
  // Base 30 minutes + 2 minutes per word, rounded to nearest 5
  const minutes = Math.max(30, Math.round((30 + words * 2) / 5) * 5)
  return Math.min(480, minutes)
}

/**
 * Format assignment row from database
 */
function formatAssignment(row) {
  return {
    id: row.id,
    title: row.title,
    dueDate: row.dueDate,
    difficulty: row.difficulty ?? DEFAULT_DIFFICULTY,
    estimatedMinutes: row.estimatedMinutes,
    description: row.description,
    completed: Boolean(row.completed)
  }
}

// ============================================================================
// API ROUTE HANDLERS
// ============================================================================

/**
 * GET /api/assignments - Fetch all assignments for the authenticated user
 */
export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: assignments, error } = await supabase
      .from('assignments')
      .select('*, classes(name, color)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    // Format for frontend compatibility
    const formatted = (assignments || []).map(a => ({
      id: a.id,
      title: a.title,
      dueDate: a.due_date,
      difficulty: a.difficulty ?? DEFAULT_DIFFICULTY,
      estimatedMinutes: a.estimated_minutes,
      completed: a.completed,
      className: a.classes?.name,
      classColor: a.classes?.color,
      priority: a.priority
    }))

    return NextResponse.json(formatted)
  } catch (error) {
    console.error('Error fetching assignments:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

/**
 * POST /api/assignments - Create new assignment
 */
export async function POST(request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, dueDate, description, classId } = await request.json()

    // Default due date: 2 days from now
    const finalDueDate = dueDate || getDefaultDueDate()

    // Get AI estimate with title and description
    const aiResult = await getAIEstimate(title, description)

    // Use AI values or fallbacks
    const minutes = aiResult?.minutes ?? getFallbackEstimate(`${title} ${description || ''}`)
    const difficulty = aiResult?.difficulty ?? DEFAULT_DIFFICULTY

    console.log('Assignment created:', { title, minutes, difficulty, finalDueDate })

    // Insert into Supabase
    const { data: newAssignment, error } = await supabase
      .from('assignments')
      .insert({
        user_id: user.id,
        title,
        due_date: finalDueDate,
        difficulty,
        estimated_minutes: minutes,
        class_id: classId || null,
        completed: false
      })
      .select()
      .single()

    if (error) throw error

    // Return created assignment
    return NextResponse.json({
      id: newAssignment.id,
      title: newAssignment.title,
      dueDate: newAssignment.due_date,
      difficulty: newAssignment.difficulty,
      estimatedMinutes: newAssignment.estimated_minutes,
      completed: newAssignment.completed
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating assignment:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

/**
 * PATCH /api/assignments - Update assignment completion status
 */
export async function PATCH(request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id, completed } = await request.json()

    const { data: updated, error } = await supabase
      .from('assignments')
      .update({ completed })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) throw error
    if (!updated) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json({
      id: updated.id,
      title: updated.title,
      dueDate: updated.due_date,
      difficulty: updated.difficulty,
      estimatedMinutes: updated.estimated_minutes,
      completed: updated.completed
    })
  } catch (error) {
    console.error('Error updating assignment:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

/**
 * DELETE /api/assignments - Remove assignment
 */
export async function DELETE(request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await request.json()

    const { error } = await supabase
      .from('assignments')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) throw error

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error deleting assignment:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
