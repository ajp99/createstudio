export type Theme = 'dark' | 'light' | 'neon' | 'minimal';
export type Style = 'immersive' | 'glassmorphism' | 'editorial' | 'brutalist';
export type AnimationStyle = 'scroll-triggered' | 'parallax' | 'micro-interactions' | 'physics';
export type ContentType = 'page' | 'component' | 'animation' | 'theme';

// Base metadata shared by all content types
interface BaseMeta {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  type: ContentType;
  tags: string[];
  featured?: boolean;
}

// Page: full landing page samples (existing 6 entries)
export interface PageMeta extends BaseMeta {
  type: 'page';
  theme: Theme;
  style: Style;
  animationStyle: AnimationStyle;
}

// Component: isolated UI element (button, card, modal, etc.)
export interface UIComponentMeta extends BaseMeta {
  type: 'component';
  category: string; // 'button' | 'card' | 'modal' | 'dropdown' | 'tabs' | 'accordion' | 'tooltip' | 'toast' | 'navbar' | 'command-palette'
}

// Animation: scroll-driven or interaction-driven animated element
export interface AnimationComponentMeta extends BaseMeta {
  type: 'animation';
  category: string; // 'scroll' | 'interaction' | 'text-effect' | 'scroll-progress' | 'parallax' | 'magnetic' | 'reveal' | 'typewriter' | 'shimmer' | 'elastic'
}

// Theme: layout variant + visual skin bundle (agency-studio, saas-landing)
export interface ThemeMeta extends BaseMeta {
  type: 'theme';
  layoutVariant: string;
  skin: string;
}

export type SampleMeta = PageMeta | UIComponentMeta | AnimationComponentMeta | ThemeMeta;

export const samplesRegistry: SampleMeta[] = [
  {
    slug: 'cinematic3dzoom',
    title: 'Cinematic 3D Zoom',
    description: 'Scroll-driven cinematic journey through a glowing alien desert — rings, portal, terrain, and brand reveal.',
    thumbnail: '/thumbnails/create-studio-2.webp',
    type: 'page',
    theme: 'dark',
    style: 'immersive',
    animationStyle: 'scroll-triggered',
    tags: ['3d', 'webgl', 'gsap', 'cinematic', 'r3f'],
    featured: true,
  },
  {
    slug: 'create-studio',
    title: 'Create Studio',
    description: 'Immersive dark creative agency with WebGL particles and GSAP scroll reveals.',
    thumbnail: '/thumbnails/create-studio.webp',
    type: 'page',
    theme: 'dark',
    style: 'immersive',
    animationStyle: 'scroll-triggered',
    tags: ['dark', 'three.js', 'gsap', 'agency'],
    featured: true,
  },
  {
    slug: 'glassmorphism',
    title: 'Glassmorphism',
    description: 'Light, frosted-glass SaaS landing with Framer Motion micro-interactions.',
    thumbnail: '/thumbnails/glassmorphism.webp',
    type: 'page',
    theme: 'light',
    style: 'glassmorphism',
    animationStyle: 'micro-interactions',
    tags: ['light', 'saas', 'framer-motion', 'minimal'],
  },
  {
    slug: 'scroll-story',
    title: 'Scroll Story',
    description: 'Narrative-driven full-screen sections with GSAP ScrollTrigger parallax.',
    thumbnail: '/thumbnails/scroll-story.webp',
    type: 'page',
    theme: 'dark',
    style: 'editorial',
    animationStyle: 'parallax',
    tags: ['dark', 'editorial', 'gsap', 'parallax'],
  },
  {
    slug: 'visual-immersion',
    title: 'Visual Immersion GSAP',
    description: 'Scroll-driven aerial frame sequence — 117 frames rendered frame-perfect to canvas at 60 FPS.',
    thumbnail: '/thumbnails/create-studio-3.webp',
    type: 'page',
    theme: 'dark',
    style: 'immersive',
    animationStyle: 'scroll-triggered',
    tags: ['canvas', 'scroll', 'cinematic', 'gsap', 'sequence'],
    featured: true,
  },
  {
    slug: 'edge-create',
    title: 'Edge Immersive Hero',
    description: 'Scroll-driven aerial frame sequence — 240 frames rendered frame-perfect to canvas at 30 FPS.',
    thumbnail: '/thumbnails/create-studio-4.webp',
    type: 'page',
    theme: 'dark',
    style: 'immersive',
    animationStyle: 'scroll-triggered',
    tags: ['canvas', 'scroll', 'cinematic', 'gsap', 'sequence'],
    featured: true,
  },
  // UI Components (10)
  {
    slug: 'button',
    title: 'Button',
    description: 'Solid, outline, ghost, and loading state variants.',
    thumbnail: '/thumbnails/buttons.jpg',
    type: 'component',
    category: 'button',
    tags: ['ui', 'button', 'variant'],
  },
  {
    slug: 'card',
    title: 'Card',
    description: 'Basic card with hover-elevate variant.',
    thumbnail: '/thumbnails/cards.jpg',
    type: 'component',
    category: 'card',
    tags: ['ui', 'card', 'hover'],
  },
  {
    slug: 'modal',
    title: 'Modal / Dialog',
    description: 'Modal dialog with backdrop, Esc-to-close, and focus trap.',
    thumbnail: '/thumbnails/modal.jpg',
    type: 'component',
    category: 'modal',
    tags: ['ui', 'modal', 'dialog', 'overlay'],
  },
  {
    slug: 'dropdown',
    title: 'Dropdown / Select',
    description: 'Click-triggered dropdown menu with keyboard navigation.',
    thumbnail: '/thumbnails/dropdown.jpg',
    type: 'component',
    category: 'dropdown',
    tags: ['ui', 'dropdown', 'select', 'menu'],
  },
  {
    slug: 'tabs',
    title: 'Tabs',
    description: 'Tab navigation with content swap.',
    thumbnail: '/thumbnails/tabs.jpg',
    type: 'component',
    category: 'tabs',
    tags: ['ui', 'tabs', 'navigation'],
  },
  {
    slug: 'accordion',
    title: 'Accordion',
    description: 'Expandable/collapsible accordion items.',
    thumbnail: '/thumbnails/accordion.jpg',
    type: 'component',
    category: 'accordion',
    tags: ['ui', 'accordion', 'expand-collapse'],
  },
  {
    slug: 'tooltip',
    title: 'Tooltip',
    description: 'Hover-triggered tooltip on sample elements.',
    thumbnail: '/thumbnails/tooltip.jpg',
    type: 'component',
    category: 'tooltip',
    tags: ['ui', 'tooltip', 'hover'],
  },
  {
    slug: 'toast',
    title: 'Toast / Notification',
    description: 'Stacked notification with auto-dismiss.',
    thumbnail: '/thumbnails/toast.jpg',
    type: 'component',
    category: 'toast',
    tags: ['ui', 'toast', 'notification'],
  },
  {
    slug: 'navbar',
    title: 'Navbar',
    description: 'Responsive navbar with mobile menu toggle, sticky-on-scroll.',
    thumbnail: '/thumbnails/navbar.jpg',
    type: 'component',
    category: 'navbar',
    tags: ['ui', 'navbar', 'nav', 'responsive'],
  },
  {
    slug: 'colorful-navbar',
    title: 'Colorful Animated Navbar',
    description: 'Theme-switchable navbar with sliding indicator, dropdown menus, and notification badge.',
    thumbnail: '/thumbnails/colorful-navbar.jpg',
    type: 'component',
    category: 'navbar',
    tags: ['ui', 'navbar', 'nav', 'animated', 'theme-switcher', 'dropdown'],
  },
  {
    slug: 'overlay-navbar',
    title: 'Overlay Animated Navbar',
    description: 'Full-screen overlay menu with staggered animations, opaque/transparent variants, and keyboard accessibility.',
    thumbnail: '/thumbnails/overlay-navbar.jpg',
    type: 'component',
    category: 'navbar',
    tags: ['ui', 'navbar', 'nav', 'animated', 'overlay', 'accessibility'],
  },
  {
    slug: 'command-palette',
    title: 'Command Palette',
    description: 'Searchable command list overlay (⌘K).',
    thumbnail: '/thumbnails/command-palette.jpg',
    type: 'component',
    category: 'command-palette',
    tags: ['ui', 'search', 'command', 'keyboard'],
  },
  {
    slug: 'fullscreen-overlay-menu-item-animations',
    title: 'Fullscreen Overlay Menu with Staggered Animations',
    description: 'Full-screen overlay menu with 5 colored sections, staggered item animations, and smooth anchor-link scrolling.',
    thumbnail: '/thumbnails/fullscreen-overlay-menu.jpg',
    type: 'component',
    category: 'navbar',
    tags: ['ui', 'navbar', 'overlay', 'animated', 'fullscreen', 'sections', 'scroll'],
  },
  // Animated Components (10)
  {
    slug: 'scroll-text-reveal',
    title: 'Scroll Text Reveal',
    description: 'Word/char stagger text reveal on scroll via GSAP ScrollTrigger.',
    thumbnail: '/thumbnails/shimmer-text.jpg',
    type: 'animation',
    category: 'scroll',
    tags: ['animation', 'scroll', 'gsap', 'text', 'reveal'],
  },
  {
    slug: 'scroll-counter',
    title: 'Scroll Counter',
    description: 'GSAP ScrollTrigger-driven number counter.',
    thumbnail: '/thumbnails/scrollbar-update.jpg',
    type: 'animation',
    category: 'scroll',
    tags: ['animation', 'scroll', 'gsap', 'counter', 'stat'],
  },
  {
    slug: 'scroll-progress',
    title: 'Scroll Progress Bar',
    description: 'Fixed progress bar tied to scroll position.',
    thumbnail: '/thumbnails/scrollbar-update.jpg',
    type: 'animation',
    category: 'scroll-progress',
    tags: ['animation', 'scroll', 'progress', 'indicator'],
  },
  {
    slug: 'parallax-stack',
    title: 'Parallax Image Stack',
    description: 'Layered images moving at different scroll speeds via GSAP.',
    thumbnail: '/thumbnails/parallax-stacks.jpg',
    type: 'animation',
    category: 'parallax',
    tags: ['animation', 'scroll', 'gsap', 'parallax', 'image'],
  },
  {
    slug: 'magnetic-hover',
    title: 'Magnetic Hover',
    description: 'Cursor-attraction effect on hover via Framer Motion.',
    thumbnail: '/thumbnails/magnetic-hover.jpg',
    type: 'animation',
    category: 'magnetic',
    tags: ['animation', 'interaction', 'framer-motion', 'cursor', 'magnetic'],
  },
  {
    slug: 'hover-reveal-mask',
    title: 'Hover Reveal Mask',
    description: 'Framer Motion clip-path animation revealing image on hover.',
    thumbnail: '/thumbnails/hover-reveal.jpg',
    type: 'animation',
    category: 'reveal',
    tags: ['animation', 'interaction', 'framer-motion', 'reveal', 'image'],
  },
  {
    slug: 'animated-tab-underline',
    title: 'Animated Tab Underline',
    description: 'Framer Motion layoutId shared-element underline across tabs.',
    thumbnail: '/thumbnails/tabs.jpg',
    type: 'animation',
    category: 'interaction',
    tags: ['animation', 'interaction', 'framer-motion', 'tabs'],
  },
  {
    slug: 'typewriter',
    title: 'Typewriter',
    description: 'split-type char split + GSAP stagger typing effect.',
    thumbnail: '/thumbnails/typewriter.jpg',
    type: 'animation',
    category: 'text-effect',
    tags: ['animation', 'gsap', 'text', 'typewriter', 'split-type'],
  },
  {
    slug: 'gradient-shimmer',
    title: 'Gradient Shimmer',
    description: 'CSS gradient animation via Framer Motion on gradient text.',
    thumbnail: '/thumbnails/shimmer-text.jpg',
    type: 'animation',
    category: 'shimmer',
    tags: ['animation', 'framer-motion', 'gradient', 'text'],
  },
  {
    slug: 'elastic-press',
    title: 'Elastic Press',
    description: 'react-spring button scale/spring animation on press/release.',
    thumbnail: '/thumbnails/elastic-button-click.jpg',
    type: 'animation',
    category: 'elastic',
    tags: ['animation', 'interaction', 'react-spring', 'button'],
  },
  // Themes (2)
  {
    slug: 'agency-studio',
    title: 'Agency / Studio',
    description: 'Bold, experimental dark theme with WebGL accents — reuses CREATE STUDIO visual identity.',
    thumbnail: '/thumbnails/agency-thum.jpg',
    type: 'theme',
    layoutVariant: 'hero-split',
    skin: 'dark-neon',
    tags: ['theme', 'dark', 'agency', 'experimental'],
  },
  {
    slug: 'saas-landing',
    title: 'SaaS Landing',
    description: 'Clean, high-contrast light theme optimized for conversion.',
    thumbnail: '/thumbnails/agency-thum.jpg',
    type: 'theme',
    layoutVariant: 'hero-centered',
    skin: 'light-minimal',
    tags: ['theme', 'light', 'saas', 'conversion'],
  },
];
