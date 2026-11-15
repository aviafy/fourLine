import type { Metadata } from "next";
import { allowIndexing, company, siteUrl } from "@/data/company";

export function absoluteUrl(path: string) {
  return siteUrl ? new URL(path, siteUrl).href : undefined;
}

export function pageMetadata({
  title,
  description,
  path,
  image = "/images/architecture.webp",
  indexable = true,
}: { title: string; description: string; path: string; image?: string; indexable?: boolean }): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = path === "/" ? title : `${title} | FOURLINE`;
  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: url ? { canonical: url } : undefined,
    robots: { index: Boolean(allowIndexing && indexable), follow: true },
    openGraph: {
      type: "website",
      locale: "ka_GE",
      siteName: company.name,
      title: socialTitle,
      description,
      url,
      images: [{ url: absoluteUrl(image) ?? image, alt: company.name }],
    },
    twitter: { card: "summary_large_image", title: socialTitle, description, images: [absoluteUrl(image) ?? image] },
  };
}
