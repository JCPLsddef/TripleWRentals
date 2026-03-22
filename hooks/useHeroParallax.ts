'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// Register ONCE at module level — this is critical in Next.js
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function useHeroParallax() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef      = useRef<HTMLDivElement>(null)
  const rvRef      = useRef<HTMLDivElement>(null)
  const chairsRef  = useRef<HTMLDivElement>(null)
  const fireRef    = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Guard: exit if refs not ready
    const section = sectionRef.current
    const bg      = bgRef.current
    const rv      = rvRef.current
    const chairs  = chairsRef.current
    const fire    = fireRef.current
    if (!section || !bg || !rv || !chairs || !fire) return

    // Guard: skip on reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Small delay — ensures Next.js has finished hydration and layout
    const timer = setTimeout(() => {

      // Kill any existing ScrollTrigger instances to prevent duplicates
      ScrollTrigger.getAll().forEach(st => st.kill())

      // Shared config
      const config = {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
        invalidateOnRefresh: true,
      }

      // Layer 1 — Background: slowest (most distant)
      gsap.fromTo(bg,
        { y: 0 },
        { y: 60, ease: 'none', scrollTrigger: config }
      )

      // Layer 2 — RV: medium
      gsap.fromTo(rv,
        { y: 0 },
        { y: 110, ease: 'none', scrollTrigger: config }
      )

      // Layer 3 — Chairs: faster
      gsap.fromTo(chairs,
        { y: 0 },
        { y: 150, ease: 'none', scrollTrigger: config }
      )

      // Layer 4 — Fire: fastest foreground
      // ONLY y movement — no scale, no opacity, no other property
      gsap.fromTo(fire,
        { y: 0 },
        { y: 180, ease: 'none', scrollTrigger: config }
      )

      // Force recalculate layout
      ScrollTrigger.refresh()

    }, 200)

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(st => st.kill())
    }

  }, [])

  return { sectionRef, bgRef, rvRef, chairsRef, fireRef, canvasRef }
}
