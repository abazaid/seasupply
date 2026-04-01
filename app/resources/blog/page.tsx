import { ArticleCard } from "@/components/shared/article-card";
import { getArticlesByType } from "@/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Marine Blog",
  description: "Seasonal maintenance, troubleshooting, and marine ownership insights.",
  path: "/resources/blog",
});

export default function BlogIndexPage() {
  const articles = getArticlesByType("blog");

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-900">Marine Blog</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => <ArticleCard key={article.slug} article={article} />)}
      </div>
    </section>
  );
}
