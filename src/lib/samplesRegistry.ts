export type Theme = 'dark' | 'light' | 'neon' | 'minimal';
export type Style = 'immersive' | 'glassmorphism' | 'editorial' | 'brutalist';
export type AnimationStyle = 'scroll-triggered' | 'parallax' | 'micro-interactions' | 'physics';

export interface SampleMeta {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  theme: Theme;
  style: Style;
  animationStyle: AnimationStyle;
  tags: string[];
  featured?: boolean;
}

export const samplesRegistry: SampleMeta[] = [
  {
    slug: 'cinematic3dzoom',
    title: 'Cinematic 3D Zoom',
    description: 'Scroll-driven cinematic journey through a glowing alien desert — rings, portal, terrain, and brand reveal.',
    thumbnail: '/thumbnails/create-studio-2.jpg',
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
    thumbnail: '/thumbnails/create-studio.jpg',
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
    thumbnail: '/thumbnails/glassmorphism.jpg',
    theme: 'light',
    style: 'glassmorphism',
    animationStyle: 'micro-interactions',
    tags: ['light', 'saas', 'framer-motion', 'minimal'],
  },
  {
    slug: 'scroll-story',
    title: 'Scroll Story',
    description: 'Narrative-driven full-screen sections with GSAP ScrollTrigger parallax.',
    thumbnail: '/thumbnails/scroll-story.jpg',
    theme: 'dark',
    style: 'editorial',
    animationStyle: 'parallax',
    tags: ['dark', 'editorial', 'gsap', 'parallax'],
  },
  {
    slug: 'visual-immersion',
    title: 'Visual Immersion GSAP',
    description: 'Scroll-driven aerial frame sequence — 117 frames rendered frame-perfect to canvas at 60 FPS.',
    thumbnail: '/thumbnails/create-studio-3.jpg',
    theme: 'dark',
    style: 'immersive',
    animationStyle: 'scroll-triggered',
    tags: ['canvas', 'scroll', 'cinematic', 'gsap', 'sequence'],
    featured: true,
  },
];
