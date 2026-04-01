import { buildMetadata } from "@/lib/seo";
import { SimplePage } from "@/components/shared/simple-page";

export const metadata = buildMetadata({
  title: "Accessibility Statement",
  description: "Sea Supply Hub accessibility commitment and support details.",
  path: "/accessibility-statement",
});

export default function AccessibilityStatementPage() {
  return (
    <SimplePage
      title="Accessibility Statement"
      intro="Sea Supply Hub is committed to an inclusive, accessible shopping and learning experience."
    >
      <p className="text-slate-700">
        We prioritize semantic HTML, keyboard-friendly navigation, focus visibility, and color contrast. If you encounter an accessibility issue, email support@seasupplyhub.com and include the page URL.
      </p>
    </SimplePage>
  );
}
