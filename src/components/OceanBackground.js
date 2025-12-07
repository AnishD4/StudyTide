'use client'

export default function OceanBackground() {
  return (
    <>
      {/* Floating Bubbles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
        <div className="bubble bubble-5"></div>
      </div>

      {/* Animated gradient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-teal-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-sky-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
      </div>
    </>
  )
}

