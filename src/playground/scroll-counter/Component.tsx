'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function ScrollCounterComponent() {
  const [showCounter, setShowCounter] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showCounter || !counterRef.current) return;

    const counter = { value: 0 };
    gsap.to(counter, {
      value: 1000,
      duration: 2,
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = Math.floor(counter.value).toString();
        }
      },
      ease: 'power2.out',
    });
  }, [showCounter]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Scroll Counter</h2>
      <button
        onClick={() => setShowCounter(true)}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Trigger Counter
      </button>

      {showCounter && (
        <div className="p-12 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg text-center">
          <div
            ref={counterRef}
            className="text-6xl font-bold text-green-600"
          >
            0
          </div>
          <p className="text-slate-600 mt-4">Counter animates with GSAP</p>
        </div>
      )}
    </div>
  );
}
