import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Layers, Wand2, FileText, Briefcase, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Hero3D from "@/components/Hero3D";
import { LogoMark } from "@/components/AppShell";
import TemplatePreview from "@/components/TemplatePreview";
import { RESUME_TEMPLATES } from "@/lib/templates";
import { DEFAULT_RESUME } from "@/lib/resume-store";

export default function Landing() {
  const featured = RESUME_TEMPLATES.filter((t) => t.premium).slice(0, 6);
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <header className="relative z-20 mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <LogoMark />
          <span className="display text-xl font-bold">RESUMA</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#templates" className="hover:text-foreground">Templates</a>
          <a href="#portfolio" className="hover:text-foreground">Portfolio</a>
          <a href="#pricing" className="hover:text-foreground">Pricing</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/app"><Button variant="ghost">Sign in</Button></Link>
          <Link to="/app/builder"><Button className="bg-gradient-aurora text-primary-foreground border-0 shadow-neon hover:opacity-90">Start free <ArrowRight className="ml-1 h-4 w-4" /></Button></Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0"><Hero3D /></div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-32 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 glass text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-neon-cyan" /> AI-powered Resume + Portfolio Studio
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
            className="display mt-6 text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            Resumes that <span className="text-gradient">feel like products</span>.<br />
            Portfolios that <span className="text-gradient-primary">launch careers</span>.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground">
            30 cinematic resume templates, 10 immersive portfolio templates, real-time editing, AI rewriting and one-click export to PDF & DOCX.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="mt-8 flex items-center justify-center gap-3">
            <Link to="/app/builder"><Button size="lg" className="bg-gradient-aurora text-primary-foreground border-0 shadow-neon hover:opacity-90">Build my resume</Button></Link>
            <Link to="/app/templates"><Button size="lg" variant="outline" className="glass">Browse templates</Button></Link>
          </motion.div>

          {/* Floating preview cards */}
          <div className="relative mt-20 mx-auto max-w-5xl h-[420px] perspective-[1500px]">
            {featured.slice(0, 3).map((t, i) => (
              <motion.div key={t.id}
                initial={{ opacity: 0, y: 60, rotateY: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.8 }}
                className="absolute top-0 left-1/2 w-[280px] md:w-[320px]"
                style={{
                  transform: `translateX(-50%) translateX(${(i - 1) * 220}px) rotateY(${(i - 1) * -12}deg) translateZ(0)`,
                  zIndex: 10 - Math.abs(i - 1),
                }}>
                <div className="animate-float" style={{ animationDelay: `${i * 0.6}s` }}>
                  <TemplatePreview template={t} data={DEFAULT_RESUME} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative mx-auto max-w-7xl px-6 py-24">
        <h2 className="display text-4xl md:text-5xl font-bold">Built for the next decade of careers.</h2>
        <p className="mt-3 text-muted-foreground max-w-2xl">Every detail engineered for speed, polish, and recruiter-grade output.</p>
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {[
            { icon: Wand2, title: "AI writing assist", text: "Rewrite, tighten and tailor every bullet for the role you want." },
            { icon: Layers, title: "30 resume templates", text: "From ATS-clean to cinematic 3D — switch instantly." },
            { icon: Briefcase, title: "10 portfolio themes", text: "Glassmorphism, parallax, and 3D scenes built-in." },
            { icon: FileText, title: "PDF & DOCX export", text: "Pixel-perfect output with selectable text." },
            { icon: ShieldCheck, title: "Privacy-first", text: "Autosaves locally. Your data stays yours." },
            { icon: Sparkles, title: "Resume score", text: "Live scoring with targeted suggestions to improve." },
          ].map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-6 hover:-translate-y-1 transition-transform">
              <div className="h-10 w-10 rounded-xl bg-gradient-aurora grid place-items-center shadow-neon"><f.icon className="h-5 w-5 text-primary-foreground" /></div>
              <div className="mt-4 display text-lg font-semibold">{f.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Template strip */}
      <section id="templates" className="relative mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="display text-4xl font-bold">Featured templates</h2>
            <p className="text-muted-foreground mt-1">A taste of our premium dark & 3D collection.</p>
          </div>
          <Link to="/app/templates"><Button variant="outline" className="glass">View all 30</Button></Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {featured.map((t) => (
            <motion.div key={t.id} whileHover={{ y: -6 }} className="group relative">
              <TemplatePreview template={t} data={DEFAULT_RESUME} />
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.vibe}</div>
                </div>
                {t.premium && <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-aurora text-primary-foreground">PRO</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="pricing" className="relative mx-auto max-w-5xl px-6 py-24">
        <div className="glass-strong rounded-3xl p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-aurora opacity-10" />
          <h3 className="display text-3xl md:text-5xl font-bold relative">Ready to ship your career?</h3>
          <p className="mt-3 text-muted-foreground relative">Start free. Upgrade when you’re ready for premium templates and AI rewriting.</p>
          <div className="mt-6 relative">
            <Link to="/app/builder"><Button size="lg" className="bg-gradient-aurora border-0 shadow-neon">Open RESUMA Studio</Button></Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 mt-10">
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2"><LogoMark /><span>© 2026 RESUMA</span></div>
          <div className="flex items-center gap-5">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#templates" className="hover:text-foreground">Templates</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
