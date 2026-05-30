import { ResumeTemplate } from "@/lib/templates";
import { ResumeData } from "@/lib/resume-store";
import { cn } from "@/lib/utils";

const FONT_CLASS: Record<string, string> = {
  sans: "font-[Inter]",
  display: "font-[Space_Grotesk]",
  mono: "mono",
  serif: "font-serif",
};

type Props = {
  template: ResumeTemplate;
  data: ResumeData;
  scale?: number;
  preview?: boolean;
};

/** Lightweight visual renderer used for both live preview and the gallery thumbnails. */
export default function TemplatePreview({ template, data, scale = 1, preview = false }: Props) {
  const accent = `hsl(${template.accent})`;
  const accent2 = template.accent2 ? `hsl(${template.accent2})` : accent;
  const isDark = !!template.dark;
  const bg = isDark ? "#0b0b14" : "#ffffff";
  const fg = isDark ? "#e6e8f2" : "#0b0b14";
  const sub = isDark ? "rgba(230,232,242,0.65)" : "rgba(11,11,20,0.65)";
  const cardBg = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";

  // A4 aspect: 1 / 1.414
  return (
    <div
      className={cn("relative w-full overflow-hidden rounded-xl shadow-elegant", FONT_CLASS[template.font])}
      style={{ aspectRatio: "1 / 1.414", background: bg, color: fg }}
    >
      {/* Decorative layers per layout */}
      {template.layout === "split-diagonal" && (
        <div className="absolute inset-0" style={{
          background: `linear-gradient(135deg, ${accent} 0%, ${accent2} 60%, transparent 60.5%)`,
          clipPath: "polygon(0 0, 60% 0, 35% 100%, 0% 100%)", opacity: isDark ? 0.85 : 0.9,
        }} />
      )}
      {template.layout === "header-band" && (
        <div className="absolute top-0 left-0 right-0 h-[22%]" style={{ background: `linear-gradient(135deg, ${accent}, ${accent2})` }} />
      )}
      {template.threeD && (
        <>
          <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full blur-3xl opacity-50" style={{ background: accent }} />
          <div className="absolute -bottom-12 -left-12 h-56 w-56 rounded-full blur-3xl opacity-40" style={{ background: accent2 }} />
        </>
      )}

      <div className="relative h-full w-full" style={{ fontSize: `${10 * scale}px`, lineHeight: 1.4, padding: `${18 * scale}px` }}>
        {/* Layout switch */}
        {(template.layout === "sidebar-left" || template.layout === "sidebar-right") ? (
          <SidebarLayout template={template} data={data} scale={scale} accent={accent} accent2={accent2} sub={sub} cardBg={cardBg} fg={fg} isDark={isDark} />
        ) : template.layout === "grid" ? (
          <GridLayout template={template} data={data} scale={scale} accent={accent} accent2={accent2} sub={sub} cardBg={cardBg} />
        ) : template.layout === "timeline" ? (
          <TimelineLayout data={data} scale={scale} accent={accent} sub={sub} />
        ) : template.layout === "card-stack" ? (
          <CardStackLayout data={data} scale={scale} accent={accent} accent2={accent2} cardBg={cardBg} sub={sub} />
        ) : template.layout === "split-diagonal" ? (
          <DiagonalLayout data={data} scale={scale} accent={accent} sub={sub} cardBg={cardBg} />
        ) : template.layout === "header-band" ? (
          <HeaderBandLayout data={data} scale={scale} accent={accent} sub={sub} cardBg={cardBg} />
        ) : template.layout === "two-col" ? (
          <TwoColLayout data={data} scale={scale} accent={accent} sub={sub} cardBg={cardBg} />
        ) : (
          <SingleLayout data={data} scale={scale} accent={accent} sub={sub} />
        )}
      </div>
    </div>
  );
}

function Heading({ children, accent, scale }: any) {
  return (
    <div className="flex items-center gap-2" style={{ marginTop: 10 * scale, marginBottom: 4 * scale }}>
      <div style={{ height: 2 * scale, width: 14 * scale, background: accent, borderRadius: 2 }} />
      <div className="uppercase tracking-wider font-semibold" style={{ fontSize: 9 * scale, color: accent }}>{children}</div>
    </div>
  );
}

function SidebarLayout({ template, data, scale, accent, accent2, sub, cardBg, fg, isDark }: any) {
  const right = template.layout === "sidebar-right";
  const Sidebar = (
    <div style={{
      width: "36%", padding: 12 * scale, borderRadius: 12,
      background: isDark ? `linear-gradient(180deg, ${accent}22, ${accent2 || accent}11)` : `linear-gradient(180deg, ${accent}18, ${accent2 || accent}08)`,
    }}>
      <div className="flex flex-col items-start gap-2">
        <div className="h-10 w-10 rounded-full" style={{ background: `linear-gradient(135deg, ${accent}, ${accent2 || accent})` }} />
        <div className="display font-bold leading-tight" style={{ fontSize: 14 * scale }}>{data.fullName}</div>
        <div style={{ fontSize: 9 * scale, color: sub }}>{data.title}</div>
      </div>
      <Heading accent={accent} scale={scale}>Contact</Heading>
      <div style={{ fontSize: 8.5 * scale, color: sub }}>
        <div>{data.email}</div><div>{data.phone}</div><div>{data.address}</div><div>{data.website}</div>
      </div>
      <Heading accent={accent} scale={scale}>Skills</Heading>
      <div className="flex flex-wrap gap-1">
        {data.skills.slice(0, 8).map((s: string) => (
          <span key={s} style={{ fontSize: 7.5 * scale, padding: `${2 * scale}px ${5 * scale}px`, borderRadius: 999, background: cardBg, color: fg }}>{s}</span>
        ))}
      </div>
      <Heading accent={accent} scale={scale}>Languages</Heading>
      {data.languages.map((l: any) => (
        <div key={l.name} style={{ fontSize: 8.5 * scale }} className="flex justify-between"><span>{l.name}</span><span style={{ color: sub }}>{l.level}</span></div>
      ))}
    </div>
  );
  const Main = (
    <div className="flex-1" style={{ padding: 12 * scale }}>
      <Heading accent={accent} scale={scale}>Summary</Heading>
      <p style={{ fontSize: 9 * scale, color: sub }}>{data.summary}</p>
      <Heading accent={accent} scale={scale}>Experience</Heading>
      {data.experience.map((e: any) => (
        <div key={e.id} style={{ marginBottom: 6 * scale }}>
          <div className="flex justify-between font-semibold" style={{ fontSize: 10 * scale }}><span>{e.role}</span><span style={{ color: accent }}>{e.period}</span></div>
          <div style={{ fontSize: 9 * scale, color: sub }}>{e.company}</div>
          <div style={{ fontSize: 8.5 * scale, color: sub }}>{e.description}</div>
        </div>
      ))}
      <Heading accent={accent} scale={scale}>Education</Heading>
      {data.education.map((e: any) => (
        <div key={e.id}><div style={{ fontSize: 9.5 * scale, fontWeight: 600 }}>{e.degree}</div><div style={{ fontSize: 8.5 * scale, color: sub }}>{e.school} • {e.period}</div></div>
      ))}
      <Heading accent={accent} scale={scale}>Projects</Heading>
      {data.projects.map((p: any) => (
        <div key={p.id} style={{ fontSize: 8.5 * scale }}><span style={{ fontWeight: 600 }}>{p.name}</span> — <span style={{ color: sub }}>{p.description}</span></div>
      ))}
    </div>
  );
  return <div className="flex gap-3 h-full">{right ? <>{Main}{Sidebar}</> : <>{Sidebar}{Main}</>}</div>;
}

function GridLayout({ data, scale, accent, accent2, sub, cardBg }: any) {
  return (
    <div className="h-full">
      <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: cardBg }}>
        <div>
          <div className="display font-bold" style={{ fontSize: 18 * scale }}>{data.fullName}</div>
          <div style={{ fontSize: 10 * scale, color: accent }}>{data.title}</div>
        </div>
        <div className="text-right" style={{ fontSize: 8 * scale, color: sub }}>{data.email}<br />{data.phone}<br />{data.address}</div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-3">
        <div>
          <Heading accent={accent} scale={scale}>About</Heading>
          <div style={{ fontSize: 9 * scale, color: sub }}>{data.summary}</div>
          <Heading accent={accent} scale={scale}>Skills</Heading>
          <div className="grid grid-cols-2 gap-1">
            {data.skills.slice(0, 8).map((s: string) => (
              <div key={s} style={{ fontSize: 8 * scale, padding: 4 * scale, background: cardBg, borderLeft: `2px solid ${accent2 || accent}` }}>{s}</div>
            ))}
          </div>
        </div>
        <div>
          <Heading accent={accent} scale={scale}>Experience</Heading>
          {data.experience.slice(0, 3).map((e: any) => (
            <div key={e.id} style={{ marginBottom: 5 * scale }}>
              <div className="font-semibold" style={{ fontSize: 9.5 * scale }}>{e.role} · {e.company}</div>
              <div style={{ fontSize: 8 * scale, color: sub }}>{e.period}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineLayout({ data, scale, accent, sub }: any) {
  return (
    <div className="h-full">
      <div className="display font-bold" style={{ fontSize: 18 * scale }}>{data.fullName}</div>
      <div style={{ fontSize: 10 * scale, color: accent }}>{data.title}</div>
      <div style={{ fontSize: 9 * scale, color: sub, marginTop: 6 * scale }}>{data.summary}</div>
      <div className="relative mt-3 pl-3" style={{ borderLeft: `2px solid ${accent}` }}>
        {data.experience.map((e: any, i: number) => (
          <div key={e.id} style={{ marginBottom: 8 * scale }} className="relative">
            <div className="absolute -left-[7px] top-1 h-2 w-2 rounded-full" style={{ background: accent }} />
            <div className="font-semibold" style={{ fontSize: 10 * scale }}>{e.role} — {e.company}</div>
            <div style={{ fontSize: 8.5 * scale, color: sub }}>{e.period}</div>
            <div style={{ fontSize: 8.5 * scale, color: sub }}>{e.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CardStackLayout({ data, scale, accent, accent2, cardBg, sub }: any) {
  return (
    <div className="h-full">
      <div className="rounded-lg p-3" style={{ background: `linear-gradient(135deg, ${accent}, ${accent2})`, color: "#fff" }}>
        <div className="display font-bold" style={{ fontSize: 16 * scale }}>{data.fullName}</div>
        <div style={{ fontSize: 10 * scale, opacity: 0.9 }}>{data.title}</div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {data.experience.slice(0, 4).map((e: any) => (
          <div key={e.id} className="rounded-md p-2" style={{ background: cardBg }}>
            <div className="font-semibold" style={{ fontSize: 9 * scale }}>{e.role}</div>
            <div style={{ fontSize: 8 * scale, color: sub }}>{e.company} · {e.period}</div>
          </div>
        ))}
      </div>
      <Heading accent={accent} scale={scale}>Skills</Heading>
      <div className="flex flex-wrap gap-1">
        {data.skills.map((s: string) => (
          <span key={s} style={{ fontSize: 7.5 * scale, padding: `${2 * scale}px ${5 * scale}px`, borderRadius: 999, background: cardBg }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

function DiagonalLayout({ data, scale, accent, sub, cardBg }: any) {
  return (
    <div className="h-full relative">
      <div className="absolute top-2 right-2 text-right">
        <div className="display font-bold" style={{ fontSize: 16 * scale }}>{data.fullName}</div>
        <div style={{ fontSize: 9 * scale, color: sub }}>{data.title}</div>
      </div>
      <div className="absolute bottom-2 left-2 right-2">
        <Heading accent={accent} scale={scale}>Experience</Heading>
        {data.experience.slice(0, 3).map((e: any) => (
          <div key={e.id} style={{ fontSize: 8.5 * scale, marginBottom: 3 * scale }}>
            <span style={{ fontWeight: 600 }}>{e.role}</span> · {e.company} <span style={{ color: sub }}>· {e.period}</span>
          </div>
        ))}
        <Heading accent={accent} scale={scale}>Skills</Heading>
        <div className="flex flex-wrap gap-1">
          {data.skills.map((s: string) => (<span key={s} style={{ fontSize: 7.5 * scale, padding: `${2 * scale}px ${5 * scale}px`, borderRadius: 4, background: cardBg }}>{s}</span>))}
        </div>
      </div>
    </div>
  );
}

function HeaderBandLayout({ data, scale, accent, sub, cardBg }: any) {
  return (
    <div className="h-full">
      <div className="text-white" style={{ padding: 8 * scale }}>
        <div className="display font-bold" style={{ fontSize: 18 * scale }}>{data.fullName}</div>
        <div style={{ fontSize: 10 * scale, opacity: 0.9 }}>{data.title}</div>
        <div style={{ fontSize: 8 * scale, opacity: 0.85 }}>{data.email} · {data.phone} · {data.address}</div>
      </div>
      <div style={{ paddingTop: 30 * scale }}>
        <Heading accent={accent} scale={scale}>Profile</Heading>
        <div style={{ fontSize: 9 * scale, color: sub }}>{data.summary}</div>
        <Heading accent={accent} scale={scale}>Experience</Heading>
        {data.experience.map((e: any) => (
          <div key={e.id} style={{ marginBottom: 5 * scale }}>
            <div className="flex justify-between" style={{ fontSize: 9.5 * scale }}><span className="font-semibold">{e.role} — {e.company}</span><span style={{ color: sub }}>{e.period}</span></div>
            <div style={{ fontSize: 8.5 * scale, color: sub }}>{e.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TwoColLayout({ data, scale, accent, sub, cardBg }: any) {
  return (
    <div className="h-full">
      <div className="display font-bold" style={{ fontSize: 18 * scale }}>{data.fullName}</div>
      <div style={{ fontSize: 10 * scale, color: accent }}>{data.title}</div>
      <div style={{ fontSize: 8.5 * scale, color: sub }}>{data.email} · {data.phone} · {data.address}</div>
      <div className="grid grid-cols-3 gap-3 mt-3">
        <div className="col-span-2">
          <Heading accent={accent} scale={scale}>Experience</Heading>
          {data.experience.map((e: any) => (
            <div key={e.id} style={{ marginBottom: 5 * scale }}>
              <div className="font-semibold" style={{ fontSize: 9.5 * scale }}>{e.role} — {e.company}</div>
              <div style={{ fontSize: 8.5 * scale, color: sub }}>{e.period}</div>
              <div style={{ fontSize: 8.5 * scale, color: sub }}>{e.description}</div>
            </div>
          ))}
        </div>
        <div>
          <Heading accent={accent} scale={scale}>Skills</Heading>
          {data.skills.slice(0, 8).map((s: string) => (
            <div key={s} style={{ fontSize: 8 * scale, marginBottom: 2 * scale }}>
              <div className="flex justify-between"><span>{s}</span></div>
              <div className="h-1 rounded-full" style={{ background: cardBg }}><div className="h-1 rounded-full" style={{ width: `${60 + Math.random() * 40}%`, background: accent }} /></div>
            </div>
          ))}
          <Heading accent={accent} scale={scale}>Education</Heading>
          {data.education.map((e: any) => (<div key={e.id} style={{ fontSize: 8.5 * scale }}>{e.degree} · {e.school}</div>))}
        </div>
      </div>
    </div>
  );
}

function SingleLayout({ data, scale, accent, sub }: any) {
  return (
    <div className="h-full">
      <div className="text-center border-b pb-2" style={{ borderColor: accent }}>
        <div className="display font-bold" style={{ fontSize: 18 * scale }}>{data.fullName}</div>
        <div style={{ fontSize: 10 * scale, color: sub }}>{data.title} · {data.email} · {data.phone}</div>
      </div>
      <Heading accent={accent} scale={scale}>Summary</Heading>
      <p style={{ fontSize: 9 * scale, color: sub }}>{data.summary}</p>
      <Heading accent={accent} scale={scale}>Experience</Heading>
      {data.experience.map((e: any) => (
        <div key={e.id} style={{ marginBottom: 5 * scale }}>
          <div className="flex justify-between"><span className="font-semibold" style={{ fontSize: 10 * scale }}>{e.role} — {e.company}</span><span style={{ fontSize: 9 * scale, color: sub }}>{e.period}</span></div>
          <div style={{ fontSize: 8.5 * scale, color: sub }}>{e.description}</div>
        </div>
      ))}
      <Heading accent={accent} scale={scale}>Education</Heading>
      {data.education.map((e: any) => (<div key={e.id} style={{ fontSize: 9 * scale }}>{e.degree} · {e.school} · {e.period}</div>))}
    </div>
  );
}
