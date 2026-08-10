'use client';

import { useState, useMemo } from 'react';
import { ContentType, samplesRegistry } from '@/lib/samplesRegistry';
import { ChevronDown, X, Menu } from 'lucide-react';

interface FilterSidebarProps {
  activeType: ContentType | 'all';
  onTypeChange: (type: ContentType | 'all') => void;
  activeFilters: string[];
  onFiltersChange: (filters: string[]) => void;
  sortBy: 'newest' | 'oldest' | 'a-z';
  onSortChange: (sort: 'newest' | 'oldest' | 'a-z') => void;
}

export default function FilterSidebar({
  activeType,
  onTypeChange,
  activeFilters,
  onFiltersChange,
  sortBy,
  onSortChange,
}: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    type: true,
    tags: true,
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Get all unique tags and categories
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    samplesRegistry.forEach((item) => {
      item.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Get categories by filtering visible items
  const visibleItems = useMemo(() => {
    return samplesRegistry.filter((s) => {
      const typeMatch = activeType === 'all' || s.type === activeType;
      return typeMatch;
    });
  }, [activeType]);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    visibleItems.forEach((item) => {
      if ('category' in item) {
        cats.add(item.category);
      }
    });
    return Array.from(cats).sort();
  }, [visibleItems]);

  // Filter tags by search query
  const filteredTags = allTags.filter((tag) =>
    tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSection = (section: 'type' | 'tags') => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleTag = (tag: string) => {
    onFiltersChange(
      activeFilters.includes(tag)
        ? activeFilters.filter((t) => t !== tag)
        : [...activeFilters, tag]
    );
  };

  const clearAll = () => {
    onTypeChange('all');
    onFiltersChange([]);
    onSortChange('newest');
    setSearchQuery('');
  };

  const contentTypes: (ContentType | 'all')[] = ['all', 'page', 'component', 'animation', 'theme'];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 lg:hidden z-40 p-3 bg-white text-black rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative top-0 left-0 h-screen lg:h-auto w-80 lg:w-72 bg-white/5 border-r border-white/10 backdrop-blur-sm overflow-y-auto z-40 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Filters</h2>
            {(activeType !== 'all' || activeFilters.length > 0) && (
              <button
                onClick={clearAll}
                className="text-xs font-medium text-white/60 hover:text-white transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Search */}
          <div>
            <input
              type="text"
              placeholder="Search tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>

          {/* Content Type Filter */}
          <div>
            <button
              onClick={() => toggleSection('type')}
              className="w-full flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors"
            >
              <span className="font-semibold text-white text-sm uppercase tracking-wider">Type</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${expandedSections.type ? '' : '-rotate-90'}`}
              />
            </button>

            {expandedSections.type && (
              <div className="space-y-2 px-3 pb-3">
                {contentTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => onTypeChange(type)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                      activeType === type
                        ? 'bg-white/20 text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {type === 'all' ? 'All' : `${type}s`}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tags Filter */}
          <div>
            <button
              onClick={() => toggleSection('tags')}
              className="w-full flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors"
            >
              <span className="font-semibold text-white text-sm uppercase tracking-wider">Tags</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${expandedSections.tags ? '' : '-rotate-90'}`}
              />
            </button>

            {expandedSections.tags && (
              <div className="space-y-2 px-3 pb-3 max-h-64 overflow-y-auto">
                {filteredTags.length === 0 ? (
                  <p className="text-xs text-white/40 py-2">No tags match search</p>
                ) : (
                  filteredTags.map((tag) => (
                    <label
                      key={tag}
                      className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={activeFilters.includes(tag)}
                        onChange={() => toggleTag(tag)}
                        className="w-4 h-4 rounded border-white/30 bg-white/10 text-white cursor-pointer"
                      />
                      <span className="text-sm text-white/80">{tag}</span>
                    </label>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as 'newest' | 'oldest' | 'a-z')}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="a-z">A-Z</option>
            </select>
          </div>

          {/* Active Filters Badge */}
          {(activeType !== 'all' || activeFilters.length > 0 || sortBy !== 'newest') && (
            <div className="pt-4 border-t border-white/10 space-y-2">
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider">Active Filters</p>
              <div className="flex flex-wrap gap-2">
                {activeType !== 'all' && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full text-xs text-white">
                    {activeType}
                    <button onClick={() => onTypeChange('all')} className="ml-1 hover:text-white/60">
                      ✕
                    </button>
                  </div>
                )}
                {activeFilters.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full text-xs text-white"
                  >
                    {tag}
                    <button onClick={() => toggleTag(tag)} className="ml-1 hover:text-white/60">
                      ✕
                    </button>
                  </div>
                ))}
                {sortBy !== 'newest' && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full text-xs text-white">
                    {sortBy}
                    <button onClick={() => onSortChange('newest')} className="ml-1 hover:text-white/60">
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
