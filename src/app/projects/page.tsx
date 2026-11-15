import Link from "next/link";
import { ProjectCard } from "@/components/projects";
import { PageIntro, ProposalBanner } from "@/components/shared";
import { projectOrigins, projects, publishedProjects, type ProjectOrigin } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

const types = Array.from(new Set(publishedProjects.flatMap((project) => project.buildingType ? [project.buildingType] : [])));

export const metadata = pageMetadata({
  title: "პროექტები და გამოცდილება",
  description: "FOURLINE-ის სახელით შესრულებული სამუშაოები და კომპანიის დაარსებამდე დამფუძნებლების მიერ შესრულებული პროექტები.",
  path: "/projects",
  indexable: publishedProjects.length > 0,
});

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ type?: string | string[] }> }) {
  const { type } = await searchParams;
  const activeType = types.find((item) => type === item);
  const origins: ProjectOrigin[] = ["founders", "fourline"];
  return (
    <>
      <PageIntro items={[{ href: "/projects", label: "პროექტები" }]} label="პორტფოლიო"
        title="პროექტები და გამოცდილება" description="გაეცანით FOURLINE-ის პროექტებსა და დამფუძნებლების მიერ კომპანიის შექმნამდე შესრულებულ სამუშაოებს." />
      <section className="section-pad listing-section" aria-label="პროექტების პორტფოლიო">
        <div className="container">
          {types.length > 1 && <nav className="filter-list" aria-label="გაფილტვრა შენობის ტიპით">
            <Link href="/projects" aria-current={!activeType ? "page" : undefined}>ყველა</Link>
            {types.map((name) => <Link key={name} href={{ pathname: "/projects", query: { type: name } }}
              aria-current={activeType === name ? "page" : undefined}>{name}</Link>)}
          </nav>}
          {origins.map((origin) => {
            const entries = publishedProjects.filter((project) => project.origin === origin);
            const visible = activeType ? entries.filter((project) => project.buildingType === activeType)
              : entries.length ? entries : projects.filter((project) => project.origin === origin);
            if (!visible.length) return null;
            return (
              <section className="project-group" key={origin} aria-labelledby={`portfolio-${origin}`}>
                <div className="section-head">
                  <div><h2 id={`portfolio-${origin}`}>{projectOrigins[origin].label}</h2><p>{projectOrigins[origin].description}</p></div>
                </div>
                <div className="project-grid">{visible.map((project) => <ProjectCard project={project} key={project.slug} />)}</div>
              </section>
            );
          })}
        </div>
      </section>
      <ProposalBanner />
    </>
  );
}
