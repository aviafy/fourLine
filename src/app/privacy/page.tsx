import { PageIntro, TextLink } from "@/components/shared";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "კონფიდენციალურობა",
  description: "როგორ მუშავდება FOURLINE-ის ვებგვერდზე კომერციული შეთავაზების ფორმით მოწოდებული ინფორმაცია.",
  path: "/privacy",
  indexable: false,
});

export default function PrivacyPage() {
  return (
    <>
      <PageIntro items={[{ href: "/privacy", label: "კონფიდენციალურობა" }]} label="მონაცემთა დამუშავება"
        title="კონფიდენციალურობა" description="ინფორმაცია კომერციული შეთავაზების მოთხოვნის ფორმის შესახებ." />
      <section className="section-pad container">
        <div className="prose-block privacy-content">
          <h2>რა ინფორმაცია იგზავნება</h2>
          <p>ფორმა მოიცავს სახელს, კომპანიას, ტელეფონს, ელფოსტასა და პროექტის მონაცემებს. გთხოვთ, აღწერაში მიუთითოთ მხოლოდ შეთავაზების მოსამზადებლად საჭირო ინფორმაცია.</p>
          <h2>რისთვის გამოიყენება მონაცემები</h2>
          <p>ფორმით მოწოდებული ინფორმაცია გამოიყენება პროექტის პირველადი განხილვისთვის და თქვენს მოთხოვნაზე პასუხის გასაცემად.</p>
          <h2>როგორ გადაეცემა მოთხოვნა</h2>
          <p>მიწოდების გააქტიურების შემდეგ ფორმა მოთხოვნას დაცული კავშირით გადასცემს საიტის სერვერს. სერვერი ელფოსტის მიწოდების სერვისით აგზავნის წერილს კომპანიის მისამართზე.</p>
          <h2>კონტაქტი</h2>
          {company.email ? <p>მონაცემების დამუშავების შესახებ შეგიძლიათ მოგვწეროთ ელფოსტაზე <a className="underline" href={`mailto:${company.email}`}>{company.email}</a>.</p>
            : <p>მონაცემების დამუშავებისთვის პასუხისმგებელი პირის საკონტაქტო ინფორმაცია დაემატება.</p>}
          <TextLink href="/contact#proposal">ფორმაზე დაბრუნება</TextLink>
        </div>
      </section>
    </>
  );
}
