import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { useAdminStore, type MonitoredPage } from "@/lib/admin-store";
import {
  FileText,
  Plus,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Eye,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/pages")({
  head: () => ({
    meta: [
      { title: "Monitored Pages | GROVISION SEO" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: PagesManagement,
});

function PagesManagement() {
  const { pages, addPage } = useAdminStore();
  const [selectedPage, setSelectedPage] = useState<MonitoredPage | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // New page form
  const [newUrl, setNewUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newKeyword, setNewKeyword] = useState("");

  const handleAddPage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    addPage({
      url: newUrl.startsWith("/") ? newUrl : `/${newUrl}`,
      title: newTitle.trim() || `GROVISION | ${newUrl}`,
      httpStatus: 200,
      indexStatus: "Indexed",
      canonicalUrl: `https://grovision.shop${newUrl.startsWith("/") ? newUrl : `/${newUrl}`}`,
      healthScore: 92,
      primaryKeyword: newKeyword || "digital marketing",
      wordCount: 800,
      metaDescription: "Configured page meta description for grovision.shop",
      h1: newTitle || "GROVISION",
    });

    toast.success(`Page "${newUrl}" is now being monitored!`);
    setNewUrl("");
    setNewTitle("");
    setNewKeyword("");
    setAddModalOpen(false);
  };

  return (
    <AdminShell
      title="Monitored Pages & URLs"
      subtitle="Indexation status, on-page health, and canonical integrity for grovision.shop"
      actions={
        <Button
          size="sm"
          onClick={() => setAddModalOpen(true)}
          className="bg-navy text-xs text-ivory hover:bg-navy-soft"
        >
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          Add Monitored Page
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Stat Overview */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-white p-5 shadow-sm">
            <span className="text-xs text-muted-foreground font-medium">Monitored Pages</span>
            <div className="mt-2 font-mono text-2xl font-bold text-navy">{pages.length}</div>
            <p className="mt-1 text-[11px] text-emerald-600 flex items-center gap-1 font-medium">
              <CheckCircle2 className="h-3.5 w-3.5" /> 100% 200 OK HTTP Status
            </p>
          </div>
          <div className="rounded-lg border border-border bg-white p-5 shadow-sm">
            <span className="text-xs text-muted-foreground font-medium">
              Indexed by Search Engines
            </span>
            <div className="mt-2 font-mono text-2xl font-bold text-navy">
              {pages.filter((p) => p.indexStatus === "Indexed").length}
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {pages.filter((p) => p.indexStatus === "Canonicalized").length} canonicalized route
            </p>
          </div>
          <div className="rounded-lg border border-border bg-white p-5 shadow-sm">
            <span className="text-xs text-muted-foreground font-medium">Average Page Health</span>
            <div className="mt-2 font-mono text-2xl font-bold text-navy">
              {(pages.reduce((acc, p) => acc + p.healthScore, 0) / (pages.length || 1)).toFixed(0)}%
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">Technical on-page score</p>
          </div>
        </div>

        {/* Pages Table */}
        <div className="rounded-lg border border-border bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-ivory/60 text-muted-foreground">
                <tr>
                  <th className="py-3 px-4 font-semibold">URL Path</th>
                  <th className="py-3 px-4 font-semibold">Title Tag</th>
                  <th className="py-3 px-4 font-semibold text-center">HTTP Status</th>
                  <th className="py-3 px-4 font-semibold">Index Status</th>
                  <th className="py-3 px-4 font-semibold">Primary Keyword</th>
                  <th className="py-3 px-4 font-semibold">Health</th>
                  <th className="py-3 px-4 font-semibold">Last Crawl</th>
                  <th className="py-3 px-4 font-semibold text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {pages.map((p) => (
                  <tr key={p.id} className="hover:bg-ivory/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-navy">
                      <div className="flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5 text-gold shrink-0" />
                        <span>{p.url}</span>
                      </div>
                    </td>
                    <td
                      className="py-3.5 px-4 max-w-xs truncate text-muted-foreground font-medium"
                      title={p.title}
                    >
                      {p.title}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <Badge className="bg-emerald-100 text-emerald-800 text-[10px] font-mono">
                        {p.httpStatus} OK
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant="outline"
                        className={
                          p.indexStatus === "Indexed"
                            ? "border-emerald-300 text-emerald-700 text-[10px]"
                            : "border-navy/20 text-navy text-[10px]"
                        }
                      >
                        {p.indexStatus}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-navy font-medium">{p.primaryKeyword}</td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-navy">
                      {p.healthScore}%
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground font-mono text-[11px]">
                      {p.lastCrawled}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedPage(p)}
                        className="h-7 px-2 text-xs text-navy hover:text-gold"
                      >
                        <Eye className="h-3.5 w-3.5 mr-1" /> Inspect
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Page Inspection Dialog */}
        {selectedPage && (
          <Dialog open={!!selectedPage} onOpenChange={(open) => !open && setSelectedPage(null)}>
            <DialogContent className="sm:max-w-xl bg-white border border-border">
              <DialogHeader>
                <DialogTitle className="font-display text-lg text-navy flex items-center justify-between pr-6">
                  <span>Page Diagnostics: {selectedPage.url}</span>
                  <Badge variant="outline" className="border-gold text-navy text-xs">
                    {selectedPage.healthScore}% Health
                  </Badge>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 pt-2 text-xs">
                <div>
                  <Label className="text-[11px] font-semibold text-muted-foreground uppercase">
                    Page Title (H1 / Head)
                  </Label>
                  <div className="mt-1 rounded border border-border bg-ivory/50 p-2.5 font-medium text-navy">
                    {selectedPage.title}
                  </div>
                  <span className="mt-1 block text-[10px] text-muted-foreground">
                    Character Count: {selectedPage.title.length} / 60 optimal
                  </span>
                </div>

                <div>
                  <Label className="text-[11px] font-semibold text-muted-foreground uppercase">
                    Meta Description
                  </Label>
                  <div className="mt-1 rounded border border-border bg-ivory/50 p-2.5 text-muted-foreground leading-relaxed">
                    {selectedPage.metaDescription || "No meta description provided."}
                  </div>
                  <span className="mt-1 block text-[10px] text-muted-foreground">
                    Character Count: {selectedPage.metaDescription?.length || 0} / 155 optimal
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-[11px] font-semibold text-muted-foreground uppercase">
                      Canonical Target
                    </Label>
                    <div className="mt-1 font-mono text-[11px] text-navy break-all bg-ivory/30 p-2 rounded border border-border">
                      {selectedPage.canonicalUrl}
                    </div>
                  </div>
                  <div>
                    <Label className="text-[11px] font-semibold text-muted-foreground uppercase">
                      Heading 1 (H1)
                    </Label>
                    <div className="mt-1 text-xs text-navy font-semibold bg-ivory/30 p-2 rounded border border-border">
                      {selectedPage.h1}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-4">
                  <a
                    href={selectedPage.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:text-navy transition-colors"
                  >
                    Open Page in Browser <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <Button
                    size="sm"
                    onClick={() => {
                      toast.success(`Crawl diagnostic initiated for ${selectedPage.url}`);
                      setSelectedPage(null);
                    }}
                    className="bg-navy text-xs text-ivory hover:bg-navy-soft"
                  >
                    <RefreshCw className="h-3 w-3 mr-1.5" /> Re-audit Page
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Add Page Modal */}
        <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
          <DialogContent className="sm:max-w-md bg-white border border-border">
            <DialogHeader>
              <DialogTitle className="font-display text-lg text-navy">
                Monitor New Route Endpoint
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddPage} className="space-y-4 pt-2">
              <div>
                <Label htmlFor="page-url" className="text-xs font-semibold text-navy">
                  URL Path (relative to grovision.shop)
                </Label>
                <Input
                  id="page-url"
                  placeholder="/insights"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  required
                  className="mt-1 font-mono text-xs"
                />
              </div>
              <div>
                <Label htmlFor="page-title" className="text-xs font-semibold text-navy">
                  Expected Title Tag
                </Label>
                <Input
                  id="page-title"
                  placeholder="GROVISION | Insights & Strategy"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>
              <div>
                <Label htmlFor="page-kw" className="text-xs font-semibold text-navy">
                  Target Primary Keyword
                </Label>
                <Input
                  id="page-kw"
                  placeholder="digital marketing insights"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setAddModalOpen(false)}
                  className="text-xs text-navy"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-navy text-xs text-ivory hover:bg-navy-soft">
                  Add Page
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminShell>
  );
}
