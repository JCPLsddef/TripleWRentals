'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { RVSlider } from './components/RVSlider';
import ReviewsSlider from './components/ReviewsSlider';
import './globals.css';

/* ─── Data ──────────────────────────────────────────────────── */

const faqs = [
  {
    q: 'How far do you deliver?',
    a: 'We deliver across Texas: Tyler, Dallas/Fort Worth, Houston, Austin, San Antonio, and surrounding areas. Call us to confirm your specific location and get a delivery quote.',
  },
  {
    q: "What's included in the rental?",
    a: "Every rental includes full delivery, setup, fresh linens, cookware, and a complete walkthrough. You get 24/7 support for your entire stay. Optional outdoor package (grill, chairs, lawn setup) available for just $75. Ask us when you call!",
  },
  {
    q: 'Do I need a truck or special license?',
    a: "No. We deliver and set up the RV at your location. You don't need a truck, a hitch, or any experience. We handle all the logistics. You just walk in.",
  },
  {
    q: "What if something breaks or doesn't work during my stay?",
    a: "Call or text us immediately. We're available 24/7 and will either walk you through it over the phone or come out to fix it in person. In the rare event something can't be resolved, we'll make it right. Your experience is our reputation.",
  },
  {
    q: 'How does booking work?',
    a: 'Simple: call or text us at (972) 965-6901. Tell us your dates and location. Most bookings are confirmed within the hour.',
  },
  {
    q: "What's your cancellation policy?",
    a: "Full refund for cancellations 30+ days out. 50% refund for 8–30 days. No refund within 7 days. Something came up? Just call us. We'll always try to work with you.",
  },
  {
    q: 'Can I rent for just one night?',
    a: "Yes. We offer daily, weekly, and monthly rentals. Weekend single-night slots go fast, especially in spring and fall. Call early to lock in your dates.",
  },
];

const moreServices = [
  { label: 'Great Southwest', href: 'https://triplewrentals.com/great-southwest' },
  { label: 'Texas Rose Horse Park', href: 'https://triplewrentals.com/texas-rose-horse-park' },
  { label: 'Contact & Services', href: 'https://triplewrentals.com/contact-%26-services' },
  { label: 'Generator Rentals', href: 'https://triplewrentals.com/generator-rentals' },
  { label: 'Hauling Services', href: 'https://triplewrentals.com/hauling-services' },
  { label: 'DFW RV Rentals', href: 'https://triplewrentals.com/dfw-rv-rentals' },
  { label: 'Houston RV Rentals', href: 'https://triplewrentals.com/houston-rv-rentals' },
  { label: "New RV's", href: 'https://triplewrentals.com/new-rvs' },
  { label: 'RV Consignment Texas', href: 'https://triplewrentals.com/rv-consignment-texas' },
  { label: 'Consign Your Supercar', href: 'https://triplewrentals.com/consign-your-supercar' },
  { label: 'Austin Rentals', href: 'https://triplewrentals.com/austin-rentals' },
  { label: 'APHA', href: 'https://triplewrentals.com/apha' },
  { label: 'Power Generators', href: 'https://triplewrentals.com/power-generators' },
  { label: 'Texas Motorplex', href: 'https://triplewrentals.com/texas-motorplex' },
  { label: 'Book with us!', href: 'https://triplewrentals.com/book-with-us' },
  { label: 'River Run ATV Park', href: 'https://triplewrentals.com/river-run-atv-park' },
  { label: 'Get your quote', href: 'https://triplewrentals.com/get-your-quote' },
  { label: 'Newest Additions', href: 'https://triplewrentals.com/newest-additions' },
];

/* ─── Component ─────────────────────────────────────────────── */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [counts, setCounts] = useState({ rentals: 50 });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', phone: '', dates: '', message: '' });
  const statsRef = useRef(null);
  const statsRan = useRef(false);

  /* Scroll reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* CountUp observer */
  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !statsRan.current) {
          statsRan.current = true;
          const dur = 1800;
          const start = Date.now();
          const tick = () => {
            const p = Math.min((Date.now() - start) / dur, 1);
            const e = 1 - Math.pow(1 - p, 3);
            setCounts({
              rentals: Math.round(e * 50),
            });
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  /* Steps connector animation */
  useEffect(() => {
    const connector = document.querySelector('.steps-connector') as HTMLElement | null;
    if (!connector) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          connector.classList.add('animated');
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(connector);
    return () => obs.disconnect();
  }, []);

  /* Cursor dot */
  useEffect(() => {
    const dot = document.getElementById('cursor-dot') as HTMLElement | null;
    if (!dot) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    let rafId = 0;

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.opacity = '0.9';
    };

    const animate = () => {
      currentX = lerp(currentX, mouseX, 0.18);
      currentY = lerp(currentY, mouseY, 0.18);
      dot.style.left = currentX + 'px';
      dot.style.top = currentY + 'px';
      rafId = requestAnimationFrame(animate);
    };
    animate();

    const onEnter = () => { dot.style.transform = 'translate(-50%,-50%) scale(2.2)'; };
    const onLeave = () => { dot.style.transform = 'translate(-50%,-50%) scale(1)'; };

    window.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button, .why-card').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  /* Lock scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* Gold cursor dot — desktop only */}
      <div id="cursor-dot" className="cursor-dot" />
      {/* ── SECTION 0: Mobile Sticky CTA ─────────────────────── */}
      <div
        className="mobile-sticky"
        style={{
          position: 'fixed',
          bottom: 0, left: 0, right: 0,
          zIndex: 40,
          display: 'none',
          gap: 10,
          padding: '12px 20px',
          background: 'rgba(13,11,9,0.95)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(201,168,76,0.2)',
        }}
      >
        <a
          href="tel:9729656901"
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#C9A84C',
            color: '#0D0B09',
            fontWeight: 500,
            fontSize: 14,
            borderRadius: 6,
            minHeight: 48,
            textDecoration: 'none',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Call (972) 965-6901
        </a>
        <a
          href="#quote"
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            color: '#A89880',
            border: '1px solid rgba(201,168,76,0.35)',
            fontWeight: 400,
            fontSize: 14,
            borderRadius: 6,
            minHeight: 48,
            textDecoration: 'none',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Request a Quote
        </a>
      </div>

      {/* ── SECTION 1: Navigation ────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 30,
        background: 'linear-gradient(to bottom, rgba(13,11,9,0.92) 0%, transparent 100%)',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 68,
      }}>
        {/* Logo */}
        <a href="#" style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 18, fontWeight: 500,
          color: '#F0E8D8',
          letterSpacing: '-0.01em',
        }}>
          Triple W <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 18, color: '#F0E8D8' }}>Rentals</span>
        </a>

        {/* Desktop Links */}
        <div className="desktop-nav-items" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {[['Gallery', '#gallery'], ['How It Works', '#how'], ['Reviews', '#reviews'], ['FAQ', '#faq']].map(([label, href]) => (
            <a key={label} href={href} style={{
              color: 'rgba(240,232,216,0.55)',
              fontSize: 12, fontWeight: 400,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              transition: 'color 0.15s',
            }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = '#F0E8D8'}
              onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(240,232,216,0.55)'}
            >{label}</a>
          ))}
          <a href="tel:9729656901" style={{
            background: '#C9A84C', color: '#0D0B09',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500, fontSize: 13,
            padding: '8px 18px', borderRadius: 999,
            transition: 'background 0.15s',
          }}
            onMouseEnter={e => (e.target as HTMLElement).style.background = '#E8C97A'}
            onMouseLeave={e => (e.target as HTMLElement).style.background = '#C9A84C'}
          >(972) 965-6901</a>
        </div>

        {/* Hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(true)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
            minHeight: 44, minWidth: 44,
          }}
          aria-label="Open menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect y="4" width="24" height="2" rx="1" fill="#F0E8D8" />
            <rect y="11" width="24" height="2" rx="1" fill="#F0E8D8" />
            <rect y="18" width="24" height="2" rx="1" fill="#F0E8D8" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0,
          background: '#0D0B09', zIndex: 50,
          display: 'flex', flexDirection: 'column',
          padding: '24px',
          overflowY: 'auto',
          animation: 'fadeUp 0.25s ease both',
        }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 40 }}>
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#F0E8D8', minHeight: 44, minWidth: 44,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              aria-label="Close menu"
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M4 4L24 24M24 4L4 24" stroke="#F0E8D8" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            {[
              ['Gallery', '#gallery'],
              ['How It Works', '#how'],
              ['Reviews', '#reviews'],
              ['FAQ', '#faq'],
              ['Book Now', '#quote'],
            ].map(([label, href]) => (
              <a key={label} href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 30, fontWeight: 400,
                  color: '#F0E8D8',
                  padding: '12px 0',
                  minHeight: 44,
                  display: 'block',
                }}
              >{label}</a>
            ))}
            {[
              ['Automatic Support', 'https://triplewrentals.com/automatic-support'],
              ['Golf Cart Rentals', 'https://triplewrentals.com/golf-cart-rentals'],
            ].map(([label, href]) => (
              <a key={label} href={href}
                target="_blank" rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 22, fontWeight: 400,
                  color: '#C9A84C',
                  padding: '8px 0',
                  minHeight: 44,
                  display: 'block',
                }}
              >{label}</a>
            ))}

            {/* More Services toggle */}
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              style={{
                background: 'none', border: '1px solid rgba(201,168,76,0.3)',
                color: '#C9A84C', fontFamily: "'Inter', sans-serif",
                fontSize: 14, fontWeight: 500,
                padding: '10px 24px', borderRadius: 8,
                cursor: 'pointer', marginTop: 16,
                minHeight: 44,
              }}
            >
              More Services {servicesOpen ? '▲' : '▼'}
            </button>
            {servicesOpen && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, marginTop: 8 }}>
                {moreServices.map(({ label, href }) => (
                  <a key={label} href={href}
                    target="_blank" rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      color: '#7A6E60',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14, fontWeight: 400,
                      padding: '8px 0', minHeight: 44,
                      display: 'flex', alignItems: 'center',
                    }}
                  >{label}</a>
                ))}
              </div>
            )}

            <a href="tel:9729656901" style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 24, fontWeight: 400,
              color: '#C9A84C', marginTop: 24,
              minHeight: 44, display: 'flex', alignItems: 'center',
            }}>(972) 965-6901</a>
          </div>
        </div>
      )}

      {/* ── SECTION 2: Hero ──────────────────────────────────── */}
      <section style={{
        minHeight: '100vh', overflow: 'hidden',
        position: 'relative',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      }}>
        {/* Background Image */}
        <Image
          src="/hero.jpg"
          alt="Triple W Rentals luxury RV"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 40%', filter: 'brightness(0.7) contrast(1.05) saturate(0.85)' }}
          priority
        />

        {/* Dark gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(13,11,9,0.15) 0%, rgba(13,11,9,0.25) 40%, rgba(13,11,9,0.80) 75%, rgba(13,11,9,1.00) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Content — bottom-weighted */}
        <div style={{
          position: 'relative', zIndex: 2,
          textAlign: 'center',
          padding: '0 24px 80px',
          maxWidth: 760, margin: '0 auto',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0,
        }}>
          {/* Eyebrow pill */}
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            fontSize: '12px', color: '#C9A84C',
            border: '1px solid rgba(201,168,76,0.35)',
            borderRadius: '999px', padding: '4px 12px',
            background: 'rgba(201,168,76,0.06)',
            fontFamily: "'Inter', sans-serif",
            whiteSpace: 'nowrap',
            marginBottom: 28,
            animation: 'fadeUp 0.6s ease 0.2s both',
          }}>
            ★★★★★ · Tyler, Texas · Open 24 / 7
          </span>

          {/* H1 */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            fontSize: 'clamp(36px, 6vw, 64px)',
            color: '#F0E8D8',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: 20,
          }}>
            <span style={{ display: 'block', animation: 'heroWord 0.75s ease 0.4s both', opacity: 0 }}>
              Texas&apos;s Finest<br />RV Experience.
            </span>
            <em style={{
              display: 'block',
              color: '#C9A84C',
              fontStyle: 'italic',
              animation: 'heroWord 0.75s ease 0.65s both',
              opacity: 0,
            }}>
              Delivered to You.
            </em>
          </h1>

          {/* Subhead */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(14px, 2vw, 16px)',
            color: '#A89880',
            maxWidth: 520, lineHeight: 1.65,
            margin: '0 auto',
            animation: 'fadeUp 0.7s ease 0.9s both', opacity: 0,
          }}>
            White-glove delivery across Texas. You choose the dates and the location — we handle everything from arrival to pickup.
          </p>

          {/* Use-case identity pills */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap',
            marginTop: 20, marginBottom: 28,
            animation: 'fadeUp 0.7s ease 1.0s both', opacity: 0,
          }}>
            {['Horse Shows', 'Family Reunions', 'Corporate Events'].map(label => (
              <span key={label} style={{
                fontSize: '12px', color: '#6B5F52',
                border: '1px solid rgba(201,168,76,0.2)',
                borderRadius: '999px', padding: '4px 14px',
                background: 'rgba(201,168,76,0.04)',
                fontFamily: "'Inter', sans-serif",
              }}>
                {label}
              </span>
            ))}
          </div>

          {/* CTA Row */}
          <div style={{
            display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center',
            animation: 'fadeUp 0.7s ease 1.1s both', opacity: 0,
          }}>
            <a
              href="tel:9729656901"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#C9A84C', color: '#0D0B09',
                fontSize: '14px', fontWeight: 500,
                padding: '14px 28px', borderRadius: '6px',
                textDecoration: 'none', border: 'none',
                transition: 'background 0.15s',
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#E8C97A')}
              onMouseLeave={e => (e.currentTarget.style.background = '#C9A84C')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.17 6.17l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z" /></svg>
              Call (972) 965-6901
            </a>
            <a
              href="#gallery"
              style={{
                display: 'inline-flex', alignItems: 'center',
                background: 'transparent', color: '#A89880',
                fontSize: '14px', fontWeight: 400,
                padding: '14px 28px', borderRadius: '6px',
                textDecoration: 'none',
                border: '1px solid rgba(201,168,76,0.35)',
                transition: 'border-color 0.15s, color 0.15s',
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.65)'; e.currentTarget.style.color = '#F0E8D8'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)'; e.currentTarget.style.color = '#A89880'; }}
            >
              See the Fleet ↓
            </a>
          </div>

          {/* Trust badges */}
          <div style={{
            display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center',
            marginTop: '20px',
            animation: 'fadeUp 0.7s ease 1.3s both', opacity: 0,
          }}>
            {['Full Setup Included', 'Same-Day Booking', '24/7 Support', 'Luxury Fleet Only'].map(t => (
              <span key={t} style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontSize: '12px', color: '#C9A84C',
                border: '1px solid rgba(201,168,76,0.35)',
                borderRadius: '999px', padding: '4px 12px',
                background: 'rgba(201,168,76,0.06)',
                whiteSpace: 'nowrap',
                fontFamily: "'Inter', sans-serif",
              }}>
                <span style={{ fontSize: '10px' }}>✓</span>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{
          position: 'absolute', bottom: 28, left: '50%',
          transform: 'translateX(-50%)',
          width: 1, height: 44,
          background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.7))',
          animation: 'breathe 2.4s ease-in-out infinite',
          zIndex: 2,
        }} />
      </section>

      {/* ── SECTION 3: Stats Bar ─────────────────────────────── */}
      <section ref={statsRef} style={{
        background: '#0F0D0A',
        borderTop: '1px solid rgba(201,168,76,0.12)',
        borderBottom: '1px solid rgba(201,168,76,0.12)',
        padding: '36px 24px',
      }}>
        <div className="stats-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24, maxWidth: 900, margin: '0 auto',
          textAlign: 'center',
        }}>
          {[
            { val: `${counts.rentals}+`, label: 'Rentals Delivered' },
            { val: '4.7★', label: '193 Verified Reviews' },
            { val: '24/7', label: 'Support Available' },
            { val: 'TX', label: 'Statewide Delivery' },
          ].map(({ val, label }) => (
            <div key={label}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(22px, 4vw, 36px)',
                fontWeight: 400, color: '#C9A84C',
                marginBottom: 6,
              }}>{val}</div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11, color: '#6B5F52',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 4B: Interior Showcase Slider ─────────────── */}
      <section id="gallery" aria-label="RV Interior Showcase" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Noise texture */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n0)'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px', opacity: 0.035, mixBlendMode: 'overlay', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{
          background: '#0D0B09',
          padding: '80px 40px 40px',
          textAlign: 'center',
          position: 'relative', zIndex: 1,
        }}>
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '14px' }}>
            <span style={{ display: 'inline-block', width: '28px', height: '1px', background: 'rgba(201,168,76,0.6)' }} />
            <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', fontFamily: "'Inter', sans-serif" }}>OUR FLEET</span>
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(26px, 4vw, 44px)',
            fontWeight: 400, color: '#F0E8D8',
            marginBottom: 14,
            letterSpacing: '-0.02em', lineHeight: 1.15,
          }}>
            Step Inside.{' '}
            <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>See Every Detail.</em>
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15, lineHeight: 1.65,
            color: '#A89880',
            maxWidth: 540, margin: '0 auto',
          }}>
            Browse each RV model and explore every room. Use the arrows to switch units. Tap any image to zoom through the interior.
          </p>
        </div>
        <div style={{ background: '#0D0B09', position: 'relative', zIndex: 1 }}>
          <RVSlider />
        </div>
      </section>

      {/* ── SECTION 5: How It Works ──────────────────────────── */}
      <section id="how" style={{ background: '#0D0B09', borderTop: '1px solid rgba(201,168,76,0.1)', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        {/* Noise texture */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n1'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n1)'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px', opacity: 0.035, mixBlendMode: 'overlay', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>

          {/* Header */}
          <div style={{ maxWidth: '560px', marginBottom: '36px' }}>
            <div style={{ marginBottom: '16px' }}>
              <span className="why-eyebrow-line" style={{ display: 'inline-block', width: '28px', height: '1px', background: 'rgba(201,168,76,0.6)', marginRight: '10px', verticalAlign: 'middle' }} />
              <span style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', verticalAlign: 'middle', fontWeight: 500 }}>HOW IT WORKS</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 300, color: '#F0E8D8', lineHeight: 1.15, letterSpacing: '-0.02em', marginTop: '12px', marginBottom: '12px' }}>
              From First Call to Check-In:{' '}
              <br />
              <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>Three Steps.</em>
            </h2>
            <p style={{ fontSize: '15px', color: '#A89880', lineHeight: 1.65, fontFamily: "'Inter', sans-serif" }}>
              No experience required. No truck needed. We handle every part of the process, start to finish.
            </p>
          </div>

          {/* Steps */}
          <div style={{ position: 'relative' }}>
            {/* Dashed connector — desktop only */}
            <div
              className="steps-connector"
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '27px',
                left: '56px',
                right: 'calc(100% / 3)',
                height: '1px',
                backgroundImage: 'repeating-linear-gradient(90deg, rgba(201,168,76,0.45) 0, rgba(201,168,76,0.45) 6px, transparent 6px, transparent 14px)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />
            <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, position: 'relative', zIndex: 1 }}>

              {/* Step 1 */}
              <div className="step-item" style={{ paddingRight: '32px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '1px solid rgba(201,168,76,0.45)', background: 'rgba(201,168,76,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
                  <svg viewBox="0 0 24 24" width="22" height="22" stroke="#C9A84C" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#F0E8D8', marginBottom: '10px', letterSpacing: '-0.01em' }}>Call or Text Us</h3>
                <p style={{ fontSize: '13px', color: '#7A6E60', lineHeight: 1.7 }}
                  dangerouslySetInnerHTML={{ __html: `Tell us your dates, location, and group size. Takes about two minutes. <strong style="color:#A89880;font-weight:400">No forms, no waiting.</strong>` }}
                />
                <span style={{ display: 'inline-block', marginTop: '14px', fontSize: '11px', color: '#C9A84C', letterSpacing: '0.04em', borderBottom: '1px solid rgba(201,168,76,0.3)', paddingBottom: '2px', opacity: 0.9 }}>
                  Most bookings confirmed same-day
                </span>
              </div>

              {/* Step 2 */}
              <div className="step-item" style={{ paddingRight: '32px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '1px solid rgba(201,168,76,0.45)', background: 'rgba(201,168,76,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
                  <svg viewBox="0 0 24 24" width="22" height="22" stroke="#C9A84C" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" rx="2"/>
                    <path d="M16 8h4l3 3v5h-7V8z"/>
                    <circle cx="5.5" cy="18.5" r="2.5"/>
                    <circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#F0E8D8', marginBottom: '10px', letterSpacing: '-0.01em' }}>We Deliver &amp; Set Up</h3>
                <p style={{ fontSize: '13px', color: '#7A6E60', lineHeight: 1.7 }}
                  dangerouslySetInnerHTML={{ __html: `Your RV arrives fully cleaned, stocked, and set up at your location. We connect utilities and <strong style="color:#A89880;font-weight:400">walk you through every feature.</strong>` }}
                />
                <span style={{ display: 'inline-block', marginTop: '14px', fontSize: '11px', color: '#C9A84C', letterSpacing: '0.04em', borderBottom: '1px solid rgba(201,168,76,0.3)', paddingBottom: '2px', opacity: 0.9 }}>
                  Arrive to a fully set-up RV
                </span>
              </div>

              {/* Step 3 */}
              <div className="step-item">
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '1px solid rgba(201,168,76,0.45)', background: 'rgba(201,168,76,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
                  <svg viewBox="0 0 24 24" width="22" height="22" stroke="#C9A84C" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#F0E8D8', marginBottom: '10px', letterSpacing: '-0.01em' }}>Enjoy Your Stay</h3>
                <p style={{ fontSize: '13px', color: '#7A6E60', lineHeight: 1.7 }}
                  dangerouslySetInnerHTML={{ __html: `We&#39;re on call day and night for anything you need. When you&#39;re done, we handle pickup too. <strong style="color:#A89880;font-weight:400">You just lock the door.</strong>` }}
                />
                <span style={{ display: 'inline-block', marginTop: '14px', fontSize: '11px', color: '#C9A84C', letterSpacing: '0.04em', borderBottom: '1px solid rgba(201,168,76,0.3)', paddingBottom: '2px', opacity: 0.9 }}>
                  Support available 24/7 throughout your stay
                </span>
              </div>

            </div>
          </div>

          {/* CTA Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '52px', flexWrap: 'wrap' }}>
            <a
              href="tel:9729656901"
              style={{ display: 'inline-flex', alignItems: 'center', background: '#C9A84C', color: '#0D0B09', fontSize: '14px', fontWeight: 500, letterSpacing: '0.01em', padding: '14px 28px', borderRadius: '6px', textDecoration: 'none', transition: 'background 0.15s ease', whiteSpace: 'nowrap' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#E8C97A')}
              onMouseLeave={e => (e.currentTarget.style.background = '#C9A84C')}
            >
              Book Your Rental · (972) 965-6901
            </a>
            <span style={{ fontSize: '13px', color: '#6B5F52' }}>
              or text us. <strong style={{ color: '#A89880', fontWeight: 400 }}>We&apos;ll respond within the hour.</strong>
            </span>
          </div>

        </div>
      </section>

      {/* ── SECTION 6: Reviews ───────────────────────────────── */}
      <section id="reviews" style={{
        background: '#0D0B09',
        borderTop: '1px solid rgba(201,168,76,0.10)',
        padding: '96px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Noise texture */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n3'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n3)'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px', opacity: 0.035, mixBlendMode: 'overlay', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="reveal" style={{ marginBottom: 48 }}>
            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <span style={{ display: 'inline-block', width: '28px', height: '1px', background: 'rgba(201,168,76,0.6)' }} />
              <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', fontFamily: "'Inter', sans-serif" }}>GUEST REVIEWS</span>
            </div>
            <div style={{ maxWidth: '560px' }}>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 400, color: '#F0E8D8',
                marginBottom: 10,
                letterSpacing: '-0.02em', lineHeight: 1.15,
              }}>
                What Our Guests{' '}
                <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>Experience.</em>
              </h2>
            </div>
            <p style={{ fontSize: 14, color: '#A89880', fontFamily: "'Inter', sans-serif" }}>
              4.7★ on Google · 193 verified reviews · Tyler, Texas
            </p>
          </div>
          <ReviewsSlider />
        </div>
      </section>

      {/* ── SECTION 7: Why Triple W ──────────────────────────── */}
      <section id="why" style={{ background: '#0D0B09', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>

        {/* Noise texture overlay */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n2)'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px', opacity: 0.035, mixBlendMode: 'overlay', pointerEvents: 'none', zIndex: 0 }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>

          {/* Header */}
          <div style={{ maxWidth: 560, marginBottom: 48 }}>
            <div style={{ marginBottom: 20 }}>
              <span style={{ display: 'inline-block', width: '28px', height: '1px', background: 'rgba(201,168,76,0.6)', marginRight: '10px', verticalAlign: 'middle' }} />
              <span style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', verticalAlign: 'middle', fontWeight: 500 }}>WHY TRIPLE W</span>
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 300,
              color: '#F0E8D8',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              marginBottom: 12,
            }}>
              The Standard Other RV Companies{' '}
              <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>Can&apos;t Match.</em>
            </h2>
            <p style={{
              fontSize: 15,
              color: '#A89880',
              lineHeight: 1.65,
              fontFamily: "'Inter', sans-serif",
            }}>
              White-glove delivery, the finest fleet in East Texas, and a team that&apos;s always reachable, day or night.
            </p>
          </div>

          {/* 2×2 Card Grid */}
          <div className="why-card-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 2,
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.15)',
            borderRadius: 10,
            overflow: 'hidden',
          }}>

            {/* Card 1 — White-Glove Delivery */}
            <div className="why-card">
              <div style={{
                width: 38, height: 38,
                background: 'rgba(201,168,76,0.05)',
                border: '1px solid rgba(201,168,76,0.3)',
                borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" rx="1" />
                  <path d="M16 8h4l3 5v4h-7V8z" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 500, color: '#F0E8D8', marginBottom: 8, letterSpacing: '-0.01em' }}>
                White-Glove Delivery
              </h3>
              <p style={{ fontSize: 13, color: '#7A6E60', lineHeight: 1.65 }}
                dangerouslySetInnerHTML={{ __html: 'No truck, no hitch, no experience needed. We bring the RV to your door, plug everything in, and <span style="color:#A89880">walk you through every feature</span> before we leave.' }}
              />
            </div>

            {/* Card 2 — The Finest Fleet in East Texas */}
            <div className="why-card">
              <div style={{
                width: 38, height: 38,
                background: 'rgba(201,168,76,0.05)',
                border: '1px solid rgba(201,168,76,0.3)',
                borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 500, color: '#F0E8D8', marginBottom: 8, letterSpacing: '-0.01em' }}>
                The Finest Fleet in East Texas
              </h3>
              <p style={{ fontSize: 13, color: '#7A6E60', lineHeight: 1.65 }}
                dangerouslySetInnerHTML={{ __html: 'Marble countertops. King beds. Massage chairs. <span style="color:#A89880">Smart TVs in every room</span>. Nicer than most hotels. We deliver it to you.' }}
              />
            </div>

            {/* Card 3 — Reserved Within the Hour */}
            <div className="why-card">
              <div style={{
                width: 38, height: 38,
                background: 'rgba(201,168,76,0.05)',
                border: '1px solid rgba(201,168,76,0.3)',
                borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 500, color: '#F0E8D8', marginBottom: 8, letterSpacing: '-0.01em' }}>
                Reserved Within the Hour
              </h3>
              <p style={{ fontSize: 13, color: '#7A6E60', lineHeight: 1.65 }}
                dangerouslySetInnerHTML={{ __html: 'Call or text. Tell us your dates and location. <span style="color:#A89880">Most bookings confirmed same-day</span>. No lengthy forms, no waiting.' }}
              />
            </div>

            {/* Card 4 — Always Reachable */}
            <div className="why-card">
              <div style={{
                width: 38, height: 38,
                background: 'rgba(201,168,76,0.05)',
                border: '1px solid rgba(201,168,76,0.3)',
                borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.1 10.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012.01 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 500, color: '#F0E8D8', marginBottom: 8, letterSpacing: '-0.01em' }}>
                Always Reachable
              </h3>
              <p style={{ fontSize: 13, color: '#7A6E60', lineHeight: 1.65 }}
                dangerouslySetInnerHTML={{ __html: 'Reach the team directly on the main line, or get an instant answer from our <span style="color:#A89880">AI agent</span>, any time of day or night.' }}
              />
            </div>

          </div>

          {/* Differentiator Strip */}
          <div className="diff-strip" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            background: 'rgba(201,168,76,0.04)',
            border: '1px solid rgba(201,168,76,0.15)',
            borderRadius: 8,
            marginTop: 20,
          }}>
            {[
              'Daily, weekly, or monthly. Flexible for any trip.',
              'Cleaned & sanitized before every rental',
              'Fully delivered & set up anywhere in Texas',
              'Friendly local team + AI line always on',
            ].map((text, i, arr) => (
              <div
                key={i}
                style={{
                  padding: '16px 18px',
                  borderRight: i < arr.length - 1 ? '1px solid rgba(201,168,76,0.1)' : 'none',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                }}
              >
                <span style={{ color: '#C9A84C', fontSize: 14, lineHeight: 1.5, flexShrink: 0, marginTop: 1 }}>•</span>
                <p style={{ fontSize: 13, color: '#A89880', lineHeight: 1.5 }}>{text}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 8: FAQ ───────────────────────────────────── */}
      <section id="faq" style={{ background: '#0D0B09', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>

        {/* Noise texture */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n4'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n4)'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px', opacity: 0.035, mixBlendMode: 'overlay', pointerEvents: 'none', zIndex: 0 }} />

        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>

          {/* Header */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ marginBottom: 16 }}>
              <span style={{ display: 'inline-block', width: '28px', height: '1px', background: 'rgba(201,168,76,0.6)', marginRight: '10px', verticalAlign: 'middle' }} />
              <span style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', verticalAlign: 'middle', fontWeight: 500 }}>COMMON QUESTIONS</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 300, color: '#F0E8D8', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
              Everything You Need to Know
            </h2>
          </div>

          <div>
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item" style={{ borderBottom: '1px solid rgba(201,168,76,0.12)', padding: '18px 0' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%', background: 'none', border: 'none',
                    cursor: 'pointer', padding: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    gap: 16, minHeight: 44,
                    textAlign: 'left',
                  }}
                  aria-expanded={openFaq === i}
                >
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 15, fontWeight: 500, color: '#F0E8D8',
                    lineHeight: 1.4, textAlign: 'left',
                  }}>{faq.q}</span>
                  <svg
                    width="16" height="16" viewBox="0 0 16 16"
                    fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"
                    style={{
                      flexShrink: 0,
                      transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)',
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    <line x1="8" y1="3" x2="8" y2="13" />
                    <line x1="3" y1="8" x2="13" y2="8" />
                  </svg>
                </button>
                <div style={{
                  maxHeight: openFaq === i ? 400 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease',
                }}>
                  <p style={{
                    fontSize: 14, color: '#7A6E60',
                    lineHeight: 1.75, paddingTop: '12px', paddingBottom: '6px',
                    fontFamily: "'Inter', sans-serif",
                  }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{
            marginTop: '32px',
            padding: '20px 24px',
            background: 'rgba(201,168,76,0.05)',
            border: '1px solid rgba(201,168,76,0.15)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <span style={{ fontSize: '14px', color: '#A89880', fontFamily: "'Inter', sans-serif" }}>
              Still have questions?
            </span>
            <a
              href="tel:9729656901"
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: '#C9A84C',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(201,168,76,0.4)',
                paddingBottom: '2px',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Call (972) 965-6901 →
            </a>
          </div>

        </div>
      </section>

      {/* ── SECTION 9: Closing CTA ───────────────────────────── */}
      <section id="quote" style={{ background: '#0D0B09', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>

        {/* Noise texture */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n5'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n5)'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px', opacity: 0.035, mixBlendMode: 'overlay', pointerEvents: 'none', zIndex: 0 }} />

        <div style={{ maxWidth: '580px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>

          {/* Section heading */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ marginBottom: 16 }}>
              <span style={{ display: 'inline-block', width: '28px', height: '1px', background: 'rgba(201,168,76,0.6)', marginRight: '10px', verticalAlign: 'middle' }} />
              <span style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', verticalAlign: 'middle', fontWeight: 500 }}>BOOK YOUR RENTAL</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 300, color: '#F0E8D8', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 12 }}>
              Reserve Your Dates.{' '}
              <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>We Handle Everything Else.</em>
            </h2>
            <p style={{ fontSize: '14px', color: '#A89880', lineHeight: 1.65, fontFamily: "'Inter', sans-serif" }}>
              Weekend availability goes fast, especially in spring and fall.
            </p>
          </div>

          {/* Scarcity signal */}
          <p style={{
            fontSize: '12px', color: '#6B5F52',
            textAlign: 'center', marginBottom: '20px',
            letterSpacing: '0.02em',
            fontFamily: "'Inter', sans-serif",
          }}>
            Spring and summer weekends book 2–3 weeks out.
          </p>

          {/* Quote Form card */}
          <div className="quote-card" style={{
            background: '#0F0D0A',
            border: '1px solid rgba(201,168,76,0.18)',
            borderRadius: '12px',
            padding: '40px',
          }}>
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              {[
                { label: 'Your Name', key: 'name', placeholder: 'John Smith', type: 'text' },
                { label: 'Phone Number', key: 'phone', placeholder: '(972) 555-0123', type: 'tel' },
              ].map(({ label, key, placeholder, type }) => (
                <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{
                    fontSize: '11px', fontWeight: 500,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: '#6B5F52', fontFamily: "'Inter', sans-serif",
                  }}>{label}</label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    style={{
                      background: '#161209',
                      border: '1px solid rgba(201,168,76,0.2)',
                      borderRadius: '6px',
                      padding: '12px 14px',
                      fontSize: '14px',
                      color: '#F0E8D8',
                      outline: 'none',
                      transition: 'border-color 0.15s',
                      fontFamily: "'Inter', sans-serif",
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.55)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'}
                  />
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: 16 }}>
              <label style={{
                fontSize: '11px', fontWeight: 500,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: '#6B5F52', fontFamily: "'Inter', sans-serif",
              }}>Rental Dates</label>
              <input
                type="text"
                placeholder="e.g. May 16 – 19, 2025"
                value={form.dates}
                onChange={e => setForm({ ...form, dates: e.target.value })}
                style={{
                  background: '#161209',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: '6px',
                  padding: '12px 14px',
                  fontSize: '14px',
                  color: '#F0E8D8',
                  outline: 'none',
                  transition: 'border-color 0.15s',
                  fontFamily: "'Inter', sans-serif",
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.55)'}
                onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: 24 }}>
              <label style={{
                fontSize: '11px', fontWeight: 500,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: '#6B5F52', fontFamily: "'Inter', sans-serif",
              }}>Message</label>
              <textarea
                rows={4}
                placeholder="Tell us about your event, location, or group size..."
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                style={{
                  background: '#161209',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: '6px',
                  padding: '12px 14px',
                  fontSize: '14px',
                  color: '#F0E8D8',
                  outline: 'none',
                  resize: 'vertical',
                  transition: 'border-color 0.15s',
                  fontFamily: "'Inter', sans-serif",
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.55)'}
                onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.2)'}
              />
            </div>

            <p style={{
              fontSize: '12px', color: '#6B5F52',
              textAlign: 'center', marginBottom: '10px', lineHeight: 1.5,
              fontFamily: "'Inter', sans-serif",
            }}>
              Every request is personally reviewed. No spam, ever.
            </p>

            <button
              type="button"
              disabled={formStatus === 'sending'}
              onClick={async () => {
                if (!form.name || !form.phone) return;
                setFormStatus('sending');
                try {
                  const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form),
                  });
                  if (res.ok) {
                    setFormStatus('success');
                    setForm({ name: '', phone: '', dates: '', message: '' });
                  } else {
                    setFormStatus('error');
                  }
                } catch {
                  setFormStatus('error');
                }
              }}
              style={{
                width: '100%',
                background: formStatus === 'sending' ? 'rgba(201,168,76,0.5)' : '#C9A84C',
                color: '#0D0B09',
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px', fontWeight: 500,
                letterSpacing: '0.01em',
                padding: '15px',
                borderRadius: '6px',
                border: 'none', cursor: formStatus === 'sending' ? 'default' : 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { if (formStatus !== 'sending') e.currentTarget.style.background = '#E8C97A'; }}
              onMouseLeave={e => { if (formStatus !== 'sending') e.currentTarget.style.background = '#C9A84C'; }}
            >
              {formStatus === 'sending' ? 'Sending...' : 'Send Request · We\u2019ll Call Within the Hour'}
            </button>

            {formStatus === 'success' && (
              <div style={{
                padding: '20px 24px',
                background: 'rgba(201,168,76,0.08)',
                border: '1px solid rgba(201,168,76,0.3)',
                borderRadius: '8px',
                textAlign: 'center',
                marginTop: '16px',
              }}>
                <div style={{ fontSize: '20px', color: '#C9A84C', marginBottom: '8px' }}>✓</div>
                <p style={{ color: '#F0E8D8', fontSize: '15px', fontWeight: 400, fontFamily: "'Playfair Display', serif", marginBottom: '4px' }}>
                  Request received.
                </p>
                <p style={{ color: '#A89880', fontSize: '13px', fontFamily: "'Inter', sans-serif" }}>
                  We&rsquo;ll call you back within the hour.
                </p>
              </div>
            )}

            {formStatus === 'error' && (
              <p style={{ color: '#E87878', fontSize: '13px', textAlign: 'center', marginTop: '12px', fontFamily: "'Inter', sans-serif" }}>
                Something went wrong. Please call us at{' '}
                <a href="tel:9729656901" style={{ color: '#C9A84C', borderBottom: '1px solid rgba(201,168,76,0.4)', paddingBottom: '1px' }}>(972) 965-6901</a>
              </p>
            )}

            <p style={{
              fontSize: '12px', color: '#6B5F52',
              textAlign: 'center', marginTop: '12px',
              fontFamily: "'Inter', sans-serif",
            }}>
              Prefer to call?{' '}
              <a href="tel:9729656901" style={{ color: '#A89880', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.3)' }}>
                (972) 965-6901
              </a>
            </p>
          </div>

        </div>
      </section>

      {/* ── SECTION 10: Map ──────────────────────────────────── */}
      <section style={{ background: '#0D0B09', borderTop: '1px solid rgba(201,168,76,0.10)', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
        {/* Noise texture */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n6'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n6)'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px', opacity: 0.035, mixBlendMode: 'overlay', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '14px' }}>
              <span style={{ display: 'inline-block', width: '28px', height: '1px', background: 'rgba(201,168,76,0.6)' }} />
              <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', fontFamily: "'Inter', sans-serif" }}>FIND US</span>
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(26px, 4vw, 44px)',
              fontWeight: 400, color: '#F0E8D8',
              letterSpacing: '-0.02em', lineHeight: 1.15,
              marginBottom: 12,
            }}>
              Find Us in{' '}
              <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>Tyler, Texas.</em>
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#A89880' }}>
              14078 State HWY 110 N, Tyler, Texas 75704
            </p>
          </div>

          <div style={{
            borderRadius: 10, overflow: 'hidden',
            border: '1px solid rgba(201,168,76,0.15)',
            marginBottom: 28,
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3365.9504833451133!2d-95.50569542354714!3d32.4740161737919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xaa3d36bd00c543f%3A0x3d0eff9988656b8c!2sTriple%20W%20Rentals!5e0!3m2!1sfr!2sca!4v1774039713056!5m2!1sfr!2sca"
              width="100%"
              height="400"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Triple W Rentals Location"
            />
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://maps.google.com/?q=Triple+W+Rentals+14078+State+HWY+110+N+Tyler+Texas"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Get Directions
            </a>
            <a href="tel:9729656901" className="btn-ghost">
              Call Before You Come
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 11: Footer ───────────────────────────────── */}
      <footer style={{
        background: '#0D0B09',
        borderTop: '1px solid rgba(201,168,76,0.12)',
        padding: '56px 24px 100px',
      }}>
        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 40,
          maxWidth: 1100, margin: '0 auto',
          marginBottom: 40,
        }}>
          <div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 22, fontWeight: 500, color: '#F0E8D8',
              marginBottom: 16,
            }}>
              Triple W <span style={{ color: '#C9A84C' }}>Rentals</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(240,232,216,0.35)', lineHeight: 1.8, fontFamily: "'Inter', sans-serif" }}>
              14078 State HWY 110 N<br />
              Tyler, Texas 75704<br />
              Open 24 / 7
            </p>
          </div>

          <div>
            <div style={{
              fontSize: 10, color: '#C9A84C',
              fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: "'Inter', sans-serif",
              marginBottom: 16,
            }}>QUICK LINKS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[['Gallery', '#gallery'], ['How It Works', '#how'], ['Reviews', '#reviews'], ['FAQ', '#faq'], ['Book Now', '#quote']].map(([label, href]) => (
                <a key={label} href={href} style={{
                  fontSize: 13, color: '#7A6E60',
                  fontFamily: "'Inter', sans-serif",
                  transition: 'color 0.15s',
                  minHeight: 24, textDecoration: 'none',
                }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = '#C9A84C'}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = '#7A6E60'}
                >{label}</a>
              ))}
            </div>
          </div>

          <div>
            <div style={{
              fontSize: 10, color: '#C9A84C',
              fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: "'Inter', sans-serif",
              marginBottom: 16,
            }}>CONTACT</div>
            <a href="tel:9729656901" style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 20, color: '#F0E8D8',
              display: 'block', marginBottom: 10,
            }}>(972) 965-6901</a>
            <a href="mailto:triplewrentals@gmail.com" style={{
              fontSize: 13, color: '#7A6E60',
              fontFamily: "'Inter', sans-serif",
              display: 'block', marginBottom: 8, textDecoration: 'none',
              transition: 'color 0.15s',
            }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = '#C9A84C'}
              onMouseLeave={e => (e.target as HTMLElement).style.color = '#7A6E60'}
            >triplewrentals@gmail.com</a>
            <p style={{ fontSize: 13, color: 'rgba(240,232,216,0.25)', fontFamily: "'Inter', sans-serif" }}>
              Owner: Westin Wayne Walker
            </p>
          </div>

          <div>
            <div style={{
              fontSize: 10, color: '#C9A84C',
              fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: "'Inter', sans-serif",
              marginBottom: 16,
            }}>SERVICE AREAS</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {['Tyler, TX (Home Base)', 'Dallas / Fort Worth', 'Houston', 'Austin', 'San Antonio', 'Call to confirm your area'].map(area => (
                <span key={area} style={{
                  fontSize: '11px',
                  color: '#7A6E60',
                  border: '1px solid rgba(201,168,76,0.18)',
                  borderRadius: '999px',
                  padding: '3px 10px',
                  fontFamily: "'Inter', sans-serif",
                }}>
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(240,232,216,0.07)',
          paddingTop: 24,
          maxWidth: 1100, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 10,
        }}>
          <p style={{ fontSize: 12, color: 'rgba(240,232,216,0.2)', fontFamily: "'Inter', sans-serif" }}>
            © 2026 Triple W Rentals · All Rights Reserved
          </p>
          <p style={{ fontSize: 12, color: 'rgba(240,232,216,0.2)', fontFamily: "'Inter', sans-serif" }}>
            Tyler, Texas 75704
          </p>
        </div>
      </footer>
    </>
  );
}
