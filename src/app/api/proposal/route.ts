import { createHash } from "node:crypto";
import { z } from "zod";
import { siteUrl } from "@/data/company";
import { deliverProposal, proposalDeliveryReady } from "@/lib/proposal-delivery";
import { proposalSchema } from "@/lib/proposal-schema";

const windowMs = 15 * 60 * 1000;
const bodyLimit = 24 * 1024;
const rate = new Map<string, { count: number; expires: number }>();

function checkRateLimit(request: Request) {
  const now = Date.now();
  for (const [key, bucket] of rate) {
    if (bucket.expires <= now) rate.delete(key);
  }
  const header = process.env.PROPOSAL_TRUSTED_IP_HEADER?.trim();
  const ip = header && request.headers.get(header)?.split(",")[0]?.trim().slice(0, 80);
  const key = ip ? createHash("sha256").update(ip).digest("hex") : "global";
  if (rate.size >= 5000 && !rate.has(key)) return 60;
  const bucket = rate.get(key) ?? { count: 0, expires: now + windowMs };
  if (bucket.count >= (ip ? 8 : 60)) return Math.ceil((bucket.expires - now) / 1000);
  bucket.count++;
  rate.set(key, bucket);
  return 0;
}

function json(payload: object, status: number, headers?: HeadersInit) {
  return Response.json(payload, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

async function readBody(request: Request) {
  if (!request.body) return { code: 400 } as const;
  if (Number(request.headers.get("content-length")) > bodyLimit) return { code: 413 } as const;

  const reader = request.body.getReader();
  try {
    let size = 0;
    let text = "";
    const decoder = new TextDecoder("utf-8", { fatal: true });
    while (true) {
      const { value, done } = await reader.read();
      if (done) return { data: JSON.parse(text + decoder.decode()) as unknown } as const;
      size += value.byteLength;
      if (size > bodyLimit) {
        await reader.cancel();
        return { code: 413 } as const;
      }
      text += decoder.decode(value, { stream: true });
    }
  } catch {
    await reader.cancel().catch(() => undefined);
    return { code: 400 } as const;
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (request.headers.get("sec-fetch-site") === "cross-site" || (origin && origin !== (siteUrl ?? new URL(request.url)).origin)) {
    return json({ code: "forbidden" }, 403);
  }
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
    return json({ code: "unsupported" }, 415);
  }

  const body = await readBody(request);
  if (body.code !== undefined) return json({ code: body.code === 413 ? "too_large" : "invalid" }, body.code);
  const envelope = z.object({
    requestId: z.uuid(),
    website: z.literal(""),
    proposal: z.unknown(),
  }).safeParse(body.data);
  if (!envelope.success) return json({ code: "invalid" }, 400);
  const proposal = proposalSchema.safeParse(envelope.data.proposal);
  if (!proposal.success) return json({ code: "validation", fields: z.flattenError(proposal.error).fieldErrors }, 422);
  if (!proposalDeliveryReady()) return json({ code: "unconfigured" }, 503);

  const retryAfter = checkRateLimit(request);
  if (retryAfter) return json({ code: "rate_limit" }, 429, { "Retry-After": String(retryAfter) });

  const result = await deliverProposal(proposal.data, envelope.data.requestId);
  if (result === "accepted") return json({ code: "accepted" }, 200);
  if (result === "unconfigured") return json({ code: "unconfigured" }, 503);
  return json({ code: "delivery_failed" }, 502);
}
