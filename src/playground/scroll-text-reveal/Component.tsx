'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ScrollTextRevealComponent() {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Split text into characters
    const text = textRef.current.innerText;
    textRef.current.innerHTML = text
      .split('')
      .map((char) => (char === ' ' ? '<span style="margin-right:0.3em"></span>' : `<span>${char}</span>`))
      .join('');

    // Animate characters on mount
    gsap.fromTo(
      textRef.current.querySelectorAll('span'),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'back.out',
      }
    );
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Scroll Text Reveal</h2>
      <div className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
        <p
          ref={textRef}
          className="text-2xl font-bold leading-relaxed text-slate-900"
        >
          This text reveals with a character-by-character animation effect using GSAP stagger.
        </p>
      </div>
      <p className="text-sm text-slate-600">In a full implementation, this would be triggered by scroll position using GSAP ScrollTrigger.</p>
    </div>
  );
}
