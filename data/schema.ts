import { z } from "zod";

const urlLikeSchema = z
  .string()
  .refine((value) => value.startsWith("/") || /^https?:\/\//.test(value), {
    message: "Must be a relative path or absolute URL",
  });

export const subcategorySchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string(),
});

export const categorySchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  seoIntro: z.string(),
  subcategories: z.array(subcategorySchema),
  featuredBrandSlugs: z.array(z.string()),
  faqIds: z.array(z.string()),
});

export const brandSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  website: z.string().url(),
  logoText: z.string(),
  featured: z.boolean(),
  logoUrl: urlLikeSchema.optional(),
});

export const productSpecSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const partnerLinkSchema = z.object({
  label: z.string(),
  url: z.string().url(),
  network: z.string(),
  merchant: z.string(),
  lastChecked: z.string(),
  availabilityNote: z.string(),
  rel: z.string().optional(),
});

export const productSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  brandSlug: z.string(),
  categorySlug: z.string(),
  subcategorySlug: z.string(),
  sku: z.string(),
  shortDescription: z.string(),
  longDescription: z.string(),
  highlights: z.array(z.string()),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
  specs: z.array(productSpecSchema),
  compatibility: z.array(z.string()),
  images: z.array(z.string()),
  partnerLinks: z.array(partnerLinkSchema).min(1),
  relatedProductSlugs: z.array(z.string()),
  relatedGuideSlugs: z.array(z.string()),
  featured: z.boolean(),
  bestSeller: z.boolean(),
});

export const articleSectionSchema = z.object({
  heading: z.string(),
  body: z.string(),
});

export const articleFaqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const articleSchema = z.object({
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  type: z.enum(["buying-guide", "blog", "comparison"]),
  coverImage: z.string(),
  publishedAt: z.string(),
  updatedAt: z.string(),
  author: z.string(),
  readingMinutes: z.number().int().positive(),
  categorySlugs: z.array(z.string()),
  relatedProductSlugs: z.array(z.string()),
  sections: z.array(articleSectionSchema),
  faqs: z.array(articleFaqSchema),
});

export const faqSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
  group: z.enum(["global", "category", "affiliate"]),
});
