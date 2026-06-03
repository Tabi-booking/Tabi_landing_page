'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import type { SiteContent } from '../../i18n/types';
import { SectionContainer, SectionBody } from '../layout/SectionContainer';
import { SectionHeader } from '../ui/SectionHeader';
import { SectionPanel } from '../ui/SectionPanel';
import { cn } from '../../lib/utils';
import { useMotionSafe } from '../../lib/motion';

interface TestimonialsProps {
  content: SiteContent['testimonials'];
}

type Filter = 'all' | 'restaurant' | 'client';

const AUTOPLAY_MS = 6000;

export function Testimonials({ content }: TestimonialsProps) {
  const [filter, setFilter] = useState<Filter>('all');
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const { fadeUp } = useMotionSafe();

  const filtered =
    filter === 'all' ? content.items : content.items.filter((item) => item.type === filter);

  const current = filtered[index % filtered.length];
  const safeIndex = filtered.length ? index % filtered.length : 0;

  function setFilterAndReset(f: Filter) {
    setFilter(f);
    setIndex(0);
  }

  function prev() {
    setIndex((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
  }

  function next() {
    setIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0));
  }

  useEffect(() => {
    if (filtered.length <= 1 || paused) return;

    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % filtered.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [filtered.length, paused, filter]);

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: content.filters.all },
    { id: 'restaurant', label: content.filters.restaurant },
    { id: 'client', label: content.filters.client },
  ];

  return (
    <SectionContainer id="testimonials">
      <SectionHeader label={content.label} title={content.title} subtitle={content.subtitle || undefined} />

      <SectionBody>
        <motion.div className="mx-auto max-w-lg" {...fadeUp}>
          <SectionPanel onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div className="relative mb-6 flex justify-center gap-1">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilterAndReset(f.id)}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-xs font-medium transition-all',
                    filter === f.id
                      ? 'bg-gray-900 text-white shadow-md'
                      : 'border border-gray-200/80 bg-white text-gray-400 hover:text-gray-700',
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <AnimatePresence mode="wait">
                {current && (
                  <motion.div
                    key={`${filter}-${safeIndex}`}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                    className="tabi-card tabi-card-elevated rounded-xl p-6 text-center"
                  >
                    <div className="mb-3 flex justify-center text-yellow">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={12} fill="currentColor" />
                      ))}
                    </div>
                    <p className="mb-5 text-sm leading-relaxed text-gray-700">&ldquo;{current.quote}&rdquo;</p>
                    <div className="flex items-center justify-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-orange/20 to-orange/5 text-xs font-semibold text-orange ring-2 ring-orange/10">
                        {current.initials}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-900">{current.author}</p>
                        <p className="text-xs text-gray-400">{current.role} · {current.location}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {filtered.length > 1 && (
                <div className="relative mt-5 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={prev}
                    className="rounded-full border border-gray-200 bg-white p-2 text-gray-400 shadow-sm transition-all hover:border-orange/20 hover:text-orange"
                    aria-label="Anterior"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <div className="flex gap-1.5">
                    {filtered.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setIndex(i)}
                        className={cn(
                          'h-1.5 rounded-full transition-all',
                          i === safeIndex ? 'w-4 bg-orange' : 'w-1.5 bg-gray-200',
                        )}
                        aria-label={`Testimonio ${i + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={next}
                    className="rounded-full border border-gray-200 bg-white p-2 text-gray-400 shadow-sm transition-all hover:border-orange/20 hover:text-orange"
                    aria-label="Siguiente"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>
          </SectionPanel>
        </motion.div>
      </SectionBody>
    </SectionContainer>
  );
}
