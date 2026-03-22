'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function useHeroParallax() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef      = useRef<HTMLDivElement>(null)
  const rvRef      = useRef<HTMLDivElement>(null)
  const chairsRef  = useRef<HTMLDivElement>(null)
  const fireRef    = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const layers = [
      { el: bgRef.current,     speed: 0.08 },
      { el: rvRef.current,     speed: 0.15 },
      { el: chairsRef.current, speed: 0.22 },
      { el: fireRef.current,   speed: 0.28 },
    ]

    if (layers.some(l => !l.el)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf: number
    let last = -1

    function tick() {
      const y = window.scrollY
      if (y === last) { raf = requestAnimationFrame(tick); return }
      last = y
      layers.forEach(({ el, speed }) => {
        if (el) el.style.transform = `translate3d(0,${y * speed}px,0)`
      })
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    // GSAP text reveal — fires once on load
    gsap.timeline({ delay: 0.3 })
      .from('.hero-eyebrow', { y: 20, opacity: 0, duration: 0.6,  ease: 'power3.out' })
      .from('.hero-line-1',  { y: 55, opacity: 0, duration: 0.75, ease: 'power3.out' }, '-=0.3')
      .from('.hero-line-2',  { y: 55, opacity: 0, duration: 0.75, ease: 'power3.out' }, '-=0.55')
      .from('.hero-line-3',  { y: 55, opacity: 0, duration: 0.9,  ease: 'power3.out' }, '-=0.55')
      .from('.hero-divider', { scaleX: 0, opacity: 0, duration: 0.5, ease: 'power2.out', transformOrigin: 'center' }, '-=0.4')
      .from('.hero-subhead', { y: 16, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
      .from('.hero-pills',   { y: 12, opacity: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
      .from('.hero-ctas',    { y: 12, opacity: 0, duration: 0.4, ease: 'power2.out' }, '-=0.15')
      .from('.hero-trust',   { y: 8,  opacity: 0, duration: 0.4, ease: 'power2.out' }, '-=0.1')

    return () => cancelAnimationFrame(raf)
  }, [])

  return { sectionRef, bgRef, rvRef, chairsRef, fireRef, canvasRef }
}
