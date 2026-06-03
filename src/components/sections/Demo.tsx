'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import type { SiteContent } from '../../i18n/types';
import { SectionContainer, SectionBody } from '../layout/SectionContainer';
import { SectionHeader } from '../ui/SectionHeader';
import { SectionPanel } from '../ui/SectionPanel';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { useMotionSafe } from '../../lib/motion';

interface DemoProps {
  content: SiteContent['demo'];
}

export function Demo({ content }: DemoProps) {
  const [activeFeatures, setActiveFeatures] = useState<number[]>([0]);
  const { fadeUp, stagger } = useMotionSafe();

  function toggleFeature(index: number) {
    setActiveFeatures((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  }

  return (
    <SectionContainer id="demo" className="bg-white">
      <SectionHeader label={content.label} title={content.title} subtitle={content.subtitle || undefined} />

      <SectionBody>
        <motion.div className="mx-auto max-w-2xl" {...fadeUp}>
          <SectionPanel variant="orange" className="text-center">
            <div className="relative mb-8 flex flex-wrap justify-center gap-2">
              {content.features.map((f, i) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => toggleFeature(i)}
                  className={cn(
                    'rounded-full px-3.5 py-1.5 text-xs font-medium transition-all',
                    activeFeatures.includes(i)
                      ? 'bg-orange text-white chip-toggle-active'
                      : 'border border-gray-200/80 bg-white text-gray-500 hover:border-orange/20 hover:text-orange',
                  )}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="relative mb-8 inline-flex items-center gap-2 rounded-full border border-gray-100 bg-white/80 px-4 py-2 text-sm text-gray-600 shadow-sm">
              <Globe size={16} className="text-orange" />
              <span className="font-medium">{content.webLabel}</span>
              <span className="text-gray-300">·</span>
              <span className="text-xs text-gray-500">{content.webDesc}</span>
            </div>

            <div className="relative flex flex-wrap justify-center gap-3">
              <Button href="#for-clients" variant="gradient" size="md">{content.ctaWeb}</Button>
              <Button href="#contact" variant="blue-outline" size="md">{content.ctaVideo}</Button>
            </div>
          </SectionPanel>
        </motion.div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {content.stats.map((stat, i) => (
            <motion.div key={stat.label} {...fadeUp} transition={{ delay: i * stagger }} className="stat-chip text-center">
              <p className="font-display text-lg font-semibold text-gray-900">{stat.value}</p>
              <p className="mt-0.5 text-xs text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </SectionBody>
    </SectionContainer>
  );
}
