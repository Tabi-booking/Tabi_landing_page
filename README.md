# Tabi Landing Page

Premium SaaS landing page for Tabi — a digital reservation ecosystem for restaurants in LATAM.

Built with **Astro**, **React**, **Tailwind CSS**, **Framer Motion**, and **Resend** for contact form emails.

## Features

- 12 modular sections (Hero, Trust, Problem, Ecosystem, Features, How It Works, Product Showcase, Metrics, Pricing, FAQ, Contact Form, Final CTA)
- Bilingual support (ES/EN) at `/es` and `/en`
- Design system from Tabi brand tokens (emerald green, Plus Jakarta Sans, Inter)
- Contact form with Resend email delivery
- Responsive, accessible, with reduced-motion support

## Getting Started

### Prerequisites

- Node.js >= 22.12
- A [Resend](https://resend.com) account and API key

### Setup

```bash
npm install
cp .env.example .env
```

Edit `.env` with your values:

```
RESEND_API_KEY=re_xxxx
CONTACT_EMAIL=your@email.com
RESEND_FROM_EMAIL=Tabi <hola@tabiapp.tech>
```

With the verified domain `tabiapp.tech`, form emails are sent **from** `hola@tabiapp.tech` and delivered **to** `CONTACT_EMAIL` (any address you choose).

### Development

```bash
npm run dev
```

Open [http://localhost:4321/es](http://localhost:4321/es) or [http://localhost:4321/en](http://localhost:4321/en).

### Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── layout/       # Navbar, Footer, SectionContainer
│   ├── mockups/      # CSS/SVG product mockups
│   ├── sections/     # One component per landing section
│   └── ui/           # Button, Card, Badge, SectionHeader
├── data/content/     # es.json, en.json (all copy)
├── i18n/             # Locale utilities
├── layouts/          # BaseLayout.astro
├── pages/
│   ├── es/index.astro
│   ├── en/index.astro
│   └── api/contact.ts
└── styles/           # global.css, tokens.css
```

## Contact Form

The form at `#contact` sends a POST to `/api/contact`, which validates input with Zod and sends an email via Resend to `CONTACT_EMAIL`.

Includes honeypot field and basic rate limiting (5 requests/minute per IP).

## Deploy

For production with the contact API, deploy to a platform that supports Astro server mode (this project uses `@astrojs/node`):

- **Node.js server** — run `node ./dist/server/entry.mjs` after build
- [Vercel](https://vercel.com) — swap adapter to `@astrojs/vercel`
- [Netlify](https://netlify.com) — swap adapter to `@astrojs/netlify`

Set environment variables in your hosting dashboard (`RESEND_API_KEY`, `CONTACT_EMAIL`, `RESEND_FROM_EMAIL=Tabi <hola@tabiapp.tech>`, `CONTACT_PHONE`).

Domain `tabiapp.tech` is verified in Resend — no sandbox limits; `replyTo` uses the visitor's email automatically.

## License

Private — Tabi
