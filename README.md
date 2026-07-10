# Wojciech Sacewicz Portfolio

Production portfolio for Wojciech "Wojtek" Sacewicz, positioned as an AI-native developer and AI-assisted product engineer.

## Commands

```bash
pnpm install
pnpm dev
pnpm check
pnpm preview
```

`pnpm check` runs the complete local quality gate: generated Worker bindings, TypeScript, Oxlint, Vitest, the production build and a Wrangler deployment dry-run.

## Private Cloudflare deployment

The site is deployed as a Cloudflare Worker with Static Assets. `run_worker_first` is enabled so every request, including direct asset requests, passes through the authentication layer before Cloudflare serves it.

```bash
pnpm deploy:private
# equivalent explicit command after building:
npx wrangler deploy
```

The private preview uses HTTP Basic Auth. The username and SHA-256 password digest are declared in `wrangler.jsonc`; the plaintext password is stored only in the ignored local `.preview-credentials` file. Responses include `X-Robots-Tag: noindex, nofollow, noarchive` and private cache headers.

Run `pnpm cloudflare:types` after changing bindings or Wrangler configuration.

## Architecture

The codebase is organized by ownership rather than by file type alone.

- `src/app/` owns application composition and browser runtime orchestration.
- `src/components/` contains shared interface modules used across features.
- `src/content/` is the typed source for recruiter-facing portfolio facts and links.
- `src/features/hero/` owns the opening narrative and lazy-loaded Three.js workflow scene.
- `src/features/work/` owns selected-project storytelling and remote-image fallbacks.
- `src/features/profile/` owns the operating model, experience and personal profile.
- `src/features/contact/` owns the technology band and conversion endpoint.
- `src/styles/` contains only global foundations. Feature styles stay beside the module that owns them.

The modules are intentionally substantial. Small helpers remain private inside their feature unless they represent a genuinely shared interface. This keeps related behavior local without turning the repository into a collection of shallow one-function files.

## Evidence policy

Public claims are sourced from the CV package. Content marked `[TO VERIFY]` in the source material is not promoted as a verified public claim. The portfolio does not invent clients, traction, metrics, testimonials or formal titles.

## Assets

Local personal assets and third-party asset sources are documented in [`ASSET-SOURCES.md`](./ASSET-SOURCES.md).
