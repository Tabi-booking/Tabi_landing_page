'use client';

import { motion } from 'framer-motion';
import { CalendarDays, MapPin, Star, UtensilsCrossed, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PlatformVisualProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function PlatformVisual({ className, size = 'md' }: PlatformVisualProps) {
  const dimensions = {
    sm: 'h-64 w-64',
    md: 'h-80 w-full max-w-sm',
    lg: 'h-96 w-full max-w-md',
  };

  return (
    <div className={cn('relative mx-auto', dimensions[size], className)} aria-hidden>
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-100 via-white to-orange-500/10" />
      <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow rounded-full bg-orange/15 blur-3xl" />
      <div className="absolute right-4 top-6 h-24 w-24 animate-float-slow rounded-full bg-orange/20 blur-2xl" />

      <motion.div
        className="absolute left-4 top-8 z-10 rounded-2xl bg-white p-4 shadow-xl shadow-blue/15"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl gradient-brand text-white">
          <UtensilsCrossed size={18} />
        </div>
        <p className="text-xs font-bold text-gray-900">El Cielo</p>
        <p className="text-[10px] text-gray-500">El Poblado</p>
        <div className="mt-2 flex items-center gap-1 text-yellow">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={10} fill="currentColor" />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="absolute right-4 top-16 z-20 rounded-2xl bg-white p-3 shadow-xl shadow-blue/15"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green/15 text-green">
            <Check size={14} strokeWidth={3} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-900">Reserva confirmada</p>
            <p className="text-[9px] text-gray-500">Hoy · 8:00 PM · 2 personas</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 z-10 w-[85%] -translate-x-1/2 rounded-2xl bg-white p-4 shadow-2xl shadow-blue/20"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarDays size={16} className="text-blue" />
            <span className="text-xs font-bold text-gray-900">Nueva reserva</span>
          </div>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[9px] font-bold text-blue">En vivo</span>
        </div>
        <div className="space-y-2">
          <div className="h-2 w-full rounded-full bg-gray-100">
            <div className="h-2 w-3/4 rounded-full gradient-brand" />
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
            <MapPin size={11} className="text-orange" />
            Medellín, Colombia
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-4 left-8 h-3 w-3 animate-ping rounded-full bg-orange/40" />
      <div className="absolute right-10 top-1/2 h-2 w-2 animate-ping rounded-full bg-orange/40 [animation-duration:3s]" />
    </div>
  );
}
