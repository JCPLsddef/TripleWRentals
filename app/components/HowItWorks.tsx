'use client'

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { Phone, Calendar, Key } from 'lucide-react';

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.6", "end 0.3"]
  });

  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const steps = [
    {
      number: '01',
      icon: Phone,
      title: 'Call or Text Us',
      description: "Tell us your dates, occasion, and group size. We'll find your perfect RV and confirm availability — most bookings sorted within the hour."
    },
    {
      number: '02',
      icon: Calendar,
      title: 'We Handle Everything',
      description: 'Delivery, full setup, walkthrough, and insurance are all arranged for you. Every detail is taken care of before you arrive.'
    },
    {
      number: '03',
      icon: Key,
      title: 'Arrive & Enjoy',
      description: 'Your RV is on-site, fully prepped, and ready to go. Step inside, make yourself at home, and let the experience begin.'
    }
  ];

  // Sequential step activation based on scroll
  useEffect(() => {
    const unsubscribe = lineProgress.on('change', (latest) => {
      if (latest < 0.35) {
        setCurrentStep(0);
      } else if (latest < 0.65) {
        setCurrentStep(1);
      } else {
        setCurrentStep(2);
      }
    });
    return () => unsubscribe();
  }, [lineProgress]);

  // Premium "stomp" animation — weighted, confident, precise
  const stompAnimation = {
    hidden: {
      opacity: 0,
      scale: 0.7,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        scale: {
          type: "spring",
          damping: 20,
          stiffness: 300,
          restDelta: 0.001
        }
      }
    }
  };

  const getStepState = (index: number) => {
    if (currentStep < index) return 'inactive';
    if (currentStep === index) return 'active';
    return 'completed';
  };

  return (
    <section ref={sectionRef} id="how" className="relative px-6 pt-24 md:pt-32 lg:pt-40 pb-40 md:pb-52 lg:pb-64" style={{ background: '#0F0D0B' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-24 md:mb-32">

          {/* Eyebrow — centered flex-row with decorative lines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
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
            <span style={{ display: 'inline-block', width: '32px', height: '1px', background: 'rgba(201,168,76,0.45)' }} />
            <span style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#C9A84C',
              fontFamily: "'Inter', sans-serif"
            }}>
              The Process
            </span>
            <span style={{ display: 'inline-block', width: '32px', height: '1px', background: 'rgba(201,168,76,0.45)' }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#F3EDE3] text-4xl md:text-5xl lg:text-[3.5rem] mb-8 leading-[1.15] px-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, letterSpacing: '-0.02em' }}
          >
            From First Call to Check-In
            <br />
            <span className="block mt-2">Three Steps.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#C8BCA8] text-base max-w-[460px] mx-auto leading-[1.85] px-4"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
          >
            No experience needed, no logistics to manage.
            We take care of everything so your only job is to enjoy.
          </motion.p>
        </div>

        {/* Steps Container */}
        <div className="relative max-w-6xl mx-auto px-4">
          {/* Connection Line System — desktop */}
          <div className="absolute top-[4.5rem] left-0 right-0 h-[2px] hidden lg:block pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <line
                x1="15%"
                y1="1"
                x2="85%"
                y2="1"
                stroke="#8F6A2E"
                strokeWidth="1"
                strokeDasharray="3 6"
                opacity="0.25"
              />
              <motion.line
                x1="15%"
                y1="1"
                x2="85%"
                y2="1"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                strokeDasharray="1200"
                strokeDashoffset={useTransform(lineProgress, [0, 1], [1200, 0])}
                style={{
                  filter: 'drop-shadow(0 0 6px rgba(198, 156, 82, 0.5))'
                }}
              />
              <motion.circle
                cx={useTransform(lineProgress, [0, 0.33, 0.66, 1], ['15%', '50%', '85%', '85%'])}
                cy="1"
                r="3"
                fill="url(#beadGradient)"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(198, 156, 82, 0.8))',
                  opacity: useTransform(lineProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0])
                }}
              />
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8F6A2E" />
                  <stop offset="50%" stopColor="#C69C52" />
                  <stop offset="100%" stopColor="#B68B3C" />
                </linearGradient>
                <radialGradient id="beadGradient">
                  <stop offset="0%" stopColor="#F3EDE3" />
                  <stop offset="50%" stopColor="#C69C52" />
                  <stop offset="100%" stopColor="#B68B3C" />
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
                stroke="#8F6A2E"
                strokeWidth="1"
                strokeDasharray="3 6"
                opacity="0.25"
              />
              <motion.line
                x1="1"
                y1="10%"
                x2="1"
                y2="90%"
                stroke="url(#lineGradientVertical)"
                strokeWidth="2"
                strokeDasharray="2000"
                strokeDashoffset={useTransform(lineProgress, [0, 1], [2000, 0])}
                style={{
                  filter: 'drop-shadow(0 0 6px rgba(198, 156, 82, 0.5))'
                }}
              />
              <motion.circle
                cx="1"
                cy={useTransform(lineProgress, [0, 0.33, 0.66, 1], ['10%', '50%', '90%', '90%'])}
                r="3"
                fill="url(#beadGradient)"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(198, 156, 82, 0.8))',
                  opacity: useTransform(lineProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0])
                }}
              />
              <defs>
                <linearGradient id="lineGradientVertical" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8F6A2E" />
                  <stop offset="50%" stopColor="#C69C52" />
                  <stop offset="100%" stopColor="#B68B3C" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 lg:gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const stepState = getStepState(index);
              const isHovered = hoveredStep === index;

              const nodeStyles = {
                inactive: {
                  borderColor: '#8F6A2E',
                  glowOpacity: 0,
                  iconColor: '#8F6A2E',
                  iconFilter: 'none',
                  scale: 1,
                  boxShadow: '0 0 0px rgba(198, 156, 82, 0)'
                },
                active: {
                  borderColor: '#C69C52',
                  glowOpacity: 0.5,
                  iconColor: '#C69C52',
                  iconFilter: 'drop-shadow(0 0 10px rgba(198, 156, 82, 0.6))',
                  scale: 1,
                  boxShadow: '0 0 40px rgba(198, 156, 82, 0.4), inset 0 0 30px rgba(198, 156, 82, 0.15)'
                },
                completed: {
                  borderColor: '#B68B3C',
                  glowOpacity: 0.2,
                  iconColor: '#B68B3C',
                  iconFilter: 'drop-shadow(0 0 4px rgba(182, 139, 60, 0.3))',
                  scale: 1,
                  boxShadow: '0 0 20px rgba(182, 139, 60, 0.2), inset 0 0 15px rgba(182, 139, 60, 0.08)'
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
                  className="relative flex flex-col items-center text-center group cursor-pointer"
                >
                  {/* Node */}
                  <motion.div
                    className="relative w-36 h-36 mb-10 flex items-center justify-content-center"
                    animate={{
                      y: isHovered && stepState !== 'inactive' ? -6 : 0,
                    }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Outer ambient glow */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{
                        opacity: (isHovered && stepState !== 'inactive') ? 0.6 : currentStyle.glowOpacity,
                        scale: (isHovered && stepState !== 'inactive') ? 1.15 : 1.1,
                      }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        background: 'radial-gradient(circle, rgba(198, 156, 82, 0.4) 0%, rgba(198, 156, 82, 0) 65%)',
                        filter: 'blur(24px)'
                      }}
                    />

                    {/* Step number */}
                    <div
                      className="absolute -top-9 left-1/2 -translate-x-1/2 text-xs tracking-[0.2em] transition-all duration-500"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300,
                        color: stepState === 'active' ? '#C69C52' : '#8F6A2E',
                        opacity: stepState === 'inactive' ? 0.4 : 0.7
                      }}
                    >
                      {step.number}
                    </div>

                    {/* Inner circle */}
                    <motion.div
                      className="relative w-full h-full rounded-full border-[2px] flex items-center justify-center"
                      style={{
                        background: 'radial-gradient(circle at 30% 30%, rgba(21, 18, 15, 0.95) 0%, rgba(15, 13, 11, 0.98) 100%)',
                      }}
                      animate={{
                        borderColor: isHovered && stepState !== 'inactive' ? '#C69C52' : currentStyle.borderColor,
                        boxShadow: isHovered && stepState !== 'inactive'
                          ? '0 0 50px rgba(198, 156, 82, 0.5), inset 0 0 35px rgba(198, 156, 82, 0.2)'
                          : currentStyle.boxShadow,
                      }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <motion.div
                        animate={{
                          scale: (isHovered && stepState !== 'inactive') ? 1.08 : 1,
                        }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Icon
                          className="w-12 h-12 transition-all duration-500"
                          style={{
                            color: isHovered && stepState !== 'inactive' ? '#C69C52' : currentStyle.iconColor,
                            filter: isHovered && stepState !== 'inactive'
                              ? 'drop-shadow(0 0 12px rgba(198, 156, 82, 0.7))'
                              : currentStyle.iconFilter
                          }}
                          strokeWidth={1.5}
                        />
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    className="px-3 lg:px-4"
                    initial={{ opacity: 0, y: 15 }}
                    animate={shouldShow ? {
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: 0.3,
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1]
                      }
                    } : { opacity: 0, y: 15 }}
                  >
                    <h3
                      className="text-xl md:text-2xl lg:text-[1.75rem] mb-5 transition-all duration-500"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 400,
                        letterSpacing: '-0.01em',
                        lineHeight: 1.2,
                        color: stepState === 'active' ? '#F3EDE3' :
                               stepState === 'completed' ? '#E5DDD0' : '#C4B8A8',
                        textShadow: stepState === 'active' ? '0 0 25px rgba(198, 156, 82, 0.15)' : 'none',
                      }}
                    >
                      {step.title}
                    </h3>

                    <p
                      className="text-sm leading-[1.9] max-w-[260px] mx-auto transition-all duration-500"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300,
                        color: stepState === 'active' ? '#C8BCA8' :
                               stepState === 'completed' ? '#B8AC98' : '#A09488',
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={currentStep >= 2 ? {
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.6,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1]
            }
          } : { opacity: 0, y: 30 }}
          className="text-center mt-20 md:mt-28"
        >
          <motion.button
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-14 py-6 border-[2px] border-[#B68B3C] text-[#F3EDE3] text-base tracking-[0.05em] transition-all duration-500 hover:border-[#C69C52] hover:shadow-[0_0_40px_rgba(198,156,82,0.35)] overflow-hidden"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
          >
            <span className="relative z-10">Start Your Booking</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#8F6A2E] to-[#B68B3C]"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.12 }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>

          <p
            className="mt-6 text-[#C8BCA8] text-xs tracking-[0.06em]"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
          >
            Most inquiries confirmed within the hour &nbsp;·&nbsp; White-glove support throughout your rental
          </p>
        </motion.div>
      </div>

      {/* Ambient background effects */}
      <div className="absolute top-20 left-1/4 w-[32rem] h-[32rem] bg-[#B68B3C] rounded-full opacity-[0.02] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[32rem] h-[32rem] bg-[#C69C52] rounded-full opacity-[0.025] blur-[140px] pointer-events-none" />
    </section>
  );
}
