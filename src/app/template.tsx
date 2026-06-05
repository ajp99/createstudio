"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const tl = gsap.timeline();
    tl.set(overlay, { scaleY: 1, transformOrigin: "top center" });
    tl.to(overlay, {
      scaleY: 0,
      transformOrigin: "top center",
      duration: 0.7,
      ease: "power4.inOut",
      delay: 0.1,
    });

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black z-[8000] pointer-events-none"
        style={{ transformOrigin: "top center" }}
        aria-hidden
      />
      {children}
    </>
  );
}
