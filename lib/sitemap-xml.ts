import { siteConfig } from "@/config/site";
import { articlePaths, brandPaths, categoryPaths, productPaths, staticPages } from "@/lib/sitemap-data";

function xmlset(paths: string[]) {
  const now = new Date().toISOString();
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths
    .map((path) => `<url><loc>${siteConfig.url}${path}</loc><lastmod>${now}</lastmod></url>`)
    .join("")}</urlset>`;
}

export function buildPagesSitemap() {
  return xmlset(staticPages);
}

export function buildCategoriesSitemap() {
  return xmlset(categoryPaths);
}

export function buildProductsSitemap() {
  return xmlset(productPaths);
}

export function buildArticlesSitemap() {
  return xmlset(articlePaths);
}

export function buildBrandsSitemap() {
  return xmlset(brandPaths);
}
