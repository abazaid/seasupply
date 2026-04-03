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
npm run impact:import:dry
npm run impact:import:test
```

## Environment

Copy `.env.example` to `.env.local` and update values.

## Admin Header Code Panel

- Login page: `/admin/login`
- Panel page: `/admin`
- Save custom head code from the `Header` textarea (scripts/meta/link/style/noscript supported).
- Credentials are controlled by:
  - `ADMIN_USERNAME`
  - `ADMIN_PASSWORD`
  - `ADMIN_SESSION_SECRET`
- Persistent storage path for saved head code:
  - `HEADER_CODE_FILE` (use a mounted volume path on Coolify, e.g. `/data/seasupply/header-code.json`)

## Content + Data

- `data/seed/*.json` contains categories, products, brands, articles, FAQs.
- `data/loaders.ts` validates and hydrates seed data with Zod.

## Impact Catalog Import (Test 5 Products)

1. Add these variables in `.env.local` (or Coolify environment):
   - `IMPACT_ACCOUNT_SID`
   - `IMPACT_AUTH_TOKEN`
   - `IMPACT_API_BASE_URL` (default `https://api.impact.com`)
   - `IMPACT_IMPORT_LIMIT` (default `5`)
   - Optional targeting filters:
   - `IMPACT_MERCHANT_ALLOWLIST=garmin,simrad,west marine`
   - `IMPACT_KEYWORD_ALLOWLIST=marine,boat,outboard,navigation,safety`
2. Run dry test:
   - `npm run impact:import:dry`
3. Import and replace current demo products with 5 catalog products:
   - `npm run impact:import:test`

Notes:
- The importer creates a product backup in `data/seed/backups/`.
- Product content is rewritten with SEO-focused title/description and category mapping.
- New brands are added automatically to `data/seed/brands.json` if missing.

## marketplace model

- Product pages use outbound partner CTAs only.
- No native cart/checkout implemented yet.
- Data model already includes hooks for multiple partners and future commerce expansion.

