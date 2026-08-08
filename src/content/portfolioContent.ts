import contentJson from './portfolioContent.json';

export type ProjectTone = 'steel' | 'slate' | 'dark';

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
  readonly caseStudyUrl: string;
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
  readonly startDate: string;
  readonly endDate?: string;
  readonly role: string;
  readonly company: string;
  readonly lead: string;
  readonly summary: string;
  readonly bullets: readonly string[];
}

export interface Technology {
  readonly slug: string;
  readonly label: string;
}

export interface EvidenceLink {
  readonly label: string;
  readonly url: string;
  readonly kind: string;
}

export interface CaseStudy {
  readonly slug: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly alternateName?: string;
  readonly datePublished: string;
  readonly dateModified: string;
  readonly description: string;
  readonly context: string;
  readonly roleAndBoundaries: string;
  readonly constraints: readonly string[];
  readonly implementation: readonly string[];
  readonly decisions: readonly string[];
  readonly aiWorkflow: readonly string[];
  readonly verification: readonly string[];
  readonly outcome: string;
  readonly measurement: string;
  readonly limitations: string;
  readonly technologies: readonly string[];
  readonly evidence: readonly EvidenceLink[];
  readonly liveUrl: string;
  readonly image: string;
  readonly entityType: 'SoftwareApplication' | 'WebSite' | 'Organization' | 'Article';
}

export interface PortfolioContent {
  readonly siteUrl: string;
  readonly lastModified: string;
  readonly person: {
    readonly name: string;
    readonly alternateName: string;
    readonly headline: string;
    readonly currentJobTitle: string;
    readonly location: string;
    readonly locationShort: string;
    readonly availability: string;
    readonly summary: string;
    readonly fit: string;
    readonly education: string;
    readonly languages: readonly string[];
    readonly knowsAbout: readonly string[];
    readonly links: {
      readonly portfolio: string;
      readonly github: string;
      readonly linkedin: string;
      readonly email: string;
    };
  };
  readonly navigationItems: readonly {
    readonly label: string;
    readonly href: string;
  }[];
  readonly proofPoints: readonly ProofPoint[];
  readonly roleMatches: readonly string[];
  readonly capabilityGroups: readonly {
    readonly title: string;
    readonly items: readonly string[];
  }[];
  readonly projects: readonly PortfolioProject[];
  readonly workflow: readonly WorkflowStep[];
  readonly experience: readonly ExperienceEntry[];
  readonly technologies: readonly Technology[];
  readonly caseStudies: readonly CaseStudy[];
  readonly faq: readonly {
    readonly question: string;
    readonly answer: string;
  }[];
}

const baseContent = contentJson as PortfolioContent;

function findBaseProject(id: string): PortfolioProject {
  const project = baseContent.projects.find((candidate) => candidate.id === id);

  if (!project) {
    throw new Error(`Missing base portfolio project: ${id}`);
  }

  return project;
}

const muminkTattooProject: PortfolioProject = {
  id: 'mumink-tattoo',
  number: '01',
  name: 'Mumink Tattoo',
  descriptor: 'Interactive tattoo portfolio and flashboard for a real studio.',
  summary:
    'A production website and lightweight CMS for a tattoo and permanent-makeup studio in Tczew. I designed and built the public experience, gallery management, Cloudflare Worker API, D1/R2 storage, deployment and local-search foundations.',
  evidence: [
    'Custom gallery CMS with image editing',
    'Cloudflare Worker, D1 and R2 architecture',
    'Local SEO and conversion-focused service pages',
  ],
  stack: ['React', 'TypeScript', 'Cloudflare', 'Hono'],
  url: 'https://muminktattoo.pl/',
  caseStudyUrl: 'https://muminktattoo.pl/',
  image: 'https://muminktattoo.pl/og-image.png',
  imageAlt: 'Mumink Tattoo studio website in Tczew',
  tone: 'dark',
};

const veldiaProject: PortfolioProject = {
  ...findBaseProject('veldia'),
  number: '02',
  descriptor: 'Mobile scheduling product for small shift-based teams.',
};

const dovistaProject: PortfolioProject = {
  ...findBaseProject('dovista'),
  number: '03',
  descriptor: 'OCR and SAP automation that cut reporting time by 40%.',
};

const llmPolskaProject: PortfolioProject = {
  ...findBaseProject('llmpolska'),
  number: '04',
  descriptor: 'Web studio building websites, stores and web apps for Polish businesses.',
};

const roleTailorProject: PortfolioProject = {
  id: 'roletailor',
  number: '05',
  name: 'RoleTailor',
  descriptor:
    'Local desktop app that turns one honest career profile into a focused CV for each role.',
  summary:
    'A local-first Linux desktop application that keeps career data and application workspaces on-device, uses Codex to tailor editable CVs from user-supplied facts and renders final PDFs through a trusted Chromium pipeline.',
  evidence: [
    'Local profile and isolated application workspaces',
    'Codex tailoring grounded in user-supplied career facts',
    'Trusted Chromium rendering for editable two-page PDFs',
  ],
  stack: ['Tauri', 'Rust', 'React', 'Codex'],
  url: 'https://github.com/wojciechsacewicz/RoleTailor',
  caseStudyUrl: 'https://github.com/wojciechsacewicz/RoleTailor',
  image:
    'https://raw.githubusercontent.com/wojciechsacewicz/RoleTailor/main/docs/screenshots/workspace.png',
  imageAlt: 'RoleTailor desktop application workspace',
  tone: 'slate',
};

const liveProductsProofPoint: ProofPoint = {
  value: '3 live',
  label: 'Products you can open',
  note: 'Veldia, llmpolska and Mumink Tattoo are shipped products, not portfolio exercises.',
};

export const portfolioContent: PortfolioContent = {
  ...baseContent,
  lastModified: '2026-08-08',
  proofPoints: baseContent.proofPoints.map((point) =>
    point.label === liveProductsProofPoint.label ? liveProductsProofPoint : point,
  ),
  projects: [
    muminkTattooProject,
    veldiaProject,
    dovistaProject,
    llmPolskaProject,
    roleTailorProject,
  ],
  faq: baseContent.faq.map((entry) =>
    entry.question === 'What evidence shows product and engineering ownership?'
      ? {
          ...entry,
          answer:
            'Live products including Veldia, llmpolska and Mumink Tattoo, commercial work at IDEGO, a deployed DOVISTA automation that reduced report generation time by 40% for the scoped workflow and the actively developed RoleTailor desktop application.',
        }
      : entry,
  ),
};

export const navigationItems = portfolioContent.navigationItems;
export const proofPoints = portfolioContent.proofPoints;
export const projects = portfolioContent.projects;
export const workflow = portfolioContent.workflow;
export const experience = portfolioContent.experience;
export const technologies = portfolioContent.technologies;
export const caseStudies = portfolioContent.caseStudies;
export const roleMatches = portfolioContent.roleMatches;
export const capabilityGroups = portfolioContent.capabilityGroups;
export const recruiterFaq = portfolioContent.faq;

export function isExternalUrl(url: string): boolean {
  return url.startsWith('https://') || url.startsWith('http://');
}
