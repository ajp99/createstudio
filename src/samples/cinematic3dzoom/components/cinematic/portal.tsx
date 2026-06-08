"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { scroll } from "./scroll-store"
import { backOut, smoothstep } from "./math"

// A glowing portal that emerges from the tunnel's vanishing point. The disc
// uses a swirling shader (animated UV polar noise) framed by a bright rim.
// It grows with back.out overshoot then settles, and crossfades in over the
// tunnel's fade-out (0.5s overlap per spec).
const vertex = /* glsl */ `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragment = /* glsl */ `
  uniform float uTime;
  uniform float uOpacity;
  uniform float uWarm;
  varying vec2 vUv;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p); vec2 f = fract(p);
    float a = hash(i), b = hash(i+vec2(1.,0.)), c = hash(i+vec2(0.,1.)), d = hash(i+vec2(1.,1.));
    vec2 u = f*f*(3.-2.*f);
    return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;
  }

  void main(){
    vec2 p = vUv - 0.5;
    float r = length(p) * 2.0;     // 0 center -> 1 edge
    float a = atan(p.y, p.x);

    // swirling polar noise
    float swirl = noise(vec2(a * 1.8 + uTime * 0.4, r * 3.0 - uTime * 0.6));
    swirl += noise(vec2(a * 4.0 - uTime * 0.3, r * 6.0)) * 0.5;

    vec3 coreCol = mix(vec3(0.55,0.2,0.95), vec3(1.0,0.55,0.22), uWarm);
    vec3 rimCol  = mix(vec3(1.0,0.45,0.95), vec3(1.0,0.8,0.45), uWarm);

    // luminous swirling interior with a darker eye, bright energetic rim
    float interior = smoothstep(0.98, 0.2, r);
    float eye = smoothstep(0.0, 0.3, r);          // darken the very center
    float rim  = smoothstep(0.68, 0.93, r) * smoothstep(1.02, 0.86, r);
    vec3 col = coreCol * interior * eye * (0.9 + swirl * 1.1) + rimCol * rim * 3.2;

    float alpha = (interior * eye * 0.85 + rim * 1.0) * uOpacity;
    if (alpha < 0.001) discard;
    gl_FragColor = vec4(col, alpha);
  }
`

export function Portal() {
  const mesh = useRef<THREE.Mesh>(null)
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOpacity: { value: 0 },
      uWarm: { value: 0 },
    }),
    [],
  )

  useFrame((state, delta) => {
    const m = mesh.current
    if (!m) return
    const s = scroll.current
    uniforms.uTime.value += delta

    // Portal emerges at 60%, fills screen at 80%, fades after 95%
    const appear = smoothstep(0.60, 0.72, s)
    const fade = smoothstep(0.93, 1.0, s)
    const op = appear * (1 - fade)
    uniforms.uOpacity.value = op
    uniforms.uWarm.value = smoothstep(0.80, 0.93, s)

    // back.out growth from the vanishing point, then a slow living breath
    const grow = backOut(appear) * 4.2
    const breathe = 1 + Math.sin(state.clock.elapsedTime * 0.6) * 0.02
    m.scale.setScalar(Math.max(0.001, grow * breathe))
    // The camera pushes to ~z=-16 by this point, so the portal must sit
    // well ahead of it to stay in frame. It floats above the horizon and
    // drifts gently toward the camera as it grows.
    m.position.z = -30 + appear * 6
    m.position.y = 4.0 + appear * 0.6
    m.visible = op > 0.001
  })

  return (
    <mesh ref={mesh} position={[0, 4, -36]}>
      <circleGeometry args={[1, 96]} />
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        toneMapped={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
