'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Truck, Star, Clock, Phone } from 'lucide-react';
import RVSlider from './components/RVSlider';
import ReviewsSlider from './components/ReviewsSlider';
import HeroSection from './components/HeroSection';
import HowItWorks from './components/HowItWorks';
import UnicornBanner from './components/UnicornBanner';
import './globals.css';

/* ─── Data ──────────────────────────────────────────────────── */

const faqs = [
  {
    q: "How far do you deliver?",
    a: "We deliver across Texas — Tyler, Dallas/Fort Worth, Houston, Austin, San Antonio, and surrounding areas. Call us to confirm your location and get a delivery quote.",
  },
  {
    q: "What's included in the rental?",
    a: "Full delivery, setup, fresh linens, cookware, and a complete walkthrough. Plus 24/7 support for your entire stay. Optional outdoor package — grill, chairs, full lawn setup — available for $75. Just ask when you call.",
  },
  {
    q: "Do I need a truck or special license?",
    a: "No. We deliver and set up everything at your location. No truck, no hitch, no experience needed. You walk in and it's ready.",
  },
  {
    q: "What if something breaks during my stay?",
    a: "Call or text us immediately. We're available 24/7 and will walk you through it or come out in person. In the rare event something can't be resolved, we'll make it right. Your experience is our reputation.",
  },
  {
    q: "How does booking work?",
    a: "Call or text us at (972) 965-6901. Tell us your dates and location. Most bookings are confirmed within the day.",
  },
  {
    q: "What's your cancellation policy?",
    a: "Full refund for cancellations 30+ days out. 50% refund for 8–30 days. No refund within 7 days. Something came up? Just call us — we'll always try to work with you.",
  },
  {
    q: "Can I rent for just one night?",
    a: "Yes. We offer daily, weekly, and monthly rentals. Weekend slots go fast, especially spring and fall. Call early to lock in your dates.",
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

/* ─── Why Triple W Data ──────────────────────────────────────── */

const whyFeatures = [
  {
    icon: Truck,
    title: 'White-Glove Delivery',
    description: 'We bring the RV to you—fully set up, perfectly cleaned, and ready to enjoy. No hassle, no trips, just premium service.',
    image: 'https://static.wixstatic.com/media/62f926_a497e83d30a946aeab85a380919167c9~mv2.webp',
  },
  {
    icon: Star,
    title: 'The Finest Fleet in East Texas',
    description: 'Meticulously maintained, modern RVs from top brands. Each one handpicked for comfort, reliability, and premium amenities.',
    image: 'https://static.wixstatic.com/media/62f926_b86114a3592b498d8035eea569758bc6~mv2.png',
  },
  {
    icon: Clock,
    title: 'Reserved Within the Hour',
    description: 'Fast, simple booking with instant confirmations. No waiting, no uncertainty—just quick, professional service.',
    image: 'https://static.wixstatic.com/media/62f926_c87969a6134e4536a1a5d61010d02c4a~mv2.png',
  },
  {
    icon: Phone,
    title: 'Always Reachable',
    description: "Real people, real support. Call, text, or message anytime during your trip. We're here to make sure everything goes perfectly.",
    image: 'https://static.wixstatic.com/media/62f926_a940034c8aee471c977633f272c30af9~mv2.png',
  },
] as const;

const whyTrustPoints = [
  'Daily, weekly, or monthly. Flexible for any trip.',
  'Cleaned & sanitized before every rental.',
  'Fully delivered & set up anywhere in Texas.',
  'Friendly local team + instant support.',
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
  const whyRef = useRef<HTMLElement>(null);

  // Calendar picker state
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const d = new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  });
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const whyInView = useInView(whyRef, { once: true, amount: 0.2 });

  // Calendar click-outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setCalendarOpen(false);
      }
    };
    if (calendarOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [calendarOpen]);

  // Always start at top of page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Calendar helpers
  const formatDateRange = (start: Date | null, end: Date | null): string => {
    if (!start) return '';
    const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    if (!end) return start.toLocaleDateString('en-US', opts);
    return `${start.toLocaleDateString('en-US', opts)} – ${end.toLocaleDateString('en-US', { ...opts, year: 'numeric' })}`;
  };
  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
  const isInRange = (day: Date) => {
    if (!startDate) return false;
    const check = endDate || hoverDate;
    if (!check) return false;
    const [lo, hi] = startDate <= check ? [startDate, check] : [check, startDate];
    return day > lo && day < hi;
  };
  const handleDayClick = (day: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else {
      if (day < startDate) {
        setEndDate(startDate);
        setStartDate(day);
      } else if (isSameDay(day, startDate)) {
        setStartDate(null);
      } else {
        setEndDate(day);
        setCalendarOpen(false);
      }
      const rangeStr = formatDateRange(
        day < startDate ? day : startDate,
        day < startDate ? startDate : day
      );
      setForm(prev => ({ ...prev, dates: rangeStr }));
    }
  };
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();
  const prevMonth = () => {
    setCalendarMonth(prev => {
      if (prev.month === 0) return { year: prev.year - 1, month: 11 };
      return { year: prev.year, month: prev.month - 1 };
    });
  };
  const nextMonth = () => {
    setCalendarMonth(prev => {
      if (prev.month === 11) return { year: prev.year + 1, month: 0 };
      return { year: prev.year, month: prev.month + 1 };
    });
  };
  const MONTH_NAMES = ['January','February','March','April','May','June',
    'July','August','September','October','November','December'];
  const DAY_NAMES = ['Su','Mo','Tu','We','Th','Fr','Sa'];

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
        background: 'linear-gradient(to bottom, rgba(13,11,9,0.95) 0%, rgba(13,11,9,0.60) 60%, transparent 100%)',
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 62,
      }}>
        {/* Logo */}
        <a href="#" style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 17, fontWeight: 500,
          color: '#F0E8D8',
          letterSpacing: '-0.01em',
        }}>
          Triple W <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 15, color: 'rgba(240,232,216,0.70)', marginLeft: 2 }}>Rentals</span>
        </a>

        {/* Desktop Links */}
        <div className="desktop-nav-items" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {[['Fleet', '#gallery'], ['Process', '#how'], ['Reviews', '#reviews'], ['FAQ', '#faq'], ['Golf Carts', 'https://triple-w-golf-carts.vercel.app']].map(([label, href]) => (
            <a key={label} href={href}
              {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              style={{
              color: 'rgba(240,232,216,0.60)',
              fontSize: 11, fontWeight: 400,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = '#F0E8D8'}
              onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(240,232,216,0.60)'}
            >{label}</a>
          ))}
          <a href="tel:9729656901" style={{
            background: '#C9A84C', color: '#0D0B09',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500, fontSize: 12,
            letterSpacing: '0.02em',
            padding: '8px 20px', borderRadius: 999,
            transition: 'all 0.2s',
            boxShadow: '0 2px 12px rgba(201,168,76,0.20)',
          }}
            onMouseEnter={e => { (e.target as HTMLElement).style.background = '#E8C97A'; (e.target as HTMLElement).style.boxShadow = '0 4px 20px rgba(201,168,76,0.35)'; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.background = '#C9A84C'; (e.target as HTMLElement).style.boxShadow = '0 2px 12px rgba(201,168,76,0.20)'; }}
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
              ['Golf Cart Rentals', 'https://triple-w-golf-carts.vercel.app'],
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
      <HeroSection />

      {/* ── SECTION 3: Stats Bar ─────────────────────────────── */}
      <section ref={statsRef} style={{
        background: '#0E0B07',
        borderTop: '1px solid rgba(201,168,76,0.10)',
        borderBottom: '1px solid rgba(201,168,76,0.10)',
        padding: '52px 24px',
        position: 'relative',
      }}>
        {/* Radial gold glow */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)',
        }} />
        <div className="stats-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          maxWidth: 920, margin: '0 auto',
          textAlign: 'center',
        }}>
          {[
            { val: `${counts.rentals}+`, label: 'Rentals Delivered' },
            { val: '4.7★', label: '193 Verified Reviews' },
            { val: '24/7', label: 'Support Available' },
            { val: 'TX', label: 'Statewide Delivery' },
          ].map(({ val, label }, i, arr) => (
            <div key={label} style={{
              borderRight: i < arr.length - 1 ? '1px solid rgba(201,168,76,0.10)' : 'none',
              padding: '0 20px',
            }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(28px, 3vw, 42px)',
                fontWeight: 400, color: '#C9A84C',
                lineHeight: 1,
                marginBottom: 8,
                textShadow: '0 0 20px rgba(201,168,76,0.12)',
              }}>{val}</div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 10, color: 'rgba(168,148,118,0.60)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 400,
              }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 4B: Interior Showcase Slider ─────────────── */}
      <section id="gallery" aria-label="RV Interior Showcase" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Noise texture */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n0)'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px', opacity: 0.035, mixBlendMode: 'overlay', pointerEvents: 'none', zIndex: 0 }} />

        <div style={{ background: '#0D0B09', position: 'relative', zIndex: 1 }}>
          <RVSlider />
        </div>
      </section>


      {/* ── SECTION 4C: Who This Is For ──────────────────────── */}
      <section style={{
        background: '#F5F0E8',
        padding: '88px 0',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(201,168,76,0.20)',
        borderBottom: '1px solid rgba(201,168,76,0.20)',
      }}>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>

          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 400,
            color: '#1C1510',
            textAlign: 'center',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: 64,
          }}>
            Built for the Moments<br/>
            <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>That Actually Matter.</em>
          </h2>

          {/* Two columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
          }}>

            {/* Card 1 — Families */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid rgba(201,168,76,0.25)',
              borderRadius: 12,
              padding: '44px 40px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 2px 16px rgba(28,21,16,0.08)',
            }}>
              <div style={{
                width: 48, height: 48,
                borderRadius: 10,
                background: 'rgba(201,168,76,0.08)',
                border: '1px solid rgba(201,168,76,0.20)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 28,
                fontSize: 22,
              }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 22l4-8 5 3 5-3 4 8"/><path d="M12 2L2 14h20L12 2z"/></svg></div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(20px, 2vw, 26px)',
                fontWeight: 400,
                color: '#1C1510',
                marginBottom: 16,
                lineHeight: 1.2,
              }}>Families & Reunions</h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                color: '#4A3A28',
                fontWeight: 300,
                lineHeight: 1.8,
                marginBottom: 28,
              }}>
                Hosting a reunion, birthday, or family getaway? We deliver to your campsite, park, or private land. Your family walks into a fully stocked, climate-controlled home base — no setup, no stress, just time together.
              </p>
              <div style={{
                display: 'flex', flexDirection: 'column' as const, gap: 10,
              }}>
                {['Sleeps up to 14 guests', 'Delivered to any Texas location', 'Full kitchen, beds, bathrooms ready'].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#C9A84C', flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#5A4030', fontWeight: 300 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2 — Corporate */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid rgba(201,168,76,0.25)',
              borderRadius: 12,
              padding: '44px 40px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 2px 16px rgba(28,21,16,0.08)',
            }}>
              <div style={{
                width: 48, height: 48,
                borderRadius: 10,
                background: 'rgba(201,168,76,0.08)',
                border: '1px solid rgba(201,168,76,0.20)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 28,
                fontSize: 22,
              }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 11h1a3 3 0 0 1 0 6h-1"/><path d="M9 12H6a3 3 0 0 0 0 6h1"/><path d="M12 17v-6"/><path d="M9 8h.01"/><path d="M15 8h.01"/><path d="M12 2a7 7 0 0 1 7 7v1H5V9a7 7 0 0 1 7-7z"/></svg></div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(20px, 2vw, 26px)',
                fontWeight: 400,
                color: '#1C1510',
                marginBottom: 16,
                lineHeight: 1.2,
              }}>Corporate & Events</h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                color: '#4A3A28',
                fontWeight: 300,
                lineHeight: 1.8,
                marginBottom: 28,
              }}>
                Planning a team retreat, corporate event, or horse show weekend? Your crew deserves better than a hotel block. We deliver premium accommodations on-site — so your team stays comfortable, focused, and impressed.
              </p>
              <div style={{
                display: 'flex', flexDirection: 'column' as const, gap: 10,
              }}>
                {['Horse shows & equestrian events', 'Corporate retreats & team trips', 'Weekend events, same-day confirmed'].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#C9A84C', flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#5A4030', fontWeight: 300 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom CTA */}
          <div style={{ textAlign: 'center', marginTop: 52 }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(16px, 1.6vw, 20px)',
              color: 'rgba(28,21,16,0.55)',
              marginBottom: 28,
            }}>
              Not sure which RV fits your group? We&apos;ll match you in minutes.
            </p>
            <a href="tel:9729656901" style={{
              display: 'inline-block',
              background: '#C9A84C',
              color: '#0D0B09',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 12,
              letterSpacing: '0.10em',
              textTransform: 'uppercase' as const,
              padding: '16px 48px',
              borderRadius: 4,
              textDecoration: 'none',
            }}>Call (972) 965-6901</a>
          </div>

        </div>
      </section>

      {/* ── SECTION 5: How It Works ──────────────────────────── */}
      <HowItWorks />

      {/* ── SECTION 5.5: Unicorn Banner ──────────────────────── */}
      <UnicornBanner />

      {/* ── Cinematic Social Proof Quote ─────────────────────── */}
      <section style={{
        background: '#060402',
        padding: '100px 24px',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(201,168,76,0.08)',
      }}>
        {/* Background texture */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          maxWidth: 780,
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}>

          {/* Opening quote mark */}
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(60px, 8vw, 96px)',
            color: 'rgba(201,168,76,0.15)',
            lineHeight: 0.8,
            marginBottom: 32,
            fontWeight: 400,
          }}>&ldquo;</div>

          {/* The quote */}
          <blockquote style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(22px, 3.2vw, 38px)',
            color: '#F0E8D8',
            lineHeight: 1.55,
            letterSpacing: '-0.01em',
            margin: '0 0 40px',
          }}>
            He goes beyond Ritz Carlton standards. Our new first choice when coming to Texas Rose Horse Park.
          </blockquote>

          {/* Attribution line */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
          }}>
            <div style={{ width: 40, height: 1, background: 'rgba(201,168,76,0.4)' }} />
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
              color: '#C9A84C',
            }}>Tim S. &middot; Verified Google Review</span>
            <div style={{ width: 40, height: 1, background: 'rgba(201,168,76,0.4)' }} />
          </div>

        </div>
      </section>

      {/* ── SECTION 6: Reviews ───────────────────────────────── */}
      <ReviewsSlider />

      {/* ── SECTION 7: Why Triple W ──────────────────────────── */}
      <section id="why" ref={whyRef} style={{ background: '#0F0D0B', padding: '88px 0', position: 'relative', overflow: 'hidden' }}>

        {/* Background gradient orbs */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', top: 0, left: '25%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }} />
          <div style={{ position: 'absolute', bottom: 0, right: '25%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(143,106,46,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        </div>

        {/* Noise texture */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n2)'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px', opacity: 0.035, mixBlendMode: 'overlay', pointerEvents: 'none', zIndex: 0 }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>

          {/* Header — centered */}
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={whyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(32px, 4.5vw, 56px)',
                fontWeight: 400,
                color: '#F0E8D8',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                maxWidth: 800,
                margin: '0 auto 18px',
              }}
            >
              The Standard No Other RV<br />Company Can Match
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={whyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(15px, 1.5vw, 18px)',
                color: '#A89880',
                fontWeight: 300,
                lineHeight: 1.7,
                maxWidth: 680,
                margin: '0 auto',
              }}
            >
              White-glove delivery, a premium fleet, and service that stays with you from first call to check-out.
            </motion.p>
          </div>

          {/* 2×2 Card Grid */}
          <div className="why-card-grid-v2">
            {whyFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const delays = [0.4, 0.5, 0.6, 0.7] as const;
              return (
                <motion.div
                  key={index}
                  className="why-card-v2"
                  initial={{ opacity: 0, y: 40 }}
                  animate={whyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.9, delay: delays[index], ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    background: '#0D0B09',
                    border: '1px solid rgba(201,168,76,0.14)',
                    boxShadow: '0 4px 32px rgba(0,0,0,0.45)',
                  }}
                >
                  {/* Inner glow on hover */}
                  <div className="why-card-v2-inner-glow" />

                  {/* Full-bleed photo + gradient overlay */}
                  <div style={{ position: 'absolute', inset: 0, borderRadius: 14, overflow: 'hidden', zIndex: 0 }}>
                    <img
                      src={feature.image}
                      alt=""
                      aria-hidden="true"
                      className="why-card-v2-photo"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.75) saturate(0.85) contrast(1.08)', transition: 'filter 0.7s ease' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 55%, rgba(0,0,0,0.10) 100%)', borderRadius: 14, zIndex: 1 }} />
                  </div>

                  {/* Content pinned to bottom */}
                  <div style={{ position: 'relative', zIndex: 2, padding: '40px 40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minHeight: 320 }}>
                    {/* Icon badge */}
                    <div
                      className="why-card-v2-icon-badge"
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 20,
                        background: 'rgba(13,11,9,0.55)',
                        border: '1px solid rgba(201,168,76,0.30)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                      }}
                    >
                      <Icon
                        className="why-card-v2-icon"
                        size={22}
                        style={{ color: '#C9A84C' }}
                        strokeWidth={1.5}
                      />
                    </div>

                    <h3 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(18px, 2vw, 22px)',
                      fontWeight: 400,
                      color: '#F0E8D8',
                      lineHeight: 1.25,
                      letterSpacing: '-0.01em',
                      marginBottom: 10,
                    }}>
                      {feature.title}
                    </h3>

                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      color: 'rgba(240,232,216,0.78)',
                      fontWeight: 300,
                      lineHeight: 1.70,
                      maxWidth: 440,
                      margin: 0,
                    }}>
                      {feature.description}
                    </p>
                  </div>

                  {/* Bottom gold accent bar — slides in on hover */}
                  <div className="why-card-v2-bottom-bar" />
                </motion.div>
              );
            })}
          </div>

          {/* Trust Strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={whyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              borderRadius: 12,
              padding: '28px 36px',
              marginTop: 36,
              background: 'linear-gradient(145deg, #15120F 0%, #1A1410 100%)',
              border: '1px solid rgba(201,168,76,0.12)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.20)',
            }}
          >
            <div className="why-trust-grid">
              {whyTrustPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={whyInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.7, delay: 1.0 + index * 0.1 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}
                >
                  <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: '#C9A84C',
                    boxShadow: '0 0 8px rgba(201,168,76,0.45)',
                    flexShrink: 0,
                    marginTop: 8,
                  }} />
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    color: '#A89880',
                    fontWeight: 300,
                    lineHeight: 1.7,
                  }}>
                    {point}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── SECTION 8: FAQ ───────────────────────────────────── */}
      <section id="faq" style={{ background: '#F4EDE3', padding: '88px 0', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(201,168,76,0.20)' }}>

        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>

          {/* Header */}
          <div style={{ marginBottom: 48, textAlign: 'center' }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 400, color: '#2A1F14', letterSpacing: '-0.02em', lineHeight: 1.12, maxWidth: '520px', margin: '0 auto' }}>
              Everything You Need<br />to Know.
            </h2>
          </div>

          <div>
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item" style={{ borderBottom: '1px solid rgba(42,31,20,0.12)', padding: '20px 0' }}>
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
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 14, fontWeight: 500, color: '#2A1F14',
                    lineHeight: 1.5, textAlign: 'left',
                    letterSpacing: '0.01em',
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
                    fontSize: 13, color: '#5A4030',
                    lineHeight: 1.8, paddingTop: '10px', paddingBottom: '12px',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 300,
                  }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{
            marginTop: '36px',
            padding: '24px 28px',
            background: 'rgba(201,168,76,0.06)',
            border: '1px solid rgba(201,168,76,0.25)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <span style={{ fontSize: '14px', color: '#2A1F14', fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}>
              Still have questions?
            </span>
            <a
              href="tel:9729656901"
              style={{
                fontSize: '13px',
                fontWeight: 500,
                color: '#C9A84C',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(201,168,76,0.35)',
                paddingBottom: '2px',
                fontFamily: "'Outfit', sans-serif",
                letterSpacing: '0.02em',
              }}
            >
              Call (972) 965-6901 →
            </a>
          </div>

        </div>
      </section>

      {/* ── Tension Strip ────────────────────────────────────── */}
      <section style={{
        background: '#0A0806',
        padding: '64px 24px',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(201,168,76,0.12)',
      }}>
        {/* Subtle vignette */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.03) 0%, transparent 60%)',
        }} />

        <div style={{
          maxWidth: 560,
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Gold rule */}
          <div style={{
            width: 40,
            height: 1,
            background: 'rgba(201,168,76,0.50)',
            margin: '0 auto 28px',
          }} />

          {/* Line 1 */}
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(16px, 1.8vw, 20px)',
            color: 'rgba(240,232,216,0.60)',
            letterSpacing: '0.01em',
            lineHeight: 1.5,
            margin: '0 0 14px',
          }}>
            Weekend dates fill fast.
          </p>

          {/* Line 2 */}
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            fontSize: 'clamp(18px, 2.2vw, 26px)',
            color: '#C9A84C',
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
            margin: 0,
          }}>
            The RV you want may not be available next week.
          </p>
        </div>
      </section>

      {/* ── SECTION 9: Closing CTA ───────────────────────────── */}
      <section id="quote" style={{ background: '#0A0806', padding: '88px 0', position: 'relative', overflow: 'hidden' }}>

        {/* Noise texture */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n5'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n5)'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px', opacity: 0.035, mixBlendMode: 'overlay', pointerEvents: 'none', zIndex: 0 }} />

        <div style={{ maxWidth: '580px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>

          {/* Section heading */}
          <div style={{ marginBottom: 32, textAlign: 'center' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 400, color: '#F0E8D8', letterSpacing: '-0.02em', lineHeight: 1.12, marginBottom: 14 }}>
              Reserve Your Dates.<br />
              <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>We Handle the Rest.</em>
            </h2>
            <p style={{ fontSize: '13px', color: '#A89880', lineHeight: 1.7, fontFamily: "'Inter', sans-serif", maxWidth: '360px', margin: '0 auto', fontWeight: 300 }}>
              Weekend availability goes fast — spring and summer weekends book 2–3 weeks out.
            </p>
          </div>

          {/* Quote Form card */}
          <div className="quote-card" style={{
            background: 'linear-gradient(145deg, #12100C 0%, #0F0D0A 100%)',
            border: '1px solid rgba(201,168,76,0.15)',
            borderRadius: '10px',
            padding: '36px 36px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(201,168,76,0.04), inset 0 0 60px rgba(201,168,76,0.02)',
          }}>
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              {[
                { label: 'Your Name', key: 'name', placeholder: 'John Smith', type: 'text' },
                { label: 'Phone Number', key: 'phone', placeholder: '(972) 555-0123', type: 'tel' },
              ].map(({ label, key, placeholder, type }) => (
                <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{
                    fontSize: '10px', fontWeight: 500,
                    letterSpacing: '0.10em', textTransform: 'uppercase',
                    color: '#A89880', fontFamily: "'Inter', sans-serif",
                  }}>{label}</label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    style={{
                      background: '#161209',
                      border: '1px solid rgba(201,168,76,0.2)',
                      borderRadius: '4px',
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

            <div
              ref={calendarRef}
              style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: 16, position: 'relative' }}
            >
              <label style={{
                fontSize: '10px', fontWeight: 500,
                letterSpacing: '0.10em', textTransform: 'uppercase',
                color: '#A89880', fontFamily: "'Inter', sans-serif",
              }}>Rental Dates</label>
              {/* Trigger button */}
              <button
                type="button"
                onClick={() => setCalendarOpen(o => !o)}
                style={{
                  background: '#161209',
                  border: `1px solid ${calendarOpen ? 'rgba(201,168,76,0.55)' : 'rgba(201,168,76,0.2)'}`,
                  borderRadius: '4px',
                  padding: '12px 14px',
                  fontSize: '14px',
                  color: form.dates ? '#F0E8D8' : 'rgba(201,168,76,0.40)',
                  fontFamily: "'Inter', sans-serif",
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'border-color 0.15s',
                  width: '100%',
                }}
              >
                <span>{form.dates || 'Select your dates'}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="rgba(201,168,76,0.6)" strokeWidth="1.5" strokeLinecap="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </button>
              {/* Calendar dropdown */}
              {calendarOpen && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: 0,
                  right: 0,
                  zIndex: 50,
                  background: 'linear-gradient(145deg, #161209 0%, #100E0B 100%)',
                  border: '1px solid rgba(201,168,76,0.18)',
                  borderRadius: '8px',
                  padding: '20px',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
                }}>
                  {/* Month nav */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <button type="button" onClick={prevMonth} style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: '#A89880', padding: '4px 8px', fontSize: '16px',
                      transition: 'color 0.15s',
                    }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#A89880')}
                    >&#8249;</button>
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '15px', fontWeight: 400, letterSpacing: '0.06em',
                      color: '#F0E8D8',
                    }}>
                      {MONTH_NAMES[calendarMonth.month]} {calendarMonth.year}
                    </span>
                    <button type="button" onClick={nextMonth} style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: '#A89880', padding: '4px 8px', fontSize: '16px',
                      transition: 'color 0.15s',
                    }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#A89880')}
                    >&#8250;</button>
                  </div>
                  {/* Day headers */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', marginBottom: '8px' }}>
                    {DAY_NAMES.map(d => (
                      <div key={d} style={{
                        textAlign: 'center',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '10px', fontWeight: 500,
                        letterSpacing: '0.08em', textTransform: 'uppercase',
                        color: 'rgba(168,152,128,0.5)', padding: '4px 0',
                      }}>{d}</div>
                    ))}
                  </div>
                  {/* Day grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
                    {Array.from({ length: getFirstDayOfMonth(calendarMonth.year, calendarMonth.month) }).map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}
                    {Array.from({ length: getDaysInMonth(calendarMonth.year, calendarMonth.month) }).map((_, i) => {
                      const day = new Date(calendarMonth.year, calendarMonth.month, i + 1);
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const isPast = day < today;
                      const isStart = startDate && isSameDay(day, startDate);
                      const isEnd = endDate && isSameDay(day, endDate);
                      const inRange = isInRange(day);
                      const isSelected = isStart || isEnd;
                      return (
                        <button
                          key={i}
                          type="button"
                          disabled={isPast}
                          onClick={() => !isPast && handleDayClick(day)}
                          onMouseEnter={() => !isPast && startDate && !endDate && setHoverDate(day)}
                          onMouseLeave={() => setHoverDate(null)}
                          style={{
                            padding: '8px 0',
                            textAlign: 'center',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '13px',
                            fontWeight: isSelected ? 500 : 300,
                            border: 'none',
                            borderRadius: isStart ? '4px 0 0 4px' : isEnd ? '0 4px 4px 0' : '0',
                            cursor: isPast ? 'default' : 'pointer',
                            transition: 'all 0.1s ease',
                            color: isPast
                              ? 'rgba(168,152,128,0.18)'
                              : isSelected
                              ? '#0D0B09'
                              : inRange
                              ? '#F0E8D8'
                              : '#A89880',
                            background: isSelected
                              ? '#C9A84C'
                              : inRange
                              ? 'rgba(201,168,76,0.15)'
                              : 'transparent',
                          }}
                          onMouseOver={e => {
                            if (!isPast && !isSelected) {
                              e.currentTarget.style.color = '#F0E8D8';
                              e.currentTarget.style.background = 'rgba(201,168,76,0.10)';
                            }
                          }}
                          onMouseOut={e => {
                            if (!isPast && !isSelected) {
                              e.currentTarget.style.color = inRange ? '#F0E8D8' : '#A89880';
                              e.currentTarget.style.background = inRange ? 'rgba(201,168,76,0.15)' : 'transparent';
                            }
                          }}
                        >
                          {i + 1}
                        </button>
                      );
                    })}
                  </div>
                  {/* Clear / confirm row */}
                  {(startDate || endDate) && (
                    <div style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      marginTop: '16px', paddingTop: '14px',
                      borderTop: '1px solid rgba(201,168,76,0.10)',
                    }}>
                      <button type="button" onClick={() => {
                        setStartDate(null);
                        setEndDate(null);
                        setForm(prev => ({ ...prev, dates: '' }));
                      }} style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        fontFamily: "'Inter', sans-serif", fontSize: '11px',
                        color: '#6B5F52', letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                      }}>Clear</button>
                      <span style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '13px', color: '#C9A84C', fontStyle: 'italic',
                      }}>
                        {!startDate
                          ? 'Select check-in'
                          : !endDate
                          ? 'Select check-out'
                          : formatDateRange(startDate, endDate)}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: 24 }}>
              <label style={{
                fontSize: '10px', fontWeight: 500,
                letterSpacing: '0.10em', textTransform: 'uppercase',
                color: '#A89880', fontFamily: "'Inter', sans-serif",
              }}>Message</label>
              <textarea
                rows={4}
                placeholder="Tell us about your event, location, or group size..."
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                style={{
                  background: '#161209',
                  border: '1px solid rgba(201,168,76,0.2)',
                  borderRadius: '4px',
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
                fontSize: '12px', fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '18px',
                borderRadius: '4px',
                border: 'none', cursor: formStatus === 'sending' ? 'default' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 2px 16px rgba(201,168,76,0.18)',
              }}
              onMouseEnter={e => { if (formStatus !== 'sending') e.currentTarget.style.background = '#E8C97A'; }}
              onMouseLeave={e => { if (formStatus !== 'sending') e.currentTarget.style.background = '#C9A84C'; }}
            >
              {formStatus === 'sending' ? 'Sending...' : 'Send Request · We\u2019ll Call Within the Day'}
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
                  We&rsquo;ll call you back within the day.
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
              <a href="tel:9729656901" style={{ color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.4)' }}>
                (972) 965-6901
              </a>
            </p>
          </div>

        </div>
      </section>

      {/* ── SECTION 10: Map ──────────────────────────────────── */}
      <section style={{ background: '#0D0B09', borderTop: '1px solid rgba(201,168,76,0.08)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        {/* Noise texture */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n6'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n6)'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px', opacity: 0.035, mixBlendMode: 'overlay', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 400, color: '#F0E8D8',
              letterSpacing: '-0.02em', lineHeight: 1.12,
              marginBottom: 12,
            }}>
              Tyler, Texas.
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#A89880', fontWeight: 300, letterSpacing: '0.02em' }}>
              14078 State HWY 110 N, Tyler, Texas 75704
            </p>
          </div>

          <div style={{
            borderRadius: 8, overflow: 'hidden',
            border: '1px solid rgba(201,168,76,0.12)',
            marginBottom: 24,
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
        background: '#060402',
        borderTop: '1px solid rgba(201,168,76,0.10)',
        padding: '48px 24px 72px',
      }}>
        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 36,
          maxWidth: 1060, margin: '0 auto',
          marginBottom: 36,
        }}>
          <div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 20, fontWeight: 500, color: '#F0E8D8',
              marginBottom: 14,
            }}>
              Triple W <span style={{ color: '#C9A84C' }}>Rentals</span>
            </div>
            <p style={{ fontSize: 12, color: 'rgba(240,232,216,0.45)', lineHeight: 1.9, fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
              14078 State HWY 110 N<br />
              Tyler, Texas 75704<br />
              Open 24 / 7
            </p>
          </div>

          <div>
            <div style={{
              fontSize: 10, color: '#C9A84C',
              fontWeight: 500, letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontFamily: "'Inter', sans-serif",
              marginBottom: 14,
            }}>QUICK LINKS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[['Fleet', '#gallery'], ['Process', '#how'], ['Reviews', '#reviews'], ['FAQ', '#faq'], ['Golf Carts', 'https://triple-w-golf-carts.vercel.app'], ['Book Now', '#quote']].map(([label, href]) => (
                <a key={label} href={href}
                  {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  style={{
                  fontSize: 12, color: '#7A6E60',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
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
              fontWeight: 500, letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontFamily: "'Inter', sans-serif",
              marginBottom: 14,
            }}>CONTACT</div>
            <a href="tel:9729656901" style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 18, color: '#F0E8D8',
              display: 'block', marginBottom: 8,
            }}>(972) 965-6901</a>
            <a href="mailto:triplewrentals@gmail.com" style={{
              fontSize: 12, color: '#7A6E60',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              display: 'block', marginBottom: 6, textDecoration: 'none',
              transition: 'color 0.15s',
            }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = '#C9A84C'}
              onMouseLeave={e => (e.target as HTMLElement).style.color = '#7A6E60'}
            >triplewrentals@gmail.com</a>
            <p style={{ fontSize: 12, color: 'rgba(240,232,216,0.20)', fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
              Owner: Westin Wayne Walker
            </p>
          </div>

          <div>
            <div style={{
              fontSize: 10, color: '#C9A84C',
              fontWeight: 500, letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontFamily: "'Inter', sans-serif",
              marginBottom: 14,
            }}>SERVICE AREAS</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {['Tyler, TX (Home Base)', 'Dallas / Fort Worth', 'Houston', 'Austin', 'San Antonio', 'Call to confirm your area'].map(area => (
                <span key={area} style={{
                  fontSize: '10px',
                  color: '#7A6E60',
                  border: '1px solid rgba(201,168,76,0.14)',
                  borderRadius: '999px',
                  padding: '3px 10px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 300,
                }}>
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(240,232,216,0.05)',
          paddingTop: 20,
          maxWidth: 1060, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 10,
        }}>
          <p style={{ fontSize: 11, color: 'rgba(240,232,216,0.30)', fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
            © 2026 Triple W Rentals · All Rights Reserved
          </p>
          <p style={{ fontSize: 11, color: 'rgba(240,232,216,0.30)', fontFamily: "'Inter', sans-serif", fontWeight: 300 }}>
            Tyler, Texas 75704
          </p>
        </div>
      </footer>
    </>
  );
}
