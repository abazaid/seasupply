import { FaqList } from "@/components/shared/faq-list";
import { faqs } from "@/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Marine FAQ Hub",
  description: "Answers to common marine product, safety, and marketplace shopping questions.",
  path: "/faq",
});

export default function FaqPage() {
  const items = faqs.map((item) => ({ question: item.question, answer: item.answer }));

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold text-slate-900">FAQ Hub</h1>
      <FaqList items={items} />
    </section>
  );
}

