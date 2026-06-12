'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SRC_W = 1920;
const SRC_H = 1080;

type TextPosition = 'TL' | 'TM' | 'TR' | 'ML' | 'MM' | 'MR' | 'BL' | 'BM' | 'BR';

const positionStyles: Record<TextPosition, React.CSSProperties> = {
  TL: { top: '3rem', left: '3rem' },
  TM: { top: '3rem', left: '50%', transform: 'translateX(-50%)' },
  TR: { top: '3rem', right: '3rem' },
  ML: { top: '50%', left: '3rem', transform: 'translateY(-50%)' },
  MM: { top: '50%', left: '50%', transform: 'translate(-50%,-50%)' },
  MR: { top: '50%', right: '3rem', transform: 'translateY(-50%)' },
  BL: { bottom: '3rem', left: '3rem' },
  BM: { bottom: '3rem', left: '50%', transform: 'translateX(-50%)' },
  BR: { bottom: '3rem', right: '3rem' },
};

interface TextTimelineItem {
  text: string;
  startFrame: number;
  endFrame: number;
  position: TextPosition;
}

const textSequences: TextTimelineItem[] = [
  { text: 'Think AI.', startFrame: 20, endFrame: 40, position: 'BL' },
  { text: 'Create Value.', startFrame: 55, endFrame: 75, position: 'MM' },
  { text: 'Build Future.', startFrame: 90, endFrame: 117, position: 'TR' },
];

const TITLE_CHARS = 'CREATE STUDIO'.split('');

interface Props {
  images: HTMLImageElement[];
}

export default function CanvasSequence({ images }: Props) {
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameObj = useRef({ currentFrame: 0 });
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const endOverlayRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const endFiredRef = useRef(false);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const img = images[Math.max(0, Math.min(index, images.length - 1))];
      if (!img) return;

      const vpW = canvas.width;
      const vpH = canvas.height;
      const scale = Math.max(vpW / SRC_W, vpH / SRC_H);
      const drawW = SRC_W * scale;
      const drawH = SRC_H * scale;

      ctx.clearRect(0, 0, vpW, vpH);
      ctx.drawImage(img, (vpW - drawW) / 2, (vpH - drawH) / 2, drawW, drawH);
    },
    [images]
  );

  const updateText = useCallback((frame: number) => {
    textSequences.forEach((item, i) => {
      const el = textRefs.current[i];
      if (!el) return;
      const fadeIn = Math.min(1, (frame - item.startFrame) / 4);
      const fadeOut = Math.min(1, (item.endFrame - frame) / 4);
      el.style.opacity = String(Math.min(fadeIn, fadeOut));
    });

    // Scroll hint: fade out after frame 2
    const hint = scrollHintRef.current;
    if (hint) {
      const hintOpacity = Math.max(0, 1 - (frame - 1) / 1);
      hint.style.opacity = String(hintOpacity);
    }
  }, []);

  // Size canvas to viewport and redraw on resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(Math.round(frameObj.current.currentFrame));
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [drawFrame]);

  // GSAP scroll-to-frame animation
  useGSAP(
    () => {
      drawFrame(0);
      updateText(0);

      gsap.to(frameObj.current, {
        currentFrame: images.length - 1,
        ease: 'none',
        scrollTrigger: {
          trigger: scrollTrackRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          onUpdate: () => {
            const f = Math.round(frameObj.current.currentFrame);
            drawFrame(f);
            updateText(f);
          },
          onLeave: () => {
            if (endFiredRef.current) return;
            endFiredRef.current = true;
            gsap.timeline()
              .to(endOverlayRef.current, { opacity: 1, duration: 0.5, ease: 'power2.inOut' })
              .to(charRefs.current.filter(Boolean), {
                opacity: 1, duration: 0.06, stagger: 0.07, ease: 'none',
              });
          },
          onEnterBack: () => {
            endFiredRef.current = false;
            gsap.set(endOverlayRef.current, { opacity: 0 });
            gsap.set(charRefs.current, { opacity: 0 });
          },
        },
      });
    },
    { scope: scrollTrackRef, dependencies: [images, drawFrame, updateText] }
  );

  return (
    <div ref={scrollTrackRef} className="w-full h-[300vh] relative">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
        <canvas ref={canvasRef} className="absolute inset-0" />

        {/* Text overlays */}
        <div className="absolute inset-0 pointer-events-none">
          {textSequences.map((item, i) => (
            <span
              key={i}
              ref={el => {
                textRefs.current[i] = el;
              }}
              className="absolute text-white text-5xl font-bold tracking-tight leading-none"
              style={{ ...positionStyles[item.position], opacity: 0 }}
            >
              {item.text}
            </span>
          ))}
        </div>

        {/* Black fade overlay */}
        <div
          ref={endOverlayRef}
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: 0 }}
        />

        {/* CREATE STUDIO title */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {TITLE_CHARS.map((ch, i) => (
            <span
              key={i}
              ref={el => {
                charRefs.current[i] = el;
              }}
              className="font-bold text-white"
              style={{
                fontSize: 'clamp(2rem, 6vw, 30vh)',
                opacity: 0,
                display: 'inline-block',
                whiteSpace: 'pre',
              }}
            >
              {ch}
            </span>
          ))}
        </div>

        {/* Scroll to explore hint */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2 pointer-events-none"
          style={{ opacity: 1, transform: 'translateX(-50%)' }}
        >
          <p className="text-white/60 text-sm font-mono tracking-widest uppercase">Scroll to explore</p>
          <div className="relative w-6 h-10 border border-white/40 rounded-full flex items-start justify-center pt-2">
            <svg
              className="w-1 h-2 animate-bounce"
              style={{
                fill: 'currentColor',
                color: '#00f5ff',
                filter: 'drop-shadow(0 0 8px #00f5ff)',
              }}
              viewBox="0 0 2 4"
            >
              <polygon points="0,0 2,0 1,2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
