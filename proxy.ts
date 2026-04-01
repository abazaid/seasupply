import { NextResponse } from "next/server";

export function proxy() {
  const response = NextResponse.next();

  // Keep HTML routes fresh so frequent content updates show quickly to users.
  response.headers.set("Cache-Control", "public, max-age=0, must-revalidate");

  return response;
}

export const config = {
  matcher: [
    "/",
    "/about",
    "/contact",
    "/deals",
    "/brands/:path*",
    "/categories/:path*",
    "/products/:path*",
    "/resources/:path*",
    "/faq",
    "/help-center",
    "/search",
    "/shipping-delivery",
    "/returns-policy",
    "/privacy-policy",
    "/terms-of-service",
    "/accessibility-statement",
    "/sitemap",
    "/marketplace-disclosure",
    "/featured-collections",
  ],
};
