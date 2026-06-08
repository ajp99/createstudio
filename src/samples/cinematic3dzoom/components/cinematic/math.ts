// Shared easing + remap helpers used across the cinematic scene.

export const clamp = (v: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, v))

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

// Linear remap of x from [inMin,inMax] to [outMin,outMax], clamped.
export const remap = (
  x: number,
  inMin: number,
  inMax: number,
  outMin = 0,
  outMax = 1,
) => {
  const t = clamp((x - inMin) / (inMax - inMin))
  return outMin + (outMax - outMin) * t
}

// Smoothstep — the workhorse for "no hard cut" blends.
export const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp((x - edge0) / (edge1 - edge0))
  return t * t * (3 - 2 * t)
}

// Smootherstep — even gentler ramp for opacity fades.
export const smootherstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp((x - edge0) / (edge1 - edge0))
  return t * t * t * (t * (t * 6 - 15) + 10)
}

// elastic.out(1, 0.3) approximation for the ring overshoot.
export const elasticOut = (t: number) => {
  if (t <= 0) return 0
  if (t >= 1) return 1
  const p = 0.3
  return Math.pow(2, -10 * t) * Math.sin(((t - p / 4) * (2 * Math.PI)) / p) + 1
}

// back.out(0.6) — easeOutBack: settles at 1 with a slight overshoot above 1.
export const backOut = (t: number, factor = 0.6) => {
  const c1 = 1.70158 * factor
  const c3 = c1 + 1
  const x = t - 1
  return 1 + c3 * x * x * x + c1 * x * x
}

// Custom color crossfade curve from the spec: x^0.7 then x^1.2.
export const colorCrossfade = (t: number) => {
  const c = clamp(t)
  return c < 0.5
    ? Math.pow(c * 2, 0.7) * 0.5
    : 0.5 + Math.pow((c - 0.5) * 2, 1.2) * 0.5
}
