import type { ImageAsset } from "./images";

export type ProjectOrigin = "fourline" | "founders";

export interface Project {
  slug: string;
  name: string;
  origin: ProjectOrigin;
  status: "placeholder" | "published";
  featured?: boolean;
  buildingType?: string;
  location?: string;
  overview?: string;
  services: string[];
  scope: string[];
  systems: string[];
  challenges?: string;
  solutions?: string;
  cover?: ImageAsset;
  gallery: ImageAsset[];
  relatedProjects?: string[];
}

export const projectOrigins: Record<ProjectOrigin, { label: string; description: string }> = {
  founders: {
    label: "დამფუძნებლების გამოცდილება",
    description: "დამფუძნებლების მიერ FOURLINE-ის შექმნამდე შესრულებული სამუშაოები.",
  },
  fourline: {
    label: "FOURLINE-ის პროექტები",
    description: "კომპანიის სახელით შესრულებული სამუშაოები.",
  },
};

export const projects: Project[] = [
  // TODO: Replace reserved entries with documented projects. Approve publication after verifying attribution and assets.
  { slug: "founder-experience", name: "დამფუძნებლების გამოცდილება", origin: "founders", status: "placeholder", services: [], scope: [], systems: [], gallery: [] },
  { slug: "fourline-portfolio", name: "FOURLINE-ის პროექტები", origin: "fourline", status: "placeholder", services: [], scope: [], systems: [], gallery: [] },
];

export function isPublishedProject(project: Project) {
  return project.status === "published" && Boolean(
    project.location && project.buildingType && project.overview && project.scope.length &&
    project.systems.length && project.cover && !project.cover.illustrative,
  );
}

export const publishedProjects = projects.filter(isPublishedProject);
