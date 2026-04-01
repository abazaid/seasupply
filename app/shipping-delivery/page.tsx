import { buildMetadata } from "@/lib/seo";
import { SimplePage } from "@/components/shared/simple-page";

export const metadata = buildMetadata({
  title: "Shipping & Delivery",
  description: "Learn how shipping is handled by Sea Supply Hub partner merchants.",
  path: "/shipping-delivery",
});

export default function ShippingDeliveryPage() {
  return (
    <SimplePage title="Shipping & Delivery" intro="Sea Supply Hub does not ship products directly at this stage.">
      <p className="text-slate-700">
        Orders are completed on partner merchant websites. Shipping timelines, carrier options, and fulfillment terms vary by merchant and are shown during partner checkout.
      </p>
    </SimplePage>
  );
}
