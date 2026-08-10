export interface ThemeSkin {
  id: string;
  name: string;
  '--t-bg': string;
  '--t-fg': string;
  '--t-accent': string;
  '--t-accent-light': string;
  '--t-border': string;
  '--t-font-heading': string;
  mood: 'dark' | 'light';
}

// Agency/Studio theme skins
export const agencyStudioSkins: ThemeSkin[] = [
  {
    id: 'dark-neon',
    name: 'Dark Neon',
    '--t-bg': '#0f172a',
    '--t-fg': '#f8fafc',
    '--t-accent': '#00ff88',
    '--t-accent-light': '#00ff88',
    '--t-border': '#1e293b',
    '--t-font-heading': '"Inter", sans-serif',
    mood: 'dark',
  },
  {
    id: 'dark-slate',
    name: 'Dark Slate',
    '--t-bg': '#1a202c',
    '--t-fg': '#e2e8f0',
    '--t-accent': '#60a5fa',
    '--t-accent-light': '#93c5fd',
    '--t-border': '#2d3748',
    '--t-font-heading': '"Inter", sans-serif',
    mood: 'dark',
  },
  {
    id: 'midnight-violet',
    name: 'Midnight Violet',
    '--t-bg': '#0d0221',
    '--t-fg': '#f0f0f0',
    '--t-accent': '#b537f2',
    '--t-accent-light': '#d8b4fe',
    '--t-border': '#2a1a3f',
    '--t-font-heading': '"Inter", sans-serif',
    mood: 'dark',
  },
];

// SaaS Landing theme skins
export const saasLandingSkins: ThemeSkin[] = [
  {
    id: 'light-minimal',
    name: 'Light Minimal',
    '--t-bg': '#ffffff',
    '--t-fg': '#0f172a',
    '--t-accent': '#3b82f6',
    '--t-accent-light': '#93c5fd',
    '--t-border': '#e2e8f0',
    '--t-font-heading': '"Inter", sans-serif',
    mood: 'light',
  },
  {
    id: 'light-warm',
    name: 'Light Warm',
    '--t-bg': '#faf8f3',
    '--t-fg': '#1f2937',
    '--t-accent': '#ea580c',
    '--t-accent-light': '#fdba74',
    '--t-border': '#e5e7eb',
    '--t-font-heading': '"Inter", sans-serif',
    mood: 'light',
  },
  {
    id: 'light-cool',
    name: 'Light Cool',
    '--t-bg': '#f0f9ff',
    '--t-fg': '#164e63',
    '--t-accent': '#0891b2',
    '--t-accent-light': '#67e8f9',
    '--t-border': '#cffafe',
    '--t-font-heading': '"Inter", sans-serif',
    mood: 'light',
  },
];

// Unified lookup
export const themeTokens: Record<string, ThemeSkin[]> = {
  'agency-studio': agencyStudioSkins,
  'saas-landing': saasLandingSkins,
};

export function getSkinById(themeId: string, skinId: string): ThemeSkin | undefined {
  const skins = themeTokens[themeId];
  return skins?.find((s) => s.id === skinId);
}

export function getDefaultSkin(themeId: string): ThemeSkin | undefined {
  return themeTokens[themeId]?.[0];
}
