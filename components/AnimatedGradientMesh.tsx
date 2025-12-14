'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function AnimatedGradientMesh() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Sage Green blob */}
      <motion.div
        className="absolute w-[600px] h-[600px]"
        style={{
          background: 'radial-gradient(circle, #A8CABA 0%, transparent 70%)',
          filter: 'blur(80px)',
          top: '10%',
          left: '5%',
        }}
        animate={{
          x: ['-10%', '10%', '-10%'],
          y: ['-10%', '15%', '-10%'],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Sky Blue blob */}
      <motion.div
        className="absolute w-[500px] h-[500px]"
        style={{
          background: 'radial-gradient(circle, #B3E5FC 0%, transparent 70%)',
          filter: 'blur(80px)',
          top: '40%',
          right: '10%',
        }}
        animate={{
          x: ['15%', '-15%', '15%'],
          y: ['20%', '-5%', '20%'],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Warm Sand blob */}
      <motion.div
        className="absolute w-[700px] h-[700px]"
        style={{
          background: 'radial-gradient(circle, #F4E1D2 0%, transparent 70%)',
          filter: 'blur(100px)',
          bottom: '5%',
          left: '20%',
        }}
        animate={{
          x: ['-20%', '20%', '-20%'],
          y: ['10%', '-10%', '10%'],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Gentle Pink blob */}
      <motion.div
        className="absolute w-[450px] h-[450px]"
        style={{
          background: 'radial-gradient(circle, #FADADD 0%, transparent 70%)',
          filter: 'blur(70px)',
          bottom: '20%',
          right: '15%',
        }}
        animate={{
          x: ['10%', '-10%', '10%'],
          y: ['-15%', '15%', '-15%'],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Accent blob - moving diagonally */}
      <motion.div
        className="absolute w-[350px] h-[350px]"
        style={{
          background: 'radial-gradient(circle, #A8CABA 0%, transparent 65%)',
          filter: 'blur(60px)',
          top: '60%',
          left: '45%',
        }}
        animate={{
          x: ['-25%', '25%', '-25%'],
          y: ['-20%', '20%', '-20%'],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* White overlay for softer blending */}
      <div className="absolute inset-0 bg-white/70" />
    </div>
  );
}
