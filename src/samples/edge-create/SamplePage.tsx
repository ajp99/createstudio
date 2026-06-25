'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import ShowcaseNav from '@/components/showcase/ShowcaseNav';
import LenisProvider from '@/components/LenisProvider';
import Portfolio from '@/components/portfolio/Portfolio';
import Testimonials from '@/components/testimonials/Testimonials';

const Preloader = dynamic(() => import('./components/Preloader'), { ssr: false });
const EdgeCanvas = dynamic(() => import('./components/EdgeCanvas'), { ssr: false });

export default function EdgeCreateSample() {
  const [images, setImages] = useState<HTMLImageElement[] | null>(null);

  return (
    <>
      <ShowcaseNav />
      {!images && <Preloader onComplete={setImages} />}
      {images && (
        <LenisProvider>
          <EdgeCanvas images={images} />
          <div className="bg-white">
            <Portfolio />
            <Testimonials />
          </div>
        </LenisProvider>
      )}
    </>
  );
}
