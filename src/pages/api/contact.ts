import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { z } from 'zod';

export const prerender = false;

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  restaurant: z.string().max(200).optional(),
  message: z.string().min(1).max(2000),
  locale: z.enum(['es', 'en']),
  website: z.string().max(0).optional(),
});

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const ip = clientAddress ?? 'unknown';
    if (isRateLimited(ip)) {
      return new Response(JSON.stringify({ error: 'Too many requests' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(JSON.stringify({ error: 'Invalid input', details: parsed.error.flatten() }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (parsed.data.website) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = import.meta.env.RESEND_API_KEY;
    const contactEmail = import.meta.env.CONTACT_EMAIL;
    const fromEmail = import.meta.env.RESEND_FROM_EMAIL ?? 'Tabi <onboarding@resend.dev>';
    const isSandbox = fromEmail.includes('resend.dev');

    if (!apiKey || !contactEmail) {
      console.error('Missing RESEND_API_KEY or CONTACT_EMAIL');
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { name, email, phone, restaurant, message, locale } = parsed.data;
    const resend = new Resend(apiKey);

    const subject =
      locale === 'es'
        ? `[Tabi] Nuevo interesado: ${name}`
        : `[Tabi] New lead: ${name}`;

    const replyLabel = locale === 'es' ? 'Responder a' : 'Reply to';

    const html = `
      <h2>${locale === 'es' ? 'Nuevo contacto desde la landing' : 'New contact from landing page'}</h2>
      <p><strong>${locale === 'es' ? 'Nombre' : 'Name'}:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>${replyLabel}:</strong> <a href="mailto:${email}">${email}</a></p>
      ${phone ? `<p><strong>${locale === 'es' ? 'Teléfono' : 'Phone'}:</strong> ${phone}</p>` : ''}
      ${restaurant ? `<p><strong>${locale === 'es' ? 'Restaurante' : 'Restaurant'}:</strong> ${restaurant}</p>` : ''}
      <p><strong>${locale === 'es' ? 'Mensaje' : 'Message'}:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p style="color:#707974;font-size:12px;">Locale: ${locale} | IP: ${ip}</p>
    `;

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: contactEmail,
      ...(isSandbox ? {} : { replyTo: email }),
      subject,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      const accountEmailMatch = error.message?.match(
        /your own email address \(([^)]+)\)/,
      );
      const staleEnvHint =
        import.meta.env.DEV &&
        isSandbox &&
        accountEmailMatch &&
        contactEmail !== accountEmailMatch[1]
          ? `CONTACT_EMAIL is "${contactEmail}" but Resend expects "${accountEmailMatch[1]}". Restart the dev server after updating .env (shell env vars override .env files).`
          : undefined;
      const devHint =
        import.meta.env.DEV && error.message
          ? staleEnvHint ?? error.message
          : undefined;
      return new Response(
        JSON.stringify({
          error: 'Failed to send email',
          ...(devHint && { details: devHint }),
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Contact API error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
