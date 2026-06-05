"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BLOG_POSTS } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function BlogCardGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLDivElement>(".blog-card");
    if (!cards) return;

    gsap.fromTo(
      Array.from(cards),
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {BLOG_POSTS.map((post) => (
        <article
          key={post.id}
          className="blog-card group relative overflow-hidden rounded-xl bg-zinc-950 border border-zinc-900 cursor-pointer"
          data-cursor-type="read"
          style={{ opacity: 0 }}
        >
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[9px] text-white/30 tracking-widest uppercase">{post.category}</span>
              <span className="w-1 h-1 rounded-full bg-zinc-700" />
              <span className="font-mono text-[9px] text-white/30">{post.readTime}</span>
            </div>
            <h3 className="font-syne font-bold text-lg text-white leading-tight mb-3 group-hover:text-amber-100 transition-colors duration-300">
              {post.title}
            </h3>
            <p className="font-inter text-sm text-white/40 leading-relaxed line-clamp-2">{post.excerpt}</p>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-900">
              <span className="font-mono text-xs text-white/30">{post.date}</span>
              <span className="font-mono text-xs text-white/50 group-hover:text-white transition-colors">Read →</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
