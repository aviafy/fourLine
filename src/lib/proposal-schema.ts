import { z } from "zod";
import { projectTypes } from "@/data/proposal";

const required = "შეავსეთ ეს ველი.";
const maxLength = "შეამცირეთ ტექსტის სიგრძე.";

export const proposalSchema = z.object({
  name: z.string().trim().min(2, required).max(120, maxLength),
  company: z.string().trim().min(2, required).max(160, maxLength),
  phone: z.string().trim().max(28, "შეიყვანეთ სწორი ტელეფონის ნომერი.").refine(
    (value) => /^\+?[\d(). -]+$/.test(value) && /^\d{7,15}$/.test(value.replace(/\D/g, "")),
    "შეიყვანეთ სწორი ტელეფონის ნომერი.",
  ),
  email: z.string().trim().max(254, maxLength).pipe(z.email("შეიყვანეთ სწორი ელფოსტის მისამართი.")),
  projectType: z.enum(projectTypesKeys(), { error: "აირჩიეთ ობიექტის ტიპი." }),
  location: z.string().trim().min(2, required).max(200, maxLength),
  description: z.string().trim().min(20, "აღწერა უნდა შეიცავდეს მინიმუმ 20 სიმბოლოს.").max(3000, maxLength),
  privacy: z.literal(true, { error: "მონიშნეთ კონფიდენციალურობის პირობებზე თანხმობა." }),
});

function projectTypesKeys() {
  return Object.keys(projectTypes) as (keyof typeof projectTypes)[];
}

export type Proposal = z.infer<typeof proposalSchema>;
export type ProposalErrors = Partial<Record<keyof Proposal, string[]>>;
