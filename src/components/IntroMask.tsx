"use client";

interface IntroMaskProps {
  textGroupRef: React.RefObject<SVGGElement | null>;
  letterRef: React.RefObject<SVGTSpanElement | null>;
  isIntroComplete: boolean;
}

export default function IntroMask({ textGroupRef, letterRef, isIntroComplete }: IntroMaskProps) {
  return (
    <div
      className="absolute inset-0 z-20 select-none pointer-events-none"
      style={{ display: isIntroComplete ? "none" : "block" }}
    >
      {/*
        Full-viewport SVG.
        - White rect = visible area of overlay
        - Black text = punched-out transparent letters (the "window")
        The SVG is used as a CSS mask on the blurred cream layer below.
      */}
      <svg
        className="absolute inset-0 w-0 h-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="cs-text-mask" maskUnits="userSpaceOnUse">
            <rect width="1920" height="1080" fill="white" />
            <g ref={textGroupRef}>
              <text
                x="960"
                y="540"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="black"
                className="font-syne font-black"
                fontSize="172"
                style={{ letterSpacing: "-0.06em" }}
              >
                CRE<tspan ref={letterRef}>A</tspan>TE STUDIO
              </text>
            </g>
          </mask>
        </defs>
      </svg>

      {/*
        The actual overlay that gets masked.
        Changed from solid cream to glassmorphism: backdrop-blur + semi-transparent dark.
      */}
      <div
        className="absolute inset-0 backdrop-blur-2xl"
        style={{
          background: "rgba(8, 8, 8, 0.55)",
          maskImage: "url(#cs-text-mask)",
          WebkitMaskImage: "url(#cs-text-mask)",
          /* SVG masks require the element to share coordinate space */
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
        }}
      />

      {/*
        Centered visible SVG for actual rendering of the mask geometry.
        The SVG above is invisible (w-0 h-0) and only provides the <defs>.
        This one renders at full viewport so the mask coordinate space aligns.
      */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        {/* Mirror the mask group here so GSAP can grab its bounding box */}
        <g
          ref={undefined}
          style={{ pointerEvents: "none", opacity: 0 }}
          aria-hidden="true"
        >
          <text
            x="960"
            y="540"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="transparent"
            className="font-syne font-black"
            fontSize="172"
            style={{ letterSpacing: "-0.06em" }}
          >
            CREATE STUDIO
          </text>
        </g>
      </svg>

      {/* Studio name label — visible above the blur layer */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30">
        <span className="font-mono text-[10px] tracking-[0.4em] text-white/30 uppercase">
          Scroll to explore
        </span>
        <div className="w-px h-8 bg-white/20 animate-pulse" />
      </div>
    </div>
  );
}
