"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BLOG_POSTS } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function BlogMinimalistText() {
  const listRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const rows = listRef.current?.querySelectorAll<HTMLElement>("[data-row]");
    if (!rows) return;

    gsap.fromTo(
      Array.from(rows),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.07,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <div ref={listRef}>
      {BLOG_POSTS.map((post) => (
        <div
          key={post.id}
          data-row
          className="group relative border-t border-zinc-800 last:border-b cursor-pointer"
          style={{ opacity: 0 }}
          onMouseEnter={() => setHoveredId(post.id)}
          onMouseLeave={() => setHoveredId(null)}
          data-cursor-type="read"
        >
          <div
            className="absolute inset-0 transition-colors duration-300"
            style={{ background: hoveredId === post.id ? "rgba(255,255,255,0.03)" : "transparent" }}
          />
          <div className="relative flex items-center justify-between py-5 px-2">
            <div className="flex items-center gap-6 flex-1">
              <span className="font-mono text-[9px] text-white/25 tracking-widest uppercase w-20 flex-shrink-0 hidden md:block">
                {post.category}
              </span>
              <h3
                className="font-syne font-bold text-lg md:text-xl text-white transition-colors duration-300"
                style={{ color: hoveredId === post.id ? "rgb(251, 191, 36)" : "white" }}
              >
                {post.title}
              </h3>
            </div>
            <div
              className="flex items-center gap-4 transition-opacity duration-300"
              style={{ opacity: hoveredId === post.id ? 1 : 0 }}
            >
              <span className="font-mono text-xs text-white/40">{post.date}</span>
              <span className="font-mono text-xs text-white/60">→</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
