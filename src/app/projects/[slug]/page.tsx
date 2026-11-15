import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageIcon } from "lucide-react";
import { ProjectCard } from "@/components/projects";
import { Breadcrumbs, Label, Photo, ProposalBanner, TextLink } from "@/components/shared";
import { isPublishedProject, projectOrigins, projects, publishedProjects } from "@/data/projects";
import { serviceBySlug } from "@/data/services";
import { pageMetadata } from "@/lib/seo";

interface Props { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();
  return pageMetadata({
    title: project.name, description: project.overview ?? projectOrigins[project.origin].description,
    path: `/projects/${slug}`, image: project.cover?.src, indexable: isPublishedProject(project),
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();

  const published = isPublishedProject(project);
  const origin = projectOrigins[project.origin];
  const related = publishedProjects.filter((entry) => entry.slug !== slug &&
    (project.relatedProjects ? project.relatedProjects.includes(entry.slug) : entry.services.some((service) => project.services.includes(service)))).slice(0, 2);

  return (
    <>
      <section className="page-intro">
        <div className="container">
          <Breadcrumbs items={[{ href: "/projects", label: "პროექტები" }, { href: `/projects/${slug}`, label: project.name }]} />
          <Label>{published ? origin.label : "პორტფოლიო მზადდება"}</Label>
          <h1>{project.name}</h1>
          <p>{origin.description}</p>
        </div>
      </section>
      {published && project.cover ? (
        <>
          <Photo image={project.cover} className="project-cover" sizes="100vw" preload />
          <section className="section-pad">
            <div className="container detail-grid">
              <div className="prose-block">
                <h2>პროექტის მიმოხილვა</h2><p>{project.overview}</p>
                <h3>სამუშაოების მოცულობა</h3><ul className="scope-list">{project.scope.map((item) => <li key={item}>{item}</li>)}</ul>
                <h3>დამონტაჟებული სისტემები</h3><ul className="scope-list">{project.systems.map((item) => <li key={item}>{item}</li>)}</ul>
                {project.challenges && <><h3>ტექნიკური ამოცანები</h3><p>{project.challenges}</p></>}
                {project.solutions && <><h3>განხორციელებული გადაწყვეტები</h3><p>{project.solutions}</p></>}
              </div>
              <aside className="detail-aside">
                <dl><dt>ადგილმდებარეობა</dt><dd>{project.location}</dd><dt>შენობის ტიპი</dt><dd>{project.buildingType}</dd></dl>
                {project.services.length > 0 && <ul>{project.services.map((serviceSlug) => {
                  const service = serviceBySlug.get(serviceSlug);
                  return service && <li key={serviceSlug}><TextLink href={`/services/${serviceSlug}`}>{service.shortTitle}</TextLink></li>;
                })}</ul>}
              </aside>
            </div>
          </section>
          {project.gallery.length > 0 && <section className="container project-gallery" aria-labelledby="gallery-title">
            <div className="section-head"><h2 id="gallery-title">ფოტოგალერეა</h2></div>
            <ul className="project-grid">{project.gallery.map((image) => (
              <li key={image.src}><Link href={image.src} aria-label={`${image.alt} — სრული ზომის ნახვა`}>
                <Photo image={image} sizes="(max-width: 700px) 94vw, 43vw" />
              </Link></li>
            ))}</ul>
          </section>}
          {related.length > 0 && <section className="section-pad project-related"><div className="container">
            <div className="section-head"><h2>დაკავშირებული პროექტები</h2></div>
            <div className="project-grid">{related.map((entry) => <ProjectCard project={entry} key={entry.slug} />)}</div>
          </div></section>}
        </>
      ) : (
        <section className="section-pad listing-section">
          <div className="container detail-grid">
            <div className={`project-placeholder project-placeholder--${project.origin}`}><ImageIcon aria-hidden size={48} strokeWidth={1} /><span>ფოტოს დამატება იგეგმება</span></div>
            <div className="prose-block"><h2>დეტალები დაემატება</h2><p>პროექტების აღწერები და ფოტოები გამოქვეყნდება მასალების გადამოწმების შემდეგ.</p><TextLink href="/projects">პორტფოლიოზე დაბრუნება</TextLink></div>
          </div>
        </section>
      )}
      <ProposalBanner />
    </>
  );
}
