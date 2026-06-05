"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(() => import("./three/HeroScene"), { ssr: false });

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chars = charsRef.current.filter(Boolean) as HTMLSpanElement[];

    gsap.fromTo(
      chars,
      { opacity: 0, y: 80, filter: "blur(12px)", rotateX: -40 },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        rotateX: 0,
        stagger: 0.03,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.2,
      }
    );

    gsap.fromTo(
      [taglineRef.current, ctaRef.current],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power2.out", delay: 0.8 }
    );

    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      onUpdate(self) {
        gsap.set(heroRef.current, {
          opacity: Math.max(0, 1 - self.progress * 2),
          y: -self.progress * 80,
        });
      },
    });

    const onMouseMove = (e: MouseEvent) => {
      chars.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 160;
        const factor = Math.max(0, 1 - dist / maxDist);

        gsap.to(char, {
          x: -dx * factor * 0.25,
          y: -dy * factor * 0.25,
          rotation: dx * factor * 0.08,
          filter: factor > 0.3 ? `blur(${factor * 2.5}px)` : "blur(0px)",
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  const line1 = "CREATE";
  const line2 = "STUDIO";

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen flex items-center overflow-hidden"
      style={{ willChange: "transform, opacity" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <HeroScene />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none" />

      <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-5xl">
        <span className="font-mono text-[10px] text-white/30 tracking-[0.5em] uppercase block mb-8">
          Truminds Design Agency — Est. 2020
        </span>

        <h1
          className="font-syne font-black uppercase tracking-tighter text-white leading-[0.88] mb-6"
          style={{ fontSize: "clamp(5rem, 14vw, 14rem)", perspective: "600px" }}
        >
          <div className="block">
            {line1.split("").map((char, i) => (
              <span
                key={`l1-${i}`}
                ref={(el) => { charsRef.current[i] = el; }}
                className="inline-block"
                style={{ willChange: "transform, filter, opacity", display: "inline-block" }}
              >
                {char}
              </span>
            ))}
          </div>
          <div className="block">
            {line2.split("").map((char, i) => (
              <span
                key={`l2-${i}`}
                ref={(el) => { charsRef.current[line1.length + i] = el; }}
                className="inline-block text-transparent"
                style={{
                  willChange: "transform, filter, opacity",
                  display: "inline-block",
                  WebkitTextStroke: "2px rgba(255,255,255,0.8)",
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </h1>

        <p
          ref={taglineRef}
          className="font-inter text-white/50 text-lg max-w-sm leading-relaxed mb-10"
          style={{ opacity: 0 }}
        >
          Spatial intelligence meets digital craft. Architecture that moves.
        </p>

        <div ref={ctaRef} className="flex items-center gap-6" style={{ opacity: 0 }}>
          <button
            className="px-8 py-3.5 bg-white text-black font-mono text-[10px] tracking-[0.3em] uppercase hover:bg-zinc-200 transition-colors duration-300"
            data-cursor-type="view"
          >
            View Work
          </button>
          <button className="flex items-center gap-3 font-mono text-[10px] text-white/40 tracking-[0.3em] uppercase hover:text-white transition-colors duration-500">
            <span className="block w-10 h-px bg-white/30" />
            Our Story
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none">
        <span className="font-mono text-[9px] text-white/25 tracking-[0.4em] uppercase">Scroll</span>
        <div className="w-px h-14 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}
