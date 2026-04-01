import { buildMetadata } from "@/lib/seo";
import { SimplePage } from "@/components/shared/simple-page";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Review how Sea Supply Hub handles privacy and data usage.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <SimplePage title="Privacy Policy" intro="We respect your privacy and use data responsibly.">
      <p className="text-slate-700">
        Sea Supply Hub collects limited analytics and form data to improve user experience. We do not sell personal data. Partner merchants may apply their own privacy policies during checkout.
      </p>
    </SimplePage>
  );
}
