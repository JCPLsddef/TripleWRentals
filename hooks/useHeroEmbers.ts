'use client'

import { useEffect, type RefObject } from 'react'

interface Ember {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  decay: number
  r: number
}

export function useHeroEmbers(
  canvasRef: RefObject<HTMLCanvasElement | null>
) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    let animId: number
    let W = 0
    let H = 0

    function setSize() {
      if (!canvas) return
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    setSize()

    const getFireX = () => W * 0.365
    const getFireY = () => H * 0.820

    function makeEmber(): Ember {
      return {
        x:     getFireX() + (Math.random() - 0.5) * 28,
        y:     getFireY(),
        vx:    (Math.random() - 0.5) * 0.50,
        vy:    -(0.55 + Math.random() * 0.95),
        life:  Math.random() * 0.65 + 0.35,
        decay: 0.0022 + Math.random() * 0.0040,
        r:     0.75 + Math.random() * 1.40,
      }
    }

    const isMobile = window.innerWidth < 768
    const emberCount = isMobile ? 10 : 24

    const embers: Ember[] = Array.from({ length: emberCount }, () => {
      const e = makeEmber()
      e.life = Math.random()
      return e
    })

    let frame = 0

    function draw() {
      if (!ctx) return
      frame++
      ctx.clearRect(0, 0, W, H)

      // Ground fire glow
      const glow = ctx.createRadialGradient(
        getFireX(), getFireY() + 10, 0,
        getFireX(), getFireY() + 10, H * 0.12
      )
      const glowFlick = 0.15 + Math.sin(frame * 0.09) * 0.05
      glow.addColorStop(0, `rgba(205, 78, 12, ${glowFlick})`)
      glow.addColorStop(0.5, `rgba(165, 48, 6, ${glowFlick * 0.4})`)
      glow.addColorStop(1, 'transparent')
      ctx.fillStyle = glow
      ctx.fillRect(
        getFireX() - H * 0.14,
        getFireY() - H * 0.06,
        H * 0.28,
        H * 0.15
      )

      // Embers
      embers.forEach((e, i) => {
        e.x    += e.vx + Math.sin(frame * 0.038 + i * 0.85) * 0.22
        e.y    += e.vy
        e.vy   *= 0.9982
        e.life -= e.decay

        if (e.life <= 0) {
          embers[i] = makeEmber()
          return
        }

        const a = Math.max(0, e.life) * 0.90

        ctx.beginPath()
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2)
        const hue = 10 + Math.floor(Math.random() * 28)
        ctx.fillStyle = `hsla(${hue}, 92%, 62%, ${a})`
        ctx.fill()

        if (e.r > 1.1) {
          const eg = ctx.createRadialGradient(
            e.x, e.y, 0,
            e.x, e.y, e.r * 4.5
          )
          eg.addColorStop(0, `hsla(16, 90%, 65%, ${a * 0.26})`)
          eg.addColorStop(1, 'transparent')
          ctx.fillStyle = eg
          ctx.fillRect(
            e.x - e.r * 5.5,
            e.y - e.r * 5.5,
            e.r * 11,
            e.r * 11
          )
        }
      })

      animId = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => setSize()
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [canvasRef])
}
