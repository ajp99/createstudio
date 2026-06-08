'use client';
import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';
import gsap from 'gsap';
import { useTunnel } from './SceneManager';

const vertexShader = `
  uniform float uNoise;
  varying vec3 vNormal;
  varying vec3 vPosition;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  void main() {
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);

    vec3 pos = position;
    float n = noise(vec2(position.x * 0.5, position.y * 0.5 + uNoise * 0.5));
    float displacement = (n - 0.5) * uNoise * 0.2;
    pos += normal * displacement;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform int uEra;

  void main() {
    vec3 color;

    if (uEra == 1) {
      // Era 1: Matrix green
      color = vec3(0.0, 1.0, 0.25);
    } else if (uEra == 2) {
      // Era 2: Chrome silver
      color = vec3(0.75, 0.75, 0.75);
    } else if (uEra == 3) {
      // Era 3: Flat white
      color = vec3(1.0);
    } else {
      // Era 4: Agentic violet
      color = vec3(0.6549, 0.5451, 0.99);
    }

    float light = dot(vNormal, normalize(vec3(1.0, 1.0, 1.0)));
    light = mix(0.5, 1.0, light * 0.5 + 0.5);

    gl_FragColor = vec4(color * light * 0.8, 0.6);
  }
`;

export function TunnelGeometry() {
  const { era } = useTunnel();
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [eraTargetValue, setEraTargetValue] = useState(1);

  const { contextSafe } = useGSAP();

  // Build corridor walls using instanced mesh
  const geometry = useMemo(() => new THREE.BoxGeometry(8, 1, 8), []);

  const material = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uNoise: { value: 0 },
        uEra: { value: 1 },
      },
      side: THREE.DoubleSide,
    });
    materialRef.current = mat;
    return mat;
  }, []);

  // Animate noise on era change
  useGSAP(
    () => {
      const noiseObj = { value: 0 };
      gsap.to(noiseObj, {
        value: 2,
        duration: 0.8,
        onUpdate() {
          if (materialRef.current) {
            materialRef.current.uniforms.uNoise.value = noiseObj.value;
          }
        },
      });
    },
    { dependencies: [era] }
  );

  // Update era uniform
  useFrame(() => {
    if (materialRef.current && materialRef.current.uniforms.uEra.value !== era) {
      materialRef.current.uniforms.uEra.value = era;
    }
  });

  // Position 20 corridor segments at different Z depths
  const count = 20;
  const dummy = new THREE.Object3D();

  useEffect(() => {
    if (!meshRef.current) return;

    for (let i = 0; i < count; i++) {
      const z = (i / count) * -250;
      const offsetX = Math.sin(z * 0.05) * 3;

      dummy.position.set(offsetX, 0, z);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
      frustumCulled={true}
      onClick={(e) => {
        e.stopPropagation();
      }}
    />
  );
}
