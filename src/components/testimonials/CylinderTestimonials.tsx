"use client";

import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useDrag } from "@use-gesture/react";
import { TESTIMONIALS } from "@/lib/data";

const CYLINDER_RADIUS = 4;

function PortraitCard({
  testimonial,
  index,
  total,
  groupRotation,
  activeIndex,
  onSelect,
}: {
  testimonial: (typeof TESTIMONIALS)[0];
  index: number;
  total: number;
  groupRotation: React.MutableRefObject<number>;
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(testimonial.portrait);
  const angle = (index / total) * Math.PI * 2;

  useFrame(() => {
    if (!meshRef.current) return;
    const a = angle + groupRotation.current;
    meshRef.current.position.x = Math.sin(a) * CYLINDER_RADIUS;
    meshRef.current.position.z = Math.cos(a) * CYLINDER_RADIUS;
    meshRef.current.rotation.y = -a;

    const isActive = index === activeIndex;
    const ts = isActive ? 1.2 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(ts, ts, ts), 0.1);
  });

  return (
    <mesh ref={meshRef} onClick={() => onSelect(index)}>
      <planeGeometry args={[1.4, 1.8]} />
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
}

function CylinderScene({
  activeIndex,
  onSelect,
  groupRotation,
}: {
  activeIndex: number;
  onSelect: (i: number) => void;
  groupRotation: React.MutableRefObject<number>;
}) {
  useFrame((_, delta) => {
    groupRotation.current += delta * 0.06;
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[0, 3, 5]} intensity={1.2} />
      <Suspense fallback={null}>
        {TESTIMONIALS.map((t, i) => (
          <PortraitCard
            key={t.id}
            testimonial={t}
            index={i}
            total={TESTIMONIALS.length}
            groupRotation={groupRotation}
            activeIndex={activeIndex}
            onSelect={onSelect}
          />
        ))}
      </Suspense>
    </>
  );
}

export default function CylinderTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const groupRotation = useRef(0);

  const bind = useDrag(({ delta: [dx] }) => {
    groupRotation.current -= dx * 0.01;
  });

  const active = TESTIMONIALS[activeIndex];

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="px-8 md:px-16 mb-12">
        <span className="font-mono text-[10px] text-white/30 tracking-[0.5em] uppercase block mb-4">
          Testimonials
        </span>
        <h2
          className="font-syne font-black uppercase text-white tracking-tighter leading-none"
          style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
        >
          Client<br />Stories
        </h2>
      </div>

      <div {...bind()} className="relative h-[60vh] touch-none cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }} gl={{ alpha: false }} style={{ background: "#09090b" }}>
          <CylinderScene
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
            groupRotation={groupRotation}
          />
        </Canvas>
      </div>

      {active && (
        <div className="px-8 md:px-16 mt-12 max-w-2xl">
          <blockquote className="font-syne text-xl text-white leading-relaxed mb-6">
            &ldquo;{active.quote}&rdquo;
          </blockquote>
          <div className="flex items-center gap-4">
            <img src={active.portrait} alt={active.author} className="w-10 h-10 rounded-full object-cover grayscale" />
            <div>
              <p className="font-syne font-bold text-sm text-white">{active.author}</p>
              <p className="font-mono text-xs text-white/40">{active.role}, {active.company}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
