'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { RVSlider } from './components/RVSlider';
import UnicornScene from 'unicornstudio-react/next';
import './globals.css';

/* ─── Data ──────────────────────────────────────────────────── */
const fleet = [
  {
    name: 'Momentum 2',
    type: 'Luxury Toy Hauler',
    specs: 'Sleeps 8–10 · 3 King Beds · 2 Baths',
    features: ['Fireplace', 'Marble Counters', '4 Smart TVs', 'Outdoor Kitchen'],
    tag: 'Most Popular',
    bg: '#0F2A18',
  },
  {
    name: 'Momentum 3',
    type: 'Deluxe Toy Hauler',
    specs: 'Sleeps 10 · 3 King + 1 Queen · 2 Baths',
    features: ['Marble Counters', 'Heated Seats', 'Patio Deck', 'Smart TVs'],
    tag: 'Best for Groups',
    bg: '#1A3820',
  },
  {
    name: 'Heartland Gateway',
    type: '5th Wheel',
    specs: 'Sleeps 12 · 2 Beds · 2 Baths',
    features: ['Custom Hardwood', 'Outdoor Kitchen', '4 Smart TVs', '2 Fridges'],
    tag: 'Largest Fleet',
    bg: '#0D2416',
  },
  {
    name: 'Solitude',
    type: 'Luxury 5th Wheel',
    specs: 'King Bed · Full Bath · Walk-in Closet',
    features: ['Marble Bar', 'Massage Chairs', 'Double Fridge', 'Security'],
    tag: 'Most Private',
    bg: '#1C3A1E',
  },
  {
    name: 'Grand Design',
    type: 'Super Toy Hauler',
    specs: 'Sleeps 10 · 1 King + 3 Queen · 2 Baths',
    features: ['Fireplace', 'Marble Counters', 'Walk-in Baths', 'Smart TVs'],
    tag: 'Best Value',
    bg: '#142E1C',
  },
];

const reviews = [
  {
    name: 'Wyman Jones',
    image: 'https://static.wixstatic.com/media/62f926_db0f2145b9b54be6947b1cd42f12e361~mv2.png',
    loc: 'Tyler, Texas',
    stars: 5,
    text: "Thank you, Triple W Rentals, for the great service I received last weekend. When my reservation with another company was canceled at the last minute, I called Triple W Rentals, and they came through. They were very patient and answered all of my questions. In addition, I want to thank your team member Corbin for outstanding customer service. He delivered the RV on time, set it up, and ensured that everything was working properly. And when there was an issue, Corbin went above and beyond to correct it. His attention to detail and his professionalism were greatly appreciated. We had a great time in the RV, and I will definitely rent from Triple W again.",
  },
  {
    name: 'JT Seargeant',
    image: 'https://static.wixstatic.com/media/62f926_110004e747b34d239d959afbd1f2b88e~mv2.png',
    loc: 'Texas Rose Horse Park',
    stars: 5,
    text: "I have rented from Triple W multiple times. The communication is always outstanding and the response time on site to any needs is quick. Corbin arrived on site in minutes to assist with one minor issue. He checked in daily to make sure all was well which exceeded my expectations. I will continue to use them on all my trips to Texas Rose Horse Park.",
  },
  {
    name: 'Jaden Richardson',
    image: 'https://static.wixstatic.com/media/62f926_1ec8069798744e269b3cd56333ec0268~mv2.png',
    loc: 'Texas',
    stars: 5,
    text: "Great experience with Triple W RV Rentals! The booking process was smooth, the staff was friendly and helpful, and the Momentum RV was in excellent condition. Everything went exactly as planned. Highly recommend!",
  },
  {
    name: 'Luci Wade-Cantu',
    image: 'https://static.wixstatic.com/media/62f926_7141074f78bc415e8c9d845a4433a831~mv2.png',
    loc: 'Tyler, Texas',
    stars: 5,
    text: "Best RV rental ever! Excellent service, experience and quality! They rented to us at a moments notice on the 4th of July. They delivered that same day, setup and provided an overview on how to use everything. They followed up with several phone calls to check in on how we were! Amazing! Top notch! Above and beyond! I will always use their service moving forward! Westin and team were the best! And the RV — pure luxury!",
  },
  {
    name: 'Sandy McKinney',
    image: 'https://static.wixstatic.com/media/62f926_575e3599e5f64a11ac9775b952ae14c2~mv2.png',
    loc: 'Texas Rose Horse Park',
    stars: 5,
    text: "Triple W was great to work with. As a RV novice Wayne was very polite, patient and accommodating. The RV was in great condition and fully loaded! Given the temperature outside it was great to have an RV that had strong A/C. If I had to make a complaint, because nothing is ever 100% perfect, the water pressure was very low. I was told that was the city regulated hook up and not an RV issue. I will definitely use them again when we return to the Rose Horse Park. Thanks for a great time!",
  },
  {
    name: 'Tim S.',
    image: 'https://static.wixstatic.com/media/62f926_e823cada6ec745d5b64f7431a63badd5~mv2.png',
    loc: 'Texas Rose Horse Park',
    stars: 5,
    text: "The RVs are nice and convenient especially for horse shows. However what makes this beyond 5 stars is the incredible hospitality by the host. He goes beyond Ritz Carlton standards. He was booked one time and got another RV to accommodate us. The wifi is incredible and fast and reliable. This is our new first choice when coming to Texas Rose Horse Park for schooling or for shows.",
  },
  {
    name: 'Grant Walker',
    image: 'https://static.wixstatic.com/media/62f926_641bcca631884ba09644963d5e5f9104~mv2.png',
    loc: 'Tyler, Texas',
    stars: 5,
    text: "Me and my wife stayed in the North Trail RV near a pond on our Ranch that we have. The RV was setup and delivered for us. The RV was Clean and roomy. Westin and his Company were a pleasure to do business with. Couldn't ask for a better experience!",
  },
  {
    name: 'Amy Walker',
    image: 'https://static.wixstatic.com/media/62f926_e96de57f16044ca88717c7aa6ac0a0c5~mv2.png',
    loc: 'Muddy Bottoms',
    stars: 5,
    text: "WOW!!! The customer service that I received from Triple W Rental was outstanding. This was the first time that I entertained renting a RV for a short Family vacation. I wanted something that would accommodate my family, my brother, sister and my mom. After several attempts through a RV rental company, Triple W RV Rental reached out to me. The rental company completely accommodated my needs and my family. Not only did Shane go above and beyond to help me schedule the perfect rental, I was super impressed with the quality of the camper I received. The camper was delivered to my destination at Muddy Bottoms and set up before I even arrived. The camper came completely stocked with towels, sheets, blankets, tissue, coffee maker, soap, etc — a home away from home. All I had to do was bring my family and food. Thank you Triple W Rentals and Shane for making my trip a wonderful experience. I will see you next year at Muddy Bottoms. ❤️",
  },
  {
    name: 'Marsha Swann',
    image: 'https://static.wixstatic.com/media/62f926_f644e58d08f94afd9a5f6698c775765c~mv2.png',
    loc: 'Texas',
    stars: 5,
    text: "Triple W rentals has amazing RVs and great employees. The delivery driver is the best I've seen and should always be recommended when you're getting a rental! Great job guys.",
  },
  {
    name: 'Giovanna Iriel',
    image: 'https://static.wixstatic.com/media/62f926_980c1d6c8b8d493d9b6b0d945debcd90~mv2.png',
    loc: 'Texas Rose Horse Park',
    stars: 5,
    text: "Highly recommend Triple W Rentals! If you're looking for hassle-free, top-notch golf cart rentals, Triple W Rentals is the way to go! Their customer service was outstanding — so personable, responsive, and accommodating. They made the entire process seamless by delivering our luxury golf cart right to our stalls at the horse show. The night before, they even texted me a picture to confirm delivery, so we didn't have to worry about a thing. No need to go off-site for pickup or drop-off — they handled everything! The golf cart was in excellent condition, super clean, and incredibly comfortable — perfect for getting around all week at the show. I can't recommend Triple W Rentals enough for their convenience and service. Will definitely rent from them again!",
  },
];

const faqs = [
  {
    q: 'How far do you deliver?',
    a: 'We deliver across Texas — Tyler, Dallas/Fort Worth, Houston, Austin, San Antonio, and surrounding areas. Call us to confirm your specific location and get a delivery quote.',
  },
  {
    q: "What's included in the rental?",
    a: "Every rental includes full delivery, setup, fresh linens, cookware, and a complete walkthrough. You get 24/7 support for your entire stay. Optional outdoor package (grill, chairs, lawn setup) available for just $75. Ask us when you call!",
  },
  {
    q: 'Do I need a truck or special license?',
    a: "No. We deliver and set up the RV at your location. You don't need a truck, a hitch, or any experience. We handle all the logistics — you just walk in.",
  },
  {
    q: 'How does booking work?',
    a: 'Simple: call or text us at (972) 965-6901. Tell us your dates and location. Most bookings are confirmed within the hour.',
  },
  {
    q: "What's your cancellation policy?",
    a: "Full refund for cancellations 30+ days out. 50% refund for 8–30 days. No refund within 7 days. Something came up? Just call us — we'll always try to work with you.",
  },
  {
    q: 'Can I rent for just one night?',
    a: "Yes. We offer daily, weekly, and monthly rentals. Weekend single-night slots go fast, especially in spring and fall — call early to lock in your dates.",
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

/* ─── ReviewCard ───────────────────────────────────────────── */
const REVIEW_MAX = 220;

type Review = typeof reviews[0];

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > REVIEW_MAX;
  const displayed = !expanded && isLong
    ? review.text.slice(0, REVIEW_MAX).trimEnd() + '\u2026'
    : review.text;

  return (
    <div style={{
      background: '#fff',
      borderRadius: 16,
      padding: 24,
      border: '1px solid rgba(0,0,0,0.06)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ color: '#C9963A', fontSize: 15, marginBottom: 14, letterSpacing: 2 }}>
        {'★'.repeat(review.stars)}
      </div>
      <p style={{
        fontSize: 14, color: '#3D4E46',
        fontStyle: 'italic', lineHeight: 1.8,
        marginBottom: 8,
        fontFamily: "'DM Sans', sans-serif",
        flex: 1,
      }}>
        &ldquo;{displayed}&rdquo;
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#C9963A', fontSize: 13, fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            padding: '6px 0',
            textAlign: 'left',
            marginBottom: 8,
          }}
        >
          {expanded ? 'Show less ↑' : 'Read more ↓'}
        </button>
      )}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        marginTop: 'auto', paddingTop: 16,
        borderTop: '1px solid rgba(0,0,0,0.06)',
      }}>
        <Image
          src={review.image}
          alt={review.name}
          width={44}
          height={44}
          style={{ borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
        />
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#0B2012', fontFamily: "'DM Sans', sans-serif" }}>{review.name}</div>
          <div style={{ fontSize: 12, color: '#5A6B62', fontFamily: "'DM Sans', sans-serif" }}>{review.loc}</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Component ─────────────────────────────────────────────── */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [counts, setCounts] = useState({ rentals: 0, states: 0 });
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
              rentals: Math.round(e * 200),
              states: Math.round(e * 4),
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

  /* Lock scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* ── SECTION 0: Mobile Sticky CTA ─────────────────────── */}
      <div
        className="mobile-sticky"
        style={{
          position: 'fixed',
          bottom: 0, left: 0, right: 0,
          zIndex: 40,
          display: 'none',
          gap: 8,
          padding: '12px 16px',
          background: 'rgba(11,32,18,0.97)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(201,150,58,0.25)',
        }}
      >
        <a
          href="tel:9729656901"
          style={{
            flex: 1.4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            background: '#C9963A',
            color: '#0B2012',
            fontWeight: 600,
            fontSize: 14,
            borderRadius: 8,
            minHeight: 48,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          📞 Call Now
        </a>
        <a
          href="#quote"
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            background: 'transparent',
            color: '#C9963A',
            border: '1px solid #C9963A',
            fontWeight: 600,
            fontSize: 14,
            borderRadius: 8,
            minHeight: 48,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Get a Quote
        </a>
      </div>

      {/* ── SECTION 1: Navigation ────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 30,
        background: 'linear-gradient(to bottom, rgba(11,32,18,0.92) 0%, transparent 100%)',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 68,
      }}>
        {/* Logo */}
        <a href="#" style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 20, fontWeight: 700,
          color: '#F2EDE3',
          letterSpacing: '-0.01em',
        }}>
          Triple W <span style={{ color: '#C9963A' }}>Rentals</span>
        </a>

        {/* Desktop Links */}
        <div className="desktop-nav-items" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {[['Fleet', '#fleet'], ['How It Works', '#how'], ['Reviews', '#reviews'], ['FAQ', '#faq']].map(([label, href]) => (
            <a key={label} href={href} style={{
              color: 'rgba(242,237,227,0.65)',
              fontSize: 14, fontWeight: 500,
              fontFamily: "'DM Sans', sans-serif",
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = '#C9963A'}
              onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(242,237,227,0.65)'}
            >{label}</a>
          ))}
          <a href="tel:9729656901" style={{
            background: '#C9963A', color: '#0B2012',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600, fontSize: 14,
            padding: '10px 20px', borderRadius: 99,
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => (e.target as HTMLElement).style.background = '#E0B254'}
            onMouseLeave={e => (e.target as HTMLElement).style.background = '#C9963A'}
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
            <rect y="4" width="24" height="2" rx="1" fill="white" />
            <rect y="11" width="24" height="2" rx="1" fill="white" />
            <rect y="18" width="24" height="2" rx="1" fill="white" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0,
          background: '#0B2012', zIndex: 50,
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
                color: '#F2EDE3', minHeight: 44, minWidth: 44,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              aria-label="Close menu"
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M4 4L24 24M24 4L4 24" stroke="#F2EDE3" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            {[
              ['Our Fleet', '#fleet'],
              ['How It Works', '#how'],
              ['Reviews', '#reviews'],
              ['FAQ', '#faq'],
              ['Book Now', '#quote'],
            ].map(([label, href]) => (
              <a key={label} href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 30, fontWeight: 700,
                  color: '#F2EDE3',
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
                  fontSize: 22, fontWeight: 600,
                  color: '#C9963A',
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
                background: 'none', border: '1px solid rgba(201,150,58,0.3)',
                color: '#C9963A', fontFamily: "'DM Sans', sans-serif",
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
                      color: 'rgba(242,237,227,0.55)',
                      fontFamily: "'DM Sans', sans-serif",
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
              fontSize: 24, fontWeight: 700,
              color: '#C9963A', marginTop: 24,
              minHeight: 44, display: 'flex', alignItems: 'center',
            }}>(972) 965-6901</a>
          </div>
        </div>
      )}

      {/* ── SECTION 2: Hero ──────────────────────────────────── */}
      <section style={{
        minHeight: '100vh', overflow: 'hidden',
        position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Background Image */}
        <Image
          src="/hero.jpg"
          alt="Triple W Rentals luxury RV"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />

        {/* Dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,32,18,0.72)' }} />

        {/* Aurora Orbs */}
        <div style={{
          position: 'absolute', top: '-60px', left: '-80px',
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(30,74,44,0.75) 0%, transparent 70%)',
          filter: 'blur(70px)',
          animation: 'drift1 22s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '-40px', right: '-60px',
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(201,150,58,0.1) 0%, transparent 70%)',
          filter: 'blur(90px)',
          animation: 'drift2 28s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', left: '50%',
          transform: 'translateX(-50%)',
          width: 700, height: 400,
          background: 'radial-gradient(circle, rgba(22,51,32,0.8) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'drift3 20s ease-in-out infinite',
          pointerEvents: 'none',
        }} />

        {/* Grain texture */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.3, pointerEvents: 'none' }}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <filter id="grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain)" opacity="0.4" />
          </svg>
        </div>

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 2,
          textAlign: 'center',
          padding: '120px 24px 100px',
          maxWidth: 980, margin: '0 auto',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28,
        }}>
          {/* Badge */}
          <div style={{
            background: 'rgba(201,150,58,0.12)',
            border: '1px solid rgba(201,150,58,0.3)',
            borderRadius: 99, padding: '6px 18px',
            color: '#C9963A',
            fontSize: 11, fontWeight: 500,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            fontFamily: "'DM Sans', sans-serif",
            animation: 'fadeUp 0.6s ease 0.2s both',
          }}>
            ★★★★★ · Tyler, Texas · Open 24 / 7
          </div>

          {/* H1 */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: 'clamp(38px, 7vw, 78px)',
            color: '#F2EDE3',
            lineHeight: 1.08,
            letterSpacing: '-0.025em',
            maxWidth: 920,
          }}>
            <span style={{ display: 'block', animation: 'heroWord 0.75s ease 0.4s both', opacity: 0 }}>
              Texas&apos;s Most Trusted
            </span>
            <span style={{ display: 'block', color: '#C9963A', animation: 'heroWord 0.75s ease 0.65s both', opacity: 0 }}>
              RV Rental.
            </span>
            <em style={{
              display: 'block',
              fontSize: 'clamp(28px, 5vw, 58px)',
              fontWeight: 400,
              animation: 'heroWord 0.75s ease 0.9s both',
              opacity: 0,
            }}>
              Delivered &amp; Set Up for You.
            </em>
          </h1>

          {/* Subheadline */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(15px, 2.2vw, 18px)',
            color: 'rgba(242,237,227,0.6)',
            maxWidth: 560, lineHeight: 1.75,
            animation: 'fadeUp 0.7s ease 1.1s both', opacity: 0,
          }}>
            Luxury RVs for events, camping, and extended stays across Tyler, Dallas, Houston, and Austin. We deliver, set up, and handle everything — you just show up.
          </p>

          {/* CTA Row */}
          <div style={{
            display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center',
            animation: 'fadeUp 0.7s ease 1.3s both', opacity: 0,
          }}>
            <a href="tel:9729656901" className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.17 6.17l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z" /></svg>
              Call (972) 965-6901
            </a>
            <a href="#fleet" className="btn-ghost">Browse Fleet ↓</a>
          </div>

          {/* Trust micro-row */}
          <div style={{
            display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center',
            fontSize: 13, color: 'rgba(242,237,227,0.4)',
            fontFamily: "'DM Sans', sans-serif",
            animation: 'fadeUp 0.7s ease 1.5s both', opacity: 0,
          }}>
            {['✓ Full Setup Included', '✓ Same-Day Booking', '✓ 24 / 7 Support', '✓ Luxury Fleet Only'].map(t => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{
          position: 'absolute', bottom: 28, left: '50%',
          transform: 'translateX(-50%)',
          width: 1, height: 44,
          background: 'linear-gradient(to bottom, transparent, rgba(201,150,58,0.7))',
          animation: 'breathe 2.4s ease-in-out infinite',
        }} />
      </section>

      {/* ── SECTION 3: Stats Bar ─────────────────────────────── */}
      <section ref={statsRef} style={{
        background: '#0F2A18',
        borderTop: '1px solid rgba(201,150,58,0.12)',
        borderBottom: '1px solid rgba(201,150,58,0.12)',
        padding: '36px 24px',
      }}>
        <div className="stats-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24, maxWidth: 900, margin: '0 auto',
          textAlign: 'center',
        }}>
          {[
            { val: `${counts.rentals}+`, label: 'Rentals Completed' },
            { val: '★★★★★', label: 'Google Rating' },
            { val: '24/7', label: 'Support Available' },
            { val: `${counts.states}+ States`, label: 'We Deliver Across TX' },
          ].map(({ val, label }) => (
            <div key={label}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(22px, 4vw, 38px)',
                fontWeight: 700, color: '#C9963A',
                marginBottom: 6,
              }}>{val}</div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12, color: 'rgba(242,237,227,0.45)',
                letterSpacing: '0.04em',
              }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 4: Fleet ─────────────────────────────────── */}
      <section id="fleet" style={{ background: '#FAFAF7', padding: '96px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div className="reveal" style={{ marginBottom: 48 }}>
            <div style={{ width: 40, height: 3, background: '#C9963A', borderRadius: 2, marginBottom: 20 }} />
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(28px, 4vw, 50px)',
              fontWeight: 700, color: '#0B2012',
              marginBottom: 14,
            }}>
              Pick Your Rig.{' '}
              <em style={{ fontWeight: 400 }}>We Handle the Rest.</em>
            </h2>
            <p className="reveal d1" style={{ fontSize: 16, lineHeight: 1.75, maxWidth: 580 }}>
              Every unit is cleaned, fully stocked, and delivered directly to your location — set up and ready to walk into.
            </p>
          </div>

          <div
            className="fleet-carousel"
            style={{
              display: 'flex', gap: 16,
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              paddingBottom: 8,
            }}
          >
            {fleet.map((rv) => (
              <div
                key={rv.name}
                style={{
                  minWidth: 300, maxWidth: 300,
                  scrollSnapAlign: 'start',
                  borderRadius: 16,
                  overflow: 'hidden',
                  flexShrink: 0,
                  background: '#fff',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 20px 56px rgba(0,0,0,0.18)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.07)';
                }}
              >
                <div style={{
                  height: 190, background: rv.bg,
                  position: 'relative', overflow: 'hidden',
                  backgroundImage: `repeating-linear-gradient(
                    135deg,
                    transparent,
                    transparent 20px,
                    rgba(255,255,255,0.02) 20px,
                    rgba(255,255,255,0.02) 21px
                  )`,
                }}>
                  <div style={{
                    position: 'absolute', top: 14, right: 14,
                    background: 'rgba(201,150,58,0.2)',
                    border: '1px solid rgba(201,150,58,0.45)',
                    borderRadius: 99, padding: '4px 12px',
                    color: '#C9963A', fontSize: 10,
                    fontWeight: 600, letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontFamily: "'DM Sans', sans-serif",
                  }}>{rv.tag}</div>
                  <div style={{ position: 'absolute', bottom: 14, left: 16 }}>
                    <div style={{
                      fontSize: 10, color: 'rgba(242,237,227,0.5)',
                      textTransform: 'uppercase', letterSpacing: '0.1em',
                      fontFamily: "'DM Sans', sans-serif",
                      marginBottom: 4,
                    }}>{rv.type}</div>
                    <div style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 24, fontWeight: 700, color: '#F2EDE3',
                    }}>{rv.name}</div>
                  </div>
                </div>

                <div style={{ padding: 20 }}>
                  <p style={{
                    fontSize: 13, color: '#5A6B62',
                    marginBottom: 14, fontFamily: "'DM Sans', sans-serif",
                  }}>{rv.specs}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
                    {rv.features.map(f => (
                      <span key={f} style={{
                        background: '#EEF7F1', color: '#1A4A2E',
                        borderRadius: 99, padding: '4px 10px',
                        fontSize: 11, fontWeight: 500,
                        fontFamily: "'DM Sans', sans-serif",
                      }}>{f}</span>
                    ))}
                  </div>
                  <a href="tel:9729656901" style={{
                    display: 'block',
                    width: '100%', textAlign: 'center',
                    background: '#C9963A', color: '#0B2012',
                    fontWeight: 600, fontSize: 14,
                    padding: '12px 0', borderRadius: 8,
                    fontFamily: "'DM Sans', sans-serif",
                    transition: 'background 0.2s',
                    minHeight: 44,
                    lineHeight: '20px',
                  }}
                    onMouseEnter={e => (e.target as HTMLElement).style.background = '#E0B254'}
                    onMouseLeave={e => (e.target as HTMLElement).style.background = '#C9963A'}
                  >Check Availability</a>
                </div>
              </div>
            ))}
          </div>
          <p style={{
            fontSize: 12, color: '#5A6B62',
            textAlign: 'center', marginTop: 12,
            fontFamily: "'DM Sans', sans-serif",
          }}>← Swipe to browse all units</p>
        </div>
      </section>

      {/* ── SECTION 4B: Interior Showcase Slider ─────────────── */}
      <section id="showcase" aria-label="RV Interior Showcase">
        <div style={{
          background: '#0B2012',
          padding: '64px 24px 40px',
          textAlign: 'center',
        }}>
          <div style={{ width: 40, height: 3, background: '#C9963A', borderRadius: 2, margin: '0 auto 20px' }} />
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(28px, 4vw, 50px)',
            fontWeight: 700, color: '#F2EDE3',
            marginBottom: 14,
          }}>
            Step Inside.{' '}
            <em style={{ color: '#C9963A', fontWeight: 400 }}>See Every Detail.</em>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16, lineHeight: 1.75,
            color: 'rgba(242,237,227,0.55)',
            maxWidth: 540, margin: '0 auto',
          }}>
            Browse each RV model and explore every room. Use the arrows to switch units — tap any image to zoom through the interior.
          </p>
        </div>
        <RVSlider />
      </section>

      {/* ── SECTION 5: How It Works ──────────────────────────── */}
      <section id="how" style={{ background: '#0B2012', padding: '96px 24px' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="reveal" style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: 40, height: 3, background: '#C9963A', borderRadius: 2, marginBottom: 20 }} />
            </div>
            <h2 className="reveal" style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(28px, 4vw, 50px)',
              fontWeight: 700, color: '#F2EDE3',
              marginBottom: 14,
            }}>
              Simple as{' '}
              <em style={{ color: '#C9963A', fontWeight: 400 }}>Three Steps</em>
            </h2>
            <p className="reveal d1" style={{
              fontSize: 16, lineHeight: 1.75,
              color: 'rgba(242,237,227,0.5)',
              maxWidth: 500, margin: '0 auto',
              fontFamily: "'DM Sans', sans-serif",
            }}>
              No truck. No hitch. No experience required. We handle every part of the process — start to finish.
            </p>
          </div>

          <div className="steps-row" style={{ display: 'flex', gap: 16 }}>
            {[
              { emoji: '📞', num: '01', title: 'Call or Text Us', body: 'Tell us your dates, location, and group size. Most bookings are confirmed same-day. Takes about 2 minutes.' },
              { emoji: '🚚', num: '02', title: 'We Deliver & Set Up', body: 'Your RV arrives fully cleaned, stocked, and set up at your location. We do the walkthrough, connect utilities, and make sure everything is perfect.' },
              { emoji: '✨', num: '03', title: 'Enjoy Your Stay', body: "We're on call 24/7 for anything you need. When you're done, we handle pickup too. You just lock the door." },
            ].map((step, i) => (
              <div key={step.num} className={`reveal d${i}`} style={{
                flex: 1,
                padding: '32px 24px',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: 16,
                border: '1px solid rgba(201,150,58,0.18)',
                textAlign: 'center',
                minWidth: 200,
              }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{step.emoji}</div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 12, color: '#C9963A',
                  letterSpacing: '0.14em',
                  marginBottom: 10,
                }}>{step.num}</div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 21, fontWeight: 600, color: '#F2EDE3',
                  marginBottom: 12,
                }}>{step.title}</h3>
                <p style={{
                  fontSize: 14, color: 'rgba(242,237,227,0.5)',
                  lineHeight: 1.8,
                  fontFamily: "'DM Sans', sans-serif",
                }}>{step.body}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <a href="tel:9729656901" className="btn-primary">
              Book Your Rental — (972) 965-6901
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 5B: Unicorn Studio Scene ───────────────── */}
      <section style={{ background: '#071610', overflow: 'hidden' }}>
        <UnicornScene
          projectId="Er0s1lg6jrtlnelZmgAW"
          sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.4/dist/unicornStudio.umd.js"
          width="100%"
          height="500px"
        />
      </section>

      {/* ── SECTION 6: Reviews ───────────────────────────────── */}
      <section id="reviews" style={{ background: '#F2EDE3', padding: '96px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 48 }}>
            <div style={{ width: 40, height: 3, background: '#C9963A', borderRadius: 2, marginBottom: 20 }} />
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(28px, 4vw, 50px)',
              fontWeight: 700, color: '#0B2012',
              marginBottom: 10,
            }}>
              Don&rsquo;t Take Our{' '}
              <em style={{ color: '#C9963A', fontWeight: 400 }}>Word for It</em>
            </h2>
            <p style={{ fontSize: 14, color: '#5A6B62', fontFamily: "'DM Sans', sans-serif" }}>★★★★★ Rated on Google · Tyler, Texas</p>
          </div>

          <style>{`
            .reviews-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
            }
            @media (max-width: 1024px) {
              .reviews-grid { grid-template-columns: repeat(2, 1fr); }
            }
            @media (max-width: 640px) {
              .reviews-grid { grid-template-columns: 1fr; }
            }
          `}</style>

          <div className="reviews-grid">
            {reviews.map((r, i) => (
              <ReviewCard key={i} review={r} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: Why Triple W ──────────────────────────── */}
      <section style={{ background: '#FAFAF7', padding: '96px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 48, textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: 40, height: 3, background: '#C9963A', borderRadius: 2, marginBottom: 20 }} />
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(28px, 4vw, 50px)',
              fontWeight: 700, color: '#0B2012',
            }}>
              Why{' '}
              <em style={{ color: '#C9963A', fontWeight: 400 }}>Triple W?</em>
            </h2>
          </div>

          <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {[
              { emoji: '🚚', title: 'We Deliver & Set Up', body: "You don't need a truck, a hitch, or any experience. We bring the RV to your location, plug everything in, and walk you through every feature before we leave." },
              { emoji: '👑', title: 'Luxury Fleet, Not Old Campers', body: 'Marble countertops, king beds, smart TVs, heated massage chairs. These are genuinely the nicest RVs available for rent in East Texas.' },
              { emoji: '⚡', title: 'Book in Minutes, Not Days', body: 'Call or text us. Tell us your dates and where you need delivery. Most bookings are locked in within the hour — no lengthy forms, no waiting around.' },
              { emoji: '📱', title: 'Open 24 / 7 — Always Local', body: 'Westin picks up the phone. No call centers, no hold music, no bots. Real, local support from someone who genuinely cares about your experience.' },
            ].map((card, i) => (
              <div
                key={card.title}
                className={`reveal d${i % 3}`}
                style={{
                  padding: 28,
                  background: '#fff',
                  borderRadius: 16,
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 14 }}>{card.emoji}</div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 20, fontWeight: 700, color: '#0B2012',
                  marginBottom: 10,
                }}>{card.title}</h3>
                <p style={{ fontSize: 15, color: '#5A6B62', lineHeight: 1.75, fontFamily: "'DM Sans', sans-serif" }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: FAQ ───────────────────────────────────── */}
      <section id="faq" style={{ background: '#0B2012', padding: '96px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: 48 }}>
            <div style={{ width: 40, height: 3, background: '#C9963A', borderRadius: 2, marginBottom: 20 }} />
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(28px, 4vw, 50px)',
              fontWeight: 700, color: '#F2EDE3',
            }}>
              Common{' '}
              <em style={{ color: '#C9963A', fontWeight: 400 }}>Questions</em>
            </h2>
          </div>

          <div>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: '1px solid rgba(201,150,58,0.15)' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%', background: 'none', border: 'none',
                    cursor: 'pointer', padding: '20px 0',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    gap: 16, minHeight: 44,
                    textAlign: 'left',
                  }}
                  aria-expanded={openFaq === i}
                >
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 16, fontWeight: 500, color: '#F2EDE3',
                    lineHeight: 1.5,
                  }}>{faq.q}</span>
                  <span style={{
                    color: '#C9963A', fontSize: 20, fontWeight: 300,
                    flexShrink: 0,
                    transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)',
                    transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
                    display: 'inline-block',
                    lineHeight: 1,
                  }}>+</span>
                </button>
                <div style={{
                  maxHeight: openFaq === i ? 300 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)',
                }}>
                  <p style={{
                    fontSize: 15, color: 'rgba(242,237,227,0.55)',
                    lineHeight: 1.8, paddingBottom: 20,
                    fontFamily: "'DM Sans', sans-serif",
                  }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 9: Closing CTA ───────────────────────────── */}
      <section id="quote" style={{ background: '#F2EDE3', padding: '96px 24px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <div className="reveal">
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(28px, 4vw, 50px)',
              fontWeight: 700, color: '#0B2012',
              marginBottom: 18,
            }}>
              Ready to Book?{' '}
              <em style={{ color: '#C9963A', fontWeight: 400 }}>Let&rsquo;s Talk.</em>
            </h2>
            <p style={{
              fontSize: 16, lineHeight: 1.75, color: '#5A6B62',
              marginBottom: 36,
              fontFamily: "'DM Sans', sans-serif",
            }}>
              Weekend availability goes fast — especially in spring and fall. Call Westin directly or send a request and we&rsquo;ll call you back within the hour.
            </p>
          </div>

          <div className="reveal d1">
            <a
              href="tel:9729656901"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: '#C9963A', color: '#0B2012',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600, fontSize: 17,
                padding: '18px 40px', borderRadius: 8,
                textDecoration: 'none',
                animation: 'pulse 2.5s ease-out infinite',
                marginBottom: 16,
                minHeight: 44,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.17 6.17l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z" /></svg>
              Call (972) 965-6901
            </a>
            <p style={{ fontSize: 13, color: '#5A6B62', marginBottom: 40, fontFamily: "'DM Sans', sans-serif" }}>
              or fill out the form — we&rsquo;ll call you within the hour
            </p>
          </div>

          {/* Quote Form */}
          <div className="reveal d2" style={{
            background: '#fff', borderRadius: 18, padding: 32,
            boxShadow: '0 8px 48px rgba(0,0,0,0.09)',
            border: '1px solid rgba(0,0,0,0.06)',
            textAlign: 'left',
          }}>
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              {[
                { label: 'YOUR NAME', key: 'name', placeholder: 'John Smith', type: 'text' },
                { label: 'PHONE NUMBER', key: 'phone', placeholder: '(972) 555-0123', type: 'tel' },
              ].map(({ label, key, placeholder, type }) => (
                <div key={key}>
                  <label style={{
                    display: 'block', fontSize: 11, fontWeight: 600,
                    letterSpacing: '0.1em', color: '#5A6B62',
                    textTransform: 'uppercase', marginBottom: 6,
                    fontFamily: "'DM Sans', sans-serif",
                  }}>{label}</label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    style={{
                      width: '100%', padding: '12px 14px',
                      borderRadius: 8, border: '1px solid rgba(0,0,0,0.12)',
                      fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                      background: '#FAFAF7', color: '#0B2012',
                      outline: 'none', transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = '#C9963A'}
                    onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.12)'}
                  />
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{
                display: 'block', fontSize: 11, fontWeight: 600,
                letterSpacing: '0.1em', color: '#5A6B62',
                textTransform: 'uppercase', marginBottom: 6,
                fontFamily: "'DM Sans', sans-serif",
              }}>RENTAL DATES</label>
              <input
                type="text"
                placeholder="e.g. May 16 – 19, 2025"
                value={form.dates}
                onChange={e => setForm({ ...form, dates: e.target.value })}
                style={{
                  width: '100%', padding: '12px 14px',
                  borderRadius: 8, border: '1px solid rgba(0,0,0,0.12)',
                  fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                  background: '#FAFAF7', color: '#0B2012',
                  outline: 'none', transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = '#C9963A'}
                onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.12)'}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{
                display: 'block', fontSize: 11, fontWeight: 600,
                letterSpacing: '0.1em', color: '#5A6B62',
                textTransform: 'uppercase', marginBottom: 6,
                fontFamily: "'DM Sans', sans-serif",
              }}>ANYTHING ELSE?</label>
              <textarea
                rows={3}
                placeholder="Tell us about your event, location, or group size..."
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                style={{
                  width: '100%', padding: '12px 14px',
                  borderRadius: 8, border: '1px solid rgba(0,0,0,0.12)',
                  fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                  background: '#FAFAF7', color: '#0B2012',
                  outline: 'none', resize: 'vertical',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = '#C9963A'}
                onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.12)'}
              />
            </div>

            <button
              type="button"
              onClick={() => alert("Thanks! We'll call you within the hour.")}
              style={{
                width: '100%',
                background: '#C9963A', color: '#0B2012',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600, fontSize: 15,
                padding: '14px 0', borderRadius: 8,
                border: 'none', cursor: 'pointer',
                transition: 'background 0.2s',
                minHeight: 44,
              }}
              onMouseEnter={e => (e.target as HTMLElement).style.background = '#E0B254'}
              onMouseLeave={e => (e.target as HTMLElement).style.background = '#C9963A'}
            >
              Send Request — We&rsquo;ll Call Within the Hour
            </button>
          </div>
        </div>
      </section>

      {/* ── SECTION 10: Map ──────────────────────────────────── */}
      <section style={{ background: '#0B2012', padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: 40, height: 3, background: '#C9963A', borderRadius: 2, marginBottom: 20 }} />
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(28px, 4vw, 50px)',
              fontWeight: 700, color: '#F2EDE3',
              marginBottom: 12,
            }}>
              Find Us in{' '}
              <em style={{ color: '#C9963A', fontWeight: 400 }}>Tyler, Texas</em>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: 'rgba(242,237,227,0.5)' }}>
              14078 State HWY 110 N, Tyler, Texas 75704
            </p>
          </div>

          <div style={{
            borderRadius: 16, overflow: 'hidden',
            border: '1px solid rgba(201,150,58,0.2)',
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
              📍 Get Directions
            </a>
            <a href="tel:9729656901" className="btn-ghost">
              📞 Call Before You Come
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 11: Footer ───────────────────────────────── */}
      <footer style={{
        background: '#071610',
        borderTop: '1px solid rgba(201,150,58,0.1)',
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
              fontSize: 22, fontWeight: 700, color: '#F2EDE3',
              marginBottom: 16,
            }}>
              Triple W <span style={{ color: '#C9963A' }}>Rentals</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(242,237,227,0.35)', lineHeight: 1.8, fontFamily: "'DM Sans', sans-serif" }}>
              14078 State HWY 110 N<br />
              Tyler, Texas 75704<br />
              Open 24 / 7
            </p>
          </div>

          <div>
            <div style={{
              fontSize: 10, color: '#C9963A',
              fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: 16,
            }}>QUICK LINKS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[['Our Fleet', '#fleet'], ['How It Works', '#how'], ['Reviews', '#reviews'], ['FAQ', '#faq'], ['Book Now', '#quote']].map(([label, href]) => (
                <a key={label} href={href} style={{
                  fontSize: 14, color: 'rgba(242,237,227,0.45)',
                  fontFamily: "'DM Sans', sans-serif",
                  transition: 'color 0.2s',
                  minHeight: 24,
                }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = '#C9963A'}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(242,237,227,0.45)'}
                >{label}</a>
              ))}
            </div>
          </div>

          <div>
            <div style={{
              fontSize: 10, color: '#C9963A',
              fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: 16,
            }}>CONTACT</div>
            <a href="tel:9729656901" style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 20, color: '#F2EDE3',
              display: 'block', marginBottom: 10,
            }}>(972) 965-6901</a>
            <a href="mailto:triplewrentals@gmail.com" style={{
              fontSize: 13, color: 'rgba(242,237,227,0.45)',
              fontFamily: "'DM Sans', sans-serif",
              display: 'block', marginBottom: 8,
            }}>triplewrentals@gmail.com</a>
            <p style={{ fontSize: 13, color: 'rgba(242,237,227,0.25)', fontFamily: "'DM Sans', sans-serif" }}>
              Owner: Westin Wayne Walker
            </p>
          </div>

          <div>
            <div style={{
              fontSize: 10, color: '#C9963A',
              fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: 16,
            }}>SERVICE AREAS</div>
            {['Tyler, TX (Home Base)', 'Dallas / Fort Worth', 'Houston', 'Austin', 'San Antonio', 'Call to confirm your area'].map(area => (
              <p key={area} style={{
                fontSize: 13, color: 'rgba(242,237,227,0.35)',
                fontFamily: "'DM Sans', sans-serif",
                marginBottom: 8, lineHeight: 1.4,
              }}>{area}</p>
            ))}
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(242,237,227,0.07)',
          paddingTop: 24,
          maxWidth: 1100, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 10,
        }}>
          <p style={{ fontSize: 12, color: 'rgba(242,237,227,0.2)', fontFamily: "'DM Sans', sans-serif" }}>
            © 2025 Triple W RV Rentals · All Rights Reserved
          </p>
          <p style={{ fontSize: 12, color: 'rgba(242,237,227,0.2)', fontFamily: "'DM Sans', sans-serif" }}>
            Tyler, Texas 75704
          </p>
        </div>
      </footer>
    </>
  );
}
