"use client";

import ProjectCard, { Project } from "./ProjectCard";

const PROJECTS: Project[] = [
  {
    id: "01",
    title: "KRONOS MONOLITH",
    category: "Architecture & Spatial",
    year: "2026",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
    size: "col-span-12 md:col-span-8 h-[60vh] md:h-[70vh]",
  },
  {
    id: "02",
    title: "NEO-BRUTALIST VILLA",
    category: "Interior & Spatial",
    year: "2025",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800",
    size: "col-span-12 md:col-span-4 h-[45vh] md:h-[50vh]",
  },
  {
    id: "03",
    title: "ELEVATE HEADQUARTERS",
    category: "Structural Design",
    year: "2026",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
    size: "col-span-12 md:col-span-4 h-[50vh] md:h-[60vh] md:-mt-20",
  },
  {
    id: "04",
    title: "SHADOWPLAY PAVILION",
    category: "Exhibition Space",
    year: "2025",
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=800",
    size: "col-span-12 md:col-span-8 h-[55vh] md:h-[65vh]",
  },
  {
    id: "05",
    title: "AETHER RESIDENCE",
    category: "Sustainable Living",
    year: "2026",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800",
    size: "col-span-12 md:col-span-7 h-[60vh] md:h-[70vh]",
  },
  {
    id: "06",
    title: "THE CREATIVE LAB",
    category: "Digital Workspace",
    year: "2026",
    image: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=800",
    size: "col-span-12 md:col-span-5 h-[48vh] md:h-[55vh]",
  },
];

interface PortfolioGridProps {
  gridContainerRef: React.RefObject<HTMLDivElement | null>;
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  headerRef: React.RefObject<HTMLDivElement | null>;
}

export default function PortfolioGrid({ gridContainerRef, cardRefs, headerRef }: PortfolioGridProps) {
  return (
    <div
      ref={gridContainerRef}
      className="w-full min-h-screen px-4 md:px-12 py-24 md:py-32 flex flex-col justify-start select-none bg-black text-foreground relative z-10"
      style={{
        transform: "translate3d(0, 0, 0)",
        willChange: "transform",
      }}
    >
      {/* Studio Header (Reveals behind the mask) */}
      <div
        ref={headerRef}
        className="grid grid-cols-12 gap-y-8 md:gap-x-12 mb-20 md:mb-32 opacity-0 transform translate-y-10 transition-all duration-1000 ease-out"
      >
        <div className="col-span-12 md:col-span-4">
          <h1 className="font-syne font-black text-4xl md:text-5xl tracking-tighter text-white uppercase leading-none">
            CREATE <br />
            STUDIO™
          </h1>
          <p className="mt-4 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
            Awwwards Agency of the Year 2026
          </p>
        </div>
        
        <div className="col-span-12 md:col-span-5 flex flex-col justify-between">
          <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed">
            We operate at the interface of advanced spatial engineering, digital physics, and pure architectural design. Crafting high-performance digital spaces that redefine spatial reality.
          </p>
        </div>

        <div className="col-span-12 md:col-span-3 flex flex-col justify-between border-l border-zinc-800 pl-6 md:pl-8">
          <div>
            <span className="font-mono text-xs text-zinc-500 block mb-2">[SERVICES]</span>
            <span className="text-sm text-zinc-400 block font-light">Spatial Engineering</span>
            <span className="text-sm text-zinc-400 block font-light">Interactive WebGL Labs</span>
            <span className="text-sm text-zinc-400 block font-light">Cinematic Graphics</span>
          </div>
        </div>
      </div>

      {/* Asymmetric Bento/Masonry Grid */}
      <div className="grid grid-cols-12 gap-4 md:gap-8 w-full max-w-7xl mx-auto">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            cardRef={(el) => {
              cardRefs.current[index] = el;
            }}
          />
        ))}
      </div>

      {/* Luxury Footer for page depth */}
      <div className="w-full border-t border-zinc-900 mt-32 pt-20 pb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-y-12">
        <div>
          <span className="font-mono text-xs text-zinc-500 block mb-4">[NEXT STEP]</span>
          <h2 className="font-syne font-extrabold text-5xl md:text-7xl text-white tracking-tight uppercase leading-none">
            BUILD A <br />
            MONUMENT.
          </h2>
        </div>
        <div className="flex flex-col items-start md:items-end gap-3 font-mono text-xs text-zinc-400">
          <a href="#" className="hover:text-white transition-colors">HELLO@CREATESTUDIO.XYZ</a>
          <a href="#" className="hover:text-white transition-colors">+1 (800) CREATE-0</a>
          <span className="text-zinc-600">© 2026 CREATE STUDIO. ALL RIGHTS RESERVED.</span>
        </div>
      </div>
    </div>
  );
}
