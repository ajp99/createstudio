export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
  x?: number;
  y?: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  portrait: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  slug: string;
}

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "KRONOS MONOLITH",
    category: "Architecture",
    year: "2026",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=900",
    description: "A towering monolithic residential complex redefining urban skylines with brutalist precision.",
    x: 80,
    y: 60,
  },
  {
    id: "02",
    title: "NEO-BRUTALIST VILLA",
    category: "Interior",
    year: "2025",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600",
    description: "Raw concrete textures meet warm Scandinavian minimalism in this 600sqm private residence.",
    x: 520,
    y: 200,
  },
  {
    id: "03",
    title: "ELEVATE HQ",
    category: "Structural",
    year: "2026",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600",
    description: "Corporate headquarters designed for the post-remote era — spaces that energize collaboration.",
    x: 980,
    y: 80,
  },
  {
    id: "04",
    title: "SHADOWPLAY PAVILION",
    category: "Exhibition",
    year: "2025",
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=900",
    description: "A temporary exhibition pavilion where light and shadow become the primary architectural medium.",
    x: 300,
    y: 480,
  },
  {
    id: "05",
    title: "AETHER RESIDENCE",
    category: "Sustainable",
    year: "2026",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600",
    description: "Net-zero carbon villa nestled into coastal terrain — architecture in harmony with nature.",
    x: 1200,
    y: 350,
  },
  {
    id: "06",
    title: "THE CREATIVE LAB",
    category: "Digital Workspace",
    year: "2026",
    image: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=600",
    description: "A next-generation creative hub where digital and physical realities merge seamlessly.",
    x: 700,
    y: 600,
  },
  {
    id: "07",
    title: "OBSIDIAN TOWER",
    category: "Landmark",
    year: "2025",
    image: "https://images.unsplash.com/photo-1624213111452-35e8d3d5cc18?q=80&w=600",
    description: "A 42-story mixed-use landmark that redefined the city's relationship with its waterfront.",
    x: 1400,
    y: 120,
  },
  {
    id: "08",
    title: "VOID GALLERY",
    category: "Art Space",
    year: "2026",
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=600",
    description: "Minimalist gallery conceived as a void — where absence becomes the most powerful presence.",
    x: 200,
    y: 800,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "01",
    quote:
      "CREATE STUDIO doesn't just design buildings — they craft experiences. The Kronos Monolith project exceeded every expectation, blending technical mastery with poetic restraint.",
    author: "Marcus Chen",
    role: "CEO",
    company: "Apex Properties",
    portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
  },
  {
    id: "02",
    quote:
      "The Aether Residence is a living manifesto for sustainable architecture. Working with CREATE STUDIO was transformative — they challenged every assumption and delivered something extraordinary.",
    author: "Sophia Reyes",
    role: "Founder",
    company: "Green Futures Lab",
    portrait: "https://images.unsplash.com/photo-1494790108755-2616b612b977?q=80&w=400",
  },
  {
    id: "03",
    quote:
      "Their spatial intelligence is unmatched. The Creative Lab has become the most talked-about office in the city. Productivity, culture, and beauty — all in one building.",
    author: "James Whitmore",
    role: "Director of Operations",
    company: "Nexus Tech",
    portrait: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
  },
  {
    id: "04",
    quote:
      "From concept to completion, CREATE STUDIO demonstrated an uncanny ability to translate abstract vision into physical reality. The Void Gallery is now an icon.",
    author: "Nadia Vasquez",
    role: "Chief Curator",
    company: "Modern Art Foundation",
    portrait: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400",
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "01",
    title: "The Architecture of Silence: Designing for Contemplation",
    excerpt:
      "What happens when a building stops trying to impress and starts trying to heal? We explore the emerging discipline of restorative architecture.",
    date: "May 2026",
    category: "Theory",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
    slug: "architecture-of-silence",
  },
  {
    id: "02",
    title: "Material Honesty: Why Brutalism Is More Relevant Than Ever",
    excerpt:
      "In an age of digital facades and algorithmic aesthetics, the raw honesty of brutalist materials is having a profound cultural renaissance.",
    date: "Apr 2026",
    category: "Opinion",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
    slug: "material-honesty-brutalism",
  },
  {
    id: "03",
    title: "Parametric Urbanism: Designing Cities with Algorithms",
    excerpt:
      "We're entering an era where urban planning is co-authored by code. The implications are vast — and the debate is just beginning.",
    date: "Mar 2026",
    category: "Technology",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1624213111452-35e8d3d5cc18?q=80&w=800",
    slug: "parametric-urbanism",
  },
  {
    id: "04",
    title: "Inside the Shadowplay Pavilion: A Behind-the-Scenes Look",
    excerpt:
      "The exhibition pavilion that became the sensation of design week. We go inside the process — the failures, the breakthroughs, and the impossible geometry.",
    date: "Feb 2026",
    category: "Projects",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=800",
    slug: "shadowplay-pavilion-inside",
  },
];

export const GALLERY_IMAGES = [
  {
    id: "g01",
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
    alt: "Kronos Monolith — Construction Phase",
    caption: "Kronos Monolith",
  },
  {
    id: "g02",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
    alt: "Elevate HQ — Aerial View",
    caption: "Elevate HQ",
  },
  {
    id: "g03",
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200",
    alt: "Aether Residence — Interior",
    caption: "Aether Residence",
  },
  {
    id: "g04",
    src: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=1200",
    alt: "Void Gallery — Opening Night",
    caption: "Void Gallery",
  },
  {
    id: "g05",
    src: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=1200",
    alt: "Creative Lab — Workspace",
    caption: "The Creative Lab",
  },
  {
    id: "g06",
    src: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1200",
    alt: "Shadowplay Pavilion — Night",
    caption: "Shadowplay Pavilion",
  },
];
