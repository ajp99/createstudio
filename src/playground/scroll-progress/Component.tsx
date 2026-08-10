'use client';

import { useState } from 'react';

export default function ScrollProgressComponent() {
  const [progress, setProgress] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const scrolled = (element.scrollLeft / (element.scrollWidth - element.clientWidth)) * 100;
    setProgress(scrolled);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Scroll Progress Bar</h2>

      {/* Progress bar */}
      <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Scrollable content */}
      <div
        onScroll={handleScroll}
        className="w-full h-64 overflow-x-auto bg-slate-50 rounded-lg border border-slate-200 p-4"
      >
        <div className="w-max space-y-4">
          <div className="w-96 h-40 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white text-lg font-semibold">
            Section 1
          </div>
          <div className="w-96 h-40 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-white text-lg font-semibold">
            Section 2
          </div>
          <div className="w-96 h-40 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg flex items-center justify-center text-white text-lg font-semibold">
            Section 3
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-600">Scroll the content horizontally to see the progress bar update.</p>
    </div>
  );
}
