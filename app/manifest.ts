import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sea Supply Hub",
    short_name: "SeaSupplyHub",
    description: "marketplace-first marine ecommerce platform for US boaters.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#0b2447",
    icons: [{ src: "/images/logo-mark.svg", sizes: "160x32", type: "image/svg+xml" }],
  };
}

