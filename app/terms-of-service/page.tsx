import { buildMetadata } from "@/lib/seo";
import { SimplePage } from "@/components/shared/simple-page";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "Terms governing use of Sea Supply Hub.",
  path: "/terms-of-service",
});

export default function TermsPage() {
  return (
    <SimplePage title="Terms of Service" intro="By using Sea Supply Hub, you agree to these terms.">
      <p className="text-slate-700">
        Content is provided for informational purposes and partner purchase routing. Final pricing, inventory, and order handling are controlled by external merchants.
      </p>
    </SimplePage>
  );
}
