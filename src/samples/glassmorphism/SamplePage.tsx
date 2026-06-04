'use client';

import LenisProvider from '@/components/LenisProvider';
import ShowcaseNav from '@/components/showcase/ShowcaseNav';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

export default function GlassmorphismSample() {
  return (
    <LenisProvider>
      <div style={{ cursor: 'auto' }}>
        <ShowcaseNav />
        <main className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center px-6 pt-20">
            <motion.div
              className="max-w-3xl text-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
                variants={itemVariants}
              >
                Frosted Glass Design
              </motion.h1>
              <motion.p
                className="text-xl text-slate-600 mb-8"
                variants={itemVariants}
              >
                A modern, minimal SaaS landing page with micro-interactions and glassmorphism effects.
              </motion.p>
              <motion.button
                className="px-8 py-4 rounded-xl bg-white/20 backdrop-blur border border-white/30 text-slate-900 font-semibold hover:bg-white/30 transition-all"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
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
                className="text-4xl font-bold text-slate-900 text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
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
                    className="p-8 rounded-2xl bg-white/20 backdrop-blur border border-white/30 hover:bg-white/30 transition-all"
                    variants={itemVariants}
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-400 mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature}</h3>
                    <p className="text-slate-600">
                      Professional-grade functionality with a beautiful, intuitive interface.
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="p-12 rounded-3xl bg-gradient-to-r from-blue-400/20 via-cyan-400/20 to-blue-400/20 backdrop-blur border border-white/30 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Ready to Transform Your Ideas?
                </h2>
                <p className="text-slate-600 mb-8">
                  Start building beautiful experiences today with our modern design system.
                </p>
                <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-lg transition-shadow">
                  Start Free Trial
                </button>
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 px-6 border-t border-white/10 bg-white/5 backdrop-blur">
            <div className="max-w-6xl mx-auto text-center text-slate-600">
              <p>&copy; 2024 Glassmorphism Design. All rights reserved.</p>
            </div>
          </footer>
        </main>
      </div>
    </LenisProvider>
  );
}
