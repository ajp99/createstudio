// A tiny shared store for scroll progress so every 3D element can read it
// inside useFrame without prop-drilling or re-rendering React.

export type ScrollState = {
  // raw target progress (0..1) set by ScrollTrigger
  target: number
  // smoothed progress (0..1) lerped every frame — this is what the scene reads
  current: number
  // velocity of the smoothed value, useful for subtle reactive motion
  velocity: number
}

export const scroll: ScrollState = {
  target: 0,
  current: 0,
  velocity: 0,
}

export function setScrollTarget(t: number) {
  scroll.target = Math.min(1, Math.max(0, t))
}

// Advance the smoothed progress toward the target. Called once per frame
// from a single top-level driver so the easing is consistent for everyone.
export function advanceScroll(delta: number) {
  const prev = scroll.current
  // critically-damped-ish smoothing, framerate independent
  const smoothing = 1 - Math.pow(0.0015, delta)
  scroll.current += (scroll.target - scroll.current) * smoothing
  scroll.velocity = (scroll.current - prev) / Math.max(delta, 1e-4)
}
