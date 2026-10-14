'use client'

import { useActiveEra, useScrollProgress } from '@/lib/store'
import { timeline, eraColorMap } from '@/data/timeline'
import { useEffect, useState } from 'react'

export function TimelineBackground() {
  const activeEraIndex = useActiveEra()
  const scrollProgress = useScrollProgress()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050505]">
      {/* Background image layers for each of the 7 eras */}
      {timeline.map((era, index) => {
        const isActive = index === activeEraIndex

        // Parallax motion tied to scroll
        const parallaxOffset = (index - activeEraIndex) * 12

        return (
          <div
            key={era.id}
            className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isActive
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105 pointer-events-none'
            }`}
            style={{
              zIndex: isActive ? 2 : 1,
            }}
          >
            {/* Background photo with enhanced brightness & clarity */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out"
              style={{
                backgroundImage: `url(${era.image})`,
                transform: `translateY(${isActive ? 0 : parallaxOffset}px)`,
                filter: 'brightness(0.92) contrast(1.08) saturate(1.15)',
              }}
            />

            {/* Subtle duotone tint matching era accent */}
            <div
              className="absolute inset-0 opacity-[0.08] mix-blend-color transition-opacity duration-1000"
              style={{ backgroundColor: eraColorMap[era.color] }}
            />

            {/* Ambient team color glow in corners */}
            <div
              className="absolute inset-0 opacity-50 mix-blend-screen transition-opacity duration-1000"
              style={{
                background: `radial-gradient(circle at 78% 22%, rgba(${era.accentRgb}, 0.32) 0%, transparent 55%),
                             radial-gradient(circle at 22% 78%, rgba(${era.accentRgb}, 0.2) 0%, transparent 55%)`,
              }}
            />

            {/* Smooth layered contrast gradients for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/30 to-[#050505]/15" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/75 via-[#050505]/20 to-[#050505]/55" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,5,5,0.7)_100%)]" />
          </div>
        )
      })}

      {/* Floating subtle grid pattern for editorial depth */}
      <div
        className="absolute inset-0 opacity-[0.012] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: '55px 55px',
        }}
      />

      {/* Global vignette for cinematic focus */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 45%, rgba(5,5,5,0.6) 100%)',
        }}
      />

      {/* Subtle floating era tracker on the right edge */}
      <div className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-3 md:flex">
        {timeline.map((era, index) => {
          const isActive = index === activeEraIndex
          const accentColor = eraColorMap[era.color]
          return (
            <button
              key={era.id}
              onClick={() => {
                const target = document.getElementById(era.id)
                target?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="group relative flex items-center gap-3 py-1 text-right focus:outline-none cursor-pointer"
            >
              <span
                className={`text-[11px] font-bold tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? 'text-white opacity-100 translate-x-0'
                    : 'text-neutral-500 opacity-0 group-hover:opacity-80 translate-x-2 group-hover:translate-x-0'
                }`}
              >
                {era.club}
              </span>
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'h-3 w-8 shadow-[0_0_12px_rgba(255,255,255,0.6)]'
                    : 'h-2 w-2 bg-neutral-600 group-hover:bg-neutral-300 group-hover:scale-125'
                }}`}
                style={{
                  backgroundColor: isActive ? accentColor : undefined,
                  boxShadow: isActive ? `0 0 12px ${accentColor}60` : undefined,
                }}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
