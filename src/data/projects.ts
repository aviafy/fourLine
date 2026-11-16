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
  {
    slug: "batumi-school-21",
    name: "ბათუმის №21 საჯარო სკოლა",
    origin: "founders",
    status: "published",
    featured: true,
    buildingType: "საგანმანათლებლო დაწესებულება",
    location: "ბათუმი, დემეტრე თავდადებულის ქუჩა №61",
    overview: "ბათუმის №21 საჯარო სკოლის ახალ შენობაში შესრულდა სრული ელექტროსამონტაჟო სამუშაოები და მოეწყო საკომუნიკაციო და უსაფრთხოების სისტემები. სამუშაოების დასრულების შემდეგ ობიექტი 112-მა ჩაიბარა.",
    services: ["electrical-installation", "distribution-panels", "fire-safety", "low-voltage", "network-infrastructure", "complete-building-systems"],
    scope: [
      "შენობის სრული ელექტრომონტაჟი და ვენტილაციის მართვის ფარების აწყობა.",
      "ლიფტის შახტსა და კიბის უჯრედში ჰაერის დაწნევის ვენტილატორების მოწყობა.",
      "სახანძრო დეტექციის, ინტერნეტისა და ვიდეომეთვალყურეობის ქსელების კაბელირება და მოწყობა.",
      "გენერატორზე ავტომატური გადართვის ფარის (ATS) აწყობა და გამოცდა.",
    ],
    systems: [
      "ელექტრომომარაგება და განათება",
      "ვენტილაციის მართვა და ჰაერის დაწნევა",
      "ხანძრის აღმოჩენა და შეტყობინება",
      "ინტერნეტის ქსელი და ვიდეომეთვალყურეობის კამერები",
      "სარეზერვო კვებაზე ავტომატური გადართვა (ATS)",
    ],
    cover: { src: "/images/projects/batumi-school-21/cover.webp", alt: "ბათუმის №21 საჯარო სკოლის ფასადი ქუჩის მხრიდან", position: "center 43%" },
    gallery: [
      { src: "/images/projects/batumi-school-21/interior-lighting.webp", alt: "დასრულებული შიდა სივრცე ჩართული ჭერის განათებით" },
      { src: "/images/projects/batumi-school-21/ceiling-installation.webp", alt: "ჭერის განათება და სავენტილაციო არხი სამონტაჟო სამუშაოებისას" },
      { src: "/images/projects/batumi-school-21/cable-routes.webp", alt: "ჭერთან გაყვანილი კაბელები და სავენტილაციო არხი" },
      { src: "/images/projects/batumi-school-21/network-cabinet.webp", alt: "საკომუნიკაციო კარადა დამონტაჟებული მოწყობილობებითა და კაბელებით" },
      { src: "/images/projects/batumi-school-21/distribution-panel.webp", alt: "ელექტროგამანაწილებელი ფარი ავტომატური ამომრთველების ორი რიგით" },
      { src: "/images/projects/batumi-school-21/control-panel.webp", alt: "მართვის ფარის შიდა მოწყობილობები და სადენები" },
      { src: "/images/projects/batumi-school-21/transfer-switch.webp", alt: "გენერატორზე ავტომატური გადართვის ფარი (ATS)" },
      { src: "/images/projects/batumi-school-21/generator-controls.webp", alt: "გენერატორის მართვის ფარის შიდა მოწყობილობები" },
      { src: "/images/projects/batumi-school-21/generator.webp", alt: "სარეზერვო გენერატორი და მისი მართვის ეკრანი" },
    ],
  },
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
