import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { useAdminStore, type ContentOpportunity } from "@/lib/admin-store";
import { Sparkles, Plus, BookOpen, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/content")({
  head: () => ({
    meta: [
      { title: "Content Opportunities | GROVISION SEO" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ContentOpportunitiesPage,
});

function ContentOpportunitiesPage() {
  const { opportunities, addOpportunity, addTask } = useAdminStore();
  const [modalOpen, setModalOpen] = useState(false);

  // New opportunity form state
  const [topic, setTopic] = useState("");
  const [targetKeyword, setTargetKeyword] = useState("");
  const [estimatedVolume, setEstimatedVolume] = useState("1500");
  const [difficulty, setDifficulty] = useState("40");
  const [format, setFormat] = useState<ContentOpportunity["format"]>("Guide");
  const [priority, setPriority] = useState<ContentOpportunity["priority"]>("High");
  const [rationale, setRationale] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    addOpportunity({
      topic: topic.trim(),
      targetKeyword: targetKeyword.trim() || topic.toLowerCase(),
      estimatedVolume: parseInt(estimatedVolume) || 1000,
      difficulty: parseInt(difficulty) || 35,
      format,
      priority,
      status: "Identified",
      rationale: rationale || "High intent opportunity for GROVISION audience expansion.",
    });

    toast.success(`Content opportunity "${topic}" added!`);
    setTopic("");
    setTargetKeyword("");
    setRationale("");
    setModalOpen(false);
  };

  const handleCreateTask = (opp: ContentOpportunity) => {
    addTask({
      title: `Draft: ${opp.topic}`,
      description: `Format: ${opp.format}. Target keyword: "${opp.targetKeyword}". Rationale: ${opp.rationale}`,
      category: "Content",
      priority: opp.priority === "High" ? "High" : "Medium",
      status: "backlog",
      dueDate: "2026-11-10",
      assignee: "Content Strategist",
    });
    toast.success(`Created writing task for "${opp.topic}"!`);
  };

  return (
    <AdminShell
      title="Content & Keyword Gaps"
      subtitle="High-intent topic opportunities and unserved search queries for grovision.shop"
      actions={
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-navy text-xs text-ivory hover:bg-navy-soft">
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              New Content Opportunity
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-white border border-border">
            <DialogHeader>
              <DialogTitle className="font-display text-lg text-navy">
                Add Content Opportunity
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4 pt-2">
              <div>
                <Label className="text-xs font-semibold text-navy">Working Topic Title</Label>
                <Input
                  placeholder="e.g. Omnichannel Attribution Modeling for D2C"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold text-navy">Primary Target Keyword</Label>
                <Input
                  placeholder="e.g. omnichannel marketing attribution guide"
                  value={targetKeyword}
                  onChange={(e) => setTargetKeyword(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-semibold text-navy">Search Volume / Mo</Label>
                  <Input
                    type="number"
                    value={estimatedVolume}
                    onChange={(e) => setEstimatedVolume(e.target.value)}
                    className="mt-1 text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-navy">Format</Label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value as ContentOpportunity["format"])}
                    className="mt-1 w-full rounded border border-border bg-white p-2 text-xs text-navy"
                  >
                    <option value="Guide">In-Depth Guide</option>
                    <option value="Case Study">Client Case Study</option>
                    <option value="Landing Page">Service Landing Page</option>
                    <option value="Service Page">Service Deep-Dive</option>
                  </select>
                </div>
              </div>

              <div>
                <Label className="text-xs font-semibold text-navy">Strategic Rationale</Label>
                <Input
                  placeholder="Why should GROVISION publish this?"
                  value={rationale}
                  onChange={(e) => setRationale(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setModalOpen(false)}
                  className="text-xs text-navy"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-navy text-xs text-ivory hover:bg-navy-soft">
                  Save Opportunity
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((opp) => (
            <div
              key={opp.id}
              className="flex flex-col justify-between rounded-lg border border-border bg-white p-5 shadow-sm transition-all hover:border-gold/60"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="outline" className="border-gold text-navy text-[10px]">
                    {opp.format}
                  </Badge>
                  <Badge
                    className={`text-[10px] ${
                      opp.status === "Published"
                        ? "bg-emerald-100 text-emerald-800"
                        : opp.status === "In Progress"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-slate-100 text-slate-800"
                    }`}
                  >
                    {opp.status}
                  </Badge>
                </div>

                <h3 className="mt-3 font-display text-base font-bold text-navy leading-snug">
                  {opp.topic}
                </h3>

                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {opp.rationale}
                </p>

                <div className="mt-4 rounded border border-border bg-ivory/50 p-2.5 text-xs">
                  <span className="block text-[10px] uppercase font-semibold text-muted-foreground">
                    Target Query
                  </span>
                  <span className="font-mono text-navy font-medium">{opp.targetKeyword}</span>
                </div>
              </div>

              <div className="mt-5 border-t border-border pt-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span>
                    Est. Volume: <strong className="text-navy">{opp.estimatedVolume}/mo</strong>
                  </span>
                  <span>
                    Difficulty: <strong className="text-navy">{opp.difficulty}/100</strong>
                  </span>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCreateTask(opp)}
                  className="w-full border-navy/20 text-xs text-navy hover:border-gold hover:text-gold"
                >
                  <Sparkles className="mr-1.5 h-3.5 w-3.5 text-gold" />
                  Generate Action Task
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
