import type { MetadataRoute } from "next";
import { allowIndexing } from "@/data/company";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return allowIndexing ? {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: absoluteUrl("/sitemap.xml"),
  } : { rules: { userAgent: "*", disallow: "/" } };
}
