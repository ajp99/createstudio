import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ShowcaseNav() {
  const pathname = usePathname();
  const isGallery = pathname === '/';

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-[9000] px-6 py-3 rounded-full bg-black/80 backdrop-blur border border-white/20">
      <div className="flex items-center gap-4">
        {!isGallery && (
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors">
            ← Gallery
          </Link>
        )}
        {!isGallery && <div className="w-px h-4 bg-white/20" />}
        <span className="text-xs font-bold text-white tracking-widest">SAMPLE SHOWCASE</span>
      </div>
    </nav>
  );
}
