'use client'

import { useState, useEffect } from 'react'
import { CompassIcon } from '@/components/OceanIcons'
import DashboardWidgets from '@/components/DashboardWidgets'
import VantaWavesBackground from '@/components/VantaWavesBackground'

export default function DashboardPage() {
  const [recommendation, setRecommendation] = useState(null)
  const [dailyPlan, setDailyPlan] = useState(null)
  const [availableTime, setAvailableTime] = useState(180)
  const [loading, setLoading] = useState({ recommendation: true, plan: false })

  // Fetch "What should I study?" on load
  useEffect(() => {
    fetchRecommendation()
  }, [])

  async function fetchRecommendation() {
    setLoading(prev => ({ ...prev, recommendation: true }))
    try {
      const res = await fetch('/api/study-tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'what-to-study' })
      })
      const data = await res.json()
      setRecommendation(data)
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(prev => ({ ...prev, recommendation: false }))
    }
  }

  async function fetchDailyPlan() {
    setLoading(prev => ({ ...prev, plan: true }))
    try {
      const res = await fetch('/api/study-tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'daily-plan', availableMinutes: availableTime })
      })
      const data = await res.json()
      setDailyPlan(data)
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(prev => ({ ...prev, plan: false }))
    }
  }

  async function handlePrioritize() {
    try {
      await fetch('/api/study-tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'prioritize' })
      })
      fetchRecommendation()
    } catch (err) {
      console.error('Error:', err)
    }
  }

  return (
    <VantaWavesBackground className="min-h-screen">
      <main className="max-w-4xl mx-auto p-6 relative z-10">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-4xl animate-float">🌊</span>
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">
              Captain's Deck
            </h1>
            <span className="text-4xl animate-float" style={{ animationDelay: '0.5s' }}>⚓</span>
          </div>
          <p className="text-cyan-200 drop-shadow">Navigate your academic journey with StudyTide</p>
        </div>

        {/* Dashboard Widgets - Procrastination & Tools */}
        <DashboardWidgets />

        {/* What Should I Study? - Treasure Map Style */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white drop-shadow flex items-center gap-2">
              <span className="text-2xl">🗺️</span> Treasure to Discover
              <span className="text-sm font-normal text-cyan-200">- What to study next</span>
            </h2>
            <button
              onClick={fetchRecommendation}
              className="text-sm text-cyan-200 hover:text-white flex items-center gap-1 transition-colors bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>

          {loading.recommendation ? (
            <div className="rounded-2xl border border-white/20 bg-slate-900/60 backdrop-blur-md p-6 text-center shadow-xl">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-cyan-400 border-t-transparent"></div>
              <p className="mt-3 text-cyan-300">🔍 Scanning the seas for treasure...</p>
            </div>
          ) : recommendation ? (
            <div className="rounded-2xl border border-white/20 bg-slate-900/60 backdrop-blur-md p-6 relative overflow-hidden shadow-xl">
              {/* Decorative compass */}
              <div className="absolute top-4 right-4 opacity-20">
                <CompassIcon className="w-24 h-24 text-cyan-400" />
              </div>

              <p className="text-lg text-gray-100 mb-4 relative z-10">{recommendation.recommendation}</p>

              {recommendation.topPick && (
                <div className="bg-gradient-to-r from-teal-900/80 to-cyan-900/80 rounded-xl p-4 mb-4 border border-teal-500/30 relative z-10">
                  <div className="text-sm text-teal-300 mb-1 flex items-center gap-1">
                    <span>🏴‍☠️</span> X marks the spot:
                  </div>
                  <div className="text-xl font-bold text-teal-200">{recommendation.topPick}</div>
                  {recommendation.reason && (
                    <div className="text-sm text-teal-400 mt-1">{recommendation.reason}</div>
                  )}
                </div>
              )}

              {recommendation.urgent && recommendation.urgent.length > 0 && (
                <div className="mb-4 relative z-10">
                  <div className="text-sm text-rose-300 mb-2 flex items-center gap-1">
                    <span>🌊</span> Incoming Waves (Urgent):
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.urgent.map((task, i) => (
                      <span key={i} className="px-3 py-1 bg-rose-500/20 border border-rose-400/40 rounded-full text-sm text-rose-200">
                        {task}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {recommendation.motivation && (
                <p className="text-sm text-cyan-300 italic relative z-10">
                  🐚 {recommendation.motivation}
                </p>
              )}
            </div>
          ) : null}
        </section>

        {/* Auto-Prioritize - Lighthouse */}
        <section className="mb-8">
          <div className="rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-900/70 to-orange-900/70 backdrop-blur-md p-6 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-30">
              <span className="text-8xl">🏮</span>
            </div>

            <h2 className="text-lg font-semibold text-amber-100 mb-2 flex items-center gap-2">
              <span className="text-2xl">🗼</span> Lighthouse Guidance
            </h2>
            <p className="text-sm text-amber-200/80 mb-4">
              Let our lighthouse illuminate the path ahead - AI will analyze and sort your assignments by urgency.
            </p>
            <button
              onClick={handlePrioritize}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-slate-900 font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              ✨ Light the Way
            </button>
          </div>
        </section>

        {/* Daily Study Plan - Voyage Planner */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-white drop-shadow mb-4 flex items-center gap-2">
            <span className="text-2xl">⛵</span> Voyage Planner
            <span className="text-sm font-normal text-cyan-200">- Your daily study route</span>
          </h2>

          <div className="rounded-2xl border border-white/20 bg-slate-900/60 backdrop-blur-md p-6 relative overflow-hidden shadow-xl">
            <div className="flex items-end gap-4 mb-6 relative z-10">
              <div className="flex-1">
                <label className="block text-sm text-cyan-200 mb-2">⏱️ Sailing time available</label>
                <select
                  value={availableTime}
                  onChange={e => setAvailableTime(Number(e.target.value))}
                  className="w-full rounded-xl border border-cyan-500/40 bg-slate-800/80 px-4 py-2.5 text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                >
                  <option value={60}>1 hour - Quick sail</option>
                  <option value={120}>2 hours - Short voyage</option>
                  <option value={180}>3 hours - Day trip</option>
                  <option value={240}>4 hours - Long voyage</option>
                  <option value={300}>5 hours - Expedition</option>
                  <option value={480}>8 hours - Ocean crossing</option>
                </select>
              </div>
              <button
                onClick={fetchDailyPlan}
                disabled={loading.plan}
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-500 hover:to-teal-500 text-slate-900 font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 transform hover:scale-105"
              >
                {loading.plan ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Charting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <span>🧭</span> Chart Course
                  </span>
                )}
              </button>
            </div>

            {dailyPlan && (
              <div className="space-y-4 relative z-10">
                {dailyPlan.greeting && (
                  <p className="text-lg text-gray-100 flex items-center gap-2">
                    <span>👋</span> {dailyPlan.greeting}
                  </p>
                )}

                {dailyPlan.focus && (
                  <div className="bg-gradient-to-r from-sky-900/60 to-cyan-900/60 rounded-xl p-3 border border-sky-500/30">
                    <span className="text-sky-300">🎯 Today's destination: </span>
                    <span className="font-semibold text-white">{dailyPlan.focus}</span>
                  </div>
                )}

                {dailyPlan.tasks && dailyPlan.tasks.length > 0 && (
                  <div className="space-y-3">
                    {dailyPlan.tasks.map((task, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 bg-gradient-to-r from-cyan-900/40 to-teal-900/40 rounded-xl border border-cyan-500/20 hover:border-cyan-400/40 transition-all">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-teal-400 flex items-center justify-center font-bold text-slate-900 shadow-md">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-white">{task.title}</div>
                          <div className="text-sm text-gray-300">{task.reason}</div>
                        </div>
                        <div className="text-sm text-cyan-300 font-medium bg-cyan-500/20 px-3 py-1 rounded-full border border-cyan-500/30">
                          {task.duration} min
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {dailyPlan.tip && (
                  <div className="bg-gradient-to-r from-amber-900/50 to-yellow-900/50 border border-amber-500/30 rounded-xl p-4 text-sm">
                    <span className="text-amber-300">💡 Captain's tip: </span>
                    <span className="text-amber-200">{dailyPlan.tip}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Quick Links - Island Destinations */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-white drop-shadow mb-4 flex items-center gap-2">
            <span className="text-2xl">🏝️</span> Island Destinations
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href="/flashcards"
              className="group rounded-2xl border border-white/20 bg-slate-900/50 backdrop-blur-md p-5 hover:bg-slate-800/70 hover:shadow-lg hover:scale-105 transition-all text-center"
            >
              <div className="text-3xl mb-2 group-hover:animate-float">🐠</div>
              <div className="font-semibold text-white">Flashcards</div>
              <div className="text-xs text-cyan-300">Memory reef</div>
            </a>
            <a
              href="/study-guides"
              className="group rounded-2xl border border-white/20 bg-slate-900/50 backdrop-blur-md p-5 hover:bg-slate-800/70 hover:shadow-lg hover:scale-105 transition-all text-center"
            >
              <div className="text-3xl mb-2 group-hover:animate-float">📜</div>
              <div className="font-semibold text-white">Study Guides</div>
              <div className="text-xs text-cyan-300">Ancient scrolls</div>
            </a>
            <a
              href="/classes"
              className="group rounded-2xl border border-white/20 bg-slate-900/50 backdrop-blur-md p-5 hover:bg-slate-800/70 hover:shadow-lg hover:scale-105 transition-all text-center"
            >
              <div className="text-3xl mb-2 group-hover:animate-float">🏴‍☠️</div>
              <div className="font-semibold text-white">My Classes</div>
              <div className="text-xs text-cyan-300">Ship fleet</div>
            </a>
            <a
              href="/goals"
              className="group rounded-2xl border border-white/20 bg-slate-900/50 backdrop-blur-md p-5 hover:bg-slate-800/70 hover:shadow-lg hover:scale-105 transition-all text-center"
            >
              <div className="text-3xl mb-2 group-hover:animate-float">🏆</div>
              <div className="font-semibold text-white">Goals</div>
              <div className="text-xs text-amber-300">Treasure chest</div>
            </a>
          </div>
        </section>
      </main>
    </VantaWavesBackground>
  )
}
