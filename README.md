# FOURLINE

Georgian-first corporate website for an electrical and building systems contractor in Tbilisi. The primary runtime is Next.js App Router with TypeScript, Tailwind CSS, self-hosted Georgian and Latin fonts, Lucide, and Zod.

## Local development

Use Node.js 22.12 or newer.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. The site works with the example configuration. The proposal form validates entries and displays an explicit development-mode message until email delivery is configured.

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

The Next.js build runs on a Node.js host. For private OpenAI Sites hosting, `npm run build:sites` builds the same App Router source for Workers with Vinext. The Sites project identity is in `.openai/hosting.json`. Set runtime secrets in the hosting dashboard.

## Edit content

| File | Content |
| --- | --- |
| `src/data/company.ts` | Company registration name, approved logo path, contact configuration, service area |
| `src/data/founders.ts` | Names, portraits, individual biographies, technical specialties, professional approach, and project slugs |
| `src/data/projects.ts` | Project attribution, building type, location, scope, systems, technical details, cover and gallery |
| `src/data/services.ts` | Service descriptions, work scopes and illustrations |
| `src/data/images.ts` | Image paths, Georgian alt text, illustrative labels and crop positions |

Place approved images under `public/images`. Use project origins `fourline` for work delivered under FOURLINE and `founders` for work the founders completed before it was formed. Set a project to `published` after verifying its location, building type, description, scope, systems and authentic cover image. Link service and founder records with their respective slugs. Reserved portfolio pages stay out of the sitemap and carry `noindex`.

## Proposal form

1. Verify a sending domain in [Resend](https://resend.com/docs/dashboard/domains/introduction).
2. Set `RESEND_API_KEY`, `PROPOSAL_FROM_EMAIL` from the verified domain, and `PROPOSAL_TO_EMAIL` for the inquiry inbox in the server environment.
3. Set `SITE_URL` to the exact canonical HTTPS origin. Set `FOURLINE_PHONE` and `FOURLINE_EMAIL` to the approved public contact details.
4. Rebuild with the production configuration, submit an inquiry, and verify it arrives in the inbox.

The POST handler validates the request with Zod, checks the request origin, limits the body size, and uses a honeypot, per-instance rate limiting and an idempotency key. The UI reports acceptance only after the provider returns a message ID. API keys are read exclusively on the server. Set `PROPOSAL_TRUSTED_IP_HEADER` only if your ingress overwrites that header with the verified client IP. Apply a shared edge rate limit to `POST /api/proposal` on multi-instance hosts if a uniform quota is needed.

## Public launch

Supply the approved circuit-4 logo, two founder profiles and portraits, attributable project records and photos, company legal details, and public contact information. Review the Georgian copy and the privacy notice in `src/app/privacy/page.tsx` against the actual service scope and data-handling practice. The privacy route stays excluded from indexing while the notice awaits approval.

On Vercel, import the repository with the **Next.js** framework preset and use `main` as the production branch. In Production environment variables, set `SITE_URL` to the final HTTPS domain origin. Keep Vercel system environment variables exposed so the application can identify Preview deployments.

After content and delivery are approved, set `SITE_INDEXABLE=true` in **Production** and redeploy. Verify that the homepage declares the final domain as canonical and submit `/sitemap.xml` in Google Search Console. Preview builds emit `noindex` and omit the sitemap reference from `robots.txt`.

## Illustrative images

ImageGen produced the photographic illustrations in `public/images`. The website labels them as illustrations. Replace them with owner-approved imagery when available.

- `architecture.webp` — Architectural editorial photograph of a Georgian residential building at blue hour, with stepped fair-faced concrete terraces, warm interior lights, and deep slate shadows.
- `facade.webp` — Upward editorial photograph between two narrow, parallel concrete façades, with graphite framing and overcast light.
- `conduit.webp`, `panels.webp`, `network.webp` — Three crops from an editorial contact sheet of a concrete service corridor, charcoal electrical distribution cabinets, a fire service illustration, and network racks.
- `alarm.webp`, `access-control.webp` — Two crops from a photographic diptych showing a smoke detector and manual alarm point, and a CCTV camera and card reader set into a concrete office entrance.
