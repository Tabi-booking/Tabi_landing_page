'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SiteContent } from '../../i18n/types';
import { SectionContainer, SectionBody } from '../layout/SectionContainer';
import { SectionHeader } from '../ui/SectionHeader';
import { DashboardMockup } from '../mockups/DashboardMockup';
import { MobileAppMockup } from '../mockups/MobileAppMockup';
import { AnalyticsMockup } from '../mockups/AnalyticsMockup';
import { CalendarMockup } from '../mockups/CalendarMockup';
import { BookingWidgetMockup } from '../mockups/BookingWidgetMockup';
import { cn } from '../../lib/utils';
import { useMotionSafe } from '../../lib/motion';

interface ProductShowcaseProps {
  content: SiteContent['showcase'];
}

const mockupMap = {
  dashboard: DashboardMockup,
  mobile: MobileAppMockup,
  analytics: AnalyticsMockup,
  calendar: CalendarMockup,
  widget: BookingWidgetMockup,
};

export function ProductShowcase({ content }: ProductShowcaseProps) {
  const [active, setActive] = useState(content.tabs[0]?.id ?? 'dashboard');
  const { reduced } = useMotionSafe();
  const ActiveMockup = mockupMap[active as keyof typeof mockupMap] ?? DashboardMockup;
  const isMobile = active === 'mobile';

  return (
    <SectionContainer id="showcase" className="bg-white">
      <SectionHeader label={content.label} title={content.title} subtitle={content.subtitle} />

      <SectionBody>
        <div className="flex flex-wrap justify-center gap-2">
          {content.tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                active === tab.id
                  ? 'bg-orange text-white'
                  : 'border border-orange/20 bg-white text-on-surface-variant hover:border-orange hover:text-orange',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-8 flex min-h-[300px] items-center justify-center rounded-2xl border border-orange/12 bg-orange-light p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={reduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? {} : { opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={cn('w-full', isMobile ? 'max-w-[220px]' : 'max-w-2xl')}
            >
              <ActiveMockup />
            </motion.div>
          </AnimatePresence>
        </div>
      </SectionBody>
    </SectionContainer>
  );
}
