"use client";

import dynamic from "next/dynamic";
import { siteConfig } from "@/lib/siteConfig";

const MasonryDragPortfolio = dynamic(() => import("./MasonryDragPortfolio"), { ssr: false });
const Carousel3DPortfolio = dynamic(() => import("./Carousel3DPortfolio"), { ssr: false });

export default function Portfolio() {
  return siteConfig.portfolio.variant === "masonry-drag" ? (
    <MasonryDragPortfolio />
  ) : (
    <Carousel3DPortfolio />
  );
}
