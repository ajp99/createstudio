'use client';

import { useEffect, useRef, useState } from 'react';
import LenisProvider from '@/components/LenisProvider';
import CustomCursor from '@/components/CustomCursor';
import ShowcaseNav from '@/components/showcase/ShowcaseNav';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function AwwwardsSample() {
  const heroRef = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useGSAP(() => {
    // Orb follows cursor
    gsap.to(orbRef.current, {
      x: mousePos.x - 50,
      y: mousePos.y - 50,
      duration: 0.5,
      ease: 'power2.out',
    });

    // Split text animation
    const heroText = heroRef.current?.querySelector('h1');
    if (heroText) {
      const split = new SplitType(heroText, { types: 'chars' });
      gsap.fromTo(
        split.chars,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: 'back.out',
        }
      );
    }

    // Section scroll skew
    gsap.to(sectionRef.current, {
      skewY: -5,
      scrollTrigger: {
        trigger: sectionRef.current,
        scrub: 0.5,
        start: 'top center',
        end: 'bottom center',
      },
    });

    // Content reveals
    const reveals = gsap.utils.toArray('[data-reveal]') as HTMLElement[];
    reveals.forEach((reveal) => {
      gsap.fromTo(
        reveal,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: reveal,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, [mousePos]);

  return (
    <LenisProvider>
      <CustomCursor />
      <ShowcaseNav />

      {/* Cursor-following orb */}
      <div
        ref={orbRef}
        className="fixed w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 blur-3xl pointer-events-none z-0"
      />

      <main className="relative w-full bg-black text-white overflow-x-hidden">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center px-6 pt-20"
        >
          <div className="max-w-4xl text-center">
            <h1 className="text-7xl md:text-8xl font-black leading-tight mb-6">
              Bold. <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Experimental.</span> Unforgettable.
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              A cutting-edge design experience with cursor-following elements, scroll-triggered animations,
              and interactive visual effects.
            </p>
            <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold text-lg hover:shadow-2xl transition-shadow">
              Experience the Magic
            </button>
          </div>
        </section>

        {/* Content Section with Skew */}
        <section
          ref={sectionRef}
          className="relative min-h-screen flex items-center justify-center px-6 py-20"
        >
          <div className="max-w-3xl">
            <div data-reveal className="mb-16">
              <h2 className="text-5xl font-bold mb-6">Scroll Triggers Innovation</h2>
              <p className="text-lg text-white/70 leading-relaxed mb-4">
                As you scroll, every element responds with precision-timed animations. The page skews
                dynamically, creating an illusion of depth and motion.
              </p>
              <p className="text-lg text-white/70 leading-relaxed">
                This technique, when used sparingly, creates memorable interactions that delight users
                and make your brand stand out.
              </p>
            </div>

            <div data-reveal className="p-8 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
              <h3 className="text-2xl font-bold mb-4">Key Techniques</h3>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>Cursor-following elements for engagement</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>Character-level text animations for impact</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>Scroll-triggered skew effects for dynamic motion</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>Glassmorphism and gradient overlays for depth</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section className="relative py-20 px-6 border-t border-white/10 bg-gradient-to-b from-black to-slate-900">
          <div data-reveal className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Create?</h2>
            <p className="text-lg text-white/70 mb-8">
              Push boundaries. Delight users. Leave a mark.
            </p>
            <button className="px-8 py-4 rounded-lg border border-cyan-400/50 text-cyan-400 font-semibold hover:bg-cyan-400/10 transition-colors">
              Get Inspired
            </button>
          </div>
        </section>
      </main>
    </LenisProvider>
  );
}
