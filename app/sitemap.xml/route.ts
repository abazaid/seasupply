import { siteConfig } from "@/config/site";

export function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap><loc>${siteConfig.url}/sitemaps/pages.xml</loc></sitemap>
    <sitemap><loc>${siteConfig.url}/sitemaps/categories.xml</loc></sitemap>
    <sitemap><loc>${siteConfig.url}/sitemaps/products.xml</loc></sitemap>
    <sitemap><loc>${siteConfig.url}/sitemaps/articles.xml</loc></sitemap>
    <sitemap><loc>${siteConfig.url}/sitemaps/brands.xml</loc></sitemap>
  </sitemapindex>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
