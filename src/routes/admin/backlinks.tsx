import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { useAdminStore } from "@/lib/admin-store";
import { Link2, Plus, ExternalLink, ShieldCheck, Globe } from "lucide-react";
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

export const Route = createFileRoute("/admin/backlinks")({
  head: () => ({
    meta: [
      { title: "Backlinks & Authority | GROVISION SEO" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: BacklinksPage,
});

function BacklinksPage() {
  const { backlinks, addBacklink } = useAdminStore();
  const [modalOpen, setModalOpen] = useState(false);

  const [sourceDomain, setSourceDomain] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [targetUrl, setTargetUrl] = useState("https://grovision.shop/");
  const [anchorText, setAnchorText] = useState("");
  const [domainRating, setDomainRating] = useState("65");
  const [isDoFollow, setIsDoFollow] = useState(true);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceDomain.trim()) return;

    addBacklink({
      sourceDomain: sourceDomain.trim(),
      sourceUrl: sourceUrl.trim() || `https://${sourceDomain.trim()}`,
      targetUrl: targetUrl.trim(),
      anchorText: anchorText.trim() || "GROVISION",
      domainRating: parseInt(domainRating) || 50,
      isDoFollow,
      status: "active",
    });

    toast.success(`Tracked backlink from ${sourceDomain}!`);
    setSourceDomain("");
    setSourceUrl("");
    setAnchorText("");
    setModalOpen(false);
  };

  const avgDR = (
    backlinks.reduce((acc, b) => acc + b.domainRating, 0) / (backlinks.length || 1)
  ).toFixed(0);
  const doFollowCount = backlinks.filter((b) => b.isDoFollow).length;

  return (
    <AdminShell
      title="Backlink Profile"
      subtitle="Inbound referring domains, editorial citations, and link authority pointing to grovision.shop"
      actions={
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-navy text-xs text-ivory hover:bg-navy-soft">
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Add Inbound Link
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-white border border-border">
            <DialogHeader>
              <DialogTitle className="font-display text-lg text-navy">
                Track New Inbound Citation
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4 pt-2">
              <div>
                <Label className="text-xs font-semibold text-navy">Referring Source Domain</Label>
                <Input
                  placeholder="e.g. techcrunch.com"
                  value={sourceDomain}
                  onChange={(e) => setSourceDomain(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold text-navy">Full Linking URL</Label>
                <Input
                  placeholder="https://example.com/article"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  className="mt-1 text-xs font-mono"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold text-navy">
                  Target URL on grovision.shop
                </Label>
                <Input
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  className="mt-1 text-xs font-mono"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold text-navy">Anchor Text</Label>
                <Input
                  placeholder="e.g. GROVISION case studies"
                  value={anchorText}
                  onChange={(e) => setAnchorText(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-semibold text-navy">Domain Rating (DR)</Label>
                  <Input
                    type="number"
                    value={domainRating}
                    onChange={(e) => setDomainRating(e.target.value)}
                    className="mt-1 text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-navy">Link Attribute</Label>
                  <select
                    value={isDoFollow ? "dofollow" : "nofollow"}
                    onChange={(e) => setIsDoFollow(e.target.value === "dofollow")}
                    className="mt-1 w-full rounded border border-border bg-white p-2 text-xs text-navy"
                  >
                    <option value="dofollow">Dofollow (Passes Equity)</option>
                    <option value="nofollow">Nofollow / UGC</option>
                  </select>
                </div>
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
                  Save Link Record
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="space-y-6">
        {/* Metric Overview */}
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="rounded-lg border border-border bg-white p-5 shadow-sm">
            <span className="text-xs text-muted-foreground font-medium">Total Backlinks</span>
            <div className="mt-2 font-mono text-2xl font-bold text-navy">{backlinks.length}</div>
            <p className="mt-1 text-[11px] text-muted-foreground">Across verified publications</p>
          </div>
          <div className="rounded-lg border border-border bg-white p-5 shadow-sm">
            <span className="text-xs text-muted-foreground font-medium">Referring Domains</span>
            <div className="mt-2 font-mono text-2xl font-bold text-navy">
              {new Set(backlinks.map((b) => b.sourceDomain)).size}
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">Unique host roots</p>
          </div>
          <div className="rounded-lg border border-border bg-white p-5 shadow-sm">
            <span className="text-xs text-muted-foreground font-medium">Average Domain Rating</span>
            <div className="mt-2 font-mono text-2xl font-bold text-navy">DR {avgDR}</div>
            <p className="mt-1 text-[11px] text-emerald-600 font-medium">High quality authority</p>
          </div>
          <div className="rounded-lg border border-border bg-white p-5 shadow-sm">
            <span className="text-xs text-muted-foreground font-medium">Dofollow vs Nofollow</span>
            <div className="mt-2 font-mono text-2xl font-bold text-navy">
              {doFollowCount} / {backlinks.length}
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {Math.round((doFollowCount / (backlinks.length || 1)) * 100)}% equity passing
            </p>
          </div>
        </div>

        {/* Backlinks Table */}
        <div className="rounded-lg border border-border bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-ivory/60 text-muted-foreground">
                <tr>
                  <th className="py-3 px-4 font-semibold">Referring Domain</th>
                  <th className="py-3 px-4 font-semibold">Anchor Text</th>
                  <th className="py-3 px-4 font-semibold">Target URL on grovision.shop</th>
                  <th className="py-3 px-4 font-semibold text-center">DR</th>
                  <th className="py-3 px-4 font-semibold">Attribute</th>
                  <th className="py-3 px-4 font-semibold">First Detected</th>
                  <th className="py-3 px-4 font-semibold text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {backlinks.map((bl) => (
                  <tr key={bl.id} className="hover:bg-ivory/30 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-navy">
                      <div className="flex items-center gap-2">
                        <Globe className="h-3.5 w-3.5 text-gold shrink-0" />
                        <span>{bl.sourceDomain}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-navy italic">"{bl.anchorText}"</td>
                    <td className="py-3.5 px-4 font-mono text-muted-foreground">
                      {bl.targetUrl.replace("https://grovision.shop", "") || "/"}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-navy">
                      {bl.domainRating}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant="outline"
                        className={
                          bl.isDoFollow
                            ? "border-emerald-300 text-emerald-800 bg-emerald-50 text-[10px]"
                            : "border-slate-300 text-slate-700 bg-slate-50 text-[10px]"
                        }
                      >
                        {bl.isDoFollow ? "Dofollow" : "Nofollow"}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-muted-foreground text-[11px]">
                      {bl.firstSeen}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <a
                        href={bl.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-gold hover:text-navy"
                      >
                        Source <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
