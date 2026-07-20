export const CRT_PROJECTS = [
  'veldia',
  'llmpolska',
  'mumink tattoo',
  'dovista automation',
] as const;

export const CRT_MONITOR_SPEC = {
  name: 'Portfolio CRT monitor',
  intendedUse: 'real-time browser hero prop',
  qualityContract: {
    complexity: 'complex',
    silhouette: 'late-1990s desktop CRT with a deep tapered shell and broad pedestal',
    reviewView: 'three-quarter front view with the right-side vents visible',
  },
  proportions: {
    body: [5.8, 4.55, 3.45],
    frontPanel: [5.35, 4.02, 0.46],
    screenOpening: [4.45, 3.1],
    pedestal: [4.15, 0.32, 2.4],
  },
  materials: {
    shell: { color: 0x5d5e60, roughness: 0.58, metalness: 0.12 },
    bezel: { color: 0x10161c, roughness: 0.38, metalness: 0.08 },
    trim: { color: 0x77797b, roughness: 0.5, metalness: 0.16 },
    darkPlastic: { color: 0x20252a, roughness: 0.68, metalness: 0.04 },
  },
  detailInventory: [
    'deep tapered rear shell',
    'recessed rounded screen bezel',
    'convex phosphor screen surface',
    'right-side ventilation slats',
    'lower front intake grille',
    'power knob and green status LED',
    'small embossed front badge',
    'two-piece swivel pedestal',
  ],
} as const;
