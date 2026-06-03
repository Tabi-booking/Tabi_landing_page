'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, Shield, Globe } from 'lucide-react';
import type { SiteContent } from '../../i18n/types';
import { AudienceButtons } from '../ui/Button';
import { Logo } from '../ui/Logo';
import { CountUp } from '../ui/CountUp';
import { getIcon } from '../../lib/icons';
import { useMotionSafe } from '../../lib/motion';

const pillIcons = [Zap, Shield, Globe];
const HERO_BG = '/images/restaurant-hero.jpg';

interface HeroProps {
  content: SiteContent['hero'];
}

export function Hero({ content }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { heroContainer, heroItem, reduced } = useMotionSafe();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden pb-0 pt-28 md:pt-32">
      <motion.div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          y: reduced ? 0 : bgY,
          scale: reduced ? 1 : bgScale,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/90 via-navy/60 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-coral/10 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-[var(--spacing-container-max)] px-5 pb-10 sm:px-6 md:pb-12">
        <motion.div
          className="max-w-xl rounded-2xl bg-slate-900/25 p-6 backdrop-blur-sm sm:bg-transparent sm:p-0 sm:backdrop-blur-none"
          {...heroContainer}
        >
          <motion.div className="mb-4" {...heroItem}>
            <Logo variant="dark" className="h-10 w-auto md:h-12" />
          </motion.div>

          <motion.h1 className="prose-display mb-4 text-white" {...heroItem}>
            {content.title}
          </motion.h1>

          <motion.p className="prose-body mb-6 text-white/90" {...heroItem}>
            {content.subtitle}
          </motion.p>

          <motion.div className="mb-8 flex flex-wrap gap-2" {...heroItem}>
            {content.pills.map((pill, i) => {
              const Icon = pillIcons[i] ?? Zap;
              return (
                <span
                  key={pill}
                  className="inline-flex cursor-default items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm transition-colors hover:border-orange/40 hover:bg-orange/10"
                >
                  <Icon size={12} className="text-orange" />
                  {pill}
                </span>
              );
            })}
          </motion.div>

          <motion.div className="mb-8 max-w-sm" {...heroItem}>
            <AudienceButtons
              ctas={{ client: content.ctaClient, restaurant: content.ctaRestaurant }}
              layout="stack"
              inverted
            />
          </motion.div>

          <motion.div className="grid grid-cols-2 gap-2 sm:grid-cols-4" {...heroItem}>
            {content.highlights.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <div
                  key={item.title}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-2 backdrop-blur-sm transition-transform hover:scale-[1.02] hover:border-orange/30"
                >
                  <div className="icon-chip h-8 w-8 shrink-0">
                    <Icon size={14} strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-white">{item.title}</p>
                    <p className="truncate text-[11px] text-white/60">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 border-t border-white/10 bg-slate-900/40 backdrop-blur-md"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto flex max-w-[var(--spacing-container-max)] flex-wrap items-center justify-center gap-8 px-5 py-4 sm:px-6 sm:py-5 md:gap-12">
          {content.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <CountUp
                value={stat.value}
                immediate
                className="font-display block text-xl font-semibold text-white"
              />
              <p className="text-xs text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
