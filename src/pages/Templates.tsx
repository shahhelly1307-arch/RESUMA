import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { RESUME_TEMPLATES, ResumeTemplate } from "@/lib/templates";
import TemplatePreview from "@/components/TemplatePreview";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart, Search, Check } from "lucide-react";
import { useResumeStore } from "@/lib/resume-store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const CATEGORIES = ["all", "futuristic", "modern", "corporate", "creative", "minimal", "executive", "tech", "startup", "designer", "luxury", "infographic", "timeline", "academic", "ats"] as const;

export default function Templates() {
  const { data, update } = useResumeStore();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [onlyPro, setOnlyPro] = useState(false);
  const [only3D, setOnly3D] = useState(false);
  const [favs, setFavs] = useState<string[]>(() => JSON.parse(localStorage.getItem("resuma:favs") || "[]"));

  const toggleFav = (id: string) => {
    const next = favs.includes(id) ? favs.filter((x) => x !== id) : [...favs, id];
    setFavs(next); localStorage.setItem("resuma:favs", JSON.stringify(next));
  };

  const filtered = useMemo(() => RESUME_TEMPLATES.filter((t) => {
    if (cat !== "all" && t.category !== cat) return false;
    if (onlyPro && !t.premium) return false;
    if (only3D && !t.threeD) return false;
    if (q && !`${t.name} ${t.vibe} ${t.category}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [q, cat, onlyPro, only3D]);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="display text-3xl md:text-4xl font-bold">Resume Templates</h1>
          <p className="text-muted-foreground mt-1">30 cinematic templates · 11 premium · 5 with 3D effects.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={onlyPro ? "default" : "outline"} className={onlyPro ? "bg-gradient-aurora border-0" : "glass"} onClick={() => setOnlyPro(!onlyPro)}>Premium</Button>
          <Button variant={only3D ? "default" : "outline"} className={only3D ? "bg-gradient-cyber border-0" : "glass"} onClick={() => setOnly3D(!only3D)}>3D</Button>
        </div>
      </div>

      <div className="glass rounded-2xl p-3 flex flex-col md:flex-row gap-3 items-stretch md:items-center mb-6">
        <div className="flex items-center gap-2 px-3 h-10 rounded-xl bg-secondary/60 flex-1">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search templates by name, vibe, or category…" className="bg-transparent outline-none text-sm w-full" />
        </div>
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-thin">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={cn("shrink-0 text-xs px-3 h-8 rounded-full capitalize transition-all",
                cat === c ? "bg-gradient-aurora text-primary-foreground shadow-neon" : "glass text-muted-foreground hover:text-foreground")}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((t, i) => (
          <Card key={t.id} t={t} active={t.id === data.templateId} favorite={favs.includes(t.id)}
            onSelect={() => { update("templateId", t.id); toast.success(`Template set to ${t.name}`); }}
            onFav={() => toggleFav(t.id)} index={i} />
        ))}
      </div>
    </div>
  );
}

function Card({ t, active, favorite, onSelect, onFav, index }: { t: ResumeTemplate; active: boolean; favorite: boolean; onSelect: () => void; onFav: () => void; index: number }) {
  const { data } = useResumeStore();
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * 0.03, 0.4) }}
      whileHover={{ y: -6 }} className="group relative">
      <div className={cn("relative rounded-2xl p-3 glass transition-all", active && "ring-2 ring-primary shadow-neon")}>
        <TemplatePreview template={t} data={data} />
        <div className="absolute top-5 left-5 flex gap-1.5">
          {t.premium && <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-aurora text-primary-foreground font-semibold">PRO</span>}
          {t.threeD && <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-cyber text-primary-foreground font-semibold">3D</span>}
          {t.dark && <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/60 text-white font-semibold">DARK</span>}
        </div>
        <button onClick={onFav} className="absolute top-5 right-5 h-8 w-8 rounded-full glass grid place-items-center hover:scale-110 transition">
          <Heart className={cn("h-4 w-4", favorite ? "fill-neon-pink text-neon-pink" : "text-muted-foreground")} />
        </button>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <div className="display font-semibold">{t.name}</div>
            <div className="text-xs text-muted-foreground">{t.vibe}</div>
          </div>
          <Button size="sm" onClick={onSelect} className={cn("border-0", active ? "bg-emerald-500 hover:bg-emerald-500" : "bg-gradient-aurora")}>
            {active ? <><Check className="h-4 w-4 mr-1" /> Active</> : "Use"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
