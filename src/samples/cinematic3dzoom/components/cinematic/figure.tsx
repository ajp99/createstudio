"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { scroll } from "./scroll-store"
import { lerp, smoothstep } from "./math"

const cosmicVertex = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p); vec2 f = fract(p);
    float a = hash(i); float b = hash(i+vec2(1.0,0.0));
    float c = hash(i+vec2(0.0,1.0)); float d = hash(i+vec2(1.0,1.0));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y;
  }

  void main(){
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec3 pos = position;
    float disp = noise(pos.xy * 0.8 + uTime * 0.1) * 0.04;
    pos += normal * disp;
    vViewDir = normalize(vec3(modelViewMatrix * vec4(pos, 1.0)));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const cosmicFragment = /* glsl */ `
  uniform float uTime;
  uniform float uOpacity;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p); vec2 f = fract(p);
    float a = hash(i); float b = hash(i+vec2(1.0,0.0));
    float c = hash(i+vec2(0.0,1.0)); float d = hash(i+vec2(1.0,1.0));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y;
  }

  void main(){
    vec3 col = vec3(0.03, 0.0, 0.1);

    // Dense star field — 120 scale gives very tight bright stars
    float starHash = hash(vUv * 120.0);
    float starTwinkle = smoothstep(0.92, 1.0, fract(starHash * 100.0 + uTime * 1.5));
    vec3 star = vec3(0.9, 0.95, 1.0) * (starTwinkle * 0.7 + 0.3) *
                smoothstep(0.8, 0.95, starHash);

    // Nebula dust — 2-layer FBM swirl
    float n1 = noise(vUv * 4.0 + uTime * 0.02);
    float n2 = noise(vUv * 8.5 + vec2(n1 * 2.0, uTime * 0.015)) * 0.6;
    vec3 nebula = mix(vec3(0.61,0.31,0.87), vec3(1.0,0.31,0.85), n1 * n2) * 0.5;

    // Fresnel rim glow (magenta silhouette)
    float fresnel = pow(1.0 - abs(dot(vViewDir, vNormal)), 2.5) * 2.5;
    vec3 rim = vec3(1.0, 0.31, 0.85) * fresnel;

    col = col + star * 0.8 + nebula + rim;
    gl_FragColor = vec4(col, uOpacity);
  }
`

const ringFragment = /* glsl */ `
  uniform float uTime;
  uniform float uOpacity;
  varying vec2 vUv;

  void main(){
    vec2 uv = vUv - 0.5;
    float d = length(uv) * 2.0;

    vec3 col = vec3(0.0);
    for(int i=0; i<5; i++){
      float r = 0.15 + float(i) * 0.16;
      float ring = smoothstep(0.015, 0.0, abs(d - r));
      float pulse = 0.5 + 0.5 * sin(uTime * 1.2 + float(i) * 1.1);
      vec3 ringCol = mix(vec3(0.61,0.31,0.87), vec3(1.0,0.31,0.85), float(i)/4.0);
      col += ring * pulse * ringCol;
    }
    gl_FragColor = vec4(col, col.r * uOpacity);
  }
`

export function Figure() {
  const group = useRef<THREE.Group>(null)
  const cosmicMatRef = useRef<THREE.ShaderMaterial>(null)
  const ringMatRef = useRef<THREE.ShaderMaterial>(null)

  const cosmicUniforms = { uTime: { value: 0 }, uOpacity: { value: 1 } }
  const ringUniforms = { uTime: { value: 0 }, uOpacity: { value: 1 } }

  useFrame((state) => {
    const g = group.current
    if (!g) return
    const s = scroll.current
    const t = state.clock.elapsedTime

    // Figure fades out as camera enters tunnel (40-56%)
    const fade = 1 - smoothstep(0.40, 0.56, s)

    if (cosmicMatRef.current) {
      cosmicMatRef.current.uniforms.uTime.value = t
      cosmicMatRef.current.uniforms.uOpacity.value = fade
    }
    if (ringMatRef.current) {
      ringMatRef.current.uniforms.uTime.value = t
      // Rings brighten during 0-20%, stay visible until figure fades
      const ringReveal = smoothstep(0.0, 0.2, s)
      ringMatRef.current.uniforms.uOpacity.value = ringReveal * fade
    }

    g.visible = fade > 0.001
    // Subtle breathing sway
    g.position.y = -3.4 + Math.sin(t * 0.5) * 0.04
    // Figure drifts slightly during tunnel enter (0-40%)
    g.position.z = lerp(0, 2, smoothstep(0, 0.4, s))
  })

  return (
    <group ref={group} position={[0, -3.4, -1]}>
      {/* Head sphere — cosmic material */}
      <mesh position={[0, 3.6, 0]}>
        <sphereGeometry args={[0.34, 32, 32]} />
        <shaderMaterial
          ref={cosmicMatRef}
          vertexShader={cosmicVertex}
          fragmentShader={cosmicFragment}
          uniforms={cosmicUniforms}
          transparent
        />
      </mesh>

      {/* Face rings disc — overlaid on head, facing camera */}
      <mesh position={[0, 3.6, 0.02]} scale={[1, 1, 0.1]}>
        <ringGeometry args={[0, 0.32, 32]} />
        <shaderMaterial
          ref={ringMatRef}
          vertexShader={`varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
          fragmentShader={ringFragment}
          uniforms={ringUniforms}
          transparent
          depthTest={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Torso — cosmic material */}
      <mesh position={[0, 2.5, 0]}>
        <capsuleGeometry args={[0.42, 1.5, 8, 16]} />
        <shaderMaterial
          ref={cosmicMatRef}
          vertexShader={cosmicVertex}
          fragmentShader={cosmicFragment}
          uniforms={cosmicUniforms}
          transparent
        />
      </mesh>

      {/* Legs — cosmic material */}
      <mesh position={[-0.2, 1.1, 0]}>
        <capsuleGeometry args={[0.16, 1.4, 8, 16]} />
        <shaderMaterial
          ref={cosmicMatRef}
          vertexShader={cosmicVertex}
          fragmentShader={cosmicFragment}
          uniforms={cosmicUniforms}
          transparent
        />
      </mesh>
      <mesh position={[0.2, 1.1, 0]}>
        <capsuleGeometry args={[0.16, 1.4, 8, 16]} />
        <shaderMaterial
          ref={cosmicMatRef}
          vertexShader={cosmicVertex}
          fragmentShader={cosmicFragment}
          uniforms={cosmicUniforms}
          transparent
        />
      </mesh>

      {/* Rim light behind figure */}
      <pointLight position={[0, 3.4, 0.6]} color="#ff4fd8" intensity={6} distance={6} />
    </group>
  )
}
