'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

export default function TypewriterComponent() {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const split = new SplitType(textRef.current, { types: 'chars' });

    gsap.fromTo(
      split.chars,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.05,
        stagger: 0.05,
        ease: 'none',
      }
    );
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Typewriter Effect</h2>

      <div className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg">
        <p
          ref={textRef}
          className="text-2xl font-bold leading-relaxed text-slate-900 font-mono"
        >
          This text animates with a typewriter effect using split-type and GSAP character stagger.
        </p>
      </div>

      <p className="text-sm text-slate-600">The animation plays on component mount, revealing one character at a time.</p>
    </div>
  );
}
