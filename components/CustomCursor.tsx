'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!mounted) return null;

  // Don't show on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        <div className="w-4 h-4 -translate-x-1/2 -translate-y-1/2 bg-white rounded-tl-[0.5rem] rounded-tr-sm rounded-bl-sm rounded-br-[0.5rem]" />
      </motion.div>

      {/* Trailing circle */}
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        animate={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }}
      >
        <div
          className={`w-8 h-8 border-2 transition-all duration-300 ${
            isHovering
              ? 'border-[#A8CABA] scale-150'
              : 'border-gray-400'
          } rounded-tl-[1rem] rounded-tr-sm rounded-bl-sm rounded-br-[1rem]`}
        />
      </motion.div>
    </>
  );
}
