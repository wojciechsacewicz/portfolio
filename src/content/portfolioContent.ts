export type ProjectTone = 'lime' | 'red' | 'dark';

export interface ProofPoint {
  readonly value: string;
  readonly label: string;
  readonly note: string;
}

export interface PortfolioProject {
  readonly id: string;
  readonly number: string;
  readonly name: string;
  readonly descriptor: string;
  readonly summary: string;
  readonly evidence: readonly string[];
  readonly stack: readonly string[];
  readonly url: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly tone: ProjectTone;
}

export interface WorkflowStep {
  readonly number: string;
  readonly title: string;
  readonly body: string;
}

export interface ExperienceEntry {
  readonly period: string;
  readonly role: string;
  readonly company: string;
  readonly lead: string;
  readonly bullets: readonly string[];
}

export interface Technology {
  readonly slug: string;
  readonly label: string;
}

export const navigationItems = [
  { label: 'Work', href: '#work' },
  { label: 'Method', href: '#method' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
] as const;

export const proofPoints = [
  {
    value: 'IDEGO',
    label: 'Practical ownership of an AI product',
    note: 'Commercial engineering, coordination, security and delivery.',
  },
  {
    value: '40%',
    label: 'Shorter report generation',
    note: 'UiPath and SAP automation designed and deployed at DOVISTA.',
  },
  {
    value: '2 live',
    label: 'Products you can open',
    note: 'Veldia and llmpolska are shipped products, not portfolio exercises.',
  },
] as const satisfies readonly ProofPoint[];

export const projects = [
  {
    id: 'veldia',
    number: '01',
    name: 'Veldia',
    descriptor: 'Shift work, moved from paper into a working product.',
    summary:
      'A mobile-first SaaS/PWA for small shift-based businesses. I work across the product: schedules, hours, availability, roles, onboarding, pricing, trial, SEO and the AI-assisted schedule draft.',
    evidence: [
      'Manager-reviewed AI schedule drafting',
      'Work-hour and schedule workflows',
      '30-day trial and conversion path',
    ],
    stack: ['React', 'PWA', 'Supabase', 'Cloudflare'],
    url: 'https://veldia.pl/',
    image: 'https://veldia.pl/assets/og-image.png',
    imageAlt: 'Veldia product interface and branding',
    tone: 'lime',
  },
  {
    id: 'llmpolska',
    number: '02',
    name: 'llmpolska',
    descriptor: 'A Polish home for practical AI work.',
    summary:
      'A community, tools and education platform built around React Router and Cloudflare Workers. The work combines engineering, positioning, brand, product navigation and an AI helper workflow.',
    evidence: [
      'React Router SSR on Cloudflare',
      'Community and AI-tool discovery surfaces',
      'Product positioning and distribution',
    ],
    stack: ['React Router', 'Cloudflare Workers', 'TypeScript'],
    url: 'https://llmpolska.pl/',
    image: 'https://llmpolska.pl/og-default.svg',
    imageAlt: 'llmpolska visual identity',
    tone: 'red',
  },
  {
    id: 'dovista',
    number: '03',
    name: 'DOVISTA automation',
    descriptor: 'A measured process improvement, not an automation demo.',
    summary:
      'I mapped the reporting process with stakeholders, built and deployed a UiPath robot for SAP-related work, added OCR and prepared management-facing adoption material.',
    evidence: [
      '40% shorter report generation',
      'Reduced manual data-entry risk',
      'Process mapping through deployment',
    ],
    stack: ['UiPath', 'SAP', 'Document Understanding', 'OCR'],
    url: '#experience',
    image: '/assets/agentic-systems-bg.png',
    imageAlt: 'Abstract system map used as a visual for the automation case study',
    tone: 'dark',
  },
] as const satisfies readonly PortfolioProject[];

export const workflow = [
  {
    number: '01',
    title: 'Clarify',
    body: 'Turn an unclear ticket into a bounded problem and acceptance criteria.',
  },
  {
    number: '02',
    title: 'Research',
    body: 'Map the repository, existing patterns, risks and reusable code.',
  },
  {
    number: '03',
    title: 'Build',
    body: 'Implement the smallest complete slice with agent-assisted iteration.',
  },
  {
    number: '04',
    title: 'Review',
    body: 'Inspect the diff, challenge assumptions and trace risky behavior.',
  },
  {
    number: '05',
    title: 'Verify',
    body: 'Run focused tests, browser checks and the production build.',
  },
  {
    number: '06',
    title: 'Deliver',
    body: 'Leave a clear change with evidence, rationale and a usable result.',
  },
] as const satisfies readonly WorkflowStep[];

export const experience = [
  {
    period: 'Apr 2026 — now',
    role: 'AI Native Developer Intern',
    company: 'IDEGO',
    lead:
      'Commercial engineering work across backend services, web features and developer workflows. The formal title is intern; the working scope includes practical project ownership.',
    bullets: [
      'Coordinate team contributions and take responsibility for coherent delivery, quality and security.',
      'Use Codex and Claude Code for repository research, implementation, refactoring, debugging, tests and documentation.',
      'Turn unclear requirements into scoped plans, working prototypes and PR-ready changes.',
    ],
  },
  {
    period: 'Aug — Sep 2025',
    role: 'RPA Intern',
    company: 'DOVISTA Polska',
    lead:
      'Owned an SAP-related reporting automation from process mapping through deployment and management demo.',
    bullets: [
      'Built and deployed the UiPath workflow with stakeholders in the loop.',
      'Cut report generation time by 40% and reduced manual data-entry risk.',
      'Used Document Understanding and OCR for purchasing-document data.',
    ],
  },
  {
    period: 'Nov 2024 — Jan 2026',
    role: 'Junior Recruiter',
    company: '4Specialist',
    lead:
      'Built operational discipline before moving fully into engineering: repeatable verification, documentation and clear communication.',
    bullets: [
      'Standardized driver-document checks and reduced avoidable correction loops.',
    ],
  },
] as const satisfies readonly ExperienceEntry[];

export const technologies = [
  { slug: 'react', label: 'React' },
  { slug: 'typescript', label: 'TypeScript' },
  { slug: 'cloudflare', label: 'Cloudflare' },
  { slug: 'nodedotjs', label: 'Node.js' },
  { slug: 'vite', label: 'Vite' },
  { slug: 'threejs', label: 'Three.js' },
  { slug: 'docker', label: 'Docker' },
  { slug: 'github', label: 'GitHub' },
] as const satisfies readonly Technology[];

export function getTechnologyIconUrl(slug: string): string {
  return `https://cdn.jsdelivr.net/npm/simple-icons@16.25.0/icons/${slug}.svg`;
}

export function isExternalUrl(url: string): boolean {
  return url.startsWith('https://') || url.startsWith('http://');
}
