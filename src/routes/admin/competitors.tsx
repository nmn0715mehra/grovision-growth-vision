import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { useAdminStore } from "@/lib/admin-store";
import { Users, Plus, ExternalLink, ArrowRight, TrendingUp } from "lucide-react";
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

export const Route = createFileRoute("/admin/competitors")({
  head: () => ({
    meta: [
      { title: "Competitor Intelligence | GROVISION SEO" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CompetitorsPage,
});

function CompetitorsPage() {
  const { competitors, addCompetitor } = useAdminStore();
  const [modalOpen, setModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [estMonthlyTraffic, setEstMonthlyTraffic] = useState("10000");
  const [commonKeywords, setCommonKeywords] = useState("25");
  const [organicKeywords, setOrganicKeywords] = useState("300");
  const [domainRating, setDomainRating] = useState("50");
  const [strengths, setStrengths] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) return;

    addCompetitor({
      name: name.trim() || domain.split(".")[0] || "Competitor Agency",
      domain: domain
        .trim()
        .toLowerCase()
        .replace(/^https?:\/\//, ""),
      estMonthlyTraffic: parseInt(estMonthlyTraffic) || 5000,
      commonKeywords: parseInt(commonKeywords) || 15,
      organicKeywords: parseInt(organicKeywords) || 200,
      domainRating: parseInt(domainRating) || 45,
      strengths: strengths.trim() || "Competitor brand in digital marketing space.",
    });

    toast.success(`Competitor ${domain} added to benchmark list!`);
    setName("");
    setDomain("");
    setStrengths("");
    setModalOpen(false);
  };

  return (
    <AdminShell
      title="Competitor Benchmarking"
      subtitle="Competitive landscape, traffic comparisons, and keyword gap analysis against grovision.shop"
      actions={
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-navy text-xs text-ivory hover:bg-navy-soft">
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Add Competitor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-white border border-border">
            <DialogHeader>
              <DialogTitle className="font-display text-lg text-navy">
                Track Agency Competitor
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4 pt-2">
              <div>
                <Label className="text-xs font-semibold text-navy">Agency Name</Label>
                <Input
                  placeholder="e.g. Apex Growth Studio"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold text-navy">Website Domain</Label>
                <Input
                  placeholder="e.g. apexgrowth.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  required
                  className="mt-1 font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-semibold text-navy">
                    Est. Monthly Organic Traffic
                  </Label>
                  <Input
                    type="number"
                    value={estMonthlyTraffic}
                    onChange={(e) => setEstMonthlyTraffic(e.target.value)}
                    className="mt-1 text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-navy">Common Keywords</Label>
                  <Input
                    type="number"
                    value={commonKeywords}
                    onChange={(e) => setCommonKeywords(e.target.value)}
                    className="mt-1 text-xs"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-semibold text-navy">
                  Observed Strengths / Positioning
                </Label>
                <Input
                  placeholder="e.g. Deep portfolio of luxury retail client logos"
                  value={strengths}
                  onChange={(e) => setStrengths(e.target.value)}
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
                  Add to Benchmarks
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="space-y-6">
        {/* Competitor Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          {competitors.map((comp) => (
            <div
              key={comp.id}
              className="rounded-lg border border-border bg-white p-5 shadow-sm transition-all hover:border-gold/60"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-navy">{comp.name}</h3>
                  <a
                    href={`https://${comp.domain}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-gold hover:underline"
                  >
                    {comp.domain} <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <Badge variant="outline" className="border-navy/20 font-mono text-xs text-navy">
                  DR {comp.domainRating}
                </Badge>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 rounded border border-border bg-ivory/40 p-3 text-center">
                <div>
                  <span className="block text-[10px] uppercase font-semibold text-muted-foreground">
                    Monthly Traffic
                  </span>
                  <span className="font-mono text-sm font-bold text-navy">
                    {comp.estMonthlyTraffic.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-semibold text-muted-foreground">
                    Common Keywords
                  </span>
                  <span className="font-mono text-sm font-bold text-emerald-600">
                    {comp.commonKeywords} terms
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <span className="block text-[11px] font-semibold text-navy">
                  Observed Playbook:
                </span>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {comp.strengths}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Strategic Gap Insights Box */}
        <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
          <h3 className="font-display text-base font-bold text-navy">
            GROVISION Competitive Advantage
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Key areas where grovision.shop outperforms or holds high-intent authority:
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded border border-emerald-200 bg-emerald-50/50 p-3.5 text-xs">
              <span className="font-semibold text-emerald-900 block">
                Single Streamlined Conversion Journey
              </span>
              <p className="mt-1 text-emerald-800 leading-relaxed text-[11px]">
                GROVISION's `#lets-grow-together` single inquiry form right beneath the hero
                eliminates multi-step drop-offs common in competitor multi-page onboarding funnels.
              </p>
            </div>
            <div className="rounded border border-amber-200 bg-amber-50/50 p-3.5 text-xs">
              <span className="font-semibold text-amber-900 block">Editorial Brand Aesthetic</span>
              <p className="mt-1 text-amber-800 leading-relaxed text-[11px]">
                Warm beige, deep navy, and gold styling stands out against generic tech SaaS
                templates used by Avenue Digital and GrowthX.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
