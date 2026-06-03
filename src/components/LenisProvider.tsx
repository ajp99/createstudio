"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function GSAPBridge() {
  const lenis = useLenis(({ scroll }) => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    if (!lenis) return;
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop: () => lenis.scroll,
      getBoundingClientRect: () => ({
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }),
    });
  }, [lenis]);

  return null;
}

export default function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
        duration: 1.2,
      }}
    >
      <GSAPBridge />
      {children}
    </ReactLenis>
  );
}
