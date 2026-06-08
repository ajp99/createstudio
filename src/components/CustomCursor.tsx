"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    gsap.set([ring, dot], { xPercent: -50, yPercent: -50 });

    const onMove = (e: MouseEvent) => {
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.5, ease: "power3.out" });
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.08, ease: "none" });
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("[data-cursor-type]");
      const type = el?.getAttribute("data-cursor-type");
      if (!type) return;

      const labels: Record<string, string> = { drag: "DRAG", view: "VIEW", read: "READ", open: "OPEN" };
      if (labelRef.current) labelRef.current.textContent = labels[type] ?? "";

      gsap.to(ring, { scale: 2.2, duration: 0.3, ease: "power2.out" });
      gsap.to(labelRef.current, { opacity: 1, duration: 0.2 });
    };

    const onOut = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("[data-cursor-type]");
      if (!el) return;
      gsap.to(ring, { scale: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(labelRef.current, { opacity: 0, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border-2 border-white rounded-full pointer-events-none z-[9999] flex items-center justify-center"
        style={{ willChange: "transform" }}
      >
        <span
          ref={labelRef}
          className="font-mono text-[7px] text-white tracking-[0.15em] opacity-0 uppercase"
        />
      </div>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999]"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
