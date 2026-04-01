import { articles } from "@/data";
import { siteConfig } from "@/config/site";

export function GET() {
  const items = articles
    .map((article) => {
      const path =
        article.type === "buying-guide"
          ? `/resources/buying-guides/${article.slug}`
          : article.type === "comparison"
            ? `/resources/comparisons/${article.slug}`
            : `/resources/blog/${article.slug}`;
      return `<item><title><![CDATA[${article.title}]]></title><link>${siteConfig.url}${path}</link><guid>${siteConfig.url}${path}</guid><description><![CDATA[${article.excerpt}]]></description><pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate></item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Sea Supply Hub Resources</title><link>${siteConfig.url}/resources</link><description>Marine buying guides and blog updates from Sea Supply Hub.</description>${items}</channel></rss>`;

  return new Response(rss, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
