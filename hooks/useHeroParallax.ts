'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useHeroParallax() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef      = useRef<HTMLDivElement>(null)
  const rvRef      = useRef<HTMLDivElement>(null)
  const chairsRef  = useRef<HTMLDivElement>(null)
  const fireRef    = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Guarantee parallax starts from correct position on every load
    window.scrollTo(0, 0)

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {

      // ── PARALLAX SCROLL SYSTEM ──
      if (!prefersReducedMotion) {

        const scrollTriggerConfig = {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        }

        // fromTo with explicit y:0 start so layers are never pre-offset on load
        if (bgRef.current) {
          gsap.fromTo(bgRef.current,
            { y: 0 },
            { y: 55, ease: 'none', immediateRender: false, scrollTrigger: scrollTriggerConfig }
          )
        }

        if (rvRef.current) {
          gsap.fromTo(rvRef.current,
            { y: 0 },
            { y: 105, ease: 'none', immediateRender: false, scrollTrigger: scrollTriggerConfig }
          )
        }

        if (chairsRef.current) {
          gsap.fromTo(chairsRef.current,
            { y: 0 },
            { y: 145, ease: 'none', immediateRender: false, scrollTrigger: scrollTriggerConfig }
          )
        }

        // Fire: y scroll parallax ONLY — no scale, no opacity, no other transforms
        if (fireRef.current) {
          gsap.fromTo(fireRef.current,
            { y: 0 },
            { y: 175, ease: 'none', immediateRender: false, scrollTrigger: scrollTriggerConfig }
          )
        }

        // Cinematic entry scale
        gsap.from(section, {
          scale: 1.04,
          duration: 2.0,
          ease: 'power2.out',
        })

        // Force recalculate after mount to fix initial state
        ScrollTrigger.refresh()
      }

      // ── TEXT REVEAL ──
      if (!prefersReducedMotion) {
        const textTl = gsap.timeline({ delay: 0.3 })

        textTl
          .from('.hero-eyebrow', {
            y: 18, opacity: 0, duration: 0.65, ease: 'power3.out',
          })
          .from('.hero-line-1', {
            y: 60, opacity: 0, duration: 0.80, ease: 'power3.out',
          }, '-=0.35')
          .from('.hero-line-2', {
            y: 60, opacity: 0, duration: 0.80, ease: 'power3.out',
          }, '-=0.58')
          .from('.hero-line-3', {
            y: 60, opacity: 0, duration: 0.95, ease: 'power3.out',
          }, '-=0.58')
          .from('.hero-divider', {
            scaleX: 0, opacity: 0, duration: 0.55, ease: 'power2.out',
            transformOrigin: 'center',
          }, '-=0.45')
          .from('.hero-subhead', {
            y: 18, opacity: 0, duration: 0.50, ease: 'power2.out',
          }, '-=0.30')
          .from('.hero-pills', {
            y: 12, opacity: 0, duration: 0.40, ease: 'power2.out',
          }, '-=0.20')
          .from('.hero-ctas', {
            y: 12, opacity: 0, duration: 0.40, ease: 'power2.out',
          }, '-=0.15')
          .from('.hero-trust', {
            y: 8, opacity: 0, duration: 0.40, ease: 'power2.out',
          }, '-=0.10')

      } else {
        gsap.from('.hero-parallax__content', {
          opacity: 0, duration: 0.8, ease: 'power2.out',
        })
      }

    }, section)

    return () => ctx.revert()

  }, [])

  return { sectionRef, bgRef, rvRef, chairsRef, fireRef, canvasRef }
}
