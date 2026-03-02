import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://titoksorozat.hu/sitemap.xml",
    host: "https://titoksorozat.hu",
  };
}
