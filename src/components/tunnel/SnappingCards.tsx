'use client';
import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useTunnel } from './SceneManager';
import { PROJECTS } from '@/lib/data';

interface CardState {
  isSnapped: boolean;
  position: THREE.Vector3;
  rotation: THREE.Quaternion;
}

const CARD_Z_POSITIONS = [-50, -110, -170, -230];

export function SnappingCards() {
  const { progressRef, setDampened } = useTunnel();
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const statesRef = useRef<CardState[]>([]);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // Initialize card states
  useMemo(() => {
    meshesRef.current = [];
    statesRef.current = CARD_Z_POSITIONS.map((z) => ({
      isSnapped: false,
      position: new THREE.Vector3(0, 0, z),
      rotation: new THREE.Quaternion(),
    }));
  }, []);

  // Distance-based snapping logic
  useFrame(({ camera }) => {
    const progress = progressRef.current;
    const cameraPos = camera.position.clone();
    const cameraDir = new THREE.Vector3(0, 0, -1);
    cameraDir.applyQuaternion(camera.quaternion);

    let anySnapped = false;

    CARD_Z_POSITIONS.forEach((z, idx) => {
      const mesh = meshesRef.current[idx];
      const state = statesRef.current[idx];
      if (!mesh || !state) return;

      const wallPos = new THREE.Vector3(0, 0, z);
      const dist = cameraPos.distanceTo(wallPos);
      const proximityWindow = dist < 15 && dist > 3;

      if (proximityWindow) {
        anySnapped = true;
        setActiveCard(idx);

        // Lerp position to camera forward
        const targetPos = cameraPos.clone().add(cameraDir.clone().multiplyScalar(5));
        const snapProgress = 1 - (dist - 3) / 12;
        state.position.lerp(targetPos, 0.1);

        // Slerp rotation to match camera
        const targetQuat = camera.quaternion.clone();
        state.rotation.slerp(targetQuat, 0.1);
      } else {
        // Lerp back to wall
        const wallTarget = new THREE.Vector3(0, 0, z);
        state.position.lerp(wallTarget, 0.08);

        // Reset rotation
        const defaultQuat = new THREE.Quaternion();
        state.rotation.slerp(defaultQuat, 0.08);
      }

      // Apply to mesh
      mesh.position.copy(state.position);
      mesh.quaternion.copy(state.rotation);
    });

    setDampened(anySnapped);
  });

  return (
    <>
      {CARD_Z_POSITIONS.map((z, idx) => {
        const project = PROJECTS[idx];
        return (
          <group key={idx} position={[0, 0, z]}>
            <mesh
              ref={(el) => {
                if (el && meshesRef.current) meshesRef.current[idx] = el;
              }}
              onClick={() => {
                setActiveCard(activeCard === idx ? null : idx);
              }}
            >
              <planeGeometry args={[6, 8]} />
              <meshStandardMaterial
                color={activeCard === idx ? '#a78bfa' : '#1a1a2e'}
                emissive={activeCard === idx ? '#6366f1' : '#000'}
                emissiveIntensity={activeCard === idx ? 0.5 : 0}
              />
            </mesh>

            {/* HTML content overlay */}
            <Html
              transform
              position={[0, 0, 0.1]}
              scale={1}
              distanceFactor={1}
              occlude="blending"
            >
              <div className="w-96 pointer-events-auto select-none">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-white mb-2 font-syne">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-300 mb-3">{project.description}</p>
                <div className="flex gap-2 text-xs text-gray-400">
                  <span>{project.year}</span>
                  <span>•</span>
                  <span>{project.category}</span>
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </>
  );
}
