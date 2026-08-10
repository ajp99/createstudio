'use client';

import { useState, useMemo } from 'react';
import { samplesRegistry, ContentType } from '@/lib/samplesRegistry';
import SampleCard from '@/components/showcase/SampleCard';
import FilterSidebar from '@/components/showcase/FilterSidebar';
import ShowcaseNav from '@/components/showcase/ShowcaseNav';

export default function GalleryPage() {
  const [filters, setFilters] = useState<string[]>([]);
  const [activeType, setActiveType] = useState<ContentType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'a-z'>('newest');

  const visible = useMemo(() => {
    let result = samplesRegistry.filter((s) => {
      const typeMatch = activeType === 'all' || s.type === activeType;
      const tagMatch = filters.length === 0 || filters.some((f) => s.tags.includes(f));
      return typeMatch && tagMatch;
    });

    if (sortBy === 'newest') {
      result.sort((a, b) => samplesRegistry.indexOf(b) - samplesRegistry.indexOf(a));
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => samplesRegistry.indexOf(a) - samplesRegistry.indexOf(b));
    } else if (sortBy === 'a-z') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [activeType, filters, sortBy]);

  return (
    <main className="min-h-screen bg-black text-white">
      <ShowcaseNav />

      <div className="flex relative">
        <FilterSidebar
          activeType={activeType}
          onTypeChange={setActiveType}
          activeFilters={filters}
          onFiltersChange={setFilters}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <div className="flex-1 px-6 py-24">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Design Showcase</h1>
              <p className="text-white/60 text-lg">
                Explore full-page designs, UI components, animations, and themes across multiple styles.
              </p>
            </div>

            {visible.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-white/60">No items match your filters.</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-white/50 mb-8">
                  Showing {visible.length} of {samplesRegistry.length} items
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visible.map((meta) => (
                    <SampleCard key={meta.slug} meta={meta} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
