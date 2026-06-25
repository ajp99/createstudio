'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import ShowcaseNav from '@/components/showcase/ShowcaseNav';
import LenisProvider from '@/components/LenisProvider';
import Testimonials from '@/components/testimonials/Testimonials';

const Preloader = dynamic(() => import('./components/Preloader'), { ssr: false });
const CanvasSequence = dynamic(() => import('./components/CanvasSequence'), { ssr: false });

export default function VisualImmersionSample() {
  const [images, setImages] = useState<HTMLImageElement[] | null>(null);

  return (
    <>
      <ShowcaseNav />
      {!images && <Preloader onComplete={setImages} />}
      {images && (
        <LenisProvider>
          <CanvasSequence images={images} />
          <Testimonials />
        </LenisProvider>
      )}
    </>
  );
}
