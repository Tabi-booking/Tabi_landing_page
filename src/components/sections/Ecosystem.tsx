'use client';

import { motion } from 'framer-motion';
import type { SiteContent } from '../../i18n/types';
import { SectionContainer, SectionBody } from '../layout/SectionContainer';
import { SectionHeader } from '../ui/SectionHeader';
import { getIcon } from '../../lib/icons';
import { useMotionSafe } from '../../lib/motion';
import { cn } from '../../lib/utils';

interface EcosystemProps {
  content: SiteContent['ecosystem'];
}

const cardStyles: Record<string, string> = {
  'tabi-os': 'bg-primary text-on-primary border-primary',
  'consumer-app': 'bg-white border-orange/20',
  analytics: 'bg-white border-orange/15',
  'booking-plugin': 'bg-orange-light border-orange/20',
};

export function Ecosystem({ content }: EcosystemProps) {
  const { fadeUp, stagger } = useMotionSafe();

  return (
    <SectionContainer id="ecosystem" className="bg-white">
      <SectionHeader label={content.label} title={content.title} subtitle={content.subtitle} />

      <SectionBody>
        <div className="grid gap-5 sm:grid-cols-2">
          {content.cards.map((card, i) => {
            const Icon = getIcon(card.icon);
            const isDark = card.id === 'tabi-os';

            return (
              <motion.div
                key={card.id}
                className={cn('rounded-2xl border p-6 md:p-7', cardStyles[card.id])}
                {...fadeUp}
                transition={{ delay: i * stagger }}
              >
                <div
                  className={cn(
                    'mb-4 flex h-11 w-11 items-center justify-center rounded-xl',
                    isDark ? 'bg-white/15' : 'bg-orange/10',
                  )}
                >
                  <Icon size={22} className={isDark ? 'text-primary-fixed' : 'text-orange'} strokeWidth={2} />
                </div>
                <h3 className={cn('font-display mb-1 text-lg font-semibold', isDark ? 'text-white' : 'text-on-surface')}>
                  {card.title}
                </h3>
                <p className={cn('mb-4 text-sm leading-relaxed', isDark ? 'text-on-primary-container' : 'text-on-surface-variant')}>
                  {card.subtitle}
                </p>
                <ul className="space-y-2">
                  {card.features.map((feature) => (
                    <li
                      key={feature}
                      className={cn(
                        'flex items-start gap-2.5 text-sm leading-relaxed',
                        isDark ? 'text-on-primary-container' : 'text-on-surface-variant',
                      )}
                    >
                      <span className={cn('mt-2 h-1.5 w-1.5 shrink-0 rounded-full', isDark ? 'bg-primary-fixed' : 'bg-orange')} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </SectionBody>
    </SectionContainer>
  );
}
