'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SiteContent } from '../../i18n/types';
import { SectionContainer, SectionBody } from '../layout/SectionContainer';
import { SectionHeader } from '../ui/SectionHeader';
import { SectionPanel } from '../ui/SectionPanel';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { useMotionSafe } from '../../lib/motion';

interface ForRestaurantsProps {
  content: SiteContent['forRestaurants'];
}

export function ForRestaurants({ content }: ForRestaurantsProps) {
  const [activeTool, setActiveTool] = useState(0);
  const { fadeUp, stagger } = useMotionSafe();
  const tool = content.tools[activeTool];

  return (
    <SectionContainer id="for-restaurants">
      <SectionHeader label={content.label} title={content.title} subtitle={content.subtitle || undefined} />

      <SectionBody>
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          {content.stats.map((stat, i) => (
            <motion.div key={stat.label} {...fadeUp} transition={{ delay: i * stagger }} className="stat-chip text-center">
              <p className="font-display text-xl font-semibold text-blue">{stat.value}</p>
              <p className="mt-0.5 text-xs text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp}>
          <SectionPanel variant="blue" className="mx-auto max-w-2xl">
            <div className="relative mb-5 flex flex-wrap justify-center gap-2">
              {content.tools.map((t, i) => (
                <button
                  key={t.title}
                  type="button"
                  onClick={() => setActiveTool(i)}
                  className={cn(
                    'rounded-lg px-4 py-2 text-sm font-medium transition-all',
                    activeTool === i
                      ? 'bg-blue text-white chip-toggle-active-blue'
                      : 'border border-gray-200/80 bg-white text-gray-500 hover:border-blue/20 hover:text-blue',
                  )}
                >
                  {t.title}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {tool && (
                <motion.div
                  key={activeTool}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="relative rounded-xl border border-white/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm"
                >
                  <p className="mb-4 text-sm text-gray-600">{tool.description}</p>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {tool.features.map((f) => (
                      <span
                        key={f}
                        className="rounded-full border border-blue/10 bg-blue/5 px-3 py-1 text-xs font-medium text-blue-700"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  <Button href="#contact" variant="blue-outline" className="w-full sm:w-auto">
                    {tool.cta}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </SectionPanel>
        </motion.div>
      </SectionBody>
    </SectionContainer>
  );
}
