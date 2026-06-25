"use client"

import React, { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { smoothstep } from "./math"
import { scroll } from "./scroll-store"

// Subtle aurora ribbons arcing across the sky — northern lights aesthetic.
// Each trail gets a main tube + a halo glow for ambient atmosphere.
const TRAILS = 11

export function SkyTrails() {
  const group = useRef<THREE.Group>(null)

  const curves = useMemo(() => {
    const arr: THREE.TubeGeometry[] = []
    for (let i = 0; i < TRAILS; i++) {
      const pts: THREE.Vector3[] = []
      const yBase = 8 + i * 2.2
      const xOff = (Math.random() - 0.5) * 10
      for (let j = 0; j <= 40; j++) {
        const x = THREE.MathUtils.lerp(-60, 60, j / 40)
        const y =
          yBase +
          Math.sin(j * 0.3 + i) * 4 +    // Increased amplitude for more arc
          Math.sin(j * 0.08) * 9          // More undulation
        const z = -40 + Math.sin(j * 0.2 + i * 2) * 8
        pts.push(new THREE.Vector3(x + xOff, y, z))
      }
      const curve = new THREE.CatmullRomCurve3(pts)
      // Varied tube radius per trail (0.04-0.08 for subtle glow)
      const radius = 0.04 + (i % 3) * 0.02
      arr.push(new THREE.TubeGeometry(curve, 80, radius, 8, false))
    }
    return arr
  }, [])

  const colors = useMemo(
    () => [
      new THREE.Color("#ff4fd8"),
      new THREE.Color("#9d4edd"),
      new THREE.Color("#5e17eb"),
    ],
    [],
  )

  useFrame((state) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    const warm = smoothstep(0.80, 0.92, scroll.current)

    // Only update main trail meshes (at even indices, since we have pairs for halo)
    for (let i = 0; i < g.children.length; i += 2) {
      const mesh = g.children[i] as THREE.Mesh
      if (!mesh.material) continue
      const mat = mesh.material as THREE.MeshBasicMaterial
      // Subtle ambient opacity: soft pulsing, lower baseline for background feel
      mat.opacity = 0.18 + Math.sin(t * 0.35 + i) * 0.12
      mat.color.lerpColors(colors[i % colors.length], new THREE.Color("#ffaa55"), warm)
      mesh.position.x = Math.sin(t * 0.05 + i) * 4

      // Halo pair (i+1) — slightly larger, lower opacity, brighter core
      const halo = g.children[i + 1] as THREE.Mesh
      if (halo.material) {
        const halMat = halo.material as THREE.MeshBasicMaterial
        halMat.opacity = (0.12 + Math.sin(t * 0.3 + i) * 0.08) * (1 - warm * 0.4)
        halMat.color.copy(mat.color)
        halo.position.copy(mesh.position)
        halo.scale.setScalar(2.5) // Halo is 2.5x larger
      }
    }
    g.rotation.z = Math.sin(t * 0.02) * 0.02
  })

  return (
    <group ref={group} position={[0, 4, -10]}>
      {curves.map((geo, i) => (
        <React.Fragment key={i}>
          {/* Main trail */}
          <mesh geometry={geo}>
            <meshBasicMaterial
              transparent
              opacity={0.4}
              toneMapped={false}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
          {/* Halo glow — larger, softer */}
          <mesh geometry={geo} scale={1}>
            <meshBasicMaterial
              transparent
              opacity={0.15}
              toneMapped={false}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </React.Fragment>
      ))}
    </group>
  )
}
