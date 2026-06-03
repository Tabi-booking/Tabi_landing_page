import { cn } from '../../lib/utils';

interface SectionContainerProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  as?: 'section' | 'div';
  narrow?: boolean;
}

export function SectionContainer({
  id,
  children,
  className,
  as: Tag = 'section',
  narrow = false,
}: SectionContainerProps) {
  return (
    <Tag
      id={id}
      className={cn('py-10 md:py-14', id && 'scroll-mt-20 md:scroll-mt-24', className)}
    >
      <div
        className={cn(
          'mx-auto px-5 sm:px-6',
          narrow ? 'max-w-3xl' : 'max-w-[var(--spacing-container-max)]',
        )}
      >
        {children}
      </div>
    </Tag>
  );
}

interface SectionBodyProps {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}

export function SectionBody({ children, className, narrow }: SectionBodyProps) {
  return (
    <div className={cn('mt-6 md:mt-8', narrow && 'mx-auto max-w-xl', className)}>
      {children}
    </div>
  );
}
