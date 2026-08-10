'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function ToastComponent() {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);
  const [nextId, setNextId] = useState(0);

  const addToast = (message: string) => {
    const id = nextId;
    setToasts((prev) => [...prev, { id, message }]);
    setNextId(id + 1);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Toast / Notification</h2>
      <div className="flex gap-3">
        <button
          onClick={() => addToast('Success! Action completed.')}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Success Toast
        </button>
        <button
          onClick={() => addToast('Error! Something went wrong.')}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Error Toast
        </button>
        <button
          onClick={() => addToast('Info message for you.')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Info Toast
        </button>
      </div>

      {/* Toast container */}
      <div className="fixed bottom-4 right-4 space-y-2 z-40">
        {toasts.map((toast) => (
          <div key={toast.id} className="bg-slate-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between gap-4 animate-in">
            <span>{toast.message}</span>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="text-white/60 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
