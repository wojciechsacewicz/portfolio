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

export const portfolioContent = contentJson as PortfolioContent;

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
