'use client';

import { useState } from 'react';
import { samplesRegistry } from '@/lib/samplesRegistry';
import SampleCard from '@/components/showcase/SampleCard';
import FilterBar from '@/components/showcase/FilterBar';
import ShowcaseNav from '@/components/showcase/ShowcaseNav';

export default function GalleryPage() {
  const [filters, setFilters] = useState<string[]>([]);
  const visible =
    filters.length === 0
      ? samplesRegistry
      : samplesRegistry.filter((s) => filters.some((f) => s.tags.includes(f)));

  return (
    <main className="min-h-screen bg-black text-white">
      <ShowcaseNav />

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Landing Page Gallery</h1>
          <p className="text-white/60 text-lg">
            Explore stunning landing page designs across multiple themes and animation styles.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-sm font-bold text-white/60 mb-4 uppercase tracking-widest">Filter by tags</h2>
          <FilterBar activeFilters={filters} onChange={setFilters} />
        </div>

        {visible.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white/60">No samples match your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((meta) => (
              <SampleCard key={meta.slug} meta={meta} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
