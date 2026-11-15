import Link from "next/link";
import { ArrowUpRight, Building2, ImageIcon } from "lucide-react";
import { isPublishedProject, projectOrigins, type Project } from "@/data/projects";
import { serviceBySlug } from "@/data/services";
import { Label, Photo } from "./shared";

export function ProjectCard({ project }: { project: Project }) {
  const published = isPublishedProject(project);
  return (
    <article className="project-card">
      <Link href={`/projects/${project.slug}`}>
        {published && project.cover ? <Photo image={project.cover} sizes="(max-width: 700px) 94vw, (max-width: 1340px) 45vw, 620px" /> : (
          <div className={`project-placeholder project-placeholder--${project.origin}`}>
            <Building2 aria-hidden size={50} strokeWidth={0.85} />
            <span><ImageIcon size={14} aria-hidden /> ფოტოს დამატება იგეგმება</span>
          </div>
        )}
        <div className="project-card-body">
          <div>
            <Label>{published ? projectOrigins[project.origin].label : "პორტფოლიო მზადდება"}</Label>
            <h3>{project.name}</h3>
            {published ? <p>{[project.location, project.buildingType, ...project.services.map((slug) => serviceBySlug.get(slug)?.shortTitle)].filter(Boolean).join(" · ")}</p>
              : <p>{projectOrigins[project.origin].description}</p>}
          </div>
          <span className="round-arrow"><ArrowUpRight size={19} aria-hidden /></span>
        </div>
      </Link>
    </article>
  );
}
