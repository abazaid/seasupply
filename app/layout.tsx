import type { Metadata } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";
import "@/app/globals.css";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { UtilityBar } from "@/components/layout/utility-bar";
import { StructuredData } from "@/components/shared/structured-data";
import { siteConfig } from "@/config/site";
import { parseHeadCode, readHeaderCode } from "@/lib/header-code";
import { organizationSchema, websiteSchema } from "@/lib/schema";

const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap", preload: false });
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif", display: "swap", preload: false });
export const dynamic = "force-dynamic";

function normalizeAttrName(name: string) {
  if (name === "http-equiv") return "httpEquiv";
  if (name === "crossorigin") return "crossOrigin";
  if (name === "referrerpolicy") return "referrerPolicy";
  if (name === "charset") return "charSet";
  return name;
}

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

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const code = await readHeaderCode();
  const tags = parseHeadCode(code);

  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <head>
        <script
          type="text/javascript"
          src="http://classic.avantlink.com/affiliate_app_confirm.php?mode=js&authResponse=2cfb4aaef52727b845753ac9ca8ff2afbe5c0e77"
        />
        {tags.map((item, index) => {
          const attrs: Record<string, string> = {};
          for (const [key, value] of Object.entries(item.attrs)) {
            attrs[normalizeAttrName(key)] = value;
          }

          if (item.tag === "script") {
            if (item.inner) {
              return <script key={`head-script-${index}`} {...attrs} dangerouslySetInnerHTML={{ __html: item.inner }} />;
            }
            return <script key={`head-script-${index}`} {...attrs} />;
          }

          if (item.tag === "style") {
            return <style key={`head-style-${index}`} {...attrs} dangerouslySetInnerHTML={{ __html: item.inner }} />;
          }

          if (item.tag === "noscript") {
            return <noscript key={`head-noscript-${index}`} {...attrs} dangerouslySetInnerHTML={{ __html: item.inner }} />;
          }

          if (item.tag === "meta") {
            if (attrs.value && !attrs.content) {
              attrs.content = attrs.value;
              delete attrs.value;
            }
            return <meta key={`head-meta-${index}`} {...attrs} />;
          }

          return <link key={`head-link-${index}`} {...attrs} />;
        })}
      </head>
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
