import { describe, expect, it } from 'vitest';
import {
  experience,
  isExternalUrl,
  navigationItems,
  projects,
  proofPoints,
  workflow,
} from './portfolioContent';

describe('portfolio content model', () => {
  it('keeps every featured project linked to evidence and a destination', () => {
    for (const project of projects) {
      expect(project.evidence.length).toBeGreaterThanOrEqual(3);
      expect(project.url.length).toBeGreaterThan(1);
      expect(project.summary).not.toContain('[TO VERIFY]');
    }
  });

  it('preserves the recruiter scan path', () => {
    expect(proofPoints.map((point) => point.value)).toEqual(['IDEGO', '40%', '2 live']);
    expect(experience[0].company).toBe('IDEGO');
    expect(workflow.at(-1)?.title).toBe('Deliver');
  });

  it('keeps navigation targets unique and points contact to its dedicated route', () => {
    const targets = navigationItems.map((item) => item.href);

    expect(new Set(targets).size).toBe(targets.length);
    expect(targets.filter((target) => target !== '/contact').every((target) => target.startsWith('#'))).toBe(true);
    expect(targets).toContain('/contact');
  });

  it('distinguishes remote project destinations from local anchors', () => {
    expect(isExternalUrl('https://veldia.pl/')).toBe(true);
    expect(isExternalUrl('#experience')).toBe(false);
  });
});
