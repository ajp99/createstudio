import dynamic from 'next/dynamic';
import { samplesRegistry } from '@/lib/samplesRegistry';
import { notFound } from 'next/navigation';

const themeComponents: Record<string, React.ComponentType> = {
  'agency-studio': dynamic(() => import('@/themes/agency-studio/ThemeDemo')),
  'saas-landing': dynamic(() => import('@/themes/saas-landing/ThemeDemo')),
};

export function generateStaticParams() {
  return samplesRegistry
    .filter((s) => s.type === 'theme')
    .map((s) => ({ slug: s.slug }));
}

export default async function ThemePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const Component = themeComponents[slug];
  if (!Component) notFound();

  return <Component />;
}
