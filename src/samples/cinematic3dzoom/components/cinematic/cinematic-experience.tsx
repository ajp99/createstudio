"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Scene } from "./scene"
import { setScrollTarget, scroll } from "./scroll-store"
import { Overlay } from "./overlay"

gsap.registerPlugin(ScrollTrigger)

export function CinematicExperience() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  // progress mirrored into React only for the lightweight HTML overlay
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // smooth, normalized scroll incl. touch (per QA checklist)
    ScrollTrigger.normalizeScroll(true)

    const st = ScrollTrigger.create({
      trigger: wrapRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => setScrollTarget(self.progress),
    })

    // mirror smoothed progress to React at a throttled rate for the overlay
    let raf = 0
    let initialized = false
    const tick = () => {
      setProgress(scroll.current)
      if (!initialized) { setReady(true); initialized = true }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      st.kill()
      cancelAnimationFrame(raf)
      ScrollTrigger.normalizeScroll(false)
    }
  }, [])

  return (
    <div ref={wrapRef} className="relative h-[700vh] w-full bg-[#17002a]">
      {/* fixed cinematic stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Canvas
          gl={{ antialias: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0.5, 12], fov: 55, near: 0.1, far: 200 }}
          dpr={[1, 1.8]}
        >
          <color attach="background" args={["#17002a"]} />
          <Scene />
        </Canvas>

        <Overlay progress={progress} />

        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#17002a]">
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-white/60">
              Loading
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
