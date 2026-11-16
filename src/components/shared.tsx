import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import type { ImageAsset } from "@/data/images";
import { company, siteUrl } from "@/data/company";
import { navigation } from "@/data/navigation";
import { absoluteUrl } from "@/lib/seo";
import { Brand } from "./site-header";

export function Label({ children }: { children: ReactNode }) {
  return <span className="section-label"><span aria-hidden="true" />{children}</span>;
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link className="text-link" href={href}>{children}<ArrowUpRight size={17} aria-hidden /></Link>;
}

export function ProposalButton({ children = "მოითხოვეთ კომერციული შეთავაზება" }: { children?: ReactNode }) {
  return <Link className="button button-accent" href="/contact#proposal">{children}<ArrowUpRight size={18} aria-hidden /></Link>;
}

export function Photo({ image, className = "", sizes, preload = false }: { image: ImageAsset; className?: string; sizes: string; preload?: boolean }) {
  return (
    <figure className={`photo ${className}`}>
      <Image src={image.src} alt={image.alt} fill sizes={sizes} preload={preload} style={image.position ? { objectPosition: image.position } : undefined} />
      {image.illustrative && <figcaption>საილუსტრაციო ვიზუალი</figcaption>}
    </figure>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

interface Crumb { label: string; href: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const crumbs = [{ label: "მთავარი", href: "/" }, ...items];
  return (
    <>
      <nav className="breadcrumbs" aria-label="გვერდის მდებარეობა">
        <ol>{crumbs.map(({ href, label }, index) => (
          <li key={href}>
            {index > 0 && <ChevronRight size={12} aria-hidden />}
            {index === crumbs.length - 1 ? <span aria-current="page">{label}</span> : <Link href={href}>{label}</Link>}
          </li>
        ))}</ol>
      </nav>
      {siteUrl && <JsonLd data={{
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        itemListElement: crumbs.map(({ href, label }, index) => ({ "@type": "ListItem", position: index + 1, name: label, item: absoluteUrl(href) })),
      }} />}
    </>
  );
}

export function PageIntro({ items, label, title, description, image }: { items: Crumb[]; label: string; title: string; description: string; image?: ImageAsset }) {
  return (
    <section className={`page-intro ${image ? "has-photo" : ""}`}>
      <div className="container">
        <Breadcrumbs items={items} />
        <div className="page-intro-grid">
          <div>
            <Label>{label}</Label>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          {image && <Photo image={image} sizes="(max-width: 800px) 94vw, (max-width: 1340px) 43vw, 560px" preload />}
        </div>
      </div>
    </section>
  );
}

export function ProposalBanner() {
  return (
    <section className="proposal-banner">
      <div className="container proposal-inner">
        <div><Label>დაგეგმეთ ჩვენთან ერთად</Label><h2>ვისაუბროთ თქვენს პროექტზე</h2>
          <p>გაგვიზიარეთ ობიექტის ტიპი, სამუშაოების მოცულობა და სავარაუდო ვადები.</p></div>
        <ProposalButton />
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div><Brand logoPath={company.logoPath} /><p>ელექტრო და საინჟინრო სისტემები<br />მშენებლობისთვის.</p></div>
          <nav aria-label="ქვედა მენიუ"><ul>{navigation.map(({ href, label }) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul></nav>
          <address>
            <p>{company.city}, {company.country}</p>
            {company.phones.map(({ label, number }) => <a key={number} href={`tel:${number}`}>{label}</a>)}
            {company.email && <a href={`mailto:${company.email}`}>{company.email}</a>}
            <Link href="/contact#proposal">პროექტის განხილვა <ArrowRight size={14} aria-hidden /></Link>
          </address>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} FOURLINE</span><Link href="/privacy">კონფიდენციალურობა</Link></div>
      </div>
    </footer>
  );
}
