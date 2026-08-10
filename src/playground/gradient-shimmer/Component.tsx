'use client';

import { motion } from 'framer-motion';

export default function GradientShimmerComponent() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gradient Shimmer</h2>

      <motion.div
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="p-12 rounded-lg bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-200% w-full"
      >
        <p className="text-2xl font-bold text-white">Shimmer Effect</p>
      </motion.div>

      <div className="p-8 bg-slate-50 rounded-lg">
        <motion.p
          animate={{
            backgroundPosition: ['0% center', '100% center'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="text-xl font-bold bg-gradient-to-r from-slate-900 via-blue-600 to-slate-900 bg-200% text-transparent bg-clip-text"
        >
          This text shimmer effect loops infinitely
        </motion.p>
      </div>

      <p className="text-sm text-slate-600">The gradient animates across the element creating a shimmering effect.</p>
    </div>
  );
}
