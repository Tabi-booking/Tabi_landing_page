'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[60] h-0.5 w-full origin-left bg-gradient-to-r from-coral to-coral-600"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
