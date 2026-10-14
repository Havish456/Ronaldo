'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Era, eraColorMap, type StatChip } from '@/data/timeline'
import { setActiveEra } from '@/lib/store'

gsap.registerPlugin(ScrollTrigger)

interface EraSectionProps {
  era: Era
  index: number
  total: number
}

export function EraSection({ era, index, total }: EraSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const achievementsRef = useRef<HTMLDivElement>(null)
  const milestonesRef = useRef<HTMLDivElement>(null)
  const statsGridRef = useRef<HTMLDivElement>(null)

  const accentColor = eraColorMap[era.color]

  useGSAP(
    () => {
      if (!sectionRef.current) return

      // Active era trigger: sets store active era when section enters viewport center
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => setActiveEra(index),
        onEnterBack: () => setActiveEra(index),
      })

      // Header reveal animation
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      // Key Achievements reveal animation
      if (achievementsRef.current) {
        const achievementCards = achievementsRef.current.querySelectorAll('.achievement-badge')
        gsap.from(achievementCards, {
          opacity: 0,
          scale: 0.9,
          y: 20,
          stagger: 0.1,
          duration: 0.7,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: achievementsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      // Milestones batch reveal animation
      if (milestonesRef.current) {
        const cards = milestonesRef.current.querySelectorAll('.milestone-card')
        if (cards.length > 0) {
          gsap.from(cards, {
            opacity: 0,
            y: 30,
            stagger: 0.12,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: milestonesRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          })
        }
      }

      // Stats grid reveal animation
      if (statsGridRef.current) {
        const chips = statsGridRef.current.querySelectorAll('.stat-chip')
        if (chips.length > 0) {
          gsap.from(chips, {
            opacity: 0,
            y: 20,
            stagger: 0.08,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsGridRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          })
        }
      }
    },
    { dependencies: [index] }
  )

  return (
    <section
      id={era.id}
      ref={sectionRef}
      className="relative min-h-screen py-24 sm:py-32 flex flex-col justify-center border-b border-white/[0.03] scroll-mt-24"
    >
      <div className="container-style mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Top Era Tag & Indicator */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl font-mono text-sm font-black shadow-lg transition-all duration-500"
              style={{
                backgroundColor: accentColor,
                color: era.color === 'real-white' || era.color === 'alnassr-yellow' ? '#000000' : '#ffffff',
                boxShadow: `0 0 20px 4px ${accentColor}40`,
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              className="font-mono text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full border border-white/[0.06] bg-[rgba(13,13,13,0.6)] backdrop-blur-md transition-all duration-300"
              style={{ color: accentColor }}
            >
              {era.era} • {era.club}
            </span>
          </div>

          <div className="rounded-full px-4 py-1.5 font-mono text-xs font-bold border border-white/[0.06] bg-[rgba(10,10,10,0.6)] text-neutral-400 backdrop-blur-md transition-all duration-300">
            {era.yearRange}
          </div>
        </div>

        {/* Era Header */}
        <div ref={headerRef} className="mb-12 text-left">
          <div className="mb-3 flex items-center gap-3">
            <span
              className="h-px flex-1"
              style={{
                background: `linear-gradient(90, ${accentColor}60, transparent)`,
              }}
            />
            <span
              className="font-mono text-[10px] font-bold tracking-widest uppercase"
              style={{ color: accentColor }}
            >
              Era {index + 1}
            </span>
          </div>
          <h2 className="font-heading text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            {era.title}
          </h2>
          <p className="mt-2 text-base sm:text-lg font-medium text-neutral-400">
            {era.subtitle}
          </p>
          <p className="mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-neutral-500">
            {era.description}
          </p>
        </div>

        {/* Key Achievements Highlight Bar */}
        {era.keyAchievements && era.keyAchievements.length > 0 && (
          <div ref={achievementsRef} className="mb-14">
            <h3 className="mb-5 text-xs font-bold tracking-widest uppercase text-neutral-500 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: accentColor }} />
              Era Achievements & Trophies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {era.keyAchievements.map((ach, i) => (
                <div
                  key={i}
                  className={`achievement-badge group relative rounded-xl border p-5 transition-all duration-300 hover:scale-[1.02] hover:border-white/[0.25] ${
                    ach.highlight
                      ? 'border-white/[0.15] bg-[rgba(15,15,15,0.7)] shadow-[0_0_25px_rgba(0,0,0,0.3)]'
                      : 'border-white/[0.06] bg-[rgba(10,10,10,0.5)] hover:bg-[rgba(15,15,15,0.7)]'
                  }`}
                  style={
                    ach.highlight
                      ? {
                          borderColor: `${accentColor}40`,
                          boxShadow: `0 0 25px ${accentColor}15`,
                        }
                      : {}
                  }
                >
                  {ach.highlight && (
                    <span
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-15 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, ${accentColor}, transparent 70%)`,
                      }}
                    />
                  )}
                  <span className="block text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    {ach.title}
                  </span>
                  {ach.count && (
                    <span
                      className="mt-1 block font-heading text-lg sm:text-xl font-black text-white transition-colors duration-300"
                      style={{ color: ach.highlight ? accentColor : '#ffffff' }}
                    >
                      {ach.count}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Milestones & Era Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Milestones list (2 columns on large screens) */}
          <div ref={milestonesRef} className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold tracking-widest uppercase text-neutral-500">
              Key Career Milestones
            </h3>
            <div className="space-y-3">
              {era.milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className="milestone-card group relative rounded-xl border border-white/[0.06] bg-[rgba(10,10,10,0.5)] p-5 transition-all duration-300 hover:border-white/[0.15] hover:bg-[rgba(15,15,15,0.7)]"
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-all duration-300 group-hover:w-1.5"
                    style={{ backgroundColor: accentColor }}
                  />
                  <div className="pl-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-heading text-base sm:text-lg font-bold text-white group-hover:text-neutral-100 transition-colors">
                        {milestone.title}
                      </h4>
                      <time className="font-mono text-xs font-semibold text-neutral-500 bg-[rgba(255,255,255,0.04)] px-3 py-1 rounded-full border border-white/[0.05]">
                        {milestone.date}
                      </time>
                    </div>

                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-400">
                      {milestone.description}
                    </p>

                    {milestone.stats && milestone.stats.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2 pt-3 border-t border-white/[0.05]">
                        {milestone.stats.map((stat, si) => (
                          <span
                            key={si}
                            className="inline-flex items-center gap-1.5 rounded-md bg-[rgba(255,255,255,0.03)] px-2.5 py-1 text-xs font-medium text-neutral-300 border border-white/[0.05]"
                          >
                            <span className="text-neutral-500">{stat.label}:</span>
                            <span className="font-bold" style={{ color: accentColor }}>
                              {stat.value}
                            </span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Era Overall Stats Sidebar */}
          {era.stats && (
            <div ref={statsGridRef} className="space-y-4">
              <h3 className="text-xs font-bold tracking-widest uppercase text-neutral-500">
                Era Statistics
              </h3>
              <div className="rounded-2xl border border-white/[0.06] bg-[rgba(10,10,10,0.5)] p-5 backdrop-blur-xl space-y-3">
                {era.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="stat-chip flex items-center justify-between border-b border-white/[0.04] pb-2.5 last:border-0 last:pb-0 transition-colors"
                  >
                    <span className="text-xs font-medium text-neutral-500">
                      {stat.label}
                    </span>
                    <span
                      className="font-mono text-sm font-bold text-white transition-colors"
                      style={{ color: i === 0 ? accentColor : '#ffffff' }}
                    >
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
