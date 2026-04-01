import { notFound } from "next/navigation";
import { ArticleDetail } from "@/components/shared/article-detail";
import { articles, getArticleBySlug } from "@/data";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return articles.filter((article) => article.type === "comparison").map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article || article.type !== "comparison") {
    return buildMetadata({ title: "Comparison Not Found", description: "Comparison not found.", path: "/resources/comparisons" });
  }
  return buildMetadata({ title: article.title, description: article.excerpt, path: `/resources/comparisons/${article.slug}` });
}

export default function ComparisonDetailPage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article || article.type !== "comparison") notFound();
  return <ArticleDetail article={article} pathPrefix="/resources/comparisons" />;
}
