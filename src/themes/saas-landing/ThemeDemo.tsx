'use client';

import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { ThemeSwitcher } from '@/components/theme/ThemeSwitcher';
import ShowcaseNav from '@/components/showcase/ShowcaseNav';
import { saasLandingSkins } from '@/lib/themeTokens';
import { saasLandingLayouts } from '@/lib/layoutVariants';

export default function SaasLandingThemeDemo() {
  const defaultSkin = saasLandingSkins[0];
  const defaultLayout = saasLandingLayouts[0];

  return (
    <ThemeProvider initialSkin={defaultSkin} initialLayout={defaultLayout}>
      <div className="min-h-screen bg-[var(--t-bg)] text-[var(--t-fg)]">
        <ShowcaseNav />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Clean, Conversion-Focused
              <br />
              SaaS Theme
            </h1>
            <p className="text-xl text-[var(--t-fg)]/70 max-w-2xl mx-auto mb-8">
              This light, high-contrast theme is optimized for SaaS landing pages and product websites. Conversion-ready with a structured, minimal aesthetic.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 rounded-lg bg-[var(--t-accent)] text-white font-semibold hover:opacity-90 transition-opacity">
                Get Started
              </button>
              <button className="px-8 py-3 rounded-lg border-2 border-[var(--t-accent)] text-[var(--t-accent)] font-semibold hover:bg-[var(--t-accent)]/5 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Benefits section */}
        <section className="bg-[var(--t-fg)]/5 px-4 py-32">
          <h2 className="text-4xl font-bold mb-12 text-center">Why Choose This Theme?</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                number: '01',
                title: 'High Contrast',
                description: 'Clear typography and visual hierarchy optimized for readability.',
              },
              {
                number: '02',
                title: 'Conversion Ready',
                description: 'Designed with user psychology and CTA placement in mind.',
              },
              {
                number: '03',
                title: 'Minimal Design',
                description: 'Removes distractions, focuses attention on key messages.',
              },
              {
                number: '04',
                title: 'Professional',
                description: 'Builds trust with a clean, structured visual language.',
              },
            ].map((benefit, i) => (
              <div key={i} className="flex gap-4">
                <div className="text-3xl font-bold text-[var(--t-accent)]">{benefit.number}</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-[var(--t-fg)]/70">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Theme switcher section */}
        <section className="max-w-4xl mx-auto px-4 py-32">
          <h2 className="text-3xl font-bold mb-8">Explore Variations</h2>
          <ThemeSwitcher skins={saasLandingSkins} layouts={saasLandingLayouts} />
          <div className="p-8 rounded-xl border-2 border-[var(--t-accent)] bg-[var(--t-accent)]/5">
            <h3 className="text-lg font-bold mb-3">Live theme customization</h3>
            <p className="text-[var(--t-fg)]/70">
              Switch between different color palettes and layouts above. Each combination maintains the core SaaS aesthetic while offering visual variety.
            </p>
          </div>
        </section>

        {/* CTA section */}
        <section className="bg-[var(--t-accent)] text-white px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to use this theme?</h2>
            <p className="text-white/90 mb-6">
              Apply this design system to your SaaS product or landing page in minutes.
            </p>
            <button className="px-8 py-3 rounded-lg bg-white text-[var(--t-accent)] font-semibold hover:bg-white/90 transition-colors">
              Start Building
            </button>
          </div>
        </section>
      </div>
    </ThemeProvider>
  );
}
