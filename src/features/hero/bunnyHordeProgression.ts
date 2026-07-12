export const ROUND_DURATION_SECONDS = 60;

export type UpgradeStat = 'damage' | 'fireRate' | 'moveSpeed' | 'xpGain' | 'luck';

export interface PermanentUpgrades {
  readonly damage: number;
  readonly fireRate: number;
  readonly moveSpeed: number;
  readonly xpGain: number;
  readonly luck: number;
}

export const EMPTY_PERMANENT_UPGRADES: PermanentUpgrades = {
  damage: 0,
  fireRate: 0,
  moveSpeed: 0,
  xpGain: 0,
  luck: 0,
};

export interface RoundTuning {
  readonly spawnInterval: number;
  readonly enemyHealth: number;
  readonly enemySpeed: number;
  readonly enemyDamage: number;
  readonly enemyXp: number;
  readonly eliteChance: number;
}

export interface ScratchReward {
  readonly kind: 'temporary' | 'permanent';
  readonly rarity: 'common' | 'uncommon' | 'royal';
  readonly stat: UpgradeStat;
  readonly title: string;
  readonly description: string;
  readonly amount: number;
  readonly rounds: number;
  readonly bonusXp: number;
}

const TEMPORARY_REWARDS: ReadonlyArray<{
  readonly stat: UpgradeStat;
  readonly title: string;
  readonly description: string;
  readonly amount: number;
  readonly rounds: number;
}> = [
  {
    stat: 'damage',
    title: 'Silver Teeth',
    description: '+22% royal damage',
    amount: 0.22,
    rounds: 3,
  },
  {
    stat: 'fireRate',
    title: 'Rapid Paws',
    description: '+20% attack speed',
    amount: 0.2,
    rounds: 3,
  },
  {
    stat: 'moveSpeed',
    title: 'Velvet Boots',
    description: '+16% movement speed',
    amount: 0.16,
    rounds: 4,
  },
  {
    stat: 'xpGain',
    title: 'Royal Carrots',
    description: '+28% XP gained',
    amount: 0.28,
    rounds: 2,
  },
  {
    stat: 'luck',
    title: 'Lucky Whiskers',
    description: '+40% drop luck',
    amount: 0.4,
    rounds: 3,
  },
];

const PERMANENT_REWARDS: ReadonlyArray<{
  readonly stat: UpgradeStat;
  readonly title: string;
  readonly description: string;
}> = [
  { stat: 'damage', title: 'Crowned Fang', description: '+2.5% permanent damage' },
  { stat: 'fireRate', title: 'Clockwork Paw', description: '+2% permanent attack speed' },
  { stat: 'moveSpeed', title: 'Silk Step', description: '+1.5% permanent movement speed' },
  { stat: 'xpGain', title: 'Royal Ledger', description: '+2.5% permanent XP gain' },
  { stat: 'luck', title: 'House Favour', description: '+3% permanent drop luck' },
];

export function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

export function xpToNextLevel(level: number) {
  const safeLevel = Math.max(1, Math.floor(level));
  return Math.floor(26 + safeLevel * 10 + Math.pow(safeLevel, 1.42) * 5.2);
}

export function getRoundTuning(round: number): RoundTuning {
  const safeRound = Math.max(1, Math.floor(round));
  const lateRoundPressure = 1 + Math.max(0, safeRound - 10) * 0.025;

  return {
    spawnInterval: clamp(0.78 * Math.pow(0.935, safeRound - 1), 0.17, 0.78),
    enemyHealth: 13 * Math.pow(1.155, safeRound - 1) * lateRoundPressure,
    enemySpeed: clamp(1.55 + safeRound * 0.045, 1.55, 2.75),
    enemyDamage: 7 + safeRound * 1.15,
    enemyXp: Math.floor(5 + safeRound * 1.2 + Math.pow(safeRound, 1.08) * 0.65),
    eliteChance: clamp(0.025 + safeRound * 0.0075, 0.025, 0.19),
  };
}

export function getScratchDropChance(round: number, luckMultiplier: number) {
  const baseChance = clamp(0.045 + Math.max(0, round - 1) * 0.0015, 0.045, 0.07);
  return clamp(baseChance * Math.max(1, luckMultiplier), baseChance, 0.14);
}

export function getNintendoDropChance(round: number, luckMultiplier: number) {
  const baseChance = clamp(0.006 + Math.max(0, round - 1) * 0.00045, 0.006, 0.012);
  return clamp(baseChance * Math.max(1, luckMultiplier), baseChance, 0.035);
}

export function permanentMultiplier(stat: UpgradeStat, ranks: number) {
  const safeRanks = clamp(Math.floor(ranks), 0, 80);

  switch (stat) {
    case 'damage':
      return 1 + safeRanks * 0.025;
    case 'fireRate':
      return 1 + safeRanks * 0.02;
    case 'moveSpeed':
      return 1 + safeRanks * 0.015;
    case 'xpGain':
      return 1 + safeRanks * 0.025;
    case 'luck':
      return 1 + safeRanks * 0.03;
  }
}

export function rollScratchReward(
  random: () => number,
  round: number,
  level: number,
): ScratchReward {
  const royal = random() < 0.075;
  const bonusXp = Math.round(18 + round * 9 + level * 5.5);

  if (royal) {
    const reward = PERMANENT_REWARDS[Math.floor(random() * PERMANENT_REWARDS.length)]
      ?? PERMANENT_REWARDS[0];

    return {
      kind: 'permanent',
      rarity: 'royal',
      stat: reward.stat,
      title: reward.title,
      description: reward.description,
      amount: 1,
      rounds: 0,
      bonusXp: Math.round(bonusXp * 1.8),
    };
  }

  const reward = TEMPORARY_REWARDS[Math.floor(random() * TEMPORARY_REWARDS.length)]
    ?? TEMPORARY_REWARDS[0];
  const uncommon = random() < 0.28;

  return {
    kind: 'temporary',
    rarity: uncommon ? 'uncommon' : 'common',
    stat: reward.stat,
    title: reward.title,
    description: reward.description,
    amount: reward.amount * (uncommon ? 1.35 : 1),
    rounds: reward.rounds + (uncommon ? 1 : 0),
    bonusXp: Math.round(bonusXp * (uncommon ? 1.35 : 1)),
  };
}

export function incrementPermanentUpgrade(
  upgrades: PermanentUpgrades,
  stat: UpgradeStat,
): PermanentUpgrades {
  return {
    ...upgrades,
    [stat]: clamp(upgrades[stat] + 1, 0, 80),
  };
}

export function nintendoXpBase(round: number, level: number) {
  return Math.round(34 + round * 8 + xpToNextLevel(level) * 0.58);
}
