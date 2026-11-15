import type { ImageAsset } from "./images";

export interface Founder {
  id: string;
  name: string | null;
  position: string;
  portrait: ImageAsset | null;
  yearsOfExperience: number;
  shortBiography: string | null;
  fullBiography: string | null;
  approach: string | null;
  specializations: string[];
  selectedProjects: string[];
}

// TODO: Replace empty fields with approved names, portraits, bios, and project references.
export const founders: Founder[] = [
  {
    id: "founder-one",
    name: null,
    position: "თანადამფუძნებელი",
    portrait: null,
    yearsOfExperience: 10,
    shortBiography: null,
    fullBiography: null,
    approach: null,
    specializations: [],
    selectedProjects: [],
  },
  {
    id: "founder-two",
    name: null,
    position: "თანადამფუძნებელი",
    portrait: null,
    yearsOfExperience: 10,
    shortBiography: null,
    fullBiography: null,
    approach: null,
    specializations: [],
    selectedProjects: [],
  },
];
