import type { ImageAsset } from "./images";

export interface Founder {
  id: string;
  name: string | null;
  position: string;
  portrait: ImageAsset | null;
  yearsOfExperience?: number;
  shortBiography: string | null;
  fullBiography: string[];
  approach: string | null;
  specializations: string[];
  selectedProjects: string[];
}

// TODO: Replace empty fields with approved names, portraits, bios, and project references.
export const founders: Founder[] = [
  {
    id: "founder-one",
    name: "სესე ხარჩილავა",
    position: "VoltNet-ის თანადამფუძნებელი და დირექტორი",
    portrait: {
      src: "/images/founders/sese-kharchilava.webp",
      alt: "სესე ხარჩილავას პორტრეტი",
      position: "center 22%",
    },
    shortBiography: "ენერგეტიკისა და ელექტროინჟინერიის სპეციალისტი.",
    fullBiography: [
      "სესე ხარჩილავა ენერგეტიკისა და ელექტროინჟინერიის სპეციალისტია. პროფესიული საქმიანობა დაიწყო სს „თელასში“, შემდგომ კი მუშაობდა კერძო კომპანიებში.",
      "აქვს მრავალმხრივი გამოცდილება ელექტროენერგეტიკის, ელექტროინსტალაციის, სუსტი დენების, უსაფრთხოების სისტემებისა და სხვა საინჟინრო მიმართულებებით. უმუშავია საწარმოო, სასტუმრო, სასწავლო, კომერციულ და კერძო ობიექტებზე.",
      "ფლობს საინჟინრო ნახაზების წაკითხვის, ტექნიკური გადაწყვეტილებების მიღების, პროექტების ორგანიზებისა და სამუშაო ჯგუფების მართვის გამოცდილებას. განსაკუთრებულ ყურადღებას უთმობს სამუშაოების ხარისხს, ტექნიკური სტანდარტებისა და უსაფრთხოების ნორმების დაცვას.",
      "VoltNet-ში პასუხისმგებელია კომპანიის მართვაზე, საინჟინრო მიმართულების განვითარებასა და პროექტების ხარისხიან განხორციელებაზე.",
    ],
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
    fullBiography: [],
    approach: null,
    specializations: [],
    selectedProjects: [],
  },
];
