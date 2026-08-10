import dynamic from 'next/dynamic';
import { samplesRegistry } from '@/lib/samplesRegistry';
import { notFound } from 'next/navigation';
import PlaygroundStage from '@/components/showcase/PlaygroundStage';

const playgroundComponents: Record<string, React.ComponentType> = {
  'button': dynamic(() => import('@/playground/button/Component')),
  'card': dynamic(() => import('@/playground/card/Component')),
  'modal': dynamic(() => import('@/playground/modal/Component')),
  'dropdown': dynamic(() => import('@/playground/dropdown/Component')),
  'tabs': dynamic(() => import('@/playground/tabs/Component')),
  'accordion': dynamic(() => import('@/playground/accordion/Component')),
  'tooltip': dynamic(() => import('@/playground/tooltip/Component')),
  'toast': dynamic(() => import('@/playground/toast/Component')),
  'navbar': dynamic(() => import('@/playground/navbar/Component')),
  'colorful-navbar': dynamic(() => import('@/playground/colorful-navbar/Component')),
  'overlay-navbar': dynamic(() => import('@/playground/overlay-navbar/Component')),
  'fullscreen-overlay-menu-item-animations': dynamic(() => import('@/playground/fullscreen-overlay-menu-item-animations/Component')),
  'preloader': dynamic(() => import('@/playground/preloader/Component')),
  'command-palette': dynamic(() => import('@/playground/command-palette/Component')),
  'scroll-text-reveal': dynamic(() => import('@/playground/scroll-text-reveal/Component')),
  'scroll-counter': dynamic(() => import('@/playground/scroll-counter/Component')),
  'scroll-progress': dynamic(() => import('@/playground/scroll-progress/Component')),
  'parallax-stack': dynamic(() => import('@/playground/parallax-stack/Component')),
  'magnetic-hover': dynamic(() => import('@/playground/magnetic-hover/Component')),
  'hover-reveal-mask': dynamic(() => import('@/playground/hover-reveal-mask/Component')),
  'animated-tab-underline': dynamic(() => import('@/playground/animated-tab-underline/Component')),
  'typewriter': dynamic(() => import('@/playground/typewriter/Component')),
  'gradient-shimmer': dynamic(() => import('@/playground/gradient-shimmer/Component')),
  'elastic-press': dynamic(() => import('@/playground/elastic-press/Component')),
};

export function generateStaticParams() {
  return samplesRegistry
    .filter((s) => s.type === 'component' || s.type === 'animation')
    .map((s) => ({ slug: s.slug }));
}

export default async function PlaygroundPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const Component = playgroundComponents[slug];
  if (!Component) notFound();

  const metadata = samplesRegistry.find((s) => s.slug === slug);

  return (
    <PlaygroundStage title={metadata?.title}>
      <Component />
    </PlaygroundStage>
  );
}
