# Wojciech Sacewicz Portfolio

Production portfolio for Wojciech "Wojtek" Sacewicz, positioned as an AI-native developer and AI-assisted product engineer.

## Highlights

- Interactive Three.js magnetic particle field with pointer response, click pulses, reduced-motion support and a non-WebGL fallback.
- Evidence-led project stories, including real Veldia product screens and a structured DOVISTA automation flow.
- Dated GitHub activity snapshot presented as a responsive full-year contribution grid.
- Dedicated contact route with copy/open actions and a scrolling technology and tools band.
- Dark editorial interface built around a restrained steel-blue design system.

## Commands

```bash
pnpm install
pnpm dev
pnpm check
pnpm preview
```

`pnpm check` runs the complete local quality gate: generated Worker bindings, TypeScript, Oxlint, Vitest, the production build and a Wrangler deployment dry-run.

## Cloudflare deployment

The site is deployed as a Cloudflare Worker with Static Assets at `https://sacewi.cz/`.
The SPA fallback keeps direct routes such as `/contact` working without a separate router server.

```bash
pnpm deploy
```

Production deployments are connected to the GitHub `main` branch through Cloudflare Workers Builds. The build command is `pnpm build` and the deploy command is `pnpm exec wrangler deploy`.

Every push to `main` should create a new Workers Build. `pnpm deploy` remains the manual fallback when the GitHub-triggered build is unavailable.

Run `pnpm cloudflare:types` after changing bindings or Wrangler configuration.

## Architecture

The codebase is organized by ownership rather than by file type alone.

- `src/app/` owns application composition and browser runtime orchestration.
- `src/components/` contains shared interface modules used across features.
- `src/content/` is the typed source for recruiter-facing portfolio facts and links.
- `src/features/hero/` owns the opening narrative and lazy-loaded Three.js magnetic particle field.
- `src/features/work/` owns selected-project storytelling, real product visuals and remote-image fallbacks.
- `src/features/profile/` owns the operating model, experience, GitHub activity and personal profile.
- `src/features/contact/` owns the technology/tools band and conversion endpoint.
- `src/styles/` contains only global foundations. Feature styles stay beside the module that owns them.

The modules are intentionally substantial. Small helpers remain private inside their feature unless they represent a genuinely shared interface. This keeps related behavior local without turning the repository into a collection of shallow one-function files.

## Evidence policy

Public claims are sourced from the CV package. Content marked `[TO VERIFY]` in the source material is not promoted as a verified public claim. The portfolio does not invent clients, traction, metrics, testimonials or formal titles.

## Assets

Local personal assets and third-party asset sources are documented in [`ASSET-SOURCES.md`](./ASSET-SOURCES.md).
