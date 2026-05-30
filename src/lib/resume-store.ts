import { useEffect, useState } from "react";

export type ResumeData = {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  photo: string;
  summary: string;
  skills: string[];
  languages: { name: string; level: string }[];
  experience: { id: string; role: string; company: string; period: string; description: string }[];
  education: { id: string; degree: string; school: string; period: string; description: string }[];
  projects: { id: string; name: string; link: string; description: string }[];
  certifications: { id: string; name: string; issuer: string; year: string }[];
  achievements: string[];
  references: { id: string; name: string; role: string; contact: string }[];
  templateId: string;
};

export const DEFAULT_RESUME: ResumeData = {
  fullName: "Alex Rivera",
  title: "Senior Product Designer",
  email: "alex@resuma.app",
  phone: "+1 (555) 010-2026",
  address: "Brooklyn, NY",
  website: "alexrivera.design",
  photo: "",
  summary:
    "Award-winning product designer with 8+ years crafting AI-powered SaaS experiences. I blend systems thinking with cinematic visual design to ship products people love.",
  skills: ["Product Design", "Design Systems", "Framer", "Figma", "Motion", "Prototyping", "React", "User Research"],
  languages: [
    { name: "English", level: "Native" },
    { name: "Spanish", level: "Fluent" },
    { name: "French", level: "Conversational" },
  ],
  experience: [
    { id: "e1", role: "Lead Product Designer", company: "Nebula AI", period: "2022 — Present", description: "Lead a team of 6 shipping the AI workspace used by 400k creators. Drove a 38% activation lift through onboarding redesign." },
    { id: "e2", role: "Senior Designer", company: "Northwind Labs", period: "2019 — 2022", description: "Owned the design system across 12 products and shipped the v3 visual language adopted by all teams." },
    { id: "e3", role: "Product Designer", company: "Solstice", period: "2016 — 2019", description: "Designed mobile-first commerce flows powering $40M in GMV." },
  ],
  education: [
    { id: "ed1", degree: "BFA Interaction Design", school: "Parsons School of Design", period: "2012 — 2016", description: "Graduated with honors. Thesis on adaptive interfaces." },
  ],
  projects: [
    { id: "p1", name: "Aurora Studio", link: "aurora.design", description: "Generative branding tool used by 80k designers." },
    { id: "p2", name: "Lumen OS", link: "lumen.os", description: "Open-source design tokens platform." },
  ],
  certifications: [
    { id: "c1", name: "NN/g UX Certification", issuer: "Nielsen Norman Group", year: "2023" },
    { id: "c2", name: "Advanced Prototyping", issuer: "Framer Academy", year: "2022" },
  ],
  achievements: [
    "Awwwards SOTD x3 (2023, 2024, 2025)",
    "Speaker — Config 2024, Framer Loop 2023",
    "Top 1% mentor on ADPList",
  ],
  references: [
    { id: "r1", name: "Jordan Park", role: "VP Design, Nebula AI", contact: "jordan@nebula.ai" },
  ],
  templateId: "aurora-flux",
};

const KEY = "resuma:data:v1";

export function useResumeStore() {
  const [data, setData] = useState<ResumeData>(() => {
    if (typeof window === "undefined") return DEFAULT_RESUME;
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? { ...DEFAULT_RESUME, ...JSON.parse(raw) } : DEFAULT_RESUME;
    } catch { return DEFAULT_RESUME; }
  });

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch {}
  }, [data]);

  const update = <K extends keyof ResumeData>(key: K, value: ResumeData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const score = computeScore(data);

  return { data, setData, update, score };
}

function computeScore(d: ResumeData) {
  let s = 0;
  if (d.fullName) s += 8;
  if (d.title) s += 6;
  if (d.email) s += 6;
  if (d.phone) s += 4;
  if (d.summary && d.summary.length > 80) s += 12;
  if (d.skills.length >= 6) s += 14;
  if (d.experience.length >= 2) s += 18;
  if (d.education.length >= 1) s += 10;
  if (d.projects.length >= 1) s += 8;
  if (d.certifications.length >= 1) s += 6;
  if (d.languages.length >= 1) s += 4;
  if (d.achievements.length >= 1) s += 4;
  return Math.min(100, s);
}
