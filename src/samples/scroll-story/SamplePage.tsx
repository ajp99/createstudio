'use client';

import { useEffect, useRef } from 'react';
import LenisProvider from '@/components/LenisProvider';
import ShowcaseNav from '@/components/showcase/ShowcaseNav';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollStorySample() {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const bg1Ref = useRef(null);
  const bg2Ref = useRef(null);

  useGSAP(() => {
    // Hero fade in
    gsap.fromTo(
      section1Ref.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );

    // Parallax effect for first background
    gsap.to(bg1Ref.current, {
      y: '30%',
      scrollTrigger: {
        trigger: section1Ref.current,
        scrub: 1,
        start: 'top center',
        end: 'bottom center',
      },
    });

    // Parallax effect for second background
    gsap.to(bg2Ref.current, {
      y: '30%',
      scrollTrigger: {
        trigger: section2Ref.current,
        scrub: 1,
        start: 'top center',
        end: 'bottom center',
      },
    });

    // Section content animations
    const reveals = gsap.utils.toArray('[data-reveal]') as HTMLElement[];
    reveals.forEach((reveal) => {
      gsap.fromTo(
        reveal,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: reveal,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  });

  return (
    <LenisProvider>
      <ShowcaseNav />
      <main className="min-h-screen bg-black text-white overflow-x-hidden">
        {/* Section 1 - Hero with Parallax */}
        <section
          ref={section1Ref}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          <div
            ref={bg1Ref}
            className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-900 to-black"
          />

          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Scroll-Driven Storytelling
            </h1>
            <p className="text-xl text-white/70 mb-8">
              Experience immersive narratives through parallax effects and scroll-triggered animations.
            </p>
          </div>
        </section>

        {/* Section 2 - Content with Parallax */}
        <section
          ref={section2Ref}
          className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
        >
          <div
            ref={bg2Ref}
            className="absolute inset-0 bg-gradient-to-b from-blue-900 via-slate-900 to-black"
          />

          <div className="relative z-10 max-w-3xl mx-auto px-6">
            <div data-reveal className="mb-12">
              <h2 className="text-4xl font-bold mb-4">Chapter One</h2>
              <p className="text-lg text-white/70 leading-relaxed mb-4">
                Begin your journey with a compelling narrative. As you scroll, each section reveals
                itself with smooth, purposeful animations that guide your attention.
              </p>
              <p className="text-lg text-white/70 leading-relaxed">
                The parallax effect creates depth, making the experience feel three-dimensional and
                immersive.
              </p>
            </div>

            <div data-reveal className="mt-16 pt-12 border-t border-white/10">
              <h2 className="text-4xl font-bold mb-4">Chapter Two</h2>
              <p className="text-lg text-white/70 leading-relaxed mb-4">
                Continue scrolling to uncover more layers of your story. Each section builds upon
                the last, creating a cohesive narrative experience.
              </p>
              <p className="text-lg text-white/70 leading-relaxed">
                This design pattern works exceptionally well for portfolios, case studies, and
                editorial content.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 - Closing */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-black px-6">
          <div data-reveal className="max-w-2xl text-center">
            <h2 className="text-5xl font-bold mb-6">The End of Your Journey</h2>
            <p className="text-lg text-white/70 mb-8">
              Scroll-driven storytelling creates memorable, engaging user experiences that leave a
              lasting impression.
            </p>
            <button className="px-8 py-4 rounded-lg bg-white/10 border border-white/30 text-white font-semibold hover:bg-white/20 transition-colors">
              Explore More
            </button>
          </div>
        </section>
      </main>
    </LenisProvider>
  );
}
