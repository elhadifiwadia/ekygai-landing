'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export function GlassCard({ children, className = '', delay = 0, hover = true }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      whileHover={hover ? { y: -8, scale: 1.02 } : {}}
      className={`backdrop-blur-xl bg-white/40 border border-white/60 rounded-3xl shadow-[0_8px_32px_0_rgba(168,202,186,0.15)] hover:shadow-[0_12px_48px_0_rgba(168,202,186,0.25)] transition-all duration-500 ${className}`}
    >
      {children}
    </motion.div>
  );
}
