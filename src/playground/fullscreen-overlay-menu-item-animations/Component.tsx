'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

const sections = [
  { id: 'home', label: 'Home', gradient: 'from-amber-700 to-amber-900' },
  { id: 'about', label: 'About', gradient: 'from-orange-700 to-orange-900' },
  { id: 'skills', label: 'Skills', gradient: 'from-slate-700 to-slate-900' },
  { id: 'projects', label: 'Projects', gradient: 'from-teal-700 to-teal-900' },
  { id: 'contact', label: 'Contact', gradient: 'from-amber-800 to-amber-950' },
];

const menuItemColors = [
  'bg-amber-700',
  'bg-orange-700',
  'bg-slate-700',
  'bg-teal-700',
  'bg-amber-800',
];

export default function FullscreenOverlayMenuComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLLIElement[]>([]);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Overlay slide animation variants
  const overlayVariants = {
    hidden: { x: '-100%' },
    visible: {
      x: 0,
      transition: { duration: 0.4 },
    },
    exit: {
      x: '-100%',
      transition: { duration: 0.8 },
    },
  };

  // Menu items slide animation variants
  const itemVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: 0.2 + i * 0.2,
      },
    }),
    exit: (i: number) => ({
      x: '-100%',
      opacity: 0,
      transition: {
        duration: 0.3,
        delay: 0.5 - i * 0.1,
      },
    }),
  };

  // Hamburger bar animation variants
  const bar1Variants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: 8 },
  };

  const bar2Variants = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
  };

  const bar3Variants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: -8 },
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen && firstLinkRef.current) {
      firstLinkRef.current.focus();
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <div className="relative w-full overflow-x-hidden scroll-smooth bg-white">
      {/* Hamburger Menu Button */}
      <div
        ref={hamburgerRef}
        onClick={toggleMenu}
        className={`fixed top-4 right-8 z-50 cursor-pointer ${isMenuOpen ? 'active' : ''}`}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
        aria-controls="overlay"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleMenu();
          }
        }}
      >
        <motion.div
          className="w-14 h-1 mb-3 rounded-full dark:bg-white bg-slate-900"
          variants={bar1Variants}
          animate={isMenuOpen ? 'open' : 'closed'}
          transition={{ duration: 0.4 }}
        />
        <motion.div
          className="w-8 h-1 mb-3 rounded-full ml-auto dark:bg-white bg-slate-900"
          variants={bar2Variants}
          animate={isMenuOpen ? 'open' : 'closed'}
          transition={{ duration: 0.4 }}
        />
        <motion.div
          className="w-14 h-1 rounded-full dark:bg-white bg-slate-900"
          variants={bar3Variants}
          animate={isMenuOpen ? 'open' : 'closed'}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={overlayRef}
            id="overlay"
            className="fixed inset-0 z-40 bg-black bg-opacity-70"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleMenuItemClick}
          >
            <nav
              className="h-full w-full flex flex-col"
              onClick={(e) => e.stopPropagation()}
              aria-label="Main navigation"
              role="navigation"
            >
              <ul className="flex flex-col h-full w-full">
                {sections.map((section, idx) => (
                  <motion.li
                    key={section.id}
                    ref={(el) => {
                      if (el) navItemsRef.current[idx] = el;
                    }}
                    id={`nav-${idx + 1}`}
                    className={`w-full h-1/5 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform ${menuItemColors[idx]}`}
                    custom={idx}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    role="listitem"
                  >
                    <a
                      ref={idx === 0 ? firstLinkRef : null}
                      href={`#${section.id}`}
                      className="text-white uppercase text-2xl font-semibold tracking-wider hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                      onClick={handleMenuItemClick}
                      aria-current={idx === 0 ? 'page' : undefined}
                    >
                      {section.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo - Fixed, visible only when menu closed */}
      <motion.div
        className="fixed top-6 left-6 z-20 uppercase text-sm font-semibold tracking-widest flex items-center gap-2 dark:text-white text-slate-900"
        animate={{ opacity: isMenuOpen ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: isMenuOpen ? 'none' : 'auto' }}
      >
        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded flex items-center justify-center">
          <Zap size={14} className="text-white" />
        </div>
        <span>Brand</span>
      </motion.div>

      {/* Sections */}
      {sections.map((section, idx) => (
        <section
          key={section.id}
          id={section.id}
          className={`w-full h-screen bg-gradient-to-br ${section.gradient} flex items-center justify-center relative`}
        >
          <div className="text-center">
            <h1 className="text-6xl font-bold text-white uppercase tracking-wider mb-4">
              {section.label}
            </h1>
            <p className="text-xl text-white text-opacity-80">
              Section {idx + 1} of {sections.length}
            </p>
          </div>
        </section>
      ))}
    </div>
  );
}
