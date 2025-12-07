'use client'

import { useState, useEffect } from 'react'

export default function WorkloadBalanceWidget() {
  const [loading, setLoading] = useState(true)
  const [workloadData, setWorkloadData] = useState(null)
  const [procrastinationRisks, setProcrastinationRisks] = useState([])
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [workloadRes, risksRes] = await Promise.all([
        fetch('/api/workload-balance'),
        fetch('/api/procrastination-check'),
      ])

      if (workloadRes.ok) {
        const data = await workloadRes.json()
        setWorkloadData(data)
      }

      if (risksRes.ok) {
        const risks = await risksRes.json()
        setProcrastinationRisks(Array.isArray(risks) ? risks : [])
      }
    } catch (error) {
      console.error('Error loading workload data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getBalanceColor = (score) => {
    if (score >= 70) return 'text-teal-500'
    if (score >= 40) return 'text-amber-500'
    return 'text-rose-500'
  }

  const getBalanceBg = (score) => {
    if (score >= 70) return 'bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/30 border-teal-200 dark:border-teal-700'
    if (score >= 40) return 'bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 border-amber-200 dark:border-amber-700'
    return 'bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-900/30 dark:to-orange-900/30 border-rose-200 dark:border-rose-700'
  }

  const getRiskColor = (level) => {
    switch (level) {
      case 'critical': return 'bg-rose-500 text-white'
      case 'high': return 'bg-amber-500 text-white'
      case 'medium': return 'bg-sky-400 text-white'
      default: return 'bg-teal-200 dark:bg-teal-700 text-teal-700 dark:text-teal-300'
    }
  }

  const getRiskIcon = (level) => {
    switch (level) {
      case 'critical': return '🌊'
      case 'high': return '⛈️'
      case 'medium': return '🌧️'
      default: return '☀️'
    }
  }

  if (loading) {
    return (
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-cyan-200 dark:border-cyan-700">
        <div className="animate-pulse">
          <div className="h-4 bg-cyan-200 dark:bg-cyan-700 rounded w-3/4 mb-2"></div>
          <div className="h-8 bg-cyan-200 dark:bg-cyan-700 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  const highRisks = procrastinationRisks.filter(r => r.riskLevel === 'critical' || r.riskLevel === 'high')

  return (
    <div className="space-y-4">
      {/* Workload Balance Score - Ocean Tidal Gauge */}
      {workloadData && (
        <div className={`rounded-xl p-4 border ${getBalanceBg(workloadData.summary.balanceScore)}`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              🌊 Tidal Balance
            </h3>
            <span className={`text-2xl font-bold ${getBalanceColor(workloadData.summary.balanceScore)}`}>
              {workloadData.summary.balanceScore}%
            </span>
          </div>

          {/* Progress bar - Wave style */}
          <div className="h-3 bg-cyan-100 dark:bg-cyan-900/50 rounded-full overflow-hidden mb-2">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                workloadData.summary.balanceScore >= 70
                  ? 'bg-gradient-to-r from-teal-400 to-emerald-500'
                  : workloadData.summary.balanceScore >= 40
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500'
                  : 'bg-gradient-to-r from-rose-400 to-orange-500'
              }`}
              style={{ width: `${workloadData.summary.balanceScore}%` }}
            />
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            {workloadData.summary.recommendation}
          </p>

          {workloadData.summary.overloadedDays > 0 && (
            <div className="mt-2 text-sm text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <span>⛈️</span> {workloadData.summary.overloadedDays} stormy day{workloadData.summary.overloadedDays > 1 ? 's' : ''} ahead
            </div>
          )}

          {/* Suggestions */}
          {workloadData.suggestions.length > 0 && (
            <div className="mt-3 pt-3 border-t border-cyan-200 dark:border-cyan-700">
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-sm text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 flex items-center gap-1"
              >
                {expanded ? '🔽' : '▶️'} View {workloadData.suggestions.length} navigation tip{workloadData.suggestions.length > 1 ? 's' : ''}
              </button>

              {expanded && (
                <div className="mt-2 space-y-2">
                  {workloadData.suggestions.map((suggestion, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded-lg text-sm ${
                        suggestion.severity === 'high'
                          ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300'
                          : 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300'
                      }`}
                    >
                      🧭 {suggestion.message}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Procrastination Risks - Storm Warnings */}
      {highRisks.length > 0 && (
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-rose-200 dark:border-rose-800">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            ⛈️ Storm Warnings
          </h3>

          <div className="space-y-2">
            {highRisks.slice(0, 3).map((risk) => (
              <div
                key={risk.assignment.id}
                className="flex items-center justify-between p-2 bg-gradient-to-r from-rose-50 to-amber-50 dark:from-rose-900/20 dark:to-amber-900/20 rounded-lg border border-rose-200 dark:border-rose-700"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRiskColor(risk.riskLevel)}`}>
                      {getRiskIcon(risk.riskLevel)} {risk.riskLevel}
                    </span>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm truncate mt-1">
                    {risk.assignment.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {risk.assignment.classes?.name} • Due in {risk.daysUntilDue} day{risk.daysUntilDue !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="text-right text-xs text-gray-500 dark:text-gray-400">
                  <div>{risk.totalStudyMinutes}min</div>
                  <div>studied</div>
                </div>
              </div>
            ))}
          </div>

          {highRisks.length > 3 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              +{highRisks.length - 3} more storms brewing
            </p>
          )}
        </div>
      )}

      {/* All Clear State - Calm Seas */}
      {workloadData && workloadData.summary.balanceScore >= 70 && highRisks.length === 0 && (
        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl p-4 border border-teal-200 dark:border-teal-700 text-center">
          <div className="text-3xl mb-2">🏝️</div>
          <p className="text-teal-700 dark:text-teal-300 font-medium">Smooth sailing ahead!</p>
          <p className="text-sm text-teal-600 dark:text-teal-400">Keep riding these calm waves!</p>
        </div>
      )}
    </div>
  )
}

