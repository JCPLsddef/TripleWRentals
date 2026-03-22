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

  // Sequential step activation — desktop thresholds compressed for tighter scroll feel
  useEffect(() => {
    const unsubscribe = lineProgress.on('change', (latest) => {
      if (isDesktop) {
        // Desktop: tighter progression so Bubble 3 arrives without excess scrolling
        if (latest < 0.28) setCurrentStep(0);
        else if (latest < 0.52) setCurrentStep(1);
        else setCurrentStep(2);
      } else {
        // Mobile: unchanged
        if (latest < 0.35) setCurrentStep(0);
        else if (latest < 0.65) setCurrentStep(1);
        else setCurrentStep(2);
      }
    });
    return () => unsubscribe();
  }, [lineProgress, isDesktop]);

  // Premium "stomp" — weighted, confident, precise. Refined ease for luxury feel.
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
      className="relative px-6 pt-24 md:pt-32 lg:pt-40 pb-24 md:pb-32 lg:pb-40"
      style={{
        background: '#FAF8F4',
        borderTop: '1px solid rgba(201,168,76,0.15)',
        borderBottom: '1px solid rgba(201,168,76,0.15)',
      }}
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Title ───────────────────────────────────────────── */}
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
              gap: '12px',
              marginBottom: '26px'
            }}
          >
            <span style={{ display: 'inline-block', width: '28px', height: '1px', background: 'rgba(184,146,42,0.4)' }} />
            <span style={{
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#B8922A',
              fontFamily: "'Inter', sans-serif"
            }}>
              The Process
            </span>
            <span style={{ display: 'inline-block', width: '28px', height: '1px', background: 'rgba(184,146,42,0.4)' }} />
          </motion.div>

          {/* Headline — strong, editorial, balanced */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="px-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 'clamp(2.4rem, 5vw, 3.25rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              color: '#1A1714',
              maxWidth: '620px',
              margin: '0 auto'
            }}
          >
            From First Call<br />
            <span style={{ fontStyle: 'italic', color: '#2E2A26' }}>to Check-In.</span>
          </motion.h2>
        </div>

        {/* ── Steps Container ──────────────────────────────────── */}
        {/* pt-10 = 40px top padding so connector line (at 7rem = 112px) hits node centers */}
        <div className="relative px-4 lg:px-8 pt-10">

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
                  <stop offset="0%" stopColor="#FAF8F4" />
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
                fill="url(#beadGradient)"
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
              </defs>
            </svg>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const stepState = getStepState(index);
              const isHovered = hoveredStep === index;

              const nodeStyles = {
                inactive: {
                  borderColor: 'rgba(201,168,76,0.28)',
                  glowOpacity: 0,
                  iconColor: '#7A6040',
                  iconFilter: 'none',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.05)'
                },
                active: {
                  borderColor: '#C9A84C',
                  glowOpacity: 0.3,
                  iconColor: '#C9A84C',
                  iconFilter: 'drop-shadow(0 0 8px rgba(198,156,82,0.45))',
                  boxShadow: '0 0 36px rgba(198,156,82,0.22), 0 8px 32px rgba(0,0,0,0.12), inset 0 0 28px rgba(198,156,82,0.10)'
                },
                completed: {
                  borderColor: '#B8922A',
                  glowOpacity: 0.12,
                  iconColor: '#B8922A',
                  iconFilter: 'drop-shadow(0 0 4px rgba(180,140,40,0.28))',
                  boxShadow: '0 0 18px rgba(180,140,40,0.14), 0 4px 20px rgba(0,0,0,0.09), inset 0 0 14px rgba(180,140,40,0.07)'
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
                  // Subtle premium card lift on hover — desktop hover events only
                  whileHover={stepState !== 'inactive' ? { scale: 1.015 } : undefined}
                  transition={{ scale: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                  className="flex flex-col items-center text-center cursor-pointer"
                  style={{ willChange: 'transform' }}
                >
                  {/* Node */}
                  <motion.div
                    className="relative w-36 h-36 flex items-center justify-center"
                    animate={{ y: isHovered && stepState !== 'inactive' ? -4 : 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Ambient glow — soft gold halo on white */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{
                        opacity: (isHovered && stepState !== 'inactive') ? 0.45 : currentStyle.glowOpacity,
                        scale: (isHovered && stepState !== 'inactive') ? 1.2 : 1.1,
                      }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        background: 'radial-gradient(circle, rgba(198,156,82,0.32) 0%, rgba(198,156,82,0) 65%)',
                        filter: 'blur(20px)'
                      }}
                    />

                    {/* Dark orb — dramatic contrast on white */}
                    <motion.div
                      className="relative w-full h-full rounded-full border-[1.5px] flex items-center justify-center"
                      style={{
                        background: 'radial-gradient(circle at 32% 28%, #1E1A16 0%, #0D0B09 100%)',
                      }}
                      animate={{
                        borderColor: isHovered && stepState !== 'inactive' ? '#C9A84C' : currentStyle.borderColor,
                        boxShadow: isHovered && stepState !== 'inactive'
                          ? '0 0 44px rgba(198,156,82,0.28), 0 10px 40px rgba(0,0,0,0.18), inset 0 0 32px rgba(198,156,82,0.14)'
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
                              ? 'drop-shadow(0 0 10px rgba(198,156,82,0.65))'
                              : currentStyle.iconFilter
                          }}
                          strokeWidth={1.5}
                        />
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Step text */}
                  <motion.div
                    className="mt-9 px-2 lg:px-5"
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
                        fontSize: 'clamp(1.2rem, 2vw, 1.55rem)',
                        letterSpacing: '-0.012em',
                        lineHeight: 1.18,
                        marginBottom: '14px',
                        color: stepState === 'active' ? '#1A1714' :
                               stepState === 'completed' ? '#2A2420' : '#6A5E52',
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
                        maxWidth: '224px',
                        margin: '0 auto',
                        color: stepState === 'active' ? '#3E3630' :
                               stepState === 'completed' ? '#4E4640' : '#9A8E84',
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

        {/* ── CTA ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={currentStep >= 2 ? {
            opacity: 1,
            y: 0,
            transition: { delay: 0.55, duration: 0.75, ease: [0.22, 1, 0.36, 1] }
          } : { opacity: 0, y: 24 }}
          className="text-center mt-16 md:mt-20 lg:mt-24"
        >
          {/* Subtle divider */}
          <div style={{
            width: '40px',
            height: '1px',
            background: 'rgba(184,146,42,0.3)',
            margin: '0 auto 28px'
          }} />

          <motion.button
            whileHover={{ scale: 1.015, y: -2 }}
            whileTap={{ scale: 0.985 }}
            className="group relative overflow-hidden transition-all duration-500"
            style={{
              background: '#1A1714',
              color: '#F5F0E8',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '13px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '18px 52px',
              border: 'none',
              boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
            }}
          >
            <span className="relative z-10">Start Your Booking</span>
            <motion.div
              className="absolute inset-0"
              style={{ background: '#2A2420' }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
            />
          </motion.button>

          <p
            className="mt-5"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: '11px',
              letterSpacing: '0.04em',
              color: '#A09080'
            }}
          >
            Confirmed within the hour &nbsp;·&nbsp; White-glove service throughout
          </p>
        </motion.div>

      </div>

      {/* Warm ambient base */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[56rem] h-[10rem] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, transparent 70%)',
          filter: 'blur(52px)'
        }}
      />
    </section>
  );
}
