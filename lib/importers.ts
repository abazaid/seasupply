import type { Product } from "@/types";

export interface ExternalProductRecord {
  id?: string;
  name: string;
  sku?: string;
  brand: string;
  category: string;
  subcategory: string;
  description: string;
  affiliateUrl: string;
}

export interface ImportAdapter {
  parse(input: unknown): ExternalProductRecord[];
}

export function mapExternalRecordToProduct(record: ExternalProductRecord): Product {
  const slug = record.name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return {
    id: record.id ?? `IMP-${slug}`,
    slug,
    name: record.name,
    brandSlug: record.brand,
    categorySlug: record.category,
    subcategorySlug: record.subcategory,
    sku: record.sku ?? `SKU-${slug}`,
    shortDescription: record.description,
    longDescription: record.description,
    highlights: ["Imported product"],
    pros: ["Pending enrichment"],
    cons: ["Pending enrichment"],
    specs: [{ label: "Source", value: "Imported feed" }],
    compatibility: ["See partner listing"],
    images: ["/images/placeholder-product-1.jpg"],
    partnerLinks: [
      {
        label: "Check Price",
        url: record.affiliateUrl,
        network: "TBD",
        merchant: "Imported Merchant",
        lastChecked: new Date().toISOString().slice(0, 10),
        availabilityNote: "Imported feed; verify availability.",
        rel: "sponsored nofollow",
      },
    ],
    relatedProductSlugs: [],
    relatedGuideSlugs: [],
    featured: false,
    bestSeller: false,
  };
}

export function mergeImportedProducts(existing: Product[], incoming: Product[]) {
  const map = new Map(existing.map((product) => [product.slug, product]));
  for (const item of incoming) {
    map.set(item.slug, item);
  }
  return Array.from(map.values());
}
