import type { Metadata } from "next";
import { allowIndexing, company, siteUrl } from "@/data/company";
import { imagery, type ImageAsset } from "@/data/images";

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).href;
}

export function pageMetadata({
  title,
  description,
  path,
  image = imagery.hero,
  indexable = true,
}: { title: string; description: string; path: string; image?: ImageAsset; indexable?: boolean }): Metadata {
  const url = absoluteUrl(path);
  const images = [{ url: absoluteUrl(image.src), alt: image.alt }];
  const socialTitle = path === "/" ? title : `${title} | ${company.name}`;
  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: { index: allowIndexing && indexable, follow: true },
    openGraph: {
      type: "website",
      locale: "ka_GE",
      siteName: company.name,
      title: socialTitle,
      description,
      url,
      images,
    },
    twitter: { card: "summary_large_image", title: socialTitle, description, images },
  };
}
