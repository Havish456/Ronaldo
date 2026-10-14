// lib/store.ts — reactive store for scroll progress and active era synchronization
import { useEffect, useState } from 'react'

type ProgressListener = (progress: number) => void
type EraListener = (eraIndex: number) => void

let progressListeners: Set<ProgressListener> = new Set()
let eraListeners: Set<EraListener> = new Set()

let currentProgress = 0
let currentActiveEra = 0

/**
 * Called from a ScrollTrigger onUpdate to broadcast scroll progress (0–1).
 */
export function setScrollProgress(p: number) {
  currentProgress = p
  progressListeners.forEach((l) => l(p))
}

export function getScrollProgress() {
  return currentProgress
}

/**
 * React hook — subscribe a component to scroll progress.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(currentProgress)

  useEffect(() => {
    const listener: ProgressListener = (p) => setProgress(p)
    progressListeners.add(listener)
    return () => {
      progressListeners.delete(listener)
    }
  }, [])

  return progress
}

/**
 * Set active era index (0 to timeline.length - 1)
 */
export function setActiveEra(index: number) {
  if (currentActiveEra !== index) {
    currentActiveEra = index
    eraListeners.forEach((l) => l(index))
  }
}

export function getActiveEra() {
  return currentActiveEra
}

/**
 * React hook — subscribe a component to active era index.
 */
export function useActiveEra() {
  const [eraIndex, setEraIndex] = useState(currentActiveEra)

  useEffect(() => {
    const listener: EraListener = (i) => setEraIndex(i)
    eraListeners.add(listener)
    return () => {
      eraListeners.delete(listener)
    }
  }, [])

  return eraIndex
}
