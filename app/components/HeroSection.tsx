'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

const ASSETS = {
  background: 'https://static.wixstatic.com/media/62f926_e0e04aa080b0429ea3f63cc0335a383b~mv2.png',
  rv:         'https://static.wixstatic.com/media/62f926_632193a9c73745de87c9985e7ba52616~mv2.png',
  chairs:     'https://static.wixstatic.com/media/62f926_bf23e37064074d13911e9210dd2584e6~mv2.png',
  fire:       'https://static.wixstatic.com/media/62f926_f625242b8eb24cbbb064800c536e7b60~mv2.png',
} as const

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Parallax transforms — different speed per depth layer
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])
  const rvY         = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const chairsY     = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const fireY       = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const textY       = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', backgroundColor: '#0D0B09' }}
    >

      {/* ── Background Layer — Trees & Sky ───────────────────── */}
      <motion.div
        style={{ y: backgroundY, position: 'absolute', top: '-15%', left: 0, right: 0, width: '100%', height: '130%' }}
      >
        <img
          src={ASSETS.background}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', filter: 'brightness(0.85) contrast(1.06) saturate(0.90)' }}
        />
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), transparent, transparent)' }} />
      </motion.div>

      {/* ── RV Layer — Mid-ground ─────────────────────────────── */}
      <motion.div
        style={{ y: rvY, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '120%', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', paddingRight: '8%', paddingBottom: '6%' }}
      >
        <img
          src={ASSETS.rv}
          alt="Grand Design Reflection luxury fifth wheel RV"
          loading="eager"
          decoding="async"
          style={{ height: '60%', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.5))' }}
        />
      </motion.div>

      {/* ── Chairs Layer — Foreground ─────────────────────────── */}
      <motion.div
        style={{ y: chairsY, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '120%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingLeft: '8%', paddingBottom: '7%' }}
      >
        <img
          src={ASSETS.chairs}
          alt="Two camp chairs by the fire"
          loading="eager"
          decoding="async"
          style={{ height: '38%', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 15px 40px rgba(0,0,0,0.6))' }}
        />
      </motion.div>

      {/* ── Fire Layer — Front foreground (glow moves with it) ── */}
      <motion.div
        style={{ y: fireY, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '120%', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', paddingLeft: '13%', paddingBottom: '4%' }}
      >
        <div style={{ position: 'relative' }}>
          {/* Ambient glow */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              filter: 'blur(48px)',
              opacity: 0.7,
              background: 'radial-gradient(circle, rgba(201,168,76,0.5) 0%, rgba(232,201,122,0.3) 30%, rgba(255,160,50,0.2) 50%, transparent 70%)',
            }}
          />
          <img
            src={ASSETS.fire}
            alt="Campfire"
            loading="eager"
            decoding="async"
            style={{
              height: '28vh',
              width: 'auto',
              objectFit: 'contain',
              position: 'relative',
              zIndex: 10,
              filter: 'drop-shadow(0 10px 35px rgba(201,168,76,0.5))',
            }}
          />
        </div>
      </motion.div>

      {/* ── Hero Text Content ─────────────────────────────────── */}
      <motion.div
        style={{ y: textY, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', padding: '0 clamp(24px, 4vw, 64px)' }}
      >
        <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', marginTop: '8vh' }}>
          <div style={{ maxWidth: '672px', paddingLeft: '60px' }}>

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              style={{ marginBottom: '32px' }}
            >
              <span style={{
                display: 'inline-block',
                padding: '10px 16px',
                borderRadius: '9999px',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '13px',
                fontWeight: 400,
                color: '#D4AF55',
                backgroundColor: 'rgba(201,168,76,0.14)',
                border: '1px solid rgba(201,168,76,0.55)',
                letterSpacing: '0.03em',
              }}>
                ★★★★★ · Tyler, Texas · Open 24 / 7
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
              style={{ marginBottom: '24px' }}
            >
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
                fontWeight: 400,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                lineHeight: '1.2',
                textShadow: '0 2px 40px rgba(0,0,0,0.98), 0 4px 80px rgba(0,0,0,0.85)',
              }}>
                Texas&apos;s Finest<br />
                RV Experience.<br />
                <span style={{
                  fontStyle: 'italic',
                  color: '#D4AF55',
                  fontSize: 'clamp(2.4rem, 5.5vw, 4.6rem)',
                  fontWeight: 400,
                  textShadow: '0 2px 30px rgba(0,0,0,0.95)',
                }}>
                  Delivered to You.
                </span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
              style={{
                marginBottom: '24px',
                maxWidth: '512px',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(15px, 1.6vw, 18px)',
                fontWeight: 300,
                color: 'rgba(240,232,210,0.92)',
                lineHeight: '1.6',
                textShadow: '0 1px 20px rgba(0,0,0,0.95)',
              }}
            >
              You show up. The fire&apos;s already going. We handled everything else.
            </motion.p>

            {/* Identity Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85, ease: 'easeOut' }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}
            >
              {['Horse Shows', 'Family Reunions', 'Corporate Events'].map((item) => (
                <span key={item} style={{
                  padding: '6px 12px',
                  borderRadius: '9999px',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '13px',
                  fontWeight: 400,
                  color: 'rgba(220,205,170,0.90)',
                  backgroundColor: 'rgba(201,168,76,0.06)',
                  border: '1px solid rgba(201,168,76,0.30)',
                }}>
                  {item}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}
            >
              <a href="tel:9729656901" className="hero-cta-primary">
                Call (972) 965-6901
              </a>
              <a href="#gallery" className="hero-cta-secondary">
                See the Fleet ↓
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.15, ease: 'easeOut' }}
              style={{ display: 'flex', flexWrap: 'wrap', columnGap: '24px', rowGap: '8px' }}
            >
              {[
                'Full Setup Included',
                'Same-Day Booking',
                '24/7 Support',
                'Premium Fleet Only',
              ].map((badge) => (
                <span key={badge} style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '14px',
                  fontWeight: 400,
                  color: 'rgba(200,185,155,0.80)',
                }}>
                  ✓ {badge}
                </span>
              ))}
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* ── Left gradient — darkens text zone for readability ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(112deg, rgba(2,1,8,0.94) 0%, rgba(2,1,8,0.78) 28%, rgba(2,1,8,0.38) 52%, rgba(2,1,8,0.08) 68%, transparent 78%)',
          pointerEvents: 'none',
          zIndex: 15,
        }}
      />

      {/* ── Bottom fade-to-dark gradient ──────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '55%',
          background: 'linear-gradient(to top, rgba(2,1,8,0.97) 0%, rgba(2,1,8,0.82) 14%, rgba(2,1,8,0.40) 28%, rgba(2,1,8,0.10) 42%, transparent 55%)',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      />

    </div>
  )
}
