"use client"

import { clamp, smootherstep, smoothstep } from "./math"

export function Overlay({ progress }: { progress: number }) {
  const p = progress

  // === SECTION A: Ch.01 Title Block (0-22%) ===
  const ch01Opacity = smoothstep(0, 0.05, p) * (1 - smoothstep(0.16, 0.23, p))

  // === SECTION B: Scroll Hint (0-8%, existing) ===
  const introOpacity = 1 - smoothstep(0.0, 0.08, p)

  // === SECTION C: Ch.02 "DESIGN THE FUTURE" (22-63%) ===
  const ch02Opacity = smoothstep(0.22, 0.30, p) * (1 - smoothstep(0.56, 0.63, p))

  // === SECTION D: Ch.07 "CREATE WITHOUT LIMITS" (80-93%) ===
  const ch07Opacity = smoothstep(0.80, 0.87, p) * (1 - smoothstep(0.90, 0.95, p))

  // === SECTION E: Final Brand Reveal (93-100%, existing) ===
  const word1 = clamp(smootherstep(0.93, 0.98, p))
  const word2 = clamp(smootherstep(0.96, 1.0, p))
  const ctaReveal = clamp(smootherstep(0.98, 1.0, p))

  const letters = "CREATE".split("")
  const letters2 = "STUDIO".split("")

  return (
    <div className="pointer-events-none absolute inset-0 select-none">
      {/* Progress rail */}
      <div className="absolute right-6 top-1/2 hidden h-40 w-px -translate-y-1/2 bg-white/10 md:block">
        <div
          className="w-full bg-[#ff4fd8]"
          style={{ height: `${progress * 100}%`, boxShadow: "0 0 12px #ff4fd8" }}
        />
      </div>

      {/* === SECTION A: Ch.01 Title Block === */}
      <div
        className="absolute inset-x-0 top-[38%] flex flex-col items-center gap-4"
        style={{ opacity: ch01Opacity }}
      >
        <h1
          className="text-center font-bold text-white tracking-tight leading-none"
          style={{
            fontFamily: "'Impact','Haettenschweiler','Arial Narrow Bold',sans-serif",
            fontSize: "clamp(80px, 13vw, 200px)",
            letterSpacing: "-0.02em",
          }}
        >
          CREATE STUDIO
        </h1>
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-white/50 max-w-md text-center">
          Your Imagination, Our Creations
        </p>
      </div>

      {/* === SECTION B: Scroll Hint === */}
      <div
        className="absolute inset-x-0 bottom-16 flex flex-col items-center gap-3"
        style={{ opacity: introOpacity }}
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.5em] text-white/70">
          Create Studio
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
          Scroll to enter
        </span>
        <div className="h-10 w-px animate-pulse bg-gradient-to-b from-[#ff4fd8] to-transparent" />
      </div>

      {/* === SECTION C: Ch.02 "DESIGN THE FUTURE" === */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ opacity: ch02Opacity, pointerEvents: ch02Opacity > 0.1 ? "auto" : "none" }}
      >
        <div className="flex flex-col items-center gap-6">
          <h2
            className="text-center font-bold text-white tracking-tight"
            style={{
              fontFamily: "'Impact','Haettenschweiler','Arial Narrow Bold',sans-serif",
              fontSize: "clamp(60px, 11vw, 160px)",
              letterSpacing: "-0.02em",
              lineHeight: "0.95",
            }}
          >
            <span className="flex justify-center">
              {Array.from("DESIGN").map((c, i) => (
                <span
                  key={i}
                  style={{
                    opacity: clamp(ch02Opacity * 1.5 - i * 0.06),
                    transform: `translateY(${(1 - clamp(ch02Opacity * 1.5 - i * 0.06)) * 40}px)`,
                    textShadow: "0 0 40px rgba(255,79,216,0.5)",
                  }}
                >
                  {c}
                </span>
              ))}
            </span>
            <span className="flex justify-center">
              {Array.from("THE FUTURE").map((c, i) => (
                <span
                  key={i}
                  style={{
                    opacity: clamp(ch02Opacity * 1.5 - i * 0.06),
                    transform: `translateY(${(1 - clamp(ch02Opacity * 1.5 - i * 0.06)) * 40}px)`,
                    textShadow: "0 0 40px rgba(255,79,216,0.5)",
                  }}
                >
                  {c}
                </span>
              ))}
            </span>
          </h2>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-white/50 max-w-lg text-center">
            We transform ideas into unforgettable digital experiences.
          </p>
        </div>
      </div>

      {/* === SECTION D: Ch.07 "CREATE WITHOUT LIMITS" === */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ opacity: ch07Opacity, pointerEvents: ch07Opacity > 0.1 ? "auto" : "none" }}
      >
        <div className="flex flex-col items-center gap-8">
          <h3
            className="text-center font-bold text-white tracking-tight"
            style={{
              fontFamily: "'Impact','Haettenschweiler','Arial Narrow Bold',sans-serif",
              fontSize: "clamp(50px, 9vw, 140px)",
              letterSpacing: "-0.02em",
            }}
          >
            CREATE WITHOUT LIMITS
          </h3>

          {/* Brand list with line-by-line stagger */}
          <div className="flex flex-col items-center gap-3">
            {[
              "Brand experiences",
              "Motion systems",
              "Digital products",
              "Immersive storytelling",
            ].map((line, i) => (
              <p
                key={i}
                className="font-mono text-xs uppercase tracking-[0.4em] text-white/40"
                style={{
                  opacity: clamp(smootherstep(0.80 + i * 0.025, 0.87 + i * 0.025, p)),
                  transform: `translateY(${(1 - clamp(smootherstep(0.80 + i * 0.025, 0.87 + i * 0.025, p))) * 20}px)`,
                }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* === SECTION E: Final Brand Reveal === */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1
          className="flex flex-col items-center text-center leading-[0.85]"
          style={{
            fontFamily: "'Impact','Haettenschweiler','Arial Narrow Bold',sans-serif",
          }}
        >
          <span className="flex">
            {letters.map((c, i) => (
              <span
                key={i}
                style={{
                  fontSize: "clamp(60px, 16vw, 200px)",
                  fontWeight: "bold",
                  color: "white",
                  letterSpacing: "-0.02em",
                  opacity: clamp(word1 * 1.4 - i * 0.06),
                  transform: `translateY(${(1 - clamp(word1 * 1.4 - i * 0.06)) * 40}px)`,
                  textShadow: "0 0 40px rgba(255,79,216,0.55)",
                }}
              >
                {c}
              </span>
            ))}
          </span>
          <span className="flex">
            {letters2.map((c, i) => (
              <span
                key={i}
                style={{
                  fontSize: "clamp(60px, 16vw, 200px)",
                  fontWeight: "bold",
                  color: "#ff9bef",
                  letterSpacing: "-0.02em",
                  opacity: clamp(word2 * 1.4 - i * 0.06),
                  transform: `translateY(${(1 - clamp(word2 * 1.4 - i * 0.06)) * 40}px)`,
                  textShadow: "0 0 40px rgba(157,78,221,0.55)",
                }}
              >
                {c}
              </span>
            ))}
          </span>
        </h1>

        {/* Final CTA */}
        <div
          className="mt-10 flex flex-col items-center gap-4"
          style={{
            opacity: ctaReveal,
            transform: `translateY(${(1 - ctaReveal) * 24}px)`,
            pointerEvents: ctaReveal > 0.6 ? "auto" : "none",
          }}
        >
          <p className="max-w-md text-balance text-center font-sans text-sm text-white/60">
            We craft cinematic digital experiences.
          </p>
          <a
            href="mailto:hello@createstudio.com"
            className="group relative inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3 font-mono text-xs uppercase tracking-[0.3em] text-white backdrop-blur transition-colors hover:border-[#ff4fd8] hover:bg-[#ff4fd8]/10"
          >
            Get in touch
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </div>
  )
}
