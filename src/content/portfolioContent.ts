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
  readonly entityType: 'SoftwareApplication' | 'WebSite' | 'Article';
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

const muminkTattooProject: PortfolioProject = {
  id: 'mumink-tattoo',
  number: '04',
  name: 'Mumink Tattoo',
  descriptor: 'A distinctive studio website backed by a custom media workflow.',
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

const liveProductsProofPoint: ProofPoint = {
  value: '3 live',
  label: 'Products you can open',
  note: 'Veldia, llmpolska and Mumink Tattoo are shipped products, not portfolio exercises.',
};

export const portfolioContent: PortfolioContent = {
  ...baseContent,
  lastModified: '2026-07-18',
  proofPoints: baseContent.proofPoints.map((point) =>
    point.label === liveProductsProofPoint.label ? liveProductsProofPoint : point,
  ),
  projects: [
    ...baseContent.projects.filter((project) => project.id !== muminkTattooProject.id),
    muminkTattooProject,
  ],
  faq: baseContent.faq.map((entry) =>
    entry.question === 'What evidence shows product and engineering ownership?'
      ? {
          ...entry,
          answer:
            'Live products including Veldia, llmpolska and Mumink Tattoo, commercial work at IDEGO and a deployed DOVISTA automation that reduced report generation time by 40% for the scoped workflow.',
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
