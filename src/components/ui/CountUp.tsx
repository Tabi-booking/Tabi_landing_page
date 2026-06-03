'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

interface ParsedStat {
  end: number;
  format: (value: number) => string;
}

function parseStatValue(value: string): ParsedStat {
  if (value.toLowerCase().includes('k')) {
    const end = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
    const hasPlus = value.includes('+');
    return {
      end,
      format: (n) => `${Math.round(n)}k${hasPlus ? '+' : ''}`,
    };
  }

  if (value.includes('.')) {
    const end = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
    const suffix = value.replace(/[\d.]/g, '');
    return {
      end,
      format: (n) => `${n.toFixed(1)}${suffix}`,
    };
  }

  const end = parseInt(value.replace(/\D/g, ''), 10) || 0;
  const suffix = value.replace(/\d/g, '');
  return {
    end,
    format: (n) => `${Math.round(n)}${suffix}`,
  };
}

interface CountUpProps {
  value: string;
  className?: string;
  /** Anima al montar sin esperar scroll (útil en hero) */
  immediate?: boolean;
}

export function CountUp({ value, className, immediate = false }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [text, setText] = useState(value);
  const shouldAnimate = immediate || inView;

  useEffect(() => {
    const parsed = parseStatValue(value);

    if (reduced) {
      setText(value);
      return;
    }

    if (!shouldAnimate) return;

    setText(parsed.format(0));
    const controls = animate(0, parsed.end, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setText(parsed.format(v)),
      onComplete: () => setText(value),
    });

    return () => controls.stop();
  }, [shouldAnimate, reduced, value]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
