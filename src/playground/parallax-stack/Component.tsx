'use client';

import { useState } from 'react';

export default function ParallaxStackComponent() {
  const [offset, setOffset] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    setOffset(element.scrollLeft);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Parallax Image Stack</h2>

      <div
        onScroll={handleScroll}
        className="h-80 overflow-x-auto bg-slate-900 rounded-lg border border-slate-700"
      >
        <div className="w-max relative h-full flex items-center">
          {/* Layer 1 - slowest */}
          <div
            className="absolute w-96 h-64 bg-gradient-to-br from-blue-600 to-blue-900 rounded-lg flex items-center justify-center text-white font-bold text-xl"
            style={{ transform: `translateX(${offset * 0.3}px)`, left: '0px' }}
          >
            Layer 1 (30% speed)
          </div>

          {/* Layer 2 - medium */}
          <div
            className="absolute w-96 h-64 bg-gradient-to-br from-purple-600 to-purple-900 rounded-lg flex items-center justify-center text-white font-bold text-xl"
            style={{ transform: `translateX(${offset * 0.5}px)`, left: '200px' }}
          >
            Layer 2 (50% speed)
          </div>

          {/* Layer 3 - fastest */}
          <div
            className="absolute w-96 h-64 bg-gradient-to-br from-pink-600 to-pink-900 rounded-lg flex items-center justify-center text-white font-bold text-xl"
            style={{ transform: `translateX(${offset * 0.7}px)`, left: '400px' }}
          >
            Layer 3 (70% speed)
          </div>

          <div className="w-screen h-full" />
        </div>
      </div>

      <p className="text-sm text-slate-600">Scroll horizontally to see the parallax effect. Each layer moves at a different speed.</p>
    </div>
  );
}
