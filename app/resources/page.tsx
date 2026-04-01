import Link from "next/link";
import { ArticleCard } from "@/components/shared/article-card";
import { articles } from "@/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Resources & Learn",
  description: "Marine buying guides, blog updates, and product comparisons.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-900">Resources / Learn</h1>
      <div className="flex flex-wrap gap-3 text-sm">
        <Link className="rounded-lg border border-slate-300 px-3 py-2 hover:bg-slate-100" href="/resources/buying-guides">Buying Guides</Link>
        <Link className="rounded-lg border border-slate-300 px-3 py-2 hover:bg-slate-100" href="/resources/blog">Blog</Link>
        <Link className="rounded-lg border border-slate-300 px-3 py-2 hover:bg-slate-100" href="/resources/comparisons">Comparisons</Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => <ArticleCard key={article.slug} article={article} />)}
      </div>
    </section>
  );
}
