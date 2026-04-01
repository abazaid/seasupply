import Link from "next/link";
import type { Article } from "@/types";
import { formatDate } from "@/lib/utils";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">{article.type.replace("-", " ")}</p>
      <h3 className="mt-1 text-lg font-semibold text-slate-900">
        <Link href={
          article.type === "buying-guide"
            ? `/resources/buying-guides/${article.slug}`
            : article.type === "comparison"
              ? `/resources/comparisons/${article.slug}`
              : `/resources/blog/${article.slug}`
        }>
          {article.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-slate-700">{article.excerpt}</p>
      <p className="mt-3 text-xs text-slate-500">Updated {formatDate(article.updatedAt)}</p>
    </article>
  );
}
