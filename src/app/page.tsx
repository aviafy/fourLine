import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Founders } from "@/components/founders";
import { ProjectCard } from "@/components/projects";
import { ServiceList } from "@/components/service-list";
import { JsonLd, Label, Photo, ProposalBanner, ProposalButton, TextLink } from "@/components/shared";
import { company, siteUrl } from "@/data/company";
import { imagery } from "@/data/images";
import { processSteps } from "@/data/process";
import { isPublishedProject, projects, publishedProjects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `ელექტროსამონტაჟო სამუშაოები თბილისში | ${company.name}`,
  description: company.description,
  path: "/",
});

export default function Home() {
  const featured = publishedProjects.filter((project) => project.featured);
  const shown = (featured.length ? featured : publishedProjects.length ? publishedProjects : projects).slice(0, 3);
  const hasProjects = shown.some(isPublishedProject);

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: company.name,
        url: siteUrl.href,
        inLanguage: "ka",
      }} />
      <section className="hero">
        <Photo image={imagery.hero} className="hero-photo" sizes="100vw" preload />
        <div className="container hero-content">
          <span className="hero-tagline" lang="en">ELECTRICAL &amp; LOW VOLTAGE SYSTEMS</span>
          <h1>ელექტრო და <span>საინჟინრო სისტემები</span></h1>
          <p>ელექტრომონტაჟი, ქსელური ინფრასტრუქტურა და სახანძრო სიგნალიზაცია საცხოვრებელი და კომერციული ობიექტებისთვის.</p>
          <div className="hero-actions">
            <ProposalButton>მოითხოვეთ შეთავაზება</ProposalButton>
            <Link className="button button-glass" href="/projects">იხილეთ პროექტები <ArrowUpRight size={17} aria-hidden /></Link>
          </div>
        </div>
      </section>

      <section className="services-home" aria-label="მომსახურება">
        <div className="container">
          <ServiceList compact />
        </div>
      </section>

      <section className="intro section-pad" id="intro">
        <div className="container intro-grid">
          <div><Label>ჩვენ შესახებ</Label></div>
          <div>
            <h2>ელექტროსისტემები<br className="desktop-break" /> თანამედროვე შენობებისთვის</h2>
            <p>ვმუშაობთ დეველოპერებთან და გენერალურ კონტრაქტორებთან თბილისში. მსხვილ პროექტებს საქართველოს მასშტაბით ვიღებთ.</p>
            <TextLink href="/about">გაიცანით {company.name}</TextLink>
          </div>
        </div>
      </section>

      <section className="section-pad selected-projects">
        <div className="container">
          <div className="section-head">
            <div><Label>პორტფოლიო</Label><h2>{hasProjects ? "შერჩეული პროექტები" : "პროექტები და გამოცდილება"}</h2></div>
            <TextLink href="/projects">პორტფოლიოს ნახვა</TextLink>
          </div>
          <div className="project-grid">{shown.map((project) => <ProjectCard project={project} key={project.slug} />)}</div>
        </div>
      </section>

      <Founders />

      <section className="section-pad why-section">
        <div className="container why-grid">
          <Photo image={imagery.conduit} sizes="(max-width: 800px) 94vw, (max-width: 1340px) 44vw, 600px" />
          <div>
            <Label>თანამშრომლობა</Label>
            <h2>რატომ {company.name}</h2>
            <dl className="reason-list">
              <div><dt>ერთი სამონტაჟო პაკეტი</dt><dd>ელექტრო და სუსტი დენების სამუშაოებს საერთო გრაფიკით ვგეგმავთ.</dd></div>
              <div><dt>მასალების მოწოდების არჩევანი</dt><dd>შეგვიძლია ვიმუშაოთ თქვენი მასალებით ან მოწოდება ჩვენ ავიღოთ.</dd></div>
              <div><dt>ობიექტის მასშტაბზე მორგებული გუნდი</dt><dd>სამუშაო ძალას ეტაპებისა და პროექტის საჭიროებების მიხედვით ვზრდით.</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section-pad process-section">
        <div className="container">
          <div className="section-head"><div><Label>სამუშაო პროცესი</Label><h2>პირველი განხილვიდან ჩაბარებამდე</h2></div></div>
          <ol className="process-grid">
            {processSteps.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}
          </ol>
        </div>
      </section>

      <Photo image={imagery.facade} className="photo-strip" sizes="100vw" />
      <ProposalBanner />
    </>
  );
}
