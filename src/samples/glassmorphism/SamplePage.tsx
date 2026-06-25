'use client';

import LenisProvider from '@/components/LenisProvider';
import ShowcaseNav from '@/components/showcase/ShowcaseNav';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 200, damping: 20, mass: 0.5 },
  },
};

const glassVariants = [
  { name: 'Light Transparency', description: 'Subtle presence, minimal blur', classes: 'bg-white/5 backdrop-blur-md border border-white/10' },
  { name: 'High Blur', description: 'Heavy frosting for depth', classes: 'bg-white/10 backdrop-blur-2xl border border-white/20' },
  { name: 'Gradient Overlay', description: 'Directional light wash', classes: 'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10' },
  { name: 'Solid Border', description: 'Strong edge definition', classes: 'bg-white/10 backdrop-blur-lg border-2 border-white/30' },
  { name: 'Frosted Shadow', description: 'Glow from within', classes: 'bg-white/10 backdrop-blur-lg border border-white/10 shadow-[0_8px_32px_rgba(255,255,255,0.1)]' },
  { name: 'Minimal', description: 'Almost invisible glass', classes: 'bg-transparent backdrop-blur-sm border border-white/5' },
];

export default function GlassmorphismSample() {
  return (
    <LenisProvider>
      <div style={{ cursor: 'auto' }}>
        <ShowcaseNav />
        <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center px-6 pt-20">
            <motion.div
              className="max-w-3xl text-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
                variants={itemVariants}
              >
                Frosted Glass Design
              </motion.h1>
              <motion.p
                className="text-xl text-gray-300 mb-8"
                variants={itemVariants}
              >
                A modern, minimal SaaS landing page with micro-interactions and glassmorphism effects.
              </motion.p>
              <motion.button
                className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors"
                variants={itemVariants}
                whileHover={{ scale: 1.08, boxShadow: '0 0 20px rgba(59,130,246,0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </motion.div>
          </section>

          {/* Features Section */}
          <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <motion.h2
                className="text-4xl font-bold text-white text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                Key Features
              </motion.h2>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
              >
                {['Responsive Design', 'Fast Performance', 'Modern UI'].map((feature, i) => (
                  <motion.div
                    key={i}
                    className="p-8 rounded-2xl bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 transition-colors"
                    variants={itemVariants}
                  >
                    <motion.div
                      className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-400 mb-4"
                      whileHover={{ rotate: 8, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    />
                    <h3 className="text-lg font-semibold text-white mb-2">{feature}</h3>
                    <p className="text-gray-400">
                      Professional-grade functionality with a beautiful, intuitive interface.
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Glass Variants Section */}
          <section className="py-20 px-6">
            <motion.h2
              className="text-4xl font-bold text-white text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              Glass Styles
            </motion.h2>
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {glassVariants.map((variant, i) => (
                <motion.div
                  key={i}
                  className={`p-8 rounded-2xl ${variant.classes}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  variants={itemVariants}
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-1">{variant.name}</h3>
                  <p className="text-gray-400 text-sm">{variant.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA Section — Split Layout */}
          <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 150, damping: 20 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Transform Your Ideas?
                </h2>
                <p className="text-gray-300 text-lg">
                  Start building beautiful experiences today with create studio&apos;s modern design system.
                </p>
              </motion.div>

              <motion.div
                className="p-10 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 150, damping: 20 }}
              >
                <button className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-shadow">
                  Get Started Now
                </button>
              </motion.div>
            </div>
          </section>

          {/* Video Section */}
          <section className="w-full h-screen">
            <video
              src="/videos/glass-ui-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </section>

          {/* Footer */}
          <footer className="py-12 px-6 border-t border-white/10 bg-white/5 backdrop-blur">
            <div className="max-w-6xl mx-auto text-center">
              <p className="text-gray-500">&copy; 2024 Glassmorphism Showcase. All rights reserved.</p>
            </div>
          </footer>
        </main>
      </div>
    </LenisProvider>
  );
}
