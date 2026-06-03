'use client';

import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import type { SiteContent } from '../../i18n/types';
import { SectionContainer, SectionBody } from '../layout/SectionContainer';
import { SectionHeader } from '../ui/SectionHeader';
import { AnalyticsMockup } from '../mockups/AnalyticsMockup';
import { useMotionSafe } from '../../lib/motion';

interface MetricsProps {
  content: SiteContent['metrics'];
}

export function Metrics({ content }: MetricsProps) {
  const { fadeUp, stagger } = useMotionSafe();

  return (
    <SectionContainer id="metrics" className="bg-orange text-white">
      <SectionHeader label={content.label} title={content.title} subtitle={content.subtitle} inverted />

      <SectionBody>
        <div className="grid items-start gap-6 lg:grid-cols-5 lg:gap-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
            {content.cards.map((card, i) => (
              <motion.div key={card.label} {...fadeUp} transition={{ delay: i * stagger }}>
                <div className="rounded-xl border border-white/20 bg-white/10 p-5">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <p className="text-label-caps text-white/75">{card.label}</p>
                    <span className="flex shrink-0 items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-xs font-semibold">
                      <TrendingUp size={12} />
                      {card.change}
                    </span>
                  </div>
                  <p className="font-display text-2xl font-bold">{card.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div className="lg:col-span-3" {...fadeUp} transition={{ delay: 0.15 }}>
            <div className="rounded-2xl bg-white p-5 md:p-7">
              <p className="mb-4 text-sm font-semibold text-on-surface">{content.dashboardTitle}</p>
              <AnalyticsMockup />
            </div>
          </motion.div>
        </div>
      </SectionBody>
    </SectionContainer>
  );
}
