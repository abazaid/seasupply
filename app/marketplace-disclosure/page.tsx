import { buildMetadata } from "@/lib/seo";
import { SimplePage } from "@/components/shared/simple-page";

export const metadata = buildMetadata({
  title: "Marketplace Disclosure",
  description: "How Sea Supply Hub links to trusted external stores and buying options.",
  path: "/marketplace-disclosure",
});

export default function MarketplaceDisclosurePage() {
  return (
    <SimplePage title="Marketplace Disclosure" intro="Sea Supply Hub helps shoppers research products and compare external buying options.">
      <p className="text-slate-700">
        Product pages may include outbound links to trusted merchants where live pricing, inventory, shipping, and returns are managed.
        Our editorial process prioritizes fit, relevance, and practical purchase guidance.
      </p>
    </SimplePage>
  );
}
