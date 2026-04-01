import { buildBrandsSitemap } from "@/lib/sitemap-xml";

export function GET() {
  return new Response(buildBrandsSitemap(), { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
