"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  size: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  cardRef: (el: HTMLDivElement | null) => void;
}

export default function ProjectCard({ project, index, cardRef }: ProjectCardProps) {
  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden bg-zinc-950 border border-zinc-900 rounded-2xl flex flex-col justify-end p-6 md:p-8 opacity-0 will-change-transform will-change-opacity ${project.size}`}
      style={{
        transform: "translateY(40px)",
      }}
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 opacity-70 group-hover:opacity-85 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
        
        {/* Next.js Image with Hover Zoom */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
          loading="lazy"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-20 flex flex-col justify-between h-full pointer-events-none">
        {/* Top details */}
        <div className="flex justify-between items-start w-full">
          <span className="font-mono text-xs text-zinc-500 tracking-wider">
            [{project.id}]
          </span>
          <div className="w-10 h-10 rounded-full border border-white/10 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <ArrowUpRight size={18} />
          </div>
        </div>

        {/* Bottom details */}
        <div className="space-y-2 mt-auto">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-widest bg-white/10 text-white/90 backdrop-blur-sm">
              {project.category}
            </span>
            <span className="font-mono text-[10px] text-zinc-400">
              {project.year}
            </span>
          </div>
          
          <h3 className="font-syne font-bold text-2xl md:text-3xl text-white tracking-tight uppercase group-hover:text-amber-100 transition-colors duration-500">
            {project.title}
          </h3>
        </div>
      </div>
    </div>
  );
}
