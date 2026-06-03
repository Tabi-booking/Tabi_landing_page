import { cn } from '../../lib/utils';

type ButtonVariant =
  | 'gradient'
  | 'blue-outline'
  | 'ghost'
  | 'white'
  | 'white-orange'
  | 'hero-outline'
  | 'blue-fill'
  | 'orange'
  | 'outline-orange'
  | 'primary'
  | 'secondary'
  | 'green';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
}

const variants: Record<ButtonVariant, string> = {
  gradient: 'bg-orange text-white shadow-sm hover:bg-orange-600',
  orange: 'bg-orange text-white hover:bg-orange-600',
  'blue-outline': 'border border-navy/20 bg-white text-navy hover:bg-blue-light',
  'blue-fill': 'bg-blue text-white hover:bg-blue-600',
  white: 'bg-white text-gray-800 border border-gray-200 hover:bg-gray-50',
  'white-orange': 'bg-white text-orange hover:bg-gray-50',
  'hero-outline': 'border border-white/40 bg-white/5 text-white hover:bg-white/15 hover:border-white/60',
  ghost: 'text-gray-600 hover:text-orange hover:bg-orange/5',
  'outline-orange': 'border border-orange/30 bg-white text-orange hover:bg-orange/5',
  primary: 'bg-orange text-white hover:bg-orange-600',
  secondary: 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
  green: 'bg-green text-white hover:opacity-90',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3 text-base rounded-xl',
};

export function Button({
  variant = 'gradient',
  size = 'md',
  className,
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/40 focus-visible:ring-offset-2',
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export interface AudienceCta {
  client: string;
  restaurant: string;
}

interface AudienceButtonsProps {
  ctas: AudienceCta;
  size?: ButtonSize;
  className?: string;
  layout?: 'row' | 'stack';
  inverted?: boolean;
}

export function AudienceButtons({
  ctas,
  size = 'md',
  className,
  layout = 'row',
  inverted = false,
}: AudienceButtonsProps) {
  return (
    <div
      className={cn(
        'flex w-full gap-3',
        layout === 'row' ? 'flex-col sm:flex-row' : 'flex-col',
        className,
      )}
    >
      <Button
        href="#for-clients"
        variant="gradient"
        size={size}
        className="flex-1 sm:flex-none"
      >
        {ctas.client}
      </Button>
      <Button
        href="#contact"
        variant={inverted ? 'hero-outline' : 'blue-outline'}
        size={size}
        className="flex-1 sm:flex-none"
      >
        {ctas.restaurant}
      </Button>
    </div>
  );
}
