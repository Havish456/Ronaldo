'use client'

import { careerTotals, timeline, eraColorMap } from '@/data/timeline'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadRef = useRef<HTMLParagraphElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from(badgeRef.current, { opacity: 0, y: -20, duration: 0.8 })
      .from(headlineRef.current, { opacity: 0, scale: 0.94, y: 24, duration: 1 }, '-=0.5')
      .from(subheadRef.current, { opacity: 0, y: 20, duration: 0.8 }, '-=0.6')
      .from('.hero-stat-card', { opacity: 0, y: 25, stagger: 0.08, duration: 0.7 }, '-=0.5')
      .from(ctaRef.current, { opacity: 0, y: 15, duration: 0.6 }, '-=0.4')
  }, { scope: containerRef })

  const scrollToTimeline = () => {
    const firstEra = document.getElementById('era-1')
    firstEra?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={containerRef} className="relative flex min-h-screen flex-col items-center justify-center pt-14 pb-10 text-center">
      {/* Ambient radial gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#050505] via-[#0a0a0a]/80 to-transparent" />

      {/* Subtle corner light rays */}
      <div className="absolute top-0 left-0 -z-10 h-[500px] w-[500px] bg-[radial-gradient(circle_at_top_left,rgba(239,1,29,0.04),transparent_60%)]" />
      <div className="absolute bottom-0 right-0 -z-10 h-[500px] w-[500px] bg-[radial-gradient(circle_at_bottom_right,rgba(239,1,29,0.03),transparent_60%)]" />

      {/* CR7 logo watermark — subtle shield behind headline */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-[0.025] blur-[2px] pointer-events-none">
        <img src="/cr7-logo.svg" alt="" className="h-[320px] w-auto md:h-[400px]" />
      </div>

      <div className="container-style mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-1.5 text-xs font-semibold tracking-widest uppercase text-neutral-400 backdrop-blur-xl shadow-inner"
        >
          <span className="h-2 w-2 animate-pulse-glow rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,1,29,0.6)]" />
          The Living Legend • Career Chronicle
        </div>

        {/* Main headline */}
        <h1
          ref={headlineRef}
          className="font-heading text-style-display mb-4 flex flex-wrap items-baseline justify-center gap-[0.15em] text-7xl font-black tracking-tighter text-white sm:text-8xl md:text-9xl leading-none"
        >
          <span className="bg-gradient-to-r from-white via-neutral-200 to-white bg-clip-text text-transparent">
            CRISTIANO
          </span>
          <span className="bg-gradient-to-r from-red-500 via-red-400 to-white bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(239,1,29,0.3)]">
            RONALDO
          </span>
        </h1>

        {/* CR7.jpeg background watermark — appears after the headline */}
        <div className="relative mx-auto mb-4 max-w-3xl opacity-5">
          <img
            src="/images/CR7.jpeg"
            alt=""
            className="h-auto w-full rounded-xl object-cover grayscale"
            aria-hidden="true"
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-[#030303]/90 via-transparent to-[#030303]/90" />
        </div>

        <p
          ref={subheadRef}
          className="text-style-body mx-auto mb-8 max-w-2xl text-lg sm:text-xl font-medium text-neutral-300"
        >
          From the streets of Funchal to the pinnacle of world football.
          Scroll through every era, victory, and record-breaking achievement.
        </p>

        {/* Career totals grid */}
        <div ref={statsRef} className="mx-auto mb-8 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
          <div className="hero-stat-card group relative rounded-2xl border border-white/10 bg-[rgba(10,10,10,0.65)] p-4 sm:p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.25] hover:shadow-[0_0_24px_rgba(239,1,29,0.15)]">
            <span className="block font-heading text-3xl sm:text-4xl font-black text-white group-hover:text-neutral-100 transition-colors">
              {careerTotals.ballonDOr}
            </span>
            <span className="text-xs font-semibold tracking-wider uppercase text-neutral-500">Ballon d'Or</span>
          </div>

          <div className="hero-stat-card group relative rounded-2xl border border-white/10 bg-[rgba(10,10,10,0.65)] p-4 sm:p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.25] hover:shadow-[0_0_24px_rgba(239,1,29,0.15)]">
            <span className="block font-heading text-3xl sm:text-4xl font-black text-white group-hover:text-neutral-100 transition-colors">
              {careerTotals.championsLeagueTitles}
            </span>
            <span className="text-xs font-semibold tracking-wider uppercase text-neutral-500">UCL Titles</span>
          </div>

          <div className="hero-stat-card group relative rounded-2xl border border-white/10 bg-[rgba(10,10,10,0.65)] p-4 sm:p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.25] hover:shadow-[0_0_24px_rgba(239,1,29,0.15)]">
            <span className="block font-heading text-3xl sm:text-4xl font-black text-amber-400">
              {careerTotals.careerGoalsAug2026}
              <span className="text-xs font-normal text-neutral-500"> / 1000</span>
            </span>
            <span className="text-xs font-semibold tracking-wider uppercase text-neutral-500">Career Goals</span>
          </div>

          <div className="hero-stat-card group relative rounded-2xl border border-white/10 bg-[rgba(10,10,10,0.65)] p-4 sm:p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.25] hover:shadow-[0_0_24px_rgba(239,1,29,0.15)]">
            <span className="block font-heading text-3xl sm:text-4xl font-black text-white group-hover:text-neutral-100 transition-colors">
              {careerTotals.championsLeagueGoals}
            </span>
            <span className="text-xs font-semibold tracking-wider uppercase text-neutral-500">UCL All-Time Goals</span>
          </div>

          <div className="hero-stat-card group relative rounded-2xl border border-white/10 bg-[rgba(10,10,10,0.65)] p-4 sm:p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.25] hover:shadow-[0_0_24px_rgba(239,1,29,0.15)]">
            <span className="block font-heading text-3xl sm:text-4xl font-black text-white group-hover:text-neutral-100 transition-colors">
              {careerTotals.portugalCaps}
            </span>
            <span className="text-xs font-semibold tracking-wider uppercase text-neutral-500">Portugal Caps</span>
          </div>

          <div className="hero-stat-card group relative rounded-2xl border border-white/10 bg-[rgba(10,10,10,0.65)] p-4 sm:p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.25] hover:shadow-[0_0_24px_rgba(239,1,29,0.15)]">
            <span className="block font-heading text-3xl sm:text-4xl font-black text-red-500">
              {careerTotals.portugalGoals}
            </span>
            <span className="text-xs font-semibold tracking-wider uppercase text-neutral-500">International Goals</span>
          </div>
        </div>

        {/* Action Buttons & Quick Jumps */}
        <div ref={ctaRef} className="flex flex-col items-center gap-6">
          <button
            onClick={scrollToTimeline}
            className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-red-500/20 transition-all duration-300 hover:scale-105 hover:shadow-red-500/30 focus:outline-none cursor-pointer"
          >
            {/* Subtle inner highlight */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 via-transparent to-transparent opacity-40" />
            <span className="relative z-10">Explore Career Timeline</span>
            <svg
              className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>

          {/* Scroll-down cue */}
          <button
            onClick={scrollToTimeline}
            className="group flex flex-col items-center gap-2 text-neutral-400 transition-colors hover:text-white"
          >
            <span className="text-[10px] font-semibold tracking-widest uppercase opacity-60 group-hover:opacity-100">
              Scroll to explore
            </span>
            <div className="relative h-10 w-5.5 rounded-full border border-white/10 bg-[rgba(255,255,255,0.03)]">
              <div className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/30 group-hover:bg-white/50 transition-colors" />
              <div className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 animate-[spin_3s_linear_infinite] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
            </div>
            <svg
              className="h-3 w-3 stroke-current opacity-40 group-hover:opacity-80 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12l-7 7m0 0l-7-7m7 7V5" />
            </svg>
          </button>

          {/* Quick jump era pills */}
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
            {timeline.map((era) => {
              const accent = eraColorMap[era.color]
              return (
                <button
                  key={era.id}
                  onClick={() => {
                    const el = document.getElementById(era.id)
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="relative rounded-full border border-white/[0.08] bg-[rgba(10,10,10,0.5)] px-3 py-1 text-xs font-medium text-neutral-400 backdrop-blur-sm transition-all duration-200 hover:border-white/[0.2] hover:text-white hover:scale-105 cursor-pointer"
                  style={{
                    '--tw-shadow-color': `${accent}40`,
                  } as React.CSSProperties}
                >
                  <span className="relative z-10">{era.club} ({era.yearRange})</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
