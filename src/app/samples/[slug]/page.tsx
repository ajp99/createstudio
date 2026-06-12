import dynamic from 'next/dynamic';
import { samplesRegistry } from '@/lib/samplesRegistry';
import { notFound } from 'next/navigation';

const sampleComponents: Record<string, React.ComponentType> = {
  'cinematic3dzoom': dynamic(() => import('@/samples/cinematic3dzoom/SamplePage')),
  'matrix-ai': dynamic(() => import('@/samples/matrix-ai/SamplePage')),
  'create-studio': dynamic(() => import('@/samples/create-studio/SamplePage')),
  'glassmorphism': dynamic(() => import('@/samples/glassmorphism/SamplePage')),
  'scroll-story': dynamic(() => import('@/samples/scroll-story/SamplePage')),
  'awwwards': dynamic(() => import('@/samples/awwwards/SamplePage')),
  'visual-immersion': dynamic(() => import('@/samples/visual-immersion/SamplePage')),
};

export function generateStaticParams() {
  return samplesRegistry.map((s) => ({ slug: s.slug }));
}

export default async function SamplePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const Component = sampleComponents[slug];
  if (!Component) notFound();
  return <Component />;
}
