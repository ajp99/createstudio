'use client';

import { useState } from 'react';
import ShowcaseNav from './ShowcaseNav';
import { Moon, Sun } from 'lucide-react';

interface PlaygroundStageProps {
  children: React.ReactNode;
  title?: string;
}

export default function PlaygroundStage({ children, title }: PlaygroundStageProps) {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className={isDark ? 'bg-slate-950 text-white' : 'bg-white text-slate-950'}>
      <ShowcaseNav />

      {/* Stage container with grid background */}
      <div className="relative min-h-screen w-full overflow-auto">
        {/* Grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: isDark
              ? 'linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)'
              : 'linear-gradient(rgba(148, 163, 184, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Dark/light toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className={`fixed top-24 right-6 z-50 p-2 rounded-lg backdrop-blur ${
            isDark
              ? 'bg-white/10 hover:bg-white/20 text-white'
              : 'bg-slate-900/10 hover:bg-slate-900/20 text-slate-900'
          } transition-colors`}
          aria-label="Toggle dark/light mode"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Content wrapper with centered, padded area */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-16">
          <div
            className={`w-full max-w-2xl rounded-2xl border backdrop-blur p-8 ${
              isDark
                ? 'bg-slate-900/50 border-white/20'
                : 'bg-slate-50/50 border-slate-300/50'
            }`}
          >
            {title && (
              <h1 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {title}
              </h1>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
