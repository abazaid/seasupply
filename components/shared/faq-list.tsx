interface FaqListProps {
  items: Array<{ question: string; answer: string }>;
}

export function FaqList({ items }: FaqListProps) {
  return (
    <section aria-labelledby="faq-heading" className="space-y-4">
      <h2 id="faq-heading" className="text-2xl font-semibold text-slate-900">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {items.map((item) => (
          <details key={item.question} className="rounded-xl border border-slate-200 bg-white p-4">
            <summary className="cursor-pointer font-medium text-slate-900">{item.question}</summary>
            <p className="mt-3 text-slate-700">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
