interface Company {
  name: string;
  city: string;
  country: string;
  serviceArea: string;
  phones: { label: string; number: string }[];
  email: string;
  legalName: string;
  logoPath: string;
  description: string;
}

const phoneLabels = process.env.FOURLINE_PHONE?.split(",").map((phone) => phone.trim()).filter(Boolean);

export const company: Company = {
  name: "FOURLINE",
  city: "თბილისი",
  country: "საქართველო",
  serviceArea: "თბილისი და მსხვილი პროექტები საქართველოს მასშტაბით",
  phones: (phoneLabels?.length ? phoneLabels : ["+995 544 557 444", "+995 544 558 444"])
    .map((label) => ({ label, number: label.replace(/[^+\d]/g, "") })),
  email: process.env.FOURLINE_EMAIL?.trim() || "fourlineelectrics@gmail.com",
  // TODO: Add owner-approved registration and brand information.
  legalName: "",
  logoPath: "",
  description: "ელექტროსამონტაჟო სამუშაოები და სუსტი დენების სისტემები საცხოვრებელი და კომერციული მშენებლობისთვის თბილისში და საქართველოს მასშტაბით.",
};

export const hasPublicContact = company.phones.length > 0 || Boolean(company.email);

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
