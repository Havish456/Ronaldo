'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { timeline, eraColorMap } from '@/data/timeline'

// Curated showcase images: all eras with their hero photos
const showcaseItems = [
  { era: timeline[0], label: 'Sporting CP Debut' },
  { era: timeline[1], label: 'Manchester United • Age 18' },
  { era: timeline[2], label: 'Real Madrid • Galáctico' },
  { era: timeline[3], label: 'Portugal • Euro 2016' },
  { era: timeline[4], label: 'Juventus • Black & White' },
  { era: timeline[5], label: 'Return to United' },
  { era: timeline[6], label: 'Al-Nassr • The Final Chapter' },
]

export function Slideshow() {
  const [current, setCurrent] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const captionRef = useRef<HTMLDivElement>(null)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')

  const total = showcaseItems.length
  const era = showcaseItems[current].era
  const accentColor = eraColorMap[era.color]

  const advance = (dir: 'next' | 'prev') => {
    setDirection(dir)
    setCurrent((prev) => (dir === 'next' ? (prev + 1) % total : (prev - 1 + total) % total))
  }

  // Animate transition on current change
  useEffect(() => {
    const tl = gsap.timeline()
    // Fade out current image, swap, fade in
    tl.to(
      imageRef.current,
      {
        opacity: 0,
        scale: 0.95,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          // Swap image source
          if (imageRef.current) {
            const img = imageRef.current.querySelector('img')
            if (img) {
              img.src = showcaseItems[current].era.image
              img.alt = `${era.club} • ${era.era}`
            }
          }
        },
      }
    ).to(
      imageRef.current,
      {
        opacity: 1,
        scale: 1,
        duration: 0.45,
        ease: 'back.out(1.2)',
      },
      '-=0.1'
    )

    // Fade caption out then in
    tl.to(
      captionRef.current,
      {
        opacity: 0,
        y: -10,
        duration: 0.2,
      },
      '-=0.35'
    ).to(
      captionRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      },
      '+=0.1'
    )
  }, [current])

  const item = showcaseItems[current]
  const nextItem = showcaseItems[(current + 1) % total]
  const prevItem = showcaseItems[(current - 1 + total) % total]

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden py-12 sm:py-18 bg-[#030303] border-t border-white/[0.03]"
    >
      <div className="container-style mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <h2 className="mb-2 text-center text-[10px] font-bold tracking-widest uppercase text-neutral-600">
          Legend in Motion Gallery
        </h2>
        <p className="mb-8 text-center text-sm text-neutral-500">
          Click the image to cycle through career-defining moments
        </p>

        <div className="relative flex flex-col items-center">
          {/* Main featured image — click to advance */}
          <div
            ref={imageRef}
            onClick={() => advance('next')}
            className="group relative mx-auto mb-6 aspect-[4/3] w-full max-w-2xl cursor-pointer rounded-2xl border border-white/[0.08] bg-[rgba(13,13,13,0.7)] backdrop-blur-sm transition-all duration-300 hover:border-white/[0.15] hover:shadow-[0_0_30px_rgba(239,1,29,0.12)]"
            style={{
              boxShadow: `0 0 25px ${accentColor}20`,
            }}
          >
            <img
              src={era.image}
              alt={`${item.label}`}
              loading="eager"
              className="h-full w-full rounded-xl object-cover object-center opacity-90"
            />

            {/* Era color overlay gradient */}
            <div
              className="absolute inset-0 rounded-xl opacity-40 mix-blend-color"
              style={{ backgroundColor: accentColor }}
            />
            <div
              className="absolute inset-0 rounded-xl"
              style={{
                background: `linear-gradient(135deg, ${accentColor}20 0%, transparent 50%, ${accentColor}10 100%)`,
              }}
            />

            {/* Click hint */}
            <div className="absolute bottom-3 right-3 rounded-full bg-[rgba(0,0,0,0.6)] px-2.5 py-1 text-[10px] font-semibold text-neutral-400 backdrop-blur opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Click for next
            </div>

            {/* Navigation arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                advance('prev')
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/[0.1] bg-[rgba(0,0,0,0.5)] p-1.5 text-neutral-300 opacity-0 transition-all duration-300 hover:border-white/[0.3] hover:text-white group-hover:opacity-100 cursor-pointer"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                advance('next')
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/[0.1] bg-[rgba(0,0,0,0.5)] p-1.5 text-neutral-300 opacity-0 transition-all duration-300 hover:border-white/[0.3] hover:text-white group-hover:opacity-100 cursor-pointer"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Caption */}
          <div
            ref={captionRef}
            className="mb-4 text-center"
          >
            <span className="font-mono text-xs font-bold uppercase text-neutral-400">
              {item.label}
            </span>
            <div className="mt-1 flex items-center justify-center gap-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
              <span className="text-sm font-semibold text-neutral-300">
                {era.title}
              </span>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex items-center gap-1.5">
            {/* Sidenub peaking previews */}
            {showcaseItems.map((_, i) => {
              const isActive = i === current
              const eraColor = eraColorMap[showcaseItems[i].era.color]
              return (
                <button
                  key={showcaseItems[i].era.id}
                  onClick={() => {
                    setDirection(i > current ? 'next' : 'prev')
                    setCurrent(i)
                  }}
                  className={`relative h-2 rounded-full transition-all duration-300 ${
                    isActive ? 'w-6 shadow-[0_0_8px_rgba(255,255,255,0.4)]' : 'w-2 hover:w-3 hover:shadow-[0_0_6px_rgba(255,255,255,0.2)]'
                  }} cursor-pointer`}
                  style={{
                    backgroundColor: isActive ? eraColor : 'rgba(255,255,255,0.15)',
                  }}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
