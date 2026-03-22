'use client'

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Phone, Calendar, Key } from 'lucide-react';

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.6", "end 0.3"]
  });

  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const icons = [Phone, Calendar, Key];

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
      className="relative px-6 py-24 md:py-32 lg:py-40"
      style={{ background: '#0F0D0B' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Steps Container — full width on desktop, centered stack on mobile */}
        <div className="relative px-4 lg:px-8">

          {/* Connection Line — desktop only */}
          <div className="absolute top-[4.5rem] left-0 right-0 h-[2px] hidden lg:block pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <line
                x1="16.7%"
                y1="1"
                x2="83.3%"
                y2="1"
                stroke="#8F6A2E"
                strokeWidth="1"
                strokeDasharray="3 6"
                opacity="0.25"
              />
              <motion.line
                x1="16.7%"
                y1="1"
                x2="83.3%"
                y2="1"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                strokeDasharray="1200"
                strokeDashoffset={useTransform(lineProgress, [0, 1], [1200, 0])}
                style={{ filter: 'drop-shadow(0 0 6px rgba(198, 156, 82, 0.5))' }}
              />
              <motion.circle
                cx={useTransform(lineProgress, [0, 0.33, 0.66, 1], ['16.7%', '50%', '83.3%', '83.3%'])}
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
                style={{ filter: 'drop-shadow(0 0 6px rgba(198, 156, 82, 0.5))' }}
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

          {/* Icons Grid — equal thirds on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 lg:gap-0">
            {icons.map((Icon, index) => {
              const stepState = getStepState(index);
              const isHovered = hoveredStep === index;

              const nodeStyles = {
                inactive: {
                  borderColor: '#8F6A2E',
                  glowOpacity: 0,
                  iconColor: '#8F6A2E',
                  iconFilter: 'none',
                  boxShadow: '0 0 0px rgba(198, 156, 82, 0)'
                },
                active: {
                  borderColor: '#C69C52',
                  glowOpacity: 0.5,
                  iconColor: '#C69C52',
                  iconFilter: 'drop-shadow(0 0 10px rgba(198, 156, 82, 0.6))',
                  boxShadow: '0 0 40px rgba(198, 156, 82, 0.4), inset 0 0 30px rgba(198, 156, 82, 0.15)'
                },
                completed: {
                  borderColor: '#B68B3C',
                  glowOpacity: 0.2,
                  iconColor: '#B68B3C',
                  iconFilter: 'drop-shadow(0 0 4px rgba(182, 139, 60, 0.3))',
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
                  className="flex items-center justify-center cursor-pointer"
                >
                  {/* Node */}
                  <motion.div
                    className="relative w-36 h-36 flex items-center justify-center"
                    animate={{ y: isHovered && stepState !== 'inactive' ? -6 : 0 }}
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
                        animate={{ scale: (isHovered && stepState !== 'inactive') ? 1.08 : 1 }}
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
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Ambient background effects */}
      <div className="absolute top-20 left-1/4 w-[32rem] h-[32rem] bg-[#B68B3C] rounded-full opacity-[0.02] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[32rem] h-[32rem] bg-[#C69C52] rounded-full opacity-[0.025] blur-[140px] pointer-events-none" />
    </section>
  );
}
