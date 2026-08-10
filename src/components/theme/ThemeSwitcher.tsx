'use client';

import { useTheme } from './ThemeProvider';
import { ThemeSkin } from '@/lib/themeTokens';
import { LayoutVariant } from '@/lib/layoutVariants';

interface ThemeSwitcherProps {
  skins: ThemeSkin[];
  layouts: LayoutVariant[];
}

export function ThemeSwitcher({ skins, layouts }: ThemeSwitcherProps) {
  const { skin, setSkin, layoutVariant, setLayoutVariant } = useTheme();

  return (
    <div className="flex flex-col gap-6 mb-8 p-6 rounded-xl border border-current/20 bg-current/5">
      {/* Skin swatch picker */}
      <div>
        <label className="block text-sm font-semibold mb-3">Visual Skin</label>
        <div className="flex flex-wrap gap-3">
          {skins.map((s) => (
            <button
              key={s.id}
              onClick={() => setSkin(s)}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                skin.id === s.id
                  ? 'border-current bg-current/20 font-medium'
                  : 'border-current/20 hover:border-current/40'
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: s['--t-accent'] }}
                />
                {s.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Layout variant segmented control */}
      <div>
        <label className="block text-sm font-semibold mb-3">Layout Variant</label>
        <div className="flex gap-2 p-1 rounded-lg border border-current/20 bg-current/5 w-fit">
          {layouts.map((layout) => (
            <button
              key={layout.id}
              onClick={() => setLayoutVariant(layout)}
              className={`px-4 py-2 rounded-md transition-all ${
                layoutVariant.id === layout.id
                  ? 'bg-current text-white dark:text-slate-900 font-medium'
                  : 'hover:bg-current/10'
              }`}
            >
              {layout.name}
            </button>
          ))}
        </div>
        <p className="text-xs text-current/60 mt-2">{layoutVariant.description}</p>
      </div>
    </div>
  );
}
