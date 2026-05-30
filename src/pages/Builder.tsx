import { useMemo, useState } from "react";
import { useResumeStore } from "@/lib/resume-store";
import { RESUME_TEMPLATES } from "@/lib/templates";
import TemplatePreview from "@/components/TemplatePreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Trash2, Download, Printer, FileDown, Bold, Italic, Underline, List, ListOrdered, Undo2, Redo2, Sparkles } from "lucide-react";
import { toast } from "sonner";

function uid() { return Math.random().toString(36).slice(2, 9); }

export default function Builder() {
  const { data, setData, update, score } = useResumeStore();
  const template = useMemo(() => RESUME_TEMPLATES.find((t) => t.id === data.templateId) || RESUME_TEMPLATES[0], [data.templateId]);
  const [skillInput, setSkillInput] = useState("");

  const exportPDF = () => { window.print(); };
  const exportDOCX = () => {
    const html = `<!DOCTYPE html><html><head><meta charset='utf-8'><title>${data.fullName}</title></head><body>
      <h1>${data.fullName}</h1><h3>${data.title}</h3>
      <p>${data.email} · ${data.phone} · ${data.address}</p>
      <h2>Summary</h2><p>${data.summary}</p>
      <h2>Experience</h2>${data.experience.map(e=>`<p><b>${e.role}</b> — ${e.company} (${e.period})<br/>${e.description}</p>`).join("")}
      <h2>Education</h2>${data.education.map(e=>`<p><b>${e.degree}</b> — ${e.school} (${e.period})</p>`).join("")}
      <h2>Skills</h2><p>${data.skills.join(", ")}</p>
    </body></html>`;
    const blob = new Blob(["\ufeff", html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `${data.fullName.replace(/\s+/g, "_")}.doc`; a.click();
    URL.revokeObjectURL(url);
    toast.success("DOCX exported");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-0 min-h-[calc(100vh-3.5rem)]">
      {/* Editor */}
      <div className="border-r border-border/60 p-5 md:p-6 overflow-y-auto scrollbar-thin max-h-[calc(100vh-3.5rem)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="display text-2xl font-bold">Resume Builder</h1>
            <div className="text-xs text-muted-foreground mt-1">Autosaved · Template: {template.name}</div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={exportDOCX}><FileDown className="h-4 w-4 mr-1" /> DOCX</Button>
            <Button variant="outline" onClick={() => window.print()}><Printer className="h-4 w-4 mr-1" /> Print</Button>
            <Button onClick={exportPDF} className="bg-gradient-aurora border-0 shadow-neon"><Download className="h-4 w-4 mr-1" /> PDF</Button>
          </div>
        </div>

        <div className="glass rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium">Resume score</div>
            <div className="mono text-sm text-neon-cyan">{score}/100</div>
          </div>
          <Progress value={score} className="h-2" />
          <div className="text-xs text-muted-foreground mt-2">
            {score < 70 ? "Add more experience, skills, or projects to strengthen your resume." : "Looking great — fine-tune your summary for the next role."}
          </div>
        </div>

        {/* Toolbar (visual) */}
        <div className="glass rounded-xl p-2 mb-4 flex flex-wrap items-center gap-1 text-muted-foreground">
          {[Undo2, Redo2, Bold, Italic, Underline, List, ListOrdered].map((I, i) => (
            <Button key={i} variant="ghost" size="icon" className="h-8 w-8"><I className="h-4 w-4" /></Button>
          ))}
          <div className="h-5 w-px bg-border mx-1" />
          <Button variant="ghost" size="sm" className="text-neon-cyan"><Sparkles className="h-4 w-4 mr-1" /> AI rewrite</Button>
        </div>

        <Tabs defaultValue="basics">
          <TabsList className="glass">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="extras">Extras</TabsTrigger>
          </TabsList>

          <TabsContent value="basics" className="space-y-3 mt-4">
            <Field label="Full name" value={data.fullName} onChange={(v) => update("fullName", v)} />
            <Field label="Title" value={data.title} onChange={(v) => update("title", v)} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Email" value={data.email} onChange={(v) => update("email", v)} />
              <Field label="Phone" value={data.phone} onChange={(v) => update("phone", v)} />
              <Field label="Address" value={data.address} onChange={(v) => update("address", v)} />
              <Field label="Website" value={data.website} onChange={(v) => update("website", v)} />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Summary</Label>
              <Textarea rows={5} value={data.summary} onChange={(e) => update("summary", e.target.value)} />
            </div>
          </TabsContent>

          <TabsContent value="experience" className="space-y-3 mt-4">
            {data.experience.map((e, i) => (
              <div key={e.id} className="glass rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">Position #{i + 1}</div>
                  <Button size="icon" variant="ghost" onClick={() => update("experience", data.experience.filter((x) => x.id !== e.id))}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Role" value={e.role} onChange={(ev) => update("experience", data.experience.map((x) => x.id === e.id ? { ...x, role: ev.target.value } : x))} />
                  <Input placeholder="Company" value={e.company} onChange={(ev) => update("experience", data.experience.map((x) => x.id === e.id ? { ...x, company: ev.target.value } : x))} />
                  <Input placeholder="Period" value={e.period} onChange={(ev) => update("experience", data.experience.map((x) => x.id === e.id ? { ...x, period: ev.target.value } : x))} />
                </div>
                <Textarea placeholder="Description" value={e.description} onChange={(ev) => update("experience", data.experience.map((x) => x.id === e.id ? { ...x, description: ev.target.value } : x))} />
              </div>
            ))}
            <Button variant="outline" className="glass w-full" onClick={() => update("experience", [...data.experience, { id: uid(), role: "", company: "", period: "", description: "" }])}><Plus className="h-4 w-4 mr-1" /> Add experience</Button>
          </TabsContent>

          <TabsContent value="education" className="space-y-3 mt-4">
            {data.education.map((e, i) => (
              <div key={e.id} className="glass rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">Education #{i + 1}</div>
                  <Button size="icon" variant="ghost" onClick={() => update("education", data.education.filter((x) => x.id !== e.id))}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
                <Input placeholder="Degree" value={e.degree} onChange={(ev) => update("education", data.education.map((x) => x.id === e.id ? { ...x, degree: ev.target.value } : x))} />
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="School" value={e.school} onChange={(ev) => update("education", data.education.map((x) => x.id === e.id ? { ...x, school: ev.target.value } : x))} />
                  <Input placeholder="Period" value={e.period} onChange={(ev) => update("education", data.education.map((x) => x.id === e.id ? { ...x, period: ev.target.value } : x))} />
                </div>
              </div>
            ))}
            <Button variant="outline" className="glass w-full" onClick={() => update("education", [...data.education, { id: uid(), degree: "", school: "", period: "", description: "" }])}><Plus className="h-4 w-4 mr-1" /> Add education</Button>
          </TabsContent>

          <TabsContent value="skills" className="space-y-3 mt-4">
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s) => (
                <button key={s} onClick={() => update("skills", data.skills.filter((x) => x !== s))}
                  className="text-xs px-3 py-1 rounded-full glass hover:bg-destructive/20">{s} ×</button>
              ))}
            </div>
            <div className="flex gap-2">
              <Input placeholder="Add a skill and press Enter" value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && skillInput.trim()) { update("skills", [...data.skills, skillInput.trim()]); setSkillInput(""); } }} />
              <Button onClick={() => { if (skillInput.trim()) { update("skills", [...data.skills, skillInput.trim()]); setSkillInput(""); } }}>Add</Button>
            </div>
            <div className="text-xs text-muted-foreground">Languages</div>
            {data.languages.map((l, i) => (
              <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2">
                <Input value={l.name} onChange={(e) => update("languages", data.languages.map((x, idx) => idx === i ? { ...x, name: e.target.value } : x))} />
                <Input value={l.level} onChange={(e) => update("languages", data.languages.map((x, idx) => idx === i ? { ...x, level: e.target.value } : x))} />
                <Button size="icon" variant="ghost" onClick={() => update("languages", data.languages.filter((_, idx) => idx !== i))}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            ))}
            <Button variant="outline" className="glass w-full" onClick={() => update("languages", [...data.languages, { name: "", level: "" }])}><Plus className="h-4 w-4 mr-1" /> Add language</Button>
          </TabsContent>

          <TabsContent value="extras" className="space-y-3 mt-4">
            <div className="text-xs text-muted-foreground">Projects</div>
            {data.projects.map((p) => (
              <div key={p.id} className="glass rounded-xl p-3 space-y-2">
                <Input placeholder="Name" value={p.name} onChange={(e) => update("projects", data.projects.map((x) => x.id === p.id ? { ...x, name: e.target.value } : x))} />
                <Input placeholder="Link" value={p.link} onChange={(e) => update("projects", data.projects.map((x) => x.id === p.id ? { ...x, link: e.target.value } : x))} />
                <Textarea placeholder="Description" value={p.description} onChange={(e) => update("projects", data.projects.map((x) => x.id === p.id ? { ...x, description: e.target.value } : x))} />
                <Button size="sm" variant="ghost" onClick={() => update("projects", data.projects.filter((x) => x.id !== p.id))}><Trash2 className="h-4 w-4 mr-1 text-destructive" /> Remove</Button>
              </div>
            ))}
            <Button variant="outline" className="glass w-full" onClick={() => update("projects", [...data.projects, { id: uid(), name: "", link: "", description: "" }])}><Plus className="h-4 w-4 mr-1" /> Add project</Button>

            <div className="text-xs text-muted-foreground mt-4">Certifications</div>
            {data.certifications.map((c) => (
              <div key={c.id} className="grid grid-cols-[1fr_1fr_100px_auto] gap-2">
                <Input value={c.name} onChange={(e) => update("certifications", data.certifications.map((x) => x.id === c.id ? { ...x, name: e.target.value } : x))} />
                <Input value={c.issuer} onChange={(e) => update("certifications", data.certifications.map((x) => x.id === c.id ? { ...x, issuer: e.target.value } : x))} />
                <Input value={c.year} onChange={(e) => update("certifications", data.certifications.map((x) => x.id === c.id ? { ...x, year: e.target.value } : x))} />
                <Button size="icon" variant="ghost" onClick={() => update("certifications", data.certifications.filter((x) => x.id !== c.id))}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            ))}
            <Button variant="outline" className="glass w-full" onClick={() => update("certifications", [...data.certifications, { id: uid(), name: "", issuer: "", year: "" }])}><Plus className="h-4 w-4 mr-1" /> Add certification</Button>

            <div className="text-xs text-muted-foreground mt-4">Achievements</div>
            {data.achievements.map((a, i) => (
              <div key={i} className="flex gap-2">
                <Input value={a} onChange={(e) => update("achievements", data.achievements.map((x, idx) => idx === i ? e.target.value : x))} />
                <Button size="icon" variant="ghost" onClick={() => update("achievements", data.achievements.filter((_, idx) => idx !== i))}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            ))}
            <Button variant="outline" className="glass w-full" onClick={() => update("achievements", [...data.achievements, ""])}><Plus className="h-4 w-4 mr-1" /> Add achievement</Button>
          </TabsContent>
        </Tabs>
      </div>

      {/* Preview */}
      <div className="p-5 md:p-8 bg-background/40 overflow-y-auto max-h-[calc(100vh-3.5rem)] scrollbar-thin">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground">Live preview</div>
            <div className="display text-lg font-semibold">{template.name}</div>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto max-w-md">
            {RESUME_TEMPLATES.slice(0, 6).map((t) => (
              <button key={t.id} onClick={() => update("templateId", t.id)}
                className={`shrink-0 h-10 px-3 rounded-full text-xs transition-all glass ${t.id === template.id ? "ring-2 ring-primary shadow-neon" : "opacity-70 hover:opacity-100"}`}>
                {t.name}
              </button>
            ))}
          </div>
        </div>
        <div className="max-w-[680px] mx-auto print:max-w-none">
          <TemplatePreview template={template} data={data} />
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
