import { projectTypes, proposalLabels } from "@/data/proposal";
import type { Proposal } from "./proposal-schema";

function deliveryConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.PROPOSAL_FROM_EMAIL?.trim();
  const to = process.env.PROPOSAL_TO_EMAIL?.trim();
  return apiKey && from && to ? { apiKey, from, to } : null;
}

export function proposalDeliveryReady() {
  return Boolean(deliveryConfig());
}

export async function deliverProposal(proposal: Proposal, idempotencyKey: string) {
  const config = deliveryConfig();
  if (!config) return "unconfigured";

  const { name, company, phone, email, projectType, location, description } = proposal;
  const text = [
    `${proposalLabels.name}: ${name}`,
    `${proposalLabels.company}: ${company}`,
    `${proposalLabels.phone}: ${phone}`,
    `${proposalLabels.email}: ${email}`,
    `${proposalLabels.projectType}: ${projectTypes[projectType]}`,
    `${proposalLabels.location}: ${location}`,
    "",
    description,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      cache: "no-store",
      signal: AbortSignal.timeout(9000),
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `fourline-proposal/${idempotencyKey}`,
      },
      body: JSON.stringify({
        from: config.from, to: [config.to], reply_to: email,
        subject: "FOURLINE — ახალი მოთხოვნა", text,
      }),
    });
    if (response.ok) {
      const result = await response.json();
      if (typeof result.id === "string" && result.id) return "accepted";
    }
    console.error("Proposal provider returned an unexpected response", response.status);
  } catch {
    console.error("Could not reach the proposal provider");
  }

  return "failed";
}
