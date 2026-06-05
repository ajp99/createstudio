"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GALLERY_IMAGES } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);

  useEffect(() => {
    itemRefs.current.forEach((el) => {
      if (!el) return;
      const img = el.querySelector("img");
      gsap.fromTo(
        img,
        { clipPath: "inset(0% 100% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
      gsap.fromTo(
        el.querySelector(".gallery-caption"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
          delay: 0.3,
        }
      );
    });
  }, []);

  const openLightbox = (src: string, caption: string) => {
    setLightbox({ src, caption });
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightbox(null);
    document.body.style.overflow = "";
  };

  return (
    <section ref={sectionRef} className="py-24 px-8 md:px-16 bg-black">
      <div className="mb-16">
        <span className="font-mono text-[10px] text-white/30 tracking-[0.5em] uppercase block mb-4">
          Process
        </span>
        <h2
          className="font-syne font-black uppercase text-white tracking-tighter leading-none"
          style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
        >
          Behind<br />the Scenes
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {GALLERY_IMAGES.map((img, i) => (
          <div
            key={img.id}
            ref={(el) => { itemRefs.current[i] = el; }}
            className="group relative cursor-pointer overflow-hidden rounded-xl aspect-[4/3] bg-zinc-950"
            onClick={() => openLightbox(img.src, img.caption)}
            data-cursor-type="open"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
              style={{ clipPath: "inset(0% 100% 0% 0%)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            <div className="gallery-caption absolute bottom-4 left-4 opacity-0">
              <span className="font-syne font-bold text-sm text-white">{img.caption}</span>
            </div>
          </div>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[5000] bg-black/95 flex items-center justify-center p-8"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 font-mono text-xs text-white/50 hover:text-white tracking-widest uppercase transition-colors"
            onClick={closeLightbox}
          >
            Close ×
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.src}
              alt={lightbox.caption}
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
            <p className="font-syne font-bold text-white text-lg mt-4">{lightbox.caption}</p>
          </div>
        </div>
      )}
    </section>
  );
}
