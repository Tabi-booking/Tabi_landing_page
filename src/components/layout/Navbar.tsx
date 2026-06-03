import { useState, useEffect, useMemo } from 'react';
import { Menu, X } from 'lucide-react';
import type { Locale, SiteContent } from '../../i18n/types';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useActiveSection } from '../../hooks/useActiveSection';
import { cn } from '../../lib/utils';

interface NavbarProps {
  locale: Locale;
  content: SiteContent['nav'];
}

export function Navbar({ locale, content }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const sectionIds = useMemo(
    () => content.links.map((link) => link.href.replace('#', '')),
    [content.links],
  );
  const activeHref = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const overHero = !scrolled;

  return (
    <header
      className={cn(
        'fixed top-0.5 left-0 z-50 w-full transition-all duration-300',
        overHero
          ? 'border-transparent bg-transparent'
          : 'glass border-b border-gray-100 shadow-sm',
      )}
    >
      <nav
        className="mx-auto flex h-14 max-w-[var(--spacing-container-max)] items-center justify-between gap-4 px-5 sm:px-6"
        aria-label="Main navigation"
      >
        <div className="flex min-w-0 items-center gap-8">
          <a href={`/${locale}`} className="shrink-0">
            <Logo variant={overHero ? 'dark' : 'light'} />
          </a>
          <div className="hidden items-center gap-6 lg:flex">
            {content.links.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                className={cn(
                  'relative text-sm font-medium transition-colors hover:text-orange',
                  overHero ? 'text-white/85' : 'text-gray-600',
                  isActive && (overHero ? 'text-orange' : 'text-orange'),
                )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-orange" />
                  )}
                </a>
              );
            })}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher locale={locale} overHero={overHero} />
          <Button
            href="#contact"
            variant="ghost"
            size="sm"
            className={cn('hidden md:inline-flex', overHero && 'text-white/90 hover:bg-white/10')}
          >
            {content.ctaRestaurant}
          </Button>
          <Button href="#for-clients" variant="gradient" size="sm" className="hidden md:inline-flex">
            {content.ctaClient}
          </Button>
          <button
            type="button"
            className={cn(
              'rounded-xl p-2 lg:hidden',
              overHero ? 'text-white hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100',
            )}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? content.menuClose : content.menuOpen}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-gray-100 bg-white lg:hidden">
          <div className="flex flex-col gap-1 px-5 py-4">
            {content.links.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-orange/5 hover:text-orange',
                    isActive ? 'bg-orange/5 text-orange' : 'text-gray-600',
                  )}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="mt-3 flex flex-col gap-2 border-t border-gray-100 pt-3">
              <Button href="#contact" variant="blue-outline" className="w-full">
                {content.ctaRestaurant}
              </Button>
              <Button href="#for-clients" variant="gradient" className="w-full">
                {content.ctaClient}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
