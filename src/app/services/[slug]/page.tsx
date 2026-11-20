import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/projects";
import { ServiceList } from "@/components/service-list";
import { JsonLd, Label, PageIntro, ProposalBanner, TextLink } from "@/components/shared";
import { company, siteUrl } from "@/data/company";
import { publishedProjects } from "@/data/projects";
import { serviceBySlug, services } from "@/data/services";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

interface Props { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = serviceBySlug.get(slug);
  if (!service) notFound();
  return pageMetadata({ title: service.title, description: service.summary, path: `/services/${slug}`, image: service.image });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = serviceBySlug.get(slug);
  if (!service) notFound();
  const href = `/services/${slug}`;
  const related = publishedProjects.filter((project) => project.services.includes(slug)).slice(0, 2);
  const others = services.filter((entry) => entry.slug !== slug).slice(0, 3);
  return (
    <>
      <PageIntro items={[{ href: "/services", label: "მომსახურება" }, { href, label: service.shortTitle }]}
        label="მომსახურება" title={service.title} description={service.introduction} image={service.image} />
      <section className="section-pad">
        <div className="container detail-grid">
          <div><Label>სამონტაჟო სამუშაოები</Label><h2>სამუშაოს მოცულობა</h2>
            <ul className="scope-list">{service.scope.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <aside className="detail-aside"><h3>რატომ {company.name}</h3>
            <p>სამუშაოების მოცულობას და მასალების მოწოდების ფორმას წინასწარ ვათანხმებთ. მონტაჟის ეტაპები მშენებლობის გრაფიკსა და სხვა სამონტაჟო გუნდების სამუშაოებს ერგება.</p>
            <TextLink href="/about#founders">დამფუძნებლების გამოცდილება</TextLink>
          </aside>
        </div>
      </section>
      {related.length > 0 && <section className="section-pad project-related"><div className="container">
        <div className="section-head"><h2>დაკავშირებული პროექტები</h2></div>
        <div className="project-grid">{related.map((project) => <ProjectCard project={project} key={project.slug} />)}</div>
      </div></section>}
      <section className="section-pad sibling-services">
        <div className="container">
          <div className="section-head"><h2>სხვა მომსახურებები</h2><TextLink href="/services">ყველა მომსახურება</TextLink></div>
          <ServiceList entries={others} />
        </div>
      </section>
      <ProposalBanner />
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "Service", name: service.title, description: service.summary,
        url: absoluteUrl(href), provider: { "@type": "Organization", name: company.name, url: siteUrl.href },
        areaServed: { "@type": "Country", name: "Georgia" },
      }} />
    </>
  );
}
