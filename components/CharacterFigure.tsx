'use client'

import { useRef, useEffect, useState } from 'react'
import { useActiveEra, useScrollProgress } from '@/lib/store'
import { timeline, eraColorMap } from '@/data/timeline'

export function CharacterFigure() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress()
  const activeEraIndex = useActiveEra()
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const era = timeline[activeEraIndex] || timeline[0]
  const currentColor = eraColorMap[era.color] || '#ffffff'

  useEffect(() => {
    if (progress > 0.01) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [progress])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 1024px)').matches)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (isMobile) return null

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none fixed bottom-8 right-8 z-30 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }}`}
    >
      {/* Era pill badge */}
      <div
        className="mb-3 rounded-2xl border border-white/[0.08] bg-[rgba(8,8,8,0.7)] px-4 py-2 text-center backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-500"
        style={{
          borderColor: `${currentColor}40`,
          boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px ${`${currentColor}20`}`,
        }}
      >
        <span className="block text-[10px] font-mono font-bold tracking-widest uppercase text-neutral-500">
          {era.era} • {era.club}
        </span>
        <span
          className="block font-heading text-sm font-black transition-colors duration-500"
          style={{ color: currentColor }}
        >
          {era.yearRange}
        </span>
      </div>

      {/* Stylized SIUUU Silhouette SVG with glow */}
      <div className="relative flex justify-center">
        <svg
          width="120"
          height="180"
          viewBox="0 0 140 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_16px_rgba(255,255,255,0.1)] transition-all duration-700"
          style={{
            filter: `drop-shadow(0 0 12px ${currentColor}40)`,
          }}
        >
          <defs>
            <filter id="glow-blur-figure" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="14" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Ambient glow behind figure */}
          <ellipse
            cx="60"
            cy="70"
            rx="36"
            ry="56"
            fill={currentColor}
            opacity="0.15"
            filter="url(#glow-blur-figure)"
          />

          {/* Head */}
          <circle cx="60" cy="22" r="11" fill={currentColor} />

          {/* Torso */}
          <path
            d="M54 34 L48 62 C48 66 51 68 55 68 L65 68 C69 68 72 66 72 62 L66 34 Z"
            fill={currentColor}
          />

          {/* Left Arm extended high */}
          <path
            d="M54 34 C44 30 36 22 32 14 C28 8 26 2 20 0"
            stroke={currentColor}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Head-centered arm */}
          <path
            d="M60 34 C58 18 55 10 54 2"
            stroke={currentColor}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Right Arm */}
          <path
            d="M66 32 C72 20 80 12 86 6 C90 2 94 0 98 2"
            stroke={currentColor}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Legs in jump pose */}
          <path
            d="M52 68 L46 98 C44 110 46 122 52 130"
            stroke={currentColor}
            strokeWidth="9"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M68 68 L74 98 C76 110 74 122 68 130"
            stroke={currentColor}
            strokeWidth="9"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    </div>
  )
}
