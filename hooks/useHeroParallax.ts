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

        if (bgRef.current) {
          gsap.to(bgRef.current, {
            y: 55,
            ease: 'none',
            scrollTrigger: scrollTriggerConfig,
          })
        }

        if (rvRef.current) {
          gsap.to(rvRef.current, {
            y: 105,
            ease: 'none',
            scrollTrigger: scrollTriggerConfig,
          })
        }

        if (chairsRef.current) {
          gsap.to(chairsRef.current, {
            y: 145,
            ease: 'none',
            scrollTrigger: scrollTriggerConfig,
          })
        }

        if (fireRef.current) {
          gsap.to(fireRef.current, {
            y: 175,
            ease: 'none',
            scrollTrigger: scrollTriggerConfig,
          })
        }

        // Cinematic entry scale
        gsap.from(section, {
          scale: 1.04,
          duration: 2.0,
          ease: 'power2.out',
        })
      }

      // ── FIRE FLICKER — independent loop ──
      if (fireRef.current) {
        const flickerTl = gsap.timeline({ repeat: -1, yoyo: true })

        flickerTl
          .to(fireRef.current, {
            scaleX: 1.015,
            scaleY: 0.988,
            opacity: 0.93,
            duration: 0.18,
            ease: 'sine.inOut',
            transformOrigin: 'bottom center',
          })
          .to(fireRef.current, {
            scaleX: 0.988,
            scaleY: 1.012,
            opacity: 0.98,
            duration: 0.22,
            ease: 'sine.inOut',
            transformOrigin: 'bottom center',
          })
          .to(fireRef.current, {
            scaleX: 1.010,
            scaleY: 0.995,
            opacity: 0.95,
            duration: 0.15,
            ease: 'sine.inOut',
            transformOrigin: 'bottom center',
          })
          .to(fireRef.current, {
            scaleX: 0.995,
            scaleY: 1.008,
            opacity: 1.0,
            duration: 0.25,
            ease: 'sine.inOut',
            transformOrigin: 'bottom center',
          })

        if (prefersReducedMotion) {
          flickerTl.timeScale(0.3)
        }
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
