import { articles, brands, categories, faqs, products } from "@/data/loaders";
import type { Article, FaqItem, Product } from "@/types";

export { articles, brands, categories, faqs, products };

export const featuredBrands = brands.filter((brand) => brand.featured);
export const featuredProducts = products.filter((product) => product.featured);
export const bestSellers = products.filter((product) => product.bestSeller);

export const categoryMap = new Map(categories.map((item) => [item.slug, item]));
export const brandMap = new Map(brands.map((item) => [item.slug, item]));
export const productMap = new Map(products.map((item) => [item.slug, item]));
export const articleMap = new Map(articles.map((item) => [item.slug, item]));
export const faqMap = new Map(faqs.map((item) => [item.id, item]));

export function getCategoryBySlug(slug: string) {
  return categoryMap.get(slug);
}

export function getSubcategory(categorySlug: string, subcategorySlug: string) {
  return getCategoryBySlug(categorySlug)?.subcategories.find((sub) => sub.slug === subcategorySlug);
}

export function getBrandBySlug(slug: string) {
  return brandMap.get(slug);
}

export function getProductBySlug(slug: string) {
  return productMap.get(slug);
}

export function getArticleBySlug(slug: string) {
  return articleMap.get(slug);
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((product) => product.categorySlug === categorySlug);
}

export function getProductsBySubcategory(categorySlug: string, subcategorySlug: string) {
  return products.filter(
    (product) => product.categorySlug === categorySlug && product.subcategorySlug === subcategorySlug,
  );
}

export function getProductsByBrand(brandSlug: string) {
  return products.filter((product) => product.brandSlug === brandSlug);
}

export function getArticlesByType(type: "buying-guide" | "blog" | "comparison") {
  return articles.filter((article) => article.type === type);
}

export function getRelatedProducts(slugs: string[]): Product[] {
  return slugs
    .map((slug) => getProductBySlug(slug))
    .filter((item): item is Product => Boolean(item));
}

export function getRelatedArticles(slugs: string[]): Article[] {
  return slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((item): item is Article => Boolean(item));
}

export function getFaqsByIds(ids: string[]): FaqItem[] {
  return ids
    .map((id) => faqMap.get(id))
    .filter((item): item is FaqItem => Boolean(item));
}

export function searchContent(query: string) {
  const term = query.trim().toLowerCase();
  if (!term) return { products: [], articles: [], categories: [], brands: [] };

  return {
    products: products.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.shortDescription.toLowerCase().includes(term) ||
        item.highlights.some((highlight) => highlight.toLowerCase().includes(term)),
    ),
    articles: articles.filter(
      (item) => item.title.toLowerCase().includes(term) || item.excerpt.toLowerCase().includes(term),
    ),
    categories: categories.filter(
      (item) => item.name.toLowerCase().includes(term) || item.description.toLowerCase().includes(term),
    ),
    brands: brands.filter(
      (item) => item.name.toLowerCase().includes(term) || item.description.toLowerCase().includes(term),
    ),
  };
}
