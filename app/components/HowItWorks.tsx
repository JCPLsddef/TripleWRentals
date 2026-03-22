'use client'

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { Phone, Calendar, Key } from 'lucide-react';

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.12 });
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.6", "end 0.3"]
  });

  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const steps = [
    {
      icon: Phone,
      title: 'Call or Text Us',
      description: "Tell us your dates, occasion, and group size. We'll find your perfect RV and confirm availability — most bookings sorted within the hour."
    },
    {
      icon: Calendar,
      title: 'We Handle Everything',
      description: 'Delivery, full setup, walkthrough, and insurance are all arranged for you. Every detail is taken care of before you arrive.'
    },
    {
      icon: Key,
      title: 'Arrive & Enjoy',
      description: 'Your RV is on-site, fully prepped, and ready to go. Step inside, make yourself at home, and let the experience begin.'
    }
  ];

  // Sequential step activation based on scroll
  useEffect(() => {
    const unsubscribe = lineProgress.on('change', (latest) => {
      if (latest < 0.35) setCurrentStep(0);
      else if (latest < 0.65) setCurrentStep(1);
      else setCurrentStep(2);
    });
    return () => unsubscribe();
  }, [lineProgress]);

  // Premium "stomp" animation — weighted, confident, precise
  const stompAnimation = {
    hidden: { opacity: 0, scale: 0.7, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        scale: { type: "spring", damping: 20, stiffness: 300, restDelta: 0.001 }
      }
    }
  };

  const getStepState = (index: number) => {
    if (currentStep < index) return 'inactive';
    if (currentStep === index) return 'active';
    return 'completed';
  };

  return (
    <section
      ref={sectionRef}
      id="how"
      className="relative px-6 pt-24 md:pt-32 lg:pt-40 pb-28 md:pb-36 lg:pb-44"
      style={{
        background: '#FAF8F4',
        borderTop: '1px solid rgba(201,168,76,0.18)',
        borderBottom: '1px solid rgba(201,168,76,0.18)',
      }}
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Header ──────────────────────────────────────────── */}
        <div className="text-center mb-20 md:mb-28">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '28px'
            }}
          >
            <span style={{ display: 'inline-block', width: '32px', height: '1px', background: 'rgba(201,168,76,0.55)' }} />
            <span style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#B8922A',
              fontFamily: "'Inter', sans-serif"
            }}>
              The Process
            </span>
            <span style={{ display: 'inline-block', width: '32px', height: '1px', background: 'rgba(201,168,76,0.55)' }} />
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-[3.5rem] mb-8 leading-[1.12] px-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              letterSpacing: '-0.025em',
              color: '#1A1714'
            }}
          >
            From First Call to Check-In
            <br />
            <span className="block mt-2" style={{ color: '#1A1714' }}>Three Steps.</span>
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-base max-w-[460px] mx-auto leading-[1.85] px-4"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              color: '#6B6158'
            }}
          >
            No experience needed, no logistics to manage.
            We take care of everything so your only job is to enjoy.
          </motion.p>
        </div>

        {/* ── Steps Container ──────────────────────────────────── */}
        <div className="relative px-4 lg:px-8">

          {/* Connection Line — desktop */}
          <div className="absolute top-[4.5rem] left-0 right-0 h-[2px] hidden lg:block pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <line
                x1="16.7%"
                y1="1"
                x2="83.3%"
                y2="1"
                stroke="#C9A84C"
                strokeWidth="1"
                strokeDasharray="3 7"
                opacity="0.18"
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
                style={{ filter: 'drop-shadow(0 0 4px rgba(180, 140, 40, 0.4))' }}
              />
              <motion.circle
                cx={useTransform(lineProgress, [0, 0.33, 0.66, 1], ['16.7%', '50%', '83.3%', '83.3%'])}
                cy="1"
                r="3"
                fill="url(#beadGradient)"
                style={{
                  filter: 'drop-shadow(0 0 6px rgba(180, 140, 40, 0.7))',
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
                  <stop offset="40%" stopColor="#E8C97A" />
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
                y1="10%"
                x2="1"
                y2="90%"
                stroke="#C9A84C"
                strokeWidth="1"
                strokeDasharray="3 7"
                opacity="0.2"
              />
              <motion.line
                x1="1"
                y1="10%"
                x2="1"
                y2="90%"
                stroke="url(#lineGradientVertical)"
                strokeWidth="1.5"
                strokeDasharray="2000"
                strokeDashoffset={useTransform(lineProgress, [0, 1], [2000, 0])}
                style={{ filter: 'drop-shadow(0 0 4px rgba(180, 140, 40, 0.4))' }}
              />
              <motion.circle
                cx="1"
                cy={useTransform(lineProgress, [0, 0.33, 0.66, 1], ['10%', '50%', '90%', '90%'])}
                r="3"
                fill="url(#beadGradient)"
                style={{
                  filter: 'drop-shadow(0 0 6px rgba(180, 140, 40, 0.7))',
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 lg:gap-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const stepState = getStepState(index);
              const isHovered = hoveredStep === index;

              const nodeStyles = {
                inactive: {
                  borderColor: 'rgba(201,168,76,0.3)',
                  glowOpacity: 0,
                  iconColor: '#8F7040',
                  iconFilter: 'none',
                  boxShadow: '0 2px 20px rgba(0,0,0,0.08)'
                },
                active: {
                  borderColor: '#C9A84C',
                  glowOpacity: 0.35,
                  iconColor: '#C9A84C',
                  iconFilter: 'drop-shadow(0 0 8px rgba(198,156,82,0.5))',
                  boxShadow: '0 0 40px rgba(198,156,82,0.25), 0 6px 32px rgba(0,0,0,0.12), inset 0 0 30px rgba(198,156,82,0.12)'
                },
                completed: {
                  borderColor: '#B8922A',
                  glowOpacity: 0.15,
                  iconColor: '#B8922A',
                  iconFilter: 'drop-shadow(0 0 4px rgba(180,140,40,0.3))',
                  boxShadow: '0 0 20px rgba(180,140,40,0.15), 0 4px 24px rgba(0,0,0,0.1), inset 0 0 15px rgba(180,140,40,0.08)'
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
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                  className="flex flex-col items-center text-center cursor-pointer"
                >
                  {/* Node */}
                  <motion.div
                    className="relative w-36 h-36 mt-10 flex items-center justify-center"
                    animate={{ y: isHovered && stepState !== 'inactive' ? -6 : 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Ambient glow — soft gold halo on white */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{
                        opacity: (isHovered && stepState !== 'inactive') ? 0.5 : currentStyle.glowOpacity,
                        scale: (isHovered && stepState !== 'inactive') ? 1.18 : 1.12,
                      }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        background: 'radial-gradient(circle, rgba(198,156,82,0.35) 0%, rgba(198,156,82,0) 65%)',
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
                          ? '0 0 50px rgba(198,156,82,0.3), 0 8px 40px rgba(0,0,0,0.2), inset 0 0 35px rgba(198,156,82,0.18)'
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
                              ? 'drop-shadow(0 0 10px rgba(198,156,82,0.7))'
                              : currentStyle.iconFilter
                          }}
                          strokeWidth={1.5}
                        />
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Step text */}
                  <motion.div
                    className="px-4 lg:px-6 mt-8"
                    initial={{ opacity: 0, y: 14 }}
                    animate={shouldShow ? {
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
                    } : { opacity: 0, y: 14 }}
                  >
                    <h3
                      className="text-xl md:text-2xl lg:text-[1.65rem] mb-4 transition-all duration-500"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 500,
                        letterSpacing: '-0.015em',
                        lineHeight: 1.2,
                        color: stepState === 'active' ? '#1A1714' :
                               stepState === 'completed' ? '#2E2A26' : '#5A524A',
                      }}
                    >
                      {step.title}
                    </h3>

                    <p
                      className="text-sm leading-[1.9] max-w-[260px] mx-auto transition-all duration-500"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300,
                        color: stepState === 'active' ? '#4A4238' :
                               stepState === 'completed' ? '#5A524A' : '#8A7E74',
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
          initial={{ opacity: 0, y: 28 }}
          animate={currentStep >= 2 ? {
            opacity: 1,
            y: 0,
            transition: { delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
          } : { opacity: 0, y: 28 }}
          className="text-center mt-20 md:mt-28"
        >
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-14 py-5 overflow-hidden transition-all duration-500"
            style={{
              background: '#1A1714',
              color: '#FAF8F4',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '14px',
              letterSpacing: '0.06em',
              border: '1px solid #1A1714',
              boxShadow: '0 4px 24px rgba(0,0,0,0.14)',
            }}
          >
            <span className="relative z-10">Start Your Booking</span>
            <motion.div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, #2A2420 0%, #1A1714 100%)' }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>

          <p
            className="mt-5 text-xs tracking-[0.06em]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              color: '#8A7E74'
            }}
          >
            Most inquiries confirmed within the hour&nbsp;·&nbsp;White-glove support throughout your rental
          </p>
        </motion.div>

      </div>

      {/* Subtle warm ambient glow at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[48rem] h-[12rem] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)'
        }}
      />
    </section>
  );
}
