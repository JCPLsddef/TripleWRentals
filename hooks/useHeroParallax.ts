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
    const section = sectionRef.current
    const bg      = bgRef.current
    const rv      = rvRef.current
    const chairs  = chairsRef.current
    const fire    = fireRef.current
    if (!section || !bg || !rv || !chairs || !fire) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let rafId: number
    let ticking = false

    function updateParallax() {
      const scrollY = window.scrollY

      const heroTop    = section!.offsetTop
      const heroHeight = section!.offsetHeight
      const progress   = (scrollY - heroTop) / heroHeight

      if (progress < -0.1 || progress > 1.1) {
        ticking = false
        return
      }

      const bgMove     = scrollY * 0.08
      const rvMove     = scrollY * 0.15
      const chairsMove = scrollY * 0.22
      const fireMove   = scrollY * 0.30

      bg!.style.transform     = `translate3d(0, ${bgMove}px, 0)`
      rv!.style.transform     = `translate3d(0, ${rvMove}px, 0)`
      chairs!.style.transform = `translate3d(0, ${chairsMove}px, 0)`
      fire!.style.transform   = `translate3d(0, ${fireMove}px, 0)`

      ticking = false
    }

    function onScroll() {
      if (!ticking) {
        rafId = requestAnimationFrame(updateParallax)
        ticking = true
      }
    }

    updateParallax()
    window.addEventListener('scroll', onScroll, { passive: true })

    // GSAP for text reveal only — no ScrollTrigger
    const tl = gsap.timeline({ delay: 0.4 })
    tl
      .from('.hero-eyebrow', {
        y: 20, opacity: 0, duration: 0.6, ease: 'power3.out',
      })
      .from('.hero-line-1', {
        y: 55, opacity: 0, duration: 0.75, ease: 'power3.out',
      }, '-=0.3')
      .from('.hero-line-2', {
        y: 55, opacity: 0, duration: 0.75, ease: 'power3.out',
      }, '-=0.55')
      .from('.hero-line-3', {
        y: 55, opacity: 0, duration: 0.90, ease: 'power3.out',
      }, '-=0.55')
      .from('.hero-divider', {
        scaleX: 0, opacity: 0, duration: 0.5, ease: 'power2.out',
        transformOrigin: 'center',
      }, '-=0.4')
      .from('.hero-subhead', {
        y: 16, opacity: 0, duration: 0.5, ease: 'power2.out',
      }, '-=0.3')
      .from('.hero-pills', {
        y: 12, opacity: 0, duration: 0.4, ease: 'power2.out',
      }, '-=0.2')
      .from('.hero-ctas', {
        y: 12, opacity: 0, duration: 0.4, ease: 'power2.out',
      }, '-=0.15')
      .from('.hero-trust', {
        y: 8, opacity: 0, duration: 0.4, ease: 'power2.out',
      }, '-=0.1')

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
      tl.kill()
    }
  }, [])

  return { sectionRef, bgRef, rvRef, chairsRef, fireRef, canvasRef }
}
