'use client';

import { motion } from 'framer-motion';
import type { SiteContent } from '../../i18n/types';
import { SectionContainer } from '../layout/SectionContainer';
import { getIcon } from '../../lib/icons';
import { useMotionSafe } from '../../lib/motion';

interface HeroHighlightsProps {
  highlights: SiteContent['hero']['highlights'];
}

export function HeroHighlights({ highlights }: HeroHighlightsProps) {
  const { fadeUp, stagger } = useMotionSafe();

  return (
    <SectionContainer className="section-muted py-8 md:py-10">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((item, i) => {
          const Icon = getIcon(item.icon);
          return (
            <motion.div key={item.title} {...fadeUp} transition={{ delay: i * stagger }}>
              <div className="tabi-card interactive-card group flex items-center gap-3 p-4">
                <div className="icon-chip h-9 w-9 shrink-0 transition-transform group-hover:scale-110">
                  <Icon size={16} strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-400">{item.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionContainer>
  );
}
