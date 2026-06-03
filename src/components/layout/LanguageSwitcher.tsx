import type { Locale } from '../../i18n/types';
import { getLocalePath } from '../../i18n';
import { cn } from '../../lib/utils';

interface LanguageSwitcherProps {
  locale: Locale;
  overHero?: boolean;
}

export function LanguageSwitcher({ locale, overHero = false }: LanguageSwitcherProps) {
  return (
    <div
      className={cn(
        'flex items-center rounded-xl p-0.5 text-xs font-semibold',
        overHero ? 'border border-white/10 bg-white/10 backdrop-blur-sm' : 'bg-gray-100',
      )}
    >
      {(['es', 'en'] as Locale[]).map((lang) => (
        <a
          key={lang}
          href={getLocalePath(lang)}
          className={cn(
            'rounded-lg px-2.5 py-1 uppercase transition-colors',
            locale === lang
              ? overHero
                ? 'bg-orange text-white shadow-sm'
                : 'bg-white text-orange shadow-sm'
              : overHero
                ? 'text-white/70 hover:text-white'
                : 'text-gray-500 hover:text-gray-700',
          )}
          aria-current={locale === lang ? 'page' : undefined}
          hrefLang={lang}
        >
          {lang}
        </a>
      ))}
    </div>
  );
}
