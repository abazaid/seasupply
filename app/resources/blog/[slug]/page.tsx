import { notFound } from "next/navigation";
import { ArticleDetail } from "@/components/shared/article-detail";
import { articles, getArticleBySlug } from "@/data";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return articles.filter((article) => article.type === "blog").map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article || article.type !== "blog") {
    return buildMetadata({ title: "Article Not Found", description: "Article not found.", path: "/resources/blog" });
  }
  return buildMetadata({ title: article.title, description: article.excerpt, path: `/resources/blog/${article.slug}` });
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article || article.type !== "blog") notFound();
  return <ArticleDetail article={article} pathPrefix="/resources/blog" />;
}
