import type { MetadataRoute } from "next";
import { allowIndexing, hasPublicContact, siteUrl } from "@/data/company";
import { publishedProjects } from "@/data/projects";
import { services } from "@/data/services";
import { proposalDeliveryReady } from "@/lib/proposal-delivery";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!allowIndexing) return [];
  const paths = ["/", "/about", "/services", "/shop", ...services.map(({ slug }) => `/services/${slug}`)];
  if (hasPublicContact || proposalDeliveryReady()) paths.push("/contact");
  if (publishedProjects.length) paths.push("/projects", ...publishedProjects.map(({ slug }) => `/projects/${slug}`));
  return paths.map((path) => ({ url: new URL(path, siteUrl).href }));
}
