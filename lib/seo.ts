import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface SeoInput {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
}

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path}`;
}

export function buildMetadata({ title, description, path = "/", image, keywords = [] }: SeoInput): Metadata {
  const canonical = absoluteUrl(path);
  const ogImage = image ? absoluteUrl(image) : absoluteUrl("/og?title=Sea%20Supply%20Hub");

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
