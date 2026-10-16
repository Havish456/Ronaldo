'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { careerTotals } from '@/data/timeline'

gsap.registerPlugin(ScrollTrigger)

const majorAwards = [
  {
    icon: '🏆',
    title: "Ballon d'Or",
    count: careerTotals.ballonDOr,
    years: careerTotals.ballonDOrYears.join(', '),
    accent: '#f59e0b',
  },
  {
    icon: '⭐',
    title: 'Champions League Titles',
    count: careerTotals.championsLeagueTitles,
    years: '2008, 2014, 2016, 2017, 2018',
    accent: '#2563eb',
  },
  {
    icon: '🌍',
    title: 'FIFA Best Men\'s Player',
    count: 2,
    years: '2016, 2017',
    accent: '#dc2626',
  },
  {
    icon: '🏅',
    title: 'UEFA European Championship',
    count: 1,
    years: '2016',
    accent: '#dc2626',
  },
  {
    icon: '🎯',
    title: 'UEFA Nations League',
    count: 2,
    years: '2019, 2025',
    accent: '#7c3aed',
  },
  {
    icon: '🔞',
    title: 'All-Time UCL Goals Leader',
    count: 140,
    years: '183 apps',
    accent: '#f5f5f5',
  },
  {
    icon: '🎯',
    title: 'World Cup Golden Boot',
    count: 1,
    years: '2018 (18 goals)',
    accent: '#f59e0b',
  },
  {
    icon: '🏟️',
    title: '1,000 Career Goals Target',
    count: '977',
    years: '23 to go',
    accent: '#ef011d',
  },
]

export function Awards() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (imageRef.current) {
      gsap.from(imageRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    }

    if (gridRef.current) {
      const items = gridRef.current.querySelectorAll('.award-card')
      gsap.from(items, {
        opacity: 0,
        y: 30,
        rotateX: -10,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-16 sm:py-20 bg-[#030303] border-t border-white/[0.03]"
    >
      {/* Background image: cr7 about pic back.jpeg */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-fixed opacity-20 brightness-110 contrast-110 saturate-90"
        style={{ backgroundImage: "url('/images/cr7 about pic back.jpeg')" }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#030303] via-[#030303]/80 to-[#030303]" />

      <div className="container-style mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-2">
          <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-neutral-600">
            Legacy of Greatness
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-white mt-1">
            Awards & Honors
          </h2>
        </div>

        {/* Hero Awards Image */}
        <div
          ref={imageRef}
          className="relative mx-auto mb-10 max-w-4xl opacity-0 translate-y-8"
        >
          <div className="relative aspect-[16/7] overflow-hidden rounded-2xl border border-white/[0.08] bg-[rgba(13,13,13,0.5)] shadow-xl">
            <img
              src="/images/awards.jpg"
              alt="CR7 Awards Gallery"
              className="h-full w-full object-cover object-center opacity-85"
            />
            <div
              className="absolute inset-0 opacity-40 mix-blend-color"
              style={{ backgroundColor: '#ef011d' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 rounded-xl border border-white/[0.1] bg-[rgba(0,0,0,0.5)] px-4 py-2 text-xs font-mono font-bold uppercase text-neutral-300 backdrop-blur-sm">
              Career Honors Collection
            </div>
          </div>
        </div>

        {/* Awards Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
        >
          {majorAwards.map((award) => (
            <div
              key={award.title}
              className="award-card group relative rounded-xl border border-white/[0.12] bg-[rgba(17,17,17,0.8)] p-5 text-center transition-all duration-300 hover:border-white/[0.3] hover:bg-[rgba(25,25,25,0.9)] hover:scale-105 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
            >
              <div
                className="absolute inset-0 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                style={{ backgroundColor: award.accent }}
              />
              <div className="relative z-10">
                <div className="mb-2 text-3xl brightness-110 filter">{award.icon}</div>
                <div
                  className="mb-1 font-heading text-lg font-black text-white transition-colors drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]"
                  style={{ color: award.accent }}
                >
                  {award.count}
                </div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-300">
                  {award.title}
                </div>
                <div className="mt-1 font-mono text-[9px] text-neutral-400">
                  {award.years}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
