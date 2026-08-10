'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const themes = {
  default: { primary: '#FF5F6D', secondary: '#FFC371' },
  blue: { primary: '#0066FF', secondary: '#33CCFF' },
  green: { primary: '#00D084', secondary: '#7FE7D9' },
  purple: { primary: '#9D4EDD', secondary: '#E0AAFF' },
};

type ThemeKey = keyof typeof themes;

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

export default function ColorfulNavbarComponent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [theme, setTheme] = useState<ThemeKey>('default');
  const [scrolled, setScrolled] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const colors = themes[theme];
  const indicatorIndex = hoverIndex !== null ? hoverIndex : activeIndex;

  useEffect(() => {
    const timer = setTimeout(() => setShowBadge(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {}, 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (index: number) => {
    if (navItems[index].submenu) return;
    setActiveIndex(index);
    setIsMobileOpen(false);
  };

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    if (isMobileOpen && headerRef.current && !headerRef.current.contains(e.target as Node)) {
      setIsMobileOpen(false);
    }
  };

  return (
    <div className="space-y-8" onClick={handleClickOutside}>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Colorful Animated Navbar</h2>
        <p className="text-sm text-slate-600">
          Responsive navbar with theme switcher, sliding indicator, dropdown menus, and notification badge.
        </p>
      </div>

      {/* Theme Switcher */}
      <div className="flex gap-2 pb-4 border-b border-slate-200">
        {(Object.keys(themes) as ThemeKey[]).map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              theme === t
                ? 'text-white shadow-lg'
                : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
            }`}
            style={
              theme === t
                ? {
                    background: `linear-gradient(135deg, ${themes[t].primary}, ${themes[t].secondary})`,
                  }
                : {}
            }
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Header */}
      <motion.header
        ref={headerRef}
        style={
          {
            '--primary-color': colors.primary,
            '--secondary-color': colors.secondary,
          } as React.CSSProperties
        }
        className={`relative transition-all ${
          scrolled ? 'shadow-lg py-3' : 'py-6'
        } bg-white border-b border-slate-200`}
        animate={{ paddingTop: scrolled ? 12 : 24, paddingBottom: scrolled ? 12 : 24 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg"
              style={{
                background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`,
              }}
            />
            <span className="font-bold text-lg">Brand</span>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-8 relative"
            aria-label="Main navigation"
            role="menubar"
          >
            {navItems.map((item, idx) => (
              <div key={idx} className="group relative">
                <motion.button
                  onMouseEnter={() => setHoverIndex(idx)}
                  onMouseLeave={() => setHoverIndex(null)}
                  onClick={() => handleNavClick(idx)}
                  className={`py-2 font-medium transition-colors relative ${
                    activeIndex === idx ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  aria-current={activeIndex === idx ? 'page' : undefined}
                  aria-haspopup={!!item.submenu}
                  aria-expanded={!!item.submenu}
                  role="menuitem"
                >
                  {item.label}
                  {item.badge && showBadge && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-3 w-2 h-2 rounded-full bg-red-500"
                    />
                  )}
                </motion.button>

                {/* Desktop Dropdown */}
                {item.submenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none group-hover:pointer-events-auto"
                    role="menu"
                  >
                    {item.submenu.map((sub, subIdx) => (
                      <a
                        key={subIdx}
                        href={sub.href}
                        className="block px-4 py-3 text-slate-700 hover:bg-slate-100 first:rounded-t-lg last:rounded-b-lg"
                        role="menuitem"
                      >
                        {sub.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}

            {/* Desktop Indicator */}
            <motion.div
              layoutId="colorful-indicator"
              className="absolute bottom-0 h-1 rounded-full"
              style={{
                background: `linear-gradient(90deg, var(--primary-color), var(--secondary-color))`,
              }}
              animate={{
                left: `${indicatorIndex * (100 / navItems.length)}%`,
                width: `${100 / navItems.length}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </nav>

          {/* Sign In Button */}
          <button
            className="hidden md:block px-6 py-2 rounded-lg font-medium text-white transition-all hover:shadow-lg"
            style={{
              background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`,
            }}
          >
            Sign In
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMobileOpen}
          >
            <motion.div
              animate={{ rotate: isMobileOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-slate-200 bg-slate-50 overflow-hidden"
            >
              <nav className="px-6 py-4 space-y-1" role="menubar">
                {navItems.map((item, idx) => (
                  <div key={idx}>
                    <motion.button
                      onClick={() => {
                        if (item.submenu) {
                          toggleDropdown(idx);
                        } else {
                          handleNavClick(idx);
                        }
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-between ${
                        activeIndex === idx
                          ? 'text-white'
                          : 'text-slate-700 hover:bg-slate-200'
                      }`}
                      style={
                        activeIndex === idx
                          ? {
                              background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`,
                            }
                          : {}
                      }
                      aria-current={activeIndex === idx ? 'page' : undefined}
                      aria-haspopup={!!item.submenu}
                      aria-expanded={openDropdown === idx}
                      role="menuitem"
                    >
                      <span className="flex items-center gap-2">
                        {item.label}
                        {item.badge && showBadge && (
                          <span className="w-2 h-2 rounded-full bg-red-500" />
                        )}
                      </span>
                      {item.submenu && (
                        <motion.span
                          animate={{ rotate: openDropdown === idx ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          ▼
                        </motion.span>
                      )}
                    </motion.button>

                    {/* Mobile Dropdown */}
                    <AnimatePresence>
                      {item.submenu && openDropdown === idx && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          {item.submenu.map((sub, subIdx) => (
                            <a
                              key={subIdx}
                              href={sub.href}
                              className="block px-8 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg text-sm"
                              role="menuitem"
                            >
                              {sub.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>
              <div className="px-6 py-4 border-t border-slate-200">
                <button
                  className="w-full px-6 py-3 rounded-lg font-medium text-white transition-all hover:shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`,
                  }}
                >
                  Sign In
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Info */}
      <div className="space-y-2 text-sm text-slate-600">
        <p>
          ✨ <strong>Features:</strong> Hover over nav items to preview the indicator · Click to set active ·
          Desktop dropdowns show on hover
        </p>
        <p>Mobile: Tap menu icon to toggle, tap dropdown arrow for accordion · Swipe/click outside to close</p>
        <p>Resize your window to see the responsive breakpoint · Scroll down for header shadow effect</p>
        <p>Theme colors update all gradient elements dynamically · Badge appears after 2 seconds on Contact link</p>
        <p>Press Escape to close mobile menu or dropdown</p>
      </div>
    </div>
  );
}
