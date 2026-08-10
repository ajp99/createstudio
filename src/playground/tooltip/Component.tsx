'use client';

import { useState } from 'react';

export default function TooltipComponent() {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const items = [
    { label: 'Hover me', text: 'This is a tooltip' },
    { label: 'Or me', text: 'Another tooltip message' },
    { label: 'And me too', text: 'Third tooltip example' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Tooltip</h2>
      <div className="flex gap-4">
        {items.map((item, i) => (
          <div key={i} className="relative">
            <button
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(-1)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {item.label}
            </button>
            {hoveredIndex === i && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg whitespace-nowrap">
                {item.text}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
