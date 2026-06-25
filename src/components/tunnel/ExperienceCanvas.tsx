'use client';
import { Canvas } from '@react-three/fiber';
import { CameraRig } from './SceneManager';
import { TunnelGeometry } from './TunnelGeometry';
import { SnappingCards } from './SnappingCards';

export function ExperienceCanvas() {
  return (
    <Canvas
      className="fixed inset-0 w-screen h-screen bg-black z-0"
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 0], fov: 50, near: 0.1, far: 300 }}
      style={{ touchAction: 'none' }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.4} />

      <CameraRig />
      <TunnelGeometry />
      <SnappingCards />
    </Canvas>
  );
}
