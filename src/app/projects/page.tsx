import Link from "next/link";
import { ProjectCard } from "@/components/projects";
import { PageIntro, ProposalBanner } from "@/components/shared";
import { projectOrigins, projects, publishedProjects, type ProjectOrigin } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

const types = Array.from(new Set(publishedProjects.flatMap((project) => project.buildingType ? [project.buildingType] : [])));
const portfolio = publishedProjects.length ? publishedProjects : projects;

export const metadata = pageMetadata({
  title: "პროექტები და გამოცდილება",
  description: "გაეცანით შესრულებულ ელექტროსამონტაჟო სამუშაოებს, დამონტაჟებულ საინჟინრო სისტემებსა და ობიექტების ფოტოებს.",
  path: "/projects",
  indexable: publishedProjects.length > 0,
});

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ type?: string | string[] }> }) {
  const { type } = await searchParams;
  const activeType = types.find((item) => type === item);
  const origins: ProjectOrigin[] = ["founders", "voltnet"];
  return (
    <>
      <PageIntro items={[{ href: "/projects", label: "პროექტები" }]} label="პორტფოლიო"
        title="პროექტები და გამოცდილება" description="შესრულებული ელექტროსამონტაჟო სამუშაოები და საინჟინრო სისტემები." />
      <section className="section-pad listing-section" aria-label="პროექტების პორტფოლიო">
        <div className="container">
          {types.length > 1 && <nav className="filter-list" aria-label="გაფილტვრა შენობის ტიპით">
            <Link href="/projects" aria-current={!activeType ? "page" : undefined}>ყველა</Link>
            {types.map((name) => <Link key={name} href={{ pathname: "/projects", query: { type: name } }}
              aria-current={activeType === name ? "page" : undefined}>{name}</Link>)}
          </nav>}
          {origins.map((origin) => {
            const visible = portfolio.filter((project) =>
              project.origin === origin && (!activeType || project.buildingType === activeType),
            );
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
