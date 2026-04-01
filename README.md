# Sea Supply Hub

Production-ready marketplace-first marine ecommerce website built with Next.js App Router, TypeScript, Tailwind CSS, and SEO-first architecture.

## Stack

- Next.js 16 App Router
- TypeScript (strict)
- Tailwind CSS v4
- Zod data validation
- JSON seed data architecture
- Server Components by default

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Commands

```bash
npm run dev
npm run lint
npm run build
npm run start
npm run format
```

## Environment

Copy `.env.example` to `.env.local` and update values.

## Cache Clear Workflow

Use a secure token to manually trigger cache refresh after frequent updates.

1. Set `CACHE_CLEAR_TOKEN` in your server environment.
2. Call:

```bash
curl -X POST https://seasupplyhub.com/api/cache/clear \
  -H "Content-Type: application/json" \
  -d '{"token":"YOUR_CACHE_CLEAR_TOKEN"}'
```

Optional custom paths:

```bash
curl -X POST https://seasupplyhub.com/api/cache/clear \
  -H "Content-Type: application/json" \
  -d '{"token":"YOUR_CACHE_CLEAR_TOKEN","paths":["/","/deals","/brands"]}'
```

## Content + Data

- `data/seed/*.json` contains categories, products, brands, articles, FAQs.
- `data/loaders.ts` validates and hydrates seed data with Zod.

## marketplace model

- Product pages use outbound partner CTAs only.
- No native cart/checkout implemented yet.
- Data model already includes hooks for multiple partners and future commerce expansion.

