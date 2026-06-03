"use client";

import dynamic from "next/dynamic";
import { siteConfig } from "@/lib/siteConfig";

const BlogHorizontalScroll = dynamic(() => import("./BlogHorizontalScroll"), { ssr: false });
const BlogCardGrid = dynamic(() => import("./BlogCardGrid"), { ssr: false });
const BlogStaggeredDistort = dynamic(() => import("./BlogStaggeredDistort"), { ssr: false });
const BlogMinimalistText = dynamic(() => import("./BlogMinimalistText"), { ssr: false });

function BlogWrapper({ children }: { children: React.ReactNode }) {
  const variant = siteConfig.blog.variant;
  const isHorizontal = variant === "horizontal-scroll";

  if (isHorizontal) {
    return (
      <section className="bg-black border-t border-zinc-900">
        <div className="px-8 md:px-16 py-16">
          <span className="font-mono text-[10px] text-white/30 tracking-[0.5em] uppercase block mb-4">
            Journal
          </span>
          <h2
            className="font-syne font-black uppercase text-white tracking-tighter leading-none mb-2"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
          >
            Insights &amp;<br />Perspectives
          </h2>
        </div>
        {children}
      </section>
    );
  }

  return (
    <section className="py-24 px-8 md:px-16 bg-black border-t border-zinc-900">
      <div className="mb-16">
        <span className="font-mono text-[10px] text-white/30 tracking-[0.5em] uppercase block mb-4">
          Journal
        </span>
        <h2
          className="font-syne font-black uppercase text-white tracking-tighter leading-none"
          style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
        >
          Insights &amp;<br />Perspectives
        </h2>
      </div>
      {children}
    </section>
  );
}

export default function Blog() {
  const { variant } = siteConfig.blog;

  return (
    <BlogWrapper>
      {variant === "horizontal-scroll" && <BlogHorizontalScroll />}
      {variant === "card-grid" && <BlogCardGrid />}
      {variant === "staggered-distort" && <BlogStaggeredDistort />}
      {variant === "minimalist-text" && <BlogMinimalistText />}
    </BlogWrapper>
  );
}
