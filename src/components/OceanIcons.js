'use client'

// Ocean-themed SVG icons for StudyTide

export const WaveIcon = ({ className = "w-6 h-6", animated = false }) => (
  <svg className={`${className} ${animated ? 'animate-wave' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 12c1.5-1.5 3-3 5-3s3.5 1.5 5 3 3 3 5 3 3.5-1.5 5-3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 18c1.5-1.5 3-3 5-3s3.5 1.5 5 3 3 3 5 3 3.5-1.5 5-3" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
  </svg>
)

export const FishIcon = ({ className = "w-6 h-6", animated = false }) => (
  <svg className={`${className} ${animated ? 'animate-swim' : ''}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C7.5 2 4 5.5 4 9c0 2.5 1.5 4.5 3.5 5.5L6 20l3-2c1 0.5 2 0.5 3 0.5s2 0 3-0.5l3 2-1.5-5.5C18.5 13.5 20 11.5 20 9c0-3.5-3.5-7-8-7zm-3 8c-0.5 0-1-0.5-1-1s0.5-1 1-1 1 0.5 1 1-0.5 1-1 1z"/>
  </svg>
)

export const ShellIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.5 0 3-0.5 4.5-1C18 20 19 18.5 19 17c0-1-0.5-2-1-2.5 0.5-1 1-2 1-3.5 0-5-3.5-9-7-9zm-2 15c-2.5 0-4.5-2-4.5-4.5S7.5 8 10 8c1.5 0 2.5 0.5 3.5 1.5C12 11 11 13 11 15c0 0.5 0 1.5 0 2h-1z"/>
  </svg>
)

export const AnchorIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="5" r="3"/>
    <path d="M12 8v13"/>
    <path d="M5 12H2a10 10 0 0020 0h-3"/>
  </svg>
)

export const CompassIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor"/>
  </svg>
)

export const CoralIcon = ({ className = "w-6 h-6", animated = false }) => (
  <svg className={`${className} ${animated ? 'animate-sway' : ''}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 22V10M12 10c0-4 3-6 3-8 0 2 3 4 3 8M12 10c0-4-3-6-3-8 0 2-3 4-3 8M6 22v-6c0-2 2-3 2-5M18 22v-6c0-2-2-3-2-5"/>
  </svg>
)

export const BubbleIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="8" opacity="0.5"/>
    <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.3"/>
    <circle cx="18" cy="6" r="3" opacity="0.3"/>
    <circle cx="5" cy="18" r="2" opacity="0.3"/>
  </svg>
)

export const SeaweedIcon = ({ className = "w-6 h-6", animated = false }) => (
  <svg className={`${className} ${animated ? 'animate-sway' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 22c0-4 2-6 0-10s2-6 0-10" strokeLinecap="round"/>
    <path d="M12 22c0-3 1.5-5 0-8s1.5-5 0-8" strokeLinecap="round"/>
    <path d="M16 22c0-4-2-6 0-10s-2-6 0-10" strokeLinecap="round"/>
  </svg>
)

export const TreasureIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 8h14a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2v-9a2 2 0 012-2z"/>
    <path d="M3 8l2-4h14l2 4" fill="none" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="14" r="2" fill="white"/>
    <path d="M12 12v-2" stroke="white" strokeWidth="2"/>
  </svg>
)

export const LighthouseIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2v4M12 6L8 22h8L12 6z"/>
    <path d="M10 10h4M9 14h6M8 18h8"/>
    <path d="M2 10h4M18 10h4" opacity="0.5"/>
  </svg>
)

export const StarfishIcon = ({ className = "w-6 h-6", animated = false }) => (
  <svg className={`${className} ${animated ? 'animate-float-slow' : ''}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.4 6.2 6.6.5-5 4.5 1.5 6.5-5.5-3.5-5.5 3.5 1.5-6.5-5-4.5 6.6-.5z"/>
  </svg>
)

export const DropletIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/>
  </svg>
)

export const TidalWaveIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 6c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>
    <path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>
    <path d="M2 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>
  </svg>
)

export const SailboatIcon = ({ className = "w-6 h-6", animated = false }) => (
  <svg className={`${className} ${animated ? 'animate-float' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 20l20-4"/>
    <path d="M4 16l8-14v14z" fill="currentColor" opacity="0.2"/>
    <path d="M12 2v14"/>
    <path d="M12 16l8-4"/>
  </svg>
)

export const DolphinIcon = ({ className = "w-6 h-6", animated = false }) => (
  <svg className={`${className} ${animated ? 'animate-swim' : ''}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 9c0 3-2.5 5-5.5 5H14l-4 5-1-3H7c-3 0-5-2-5-4s2-4 5-4h3c2 0 4-1 5-3l2 1c1 .5 2 1 3 1 1.5 0 2 .5 2 2z"/>
    <circle cx="8" cy="9" r="1" fill="white"/>
  </svg>
)

export const OceanSunIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" fill="currentColor" className="text-amber-400"/>
    <path d="M2 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0" stroke="currentColor" strokeWidth="2" className="text-cyan-500"/>
    <path d="M2 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0" stroke="currentColor" strokeWidth="2" className="text-cyan-400" opacity="0.6"/>
  </svg>
)

// Animated wave decoration component
export const WaveDecoration = ({ className = "" }) => (
  <div className={`absolute bottom-0 left-0 w-full overflow-hidden ${className}`}>
    <svg className="relative block w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path
        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
        className="fill-cyan-500/20"
      />
    </svg>
    <svg className="absolute bottom-0 left-0 w-full h-12 animate-wave" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ animationDelay: '-2s' }}>
      <path
        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
        className="fill-cyan-400/30"
      />
    </svg>
  </div>
)

// Bubble animation component
export const BubbleAnimation = () => (
  <div className="bubbles pointer-events-none absolute inset-0 overflow-hidden">
    {[...Array(7)].map((_, i) => (
      <div key={i} className="bubble" />
    ))}
  </div>
)

export default {
  WaveIcon,
  FishIcon,
  ShellIcon,
  AnchorIcon,
  CompassIcon,
  CoralIcon,
  BubbleIcon,
  SeaweedIcon,
  TreasureIcon,
  LighthouseIcon,
  StarfishIcon,
  DropletIcon,
  TidalWaveIcon,
  SailboatIcon,
  DolphinIcon,
  OceanSunIcon,
  WaveDecoration,
  BubbleAnimation,
}

