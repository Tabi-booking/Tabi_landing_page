import { cn } from '../../lib/utils';

interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
  showWordmark?: boolean;
}

export function Logo({ variant = 'light', className, showWordmark = true }: LogoProps) {
  if (variant === 'dark') {
    return (
      <img
        src="/images/logo/tabi-imagotipo-dark.png"
        alt="Tabi"
        className={cn('h-8 w-auto', className)}
        width={120}
        height={32}
      />
    );
  }

  if (!showWordmark) {
    return (
      <img
        src="/images/logo/tabi-isotipo.png"
        alt="Tabi"
        className={cn('h-8 w-8', className)}
        width={32}
        height={32}
      />
    );
  }

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <img
        src="/images/logo/tabi-isotipo.png"
        alt=""
        aria-hidden
        className="h-8 w-8 shrink-0"
        width={32}
        height={32}
      />
      <span className="font-display text-xl font-bold tracking-tight text-navy">Tabi</span>
    </span>
  );
}
