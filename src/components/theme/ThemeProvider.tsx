'use client';

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { ThemeSkin } from '@/lib/themeTokens';
import { LayoutVariant } from '@/lib/layoutVariants';

export interface ThemeContextType {
  skin: ThemeSkin;
  setSkin: (skin: ThemeSkin) => void;
  layoutVariant: LayoutVariant;
  setLayoutVariant: (layout: LayoutVariant) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  initialSkin: ThemeSkin;
  initialLayout: LayoutVariant;
}

export function ThemeProvider({ children, initialSkin, initialLayout }: ThemeProviderProps) {
  const [skin, setSkin] = useState<ThemeSkin>(initialSkin);
  const [layoutVariant, setLayoutVariant] = useState<LayoutVariant>(initialLayout);

  // Build CSS variable style object from skin tokens
  const themeStyle = useMemo(() => {
    return {
      '--t-bg': skin['--t-bg'],
      '--t-fg': skin['--t-fg'],
      '--t-accent': skin['--t-accent'],
      '--t-accent-light': skin['--t-accent-light'],
      '--t-border': skin['--t-border'],
      '--t-font-heading': skin['--t-font-heading'],
    } as React.CSSProperties;
  }, [skin]);

  const value: ThemeContextType = useMemo(
    () => ({ skin, setSkin, layoutVariant, setLayoutVariant }),
    [skin, layoutVariant]
  );

  return (
    <ThemeContext.Provider value={value}>
      <div style={themeStyle} className="w-full transition-colors duration-300">
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
