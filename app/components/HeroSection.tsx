'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

const ASSETS = {
  background: 'https://static.wixstatic.com/media/62f926_e0e04aa080b0429ea3f63cc0335a383b~mv2.png',
  rv:         'https://static.wixstatic.com/media/62f926_632193a9c73745de87c9985e7ba52616~mv2.png',
  chairs:     'https://static.wixstatic.com/media/62f926_bf23e37064074d13911e9210dd2584e6~mv2.png',
  fire:       'https://static.wixstatic.com/media/62f926_f625242b8eb24cbbb064800c536e7b60~mv2.png',
} as const

const pills  = ['Horse Shows', 'Family Reunions', 'Corporate Events']
const badges = ['Full Setup Included', 'Same-Day Booking', '24/7 Support', 'Premium Fleet Only']

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%',  '8%'])
  const rvY         = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const chairsY     = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const fireY       = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width: '100%', height: '100svh', minHeight: '680px', overflow: 'hidden', backgroundColor: '#060402' }}
    >

      {/* ── Background Layer ──────────────────────────────────── */}
      <motion.div style={{ y: backgroundY, position: 'absolute', top: '-15%', left: 0, right: 0, width: '100%', height: '130%' }}>
        <img
          src={ASSETS.background} alt="" aria-hidden="true" loading="eager" decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%', filter: 'brightness(0.88) contrast(1.05) saturate(0.88)' }}
        />
        {/* Top shadow — keeps sky readable */}
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(to bottom, rgba(6,4,2,0.30), transparent)', pointerEvents: 'none' }} />
      </motion.div>

      {/* ── RV Layer ──────────────────────────────────────────── */}
      <motion.div style={{ y: rvY, position: 'absolute', top: '-10%', left: 0, right: 0, bottom: 0, width: '100%', height: '130%', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', paddingRight: '7%', paddingBottom: '7%' }}>
        <img
          src={ASSETS.rv} alt="Grand Design Reflection luxury fifth wheel RV" loading="eager" decoding="async"
          style={{ height: '62%', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.55))' }}
        />
      </motion.div>

      {/* ── Chairs Layer ──────────────────────────────────────── */}
      <motion.div style={{ y: chairsY, position: 'absolute', top: '-8%', left: 0, right: 0, bottom: 0, width: '100%', height: '130%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingLeft: '6%', paddingBottom: '6%' }}>
        <img
          src={ASSETS.chairs} alt="Two camp chairs by the fire" loading="eager" decoding="async"
          style={{ height: '40%', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 15px 40px rgba(0,0,0,0.60))' }}
        />
      </motion.div>

      {/* ── Fire Layer ────────────────────────────────────────── */}
      <motion.div style={{ y: fireY, position: 'absolute', top: '-5%', left: 0, right: 0, bottom: 0, width: '100%', height: '130%', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', paddingLeft: '12%', paddingBottom: '3%' }}>
        <div style={{ position: 'relative' }}>
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, filter: 'blur(52px)', opacity: 0.75, background: 'radial-gradient(circle, rgba(201,168,76,0.55) 0%, rgba(232,201,122,0.35) 30%, rgba(255,160,50,0.20) 50%, transparent 70%)' }} />
          <img
            src={ASSETS.fire} alt="Campfire" loading="eager" decoding="async"
            style={{ height: '28vh', width: 'auto', objectFit: 'contain', position: 'relative', zIndex: 10, filter: 'drop-shadow(0 10px 35px rgba(201,168,76,0.55))' }}
          />
        </div>
      </motion.div>

      {/* ── Overlay 1: Left — text zone ───────────────────────── */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 6, pointerEvents: 'none', background: 'linear-gradient(112deg, rgba(6,4,2,0.95) 0%, rgba(6,4,2,0.82) 22%, rgba(6,4,2,0.52) 42%, rgba(6,4,2,0.18) 60%, transparent 75%)' }} />

      {/* ── Overlay 2: Bottom ─────────────────────────────────── */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 6, pointerEvents: 'none', background: 'linear-gradient(to top, rgba(6,4,2,0.98) 0%, rgba(6,4,2,0.85) 12%, rgba(6,4,2,0.45) 26%, rgba(6,4,2,0.12) 40%, transparent 55%)' }} />

      {/* ── Overlay 3: Vignette ───────────────────────────────── */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 6, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 50%, transparent 38%, rgba(6,4,2,0.52) 100%)' }} />

      {/* ── Fire ambient glow (CSS animation) ─────────────────── */}
      <div className="hero-fire-glow" />

      {/* ── Hero Content ─────────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', textAlign: 'center', paddingBottom: 'clamp(52px, 7vh, 80px)', paddingLeft: '20px', paddingRight: '20px' }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
          style={{ marginBottom: '28px' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(201,168,76,0.10)', border: '1px solid rgba(201,168,76,0.45)', borderRadius: '999px', padding: '7px 20px', fontFamily: "'Cormorant Garamond', serif", fontSize: '11px', letterSpacing: '0.16em', color: '#C9A84C', textTransform: 'uppercase', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
            <span style={{ fontSize: '10px', letterSpacing: '3px' }}>★★★★★</span>
            <span style={{ color: 'rgba(201,168,76,0.30)' }}>|</span>
            <span>Tyler, Texas · From $200/night</span>
            <span style={{ color: 'rgba(201,168,76,0.30)' }}>|</span>
            <span>Open 24 / 7</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.55, ease: 'easeOut' }}
          style={{ margin: 0, textAlign: 'center' }}
        >
          <span style={{ display: 'block', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px, 5.8vw, 72px)', fontWeight: 400, color: '#FFFFFF', lineHeight: 1.02, letterSpacing: '-0.028em', textShadow: '0 2px 40px rgba(0,0,0,0.98), 0 8px 80px rgba(0,0,0,0.90)' }}>
            Your Group Shows Up.
          </span>
          <span style={{ display: 'block', fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px, 5.8vw, 72px)', fontWeight: 400, color: '#FFFFFF', lineHeight: 1.02, letterSpacing: '-0.028em', textShadow: '0 2px 40px rgba(0,0,0,0.98), 0 8px 80px rgba(0,0,0,0.90)' }}>
            Everything&apos;s Already
          </span>
          <span style={{ display: 'block', fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 'clamp(44px, 6.4vw, 80px)', fontWeight: 400, color: '#C9A84C', lineHeight: 1.02, letterSpacing: '-0.022em', marginTop: '6px', textShadow: '0 2px 30px rgba(0,0,0,0.95), 0 0 60px rgba(201,168,76,0.15)' }}>
            Taken Care Of.
          </span>
        </motion.h1>

        {/* Gold divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.55, delay: 0.9, ease: 'easeOut' }}
          style={{ width: '52px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.80), transparent)', margin: '28px auto', transformOrigin: 'center' }}
        />

        {/* Price anchor */}
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.92, ease: 'easeOut' }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(11px, 1.1vw, 13px)',
            color: 'rgba(201,168,76,0.85)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase' as const,
            marginBottom: '0px',
            marginTop: '0px',
            textShadow: '0 1px 20px rgba(0,0,0,0.95)',
          }}
        >
          From $200/night · Delivered &amp; Set Up Anywhere in Texas
        </motion.p>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0, ease: 'easeOut' }}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(15px, 1.6vw, 18px)', color: 'rgba(242,234,216,0.88)', lineHeight: 1.72, maxWidth: '420px', marginBottom: '28px', textShadow: '0 1px 20px rgba(0,0,0,0.95)' }}
        >
          You show up. The fire&apos;s already going.<br />
          We handled everything else.
        </motion.p>

        {/* Pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.1, ease: 'easeOut' }}
          style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {pills.map(label => (
            <span key={label} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '10px', letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(200,182,148,0.80)', border: '1px solid rgba(201,168,76,0.22)', borderRadius: '999px', padding: '5px 16px', background: 'rgba(201,168,76,0.04)' }}>
              {label}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.2, ease: 'easeOut' }}
          style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <a
            href="#gallery"
            className="hero-cta-primary"
            onMouseEnter={e => { e.currentTarget.style.background = '#E2C06A'; e.currentTarget.style.boxShadow = '0 6px 40px rgba(201,168,76,0.50), 0 2px 8px rgba(0,0,0,0.4)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#C9A84C'; e.currentTarget.style.boxShadow = '0 4px 28px rgba(201,168,76,0.35), 0 2px 8px rgba(0,0,0,0.4)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            See the Fleet ↓
          </a>
          <a href="tel:9729656901" className="hero-cta-secondary"
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.65)'; e.currentTarget.style.color = '#FFFFFF' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.30)'; e.currentTarget.style.color = 'rgba(242,234,216,0.80)' }}
          >
            Call (972) 965-6901
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.3, ease: 'easeOut' }}
          style={{ display: 'flex', gap: '22px', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {badges.map(label => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '7px', fontFamily: "'Cormorant Garamond', serif", fontSize: '10px', letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(168,148,118,0.78)' }}>
              <div style={{ width: '14px', height: '14px', border: '1px solid rgba(201,168,76,0.40)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7px', color: '#C9A84C', flexShrink: 0 }}>✓</div>
              {label}
            </div>
          ))}
        </motion.div>

      </div>

      {/* ── Scroll indicator ──────────────────────────────────── */}
      <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.40)' }}>Scroll</span>
        <div style={{ width: '1px', height: '36px', background: 'linear-gradient(to bottom, rgba(201,168,76,0.55), transparent)', animation: 'scrollDrop 2.5s ease-in-out infinite' }} />
      </div>

    </div>
  )
}
