'use client';

import { useState } from 'react';

export default function TabsComponent() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: 'Tab 1', content: 'Content for tab 1' },
    { label: 'Tab 2', content: 'Content for tab 2' },
    { label: 'Tab 3', content: 'Content for tab 3' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Tabs</h2>
      <div>
        <div className="flex border-b border-slate-200">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === i
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-6 bg-slate-50 rounded-b-lg">
          <p>{tabs[activeTab].content}</p>
        </div>
      </div>
    </div>
  );
}
