'use client'

import { useScrollProgress } from '@/lib/store'
import { useState, useEffect } from 'react'

export function ScrollProgress() {
  const progress = useScrollProgress()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed top-0 left-0 z-50 h-1 w-full bg-white/[0.04] overflow-hidden">
      <div
        className="h-full w-0 bg-gradient-to-r from-red-500 to-amber-400 shadow-[0_0_10px_rgba(239,1,29,0.5)] transition-all duration-300 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}
