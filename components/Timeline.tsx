'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { timeline, Era } from '@/data/timeline'
import { EraSection } from '@/components/EraSection'
import { setScrollProgress } from '@/lib/store'

gsap.registerPlugin(ScrollTrigger)

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    triggerRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        setScrollProgress(Math.max(0, Math.min(1, self.progress)))
      },
    })

    return () => {
      triggerRef.current?.kill()
    }
  }, [])

  return (
    <div id="timeline-container" ref={containerRef} className="relative w-full">
      {timeline.map((era: Era, index: number) => (
        <EraSection
          key={era.id}
          era={era}
          index={index}
          total={timeline.length}
        />
      ))}
    </div>
  )
}
