'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#' },
  {
    label: 'Services',
    href: '#',
    submenu: [
      { label: 'Web Design', href: '#' },
      { label: 'Development', href: '#' },
      { label: 'Consulting', href: '#' },
    ],
  },
  { label: 'Contact', href: '#', badge: true },
];

export default function OverlayNavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSemiTransparent, setIsSemiTransparent] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowBadge(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isMenuOpen && firstLinkRef.current) {
      firstLinkRef.current.focus();
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const containerVariants = {
    hidden: { opacity: 0, y: '-100%' },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: '-100%',
      transition: {
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        delay: 0.1 + i * 0.1,
      },
    }),
    exit: { opacity: 0, x: 100, transition: { duration: 0.2 } },
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Overlay Animated Navbar</h2>
        <p className="text-sm text-slate-600">
          Full-screen overlay menu with staggered item animation, focus management, and accessibility.
        </p>
      </div>

      {/* Variant Toggle */}
      <div className="flex gap-2 pb-4 border-b border-slate-200">
        <button
          onClick={() => setIsSemiTransparent(false)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            !isSemiTransparent
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
          }`}
        >
          Opaque
        </button>
        <button
          onClick={() => setIsSemiTransparent(true)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            isSemiTransparent
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
          }`}
        >
          Semi-Transparent
        </button>
      </div>

      {/* Demo Container */}
      <div className="border border-slate-300 rounded-lg overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        {/* Header with Menu Button */}
        <header className="relative bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg" />
            <span className="font-bold text-lg">Brand</span>
          </div>

          {/* Menu Button */}
          <button
            ref={menuBtnRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="overlay-menu"
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </button>
        </header>

        {/* Overlay Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="overlay-menu"
              className={`fixed inset-0 top-[73px] ${
                isSemiTransparent ? 'bg-opacity-90' : 'bg-opacity-100'
              } pointer-events-auto`}
              style={{
                background: isSemiTransparent
                  ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(37, 99, 235, 0.9))'
                  : 'linear-gradient(135deg, rgb(59, 130, 246), rgb(37, 99, 235))',
              }}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setIsMenuOpen(false)}
            >
              {/* Menu Content (prevent close on click) */}
              <motion.nav
                className="h-full px-6 py-8 flex flex-col"
                onClick={(e) => e.stopPropagation()}
                aria-label="Overlay navigation"
                role="navigation"
              >
                <ul className="space-y-4" role="list">
                  {navItems.map((item, idx) => (
                    <motion.li
                      key={idx}
                      custom={idx}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      role="listitem"
                    >
                      {item.submenu ? (
                        <div className="space-y-2">
                          <span className="block text-white text-lg font-semibold cursor-default">
                            {item.label}
                          </span>
                          <ul className="pl-4 space-y-2 text-blue-100" role="list">
                            {item.submenu.map((sub, subIdx) => (
                              <li key={subIdx} role="listitem">
                                <a
                                  href={sub.href}
                                  className="block text-sm hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white rounded px-2 py-1"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {sub.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <a
                          ref={idx === 0 ? firstLinkRef : null}
                          href={item.href}
                          className="block text-white text-lg font-semibold hover:text-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white rounded px-2 py-1"
                          onClick={() => setIsMenuOpen(false)}
                          aria-current={idx === 0 ? 'page' : undefined}
                        >
                          <span className="flex items-center gap-2">
                            {item.label}
                            {item.badge && showBadge && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-2 h-2 rounded-full bg-red-300"
                              />
                            )}
                          </span>
                        </a>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Demo Content Area */}
        <div className="h-96 bg-slate-50 px-6 py-8 text-center flex flex-col items-center justify-center">
          <p className="text-slate-600 mb-4">Content area (click menu button to toggle overlay)</p>
          <p className="text-sm text-slate-500">
            Resize your browser or test accessibility with Escape key and Tab navigation
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2 text-sm text-slate-600">
        <p>
          ✨ <strong>Features:</strong> Toggle opaque/semi-transparent variants · Full-screen overlay menu
        </p>
        <p>
          🎬 Staggered animations: menu slides down, items slide in from right with 100ms delays
        </p>
        <p>
          ⌨️ <strong>Accessibility:</strong> Focus moves to first link on open · Escape key closes menu ·
          Tab navigation trapped inside overlay · ARIA labels for screen readers
        </p>
        <p>Badge appears after 2 seconds on Contact link · Same nav structure as colorful-navbar</p>
        <p>Click outside or on a nav link to close the overlay menu</p>
      </div>
    </div>
  );
}
