import { cn } from '../../lib/utils';

interface SectionPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'orange' | 'blue';
  className?: string;
}

export function SectionPanel({
  children,
  variant = 'default',
  className,
  ...props
}: SectionPanelProps) {
  return (
    <div
      className={cn(
        'section-panel relative overflow-hidden',
        variant === 'orange' && 'section-panel-orange',
        variant === 'blue' && 'section-panel-blue',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
