"use client";

import { useEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, Project } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const CANVAS_W = 2800;
const CANVAS_H = 1400;

function ProjectItem({ project }: { project: Project }) {
  const itemRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={itemRef}
      className="absolute group cursor-pointer"
      style={{ left: project.x ?? 0, top: project.y ?? 0, width: 320, height: 220 }}
      data-cursor-type="view"
    >
      <div className="relative w-full h-full overflow-hidden rounded-xl border border-zinc-800/60">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-400 ease-out">
          <span className="font-mono text-[9px] text-white/40 tracking-widest uppercase block mb-1">
            {project.category} — {project.year}
          </span>
          <h3 className="font-syne font-bold text-sm text-white tracking-tight uppercase">
            {project.title}
          </h3>
          <p className="font-inter text-xs text-white/50 mt-1 leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-400 line-clamp-2">
            {project.description}
          </p>
        </div>
        <span className="absolute top-3 right-3 font-mono text-[9px] text-white/20">[{project.id}]</span>
      </div>
    </div>
  );
}

export default function MasonryDragPortfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { tension: 180, friction: 28 },
  }));

  const bind = useDrag(
    ({ offset: [ox, oy] }) => {
      api.start({ x: ox, y: oy });
    },
    {
      from: () => [x.get(), y.get()],
      bounds: {
        left: -(CANVAS_W - (typeof window !== "undefined" ? window.innerWidth : 1440)),
        right: 0,
        top: -(CANVAS_H - 700),
        bottom: 0,
      },
      rubberband: 0.2,
    }
  );

  useEffect(() => {
    const items = innerRef.current?.querySelectorAll<HTMLDivElement>(".group");
    if (!items) return;

    gsap.fromTo(
      Array.from(items),
      { opacity: 0, y: 40, rotation: () => (Math.random() - 0.5) * 6 },
      {
        opacity: 1,
        y: 0,
        rotation: 0,
        stagger: 0.07,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden bg-zinc-950">
      <div className="px-8 md:px-16 mb-12">
        <span className="font-mono text-[10px] text-white/30 tracking-[0.5em] uppercase block mb-4">
          Portfolio
        </span>
        <h2
          className="font-syne font-black uppercase text-white tracking-tighter leading-none"
          style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
        >
          Selected<br />Work
        </h2>
        <p className="font-mono text-xs text-white/30 mt-4 tracking-widest uppercase flex items-center gap-2">
          <span className="block w-4 h-px bg-white/20" />
          Drag to explore
        </p>
      </div>

      <div
        className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
        style={{ height: 560 }}
        data-cursor-type="drag"
      >
        <animated.div
          {...bind()}
          ref={innerRef}
          style={{
            x,
            y,
            width: CANVAS_W,
            height: CANVAS_H,
            position: "relative",
            touchAction: "none",
          }}
        >
          {PROJECTS.map((p) => (
            <ProjectItem key={p.id} project={p} />
          ))}
        </animated.div>
      </div>
    </section>
  );
}
