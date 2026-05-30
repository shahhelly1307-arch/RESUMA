import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { PORTFOLIO_TEMPLATES } from "@/lib/templates";
import PortfolioPreview from "@/components/PortfolioPreview";
import { Button } from "@/components/ui/button";
import { Search, ExternalLink, Rocket } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const CATS = ["all", "developer", "designer", "freelancer", "photographer", "architect", "founder", "uiux", "agency", "3dartist", "personal"];

export default function Portfolio() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const featured = PORTFOLIO_TEMPLATES.filter((t) => t.premium);
  const all = useMemo(() => PORTFOLIO_TEMPLATES.filter((t) => {
    if (cat !== "all" && t.category !== cat) return false;
    if (q && !`${t.name} ${t.vibe} ${t.category}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [q, cat]);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="display text-3xl md:text-4xl font-bold">Portfolio Builder</h1>
          <p className="text-muted-foreground mt-1">10 immersive themes — glassmorphism, parallax & 3D scenes built in.</p>
        </div>
        <Button className="bg-gradient-cyber border-0 shadow-cyan"><Rocket className="h-4 w-4 mr-1" /> Publish portfolio</Button>
      </div>

      <section className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="display text-2xl font-bold">Featured premium themes</h2>
          <span className="text-xs text-muted-foreground">{featured.length} themes</span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -6 }}>
              <div className="relative glass rounded-2xl p-3">
                <span className="absolute top-5 left-5 z-10 text-[10px] px-2 py-0.5 rounded-full bg-gradient-aurora text-primary-foreground font-semibold">FEATURED</span>
                <PortfolioPreview template={t} />
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="display font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.vibe}</div>
                  </div>
                  <Button size="sm" onClick={() => toast.success(`${t.name} selected`)} className="bg-gradient-aurora border-0">Use</Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="glass rounded-2xl p-3 flex flex-col md:flex-row gap-3 items-stretch md:items-center mb-6">
        <div className="flex items-center gap-2 px-3 h-10 rounded-xl bg-secondary/60 flex-1">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search portfolio themes…" className="bg-transparent outline-none text-sm w-full" />
        </div>
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-thin">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={cn("shrink-0 text-xs px-3 h-8 rounded-full capitalize",
              cat === c ? "bg-gradient-cyber text-primary-foreground shadow-cyan" : "glass text-muted-foreground hover:text-foreground")}>{c}</button>
          ))}
        </div>
      </div>

      <section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {all.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} whileHover={{ y: -4 }}>
              <div className="glass rounded-2xl p-3">
                <PortfolioPreview template={t} />
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="display font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground capitalize">{t.category}</div>
                  </div>
                  <Button size="sm" variant="outline" className="glass"><ExternalLink className="h-4 w-4 mr-1" /> Preview</Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
