import { useReducedMotion } from 'framer-motion';

export const easeOut = [0.22, 1, 0.36, 1] as const;

export function useMotionSafe() {
  const reduced = useReducedMotion();

  return {
    reduced: !!reduced,
    fadeUp: reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-80px' },
          transition: { duration: 0.5, ease: easeOut },
        },
    stagger: reduced ? 0 : 0.08,
    heroContainer: reduced
      ? {}
      : {
          initial: 'hidden',
          animate: 'visible',
          variants: {
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.12 } },
          },
        },
    heroItem: reduced
      ? {}
      : {
          variants: {
            hidden: { opacity: 0, y: 22 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.55, ease: easeOut },
            },
          },
        },
    popIn: reduced
      ? {}
      : {
          initial: { opacity: 0, scale: 0.94 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true, margin: '-60px' },
          transition: { type: 'spring', stiffness: 260, damping: 22 },
        },
    float: reduced
      ? {}
      : {
          animate: { y: [0, -8, 0] },
          transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        },
  };
}
