import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Featured Collections",
  description: "Curated marine product collections for key boating workflows.",
  path: "/featured-collections",
});

const collections = [
  { title: "Offshore Safety Setup", href: "/categories/safety" },
  { title: "Helm Electronics Upgrade", href: "/categories/electronics-navigation" },
  { title: "Spring Maintenance Reboot", href: "/categories/boat-maintenance" },
  { title: "Dock and Anchor Essentials", href: "/categories/anchor-docking" },
];

export default function FeaturedCollectionsPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-900">Featured Collections</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {collections.map((collection) => (
          <Link key={collection.title} href={collection.href} className="rounded-2xl border border-slate-200 bg-white p-6 hover:bg-slate-50">
            <h2 className="text-xl font-semibold text-slate-900">{collection.title}</h2>
          </Link>
        ))}
      </div>
    </section>
  );
}
