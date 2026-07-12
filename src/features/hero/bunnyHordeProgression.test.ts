import { describe, expect, it } from 'vitest';
import {
  EMPTY_PERMANENT_UPGRADES,
  getNintendoDropChance,
  getRoundTuning,
  incrementPermanentUpgrade,
  permanentMultiplier,
  rollScratchReward,
  xpToNextLevel,
} from './bunnyHordeProgression';

describe('bunny horde progression', () => {
  it('keeps level costs increasing without an early exponential wall', () => {
    const costs = Array.from({ length: 30 }, (_, index) => xpToNextLevel(index + 1));

    expect(costs.every((cost, index) => index === 0 || cost > costs[index - 1]!)).toBe(true);
    expect(costs[29]! / costs[0]!).toBeLessThan(40);
  });

  it('raises pressure while keeping browser-safe spawn and speed caps', () => {
    const first = getRoundTuning(1);
    const late = getRoundTuning(50);

    expect(late.enemyHealth).toBeGreaterThan(first.enemyHealth);
    expect(late.enemyXp).toBeGreaterThan(first.enemyXp);
    expect(late.spawnInterval).toBeGreaterThanOrEqual(0.17);
    expect(late.enemySpeed).toBeLessThanOrEqual(2.75);
  });

  it('caps drop chance even with extreme luck', () => {
    expect(getNintendoDropChance(100, 100)).toBeLessThanOrEqual(0.035);
  });

  it('makes permanent scratch rewards rare and bounded', () => {
    const royal = rollScratchReward(() => 0, 4, 8);
    expect(royal.kind).toBe('permanent');

    let upgrades = EMPTY_PERMANENT_UPGRADES;
    for (let index = 0; index < 200; index += 1) {
      upgrades = incrementPermanentUpgrade(upgrades, 'damage');
    }

    expect(upgrades.damage).toBe(80);
    expect(permanentMultiplier('damage', upgrades.damage)).toBe(3);
  });
});
