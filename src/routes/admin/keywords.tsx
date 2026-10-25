import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { useAdminStore, type Keyword } from "@/lib/admin-store";
import {
  Search,
  Plus,
  Download,
  Trash2,
  ArrowUpRight,
  ArrowDownRight,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/keywords")({
  head: () => ({
    meta: [
      { title: "Keywords Management | GROVISION SEO" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: KeywordsPage,
});

function KeywordsPage() {
  const { keywords, addKeyword, removeKeyword } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [intentFilter, setIntentFilter] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<"rank" | "volume" | "difficulty">("rank");
  const [modalOpen, setModalOpen] = useState(false);

  // New keyword form state
  const [term, setTerm] = useState("");
  const [targetUrl, setTargetUrl] = useState("/");
  const [searchVolume, setSearchVolume] = useState("1200");
  const [difficulty, setDifficulty] = useState("35");
  const [intent, setIntent] = useState<Keyword["intent"]>("Commercial");
  const [priority, setPriority] = useState<Keyword["priority"]>("High");

  // Filtering & Sorting
  const filteredKeywords = keywords
    .filter((kw) => {
      const matchesSearch =
        kw.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        kw.targetUrl.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesIntent = intentFilter === "ALL" || kw.intent === intentFilter;
      return matchesSearch && matchesIntent;
    })
    .sort((a, b) => {
      if (sortBy === "rank") return a.currentRank - b.currentRank;
      if (sortBy === "volume") return b.searchVolume - a.searchVolume;
      if (sortBy === "difficulty") return b.difficulty - a.difficulty;
      return 0;
    });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!term.trim()) return;

    addKeyword({
      term: term.trim(),
      targetUrl: targetUrl.trim() || "/",
      currentRank: 12,
      previousRank: 15,
      searchVolume: parseInt(searchVolume) || 500,
      difficulty: parseInt(difficulty) || 30,
      intent,
      priority,
    });

    toast.success(`Keyword "${term}" is now being tracked!`);
    setTerm("");
    setModalOpen(false);
  };

  const exportCSV = () => {
    const headers =
      "Term,Target URL,Current Rank,Previous Rank,Search Volume,Difficulty,Intent,Priority\n";
    const rows = keywords
      .map(
        (k) =>
          `"${k.term}","${k.targetUrl}",${k.currentRank},${k.previousRank},${k.searchVolume},${k.difficulty},"${k.intent}","${k.priority}"`,
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `grovision-keywords-${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Keywords exported to CSV successfully.");
  };

  return (
    <AdminShell
      title="Keyword Rankings"
      subtitle="SERP positioning, volume, and intent tracking scoped to grovision.shop"
      actions={
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={exportCSV}
            className="border-navy/20 text-xs text-navy hover:border-gold hover:text-gold"
          >
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Export CSV
          </Button>

          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-navy text-xs text-ivory hover:bg-navy-soft">
                <Plus className="mr-1.5 h-3.5 w-3.5" />
                Add Keyword
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white border border-border">
              <DialogHeader>
                <DialogTitle className="font-display text-lg text-navy">
                  Track New Keyword
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4 pt-2">
                <div>
                  <Label htmlFor="kw-term" className="text-xs font-semibold text-navy">
                    Keyword Search Phrase
                  </Label>
                  <Input
                    id="kw-term"
                    placeholder="e.g. b2b growth agency india"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="kw-url" className="text-xs font-semibold text-navy">
                      Target URL Path
                    </Label>
                    <Input
                      id="kw-url"
                      placeholder="e.g. /services"
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                      className="mt-1 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <Label htmlFor="kw-vol" className="text-xs font-semibold text-navy">
                      Search Volume / Mo
                    </Label>
                    <Input
                      id="kw-vol"
                      type="number"
                      placeholder="1200"
                      value={searchVolume}
                      onChange={(e) => setSearchVolume(e.target.value)}
                      className="mt-1 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label className="text-xs font-semibold text-navy">Intent</Label>
                    <select
                      value={intent}
                      onChange={(e) => setIntent(e.target.value as Keyword["intent"])}
                      className="mt-1 w-full rounded border border-border bg-white p-2 text-xs text-navy"
                    >
                      <option value="Commercial">Commercial</option>
                      <option value="Transactional">Transactional</option>
                      <option value="Informational">Informational</option>
                      <option value="Navigational">Navigational</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-navy">Difficulty (0-100)</Label>
                    <Input
                      type="number"
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="mt-1 text-xs"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-navy">Priority</Label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as Keyword["priority"])}
                      className="mt-1 w-full rounded border border-border bg-white p-2 text-xs text-navy"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
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
                    Start Tracking
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Filter and Search Bar */}
        <div className="flex flex-col gap-3 rounded-lg border border-border bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search keyword term or target URL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-xs"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Intent:</span>
            </div>
            {["ALL", "Commercial", "Transactional", "Informational"].map((type) => (
              <Button
                key={type}
                size="sm"
                variant={intentFilter === type ? "default" : "outline"}
                onClick={() => setIntentFilter(type)}
                className={`h-7 text-xs ${
                  intentFilter === type ? "bg-navy text-ivory" : "text-navy border-border"
                }`}
              >
                {type}
              </Button>
            ))}

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "rank" | "volume" | "difficulty")}
              className="h-7 rounded border border-border bg-white px-2 text-xs text-navy"
            >
              <option value="rank">Sort: Rank (Best)</option>
              <option value="volume">Sort: Search Volume</option>
              <option value="difficulty">Sort: Difficulty</option>
            </select>
          </div>
        </div>

        {/* Keywords Table */}
        <div className="rounded-lg border border-border bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-ivory/60 text-muted-foreground">
                <tr>
                  <th className="py-3 px-4 font-semibold">Keyword Phrase</th>
                  <th className="py-3 px-4 font-semibold">Target URL</th>
                  <th className="py-3 px-4 font-semibold text-center">SERP Rank</th>
                  <th className="py-3 px-4 font-semibold text-center">Movement</th>
                  <th className="py-3 px-4 font-semibold">Search Volume</th>
                  <th className="py-3 px-4 font-semibold">Difficulty</th>
                  <th className="py-3 px-4 font-semibold">Intent</th>
                  <th className="py-3 px-4 font-semibold">Priority</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredKeywords.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-10 text-center text-muted-foreground">
                      No keywords match your search or filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredKeywords.map((kw) => {
                    const movement = kw.previousRank - kw.currentRank;
                    return (
                      <tr key={kw.id} className="hover:bg-ivory/30 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-navy">{kw.term}</td>
                        <td className="py-3.5 px-4 font-mono text-muted-foreground">
                          {kw.targetUrl}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`inline-flex h-7 w-7 items-center justify-center rounded-full font-mono text-xs font-bold ${
                              kw.currentRank <= 3
                                ? "bg-amber-100 text-amber-900 border border-amber-300"
                                : kw.currentRank <= 10
                                  ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                                  : "bg-slate-100 text-slate-800"
                            }`}
                          >
                            #{kw.currentRank}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {movement > 0 ? (
                            <span className="inline-flex items-center text-xs font-semibold text-emerald-600">
                              <ArrowUpRight className="h-3.5 w-3.5" /> +{movement}
                            </span>
                          ) : movement < 0 ? (
                            <span className="inline-flex items-center text-xs font-semibold text-rose-500">
                              <ArrowDownRight className="h-3.5 w-3.5" /> {movement}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-muted-foreground">
                          {kw.searchVolume.toLocaleString()} / mo
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-14 rounded-full bg-slate-100 overflow-hidden">
                              <div
                                className={`h-full ${
                                  kw.difficulty > 50 ? "bg-amber-500" : "bg-emerald-500"
                                }`}
                                style={{ width: `${kw.difficulty}%` }}
                              />
                            </div>
                            <span className="font-mono text-[11px] text-muted-foreground">
                              {kw.difficulty}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <Badge variant="outline" className="border-navy/20 text-[10px] text-navy">
                            {kw.intent}
                          </Badge>
                        </td>
                        <td className="py-3.5 px-4">
                          <Badge
                            className={`text-[10px] ${
                              kw.priority === "High" ? "bg-navy text-ivory" : "bg-beige text-navy"
                            }`}
                          >
                            {kw.priority}
                          </Badge>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              removeKeyword(kw.id);
                              toast.info(`Removed "${kw.term}" from tracked keywords.`);
                            }}
                            className="text-muted-foreground hover:text-rose-600 transition-colors"
                            title="Remove keyword"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
