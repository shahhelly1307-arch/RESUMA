export type ResumeTemplate = {
  id: string;
  name: string;
  category: "modern" | "corporate" | "creative" | "minimal" | "executive" | "tech" | "startup" | "designer" | "luxury" | "infographic" | "timeline" | "academic" | "ats" | "futuristic";
  premium?: boolean;
  dark?: boolean;
  threeD?: boolean;
  accent: string; // hsl
  accent2?: string;
  layout: "single" | "sidebar-left" | "sidebar-right" | "two-col" | "header-band" | "timeline" | "grid" | "split-diagonal" | "card-stack";
  font: "sans" | "display" | "mono" | "serif";
  vibe: string;
};

const t = (id: string, name: string, category: ResumeTemplate["category"], extra: Partial<ResumeTemplate>): ResumeTemplate => ({
  id, name, category,
  accent: extra.accent ?? "268 90% 66%",
  layout: extra.layout ?? "sidebar-left",
  font: extra.font ?? "sans",
  vibe: extra.vibe ?? "",
  ...extra,
});

export const RESUME_TEMPLATES: ResumeTemplate[] = [
  // Futuristic / Dark / 3D — premium leading set
  t("aurora-flux", "Aurora Flux", "futuristic", { premium: true, dark: true, threeD: true, accent: "268 90% 66%", accent2: "188 95% 55%", layout: "split-diagonal", font: "display", vibe: "Neon split with holographic header" }),
  t("nebula-core", "Nebula Core", "futuristic", { premium: true, dark: true, threeD: true, accent: "322 95% 65%", accent2: "268 90% 66%", layout: "sidebar-left", font: "display", vibe: "Cosmic gradient with orbital chips" }),
  t("quantum-grid", "Quantum Grid", "futuristic", { premium: true, dark: true, threeD: true, accent: "188 95% 55%", layout: "grid", font: "mono", vibe: "Cyber grid with neon nodes" }),
  t("voidline", "Voidline", "futuristic", { premium: true, dark: true, accent: "142 90% 60%", layout: "sidebar-right", font: "mono", vibe: "Terminal-inspired dark" }),
  t("holo-sheet", "Holo Sheet", "futuristic", { premium: true, dark: true, threeD: true, accent: "188 95% 55%", accent2: "322 95% 65%", layout: "header-band", font: "display", vibe: "Holographic foil header" }),
  t("midnight-prism", "Midnight Prism", "luxury", { premium: true, dark: true, accent: "268 90% 66%", layout: "sidebar-left", font: "serif", vibe: "Luxury dark with prism accents" }),
  t("obsidian-exec", "Obsidian Exec", "executive", { premium: true, dark: true, accent: "45 90% 60%", layout: "header-band", font: "serif", vibe: "Executive obsidian with gold" }),
  t("ion-startup", "Ion", "startup", { premium: true, dark: true, accent: "322 95% 65%", layout: "two-col", font: "display", vibe: "Magenta startup energy" }),
  t("matrix-dev", "Matrix Dev", "tech", { premium: true, dark: true, threeD: true, accent: "142 90% 60%", layout: "sidebar-left", font: "mono", vibe: "Green-on-black hacker chic" }),
  t("eclipse-pro", "Eclipse Pro", "corporate", { premium: true, dark: true, accent: "210 90% 60%", layout: "sidebar-right", font: "sans", vibe: "Corporate dark blue" }),
  t("plasma-card", "Plasma Card", "creative", { premium: true, dark: true, threeD: true, accent: "322 95% 65%", accent2: "45 90% 60%", layout: "card-stack", font: "display", vibe: "Floating plasma cards" }),
  // Modern
  t("clean-cobalt", "Clean Cobalt", "modern", { accent: "215 90% 55%", layout: "sidebar-left", font: "sans", vibe: "Crisp modern blue" }),
  t("solstice", "Solstice", "modern", { accent: "20 90% 55%", layout: "header-band", font: "display", vibe: "Warm modern editorial" }),
  t("northwind", "Northwind", "modern", { accent: "200 80% 50%", layout: "two-col", font: "sans", vibe: "Airy two column" }),
  // Corporate
  t("meridian", "Meridian", "corporate", { accent: "215 60% 45%", layout: "sidebar-right", font: "serif", vibe: "Trusted corporate" }),
  t("ledger", "Ledger", "corporate", { accent: "0 0% 30%", layout: "single", font: "serif", vibe: "Conservative single column" }),
  // Creative
  t("kaleido", "Kaleido", "creative", { accent: "322 95% 60%", accent2: "188 95% 55%", layout: "card-stack", font: "display", vibe: "Bold colorful creative" }),
  t("paperflow", "Paperflow", "creative", { accent: "30 90% 55%", layout: "split-diagonal", font: "display", vibe: "Asymmetric paper layout" }),
  // Minimal
  t("monoline", "Monoline", "minimal", { accent: "0 0% 20%", layout: "single", font: "sans", vibe: "Ultra minimal" }),
  t("haiku", "Haiku", "minimal", { accent: "0 0% 10%", layout: "sidebar-left", font: "serif", vibe: "Quiet typography" }),
  // Executive
  t("vanguard", "Vanguard", "executive", { accent: "215 50% 25%", layout: "header-band", font: "serif", vibe: "Senior leadership" }),
  // Tech
  t("stackline", "Stackline", "tech", { accent: "188 80% 45%", layout: "sidebar-left", font: "mono", vibe: "Engineering focused" }),
  // Designer
  t("atelier", "Atelier", "designer", { accent: "10 80% 55%", layout: "grid", font: "display", vibe: "Portfolio-style designer" }),
  // Infographic
  t("pulse-chart", "Pulse Chart", "infographic", { accent: "268 90% 60%", layout: "two-col", font: "sans", vibe: "Bars and skill meters" }),
  // Timeline
  t("chronos", "Chronos", "timeline", { accent: "188 80% 50%", layout: "timeline", font: "sans", vibe: "Vertical journey" }),
  // Academic
  t("scholar", "Scholar", "academic", { accent: "215 50% 30%", layout: "single", font: "serif", vibe: "Academic CV" }),
  // ATS-friendly
  t("ats-clear", "ATS Clear", "ats", { accent: "0 0% 15%", layout: "single", font: "sans", vibe: "Plain-text ATS optimized" }),
  t("ats-prime", "ATS Prime", "ats", { accent: "215 40% 30%", layout: "sidebar-left", font: "sans", vibe: "ATS with subtle structure" }),
  // Extras to reach 30
  t("luxe-noir", "Luxe Noir", "luxury", { accent: "45 90% 55%", layout: "header-band", font: "serif", vibe: "Black & gold luxury" }),
  t("crimson-edge", "Crimson Edge", "creative", { accent: "0 80% 55%", layout: "sidebar-right", font: "display", vibe: "Bold red accent" }),
];

export type PortfolioTemplate = {
  id: string;
  name: string;
  category: "developer" | "designer" | "freelancer" | "photographer" | "architect" | "founder" | "uiux" | "agency" | "3dartist" | "personal";
  premium?: boolean;
  threeD?: boolean;
  accent: string;
  accent2?: string;
  vibe: string;
};

export const PORTFOLIO_TEMPLATES: PortfolioTemplate[] = [
  { id: "stellar-dev", name: "Stellar Dev", category: "developer", premium: true, threeD: true, accent: "188 95% 55%", accent2: "268 90% 66%", vibe: "3D parallax developer hero" },
  { id: "atelier-design", name: "Atelier", category: "designer", premium: true, threeD: true, accent: "322 95% 65%", accent2: "45 90% 60%", vibe: "Glassmorphism design showcase" },
  { id: "lens-photog", name: "Lens", category: "photographer", premium: true, threeD: true, accent: "0 0% 10%", accent2: "45 90% 55%", vibe: "Cinematic photo grid" },
  { id: "monolith-arch", name: "Monolith", category: "architect", premium: true, threeD: true, accent: "30 20% 50%", vibe: "Architectural depth & shadow" },
  { id: "founder-ion", name: "Founder Ion", category: "founder", premium: true, threeD: true, accent: "268 90% 66%", accent2: "322 95% 65%", vibe: "Startup founder story" },
  { id: "freelance-flow", name: "Freelance Flow", category: "freelancer", accent: "188 95% 55%", vibe: "Service-led freelancer" },
  { id: "uiux-canvas", name: "Canvas UX", category: "uiux", accent: "268 90% 66%", vibe: "Case-study focused" },
  { id: "agency-prism", name: "Prism Agency", category: "agency", accent: "322 95% 65%", accent2: "188 95% 55%", vibe: "Creative agency reel" },
  { id: "3dartist-void", name: "Void 3D", category: "3dartist", threeD: true, accent: "142 90% 60%", vibe: "3D artist showcase" },
  { id: "personal-mono", name: "Mono Personal", category: "personal", accent: "0 0% 60%", vibe: "Personal branding minimal" },
];
