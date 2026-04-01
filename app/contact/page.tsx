import { buildMetadata } from "@/lib/seo";
import { SimplePage } from "@/components/shared/simple-page";

export const metadata = buildMetadata({
  title: "Contact Sea Supply Hub",
  description: "Contact Sea Supply Hub for support, editorial corrections, and partnership inquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <SimplePage
      title="Contact"
      intro="Need help with a product guide, affiliate link, or content correction? Reach our support and editorial team."
    >
      <ul className="space-y-2 text-slate-700">
        <li>Email: support@seasupplyhub.com</li>
        <li>Partner Inquiries: partnerships@seasupplyhub.com</li>
        <li>Response Window: Mon-Fri, 8am-6pm ET</li>
      </ul>
    </SimplePage>
  );
}
