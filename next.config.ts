import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async redirects() {
    return [
      { source: "/learn", destination: "/resources", permanent: true },
      { source: "/guides", destination: "/resources/buying-guides", permanent: true },
      { source: "/sale", destination: "/deals", permanent: true },
    ];
  },
};

export default nextConfig;
