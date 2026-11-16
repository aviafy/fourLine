import type { Metadata } from "next";
import localFont from "next/font/local";
import { company, siteUrl } from "@/data/company";
import { SiteHeader } from "@/components/site-header";
import { JsonLd, SiteFooter } from "@/components/shared";
import "./globals.css";

const georgian = localFont({
  src: "../../node_modules/@fontsource-variable/noto-sans-georgian/files/noto-sans-georgian-georgian-wght-normal.woff2",
  variable: "--font-georgian",
  weight: "100 900",
  display: "swap",
  adjustFontFallback: false,
});

const latin = localFont({
  src: "../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  variable: "--font-latin",
  weight: "200 800",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: company.name, template: "%s | FOURLINE" },
  description: company.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ka" data-scroll-behavior="smooth" className={`${latin.variable} ${georgian.variable}`}>
      <body>
        <a className="skip-link" href="#main">ძირითად შინაარსზე გადასვლა</a>
        <SiteHeader logoPath={company.logoPath} />
        <main id="main">{children}</main>
        <SiteFooter />
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: company.name,
          description: company.description,
          ...(company.legalName && { legalName: company.legalName }),
          ...(siteUrl && { url: siteUrl.href }),
          ...(siteUrl && company.logoPath && { logo: new URL(company.logoPath, siteUrl).href }),
          ...(company.phones.length && { telephone: company.phones.map(({ number }) => number) }),
          ...(company.email && { email: company.email }),
          areaServed: [{ "@type": "City", name: "Tbilisi" }, { "@type": "Country", name: "Georgia" }],
        }} />
      </body>
    </html>
  );
}
