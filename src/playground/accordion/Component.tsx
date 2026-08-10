'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function AccordionComponent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    { title: 'Item 1', content: 'Content for accordion item 1' },
    { title: 'Item 2', content: 'Content for accordion item 2' },
    { title: 'Item 3', content: 'Content for accordion item 3' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Accordion</h2>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="border border-slate-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveIndex(activeIndex === i ? -1 : i)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50"
            >
              <span className="font-medium">{item.title}</span>
              <ChevronDown
                size={20}
                className={`transform transition-transform ${activeIndex === i ? 'rotate-180' : ''}`}
              />
            </button>
            {activeIndex === i && <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">{item.content}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
