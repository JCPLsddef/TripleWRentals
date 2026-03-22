'use client'

import { useHeroParallax } from '@/hooks/useHeroParallax'
import { useHeroEmbers }   from '@/hooks/useHeroEmbers'

const ASSETS = {
  background: 'https://static.wixstatic.com/media/62f926_e0e04aa080b0429ea3f63cc0335a383b~mv2.png',
  rv:         'https://static.wixstatic.com/media/62f926_632193a9c73745de87c9985e7ba52616~mv2.png',
  chairs:     'https://static.wixstatic.com/media/62f926_bf23e37064074d13911e9210dd2584e6~mv2.png',
  fire:       'https://static.wixstatic.com/media/62f926_f625242b8eb24cbbb064800c536e7b60~mv2.png',
} as const

export default function HeroSection() {
  const { sectionRef, bgRef, rvRef, chairsRef, fireRef, canvasRef } =
    useHeroParallax()

  useHeroEmbers(canvasRef)

  return (
    <section ref={sectionRef} className="hero-parallax">

      {/* Parallax scene — 4 layers */}
      <div className="hero-parallax__scene">
        <div ref={bgRef} className="hero-parallax__bg">
          <img
            src={ASSETS.background}
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
          />
        </div>

        <div ref={rvRef} className="hero-parallax__rv">
          <img
            src={ASSETS.rv}
            alt="Grand Design Reflection luxury fifth wheel RV"
            loading="eager"
            decoding="async"
          />
        </div>

        <div ref={chairsRef} className="hero-parallax__chairs">
          <img
            src={ASSETS.chairs}
            alt="Two camp chairs by the fire"
            loading="eager"
            decoding="async"
          />
        </div>

        <div ref={fireRef} className="hero-parallax__fire">
          <img
            src={ASSETS.fire}
            alt="Campfire"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      {/* Ember particles canvas */}
      <canvas
        ref={canvasRef}
        className="hero-parallax__embers"
        aria-hidden="true"
      />

      {/* Gradient overlays */}
      <div className="hero-parallax__overlays" aria-hidden="true">
        <div className="hero-parallax__grad-left" />
        <div className="hero-parallax__grad-btm"  />
      </div>

      {/* Hero content */}
      <div className="hero-parallax__content">

        <div className="hero-eyebrow">
          <span className="hero-eyebrow__stars">★★★★★</span>
          <span className="hero-eyebrow__sep">·</span>
          <span>Tyler, Texas</span>
          <span className="hero-eyebrow__sep">·</span>
          <span>Open 24 / 7</span>
        </div>

        <h1 className="hero-headline">
          <span className="hero-line-1">Texas&apos;s Finest</span>
          <span className="hero-line-2">RV Experience.</span>
          <span className="hero-line-3">Delivered to You.</span>
        </h1>

        <div className="hero-divider" aria-hidden="true" />

        <p className="hero-subhead">
          You show up. The fire&apos;s already going.<br />
          We handled everything else.
        </p>

        <div className="hero-pills">
          <span className="hero-pill">Horse Shows</span>
          <span className="hero-pill">Family Reunions</span>
          <span className="hero-pill">Corporate Events</span>
        </div>

        <div className="hero-ctas">
          <a href="tel:9729656901" className="hero-cta-primary">
            Call (972) 965-6901
          </a>
          <a href="#gallery" className="hero-cta-secondary">
            See the Fleet ↓
          </a>
        </div>

        <div className="hero-trust">
          {[
            'Full Setup Included',
            'Same-Day Booking',
            '24/7 Support',
            'Premium Fleet Only',
          ].map((label) => (
            <div key={label} className="hero-trust__item">
              <div className="hero-trust__check">✓</div>
              {label}
            </div>
          ))}
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator" aria-hidden="true">
        <div className="hero-scroll-line" />
      </div>

    </section>
  )
}
