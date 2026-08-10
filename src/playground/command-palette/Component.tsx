'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

export default function CommandPaletteComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const commands = [
    { id: 1, name: 'Create Document', category: 'File' },
    { id: 2, name: 'Open Settings', category: 'View' },
    { id: 3, name: 'Save File', category: 'File' },
    { id: 4, name: 'Dark Mode', category: 'Settings' },
    { id: 5, name: 'About', category: 'Help' },
  ];

  const filtered = commands.filter(
    (cmd) => cmd.name.toLowerCase().includes(search.toLowerCase()) || cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Command Palette</h2>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 flex items-center gap-2 hover:bg-slate-50"
      >
        <Search size={16} />
        <span>Press <kbd className="px-2 py-1 text-xs bg-slate-200 rounded">⌘K</kbd> to open</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center pt-32 z-50" onClick={() => setIsOpen(false)}>
          <div className="bg-white rounded-lg shadow-xl w-96 max-h-96 flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200">
              <Search size={20} className="text-slate-400" />
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search commands..."
                className="flex-1 outline-none text-sm"
              />
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <div className="overflow-y-auto flex-1">
              {filtered.map((cmd) => (
                <button
                  key={cmd.id}
                  onClick={() => setIsOpen(false)}
                  className="w-full px-4 py-3 text-left text-sm border-b border-slate-100 hover:bg-slate-50 flex items-center justify-between"
                >
                  <span>{cmd.name}</span>
                  <span className="text-xs text-slate-500">{cmd.category}</span>
                </button>
              ))}
              {filtered.length === 0 && <div className="p-4 text-center text-slate-500 text-sm">No commands found</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
