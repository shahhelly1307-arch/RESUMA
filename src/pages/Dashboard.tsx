import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Briefcase, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import TemplatePreview from "@/components/TemplatePreview";
import PortfolioPreview from "@/components/PortfolioPreview";
import { RESUME_TEMPLATES, PORTFOLIO_TEMPLATES } from "@/lib/templates";
import { useResumeStore } from "@/lib/resume-store";

export default function Dashboard() {
  const { data, score } = useResumeStore();
  const recent = RESUME_TEMPLATES.slice(0, 4);
  const featuredPortfolios = PORTFOLIO_TEMPLATES.filter((t) => t.premium).slice(0, 3);
  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-sm text-muted-foreground">Welcome back</div>
          <h1 className="display text-3xl md:text-4xl font-bold mt-1">Let’s ship something brilliant.</h1>
        </div>
        <Link to="/app/builder"><Button className="bg-gradient-aurora border-0 shadow-neon">Open builder <ArrowRight className="ml-1 h-4 w-4" /></Button></Link>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { icon: TrendingUp, label: "Resume score", value: `${score}/100`, accent: "from-neon-violet to-neon-pink" },
          { icon: FileText, label: "Resumes", value: "1 active", accent: "from-neon-cyan to-neon-violet" },
          { icon: Briefcase, label: "Portfolios", value: "0 published", accent: "from-neon-lime to-neon-cyan" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="glass rounded-2xl p-5 flex items-center gap-4">
            <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${s.accent} grid place-items-center`}><s.icon className="h-5 w-5 text-primary-foreground" /></div>
            <div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
              <div className="display text-2xl font-bold">{s.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <section>
        <div className="flex items-end justify-between mb-3">
          <h2 className="display text-2xl font-bold">Continue editing</h2>
          <Link to="/app/builder" className="text-sm text-muted-foreground hover:text-foreground">Open ›</Link>
        </div>
        <div className="glass rounded-2xl p-5 grid md:grid-cols-[280px_1fr] gap-6 items-start">
          <div className="w-[260px]">
            <TemplatePreview template={RESUME_TEMPLATES.find((t) => t.id === data.templateId) || RESUME_TEMPLATES[0]} data={data} />
          </div>
          <div>
            <div className="display text-xl font-semibold">{data.fullName} — {data.title}</div>
            <p className="text-sm text-muted-foreground mt-1 max-w-xl">{data.summary}</p>
            <div className="mt-4 flex items-center gap-3">
              <Link to="/app/builder"><Button className="bg-gradient-aurora border-0">Edit resume</Button></Link>
              <Link to="/app/templates"><Button variant="outline" className="glass">Change template</Button></Link>
              <Link to="/app/ai"><Button variant="ghost"><Sparkles className="h-4 w-4 mr-1 text-neon-cyan" /> AI rewrite</Button></Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between mb-3">
          <h2 className="display text-2xl font-bold">Trending resume templates</h2>
          <Link to="/app/templates" className="text-sm text-muted-foreground hover:text-foreground">View all ›</Link>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          {recent.map((t) => (
            <Link key={t.id} to={`/app/templates`} className="group">
              <TemplatePreview template={t} data={data} />
              <div className="mt-2 flex items-center justify-between">
                <div className="text-sm">{t.name}</div>
                {t.premium && <span className="text-[9px] px-2 py-0.5 rounded-full bg-gradient-aurora text-primary-foreground">PRO</span>}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between mb-3">
          <h2 className="display text-2xl font-bold">Featured portfolios</h2>
          <Link to="/app/portfolio" className="text-sm text-muted-foreground hover:text-foreground">Browse all ›</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {featuredPortfolios.map((t) => (
            <Link key={t.id} to="/app/portfolio"><PortfolioPreview template={t} /></Link>
          ))}
        </div>
      </section>
    </div>
  );
}
