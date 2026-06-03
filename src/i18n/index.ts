import type { Locale, SiteContent } from './types';
import es from '../data/content/es.json';
import en from '../data/content/en.json';

const content: Record<Locale, SiteContent> = { es, en };

export function getContent(locale: Locale): SiteContent {
  return content[locale];
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === 'es' ? 'en' : 'es';
}

export function getLocalePath(locale: Locale): string {
  return locale === defaultLocale ? '/' : `/${locale}`;
}

export const locales: Locale[] = ['es', 'en'];
export const defaultLocale: Locale = 'es';

export type { Locale, SiteContent };
