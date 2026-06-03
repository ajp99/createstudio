export const siteConfig = {
  branding: {
    agencyName: "CREATE STUDIO",
    tagline: "Truminds Design Agency",
  },
  portfolio: {
    variant: "masonry-drag" as "masonry-drag" | "3d-carousel",
  },
  testimonials: {
    variant: "split-scroll" as "split-scroll" | "3d-cylinder",
  },
  blog: {
    variant: "horizontal-scroll" as
      | "horizontal-scroll"
      | "card-grid"
      | "staggered-distort"
      | "minimalist-text",
  },
  features: {
    customCursor: true,
    noiseOverlay: true,
    webglBackgroundParticles: true,
    pageTransitions: true,
    preloader: true,
  },
} as const;
