'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import type { SiteContent } from '../../i18n/types';
import { SectionContainer, SectionBody } from '../layout/SectionContainer';
import { useMotionSafe } from '../../lib/motion';

interface TrustProps {
  content: SiteContent['trust'];
}

export function Trust({ content }: TrustProps) {
  const { fadeUp, stagger } = useMotionSafe();
  const doubledLogos = [...content.logos, ...content.logos];

  return (
    <>
      <section className="border-y border-orange/15 bg-white py-10">
        <p className="text-label-caps mb-5 text-center text-orange">{content.label}</p>
        <div className="marquee-container overflow-hidden whitespace-nowrap">
          <div className="animate-marquee flex items-center gap-20">
            {doubledLogos.map((logo, i) => (
              <span key={`${logo}-${i}`} className="font-display text-base font-bold text-orange/25">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      <SectionContainer className="bg-white">
        <SectionBody className="mt-0">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {content.stats.map((stat, i) => (
              <motion.div key={stat.label} {...fadeUp} transition={{ delay: i * stagger }}>
                <div className="rounded-2xl border border-orange/12 bg-orange-light px-4 py-6 text-center">
                  <p className="font-display text-2xl font-bold text-orange md:text-3xl">{stat.value}</p>
                  <p className="text-label-caps mt-2 text-on-surface-variant">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </SectionBody>

        <SectionBody>
          <motion.div className="mx-auto max-w-2xl" {...fadeUp}>
            <div className="relative rounded-2xl border border-orange/12 bg-white p-8 md:p-10">
              <Quote className="absolute top-6 right-6 h-10 w-10 text-orange/15" aria-hidden />
              <blockquote className="text-lg leading-relaxed text-on-surface md:text-xl">
                "{content.testimonial.quote}"
              </blockquote>
              <footer className="mt-6 border-t border-orange/10 pt-5">
                <p className="font-semibold text-on-surface">{content.testimonial.author}</p>
                <p className="mt-1 text-sm text-on-surface-variant">{content.testimonial.role}</p>
              </footer>
            </div>
          </motion.div>
        </SectionBody>
      </SectionContainer>
    </>
  );
}
