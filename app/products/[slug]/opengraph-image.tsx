import { ImageResponse } from "next/og";
import { getProductBySlug } from "@/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px",
          background: "linear-gradient(135deg, #0b2447, #0ea5e9)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 1 }}>Sea Supply Hub</div>
        <div style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.1 }}>{product?.name ?? "Marine Product"}</div>
        <div style={{ fontSize: 24, opacity: 0.9 }}>Affiliate Marine Buying Intelligence</div>
      </div>
    ),
    size,
  );
}
