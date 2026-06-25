"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { scroll } from "./scroll-store"

// Floating dust / ambient haze. Uses additive points with a soft radial
// sprite so they read as glowing motes. Motion is perlin-ish (layered sin)
// so it never looks linear, and it subtly drifts with camera/scroll.
export function Particles({ count = 1400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const seeds = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 26
      const theta = Math.random() * Math.PI * 2
      positions[i * 3] = Math.cos(theta) * r
      positions[i * 3 + 1] = (Math.random() - 0.3) * 22
      positions[i * 3 + 2] = -Math.random() * 70 + 10
      seeds[i * 3] = Math.random() * 100
      seeds[i * 3 + 1] = 0.3 + Math.random() * 0.7
      seeds[i * 3 + 2] = Math.random() * Math.PI * 2
    }
    return { positions, seeds }
  }, [count])

  const sprite = useMemo(() => {
    const size = 64
    const c = document.createElement("canvas")
    c.width = c.height = size
    const ctx = c.getContext("2d")!
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    g.addColorStop(0, "rgba(255,255,255,1)")
    g.addColorStop(0.3, "rgba(220,180,255,0.7)")
    g.addColorStop(1, "rgba(120,60,200,0)")
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
    const tex = new THREE.CanvasTexture(c)
    return tex
  }, [])

  useFrame((state) => {
    const pts = ref.current
    if (!pts) return
    const t = state.clock.elapsedTime
    const arr = pts.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      const sx = seeds[i * 3]
      const sp = seeds[i * 3 + 1]
      const ph = seeds[i * 3 + 2]
      arr[i * 3] += Math.sin(t * 0.12 * sp + sx) * 0.004
      arr[i * 3 + 1] += Math.cos(t * 0.1 * sp + ph) * 0.006 + 0.002
      // recycle motes that drift too high
      if (arr[i * 3 + 1] > 14) arr[i * 3 + 1] = -8
    }
    pts.geometry.attributes.position.needsUpdate = true
    // gentle parallax as we travel down the scroll
    pts.position.z = scroll.current * 30
    pts.rotation.z = Math.sin(t * 0.05) * 0.05
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={sprite}
        size={0.35}
        sizeAttenuation
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.9}
        color={"#d9a8ff"}
      />
    </points>
  )
}
