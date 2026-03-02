import type { MetadataRoute } from "next";
import { AKTA_ENABLED } from "@/lib/features";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: AKTA_ENABLED ? [] : ["/aktak", "/aktak/"],
    },
    sitemap: "https://titoksorozat.hu/sitemap.xml",
    host: "https://titoksorozat.hu",
  };
}
