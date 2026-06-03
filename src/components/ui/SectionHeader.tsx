import { cn } from '../../lib/utils';

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  inverted?: boolean;
  className?: string;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  centered = true,
  inverted = false,
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn(centered && 'mx-auto max-w-xl text-center', 'mb-10 md:mb-12', className)}>
      {label && (
        <span
          className={cn(
            'badge-soft mb-3',
            inverted && 'bg-white/15 text-white',
          )}
        >
          {label}
        </span>
      )}
      <h2 className={cn('prose-title', inverted && 'text-white')}>{title}</h2>
      <div className={cn('gradient-line mt-4', centered && 'mx-auto')} />
      {subtitle && (
        <p className={cn('prose-body mt-4', centered && 'mx-auto', inverted ? 'text-white/75' : '')}>
          {subtitle}
        </p>
      )}
    </header>
  );
}
