'use client';

import { motion } from 'motion/react';
import { Star } from 'lucide-react';

interface ReviewCardProps {
  name: string;
  image: string;
  excerpt: string;
  stars: number;
  delay?: number;
}

export function ReviewCard({ name, image, excerpt, stars, delay = 0 }: ReviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-lg p-8 h-full flex flex-col transition-all duration-500 hover:-translate-y-1" style={{ background: '#FFFFFF', border: '1px solid #E8E2D8', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {[...Array(stars)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-[#B68B3C] text-[#B68B3C]" />
        ))}
      </div>

      {/* Excerpt */}
      <p className="leading-[1.75] mb-auto" style={{ color: '#2A2A22', fontFamily: 'Outfit, sans-serif', fontSize: '14.5px', lineHeight: '1.75', fontWeight: 300 }}>
        &ldquo;{excerpt}&rdquo;
      </p>

      {/* Reviewer Info */}
      <div className="flex items-center gap-4 mt-6 pt-6 border-t border-[#E8E2D8]">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover border-2 border-[#E8E2D8] ring-1 ring-[#C9A84C]/10"
        />
        <div className="flex flex-col gap-0.5">
          <div style={{ color: '#1A1A18', fontFamily: 'Outfit, sans-serif', fontSize: '14px', fontWeight: 500 }}>
            {name}
          </div>
          <div style={{ color: '#8A8070', fontFamily: 'Outfit, sans-serif', fontSize: '12px' }}>
            Verified Google Review
          </div>
        </div>
      </div>
    </motion.div>
  );
}
