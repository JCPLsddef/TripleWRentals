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
      className="group relative bg-gradient-to-br from-[#1A1410] to-[#15120F] border border-[#2A2520]/60 rounded-lg p-8 h-full flex flex-col hover:border-[#B68B3C]/40 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(182,139,60,0.12),inset_0_1px_0_rgba(182,139,60,0.08)] hover:-translate-y-1"
    >
      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {[...Array(stars)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-[#B68B3C] text-[#B68B3C]" />
        ))}
      </div>

      {/* Excerpt */}
      <p className="text-[#E0D6C6] leading-[1.75] mb-auto" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14.5px', lineHeight: '1.75', fontWeight: 300 }}>
        &ldquo;{excerpt}&rdquo;
      </p>

      {/* Reviewer Info */}
      <div className="flex items-center gap-4 mt-6 pt-6 border-t border-[#2A2520]/40">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover border-2 border-[#2A2520]/60 ring-1 ring-[#B68B3C]/10"
        />
        <div className="flex flex-col gap-0.5">
          <div className="text-[#F3EDE3]" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', fontWeight: 500 }}>
            {name}
          </div>
          <div className="text-[#7A6E60]" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '12px' }}>
            Verified Google Review
          </div>
        </div>
      </div>
    </motion.div>
  );
}
