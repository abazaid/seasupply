export type ArticleType = "buying-guide" | "blog" | "comparison";

export interface Subcategory {
  slug: string;
  name: string;
  description: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  seoIntro: string;
  subcategories: Subcategory[];
  featuredBrandSlugs: string[];
  faqIds: string[];
}

export interface Brand {
  slug: string;
  name: string;
  description: string;
  website: string;
  logoText: string;
  featured: boolean;
  logoUrl?: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface PartnerLink {
  label: string;
  url: string;
  network: string;
  merchant: string;
  lastChecked: string;
  availabilityNote: string;
  rel?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  seoTitle?: string;
  seoDescription?: string;
  price?: number;
  compareAtPrice?: number;
  currency?: string;
  brandSlug: string;
  categorySlug: string;
  subcategorySlug: string;
  sku: string;
  shortDescription: string;
  longDescription: string;
  highlights: string[];
  pros: string[];
  cons: string[];
  specs: ProductSpec[];
  compatibility: string[];
  images: string[];
  partnerLinks: PartnerLink[];
  relatedProductSlugs: string[];
  relatedGuideSlugs: string[];
  featured: boolean;
  bestSeller: boolean;
}

export interface ArticleSection {
  heading: string;
  body: string;
}

export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  type: ArticleType;
  coverImage: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  readingMinutes: number;
  categorySlugs: string[];
  relatedProductSlugs: string[];
  sections: ArticleSection[];
  faqs: ArticleFAQ[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  group: "global" | "category" | "marketplace";
}
