import { Founders } from "@/components/founders";
import { Label, PageIntro, ProposalBanner, TextLink } from "@/components/shared";
import { imagery } from "@/data/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "ჩვენ შესახებ",
  description: "გაიცანით FOURLINE-ის დამფუძნებლები და მათი გამოცდილება საცხოვრებელი და კომერციული შენობების ელექტროსისტემებში.",
  path: "/about",
});

export default function About() {
  return (
    <>
      <PageIntro items={[{ href: "/about", label: "ჩვენ შესახებ" }]} label="კომპანია" title="FOURLINE-ის შესახებ"
        description="ელექტრო და სუსტი დენების სისტემების სამონტაჟო გუნდი დეველოპერებისა და გენერალური კონტრაქტორებისთვის."
        image={imagery.facade} />
      <Founders full />
      <section className="section-pad">
        <div className="container intro-grid">
          <div><Label>როგორ ვმუშაობთ</Label></div>
          <div className="prose-block">
            <h2>შეთანხმებული მოცულობა და სამუშაო გრაფიკი</h2>
            <p>დამფუძნებლების გამოცდილება მოიცავს საცხოვრებელ და კომერციულ ობიექტებს. პროექტს ვეცნობით ნახაზებითა და ობიექტის პირობებით, შემდეგ კი სამუშაოების ეტაპებს მშენებლობის გრაფიკს ვუთანხმებთ.</p>
            <p>შეგვიძლია შევასრულოთ სრული ელექტრო და სუსტი დენების სამონტაჟო პაკეტი. პროექტის მოთხოვნების მიხედვით ვზრდით სამუშაო გუნდს და ვმუშაობთ როგორც დამკვეთის მასალებით, ისე მასალების მოწოდებით.</p>
            <TextLink href="/services">მომსახურებების ნახვა</TextLink>
          </div>
        </div>
      </section>
      <ProposalBanner />
    </>
  );
}
