import type { Metadata } from "next";
import { allowIndexing, company, siteUrl } from "@/data/company";
import { imagery, type ImageAsset } from "@/data/images";

export function absoluteUrl(path: string) {
  return siteUrl ? new URL(path, siteUrl).href : undefined;
}

export function pageMetadata({
  title,
  description,
  path,
  image = imagery.hero,
  indexable = true,
}: { title: string; description: string; path: string; image?: ImageAsset; indexable?: boolean }): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image.src);
  const images = imageUrl ? [{ url: imageUrl, alt: image.alt }] : undefined;
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
      images,
    },
    twitter: { card: images ? "summary_large_image" : "summary", title: socialTitle, description, images },
  };
}
