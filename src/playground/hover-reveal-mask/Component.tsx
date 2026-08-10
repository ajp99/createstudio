'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function HoverRevealMaskComponent() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Hover Reveal Mask</h2>

      <motion.div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="relative h-80 rounded-lg overflow-hidden cursor-pointer"
      >
        {/* Base image */}
        <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center text-white text-2xl font-bold">
          Hover Over Me
        </div>

        {/* Reveal overlay */}
        <motion.div
          animate={{
            clipPath: isHovering ? 'inset(0%)' : 'inset(50%)',
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white text-2xl font-bold"
        >
          Revealed Content!
        </motion.div>
      </motion.div>

      <p className="text-sm text-slate-600">Hover over the box to reveal the hidden content with a clip-path animation.</p>
    </div>
  );
}
