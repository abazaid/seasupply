# Content Layer (CMS/MDX Ready)

This project currently uses typed JSON seed data for fast static generation.

To switch to MDX or CMS later:

1. Keep route structure unchanged.
2. Replace data loaders in `data/loaders.ts` with CMS/MDX fetchers.
3. Preserve shared schemas/types in `types/` and `data/schema.ts`.
4. Keep SEO components (`lib/seo.ts`, `lib/schema.ts`) as the rendering layer.

Example future path:

- `content/resources/*.mdx`
- `content/categories/*.mdx`
- API/CMS sync into same page templates.
