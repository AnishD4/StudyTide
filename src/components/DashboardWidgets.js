'use client'

import { useState, useEffect } from 'react'
import EmailComposer from './EmailComposer'

export default function DashboardWidgets() {
  const [showEmailComposer, setShowEmailComposer] = useState(false)
  const [procrastinationRisks, setProcrastinationRisks] = useState([])

  useEffect(() => {
    loadProcrastinationRisks()
  }, [])

  const loadProcrastinationRisks = async () => {
    try {
      const res = await fetch('/api/procrastination-check')
      if (res.ok) {
        const risks = await res.json()
        setProcrastinationRisks(Array.isArray(risks) ? risks.filter(r => r.riskLevel === 'critical' || r.riskLevel === 'high') : [])
      }
    } catch (error) {
      console.error('Error loading procrastination risks:', error)
    }
  }

  const getRiskColor = (level) => {
    switch (level) {
      case 'critical': return 'border-rose-500/60 bg-gradient-to-r from-rose-900/50 to-orange-900/50'
      case 'high': return 'border-amber-500/60 bg-gradient-to-r from-amber-900/50 to-yellow-900/50'
      default: return 'border-cyan-500/40 bg-cyan-900/30'
    }
  }

  return (
    <>
      {/* Procrastination Alerts - Storm Warning Style */}
      {procrastinationRisks.length > 0 && (
        <div className="bg-gradient-to-br from-rose-900/60 via-orange-900/50 to-amber-900/60 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-rose-500/30 mb-8 relative overflow-hidden">
          {/* Storm wave decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
            <svg viewBox="0 0 100 100" className="w-full h-full text-rose-400">
              <path d="M0,50 Q25,30 50,50 T100,50 V100 H0 Z" fill="currentColor"/>
            </svg>
          </div>

          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="text-2xl">⛈️</span> Storm Warning
              <span className="text-sm font-normal text-rose-200">- Assignments at risk!</span>
            </h3>
            <span className="text-sm text-rose-100 font-medium bg-rose-500/40 px-3 py-1 rounded-full border border-rose-400/30">
              {procrastinationRisks.length} alert{procrastinationRisks.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="space-y-3 relative z-10">
            {procrastinationRisks.slice(0, 3).map((risk) => (
              <div
                key={risk.assignment.id}
                className={`p-4 rounded-xl border-l-4 ${getRiskColor(risk.riskLevel)} backdrop-blur-sm transition-all hover:scale-[1.01]`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 ${
                        risk.riskLevel === 'critical' 
                          ? 'bg-rose-500 text-white' 
                          : 'bg-amber-500 text-slate-900'
                      }`}>
                        {risk.riskLevel === 'critical' ? '🌊 TSUNAMI' : '⚡ STORM'}
                      </span>
                      <span className="text-sm text-gray-300">
                        {risk.daysUntilDue} day{risk.daysUntilDue !== 1 ? 's' : ''} until due
                      </span>
                    </div>
                    <h4 className="font-semibold text-white">
                      {risk.assignment.name}
                    </h4>
                    <p className="text-sm text-gray-300">
                      {risk.assignment.classes?.name} • Only {risk.totalStudyMinutes} min studied
                    </p>
                  </div>
                  <a
                    href={`/classes/${risk.assignment.class_id}`}
                    className="px-4 py-2 text-sm bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-900 font-semibold rounded-lg hover:from-cyan-500 hover:to-teal-500 transition-all shadow-md hover:shadow-lg flex items-center gap-1"
                  >
                    <span>🏄</span> Dive In
                  </a>
                </div>
              </div>
            ))}
          </div>

          {procrastinationRisks.length > 3 && (
            <p className="text-sm text-rose-200 mt-3 text-center">
              +{procrastinationRisks.length - 3} more items need your attention
            </p>
          )}
        </div>
      )}

      {/* Quick Tools - Ocean Themed */}
      <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 mb-8 relative overflow-hidden">
        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 w-full h-16 opacity-10">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor" className="text-cyan-400"/>
          </svg>
        </div>

        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span className="text-2xl">🧭</span> Navigation Tools
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          <button
            onClick={() => setShowEmailComposer(true)}
            className="group flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-sky-900/60 to-cyan-900/60 hover:from-sky-800/70 hover:to-cyan-800/70 transition-all border border-sky-500/30 hover:border-sky-400/50 hover:shadow-lg hover:scale-105"
          >
            <span className="text-3xl mb-2 group-hover:animate-float">🐚</span>
            <span className="text-sm font-medium text-white">Message in Bottle</span>
            <span className="text-xs text-cyan-300">Email Teacher</span>
          </button>

          <a
            href="/calendar"
            className="group flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-violet-900/60 to-purple-900/60 hover:from-violet-800/70 hover:to-purple-800/70 transition-all border border-violet-500/30 hover:border-violet-400/50 hover:shadow-lg hover:scale-105"
          >
            <span className="text-3xl mb-2 group-hover:animate-float">⚓</span>
            <span className="text-sm font-medium text-white">Tidal Planner</span>
            <span className="text-xs text-violet-300">Balance Workload</span>
          </a>

          <a
            href="/progress"
            className="group flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-amber-900/60 to-yellow-900/60 hover:from-amber-800/70 hover:to-yellow-800/70 transition-all border border-amber-500/30 hover:border-amber-400/50 hover:shadow-lg hover:scale-105"
          >
            <span className="text-3xl mb-2 group-hover:animate-float">🏝️</span>
            <span className="text-sm font-medium text-white">Captain's Log</span>
            <span className="text-xs text-amber-300">Log Study</span>
          </a>

          <a
            href="/reflections"
            className="group flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-teal-900/60 to-emerald-900/60 hover:from-teal-800/70 hover:to-emerald-800/70 transition-all border border-teal-500/30 hover:border-teal-400/50 hover:shadow-lg hover:scale-105"
          >
            <span className="text-3xl mb-2 group-hover:animate-float">🪸</span>
            <span className="text-sm font-medium text-white">Coral Thoughts</span>
            <span className="text-xs text-teal-300">Add Reflection</span>
          </a>
        </div>
      </div>

      {/* Email Composer Modal */}
      <EmailComposer
        isOpen={showEmailComposer}
        onClose={() => setShowEmailComposer(false)}
      />
    </>
  )
}

