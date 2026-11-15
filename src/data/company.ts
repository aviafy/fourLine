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

const configuredUrl = process.env.SITE_URL?.trim();
export const siteUrl = configuredUrl ? new URL(configuredUrl) : undefined;

if (siteUrl && (
  !["http:", "https:"].includes(siteUrl.protocol) ||
  siteUrl.href !== `${siteUrl.origin}/`
)) {
  throw new Error("SITE_URL must be an HTTP or HTTPS origin without a path, query string, or fragment.");
}

const vercelEnvironment = process.env.VERCEL_ENV;
export const allowIndexing = siteUrl?.protocol === "https:" &&
  process.env.SITE_INDEXABLE === "true" &&
  (!vercelEnvironment || vercelEnvironment === "production");
