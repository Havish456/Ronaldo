'use client'

import { useScrollProgress } from '@/lib/store'

export function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div className="fixed top-0 left-0 z-50 h-1 w-full bg-white/[0.04] overflow-hidden">
      <div
        id="scroll-progress-bar"
        className="h-full w-0 bg-gradient-to-r from-red-500 to-amber-400 shadow-[0_0_10px_rgba(239,1,29,0.5)] transition-all duration-300 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}
