import { Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useResumeStore } from "@/lib/resume-store";
import { toast } from "sonner";

export default function AIStudio() {
  const { data, update } = useResumeStore();
  const [job, setJob] = useState("");

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="display text-3xl md:text-4xl font-bold">AI Studio</h1>
        <p className="text-muted-foreground mt-1">Tailor your resume to any role in seconds.</p>
      </div>

      <div className="glass rounded-2xl p-5 space-y-3">
        <div className="text-sm font-medium">Paste a job description</div>
        <Textarea rows={8} value={job} onChange={(e) => setJob(e.target.value)} placeholder="Paste the JD here and we’ll tailor your summary, skills and bullet points…" />
        <div className="flex justify-end">
          <Button onClick={() => {
            if (!job) return toast.error("Paste a job description first");
            const keywords = job.toLowerCase().match(/\b(react|typescript|node|design|figma|product|ai|ml|data|growth|saas|mobile|cloud|aws|kubernetes|leadership)\b/g) || [];
            const newSkills = Array.from(new Set([...data.skills, ...keywords.map((k) => k.replace(/^\w/, (c) => c.toUpperCase()))])).slice(0, 14);
            update("skills", newSkills);
            const summary = `${data.title} aligned to: ${keywords.slice(0, 6).join(", ") || "the role"}. ${data.summary}`;
            update("summary", summary);
            toast.success("Resume tailored using AI heuristics");
          }} className="bg-gradient-aurora border-0 shadow-neon">
            <Wand2 className="h-4 w-4 mr-1" /> Tailor resume
          </Button>
        </div>
      </div>

      <div className="glass rounded-2xl p-5">
        <div className="flex items-center gap-2 text-sm font-medium"><Sparkles className="h-4 w-4 text-neon-cyan" /> Suggestions</div>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc pl-5">
          <li>Add 1-2 quantified bullets to your most recent role (e.g. “grew X by 40%”).</li>
          <li>Trim your summary to 3 sentences focused on outcomes.</li>
          <li>Add a Projects entry that mirrors the JD keywords.</li>
        </ul>
      </div>
    </div>
  );
}
