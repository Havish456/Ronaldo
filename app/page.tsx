'use client'

import { TimelineBackground } from '@/components/TimelineBackground'
import { EraNavBar } from '@/components/EraNavBar'
import { Hero } from '@/components/Hero'
import { Timeline } from '@/components/Timeline'
import { Footer } from '@/components/Footer'
import { ScrollProgress } from '@/components/ScrollProgress'
import { BackToTop } from '@/components/BackToTop'
import { Slideshow } from '@/components/Slideshow'
import { Awards } from '@/components/Awards'

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <TimelineBackground />
      <EraNavBar />
      <main className="relative z-10">
        <Hero />
        <Timeline />
        <Footer />
      </main>
      <Awards />
      <Slideshow />
      <BackToTop />
    </>
  )
}
