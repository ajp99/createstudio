'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedTabUnderlineComponent() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Animated Tab Underline</h2>

      <div className="border-b border-slate-200">
        <div className="flex relative">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === i ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
          <motion.div
            layoutId="underline"
            className="absolute bottom-0 h-1 bg-blue-600"
            animate={{
              left: `${activeTab * (100 / tabs.length)}%`,
              width: `${100 / tabs.length}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="p-6 bg-slate-50 rounded-lg">
        <p className="text-slate-700">Content for {tabs[activeTab]}</p>
      </div>

      <p className="text-sm text-slate-600">The underline animates smoothly between tabs using Framer Motion's layoutId.</p>
    </div>
  );
}
