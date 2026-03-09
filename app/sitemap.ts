import type { MetadataRoute } from "next";
import { AKTA_ENABLED } from "@/lib/features";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://titoksorozat.hu";
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${base}/kapcsolat`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/s29`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${base}/adatkezeles`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  if (!AKTA_ENABLED) return core;

  return [
    ...core,
    {
      url: `${base}/aktak`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/aktak/a-017`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
