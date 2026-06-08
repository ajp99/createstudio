"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { scroll } from "./scroll-store"
import { clamp, elasticOut, lerp, remap, smoothstep } from "./math"

// One continuous family of glowing rings that:
//  - grow from zero at the figure's face (20-24%)
//  - spread along Z into a tunnel (38-44%)
//  - re-orient/scale so the tunnel reads as an entrance (continues)
// They share geometry and are driven entirely by scroll in useFrame so the
// morph is frame-smooth with no React re-renders.
const RING_COUNT = 26

export function Rings() {
  const group = useRef<THREE.Group>(null)
  const meshes = useRef<THREE.Mesh[]>([])

  const baseColor = useMemo(() => new THREE.Color("#ff4fd8"), [])
  const farColor = useMemo(() => new THREE.Color("#9d4edd"), [])

  useFrame((state) => {
    const s = scroll.current
    const t = state.clock.elapsedTime

    // appearance of the whole system (spec-aligned: 20-40% birth, 40-60% tunnel, 60-80% portal handoff)
    const birth = smoothstep(0.20, 0.28, s) // rings appear at face
    const tunnel = smoothstep(0.40, 0.55, s) // spread into tunnel
    const portalHandoff = smoothstep(0.60, 0.75, s) // fade as portal takes over

    const overallVisible = birth * (1 - portalHandoff)
    if (group.current) {
      group.current.visible = overallVisible > 0.001
    }

    for (let i = 0; i < RING_COUNT; i++) {
      const m = meshes.current[i]
      if (!m) continue
      const f = i / (RING_COUNT - 1) // 0..1 along the family

      // staggered elastic birth — inner rings first, near the face
      const localBirth = clamp(remap(birth, f * 0.5, f * 0.5 + 0.5))
      const grow = elasticOut(localBirth)

      // Z spread: at birth all rings sit near the face (z≈0). As tunnel
      // ramps, they spread backward into a corridor.
      const spread = lerp(0.2, 34, tunnel)
      const z = -f * spread

      // radius widens down the tunnel to give perspective depth
      const baseR = lerp(0.05, 1.0, grow)
      const tunnelR = lerp(baseR, 1.4 + f * 1.6, tunnel)
      m.scale.setScalar(tunnelR)

      // gentle travel of the whole corridor toward the camera with scroll
      m.position.z = z + tunnel * 6
      // organic wobble so it feels alive, never frozen
      m.position.x = Math.sin(t * 0.4 + f * 6) * 0.25 * tunnel
      m.position.y = Math.cos(t * 0.35 + f * 5) * 0.25 * tunnel + 0.5
      m.rotation.z = t * (0.05 + f * 0.06) + f * 2.0

      const mat = m.material as THREE.MeshBasicMaterial
      mat.color.lerpColors(baseColor, farColor, f)
      mat.opacity = overallVisible * lerp(1, 0.35, f)
    }
  })

  return (
    <group ref={group} position={[0, 0.5, 2]}>
      {Array.from({ length: RING_COUNT }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) meshes.current[i] = el
          }}
        >
          <torusGeometry args={[1, 0.045, 16, 64]} />
          <meshBasicMaterial
            transparent
            opacity={0}
            toneMapped={false}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}
