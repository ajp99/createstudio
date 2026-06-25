'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const TOTAL = 240;

function frameUrl(i: number) {
  return `/framesEdge/frame_${String(i).padStart(3, '0')}.jpg`;
}

interface Props {
  onComplete: (images: HTMLImageElement[]) => void;
}

export default function Preloader({ onComplete }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef(0);
  const firedRef = useRef(false);
  const startTimeRef = useRef(Date.now());
  const strokeRef = useRef<SVGCircleElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const imgs: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL; i++) {
      const img = new Image();
      img.src = frameUrl(i);
      imgs.push(img);

      img.onload = img.onerror = () => {
        loadedRef.current += 1;
        setProgress(Math.round((loadedRef.current / TOTAL) * 100));
      };
    }

    imagesRef.current = imgs;
  }, []);

  useEffect(() => {
    const pulse = gsap.timeline({ repeat: -1 });
    pulse
      .to(strokeRef.current, { attr: { stroke: '#00f5ff' }, duration: 0.8, ease: 'sine.inOut' })
      .to(glowRef.current, { opacity: 0.6, duration: 0.8, ease: 'sine.inOut' }, '<')
      .to(strokeRef.current, { attr: { stroke: '#a855f7' }, duration: 0.8, ease: 'sine.inOut' })
      .to(glowRef.current, { opacity: 0.3, duration: 0.8, ease: 'sine.inOut' }, '<')
      .to(strokeRef.current, { attr: { stroke: '#ffffff' }, duration: 0.8, ease: 'sine.inOut' })
      .to(glowRef.current, { opacity: 0, duration: 0.8, ease: 'sine.inOut' }, '<');
    return () => {
      pulse.kill();
    };
  }, []);

  useEffect(() => {
    if (progress < 100 || firedRef.current) return;
    firedRef.current = true;

    const elapsed = Date.now() - startTimeRef.current;
    const delay = Math.max(0, 2000 - elapsed) / 1000;

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.6,
      delay,
      ease: 'power2.inOut',
      onComplete: () => onComplete(imagesRef.current),
    });
  }, [progress, onComplete]);

  const circumference = 2 * Math.PI * 28;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center gap-6"
    >
      <div className="relative flex items-center justify-center">
        <div
          ref={glowRef}
          className="absolute w-24 h-24 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #00f5ff 0%, transparent 70%)',
            filter: 'blur(12px)',
            opacity: 0,
          }}
        />
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="28" stroke="white" strokeWidth="1" strokeOpacity="0.15" />
          <circle
            ref={strokeRef}
            cx="32"
            cy="32"
            r="28"
            stroke="white"
            strokeWidth="1.5"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress / 100)}
            strokeLinecap="round"
            transform="rotate(-90 32 32)"
            style={{ transition: 'stroke-dashoffset 0.12s linear' }}
          />
        </svg>
      </div>
      <span className="text-white/30 text-xs font-mono tracking-[0.25em]">
        {String(progress).padStart(3, '0')}
      </span>
    </div>
  );
}
