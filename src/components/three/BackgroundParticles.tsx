"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 600;

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const mouse = useRef<[number, number]>([0, 0]);
  const { size } = useThree();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1),
      ];
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const { positions, originalPositions } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return { positions: pos, originalPositions: pos.slice() };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const attr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const mx = mouse.current[0] * (size.width / 100);
    const my = mouse.current[1] * (size.height / 100);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ox = originalPositions[i * 3];
      const oy = originalPositions[i * 3 + 1];
      const oz = originalPositions[i * 3 + 2];

      const nx = ox + Math.sin(t * 0.4 + oy * 0.5) * 0.6;
      const ny = oy + Math.cos(t * 0.3 + ox * 0.4) * 0.6;

      const dx = nx - mx;
      const dy = ny - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const influence = Math.max(0, 1 - dist / 8) * 1.5;

      (attr.array as Float32Array)[i * 3] = nx - dx * influence * 0.1;
      (attr.array as Float32Array)[i * 3 + 1] = ny - dy * influence * 0.1;
      (attr.array as Float32Array)[i * 3 + 2] = oz + Math.sin(t * 0.2 + ox) * 0.3;
    }

    attr.needsUpdate = true;
    meshRef.current.rotation.y = t * 0.01;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={PARTICLE_COUNT}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#ffffff"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function BackgroundParticles() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: false }}
        dpr={[1, 1.5]}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
