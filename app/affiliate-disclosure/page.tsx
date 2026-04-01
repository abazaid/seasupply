import { buildMetadata } from "@/lib/seo";
import { SimplePage } from "@/components/shared/simple-page";

export const metadata = buildMetadata({
  title: "Affiliate Disclosure",
  description: "Sea Supply Hub earns commissions through qualifying partner referrals.",
  path: "/affiliate-disclosure",
});

export default function AffiliateDisclosurePage() {
  return (
    <SimplePage title="Affiliate Disclosure" intro="Sea Supply Hub participates in affiliate programs.">
      <p className="text-slate-700">
        We may earn a commission when you click a partner link and complete a qualifying purchase. This does not increase your price. Our editorial process prioritizes relevance, fit, and practical value.
      </p>
    </SimplePage>
  );
}
