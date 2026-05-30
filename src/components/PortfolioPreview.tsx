import { PortfolioTemplate } from "@/lib/templates";

export default function PortfolioPreview({ template }: { template: PortfolioTemplate }) {
  const accent = `hsl(${template.accent})`;
  const accent2 = template.accent2 ? `hsl(${template.accent2})` : accent;
  return (
    <div className="relative w-full overflow-hidden rounded-xl shadow-elegant" style={{ aspectRatio: "16 / 10", background: "#070710", color: "#fff" }}>
      <div className="absolute inset-0" style={{ background: `radial-gradient(800px 400px at 0% 0%, ${accent}55, transparent 60%), radial-gradient(600px 300px at 100% 100%, ${accent2}55, transparent 60%)` }} />
      {template.threeD && (
        <>
          <div className="absolute -top-10 right-10 h-40 w-40 rounded-full blur-3xl opacity-60" style={{ background: accent }} />
          <div className="absolute bottom-0 -left-10 h-40 w-40 rounded-full blur-3xl opacity-60" style={{ background: accent2 }} />
        </>
      )}
      <div className="relative p-5 h-full flex flex-col">
        <div className="flex items-center justify-between text-[10px] opacity-80">
          <span className="mono">{template.category.toUpperCase()}</span>
          <span className="mono">/portfolio</span>
        </div>
        <div className="mt-auto">
          <div className="display text-3xl font-bold leading-none">{template.name}</div>
          <div className="text-xs opacity-80 mt-1 max-w-[80%]">{template.vibe}</div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="h-12 rounded-md" style={{ background: `linear-gradient(135deg, ${accent}, ${accent2})` }} />
            <div className="h-12 rounded-md bg-white/10 backdrop-blur" />
            <div className="h-12 rounded-md bg-white/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
