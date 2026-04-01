import { buildProductsSitemap } from "@/lib/sitemap-xml";

export function GET() {
  return new Response(buildProductsSitemap(), { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
