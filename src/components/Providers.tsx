"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";
import LenisProvider from "./LenisProvider";
import NoiseOverlay from "./NoiseOverlay";
import CustomCursor from "./CustomCursor";
import { siteConfig } from "@/lib/siteConfig";

const BackgroundParticles = dynamic(() => import("./three/BackgroundParticles"), { ssr: false });

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LenisProvider>
      {siteConfig.features.webglBackgroundParticles && <BackgroundParticles />}
      {siteConfig.features.noiseOverlay && <NoiseOverlay />}
      {siteConfig.features.customCursor && <CustomCursor />}
      {children}
    </LenisProvider>
  );
}
