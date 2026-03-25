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
  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsInView = useInView(stepsRef, { once: true, amount: 0.2 });

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
      title: "Tell Us Your Trip",
      description: "Share your dates, destination, and group size. We'll match you to the right RV and confirm availability — usually within the hour.",
    },
    {
      icon: Calendar,
      title: "We Handle Everything",
      description: "Delivery, setup, walkthrough, and insurance — all arranged for you. You focus on the anticipation. We handle the rest.",
    },
    {
      icon: Key,
      title: "Arrive & Live It",
      description: "Your RV is on-site, fully prepped, and ready to go. Step inside. The trip you've been looking forward to starts now.",
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
      // Vertical padding scales across all breakpoints; no horizontal padding here —
      // that lives on the inner container so mx-auto centres against the true viewport.
      className="relative overflow-hidden
                 pt-16 md:pt-24 lg:pt-28
                 pb-20 md:pb-28 lg:pb-32"
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
          maxWidth: '1100px',
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
          width: '70vw',
          maxWidth: '1200px',
          height: '200px',
          background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.07) 0%, transparent 70%)',
          filter: 'blur(56px)',
        }}
      />

      {/*
        ── Inner container ────────────────────────────────────────────────────────
        Responsive max-width:
          lg  (1024px+): 960px  — tight & balanced on tablets / small laptops
          xl  (1280px+): 1152px — comfortable on 1440px & standard desktops
          2xl (1536px+): 1280px — right-sized for 1920px FHD monitors
        Horizontal padding scales so columns stay readable at every size.
        mx-auto centres against the TRUE viewport width (no section padding offset).
      */}
      <div className="relative w-full
                      max-w-5xl xl:max-w-6xl 2xl:max-w-7xl
                      mx-auto
                      px-6 xl:px-10 2xl:px-14">

        {/* ── Title ─────────────────────────────────────────────── */}
        <div className="text-center mb-10 md:mb-12 lg:mb-14">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '24px',
            }}
          >
            <span style={{ display: 'inline-block', width: '28px', height: '1px', background: 'rgba(201,168,76,0.6)' }} />
            <span style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#C9A84C',
              fontFamily: "'Outfit', sans-serif",
            }}>
              The Process
            </span>
            <span style={{ display: 'inline-block', width: '28px', height: '1px', background: 'rgba(201,168,76,0.6)' }} />
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: 'clamp(3rem, 5.5vw, 4.4rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#F0E8D8',
              maxWidth: '620px',
              margin: '0 auto',
              padding: '0 16px',
            }}
          >
            Simple Process.<br />
            <em style={{
              fontStyle: 'italic',
              color: '#C9A84C',
              textShadow: '0 0 40px rgba(201,168,76,0.25)',
            }}>Unforgettable Trip.</em>
          </motion.h2>

          {/* Sub-line */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 300,
              fontSize: '14px',
              letterSpacing: '0.03em',
              lineHeight: 1.7,
              color: '#A89880',
              marginTop: '24px',
              maxWidth: '400px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Three steps. Every detail handled. Nothing left to chance.
          </motion.p>
        </div>

        {/* ── Steps Container ────────────────────────────────────── */}
        {/* pt-10 = 40px so connector line (top-[7rem] = 112px = 40+72) hits node centres */}
        <div className="relative pt-10">

          {/* Connection Line — desktop (lg+) */}
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
                strokeDasharray="1600"
                strokeDashoffset={useTransform(lineProgress, [0, 1], [1600, 0])}
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

          {/* Ghost ring placeholders — decorative, aria-hidden, pointer-events-none.
              Visually anchors all 3 column positions from first render so the section
              never looks left-heavy while steps 2 & 3 are still waiting to animate in.
              Uses the same grid-cols-3 layout as the real grid — always aligned. */}
          <div
            aria-hidden="true"
            className="hidden lg:grid grid-cols-3 pointer-events-none absolute left-0 right-0"
            style={{ top: '40px' }}
          >
            {[0, 1, 2].map(i => (
              <div key={i} className="flex flex-col items-center">
                <div style={{
                  width: '144px',
                  height: '144px',
                  borderRadius: '50%',
                  border: '1px solid rgba(201,168,76,0.18)',
                  background: 'radial-gradient(circle at 32% 28%, rgba(201,168,76,0.04) 0%, transparent 70%)',
                }} />
                <div style={{
                  marginTop: '32px',
                  fontSize: '10px',
                  fontWeight: 400,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(201,168,76,0.10)',
                  fontFamily: "'Outfit', sans-serif",
                }}>0{i + 1}</div>
              </div>
            ))}
          </div>

          {/* Steps Grid */}
          <div ref={stepsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-0">
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
                  animate={stepsInView ? "visible" : "hidden"}
                  variants={{
                    hidden: { opacity: 0, scale: 0.75, y: 18 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: {
                        duration: 0.65,
                        delay: [0.1, 0.35, 0.6][index],
                        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                        scale: { type: "spring", damping: 22, stiffness: 320, restDelta: 0.001 }
                      }
                    }
                  }}
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

                  {/* Step text — padding scales with column width at each breakpoint */}
                  <motion.div
                    className="mt-8 px-3 lg:px-4 xl:px-6"
                    initial={{ opacity: 0, y: 12 }}
                    animate={shouldShow ? {
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.32, duration: 0.55, ease: [0.22, 1, 0.36, 1] }
                    } : { opacity: 0, y: 12 }}
                  >
                    <span style={{
                      display: 'block',
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 400,
                      fontSize: '10px',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: stepState === 'active' ? 'rgba(201,168,76,0.7)' :
                             stepState === 'completed' ? 'rgba(201,168,76,0.35)' :
                                                         'rgba(201,168,76,0.12)',
                      marginBottom: '10px',
                      transition: 'color 0.5s ease',
                    }}>
                      0{index + 1}
                    </span>
                    <h3
                      className="transition-all duration-500"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 500,
                        // fluid: floor 1.3rem, 2.2vw fluid, 1.7rem cap
                        fontSize: 'clamp(1.3rem, 2.2vw, 1.7rem)',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.2,
                        marginBottom: '10px',
                        color: stepState === 'active'    ? '#F0E8D8' :
                               stepState === 'completed' ? '#D4C8B4' :
                                                           'rgba(240,232,216,0.18)',
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="transition-all duration-500"
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 300,
                        fontSize: 'clamp(12px, 1vw, 14px)',
                        lineHeight: 1.75,
                        maxWidth: '260px',
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
          className="text-center mt-10 md:mt-12 lg:mt-14"
        >
          {/* Thin gold rule */}
          <div style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.4), transparent)',
            margin: '0 auto 32px',
          }} />

          {/* Gold metallic CTA */}
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
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 300,
              fontSize: '11px',
              letterSpacing: '0.05em',
              color: '#6B5F52',
              marginTop: '22px',
            }}
          >
            Most bookings confirmed within the hour &nbsp;·&nbsp; White-glove service from first call to last night
          </p>
        </motion.div>

      </div>
    </section>
  );
}
