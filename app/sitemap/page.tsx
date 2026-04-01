import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

const links = [
  "/",
  "/about",
  "/contact",
  "/categories",
  "/brands",
  "/deals",
  "/resources",
  "/faq",
  "/help-center",
  "/affiliate-disclosure",
  "/privacy-policy",
  "/terms-of-service",
];

export const metadata = buildMetadata({
  title: "HTML Sitemap",
  description: "Browse important Sea Supply Hub sections from one page.",
  path: "/sitemap",
});

export default function HtmlSitemapPage() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <h1 className="text-3xl font-semibold text-slate-900">HTML Sitemap</h1>
      <ul className="mt-5 grid gap-2 text-sky-700 md:grid-cols-2">
        {links.map((href) => (
          <li key={href}>
            <Link href={href} className="hover:underline">
              {href}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
