import { ServiceList } from "@/components/service-list";
import { PageIntro, ProposalBanner } from "@/components/shared";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "ელექტრო და საინჟინრო მომსახურება",
  description: "VoltNet-ის მომსახურება თბილისში. ელექტრომონტაჟი, ელექტროფარების აწყობა, სახანძრო სიგნალიზაცია, სუსტი დენები და სტრუქტურირებული კაბელირება.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageIntro items={[{ href: "/services", label: "მომსახურება" }]} label="მომსახურება"
        title="ელექტრო და საინჟინრო სისტემები" description="ცალკეული სამონტაჟო სამუშაოები და სრული პაკეტები საცხოვრებელი და კომერციული ობიექტებისთვის." />
      <section className="section-pad listing-section" aria-labelledby="services-list-title">
        <div className="container"><h2 id="services-list-title" className="sr-only">მომსახურებების ჩამონათვალი</h2><ServiceList /></div>
      </section>
      <ProposalBanner />
    </>
  );
}
