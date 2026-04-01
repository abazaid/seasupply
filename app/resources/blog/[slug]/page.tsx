import { notFound } from "next/navigation";
import { ArticleDetail } from "@/components/shared/article-detail";
import { articles, getArticleBySlug } from "@/data";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return articles.filter((article) => article.type === "blog").map((article) => ({ slug: article.slug }));
}

type BlogParams = { slug: string };

export async function generateMetadata({ params }: { params: BlogParams | Promise<BlogParams> }) {
  const { slug } = await Promise.resolve(params);
  const article = getArticleBySlug(slug);
  if (!article || article.type !== "blog") {
    return buildMetadata({ title: "Article Not Found", description: "Article not found.", path: "/resources/blog" });
  }
  return buildMetadata({ title: article.title, description: article.excerpt, path: `/resources/blog/${article.slug}` });
}

export default async function BlogDetailPage({ params }: { params: BlogParams | Promise<BlogParams> }) {
  const { slug } = await Promise.resolve(params);
  const article = getArticleBySlug(slug);
  if (!article || article.type !== "blog") notFound();
  return <ArticleDetail article={article} pathPrefix="/resources/blog" />;
}
