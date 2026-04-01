import { ArticleCard } from "@/components/shared/article-card";
import { getArticlesByType } from "@/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Marine Buying Guides",
  description: "Step-by-step marine buying guides for US boat owners.",
  path: "/resources/buying-guides",
});

export default function BuyingGuidesPage() {
  const guides = getArticlesByType("buying-guide");

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-900">Buying Guides</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((article) => <ArticleCard key={article.slug} article={article} />)}
      </div>
    </section>
  );
}
