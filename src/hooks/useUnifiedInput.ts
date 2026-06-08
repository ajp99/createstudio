'use client';
import { useEffect, useState, useRef, useCallback } from 'react';

export function useUnifiedInput() {
  const [progress, setProgress] = useState(0);
  const targetProgress = useRef(0);
  const dampened = useRef(false);

  const setDampened = useCallback((value: boolean) => {
    dampened.current = value;
  }, []);

  useEffect(() => {
    const handleInput = (deltaY: number) => {
      const sensitivity = dampened.current ? 0.00006 : 0.0003;
      targetProgress.current = Math.max(0, Math.min(1, targetProgress.current + deltaY * sensitivity));
    };

    const onWheel = (e: WheelEvent) => handleInput(e.deltaY);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') handleInput(120);
      if (e.key === 'ArrowUp') handleInput(-120);
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    let animationFrameId: number;
    const interpolateFrame = () => {
      setProgress((prev) => {
        const next = prev + (targetProgress.current - prev) * 0.08;
        return Math.abs(next - targetProgress.current) < 0.0001 ? targetProgress.current : next;
      });
      animationFrameId = requestAnimationFrame(interpolateFrame);
    };
    animationFrameId = requestAnimationFrame(interpolateFrame);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return { progress, setDampened };
}
