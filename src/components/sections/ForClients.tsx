'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { SiteContent } from '../../i18n/types';
import { SectionContainer, SectionBody } from '../layout/SectionContainer';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { getIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';
import { useMotionSafe } from '../../lib/motion';

interface ForClientsProps {
  content: SiteContent['forClients'];
}

export function ForClients({ content }: ForClientsProps) {
  const [activeFeature, setActiveFeature] = useState(0);
  const { fadeUp, stagger } = useMotionSafe();

  return (
    <SectionContainer id="for-clients">
      <SectionHeader label={content.label} title={content.title} subtitle={content.subtitle || undefined} />

      <SectionBody>
        <div className="grid gap-3 sm:grid-cols-2">
          {content.features.map((item, i) => {
            const Icon = getIcon(item.icon);
            const isActive = activeFeature === i;
            return (
              <motion.button
                key={item.title}
                type="button"
                {...fadeUp}
                transition={{ delay: i * stagger }}
                onClick={() => setActiveFeature(i)}
                className={cn(
                  'tabi-card tabi-card-elevated interactive-card w-full p-4 text-left',
                  isActive && 'tabi-card-featured border-orange/35 bg-gradient-to-br from-orange/5 to-white',
                )}
                data-active={isActive}
              >
                <div className="flex items-start gap-3">
                  <div className={cn('icon-chip h-10 w-10 shrink-0', isActive && 'scale-110 transition-transform')}>
                    <Icon size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                    <p className={cn('mt-1 text-xs text-gray-500 transition-opacity', !isActive && 'opacity-70')}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="tabi-card tabi-card-elevated mt-8 flex flex-col items-start justify-between gap-4 border-orange/10 bg-gradient-to-r from-orange/5 via-white to-blue/5 p-5 sm:flex-row sm:items-center">
          <div>
            <p className="font-medium text-gray-900">{content.appTitle}</p>
            <p className="text-xs text-gray-400">{content.appRating}</p>
          </div>
          <Button href="#demo" variant="gradient" size="md" className="shrink-0">
            {content.appCta}
            <ArrowRight size={14} />
          </Button>
        </div>
      </SectionBody>
    </SectionContainer>
  );
}
