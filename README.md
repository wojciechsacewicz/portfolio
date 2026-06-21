# sacewi.cz portfolio

Personal portfolio for Wojciech Sacewicz, focused on AI-native development and fast internal-tool prototyping.

## Overview

The site is a Vite + React portfolio with restrained GSAP reveals, native browser scrolling, local bundled fonts, bilingual EN/PL copy, deep-linked work sections, and setup galleries.

## Pages

- `/` - landing page with positioning, selected work and contact CTA
- `/work` - code, automation, and video projects
- `/veldia` - Veldia product teaser and SaaS landing page
- `/about` - background and competencies
- `/contact` - email, LinkedIn, and GitHub links
- `/about/workspace` - workspace gallery
- `/about/windows` - Windows setup gallery and tool list

## Features

- bilingual UI with `localStorage` preference
- `#3a566e` accent
- GSAP reveal and scroll progress motion
- Video.js players on `/work` with HLS playlists and `preload="none"`
- local Geist and JetBrains Mono fonts bundled into `build/`
- reduced-motion fallback
- gallery lightbox

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The Vite source lives in `app/` and `src/`. The built GitHub Pages fallback is copied into the repository root so the existing Pages branch-source setup still serves the site. The GitHub Actions workflow also deploys the generated `dist/` artifact when Pages is configured for Actions.
