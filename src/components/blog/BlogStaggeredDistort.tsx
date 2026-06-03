"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BLOG_POSTS, BlogPost } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

function PostRow({ post, index }: { post: BlogPost; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!rowRef.current) return;

    gsap.fromTo(
      rowRef.current,
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rowRef.current,
          start: "top 85%",
        },
        delay: index * 0.1,
      }
    );

    const onMove = (e: MouseEvent) => {
      if (!imgRef.current) return;
      const rect = rowRef.current!.getBoundingClientRect();
      const rx = e.clientX - rect.left;
      const ry = e.clientY - rect.top;
      mousePos.current = { x: rx, y: ry };
      gsap.to(imgRef.current, {
        x: rx + 20,
        y: ry - 80,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const el = rowRef.current;
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [index]);

  return (
    <div
      ref={rowRef}
      className="relative group border-b border-zinc-800 py-6 cursor-pointer"
      data-cursor-type="read"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ opacity: 0 }}
    >
      <div className="flex items-center justify-between gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-[9px] text-white/30 tracking-widest uppercase">{post.category}</span>
            <span className="font-mono text-[9px] text-white/20">{post.date}</span>
          </div>
          <h3 className="font-syne font-bold text-xl md:text-2xl text-white leading-tight group-hover:text-amber-100 transition-colors duration-300">
            {post.title}
          </h3>
        </div>
        <div className="hidden md:flex items-center gap-4 flex-shrink-0">
          <span className="font-mono text-xs text-white/30">{post.readTime}</span>
          <span className="font-mono text-xs text-white/50 group-hover:text-white transition-colors">→</span>
        </div>
      </div>

      <div
        ref={imgRef}
        className="absolute pointer-events-none rounded-lg overflow-hidden border border-zinc-700 z-50"
        style={{
          width: 280,
          height: 180,
          top: 0,
          left: 0,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scale(1)" : "scale(0.9)",
          transition: "opacity 0.3s, transform 0.3s",
          filter: hovered ? "saturate(0.7) contrast(1.1)" : "saturate(0)",
        }}
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default function BlogStaggeredDistort() {
  return (
    <div className="divide-y divide-zinc-900/0">
      {BLOG_POSTS.map((post, i) => (
        <PostRow key={post.id} post={post} index={i} />
      ))}
    </div>
  );
}
