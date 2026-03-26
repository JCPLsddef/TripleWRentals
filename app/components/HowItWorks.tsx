'use client'

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Phone, Calendar, Key } from 'lucide-react';

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.6", "end 0.3"]
  });

  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Hoisted useTransform calls — must always be called (rules of hooks)
  const desktopLineOffset = useTransform(lineProgress, [0, 1], [1600, 0]);
  const desktopBeadCx = useTransform(lineProgress, [0, 0.33, 0.66, 1], ['16.7%', '50%', '83.3%', '83.3%']);
  const beadOpacity = useTransform(lineProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);
  const mobileLineOffset = useTransform(lineProgress, [0, 1], [2000, 0]);
  const mobileBeadCy = useTransform(lineProgress, [0, 0.33, 0.66, 1], ['8%', '50%', '92%', '92%']);
  const mobileBeadOpacity = useTransform(lineProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  const steps = [
    {
      icon: Phone,
      number: '01',
      title: "Tell Us Your Trip",
      description: "Share your dates, destination, and group size. We\u2019ll match you to the right RV and confirm availability \u2014 usually within the day.",
    },
    {
      icon: Calendar,
      number: '02',
      title: "We Handle Everything",
      description: "Delivery, setup, walkthrough, and insurance \u2014 all arranged for you. You focus on the anticipation. We handle the rest.",
    },
    {
      icon: Key,
      number: '03',
      title: "Arrive & Live It",
      description: "Your RV is on-site, fully prepped, and ready to go. Step inside. The trip you\u2019ve been looking forward to starts now.",
    }
  ];

  const circleDelays = [0.05, 0.20, 0.35];
  const textDelays = [0.15, 0.30, 0.45];

  return (
    <section
      ref={sectionRef}
      id="how"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#0D0B09',
        borderTop: '1px solid rgba(201,168,76,0.14)',
        borderBottom: '1px solid rgba(201,168,76,0.14)',
        paddingTop: 'clamp(64px, 8vw, 112px)',
        paddingBottom: 'clamp(80px, 10vw, 128px)',
      }}
    >

      {/* Noise texture */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04, mixBlendMode: 'overlay', pointerEvents: 'none' }}
      >
        <filter id="howNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#howNoise)" />
      </svg>

      {/* Top atmospheric gold bloom */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-80px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80vw',
          maxWidth: '1100px',
          height: '420px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.10) 0%, transparent 65%)',
          filter: 'blur(48px)',
          pointerEvents: 'none',
        }}
      />

      {/* Container */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px', position: 'relative' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: '#F0E8D8',
            margin: 0,
          }}>
            Simple Process.<br />
            <em style={{
              fontStyle: 'italic',
              color: '#C9A84C',
              textShadow: '0 0 40px rgba(201,168,76,0.25)',
            }}>Unforgettable Trip.</em>
          </h2>

          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            fontSize: '14px',
            letterSpacing: '0.03em',
            lineHeight: 1.7,
            color: '#A89880',
            marginTop: '20px',
            maxWidth: '400px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Three steps. Every detail handled. Nothing left to chance.
          </p>
        </motion.div>

        {/* Steps container */}
        <div style={{ position: 'relative' }}>

          {/* Desktop horizontal connector line — hidden below md via CSS */}
          <div className="hw-line-desktop" style={{ position: 'absolute', top: 'calc(16px + 72px)', left: 0, right: 0, height: '2px', pointerEvents: 'none', display: 'none' }}>
            <svg style={{ width: '100%', height: '100%' }} preserveAspectRatio="none">
              <line
                x1="16.7%"
                y1="1"
                x2="83.3%"
                y2="1"
                stroke="#C9A84C"
                strokeWidth="1"
                strokeDasharray="3 8"
                opacity="0.15"
              />
              <motion.line
                x1="16.7%"
                y1="1"
                x2="83.3%"
                y2="1"
                stroke="url(#lineGrad)"
                strokeWidth="1.5"
                strokeDasharray="1600"
                strokeDashoffset={desktopLineOffset}
                style={{ filter: 'drop-shadow(0 0 4px rgba(180,140,40,0.5))' }}
              />
              <motion.circle
                cx={desktopBeadCx}
                cy="1"
                r="3"
                fill="url(#beadGrad)"
                style={{
                  filter: 'drop-shadow(0 0 6px rgba(180,140,40,0.8))',
                  opacity: beadOpacity
                }}
              />
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#B8922A" />
                  <stop offset="50%" stopColor="#C9A84C" />
                  <stop offset="100%" stopColor="#B8922A" />
                </linearGradient>
                <radialGradient id="beadGrad">
                  <stop offset="0%" stopColor="#0D0B09" />
                  <stop offset="45%" stopColor="#E8C97A" />
                  <stop offset="100%" stopColor="#B8922A" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          {/* Mobile vertical connector line — hidden at md+ via CSS */}
          <div className="hw-line-mobile" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '2px', height: '100%', pointerEvents: 'none', display: 'block' }}>
            <svg style={{ width: '100%', height: '100%' }} preserveAspectRatio="none">
              <line
                x1="1"
                y1="8%"
                x2="1"
                y2="92%"
                stroke="#C9A84C"
                strokeWidth="1"
                strokeDasharray="3 8"
                opacity="0.15"
              />
              <motion.line
                x1="1"
                y1="8%"
                x2="1"
                y2="92%"
                stroke="url(#lineGradV)"
                strokeWidth="1.5"
                strokeDasharray="2000"
                strokeDashoffset={mobileLineOffset}
                style={{ filter: 'drop-shadow(0 0 4px rgba(180,140,40,0.4))' }}
              />
              <motion.circle
                cx="1"
                cy={mobileBeadCy}
                r="3"
                fill="url(#beadGradV)"
                style={{
                  filter: 'drop-shadow(0 0 6px rgba(180,140,40,0.8))',
                  opacity: mobileBeadOpacity
                }}
              />
              <defs>
                <linearGradient id="lineGradV" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#B8922A" />
                  <stop offset="50%" stopColor="#C9A84C" />
                  <stop offset="100%" stopColor="#B8922A" />
                </linearGradient>
                <radialGradient id="beadGradV">
                  <stop offset="0%" stopColor="#0D0B09" />
                  <stop offset="45%" stopColor="#E8C97A" />
                  <stop offset="100%" stopColor="#B8922A" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          {/* Steps grid */}
          <div className="hw-steps-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 0,
            textAlign: 'center',
            alignItems: 'start',
          }}>
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="hw-step"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '0 24px',
                    marginBottom: '48px',
                  }}
                >
                  {/* Step number */}
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: circleDelays[index], duration: 0.5 }}
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '0.65rem',
                      fontWeight: 500,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'rgba(201,168,76,0.65)',
                      marginBottom: '16px',
                    }}
                  >
                    {step.number}
                  </motion.span>

                  {/* Circle with icon */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: circleDelays[index] }}
                    style={{
                      position: 'relative',
                      width: '144px',
                      height: '144px',
                      margin: '0 auto',
                    }}
                  >
                    {/* Ambient glow */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(198,156,82,0.20) 0%, transparent 70%)',
                        filter: 'blur(16px)',
                      }}
                    />
                    {/* Circle border */}
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      border: '1.5px solid rgba(201,168,76,0.55)',
                      background: 'radial-gradient(circle at 32% 28%, #1E1A16 0%, #0D0B09 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 52px rgba(198,156,82,0.18), 0 12px 40px rgba(0,0,0,0.55)',
                    }}>
                      <Icon
                        style={{
                          width: '44px',
                          height: '44px',
                          color: '#C9A84C',
                          filter: 'drop-shadow(0 0 8px rgba(198,156,82,0.55))',
                        }}
                        strokeWidth={1.5}
                      />
                    </div>
                  </motion.div>

                  {/* Text block */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: textDelays[index] }}
                  >
                    <h3 style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 'clamp(1.3rem, 2.2vw, 1.6rem)',
                      fontWeight: 400,
                      color: '#F0E8D8',
                      marginTop: '28px',
                      marginBottom: '12px',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.2,
                    }}>
                      {step.title}
                    </h3>
                    <p style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '14px',
                      fontWeight: 300,
                      color: '#A89880',
                      lineHeight: 1.75,
                      maxWidth: '240px',
                      margin: '0 auto',
                    }}>
                      {step.description}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginTop: '64px' }}
        >
          {/* Gold divider */}
          <div style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.4), transparent)',
            margin: '0 auto 32px',
          }} />

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.018, y: -3 }}
            whileTap={{ scale: 0.982 }}
            onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(105deg, #A87820 0%, #C9A84C 28%, #E8C86A 52%, #C9A84C 72%, #A87820 100%)',
              color: '#0D0B09',
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 500,
              fontSize: '11.5px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '20px 68px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 32px rgba(201,168,76,0.28)',
              transition: 'box-shadow 0.4s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 6px 48px rgba(201,168,76,0.5), 0 4px 20px rgba(0,0,0,0.5)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 32px rgba(201,168,76,0.28)')}
          >
            Begin Your Reservation
          </motion.button>

          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 300,
            fontSize: '11px',
            letterSpacing: '0.05em',
            color: '#6B5F52',
            marginTop: '22px',
          }}>
            Most bookings confirmed within the day &nbsp;&middot;&nbsp; White-glove service from first call to last night
          </p>
        </motion.div>

      </div>

      <style>{`
        @media (min-width: 768px) {
          .hw-steps-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .hw-step {
            margin-bottom: 0 !important;
          }
          .hw-line-desktop {
            display: block !important;
          }
          .hw-line-mobile {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
