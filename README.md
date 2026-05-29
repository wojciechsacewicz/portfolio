# sacewi.cz portfolio

Static personal portfolio for Wojciech Sacewicz.

## Overview

The site is a motion-heavy portfolio for automation, data pipeline, RPA, and video work. It keeps the original static HTML/CSS/JavaScript stack, bilingual EN/PL copy, theme toggle, deep-linked work sections, and setup galleries.

## Pages

- `/` - kinetic landing page with selected work and contact CTA
- `/work` - code, automation, and video projects
- `/about` - background and competencies
- `/contact` - email, LinkedIn, and CV links
- `/about/workspace` - workspace gallery
- `/about/windows` - Windows setup gallery and tool list

## Features

- bilingual UI with `localStorage` preference
- dark and light theme with `#3a566e` accent
- scroll reveals and CSS scroll-linked animation where supported
- reduced-motion fallback
- expandable work sections
- gallery lightbox

## Run locally

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.
