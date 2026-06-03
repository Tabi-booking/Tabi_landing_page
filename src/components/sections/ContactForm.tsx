'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, AlertCircle, Phone } from 'lucide-react';
import type { Locale, SiteContent } from '../../i18n/types';
import { SectionContainer, SectionBody } from '../layout/SectionContainer';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { useMotionSafe } from '../../lib/motion';
import { cn } from '../../lib/utils';

interface ContactFormProps {
  content: SiteContent['contact'];
  locale: Locale;
  contactPhone?: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm({ content, locale, contactPhone }: ContactFormProps) {
  const { fadeUp } = useMotionSafe();
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: (formData.get('phone') as string) || undefined,
      restaurant: (formData.get('restaurant') as string) || undefined,
      message: formData.get('message') as string,
      locale,
      website: formData.get('website') as string,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
          details?: string | { fieldErrors?: Record<string, string[]> };
        } | null;
        const fieldError =
          data?.details && typeof data.details === 'object' && 'fieldErrors' in data.details
            ? Object.values(data.details.fieldErrors ?? {}).flat()[0]
            : null;
        const serverMessage = typeof data?.details === 'string' ? data.details : null;
        setErrorMessage(fieldError ?? serverMessage ?? content.error);
        setStatus('error');
        return;
      }

      setStatus('success');
      form.reset();
    } catch {
      setErrorMessage(content.error);
      setStatus('error');
    }
  }

  const inputClass = cn(
    'w-full rounded-lg border border-gray-200/80 bg-white px-3.5 py-3 text-sm text-gray-900 shadow-sm',
    'placeholder:text-gray-400',
    'focus:border-blue focus:outline-none focus:ring-2 focus:ring-blue/20',
    'transition-all duration-200',
  );

  const telHref = contactPhone?.replace(/[^\d+]/g, '');

  return (
    <SectionContainer id="contact" className="bg-white">
      <SectionHeader label={content.label} title={content.title} subtitle={content.subtitle} />

      <SectionBody>
        <motion.div className="mx-auto max-w-md" {...fadeUp}>
          {contactPhone && (
            <p className="mb-4 text-center text-sm text-gray-500">
              <a
                href={`tel:${telHref}`}
                className="inline-flex items-center gap-1.5 text-gray-700 transition-colors hover:text-orange"
              >
                <Phone size={14} className="text-orange" />
                {contactPhone}
              </a>
            </p>
          )}

          <div className="section-panel section-panel-orange tabi-card-elevated p-5 md:p-6">
            {status === 'success' ? (
              <div className="flex flex-col items-center py-8 text-center">
                <CheckCircle size={40} className="mb-3 text-green" />
                <p className="font-medium text-gray-900">{content.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute -left-[9999px] opacity-0"
                  aria-hidden
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <input id="name" name="name" type="text" required placeholder={content.name} className={inputClass} />
                  <input id="email" name="email" type="email" required placeholder={content.email} className={inputClass} />
                </div>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder={content.phonePlaceholder}
                  className={inputClass}
                  autoComplete="tel"
                />

                <input
                  id="restaurant"
                  name="restaurant"
                  type="text"
                  placeholder={content.restaurantPlaceholder}
                  className={inputClass}
                />

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={3}
                  placeholder={content.messagePlaceholder}
                  className={cn(inputClass, 'resize-none')}
                />

                {status === 'error' && errorMessage && (
                  <div className="flex items-center gap-2 rounded-lg bg-error-container px-3 py-2 text-xs text-on-error-container">
                    <AlertCircle size={14} />
                    {errorMessage}
                  </div>
                )}

                <Button type="submit" variant="gradient" className="w-full" disabled={status === 'loading'}>
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      {content.submitting}
                    </>
                  ) : (
                    content.submit
                  )}
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </SectionBody>
    </SectionContainer>
  );
}
