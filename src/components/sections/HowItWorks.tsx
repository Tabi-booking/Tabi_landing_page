'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SiteContent } from '../../i18n/types';
import { SectionContainer, SectionBody } from '../layout/SectionContainer';
import { SectionHeader } from '../ui/SectionHeader';
import { SectionPanel } from '../ui/SectionPanel';
import { AudienceButtons } from '../ui/Button';
import { cn } from '../../lib/utils';
import { useMotionSafe } from '../../lib/motion';

interface HowItWorksProps {
  content: SiteContent['howItWorks'];
}

export function HowItWorks({ content }: HowItWorksProps) {
  const [activeStep, setActiveStep] = useState(0);
  const { fadeUp } = useMotionSafe();
  const step = content.steps[activeStep];

  return (
    <SectionContainer id="how-it-works" className="bg-white">
      <SectionHeader label={content.label} title={content.title} subtitle={content.subtitle || undefined} />

      <SectionBody>
        <motion.div {...fadeUp}>
          <SectionPanel variant="orange" className="mx-auto max-w-2xl">
            <div className="relative mb-6 flex flex-wrap justify-center gap-2">
              {content.steps.map((s, i) => (
                <button
                  key={s.number}
                  type="button"
                  onClick={() => setActiveStep(i)}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-medium transition-all',
                    activeStep === i
                      ? 'bg-orange text-white chip-toggle-active'
                      : 'border border-gray-200/80 bg-white text-gray-500 hover:border-orange/20 hover:text-orange',
                  )}
                >
                  <span className="mr-1.5 text-xs opacity-70">{s.number}</span>
                  {s.title}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="relative overflow-hidden rounded-xl border border-white/80 bg-white/90 p-6 text-center shadow-sm backdrop-blur-sm"
              >
                <span className="pointer-events-none absolute -right-2 -top-4 font-display text-7xl font-bold text-orange/10">
                  {step?.number}
                </span>
                <p className="relative mb-2 text-xs font-semibold text-orange">{step?.number}</p>
                <h3 className="relative mb-2 font-medium text-gray-900">{step?.title}</h3>
                <p className="relative text-sm text-gray-500">{step?.description}</p>
              </motion.div>
            </AnimatePresence>
          </SectionPanel>

          <div className="mt-8 flex justify-center">
            <AudienceButtons
              ctas={{ client: content.ctaClient, restaurant: content.ctaRestaurant }}
              className="max-w-sm"
            />
          </div>
        </motion.div>
      </SectionBody>
    </SectionContainer>
  );
}
