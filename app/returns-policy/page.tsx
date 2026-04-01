import { buildMetadata } from "@/lib/seo";
import { SimplePage } from "@/components/shared/simple-page";

export const metadata = buildMetadata({
  title: "Returns Policy",
  description: "Returns are managed by partner merchants. Review policy guidance here.",
  path: "/returns-policy",
});

export default function ReturnsPolicyPage() {
  return (
    <SimplePage title="Returns Policy" intro="Sea Supply Hub does not process returns directly.">
      <p className="text-slate-700">
        Return windows, restocking fees, and eligibility are set by each partner merchant. Always verify return terms on the partner site before purchase.
      </p>
    </SimplePage>
  );
}
