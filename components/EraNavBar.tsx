'use client'

import { useActiveEra } from '@/lib/store'
import { timeline, eraColorMap } from '@/data/timeline'
import { useEffect, useState } from 'react'

export function EraNavBar() {
  const activeEra = useActiveEra()
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 200)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted || !scrolled) return null

  return (
    <header className="fixed top-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-500 animate-in fade-in slide-in-from-top-4">
      <nav className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/[0.06] bg-[rgba(10,10,10,0.65)] px-3 py-2 sm:px-4 sm:py-2.5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <span className="hidden sm:inline-flex items-center gap-1.5 font-black text-xs tracking-wider text-white/50 mr-2 border-r border-white/[0.08] pr-3">
          <img src="/favicon.svg" alt="CR7" className="h-4 w-4" />
          CR7
        </span>
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-[80vw] sm:max-w-none no-scrollbar py-1">
          {timeline.map((era, index) => {
            const isActive = index === activeEra
            const accentColor = eraColorMap[era.color]
            return (
              <button
                key={era.id}
                onClick={() => {
                  const el = document.getElementById(era.id)
                  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className={`group relative rounded-full px-3 py-1.5 text-xs font-semibold tracking-wider transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'text-white shadow-md'
                    : 'text-neutral-500 hover:text-white hover:bg-[rgba(255,255,255,0.04)]'
                }`}
                style={{
                  backgroundColor: isActive ? `${accentColor}18` : 'transparent',
                  borderColor: isActive ? accentColor : 'transparent',
                  borderWidth: 1,
                }}
              >
                {isActive && (
                  <span
                    className="absolute inset-0 rounded-full opacity-60 animate-pulse-glow"
                    style={{
                      borderColor: accentColor,
                      borderWidth: 1,
                      boxShadow: `0 0 16px 2px ${accentColor}40`,
                    }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span
                    className="h-1.5 w-1.5 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: accentColor,
                      transform: isActive ? 'scale(1.3)' : 'scale(1)',
                      boxShadow: isActive ? `0 0 8px ${accentColor}80` : 'none',
                    }}
                  />
                  <span className="hidden md:inline">{era.club}</span>
                  <span className="md:hidden">{era.era}</span>
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
