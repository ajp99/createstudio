"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,        // Inertia factor (lower is smoother and slower)
        duration: 1.2,     // Scroll duration
        smoothWheel: true, // Smooth mouse wheel scrolling
      }}
    >
      {children}
    </ReactLenis>
  );
}
