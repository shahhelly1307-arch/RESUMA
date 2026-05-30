import { NavLink, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, FileText, Briefcase, Sparkles, LayoutGrid, Settings, Sun, Moon, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/app/builder", label: "Resume Builder", icon: FileText },
  { to: "/app/templates", label: "Resume Templates", icon: LayoutGrid },
  { to: "/app/portfolio", label: "Portfolio Builder", icon: Briefcase },
  { to: "/app/ai", label: "AI Studio", icon: Sparkles },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

export default function AppShell() {
  const [theme, setTheme] = useState<"dark" | "light">(() => (localStorage.getItem("resuma:theme") as any) || "dark");
  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("resuma:theme", theme);
  }, [theme]);
  const loc = useLocation();

  return (
    <div className="flex min-h-screen w-full">
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-border/60 glass">
        <div className="px-5 py-5">
          <NavLink to="/" className="flex items-center gap-2">
            <LogoMark />
            <span className="display text-xl font-bold tracking-tight">RESUMA</span>
          </NavLink>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end as any}
              className={({ isActive }) =>
                cn("relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
                  "hover:bg-sidebar-accent/60 text-sidebar-foreground",
                  isActive && "bg-sidebar-accent text-foreground")
              }>
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span layoutId="navdot" className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-gradient-aurora" />
                  )}
                  <n.icon className="h-4 w-4" />
                  <span>{n.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="p-3">
          <div className="glass-strong rounded-2xl p-4">
            <div className="text-xs text-muted-foreground">Pro upgrade</div>
            <div className="display text-base mt-1">Unlock 3D templates</div>
            <Button className="mt-3 w-full bg-gradient-aurora text-primary-foreground hover:opacity-90 border-0">Go Pro</Button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 glass border-b border-border/60">
          <div className="flex items-center gap-3 px-5 h-14">
            <div className="md:hidden flex items-center gap-2">
              <LogoMark />
              <span className="display font-bold">RESUMA</span>
            </div>
            <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
              <div className="flex items-center gap-2 px-3 h-9 rounded-xl bg-secondary/60 w-full">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input placeholder="Search templates, sections, AI…" className="bg-transparent outline-none text-sm w-full" />
                <kbd className="mono text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5">⌘K</kbd>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <div className="h-8 w-8 rounded-full bg-gradient-aurora shadow-neon" />
            </div>
          </div>
        </header>
        <main key={loc.pathname} className="flex-1 min-w-0 animate-[fade-in_.3s_ease-out]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function LogoMark() {
  return (
    <div className="relative h-8 w-8 rounded-xl bg-gradient-aurora shadow-neon grid place-items-center">
      <div className="absolute inset-0.5 rounded-[10px] bg-background/70 grid place-items-center">
        <span className="display text-sm font-bold text-gradient">R</span>
      </div>
    </div>
  );
}
