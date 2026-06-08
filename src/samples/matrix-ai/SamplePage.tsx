'use client';
import dynamic from 'next/dynamic';
import Providers from '@/components/Providers';
import { TunnelProvider } from '@/components/tunnel/SceneManager';

const ExperienceCanvas = dynamic(() => import('@/components/tunnel/ExperienceCanvas').then(m => ({ default: m.ExperienceCanvas })), {
  ssr: false,
});

export default function MatrixAISamplePage() {
  return (
    <Providers>
      <TunnelProvider>
        <main className="w-screen h-screen overflow-hidden bg-black relative">
          <ExperienceCanvas />

          {/* HUD Overlay */}
          <div className="fixed top-8 left-8 z-10 font-mono text-xs text-green-400 opacity-60 pointer-events-none">
            <div>MATRIX AI — TUNNEL NAVIGATION</div>
            <div className="text-[10px] mt-2 space-y-1">
              <div>↑ SCROLL / ARROWS TO NAVIGATE</div>
              <div>→ APPROACH CARDS TO SNAP</div>
              <div>→ CLICK TO INTERACT</div>
            </div>
          </div>

          {/* Era Indicator */}
          <div className="fixed bottom-8 right-8 z-10 font-mono text-xs border border-green-400 px-3 py-2 text-green-400 opacity-60 pointer-events-none">
            <div>ERA SYSTEM</div>
            <div className="text-[10px] mt-1">
              ADAPTIVE VISUAL MATRIX
            </div>
          </div>
        </main>
      </TunnelProvider>
    </Providers>
  );
}
