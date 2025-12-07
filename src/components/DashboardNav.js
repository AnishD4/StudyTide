'use client'

import Link from 'next/link'
import NotificationBell from './NotificationBell'
import { WaveIcon, FishIcon } from './OceanIcons'

export default function DashboardNav({ user, children }) {
  return (
    <nav className="bg-gradient-to-r from-cyan-600 via-sky-600 to-teal-600 dark:from-cyan-900 dark:via-sky-900 dark:to-teal-900 shadow-lg border-b border-cyan-400/20 relative overflow-hidden">
      {/* Animated wave background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 left-0 w-[200%] h-8">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-full animate-wave">
            <path d="M0,30 C200,50 400,10 600,30 C800,50 1000,10 1200,30 L1200,60 L0,60 Z" fill="white"/>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center gap-2 group">
              <span className="text-2xl animate-float">🌊</span>
              <h1 className="text-xl font-bold text-white">
                Study<span className="text-cyan-200">Tide</span>
              </h1>
              <FishIcon className="w-5 h-5 text-cyan-200 opacity-0 group-hover:opacity-100 transition-opacity" animated />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <NotificationBell />
            <Link
              href="/settings"
              className="p-2 text-cyan-100 hover:text-white transition-colors hover:bg-white/10 rounded-lg"
              title="Settings"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Link>
            <div className="flex items-center gap-3 bg-white/10 rounded-full px-3 py-1.5">
              {user?.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="Profile"
                  className="w-8 h-8 rounded-full ring-2 ring-cyan-300"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-semibold">
                  {(user?.user_metadata?.full_name?.[0] || user?.email?.[0] || '🐚').toUpperCase()}
                </div>
              )}
              <span className="text-sm text-white font-medium hidden sm:block">
                {user?.user_metadata?.full_name || user?.email}
              </span>
            </div>
            {children}
          </div>
        </div>
      </div>
    </nav>
  )
}

