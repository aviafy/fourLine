interface Company {
  name: string;
  city: string;
  country: string;
  serviceArea: string;
  phone: string;
  email: string;
  legalName: string;
  logoPath: string;
  description: string;
}

export const company: Company = {
  name: "FOURLINE",
  city: "თბილისი",
  country: "საქართველო",
  serviceArea: "თბილისი და მსხვილი პროექტები საქართველოს მასშტაბით",
  // TODO: Add owner-approved contact, registration, and brand information.
  phone: process.env.FOURLINE_PHONE?.trim() || "",
  email: process.env.FOURLINE_EMAIL?.trim() || "",
  legalName: "",
  logoPath: "",
  description: "ელექტროსამონტაჟო სამუშაოები და სუსტი დენების სისტემები საცხოვრებელი და კომერციული მშენებლობისთვის თბილისში და საქართველოს მასშტაბით.",
};

export const siteUrl = process.env.SITE_URL ? new URL(process.env.SITE_URL) : undefined;
export const allowIndexing = siteUrl?.protocol === "https:" && process.env.SITE_INDEXABLE === "true";
