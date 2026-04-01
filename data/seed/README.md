# Seed Data Import Notes

Sea Supply Hub seed files are intentionally JSON-based and normalized for future ingestion.

## Existing seed sources

- `categories.json`
- `brands.json`
- `products.json`
- `articles.json`
- `faqs.json`

## Future product feed ingestion

Use `lib/importers.ts` to map CSV/API/manual records into the internal `Product` schema.

Recommended ingestion pipeline:

1. Read CSV/API payload.
2. Normalize with `mapExternalRecordToProduct`.
3. Validate with Zod (`data/schema.ts`).
4. Merge with existing data using `mergeImportedProducts`.
5. Persist to `data/seed/products.json` or CMS/database layer.

This keeps route structure stable while swapping real feeds in later.
