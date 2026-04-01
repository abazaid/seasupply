import type { Article, Brand, Category, FaqItem, Product } from "@/types";
import articlesSeed from "@/data/seed/articles.json";
import brandsSeed from "@/data/seed/brands.json";
import categoriesSeed from "@/data/seed/categories.json";
import faqsSeed from "@/data/seed/faqs.json";
import productsSeed from "@/data/seed/products.json";
import {
  articleSchema,
  brandSchema,
  categorySchema,
  faqSchema,
  productSchema,
} from "@/data/schema";

export const categories = categorySchema.array().parse(categoriesSeed) as Category[];
export const brands = brandSchema.array().parse(brandsSeed) as Brand[];
export const products = productSchema.array().parse(productsSeed) as Product[];
export const articles = articleSchema.array().parse(articlesSeed) as Article[];
export const faqs = faqSchema.array().parse(faqsSeed) as FaqItem[];
