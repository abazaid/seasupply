import { buildArticlesSitemap } from "@/lib/sitemap-xml";

export function GET() {
  return new Response(buildArticlesSitemap(), { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
