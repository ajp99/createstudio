export interface LayoutVariant {
  id: string;
  name: string;
  description: string;
}

// Layout variants available per theme
export const agencyStudioLayouts: LayoutVariant[] = [
  {
    id: 'hero-split',
    name: 'Split Hero',
    description: 'Side-by-side hero with text and visual',
  },
  {
    id: 'hero-centered',
    name: 'Centered Hero',
    description: 'Full-width centered hero with large headline',
  },
];

export const saasLandingLayouts: LayoutVariant[] = [
  {
    id: 'hero-centered',
    name: 'Centered Hero',
    description: 'Full-width centered hero with large headline',
  },
  {
    id: 'hero-split',
    name: 'Split Hero',
    description: 'Side-by-side hero with text and visual',
  },
];

// Unified lookup
export const layoutVariants: Record<string, LayoutVariant[]> = {
  'agency-studio': agencyStudioLayouts,
  'saas-landing': saasLandingLayouts,
};

export function getLayoutById(themeId: string, layoutId: string): LayoutVariant | undefined {
  const layouts = layoutVariants[themeId];
  return layouts?.find((l) => l.id === layoutId);
}

export function getDefaultLayout(themeId: string): LayoutVariant | undefined {
  return layoutVariants[themeId]?.[0];
}
