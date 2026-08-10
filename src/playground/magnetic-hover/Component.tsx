'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagneticHoverComponent() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    if (isHovering) {
      setMousePosition({ x: x * 0.3, y: y * 0.3 });
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Magnetic Hover</h2>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
        className="flex items-center justify-center h-64 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg"
      >
        <motion.button
          animate={isHovering ? { x: mousePosition.x, y: mousePosition.y } : { x: 0, y: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 200 }}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
        >
          Magnetic Button
        </motion.button>
      </div>

      <p className="text-sm text-slate-600">Move your cursor around the button to see it follow your mouse with a spring animation.</p>
    </div>
  );
}
