'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SRC_W = 1920;
const SRC_H = 1080;

interface Props {
  images: HTMLImageElement[];
}

export default function EdgeCanvas({ images }: Props) {
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameObj = useRef({ currentFrame: 0 });
  const p1OverlayRef = useRef<HTMLDivElement>(null);
  const endFiredRef = useRef(false);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const whiteOverlayRef = useRef<HTMLDivElement>(null);

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

  // Phase 1: canvas frame sequence
  useGSAP(
    () => {
      drawFrame(0);

      gsap.to(frameObj.current, {
        currentFrame: images.length - 1,
        ease: 'none',
        scrollTrigger: {
          trigger: phase1Ref.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          onUpdate: () => {
            const f = Math.round(frameObj.current.currentFrame);
            drawFrame(f);

            // fade scroll hint out after frame 2
            const hint = scrollHintRef.current;
            if (hint) {
              hint.style.opacity = String(Math.max(0, 1 - (f - 1)));
            }
          },
          onLeave: () => {
            if (endFiredRef.current) return;
            endFiredRef.current = true;
            gsap.to(p1OverlayRef.current, { opacity: 1, duration: 0.4, ease: 'power2.inOut' });
          },
          onEnterBack: () => {
            endFiredRef.current = false;
            gsap.set(p1OverlayRef.current, { opacity: 0 });
          },
        },
      });
    },
    { scope: phase1Ref, dependencies: [images, drawFrame] }
  );

  // Phase 2: "Create Studio" text zoom-through
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: phase2Ref.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, scale: 1 },
        { opacity: 1, scale: 1, duration: 0.15, ease: 'none' }
      )
        .to(
          titleRef.current,
          { scale: 28, duration: 0.85, ease: 'power2.in' },
          '<'
        )
        .to(
          whiteOverlayRef.current,
          { opacity: 1, duration: 0.3, ease: 'power2.inOut' },
          0.7
        );
    },
    { scope: phase2Ref, dependencies: [] }
  );

  return (
    <>
      {/* Phase 1 — frame sequence */}
      <div ref={phase1Ref} className="w-full h-[600vh] relative">
        <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
          <canvas ref={canvasRef} className="absolute inset-0" />

          {/* black fade overlay at end of sequence */}
          <div
            ref={p1OverlayRef}
            className="absolute inset-0 bg-black pointer-events-none"
            style={{ opacity: 0 }}
          />

          {/* scroll hint */}
          <div
            ref={scrollHintRef}
            className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2 pointer-events-none"
            style={{ opacity: 1, transform: 'translateX(-50%)' }}
          >
            <p className="text-white/60 text-sm font-mono tracking-widest uppercase">
              Scroll to explore
            </p>
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

      {/* Phase 2 — text zoom-through */}
      <div ref={phase2Ref} className="w-full h-[300vh] relative">
        <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
          {/* perspective wrapper */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ perspective: '800px' }}
          >
            <h1
              ref={titleRef}
              className="font-bold text-white text-center pointer-events-none select-none"
              style={{
                fontSize: 'clamp(3rem, 8vw, 8rem)',
                letterSpacing: '-0.02em',
                transformOrigin: 'center center',
                willChange: 'transform',
                opacity: 0,
              }}
            >
              Create Studio
            </h1>
          </div>

          {/* white reveal overlay */}
          <div
            ref={whiteOverlayRef}
            className="absolute inset-0 bg-white pointer-events-none"
            style={{ opacity: 0 }}
          />
        </div>
      </div>
    </>
  );
}
