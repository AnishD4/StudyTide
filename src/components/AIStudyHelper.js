'use client'

import { useState, useEffect } from 'react'

export default function AIStudyHelper({ assignment }) {
  const [showHelper, setShowHelper] = useState(false)
  const [suggestion, setSuggestion] = useState(null)
  const [chatMessages, setChatMessages] = useState([])
  const [userMessage, setUserMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('suggest') // 'suggest' | 'chat' | 'history'

  // Load chat history on mount
  useEffect(() => {
    if (showHelper && assignment?.id) {
      loadChatHistory()
    }
  }, [showHelper, assignment?.id])

  async function loadChatHistory() {
    try {
      const res = await fetch(`/api/ai-study-helper?assignmentId=${assignment.id}`)
      const messages = await res.json()
      if (Array.isArray(messages)) {
        setChatMessages(messages)
      }
    } catch (error) {
      console.error('Error loading chat history:', error)
    }
  }

  async function getSuggestions() {
    setLoading(true)
    try {
      const res = await fetch('/api/ai-study-helper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'suggest-materials',
          assignmentId: assignment.id,
          assignmentTitle: assignment.title
        })
      })
      const data = await res.json()
      setSuggestion(data.suggestion)
    } catch (error) {
      console.error('Error getting suggestions:', error)
    } finally {
      setLoading(false)
    }
  }

  async function sendMessage() {
    if (!userMessage.trim()) return

    const newMessage = { message_type: 'user', content: userMessage, created_at: new Date() }
    setChatMessages(prev => [...prev, newMessage])
    setUserMessage('')
    setLoading(true)

    try {
      const res = await fetch('/api/ai-study-helper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'chat',
          assignmentId: assignment.id,
          message: userMessage
        })
      })
      const data = await res.json()

      const aiMessage = { message_type: 'assistant', content: data.reply, created_at: new Date() }
      setChatMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setLoading(false)
    }
  }

  async function generateMaterial(type) {
    setLoading(true)
    try {
      const res = await fetch('/api/ai-study-helper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: type === 'flashcards' ? 'generate-flashcards' : 'generate-study-guide',
          assignmentId: assignment.id
        })
      })
      const data = await res.json()

      if (type === 'flashcards') {
        alert(`✅ Created ${data.flashcards?.length || 0} flashcards! Go to Flashcards page to review.`)
      } else {
        alert('✅ Study guide created! Go to Study Guides page to view.')
      }
    } catch (error) {
      console.error('Error generating material:', error)
      alert('❌ Failed to generate material')
    } finally {
      setLoading(false)
    }
  }

  if (!showHelper) {
    return (
      <button
        onClick={() => setShowHelper(true)}
        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-indigo-600 transition-all shadow-md flex items-center gap-2"
      >
        <span>🤖</span> AI Study Helper
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900/95 backdrop-blur-md rounded-2xl border border-white/20 w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900/60 to-indigo-900/60 border-b border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>🤖</span> AI Study Helper
              </h2>
              <p className="text-purple-300 text-sm">{assignment.title}</p>
            </div>
            <button
              onClick={() => setShowHelper(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setActiveTab('suggest')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'suggest'
                  ? 'bg-white/20 text-white'
                  : 'text-purple-300 hover:bg-white/10'
              }`}
            >
              💡 Suggestions
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'chat'
                  ? 'bg-white/20 text-white'
                  : 'text-purple-300 hover:bg-white/10'
              }`}
            >
              💬 Chat
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'history'
                  ? 'bg-white/20 text-white'
                  : 'text-purple-300 hover:bg-white/10'
              }`}
            >
              📜 History
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(80vh-200px)]">
          {/* Suggestions Tab */}
          {activeTab === 'suggest' && (
            <div className="space-y-4">
              {!suggestion ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">Get personalized study material suggestions from AI</p>
                  <button
                    onClick={getSuggestions}
                    disabled={loading}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all shadow-lg disabled:opacity-50"
                  >
                    {loading ? '🤔 Thinking...' : '✨ Get Suggestions'}
                  </button>
                </div>
              ) : (
                <>
                  <div className="bg-slate-800/60 rounded-xl p-4 border border-purple-500/20">
                    <p className="text-gray-200 whitespace-pre-wrap">{suggestion}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => generateMaterial('flashcards')}
                      disabled={loading}
                      className="px-4 py-3 bg-gradient-to-r from-cyan-900/60 to-teal-900/60 hover:from-cyan-800/70 hover:to-teal-800/70 text-white rounded-xl border border-cyan-500/30 transition-all disabled:opacity-50"
                    >
                      🃏 Generate Flashcards
                    </button>
                    <button
                      onClick={() => generateMaterial('study-guide')}
                      disabled={loading}
                      className="px-4 py-3 bg-gradient-to-r from-amber-900/60 to-orange-900/60 hover:from-amber-800/70 hover:to-orange-800/70 text-white rounded-xl border border-amber-500/30 transition-all disabled:opacity-50"
                    >
                      📝 Create Study Guide
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Chat Tab */}
          {activeTab === 'chat' && (
            <div className="space-y-4">
              <div className="space-y-3 mb-4">
                {chatMessages
                  .filter(m => m.message_type)
                  .map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.message_type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-xl p-3 ${
                          msg.message_type === 'user'
                            ? 'bg-purple-600/40 text-white'
                            : 'bg-slate-800/60 text-gray-200 border border-white/10'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800/60 rounded-xl p-3 border border-white/10">
                      <p className="text-gray-400">AI is thinking...</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask me anything about this assignment..."
                  className="flex-1 px-4 py-3 bg-slate-800/60 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none"
                  disabled={loading}
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !userMessage.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              {chatMessages.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No chat history yet. Start a conversation!</p>
              ) : (
                chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl p-3 border ${
                      msg.message_type === 'user'
                        ? 'bg-purple-600/20 border-purple-500/30'
                        : 'bg-slate-800/40 border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-400">
                        {msg.message_type === 'user' ? '👤 You' : '🤖 AI'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(msg.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-200 text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

