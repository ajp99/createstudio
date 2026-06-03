"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TESTIMONIALS } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function SplitTestimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const items = leftRef.current?.querySelectorAll<HTMLDivElement>("[data-testimonial]");
    if (!items) return;

    items.forEach((item, i) => {
      ScrollTrigger.create({
        trigger: item,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => setActiveIndex(i),
        onEnterBack: () => setActiveIndex(i),
      });

      const words = item.querySelectorAll(".word");
      gsap.fromTo(
        words,
        { opacity: 0, y: 20, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.04,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 70%",
          },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-zinc-950">
      <div className="px-8 md:px-16 mb-16">
        <span className="font-mono text-[10px] text-white/30 tracking-[0.5em] uppercase block mb-4">
          Testimonials
        </span>
        <h2
          className="font-syne font-black uppercase text-white tracking-tighter leading-none"
          style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
        >
          Client<br />Stories
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-0 relative">
        <div ref={leftRef} className="lg:w-3/5 px-8 md:px-16 space-y-24 pb-24">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.id}
              data-testimonial={i}
              className="border-t border-zinc-800 pt-12"
            >
              <blockquote className="font-syne text-xl md:text-2xl text-white leading-relaxed mb-8">
                {t.quote.split(" ").map((word, wi) => (
                  <span key={wi} className="word inline-block mr-[0.3em]" style={{ opacity: 0 }}>
                    {word}
                  </span>
                ))}
              </blockquote>
              <div className="flex items-center gap-4">
                <img
                  src={t.portrait}
                  alt={t.author}
                  className="w-10 h-10 rounded-full object-cover grayscale"
                />
                <div>
                  <p className="font-syne font-bold text-sm text-white">{t.author}</p>
                  <p className="font-mono text-xs text-white/40">{t.role}, {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden lg:block lg:w-2/5 relative">
          <div className="sticky top-1/4 h-[60vh] pr-16">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              {TESTIMONIALS.map((t, i) => (
                <img
                  key={t.id}
                  src={t.portrait}
                  alt={t.author}
                  className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 ease-out"
                  style={{
                    opacity: i === activeIndex ? 1 : 0,
                    transform: i === activeIndex ? "scale(1)" : "scale(1.04)",
                  }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              <div className="absolute bottom-6 left-6">
                <p className="font-syne font-bold text-white text-lg">{TESTIMONIALS[activeIndex]?.author}</p>
                <p className="font-mono text-xs text-white/50">{TESTIMONIALS[activeIndex]?.company}</p>
              </div>

              <div className="absolute top-6 right-6 flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <div
                    key={i}
                    className="h-px rounded-full transition-all duration-500"
                    style={{
                      width: i === activeIndex ? 24 : 8,
                      background: i === activeIndex ? "white" : "rgba(255,255,255,0.2)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
