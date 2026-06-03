'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { SiteContent } from '../../i18n/types';
import { SectionContainer, SectionBody } from '../layout/SectionContainer';
import { SectionHeader } from '../ui/SectionHeader';
import { SectionPanel } from '../ui/SectionPanel';
import { Button } from '../ui/Button';
import { getIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';
import { useMotionSafe } from '../../lib/motion';

interface FAQProps {
  content: SiteContent['faq'];
}

export function FAQ({ content }: FAQProps) {
  const [activeCategory, setActiveCategory] = useState(content.categories[0]?.id ?? 'general');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { fadeUp } = useMotionSafe();

  const category = content.categories.find((c) => c.id === activeCategory) ?? content.categories[0];

  return (
    <SectionContainer id="faq">
      <SectionHeader label={content.label} title={content.title} subtitle={content.subtitle || undefined} />

      <SectionBody>
        <motion.div className="mx-auto max-w-lg" {...fadeUp}>
          <SectionPanel>
            <div className="relative mb-5 flex flex-wrap justify-center gap-1">
              {content.categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenIndex(0);
                  }}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-xs font-medium transition-all',
                    activeCategory === cat.id
                      ? 'bg-gray-900 text-white shadow-md'
                      : 'border border-gray-200/80 bg-white text-gray-400 hover:text-gray-700',
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative space-y-2" key={activeCategory}>
              {category?.items.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <div
                    key={item.question}
                    className={cn(
                      'overflow-hidden rounded-xl border transition-all',
                      isOpen
                        ? 'border-orange/20 bg-white shadow-sm'
                        : 'border-gray-100 bg-white/60',
                    )}
                  >
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm font-medium text-gray-900">{item.question}</span>
                      <ChevronDown
                        size={16}
                        className={cn('shrink-0 text-gray-300 transition-transform', isOpen && 'rotate-180 text-orange')}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <p className="border-t border-gray-50 px-4 pb-4 pt-3 text-sm text-gray-500">{item.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </SectionPanel>

          <div className="tabi-card tabi-card-elevated mx-auto mt-8 max-w-lg rounded-2xl p-6 text-center">
            <p className="mb-4 text-sm text-gray-600">{content.supportTitle}</p>
            <div className="mb-5 flex flex-wrap justify-center gap-4">
              {content.supportChannels.map((ch) => {
                const Icon = getIcon(ch.icon);
                return (
                  <div
                    key={ch.label}
                    className="flex items-center gap-2 rounded-full border border-gray-100 bg-gray-50/80 px-3 py-1.5 text-sm text-gray-600"
                  >
                    <Icon size={14} className="text-orange" />
                    {ch.label}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center gap-3">
              <Button href="#contact" variant="gradient" size="md">{content.ctaSupport}</Button>
              <Button href="#contact" variant="blue-outline" size="md">{content.ctaDemo}</Button>
            </div>
          </div>
        </motion.div>
      </SectionBody>
    </SectionContainer>
  );
}
