import { buildCategoriesSitemap } from "@/lib/sitemap-xml";

export function GET() {
  return new Response(buildCategoriesSitemap(), { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
