# Sea Supply Hub

Production-ready affiliate-first marine ecommerce website built with Next.js App Router, TypeScript, Tailwind CSS, and SEO-first architecture.

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

## Content + Data

- `data/seed/*.json` contains categories, products, brands, articles, FAQs.
- `data/loaders.ts` validates and hydrates seed data with Zod.

## Affiliate Model

- Product pages use outbound partner CTAs only.
- No native cart/checkout implemented yet.
- Data model already includes hooks for multiple partners and future commerce expansion.
