'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { SiteContent } from '../../i18n/types';
import { SectionContainer } from '../layout/SectionContainer';
import { AudienceButtons } from '../ui/Button';
import { useMotionSafe } from '../../lib/motion';

interface FinalCTAProps {
  content: SiteContent['finalCta'];
}

export function FinalCTA({ content }: FinalCTAProps) {
  const { fadeUp } = useMotionSafe();

  return (
    <SectionContainer className="relative overflow-hidden bg-white py-20 md:py-28">
      <motion.div
        className="tabi-card relative mx-auto max-w-3xl p-10 text-center shadow-xl md:p-14"
        {...fadeUp}
      >
        <span className="text-label-caps mb-4 inline-block rounded-full gradient-brand px-4 py-1.5 text-white shadow-md">
          Medellín
        </span>
        <h2 className="font-display text-3xl font-black leading-tight text-gray-900 md:text-5xl">{content.title}</h2>
        <p className="prose-body mx-auto mt-5 max-w-xl">{content.subtitle}</p>

        <div className="mt-10">
          <AudienceButtons
            ctas={{ client: content.ctaClient, restaurant: content.ctaRestaurant }}
            className="mx-auto max-w-lg justify-center"
          />
        </div>

        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          {content.badges.map((badge) => (
            <li
              key={badge}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green text-white">
                <Check size={12} strokeWidth={3} />
              </span>
              {badge}
            </li>
          ))}
        </ul>
      </motion.div>
    </SectionContainer>
  );
}
