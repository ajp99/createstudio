"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import * as THREE from "three";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;

    const geo = new THREE.IcosahedronGeometry(1.8, 4);
    const wireMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.15 });
    const mesh = new THREE.Mesh(geo, wireMat);
    scene.add(mesh);

    const innerGeo = new THREE.IcosahedronGeometry(1.6, 3);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0x111111, transparent: true, opacity: 0.6 });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    scene.add(inner);

    const particleCount = 1200;
    const pPositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 2.5 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      pPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.02, transparent: true, opacity: 0.4 });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    let animId: number;
    const clock = new THREE.Clock();
    let morphProgress = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      mesh.rotation.x = t * 0.2 + morphProgress * 0.5;
      mesh.rotation.y = t * 0.35;
      inner.rotation.x = -t * 0.15;
      inner.rotation.y = t * 0.25;
      particles.rotation.y = t * 0.05;

      const scale = 1 + Math.sin(t * 1.5) * 0.04;
      mesh.scale.setScalar(scale);

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    const progress = { value: 0 };

    const tl = gsap.timeline();

    tl.to(progress, {
      value: 100,
      duration: 2.8,
      ease: "power2.inOut",
      onUpdate() {
        const v = Math.round(progress.value);
        morphProgress = v / 100;
        if (percentRef.current) percentRef.current.textContent = `${v}%`;
        if (barRef.current) barRef.current.style.width = `${v}%`;
        wireMat.opacity = 0.05 + (1 - morphProgress) * 0.2;
        pMat.opacity = 0.2 + morphProgress * 0.4;
      },
    });

    tl.to(mesh.scale, { x: 0.05, y: 0.05, z: 0.05, duration: 0.4, ease: "power3.in" }, "-=0.2");
    tl.to(particles.scale, { x: 4, y: 4, z: 4, duration: 0.4, ease: "power2.out" }, "<");
    tl.to(pMat, { opacity: 0, duration: 0.3 }, "+=0.1");

    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          setMounted(false);
          onComplete();
        },
      },
      "+=0.1"
    );

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
      window.removeEventListener("resize", onResize);
      tl.kill();
    };
  }, [onComplete]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div className="relative z-10 text-center select-none">
        <p className="font-mono text-[10px] tracking-[0.5em] text-white/30 uppercase mb-6">
          Truminds Design Agency
        </p>
        <h1
          className="font-syne font-black uppercase text-white tracking-tighter leading-none mb-12"
          style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
        >
          CREATE<br />STUDIO
        </h1>

        <div className="flex items-center gap-4">
          <div className="w-48 h-px bg-zinc-900 relative overflow-hidden rounded-full">
            <div
              ref={barRef}
              className="absolute inset-y-0 left-0 bg-white rounded-full transition-none"
              style={{ width: "0%" }}
            />
          </div>
          <span ref={percentRef} className="font-mono text-xs text-white/30 tabular-nums w-10">
            0%
          </span>
        </div>
      </div>
    </div>
  );
}
