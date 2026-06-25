'use client';
import { createContext, useContext, useRef, useState } from 'react';
import { useFrame, type RootState } from '@react-three/fiber';
import * as THREE from 'three';
import { useUnifiedInput } from '@/hooks/useUnifiedInput';

export type Era = 1 | 2 | 3 | 4;

interface TunnelContextValue {
  era: Era;
  setEra: (era: Era) => void;
  setDampened: (v: boolean) => void;
  progressRef: { current: number };
}

const TunnelContext = createContext<TunnelContextValue>({
  era: 1,
  setEra: () => {},
  setDampened: () => {},
  progressRef: { current: 0 },
});

export function useTunnel() {
  return useContext(TunnelContext);
}

const CURVE_POINTS = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0.5, 0.3, -35),
  new THREE.Vector3(-0.5, -0.3, -70),
  new THREE.Vector3(0.3, 0.5, -105),
  new THREE.Vector3(-0.3, -0.5, -140),
  new THREE.Vector3(0.5, -0.3, -175),
  new THREE.Vector3(-0.5, 0.3, -210),
  new THREE.Vector3(0, 0, -250),
];

export const tunnelCurve = new THREE.CatmullRomCurve3(CURVE_POINTS);

function eraFromProgress(p: number): Era {
  if (p < 0.25) return 1;
  if (p < 0.5) return 2;
  if (p < 0.75) return 3;
  return 4;
}

// Lives inside R3F Canvas — drives camera each frame
export function CameraRig() {
  const { progressRef, setEra } = useTunnel();
  const lastEra = useRef<Era>(1);

  useFrame(({ camera }: RootState) => {
    const p = progressRef.current;
    const pos = tunnelCurve.getPointAt(p);
    camera.position.copy(pos);

    const lookAtP = Math.min(p + 0.01, 1);
    const target = tunnelCurve.getPointAt(lookAtP);
    camera.lookAt(target);

    const currentEra = eraFromProgress(p);
    if (currentEra !== lastEra.current) {
      lastEra.current = currentEra;
      setEra(currentEra);
    }
  });

  return null;
}

// Lives outside Canvas — provides shared state tree
export function TunnelProvider({ children }: { children: React.ReactNode }) {
  const [era, setEra] = useState<Era>(1);
  const { progress, setDampened } = useUnifiedInput();
  const progressRef = useRef(0);
  progressRef.current = progress;

  return (
    <TunnelContext.Provider value={{ era, setEra, setDampened, progressRef }}>
      {children}
    </TunnelContext.Provider>
  );
}
