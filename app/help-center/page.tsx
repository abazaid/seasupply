import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Help Center",
  description: "Find support resources, policy links, and learning paths.",
  path: "/help-center",
});

export default function HelpCenterPage() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <h1 className="text-3xl font-semibold text-slate-900">Help Center</h1>
      <p className="mt-3 text-slate-700">
        Use these support paths to solve common questions around trusted outbound links, shipping, policy, and category navigation.
      </p>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <Link href="/shipping-delivery" className="rounded-lg border border-slate-200 p-4 hover:bg-slate-50">Shipping & Delivery</Link>
        <Link href="/returns-policy" className="rounded-lg border border-slate-200 p-4 hover:bg-slate-50">Returns Policy</Link>
        <Link href="/marketplace-disclosure" className="rounded-lg border border-slate-200 p-4 hover:bg-slate-50">Marketplace Disclosure</Link>
        <Link href="/faq" className="rounded-lg border border-slate-200 p-4 hover:bg-slate-50">FAQ Hub</Link>
      </div>
    </section>
  );
}


