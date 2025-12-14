'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FloatingOrbProps {
  size?: number;
  color: string;
  delay?: number;
  duration?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export function FloatingOrb({
  size = 400,
  color,
  delay = 0,
  duration = 8,
  top,
  left,
  right,
  bottom,
}: FloatingOrbProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      className="absolute rounded-full blur-3xl opacity-30 pointer-events-none"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}, transparent)`,
        top,
        left,
        right,
        bottom,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 20, 0],
        scale: [1, 1.1, 1],
        rotate: [0, 5, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}
