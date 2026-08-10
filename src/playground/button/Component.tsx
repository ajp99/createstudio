'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function ButtonComponent() {
  const [loadingStates, setLoadingStates] = useState({
    solid: false,
    outline: false,
    ghost: false,
  });

  const handleClick = (variant: keyof typeof loadingStates) => {
    setLoadingStates((prev) => ({ ...prev, [variant]: true }));
    setTimeout(() => {
      setLoadingStates((prev) => ({ ...prev, [variant]: false }));
    }, 2000);
  };

  const ButtonVariant = ({ variant, label }: { variant: keyof typeof loadingStates; label: string }) => {
    const isLoading = loadingStates[variant];
    const baseClass = 'px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2';

    const variants = {
      solid: 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50',
      outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 disabled:opacity-50',
      ghost: 'text-blue-600 hover:bg-blue-50 disabled:opacity-50',
    };

    return (
      <button
        onClick={() => handleClick(variant)}
        disabled={isLoading}
        className={`${baseClass} ${variants[variant]}`}
      >
        {isLoading && <Loader2 size={16} className="animate-spin" />}
        {isLoading ? 'Loading...' : label}
      </button>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Button Variants</h2>
        <p className="text-slate-600 mb-6">Click any button to see the loading state in action.</p>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-3 text-slate-700">Solid Button</h3>
          <ButtonVariant variant="solid" label="Solid Button" />
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-slate-700">Outline Button</h3>
          <ButtonVariant variant="outline" label="Outline Button" />
        </div>

        <div>
          <h3 className="font-semibold mb-3 text-slate-700">Ghost Button</h3>
          <ButtonVariant variant="ghost" label="Ghost Button" />
        </div>
      </div>

      <div className="p-4 rounded-lg bg-slate-100 text-sm text-slate-700">
        <p>Try clicking buttons to see the loading state. The state automatically resets after 2 seconds.</p>
      </div>
    </div>
  );
}
