"use client";

import dynamic from "next/dynamic";
import { siteConfig } from "@/lib/siteConfig";

const SplitTestimonials = dynamic(() => import("./SplitTestimonials"), { ssr: false });
const CylinderTestimonials = dynamic(() => import("./CylinderTestimonials"), { ssr: false });

export default function Testimonials() {
  return siteConfig.testimonials.variant === "split-scroll" ? (
    <SplitTestimonials />
  ) : (
    <CylinderTestimonials />
  );
}
