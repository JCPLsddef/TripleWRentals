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
      className="group relative transition-all duration-500 hover:-translate-y-1" style={{ background: '#FFFFFF', border: '1px solid #E8E2D8', borderRadius: '8px', padding: '32px', display: 'flex', flexDirection: 'column', height: '100%', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {[...Array(stars)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-[#B68B3C] text-[#B68B3C]" />
        ))}
      </div>

      {/* Excerpt */}
      <p style={{ color: '#2A2A22', fontFamily: 'Outfit, sans-serif', fontSize: '15px', lineHeight: 1.75, fontWeight: 300, marginBottom: 'auto', paddingBottom: '24px' }}>
        &ldquo;{excerpt}&rdquo;
      </p>

      {/* Reviewer Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '20px', borderTop: '1px solid #EDE8E0', marginTop: 'auto' }}>
        <img
          src={image}
          alt={name}
          style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #E8E2D8', flexShrink: 0 }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ color: '#1A1A18', fontFamily: 'Outfit, sans-serif', fontSize: '14px', fontWeight: 500 }}>
            {name}
          </div>
          <div style={{ color: '#8A8070', fontFamily: 'Outfit, sans-serif', fontSize: '13px' }}>
            Verified Google Review
          </div>
        </div>
      </div>
    </motion.div>
  );
}
