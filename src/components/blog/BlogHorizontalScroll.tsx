"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BLOG_POSTS } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function BlogHorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getTrackWidth = () => track.scrollWidth;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${getTrackWidth() - window.innerWidth + 200}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate(self) {
        const maxX = getTrackWidth() - window.innerWidth;
        gsap.set(track, { x: -(self.progress * maxX) });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div ref={sectionRef} className="relative overflow-hidden h-screen">
      <div ref={trackRef} className="flex items-center h-full gap-6 pl-8 pr-24" style={{ width: "max-content" }}>
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            className="group relative flex-shrink-0 w-[420px] h-[80vh] overflow-hidden rounded-xl cursor-pointer"
            data-cursor-type="read"
          >
            <img
              src={post.image}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-[9px] text-white/40 tracking-widest uppercase">{post.category}</span>
                <span className="font-mono text-[9px] text-white/30">{post.readTime}</span>
              </div>
              <h3 className="font-syne font-bold text-xl text-white leading-tight mb-3">
                {post.title}
              </h3>
              <p className="font-inter text-sm text-white/50 line-clamp-2 leading-relaxed">{post.excerpt}</p>
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10">
                <span className="font-mono text-xs text-white/30">{post.date}</span>
                <span className="font-mono text-xs text-white/60 group-hover:text-white transition-colors">Read →</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
