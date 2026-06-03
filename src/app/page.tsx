"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Portfolio from "@/components/portfolio/Portfolio";
import Gallery from "@/components/gallery/Gallery";
import Testimonials from "@/components/testimonials/Testimonials";
import Blog from "@/components/blog/Blog";
import Contact from "@/components/Contact";
import { siteConfig } from "@/lib/siteConfig";

const Preloader = dynamic(() => import("@/components/Preloader"), { ssr: false });

export default function Home() {
  const [ready, setReady] = useState(!siteConfig.features.preloader);

  return (
    <main className="relative w-full bg-black">
      {siteConfig.features.preloader && !ready && (
        <Preloader onComplete={() => setReady(true)} />
      )}

      <div
        style={{
          opacity: ready ? 1 : 0,
          transition: ready ? "opacity 0.8s ease-out" : "none",
          visibility: ready ? "visible" : "hidden",
        }}
      >
        <Hero />
        <Portfolio />
        <Gallery />
        <Testimonials />
        <Blog />
        <Contact />
      </div>
    </main>
  );
}
