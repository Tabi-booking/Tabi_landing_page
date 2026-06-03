# Tabi Landing Page

Premium SaaS landing page for Tabi — restaurant reservations in LATAM.

Built with **Astro 6**, **React**, **Tailwind CSS v4**, **Framer Motion**, and **Resend** for contact form emails.

## Features

- Modular landing sections with ES/EN i18n at `/` (ES) and `/en`
- Tabi brand system (Poppins, coral `#F55E57`, logos)
- Contact form with Resend (`/api/contact`)
- Deployed on **Vercel** with `@astrojs/vercel`

## Getting Started

### Prerequisites

- Node.js >= 22.12
- A [Resend](https://resend.com) account with domain `tabiapp.tech` verified

### Setup

```bash
npm install
cp .env.example .env
```

Edit `.env`:

```
RESEND_API_KEY=re_xxxx
CONTACT_EMAIL=your@email.com
RESEND_FROM_EMAIL=Tabi <hola@tabiapp.tech>
CONTACT_PHONE=+57 300 123 4567
```

### Development

```bash
npm run dev
```

Open [http://localhost:4321/](http://localhost:4321/) (ES) or [http://localhost:4321/en](http://localhost:4321/en).

### Build

```bash
npm run build
```

## Deploy on Vercel

### 1. Import the repository

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import `Tabi-booking/Tabi_landing_page` from GitHub
3. Vercel auto-detects **Astro** — no extra build settings needed

### 2. Environment variables

In **Project Settings → Environment Variables**, add:

| Variable | Example | Required |
|----------|---------|----------|
| `RESEND_API_KEY` | `re_...` | Yes |
| `CONTACT_EMAIL` | `tu@gmail.com` | Yes |
| `RESEND_FROM_EMAIL` | `Tabi <hola@tabiapp.tech>` | Yes |
| `CONTACT_PHONE` | `+57 300 123 4567` | No |

Apply to **Production** (and **Preview** if you want the contact form in PR previews).

### 3. Custom domain

1. **Project Settings → Domains**
2. Add `tabiapp.tech` (and `www.tabiapp.tech` if needed)
3. Configure DNS at your registrar using the records Vercel provides

### 4. Deploy

Push to `main` — Vercel deploys automatically.

```bash
git push origin main
```

### CLI (optional)

```bash
npm i -g vercel
vercel login
vercel link
vercel env pull .env.local   # sync env vars locally
vercel --prod
```

## Project Structure

```
src/
├── components/       # layout, sections, ui, mockups
├── data/content/     # es.json, en.json
├── pages/
│   ├── es/index.astro
│   ├── en/index.astro
│   └── api/contact.ts   # serverless on Vercel
└── styles/
```

## Contact Form

POST `/api/contact` — Zod validation, honeypot, rate limit (5 req/min per IP), Resend email to `CONTACT_EMAIL` with `replyTo` from the visitor.

## License

Private — Tabi
