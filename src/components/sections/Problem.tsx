'use client';

import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import type { SiteContent } from '../../i18n/types';
import { SectionContainer, SectionBody } from '../layout/SectionContainer';
import { SectionHeader } from '../ui/SectionHeader';
import { useMotionSafe } from '../../lib/motion';

interface ProblemProps {
  content: SiteContent['problem'];
}

export function Problem({ content }: ProblemProps) {
  const { fadeUp } = useMotionSafe();

  return (
    <SectionContainer id="problem" className="bg-orange-light">
      <SectionHeader label={content.label} title={content.title} />

      <SectionBody>
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-8">
          <motion.div {...fadeUp}>
            <div className="h-full rounded-2xl border border-error/20 bg-white p-7 md:p-8">
              <h3 className="font-display mb-5 flex items-center gap-3 text-lg font-semibold text-error">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-error-container">
                  <X size={16} />
                </span>
                {content.traditional.title}
              </h3>
              <ul className="space-y-3.5">
                {content.traditional.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-on-surface-variant">
                    <X size={16} className="mt-0.5 shrink-0 text-error" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
            <div className="h-full rounded-2xl border-2 border-orange bg-white p-7 md:p-8">
              <h3 className="font-display mb-5 flex items-center gap-3 text-lg font-semibold text-orange">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-light">
                  <Check size={16} />
                </span>
                {content.tabi.title}
              </h3>
              <ul className="space-y-3.5">
                {content.tabi.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-on-surface">
                    <Check size={16} className="mt-0.5 shrink-0 text-orange" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </SectionBody>
    </SectionContainer>
  );
}
