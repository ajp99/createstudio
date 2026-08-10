'use client';

import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { ThemeSwitcher } from '@/components/theme/ThemeSwitcher';
import ShowcaseNav from '@/components/showcase/ShowcaseNav';
import { agencyStudioSkins } from '@/lib/themeTokens';
import { agencyStudioLayouts } from '@/lib/layoutVariants';

export default function AgencyStudioThemeDemo() {
  const defaultSkin = agencyStudioSkins[0];
  const defaultLayout = agencyStudioLayouts[0];

  return (
    <ThemeProvider initialSkin={defaultSkin} initialLayout={defaultLayout}>
      <div className="min-h-screen bg-[var(--t-bg)] text-[var(--t-fg)]">
        <ShowcaseNav />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-32 overflow-hidden">
          {/* Gradient accent background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-[var(--t-accent)]/20 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-[var(--t-accent)]/10 rounded-full blur-3xl opacity-40" />
          </div>

          <div className="max-w-5xl mx-auto">
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Bold, Experimental
              <br />
              Design System
            </h1>
            <p className="text-xl text-[var(--t-fg)]/80 max-w-2xl mb-8">
              This theme demonstrates a dark, high-contrast aesthetic with neon accents perfect for creative agencies and experimental digital experiences.
            </p>
            <button className="px-8 py-3 rounded-lg bg-[var(--t-accent)] text-[var(--t-bg)] font-semibold hover:opacity-90 transition-opacity">
              Explore More
            </button>
          </div>
        </section>

        {/* Feature cards section */}
        <section className="px-4 py-32">
          <h2 className="text-4xl font-bold mb-12 text-center">Key Features</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Immersive',
                description: 'Engaging, full-screen experiences with smooth animations.',
              },
              {
                title: 'WebGL Ready',
                description: 'Built for 3D effects and interactive canvas elements.',
              },
              {
                title: 'Dark First',
                description: 'High contrast dark theme optimized for modern aesthetics.',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-[var(--t-border)] bg-[var(--t-fg)]/5 hover:border-[var(--t-accent)] transition-colors"
              >
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-[var(--t-fg)]/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Theme switcher sidebar */}
        <section className="max-w-4xl mx-auto px-4 py-32">
          <ThemeSwitcher skins={agencyStudioSkins} layouts={agencyStudioLayouts} />
          <div className="p-8 rounded-xl border border-[var(--t-accent)]/30 bg-[var(--t-accent)]/5">
            <h3 className="text-lg font-bold mb-3">Try switching skins and layouts above</h3>
            <p className="text-[var(--t-fg)]/70">
              The theme switcher updates colors and layout in real-time without a page reload. This demonstrates a fully composable design system.
            </p>
          </div>
        </section>
      </div>
    </ThemeProvider>
  );
}
