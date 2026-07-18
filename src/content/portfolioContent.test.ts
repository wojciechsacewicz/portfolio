import { describe, expect, it } from 'vitest';
import {
  caseStudies,
  experience,
  isExternalUrl,
  navigationItems,
  portfolioContent,
  projects,
  proofPoints,
  workflow,
} from './portfolioContent';

describe('portfolio content model', () => {
  it('keeps every featured project linked to evidence and a usable destination', () => {
    for (const project of projects) {
      expect(project.evidence.length).toBeGreaterThanOrEqual(3);
      expect(project.url.length).toBeGreaterThan(1);
      expect(
        isExternalUrl(project.caseStudyUrl) ||
          /^\/case-studies\/[a-z0-9-]+$/.test(project.caseStudyUrl),
      ).toBe(true);
      expect(project.summary).not.toContain('[TO VERIFY]');
    }
  });

  it('includes the live Mumink Tattoo client project', () => {
    expect(projects.find((project) => project.id === 'mumink-tattoo')).toMatchObject({
      name: 'Mumink Tattoo',
      url: 'https://muminktattoo.pl/',
      image: 'https://muminktattoo.pl/og-image.png',
      stack: ['React', 'TypeScript', 'Cloudflare', 'Hono'],
    });
  });

  it('preserves the recruiter scan path', () => {
    expect(proofPoints.map((point) => point.value)).toEqual(['IDEGO', '40%', '3 live']);
    expect(experience[0].company).toBe('IDEGO');
    expect(workflow.at(-1)?.title).toBe('Deliver');
  });

  it('keeps navigation targets unique and distinguishes anchors from dedicated routes', () => {
    const targets = navigationItems.map((item) => item.href);
    const anchors = targets.filter((target) => target.startsWith('#'));
    const routes = targets.filter((target) => target.startsWith('/'));

    expect(new Set(targets).size).toBe(targets.length);
    expect(anchors).toEqual(['#work', '#method', '#experience']);
    expect(routes).toEqual(['/resume', '/contact']);
  });

  it('keeps structured identity factual and professionally scoped', () => {
    expect(portfolioContent.person.currentJobTitle).toBe('AI Native Developer Intern');
    expect(portfolioContent.person.location).toContain('Tricity metropolitan area');
    expect(portfolioContent.person.knowsAbout).toContain('React');
    expect(portfolioContent.roleMatches).toContain('Full-Stack Developer');
  });

  it('keeps case studies evidence-rich without unsupported public metrics', () => {
    for (const study of caseStudies) {
      expect(study.constraints.length).toBeGreaterThanOrEqual(3);
      expect(study.implementation.length).toBeGreaterThanOrEqual(3);
      expect(study.decisions.length).toBeGreaterThanOrEqual(3);
      expect(study.verification.length).toBeGreaterThanOrEqual(3);
      expect(study.evidence.length).toBeGreaterThanOrEqual(2);
      expect(study.measurement.length).toBeGreaterThan(40);
      expect(study.limitations.length).toBeGreaterThan(40);
    }
  });

  it('distinguishes remote project destinations from local routes and anchors', () => {
    expect(isExternalUrl('https://veldia.pl/')).toBe(true);
    expect(isExternalUrl('/case-studies/veldia')).toBe(false);
    expect(isExternalUrl('#experience')).toBe(false);
  });
});
