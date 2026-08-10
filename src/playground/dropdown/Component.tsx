'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function DropdownComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Option 1');

  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dropdown / Select</h2>
      <div className="relative w-48">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg text-left flex items-center justify-between hover:bg-slate-50"
        >
          {selected}
          <ChevronDown size={16} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-300 rounded-lg shadow-lg z-10">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSelected(option);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-blue-50 first:rounded-t-lg last:rounded-b-lg"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
