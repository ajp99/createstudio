"use client";

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDrag } from "@use-gesture/react";
import { PROJECTS } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const RADIUS = 5;

function ProjectPlane({
  project,
  index,
  totalCount,
  groupRotation,
  activeIndex,
  onHover,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  totalCount: number;
  groupRotation: React.MutableRefObject<number>;
  activeIndex: number;
  onHover: (i: number | null) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(project.image);
  const angle = (index / totalCount) * Math.PI * 2;

  useFrame(() => {
    if (!meshRef.current) return;
    const gr = groupRotation.current;
    const a = angle + gr;
    meshRef.current.position.x = Math.sin(a) * RADIUS;
    meshRef.current.position.z = Math.cos(a) * RADIUS;
    meshRef.current.rotation.y = -a;

    const isActive = index === activeIndex;
    const targetScale = isActive ? 1.15 : 1;
    const targetZ = isActive ? 0.5 : 0;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetZ, 0.08);
  });

  return (
    <mesh
      ref={meshRef}
      onPointerEnter={() => onHover(index)}
      onPointerLeave={() => onHover(null)}
    >
      <planeGeometry args={[2.4, 1.6]} />
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
}

function CarouselScene({
  activeIndex,
  onHover,
  groupRotation,
}: {
  activeIndex: number;
  onHover: (i: number | null) => void;
  groupRotation: React.MutableRefObject<number>;
}) {
  useFrame((_, delta) => {
    groupRotation.current += delta * 0.08;
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 5, 5]} intensity={1.2} />
      <Suspense fallback={null}>
        {PROJECTS.map((p, i) => (
          <ProjectPlane
            key={p.id}
            project={p}
            index={i}
            totalCount={PROJECTS.length}
            groupRotation={groupRotation}
            activeIndex={activeIndex}
            onHover={onHover}
          />
        ))}
      </Suspense>
    </>
  );
}

export default function Carousel3DPortfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const groupRotation = useRef(0);
  const dragStart = useRef(0);

  const bind = useDrag(({ delta: [dx] }) => {
    groupRotation.current -= dx * 0.008;
  });

  useEffect(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: 1,
      onUpdate(self) {
        groupRotation.current = self.progress * Math.PI * 2;
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-black overflow-hidden">
      <div className="absolute top-12 left-8 md:left-16 z-10">
        <span className="font-mono text-[10px] text-white/30 tracking-[0.5em] uppercase block mb-2">
          Portfolio
        </span>
        <h2
          className="font-syne font-black uppercase text-white tracking-tighter"
          style={{ fontSize: "clamp(2rem, 5vw, 5rem)" }}
        >
          Selected Work
        </h2>
      </div>

      <div className="absolute bottom-12 left-8 md:left-16 z-10">
        <p className="font-syne font-bold text-xl text-white mb-1">
          {PROJECTS[activeIndex]?.title}
        </p>
        <span className="font-mono text-xs text-white/40">
          {PROJECTS[activeIndex]?.category} — {PROJECTS[activeIndex]?.year}
        </span>
      </div>

      <div {...bind()} className="absolute inset-0 touch-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }} gl={{ alpha: false }} style={{ background: "#000" }}>
          <CarouselScene
            activeIndex={activeIndex}
            onHover={(i) => { if (i !== null) setActiveIndex(i); }}
            groupRotation={groupRotation}
          />
        </Canvas>
      </div>
    </section>
  );
}
