"use client"

import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing"
import { CameraRig } from "./camera-rig"
import { Terrain } from "./terrain"
import { SkyTrails } from "./sky-trails"
import { Particles } from "./particles"
import { Figure } from "./figure"
import { Rings } from "./rings"
import { Portal } from "./portal"

// Composes the whole cinematic world plus the UnrealBloom-style post stack.
export function Scene() {
  return (
    <>
      <CameraRig />

      {/* lighting — soft volumetric feel */}
      <ambientLight intensity={0.35} color="#b07cff" />
      <directionalLight position={[5, 12, 6]} intensity={0.8} color="#ff9bef" />
      <pointLight position={[0, 6, -20]} intensity={9} color="#9d4edd" distance={55} />

      <SkyTrails />
      <Terrain />
      <Figure />
      <Rings />
      <Portal />
      <Particles />

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.9}
          luminanceThreshold={0.55}
          luminanceSmoothing={0.4}
          mipmapBlur
          radius={0.75}
        />
        <Noise opacity={0.025} />
        <Vignette eskil={false} offset={0.25} darkness={0.95} />
      </EffectComposer>
    </>
  )
}
