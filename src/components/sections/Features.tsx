'use client';

import { motion } from 'framer-motion';
import type { SiteContent } from '../../i18n/types';
import { SectionContainer, SectionBody } from '../layout/SectionContainer';
import { SectionHeader } from '../ui/SectionHeader';
import { getIcon } from '../../lib/icons';
import { useMotionSafe } from '../../lib/motion';

interface FeaturesProps {
  content: SiteContent['features'];
}

export function Features({ content }: FeaturesProps) {
  const { fadeUp, stagger } = useMotionSafe();

  return (
    <SectionContainer id="features" className="bg-orange-light">
      <SectionHeader label={content.label} title={content.title} subtitle={content.subtitle} />

      <SectionBody>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, i) => {
            const Icon = getIcon(item.icon);
            return (
              <motion.div key={item.title} {...fadeUp} transition={{ delay: i * stagger }}>
                <div className="h-full rounded-2xl border border-orange/10 bg-white p-5 md:p-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-orange/10">
                    <Icon size={18} className="text-orange" strokeWidth={2} />
                  </div>
                  <h3 className="mb-1.5 text-base font-semibold text-on-surface">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-on-surface-variant">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </SectionBody>
    </SectionContainer>
  );
}
