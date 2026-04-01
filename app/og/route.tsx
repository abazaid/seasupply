import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Sea Supply Hub";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg,#0b2447,#0284c7)",
          color: "white",
          fontSize: 64,
          fontWeight: 700,
          padding: "40px",
          textAlign: "center",
        }}
      >
        {title}
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
