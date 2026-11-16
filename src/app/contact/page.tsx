import { Mail, MapPin, Phone } from "lucide-react";
import { ProposalForm } from "@/components/proposal-form";
import { Label, PageIntro } from "@/components/shared";
import { company, hasPublicContact } from "@/data/company";
import { proposalDeliveryReady } from "@/lib/proposal-delivery";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "კონტაქტი და კომერციული შეთავაზება",
  description: "გაგვიზიარეთ თქვენი ობიექტის მდებარეობა, სამუშაოების მოცულობა და ვადები FOURLINE-ის კომერციული შეთავაზებისთვის.",
  path: "/contact",
  indexable: hasPublicContact || proposalDeliveryReady(),
});

export default function ContactPage() {
  return (
    <>
      <PageIntro items={[{ href: "/contact", label: "კონტაქტი" }]} label="კონტაქტი"
        title="მოითხოვეთ კომერციული შეთავაზება" description="მოგვწერეთ, რა ეტაპზეა მშენებლობა და რომელი სამონტაჟო სამუშაოები გჭირდებათ." />
      <section className="section-pad listing-section" id="proposal">
        <div className="container contact-grid">
          <aside className="contact-details">
            <Label>FOURLINE</Label><h2>დაგვიკავშირდით</h2>
            <address>
              <p><MapPin size={20} aria-hidden /><span><strong>{company.city}, {company.country}</strong><br />{company.serviceArea}</span></p>
              {company.phones.map(({ label, number }) => (
                <a key={number} href={`tel:${number}`}><Phone size={19} aria-hidden />{label}</a>
              ))}
              {company.email && <a href={`mailto:${company.email}`}><Mail size={19} aria-hidden /><span>{company.email}</span></a>}
              {!hasPublicContact && <p className="contact-pending">ტელეფონი და ელფოსტა დაემატება.</p>}
            </address>
          </aside>
          <div><h2 className="form-title">პროექტის მონაცემები</h2><ProposalForm deliveryReady={proposalDeliveryReady()} /></div>
        </div>
      </section>
    </>
  );
}
