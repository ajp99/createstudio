"use client";

import { useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import IntroMask from "@/components/IntroMask";
import HorizontalScroll from "@/components/HorizontalScroll";

gsap.registerPlugin(ScrollTrigger);

// ─── Shared type ────────────────────────────────────────────────────────────
interface ProjectCard {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  span: string; // tailwind col/row span classes
}

const PROJECTS: ProjectCard[] = [
  { id: "01", title: "KRONOS MONOLITH",     category: "Architecture",     year: "2026", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=900", span: "col-span-8 row-span-2" },
  { id: "02", title: "NEO-BRUTALIST VILLA", category: "Interior",         year: "2025", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600", span: "col-span-4 row-span-1" },
  { id: "03", title: "ELEVATE HQ",          category: "Structural",       year: "2026", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600", span: "col-span-4 row-span-1" },
  { id: "04", title: "SHADOWPLAY PAVILION", category: "Exhibition",       year: "2025", image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=900", span: "col-span-5 row-span-2" },
  { id: "05", title: "AETHER RESIDENCE",    category: "Sustainable",      year: "2026", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600", span: "col-span-4 row-span-1" },
  { id: "06", title: "THE CREATIVE LAB",    category: "Digital Workspace", year: "2026", image: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=600", span: "col-span-3 row-span-1" },
  { id: "07", title: "OBSIDIAN TOWER",      category: "Landmark",         year: "2025", image: "https://images.unsplash.com/photo-1624213111452-35e8d3d5cc18?q=80&w=600", span: "col-span-4 row-span-1" },
  { id: "08", title: "VOID GALLERY",        category: "Art Space",        year: "2026", image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=600", span: "col-span-8 row-span-1" },
];

// ─── Mini card component ─────────────────────────────────────────────────────
function BentoCard({ p, cardRef }: { p: ProjectCard; cardRef: (el: HTMLDivElement | null) => void }) {
  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-2xl bg-zinc-950 border border-zinc-900 cursor-pointer ${p.span}`}
      style={{ opacity: 0, transform: "translateY(40px)", willChange: "transform, opacity", minHeight: "220px" }}
    >
      <img
        src={p.image}
        alt={p.title}
        className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out will-change-transform"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 right-0 z-20 p-5 flex flex-col gap-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[9px] tracking-widest text-white/40 uppercase">{p.category}</span>
          <span className="font-mono text-[9px] text-zinc-600">{p.year}</span>
        </div>
        <h3 className="font-syne font-bold text-lg text-white tracking-tight uppercase leading-tight group-hover:text-amber-100 transition-colors duration-300">
          {p.title}
        </h3>
      </div>
      <span className="absolute top-4 right-4 z-20 font-mono text-xs text-white/20">[{p.id}]</span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const mainRef        = useRef<HTMLDivElement>(null);
  const introRef       = useRef<HTMLDivElement>(null);   // scroll dummy for mask-zoom
  const textGroupRef   = useRef<SVGGElement>(null);
  const letterRef      = useRef<SVGTSpanElement>(null);
  const headerRef      = useRef<HTMLDivElement>(null);
  const cardRefs       = useRef<(HTMLDivElement | null)[]>([]);
  const hasRevealed    = useRef(false);

  const [isIntroComplete, setIsIntroComplete] = useState(false);

  const setCardRef = useCallback(
    (i: number) => (el: HTMLDivElement | null) => { cardRefs.current[i] = el; },
    []
  );

  useGSAP(
    () => {
      const letter = letterRef.current;
      if (!letter) return;

      // ── Compute letter "A" focal point ──────────────────────────────────
      const bbox    = letter.getBBox();
      const originX = bbox.x + bbox.width  / 2;
      const originY = bbox.y + bbox.height / 2;
      const dx = 960 - originX;
      const dy = 540 - originY;

      gsap.set(textGroupRef.current, {
        transformOrigin: `${originX}px ${originY}px`,
      });

      // ── FOUC fade-in ────────────────────────────────────────────────────
      gsap.to(mainRef.current, { opacity: 1, duration: 0.6, ease: "power2.out" });

      // ── Phase 2: SVG mask zoom (pinned 180 vh) ──────────────────────────
      const zoomTl = gsap.timeline({
        scrollTrigger: {
          trigger: introRef.current,
          start: "top top",
          end: "+=180%",
          scrub: 1.2,
          pin: introRef.current,
          anticipatePin: 1,
          onUpdate(self) {
            // Fire stagger exactly once past 85 % progress
            if (self.progress > 0.85 && !hasRevealed.current) {
              hasRevealed.current = true;

              gsap.to(headerRef.current, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" });
              gsap.to(cardRefs.current.filter(Boolean), {
                opacity: 1, y: 0, stagger: 0.07, duration: 1.2, ease: "power4.out", overwrite: "auto",
              });
            }
            setIsIntroComplete(self.progress >= 0.98);
          },
        },
      });

      zoomTl.to(textGroupRef.current, { scale: 200, x: dx, y: dy, ease: "none" }, 0);
    },
    { scope: mainRef }
  );

  return (
    <main ref={mainRef} className="relative w-full bg-black opacity-0" style={{ willChange: "opacity" }}>

      {/* ── PHASE 1 & 2: Intro pinned section ───────────────────────────── */}
      <div ref={introRef} className="relative w-full h-screen overflow-hidden">

        {/* Background bento grid (seen through the letter cutout) */}
        <div className="absolute inset-0 p-6 md:p-12 overflow-hidden pointer-events-none">
          {/* Studio header */}
          <div
            ref={headerRef}
            className="mb-8 flex justify-between items-end opacity-0"
            style={{ transform: "translateY(20px)" }}
          >
            <h1 className="font-syne font-black text-3xl md:text-4xl text-white uppercase tracking-tighter leading-none">
              CREATE<br/>STUDIO™
            </h1>
            <p className="font-mono text-xs text-zinc-500 hidden md:block">Truminds Design Agency</p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-12 auto-rows-[160px] gap-3 md:gap-4 w-full max-w-full">
            {PROJECTS.map((p, i) => (
              <BentoCard key={p.id} p={p} cardRef={setCardRef(i)} />
            ))}
          </div>
        </div>

        {/* Glassmorphism text-mask overlay */}
        <IntroMask
          textGroupRef={textGroupRef}
          letterRef={letterRef}
          isIntroComplete={isIntroComplete}
        />
      </div>

      {/* ── PHASE 3: Horizontal scroll portfolio ────────────────────────── */}
      <HorizontalScroll />

      {/* ── Contact footer ───────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-8 py-24 bg-black border-t border-zinc-900">
        <span className="font-mono text-xs tracking-[0.4em] text-white/30 uppercase mb-8">Contact</span>
        <h2
          className="font-syne font-black uppercase tracking-tighter text-white leading-none mb-8"
          style={{ fontSize: "clamp(3rem, 10vw, 10rem)" }}
        >
          Let's Build<br/>Something.
        </h2>
        <p className="text-white/40 max-w-md text-lg leading-relaxed mb-12">
          This section appears after the horizontal scroll finishes — the full story lands here.
        </p>
        <button className="group relative px-10 py-4 rounded-full border border-white/20 font-mono text-xs tracking-widest text-white/60 hover:text-white hover:border-white/60 transition-all duration-500 overflow-hidden">
          <span className="relative z-10">GET IN TOUCH</span>
          <div className="absolute inset-0 bg-white/5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded-full" />
        </button>

        <div className="mt-24 font-mono text-xs text-zinc-700">
          © 2026 CREATE STUDIO. ALL RIGHTS RESERVED.
        </div>
      </section>
    </main>
  );
}
