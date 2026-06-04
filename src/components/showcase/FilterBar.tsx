'use client';

import { samplesRegistry } from '@/lib/samplesRegistry';

interface Props {
  activeFilters: string[];
  onChange: (filters: string[]) => void;
}

export default function FilterBar({ activeFilters, onChange }: Props) {
  const allTags = Array.from(
    new Set(samplesRegistry.flatMap((s) => s.tags))
  ).sort();

  const toggleTag = (tag: string) => {
    if (activeFilters.includes(tag)) {
      onChange(activeFilters.filter((f) => f !== tag));
    } else {
      onChange([...activeFilters, tag]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {allTags.map((tag) => (
        <button
          key={tag}
          onClick={() => toggleTag(tag)}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
            activeFilters.includes(tag)
              ? 'bg-white text-black'
              : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
