import type { ReactNode } from "react";

interface SimplePageProps {
  title: string;
  intro: string;
  children?: ReactNode;
}

export function SimplePage({ title, intro, children }: SimplePageProps) {
  return (
    <article className="mx-auto max-w-4xl space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
      <header>
        <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
        <p className="mt-3 text-slate-700">{intro}</p>
      </header>
      {children}
    </article>
  );
}
