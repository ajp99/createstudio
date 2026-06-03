"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  {
    number: "01",
    label: "Slide One",
    title: "Brutalist Motion",
    desc: "Typography transitions while cards animate in with raw, kinetic energy.",
    cards: [
      { color: "#ff3b3b", rotate: "-10deg", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600" },
      { color: "#ff9d00", rotate: "8deg",   image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600" },
    ],
  },
  {
    number: "02",
    label: "Slide Two",
    title: "Dynamic Layouts",
    desc: "Smooth GSAP pinned horizontal movement across asymmetric spatial planes.",
    cards: [
      { color: "#2d6cff", rotate: "10deg",  image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600" },
      { color: "#00e1ff", rotate: "-6deg",  image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=600" },
    ],
  },
  {
    number: "03",
    label: "Slide Three",
    title: "Cinematic Storytelling",
    desc: "Clean transitions with scroll-driven motion and narrative precision.",
    cards: [
      { color: "#7cff00", rotate: "-12deg", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600" },
      { color: "#00d084", rotate: "5deg",   image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600" },
    ],
  },
  {
    number: "04",
    label: "Slide Four",
    title: "Spatial Architectures",
    desc: "Monolithic structures that challenge the threshold of digital space.",
    cards: [
      { color: "#a855f7", rotate: "-8deg",  image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600" },
      { color: "#ec4899", rotate: "7deg",   image: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=600" },
    ],
  },
  {
    number: "05",
    label: "Slide Five",
    title: "Neon Grid Systems",
    desc: "A visual language built from structured chaos and bold chromatic contrast.",
    cards: [
      { color: "#f97316", rotate: "10deg",  image: "https://images.unsplash.com/photo-1583321500900-82807e458f3c?q=80&w=600" },
      { color: "#facc15", rotate: "-9deg",  image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600" },
    ],
  },
  {
    number: "06",
    label: "Final Slide",
    title: "Seamless Exit",
    desc: "Scroll continues — the page becomes alive and unfolds into contact.",
    cards: [
      { color: "#ff00aa", rotate: "8deg",   image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=600" },
      { color: "#ff8fd3", rotate: "-8deg",  image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600" },
    ],
  },
];

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const section = sectionRef.current;
      if (!wrapper || !section) return;

      const panels = gsap.utils.toArray<HTMLElement>(".hs-panel");
      const getScrollDistance = () => wrapper.scrollWidth - window.innerWidth;

      // Horizontal translation tween
      const scrollTween = gsap.to(wrapper, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + getScrollDistance(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Per-panel reveal animations
      panels.forEach((panel) => {
        const title  = panel.querySelector<HTMLElement>(".hs-title");
        const desc   = panel.querySelector<HTMLElement>(".hs-desc");
        const label  = panel.querySelector<HTMLElement>(".hs-label");
        const num    = panel.querySelector<HTMLElement>(".hs-num");
        const cards  = panel.querySelectorAll<HTMLElement>(".hs-card");

        const stConfig = {
          trigger: panel,
          containerAnimation: scrollTween,
          start: "left center",
        };

        if (label) gsap.from(label, { y: 20, opacity: 0, duration: 0.8, ease: "power3.out", scrollTrigger: stConfig });
        if (num)   gsap.from(num,   { y: 30, opacity: 0, duration: 0.7, ease: "power3.out", delay: 0.05, scrollTrigger: stConfig });
        if (title) gsap.from(title, { y: 80, opacity: 0, duration: 1,   ease: "power4.out", delay: 0.1,  scrollTrigger: stConfig });
        if (desc)  gsap.from(desc,  { y: 40, opacity: 0, duration: 0.9, ease: "power3.out", delay: 0.2,  scrollTrigger: stConfig });

        cards.forEach((card, i) => {
          gsap.from(card, {
            scale: 0.7,
            rotate: i === 0 ? -15 : 12,
            opacity: 0,
            duration: 1.1,
            ease: "expo.out",
            delay: 0.15 + i * 0.12,
            scrollTrigger: stConfig,
          });
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="hs-section h-screen overflow-hidden">
      {/* Slide counter pill */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2 pointer-events-none">
        {SLIDES.map((s) => (
          <span
            key={s.number}
            className="w-1.5 h-1.5 rounded-full bg-white/20 block"
          />
        ))}
      </div>

      <div
        ref={wrapperRef}
        className="flex h-screen"
        style={{ width: `${SLIDES.length * 100}vw` }}
      >
        {SLIDES.map((slide) => (
          <div
            key={slide.number}
            className="hs-panel relative flex items-center px-10 md:px-20 h-screen border-r border-white/5"
            style={{ width: "100vw", flexShrink: 0 }}
          >
            {/* Subtle gradient backdrop per slide */}
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 60% 50%, ${slide.cards[0].color}55, transparent 70%)`,
              }}
            />

            <div className="w-full grid grid-cols-12 gap-8 items-center max-w-7xl mx-auto">
              {/* Text Column */}
              <div className="col-span-12 md:col-span-5 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <span className="hs-label font-mono text-xs tracking-[0.3em] text-white/40 uppercase">
                    {slide.label}
                  </span>
                  <span className="hs-num font-syne font-black text-6xl text-white/5 leading-none select-none">
                    {slide.number}
                  </span>
                </div>
                <h2 className="hs-title font-syne font-black uppercase tracking-tighter leading-none text-white"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 5.5rem)" }}
                >
                  {slide.title}
                </h2>
                <p className="hs-desc text-white/50 leading-relaxed max-w-sm text-base">
                  {slide.desc}
                </p>

                {/* CTA arrow */}
                <div className="flex items-center gap-3 mt-4 group cursor-pointer w-fit">
                  <span className="font-mono text-xs text-white/40 uppercase tracking-widest group-hover:text-white transition-colors duration-300">
                    View Project
                  </span>
                  <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:text-white group-hover:border-white/40 group-hover:translate-x-1 transition-all duration-300">
                    →
                  </span>
                </div>
              </div>

              {/* Cards Column */}
              <div className="col-span-12 md:col-span-7 relative flex items-center justify-center h-[440px] md:h-[520px]">
                {slide.cards.map((card, i) => (
                  <div
                    key={i}
                    className="hs-card absolute w-[260px] md:w-[300px] h-[380px] md:h-[420px] rounded-[28px] overflow-hidden shadow-2xl cursor-pointer"
                    style={{
                      rotate: card.rotate,
                      left: i === 0 ? "5%" : "auto",
                      right: i === 1 ? "5%" : "auto",
                      top: i === 0 ? "5%" : "auto",
                      bottom: i === 1 ? "5%" : "auto",
                      zIndex: i === 0 ? 2 : 1,
                      transition:
                        "transform 0.4s cubic-bezier(.2,.8,.2,1), box-shadow 0.4s ease, filter 0.4s ease",
                      willChange: "transform",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform =
                        "translateY(-18px) scale(1.07) rotate(4deg)";
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        `0 40px 120px rgba(0,0,0,0.7), 0 0 50px ${card.color}66`;
                      (e.currentTarget as HTMLElement).style.filter =
                        "brightness(1.15) saturate(1.25)";
                      (e.currentTarget as HTMLElement).style.zIndex = "20";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "";
                      (e.currentTarget as HTMLElement).style.boxShadow = "";
                      (e.currentTarget as HTMLElement).style.filter = "";
                      (e.currentTarget as HTMLElement).style.zIndex =
                        i === 0 ? "2" : "1";
                    }}
                  >
                    {/* Image fill */}
                    <img
                      src={card.image}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Color tint overlay */}
                    <div
                      className="absolute inset-0 mix-blend-color opacity-40"
                      style={{ background: card.color }}
                    />
                    {/* Bottom gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
