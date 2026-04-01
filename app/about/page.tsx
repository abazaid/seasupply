import { buildMetadata } from "@/lib/seo";
import { SimplePage } from "@/components/shared/simple-page";

export const metadata = buildMetadata({
  title: "About Sea Supply Hub",
  description: "Learn how Sea Supply Hub helps US boaters research marine products and buy from trusted partners.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <SimplePage
      title="About Sea Supply Hub"
      intro="Sea Supply Hub is a US-focused marine ecommerce affiliate platform designed to help boat owners discover gear with confidence."
    >
      <p className="text-slate-700">
        We combine deep product taxonomy, expert educational content, and transparent affiliate relationships to create a better buying research experience.
        Our goal is simple: help you pick the right gear faster, with fewer costly mismatches.
      </p>
    </SimplePage>
  );
}
