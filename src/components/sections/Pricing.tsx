'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { SiteContent } from '../../i18n/types';
import { SectionContainer, SectionBody } from '../layout/SectionContainer';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { useMotionSafe } from '../../lib/motion';

interface PricingProps {
  content: SiteContent['pricing'];
}

export function Pricing({ content }: PricingProps) {
  const { fadeUp, stagger, popIn } = useMotionSafe();

  return (
    <SectionContainer id="pricing">
      <SectionHeader label={content.label} title={content.title} subtitle={content.subtitle || undefined} />

      <SectionBody>
        {content.launchOffer && (
          <p className="mb-8 text-center">
            <span className="badge-soft">{content.launchOffer}</span>
          </p>
        )}

        <div className="grid items-stretch gap-5 md:grid-cols-3">
          {content.plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              {...(plan.highlighted ? popIn : fadeUp)}
              transition={
                plan.highlighted
                  ? undefined
                  : { delay: i * stagger }
              }
              className={cn(
                'tabi-card tabi-card-elevated interactive-card relative flex flex-col p-5',
                plan.highlighted && 'tabi-card-featured -translate-y-1 bg-gradient-to-b from-orange/5 to-white md:scale-[1.02]',
              )}
            >
              {plan.highlighted && (
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-[0.875rem] bg-gradient-to-r from-orange to-blue" />
              )}
              {plan.badge && (
                <span className="text-label-caps mb-3 text-orange">{plan.badge}</span>
              )}
              <h3 className="font-medium text-gray-900">{plan.name}</h3>
              <p className="mt-0.5 mb-4 text-xs text-gray-400">{plan.description}</p>
              <div className="mb-4 flex items-baseline gap-2">
                {plan.originalPrice && (
                  <span className="text-xs text-gray-300 line-through">{plan.originalPrice}</span>
                )}
                <span className="font-display text-2xl font-semibold text-gray-900">{plan.price}</span>
                {plan.period && <span className="text-xs text-gray-400">{plan.period}</span>}
              </div>
              {plan.priceNote && <p className="mb-4 text-xs text-gray-400">{plan.priceNote}</p>}
              <ul className="mb-5 flex-1 space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-orange/10">
                      <Check size={10} className="text-orange" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button href="#contact" variant={plan.highlighted ? 'gradient' : 'blue-outline'} className="w-full" size="md">
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </SectionBody>
    </SectionContainer>
  );
}
