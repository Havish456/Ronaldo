'use client'

import { careerTotals } from '@/data/timeline'

export function Footer() {
  const ballons = careerTotals.ballonDOrYears.join(', ')

  return (
    <footer className="relative py-16">
      <div className="container-style mx-auto px-4">
        <div className="border-t border-white/[0.05] pt-12">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-neutral-500">
            <span>
              Career totals as of August 2026 •{' '}
              <span className="text-red-400 font-semibold">
                {careerTotals.careerGoalsAug2026}
              </span>{' '}
              goals
            </span>
            <span>
              Ballon d'Or years: {ballons}
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 text-center text-xs text-neutral-600">
          <img src="/favicon.svg" alt="CR7" className="h-5 w-5 opacity-60" />
          <span>
            This is a fan-made educational timeline. No photorealistic
            likenesses used — all character art is stylized abstraction.
          </span>
        </div>
      </div>
    </footer>
  )
}
