'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function ModalComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Modal / Dialog</h2>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Open Modal
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setIsOpen(false)}>
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Modal Title</h3>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <p className="text-slate-600 mb-6">This is a modal dialog. Press Escape or click outside to close.</p>
            <div className="flex gap-3">
              <button onClick={() => setIsOpen(false)} className="flex-1 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
                Cancel
              </button>
              <button onClick={() => setIsOpen(false)} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
