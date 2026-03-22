'use client'

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { Phone, Calendar, Key } from 'lucide-react';

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.12 });
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.6", "end 0.3"]
  });

  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const steps = [
    {
      icon: Phone,
      title: 'Call or Text Us',
      description: "Tell us your dates, occasion, and group size. We'll find the right RV and confirm availability — most bookings sorted within the hour."
    },
    {
      icon: Calendar,
      title: 'We Handle Everything',
      description: 'Delivery, setup, walkthrough, and insurance arranged for you. Every detail taken care of before you arrive.'
    },
    {
      icon: Key,
      title: 'Arrive & Enjoy',
      description: 'Your RV is on-site, fully prepped, and ready. Step inside, make yourself at home, and let the experience begin.'
    }
  ];

  // Sequential step activation — locked, do not modify
  useEffect(() => {
    const unsubscribe = lineProgress.on('change', (latest) => {
      if (isDesktop) {
        if (latest < 0.28) setCurrentStep(0);
        else if (latest < 0.52) setCurrentStep(1);
        else setCurrentStep(2);
      } else {
        if (latest < 0.35) setCurrentStep(0);
        else if (latest < 0.65) setCurrentStep(1);
        else setCurrentStep(2);
      }
    });
    return () => unsubscribe();
  }, [lineProgress, isDesktop]);

  // Stomp animation — locked, do not modify
  const stompAnimation = {
    hidden: { opacity: 0, scale: 0.75, y: 18 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        scale: { type: "spring", damping: 22, stiffness: 320, restDelta: 0.001 }
      }
    }
  };

  const getStepState = (index: number) => {
    if (currentStep < index) return 'inactive';
    if (currentStep === index) return 'active';
    return 'completed';
  };

  // Node size: w-36 h-36 = 144px. Center = 72px.
  // Grid container has pt-10 (40px). Line must align to node center = 40 + 72 = 112px = 7rem.
  const LINE_TOP = 'top-[7rem]';

  return (
    <section
      ref={sectionRef}
      id="how"
      className="relative overflow-hidden pt-24 md:pt-32 lg:pt-40 pb-28 md:pb-36 lg:pb-44"
      style={{
        background: 'radial-gradient(ellipse at 50% 20%, #161209 0%, #0D0B09 55%, #080604 100%)',
        borderTop: '1px solid rgba(201,168,76,0.14)',
        borderBottom: '1px solid rgba(201,168,76,0.14)',
      }}
    >

      {/* ── Noise texture ── */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full"
        style={{ opacity: 0.04, mixBlendMode: 'overlay' }}
      >
        <filter id="howNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#howNoise)" />
      </svg>

      {/* ── Top atmospheric gold bloom ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2"
        style={{
          width: '80vw',
          maxWidth: '900px',
          height: '420px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.10) 0%, transparent 65%)',
          filter: 'blur(48px)',
        }}
      />

      {/* ── Bottom ambient ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: '60rem',
          height: '200px',
          background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.07) 0%, transparent 70%)',
          filter: 'blur(56px)',
        }}
      />

      <div className="relative w-full max-w-5xl mx-auto px-6">

        {/* ── Title ─────────────────────────────────────────────── */}
        <div className="text-center mb-20 md:mb-24 lg:mb-28">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              marginBottom: '30px',
            }}
          >
            <span style={{ display: 'inline-block', width: '40px', height: '1px', background: 'rgba(201,168,76,0.55)' }} />
            <span style={{
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#C9A84C',
              fontFamily: "'Inter', sans-serif",
            }}>
              The Process
            </span>
            <span style={{ display: 'inline-block', width: '40px', height: '1px', background: 'rgba(201,168,76,0.55)' }} />
          </motion.div>

          {/* Headline — editorial, large, white */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="px-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 'clamp(3rem, 5.5vw, 4.4rem)',
              lineHeight: 1.06,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              maxWidth: '680px',
              margin: '0 auto',
            }}
          >
            From First Call<br />
            <em style={{
              fontStyle: 'italic',
              color: '#C9A84C',
              textShadow: '0 0 40px rgba(201,168,76,0.25)',
            }}>to Check-In.</em>
          </motion.h2>

          {/* Sub-line */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: '13.5px',
              letterSpacing: '0.03em',
              lineHeight: 1.7,
              color: '#7A6E60',
              marginTop: '22px',
              maxWidth: '320px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Three steps. Every detail handled for you.
          </motion.p>
        </div>

        {/* ── Steps Container ────────────────────────────────────── */}
        {/* pt-10 = 40px top padding so connector line (at 7rem = 112px) hits node centers */}
        <div className="relative pt-10">

          {/* Connection Line — desktop */}
          <div className={`absolute ${LINE_TOP} left-0 right-0 h-[2px] hidden lg:block pointer-events-none`}>
            <svg className="w-full h-full" preserveAspectRatio="none">
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
                stroke="url(#lineGradient)"
                strokeWidth="1.5"
                strokeDasharray="1200"
                strokeDashoffset={useTransform(lineProgress, [0, 1], [1200, 0])}
                style={{ filter: 'drop-shadow(0 0 4px rgba(180, 140, 40, 0.5))' }}
              />
              <motion.circle
                cx={useTransform(lineProgress, [0, 0.33, 0.66, 1], ['16.7%', '50%', '83.3%', '83.3%'])}
                cy="1"
                r="3"
                fill="url(#beadGradient)"
                style={{
                  filter: 'drop-shadow(0 0 6px rgba(180, 140, 40, 0.8))',
                  opacity: useTransform(lineProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0])
                }}
              />
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#B8922A" />
                  <stop offset="50%" stopColor="#C9A84C" />
                  <stop offset="100%" stopColor="#B8922A" />
                </linearGradient>
                <radialGradient id="beadGradient">
                  <stop offset="0%" stopColor="#0D0B09" />
                  <stop offset="45%" stopColor="#E8C97A" />
                  <stop offset="100%" stopColor="#B8922A" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          {/* Mobile vertical connector line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full lg:hidden pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none">
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
                stroke="url(#lineGradientVertical)"
                strokeWidth="1.5"
                strokeDasharray="2000"
                strokeDashoffset={useTransform(lineProgress, [0, 1], [2000, 0])}
                style={{ filter: 'drop-shadow(0 0 4px rgba(180, 140, 40, 0.4))' }}
              />
              <motion.circle
                cx="1"
                cy={useTransform(lineProgress, [0, 0.33, 0.66, 1], ['8%', '50%', '92%', '92%'])}
                r="3"
                fill="url(#beadGradientV)"
                style={{
                  filter: 'drop-shadow(0 0 6px rgba(180, 140, 40, 0.8))',
                  opacity: useTransform(lineProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0])
                }}
              />
              <defs>
                <linearGradient id="lineGradientVertical" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#B8922A" />
                  <stop offset="50%" stopColor="#C9A84C" />
                  <stop offset="100%" stopColor="#B8922A" />
                </linearGradient>
                <radialGradient id="beadGradientV">
                  <stop offset="0%" stopColor="#0D0B09" />
                  <stop offset="45%" stopColor="#E8C97A" />
                  <stop offset="100%" stopColor="#B8922A" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          {/* Steps Grid */}
          {/* Ghost ring placeholders — visible on desktop at all times, purely decorative.
              Anchors all 3 column positions visually before scroll reveals each step. */}
          <div
            aria-hidden="true"
            className="hidden lg:grid grid-cols-3 pointer-events-none absolute left-0 right-0"
            style={{ top: '40px', height: '144px' }}
          >
            {[0, 1, 2].map(i => (
              <div key={i} className="flex justify-center items-center">
                <div style={{
                  width: '144px',
                  height: '144px',
                  borderRadius: '50%',
                  border: '1px solid rgba(201,168,76,0.07)',
                }} />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const stepState = getStepState(index);
              const isHovered = hoveredStep === index;

              const nodeStyles = {
                inactive: {
                  borderColor: 'rgba(201,168,76,0.20)',
                  glowOpacity: 0,
                  iconColor: 'rgba(201,168,76,0.28)',
                  iconFilter: 'none',
                  boxShadow: '0 0 0 1px rgba(201,168,76,0.06), 0 4px 28px rgba(0,0,0,0.5)',
                },
                active: {
                  borderColor: '#C9A84C',
                  glowOpacity: 0.35,
                  iconColor: '#C9A84C',
                  iconFilter: 'drop-shadow(0 0 8px rgba(198,156,82,0.55))',
                  boxShadow: '0 0 52px rgba(198,156,82,0.22), 0 12px 40px rgba(0,0,0,0.55), inset 0 0 32px rgba(198,156,82,0.08)',
                },
                completed: {
                  borderColor: '#B8922A',
                  glowOpacity: 0.15,
                  iconColor: '#B8922A',
                  iconFilter: 'drop-shadow(0 0 4px rgba(180,140,40,0.32))',
                  boxShadow: '0 0 28px rgba(180,140,40,0.16), 0 6px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(180,140,40,0.06)',
                }
              };

              const currentStyle = nodeStyles[stepState];
              const shouldShow = stepState !== 'inactive';

              return (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate={shouldShow ? "visible" : "hidden"}
                  variants={stompAnimation}
                  whileHover={stepState !== 'inactive' ? { scale: 1.015 } : undefined}
                  transition={{ scale: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                  className="flex flex-col items-center text-center cursor-pointer"
                  style={{ willChange: 'transform' }}
                >
                  {/* Node — locked, do not modify */}
                  <motion.div
                    className="relative w-36 h-36 flex items-center justify-center"
                    animate={{ y: isHovered && stepState !== 'inactive' ? -4 : 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{
                        opacity: (isHovered && stepState !== 'inactive') ? 0.55 : currentStyle.glowOpacity,
                        scale: (isHovered && stepState !== 'inactive') ? 1.25 : 1.1,
                      }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        background: 'radial-gradient(circle, rgba(198,156,82,0.36) 0%, rgba(198,156,82,0) 65%)',
                        filter: 'blur(22px)',
                      }}
                    />
                    <motion.div
                      className="relative w-full h-full rounded-full border-[1.5px] flex items-center justify-center"
                      style={{ background: 'radial-gradient(circle at 32% 28%, #1E1A16 0%, #0D0B09 100%)' }}
                      animate={{
                        borderColor: isHovered && stepState !== 'inactive' ? '#C9A84C' : currentStyle.borderColor,
                        boxShadow: isHovered && stepState !== 'inactive'
                          ? '0 0 56px rgba(198,156,82,0.28), 0 14px 44px rgba(0,0,0,0.6), inset 0 0 36px rgba(198,156,82,0.12)'
                          : currentStyle.boxShadow,
                      }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <motion.div
                        animate={{ scale: (isHovered && stepState !== 'inactive') ? 1.08 : 1 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Icon
                          className="w-12 h-12 transition-all duration-500"
                          style={{
                            color: isHovered && stepState !== 'inactive' ? '#C9A84C' : currentStyle.iconColor,
                            filter: isHovered && stepState !== 'inactive'
                              ? 'drop-shadow(0 0 12px rgba(198,156,82,0.7))'
                              : currentStyle.iconFilter,
                          }}
                          strokeWidth={1.5}
                        />
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Step text */}
                  <motion.div
                    className="mt-9 px-2 lg:px-6"
                    initial={{ opacity: 0, y: 12 }}
                    animate={shouldShow ? {
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.32, duration: 0.55, ease: [0.22, 1, 0.36, 1] }
                    } : { opacity: 0, y: 12 }}
                  >
                    <h3
                      className="transition-all duration-500"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 500,
                        fontSize: 'clamp(1.3rem, 2.2vw, 1.65rem)',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.2,
                        marginBottom: '14px',
                        color: stepState === 'active'    ? '#FFFFFF' :
                               stepState === 'completed' ? '#D4C8B4' :
                                                           'rgba(255,255,255,0.18)',
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="transition-all duration-500"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300,
                        fontSize: '13px',
                        lineHeight: 1.9,
                        maxWidth: '220px',
                        margin: '0 auto',
                        color: stepState === 'active'    ? '#A89880' :
                               stepState === 'completed' ? '#7A6E60' :
                                                           'rgba(168,152,128,0.25)',
                      }}
                    >
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── CTA ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={currentStep >= 2 ? {
            opacity: 1,
            y: 0,
            transition: { delay: 0.55, duration: 0.75, ease: [0.22, 1, 0.36, 1] }
          } : { opacity: 0, y: 24 }}
          className="text-center mt-20 md:mt-24 lg:mt-28"
        >
          {/* Thin gold rule */}
          <div style={{
            width: '1px',
            height: '52px',
            background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.4), transparent)',
            margin: '0 auto 40px',
          }} />

          {/* Gold metallic CTA button */}
          <motion.button
            whileHover={{ scale: 1.018, y: -3 }}
            whileTap={{ scale: 0.982 }}
            onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(105deg, #A87820 0%, #C9A84C 28%, #E8C86A 52%, #C9A84C 72%, #A87820 100%)',
              color: '#0D0B09',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '11.5px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '20px 68px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 32px rgba(201,168,76,0.28), 0 2px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.15)',
              transition: 'box-shadow 0.4s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 6px 48px rgba(201,168,76,0.5), 0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(0,0,0,0.15)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 32px rgba(201,168,76,0.28), 0 2px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.15)')}
          >
            Begin Your Reservation
          </motion.button>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: '11px',
              letterSpacing: '0.05em',
              color: '#5C5248',
              marginTop: '22px',
            }}
          >
            Confirmed within the hour &nbsp;·&nbsp; White-glove service throughout
          </p>
        </motion.div>

      </div>
    </section>
  );
}
