import type { Metadata } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";
import "@/app/globals.css";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { UtilityBar } from "@/components/layout/utility-bar";
import { StructuredData } from "@/components/shared/structured-data";
import { siteConfig } from "@/config/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";

const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap", preload: false });
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Sea Supply Hub | Marine Electronics, Safety, Maintenance & More",
    template: "%s | Sea Supply Hub",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  category: "Marine Ecommerce marketplace",
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/images/sea-supply-icon.svg", type: "image/svg+xml" }],
    shortcut: ["/images/sea-supply-icon.svg"],
    apple: [{ url: "/images/sea-supply-icon.svg" }],
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Sea Supply Hub",
    description: siteConfig.description,
    locale: "en_US",
    images: [{ url: "/images/sea-supply-logo.svg", width: 512, height: 140, alt: "Sea Supply Hub logo" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/sea-supply-logo.svg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="font-[var(--font-sans)] antialiased">
        <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[70] focus:rounded-md focus:bg-white focus:px-3 focus:py-2">
          Skip to content
        </a>
        <StructuredData data={organizationSchema()} />
        <StructuredData data={websiteSchema()} />
        <AnnouncementBar />
        <UtilityBar />
        <SiteHeader />
        <main id="content" className="mx-auto w-full max-w-7xl px-4 py-8">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}

