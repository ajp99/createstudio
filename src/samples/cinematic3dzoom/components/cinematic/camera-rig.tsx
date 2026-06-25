"use client"

import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { scroll, advanceScroll } from "./scroll-store"
import { lerp, smoothstep } from "./math"

// The single per-frame driver. It advances the smoothed scroll value, moves
// the camera on a continuous Z push (never teleports), and lerps fog density
// and color so the world temperature shifts without any snap.
export function CameraRig() {
  const { camera, scene } = useThree()

  // ensure exponential fog exists
  if (!(scene.fog instanceof THREE.FogExp2)) {
    scene.fog = new THREE.FogExp2("#17002a", 0.022)
  }

  useFrame((state, delta) => {
    advanceScroll(delta)
    const s = scroll.current
    const t = state.clock.elapsedTime

    // Continuous camera push through chapter 0-80%.
    const baseZ = lerp(12, -16, smoothstep(0, 0.6, s))
    const settle = lerp(-16, -19, smoothstep(0.82, 1, s))
    const z = s < 0.82 ? baseZ : settle
    camera.position.z += (z - camera.position.z) * (1 - Math.pow(0.001, delta))

    // gentle handheld float — keeps motion alive when scrolling stops
    const floatX = Math.sin(t * 0.25) * 0.4 + scroll.velocity * 0.5
    const floatY = 0.5 + Math.cos(t * 0.2) * 0.25
    camera.position.x += (floatX - camera.position.x) * 0.04
    camera.position.y += (floatY - camera.position.y) * 0.04

    // Portal gaze: lift toward portal as it emerges (0.60-0.85)
    const portalGaze = smoothstep(0.60, 0.75, s) * (1 - smoothstep(0.90, 1, s))
    camera.lookAt(0, 0.5 + portalGaze * 3.2, camera.position.z - 10)

    // Fog density: rises as we enter (0-60%), eases toward orange world (80%+)
    const fog = scene.fog as THREE.FogExp2
    const density = lerp(
      0.02,
      0.045,
      smoothstep(0, 0.4, s) * (1 - smoothstep(0.80, 0.95, s) * 0.5),
    )
    fog.density += (density - fog.density) * 0.05
    // Fog color: violet (0%) → orange (80%+)
    const warm = smoothstep(0.80, 0.93, s)
    fog.color.lerpColors(
      new THREE.Color("#17002a"),
      new THREE.Color("#2a0f06"),
      warm,
    )
  })

  return null
}
