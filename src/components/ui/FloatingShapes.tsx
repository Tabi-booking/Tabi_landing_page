'use client';

import { cn } from '../../lib/utils';

interface FloatingShapesProps {
  className?: string;
}

export function FloatingShapes({ className }: FloatingShapesProps) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden>
      <div className="absolute -top-20 -left-20 h-72 w-72 animate-pulse rounded-full bg-orange/20 blur-3xl" />
      <div className="absolute top-1/4 -right-16 h-64 w-64 animate-bounce rounded-full bg-orange/15 blur-3xl [animation-duration:4s]" />
      <div className="absolute bottom-10 left-1/4 h-48 w-48 animate-ping rounded-full bg-orange/15 blur-2xl [animation-duration:3s]" />
      <div className="absolute top-1/3 right-1/3 h-16 w-16 animate-spin-slow rounded-lg bg-gray-200/60" />
      <div className="absolute bottom-1/4 right-10 h-12 w-12 animate-float-slow rounded-full bg-orange/25" />
      <div className="absolute top-20 right-1/4 h-10 w-10 rotate-45 animate-spin-slow rounded-sm bg-orange/20 [animation-duration:25s]" />
    </div>
  );
}
