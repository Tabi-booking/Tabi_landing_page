import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
}

export function Card({ children, className, glass }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-outline-variant/10 bg-surface-container-lowest p-6 md:p-8 shadow-[var(--shadow-ambient)]',
        glass && 'glass-card',
        className,
      )}
    >
      {children}
    </div>
  );
}
