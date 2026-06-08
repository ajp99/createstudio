"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { scroll } from "./scroll-store"
import { smoothstep } from "./math"

// Surreal alien desert. A displaced plane with a custom shader that blends
// from a deep violet world to a warm orange world late in the scroll, via a
// neutral white/gold glow at the crossover (per the spec's 74-82% window).
const vertex = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  varying float vElev;

  // cheap value noise
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p); vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i+vec2(1.0,0.0));
    float c = hash(i+vec2(0.0,1.0));
    float d = hash(i+vec2(1.0,1.0));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(a,b,u.x)+ (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
  }

  vUv = uv;
    vec3 pos = position;

    // 6-octave FBM for richer terrain detail
    float fbm_val = 0.0;
    float amp = 0.5;
    vec2 p = pos.xz * 0.06 + uTime * 0.01;
    for(int i = 0; i < 6; i++) {
      fbm_val += amp * noise(p);
      p = p * 2.1 + vec2(1.7, 9.2);
      amp *= 0.48;
    }
    float n = fbm_val * 4.5;

    // Sand-ripple micro detail
    n += noise(pos.xz * 3.5) * 0.07;

    // Dunes ripple slowly
    n += sin(pos.x * 0.15 + uTime * 0.05) * 0.6;

    pos.y += n;
    vElev = n;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
`

const fragment = /* glsl */ `
  uniform float uWarm;     // 0 = violet world, 1 = orange world
  uniform float uGlow;     // neutral white/gold crossover glow 0..1
  uniform vec3 uFog;       // fog color matches scene fog
  varying vec2 vUv;
  varying float vElev;

  // Violet palette (darker lows for depth)
    vec3 lowP = vec3(0.04, 0.0, 0.09);
    vec3 highP = vec3(0.62, 0.30, 0.86);
    // Orange palette (more saturated)
    vec3 lowO = vec3(0.18, 0.05, 0.04);
    vec3 highO = vec3(1.0, 0.62, 0.18);

    float e = clamp(vElev * 0.12 + 0.5, 0.0, 1.0);
    vec3 violet = mix(lowP, highP, e);
    vec3 orange = mix(lowO, highO, e);
    vec3 col = mix(violet, orange, uWarm);

    // Ridge crest shimmer (adds sparkle to high points)
    vec3 crestGlow = mix(vec3(0.61,0.31,0.87), vec3(1.0,0.75,0.3), uWarm);
    float crestShimmer = pow(clamp(vElev*0.22, 0.0, 1.0), 3.0) * 0.35;
    col += crestGlow * crestShimmer;

    // Neutral bloom at the world crossover
    vec3 gold = vec3(1.0, 0.92, 0.78);
    col = mix(col, gold, uGlow * 0.6);

    // Distance fade into fog
    float depthFade = smoothstep(0.0, 0.65, vUv.y);
    col = mix(uFog, col, depthFade);

    gl_FragColor = vec4(col, 1.0);
`

export function Terrain() {
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWarm: { value: 0 },
      uGlow: { value: 0 },
      uFog: { value: new THREE.Color("#17002a") },
    }),
    [],
  )

  useFrame((state, delta) => {
    const m = matRef.current
    if (!m) return
    m.uniforms.uTime.value += delta
    const s = scroll.current
    // Crossfade 80-93% (spec-aligned)
    const warm = smoothstep(0.80, 0.93, s)
    m.uniforms.uWarm.value = warm
    // Glow peaks mid-crossfade
    const g = Math.sin(warm * Math.PI)
    m.uniforms.uGlow.value = g
    // Fog color: violet → orange
    m.uniforms.uFog.value.lerpColors(
      new THREE.Color("#17002a"),
      new THREE.Color("#2a0f06"),
      warm,
    )
  })

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -6, -20]}>
      <planeGeometry args={[220, 220, 220, 220]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        fog={false}
      />
    </mesh>
  )
}
