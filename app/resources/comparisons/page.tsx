import { ArticleCard } from "@/components/shared/article-card";
import { getArticlesByType } from "@/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Marine Product Comparisons",
  description: "Compare marine product types and use-cases with practical guidance.",
  path: "/resources/comparisons",
});

export default function ComparisonIndexPage() {
  const articles = getArticlesByType("comparison");

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-900">Comparisons</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => <ArticleCard key={article.slug} article={article} />)}
      </div>
    </section>
  );
}
