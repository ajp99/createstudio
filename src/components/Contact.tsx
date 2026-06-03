"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
        delay: 0.3,
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center text-center px-8 py-24 bg-black border-t border-zinc-900"
    >
      <span className="font-mono text-[10px] tracking-[0.5em] text-white/25 uppercase mb-10 block">
        Contact
      </span>

      <h2
        ref={headingRef}
        className="font-syne font-black uppercase tracking-tighter text-white leading-none mb-8"
        style={{ fontSize: "clamp(3rem, 10vw, 10rem)", opacity: 0 }}
      >
        Let&apos;s Build<br />Something.
      </h2>

      <div ref={contentRef} className="max-w-lg" style={{ opacity: 0 }}>
        <p className="font-inter text-white/40 text-lg leading-relaxed mb-12">
          From landmark towers to intimate residences — we bring spatial vision and obsessive craft to every commission.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            className="group relative px-10 py-4 rounded-full border border-white/20 font-mono text-xs tracking-widest text-white/60 hover:text-white hover:border-white/60 transition-all duration-500 overflow-hidden"
            data-cursor-type="view"
          >
            <span className="relative z-10">GET IN TOUCH</span>
            <div className="absolute inset-0 bg-white/5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded-full" />
          </button>

          <a
            href="mailto:studio@createstudio.com"
            className="font-mono text-xs text-white/30 hover:text-white transition-colors duration-300 tracking-widest"
          >
            studio@createstudio.com
          </a>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8">
          {["Instagram", "Behance", "LinkedIn"].map((s) => (
            <a
              key={s}
              href="#"
              className="font-mono text-[10px] text-zinc-600 hover:text-white transition-colors duration-300 tracking-widest uppercase"
            >
              {s}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-24 font-mono text-xs text-zinc-800">
        © 2026 CREATE STUDIO. ALL RIGHTS RESERVED.
      </div>
    </section>
  );
}
