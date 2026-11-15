import { Mail, MapPin, Phone } from "lucide-react";
import { ProposalForm } from "@/components/proposal-form";
import { Label, PageIntro } from "@/components/shared";
import { company } from "@/data/company";
import { proposalDeliveryReady } from "@/lib/proposal-delivery";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

const hasContact = Boolean(company.phone || company.email);

export const metadata = pageMetadata({
  title: "კონტაქტი და კომერციული შეთავაზება",
  description: "გაგვიზიარეთ თქვენი ობიექტის მდებარეობა, სამუშაოების მოცულობა და ვადები FOURLINE-ის კომერციული შეთავაზებისთვის.",
  path: "/contact",
  indexable: hasContact || proposalDeliveryReady(),
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
              {company.phone && <a href={`tel:${company.phone.replace(/[^+\d]/g, "")}`}><Phone size={19} aria-hidden />{company.phone}</a>}
              {company.email && <a href={`mailto:${company.email}`}><Mail size={19} aria-hidden />{company.email}</a>}
              {!hasContact && <p className="contact-pending">ტელეფონი და ელფოსტა დაემატება.</p>}
            </address>
          </aside>
          <div><h2 className="form-title">პროექტის მონაცემები</h2><ProposalForm deliveryReady={proposalDeliveryReady()} /></div>
        </div>
      </section>
    </>
  );
}
