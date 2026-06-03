import { cn } from '../../lib/utils';
import { Star } from 'lucide-react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'gradient' | 'glass' | 'location' | 'default';
  stars?: boolean;
}

export function Badge({ children, className, variant = 'glass', stars }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold',
        variant === 'gradient' && 'gradient-brand text-white shadow-md',
        variant === 'glass' && 'glass-pill text-gray-700 shadow-sm',
        variant === 'location' && 'glass-pill text-orange shadow-sm',
        variant === 'default' && 'bg-gray-100 text-gray-700',
        className,
      )}
    >
      {stars && (
        <span className="flex text-yellow">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={12} fill="currentColor" />
          ))}
        </span>
      )}
      {children}
    </span>
  );
}
