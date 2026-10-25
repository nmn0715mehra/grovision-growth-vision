import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { useAdminStore } from "@/lib/admin-store";
import {
  TrendingUp,
  Search,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  ExternalLink,
  Plus,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "SEO Dashboard | GROVISION Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const { settings, keywords, pages, issues, tasks, updateTaskStatus } = useAdminStore();
  const [isScanning, setIsScanning] = useState(false);

  const top3Keywords = keywords.filter((k) => k.currentRank <= 3);
  const top10Keywords = keywords.filter((k) => k.currentRank <= 10);
  const openIssues = issues.filter((i) => i.status === "open");
  const pendingTasks = tasks.filter((t) => t.status !== "done");

  const avgRank = (
    keywords.reduce((acc, k) => acc + k.currentRank, 0) / (keywords.length || 1)
  ).toFixed(1);

  const handleScan = () => {
    setIsScanning(true);
    toast.info("Running technical diagnostic on grovision.shop...");
    setTimeout(() => {
      setIsScanning(false);
      toast.success("SEO Health Check Complete: 94/100 Health Score confirmed.");
    }, 1200);
  };

  return (
    <AdminShell
      title="SEO Overview"
      subtitle="Dedicated single-site performance & rank tracking for grovision.shop"
      actions={
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleScan}
            disabled={isScanning}
            className="border-navy/20 text-xs text-navy hover:border-gold hover:text-gold"
          >
            <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${isScanning ? "animate-spin" : ""}`} />
            {isScanning ? "Scanning Site..." : "Quick Site Audit"}
          </Button>
          <Link to="/admin/keywords">
            <Button size="sm" className="bg-navy text-xs text-ivory hover:bg-navy-soft">
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Add Keyword
            </Button>
          </Link>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Scope Announcement Banner */}
        <div className="flex flex-col justify-between gap-4 rounded-lg border border-gold/40 bg-navy p-5 text-ivory sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-gold">
                Dedicated Domain Scope: {settings.domain}
              </span>
            </div>
            <h2 className="mt-1 font-display text-lg font-bold">
              GROVISION Organic Growth Baseline
            </h2>
            <p className="mt-0.5 text-xs text-ivory/70">
              Active tracking of {keywords.length} core search terms across {pages.length} monitored
              pages.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded border border-ivory/15 bg-navy-soft px-3 py-1.5 text-center">
              <span className="block text-[10px] uppercase tracking-wider text-ivory/50">
                Health Score
              </span>
              <span className="font-mono text-lg font-bold text-gold">{settings.healthScore}%</span>
            </div>
            <a
              href={`https://${settings.domain}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded border border-gold/40 bg-gold/15 px-3 py-2 text-xs font-semibold text-gold transition-colors hover:bg-gold/25"
            >
              Live Target <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Avg Ranking */}
          <div className="rounded-lg border border-border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Average Position</span>
              <div className="rounded bg-emerald-50 p-2 text-emerald-700">
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-mono text-2xl font-bold text-navy">#{avgRank}</span>
              <span className="inline-flex items-center text-xs font-medium text-emerald-600">
                <ArrowUpRight className="h-3.5 w-3.5" /> +2.8 pos
              </span>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Across all tracked commercial keywords
            </p>
          </div>

          {/* Card 2: Top Rankings */}
          <div className="rounded-lg border border-border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Top 10 Rankings</span>
              <div className="rounded bg-amber-50 p-2 text-amber-700">
                <Search className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-mono text-2xl font-bold text-navy">
                {top10Keywords.length} / {keywords.length}
              </span>
              <Badge variant="outline" className="border-gold text-[10px] text-navy">
                {top3Keywords.length} in Top 3
              </Badge>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {Math.round((top10Keywords.length / keywords.length) * 100)}% first-page visibility
            </p>
          </div>

          {/* Card 3: Technical Health */}
          <div className="rounded-lg border border-border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Technical Health</span>
              <div className="rounded bg-blue-50 p-2 text-blue-700">
                <ShieldCheck className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-mono text-2xl font-bold text-navy">
                {settings.healthScore}%
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                {openIssues.length === 0 ? "0 Issues" : `${openIssues.length} Warning`}
              </span>
            </div>
            <Progress value={settings.healthScore} className="mt-2 h-1.5" />
          </div>

          {/* Card 4: Open Action Tasks */}
          <div className="rounded-lg border border-border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Actionable Tasks</span>
              <div className="rounded bg-purple-50 p-2 text-purple-700">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-mono text-2xl font-bold text-navy">{pendingTasks.length}</span>
              <span className="text-xs text-muted-foreground">tasks pending</span>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {tasks.filter((t) => t.status === "done").length} optimizations completed
            </p>
          </div>
        </div>

        {/* Two-Column Main Section */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column: Top Keywords (2 Cols) */}
          <div className="space-y-6 lg:col-span-2">
            {/* Keywords Table Preview */}
            <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-navy">
                    Priority Keyword Movement
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Live SERP positioning for core brand and service keywords
                  </p>
                </div>
                <Link
                  to="/admin/keywords"
                  className="text-xs font-medium text-gold transition-colors hover:text-navy"
                >
                  View All ({keywords.length}) &rarr;
                </Link>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-border bg-ivory/50 text-muted-foreground">
                    <tr>
                      <th className="py-2.5 px-3 font-semibold">Keyword</th>
                      <th className="py-2.5 px-3 font-semibold">Target URL</th>
                      <th className="py-2.5 px-3 font-semibold">Volume</th>
                      <th className="py-2.5 px-3 font-semibold text-center">Rank</th>
                      <th className="py-2.5 px-3 font-semibold text-center">Change</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {keywords.slice(0, 5).map((kw) => {
                      const rankChange = kw.previousRank - kw.currentRank;
                      return (
                        <tr key={kw.id} className="hover:bg-ivory/30 transition-colors">
                          <td className="py-3 px-3 font-medium text-navy">{kw.term}</td>
                          <td className="py-3 px-3 font-mono text-muted-foreground">
                            {kw.targetUrl}
                          </td>
                          <td className="py-3 px-3 text-muted-foreground">
                            {kw.searchVolume.toLocaleString()} / mo
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span
                              className={`inline-flex h-6 w-6 items-center justify-center rounded-full font-mono text-xs font-bold ${
                                kw.currentRank <= 3
                                  ? "bg-amber-100 text-amber-800"
                                  : kw.currentRank <= 10
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-slate-100 text-slate-700"
                              }`}
                            >
                              #{kw.currentRank}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center">
                            {rankChange > 0 ? (
                              <span className="inline-flex items-center text-xs font-medium text-emerald-600">
                                <ArrowUpRight className="h-3 w-3" /> +{rankChange}
                              </span>
                            ) : rankChange < 0 ? (
                              <span className="inline-flex items-center text-xs font-medium text-rose-500">
                                <ArrowDownRight className="h-3 w-3" /> {rankChange}
                              </span>
                            ) : (
                              <span className="text-xs text-muted-foreground">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Monitored Pages Health Snapshot */}
            <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-navy">
                    Monitored Page Endpoints
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Indexation status and health ratings for primary site routes
                  </p>
                </div>
                <Link
                  to="/admin/pages"
                  className="text-xs font-medium text-gold transition-colors hover:text-navy"
                >
                  Manage Pages &rarr;
                </Link>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {pages.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between rounded border border-border bg-ivory/30 p-3"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="font-mono text-xs font-semibold text-navy truncate">
                          {p.url}
                        </span>
                      </div>
                      <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">
                        {p.title}
                      </span>
                    </div>
                    <Badge variant="secondary" className="font-mono text-xs shrink-0">
                      {p.healthScore}%
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Audits & Quick Tasks */}
          <div className="space-y-6">
            {/* Urgent Audits Box */}
            <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-bold text-navy">Audit Findings</h3>
                <Link to="/admin/audits" className="text-xs font-medium text-gold hover:text-navy">
                  View Details &rarr;
                </Link>
              </div>

              <div className="mt-4 space-y-3">
                {issues.map((iss) => (
                  <div
                    key={iss.id}
                    className={`rounded border p-3.5 text-xs transition-colors ${
                      iss.status === "resolved"
                        ? "border-emerald-200 bg-emerald-50/50 text-muted-foreground"
                        : iss.severity === "critical"
                          ? "border-rose-200 bg-rose-50/50 text-navy"
                          : "border-amber-200 bg-amber-50/50 text-navy"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5 font-medium">
                        {iss.status === "resolved" ? (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
                        )}
                        <span className="font-semibold">{iss.title}</span>
                      </div>
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
                      {iss.explanation}
                    </p>
                    <div className="mt-2 flex items-center justify-between border-t border-border/40 pt-2 text-[10px]">
                      <span className="font-mono text-muted-foreground">{iss.affectedUrl}</span>
                      <Badge
                        variant="outline"
                        className={
                          iss.status === "resolved"
                            ? "border-emerald-300 text-emerald-700"
                            : "border-amber-400 text-amber-800"
                        }
                      >
                        {iss.status === "resolved" ? "Resolved" : "Open Action"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick SEO Tasks Board */}
            <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-bold text-navy">Active SEO Tasks</h3>
                <Link to="/admin/tasks" className="text-xs font-medium text-gold hover:text-navy">
                  Task Board &rarr;
                </Link>
              </div>

              <ul className="mt-4 space-y-2.5">
                {tasks.slice(0, 4).map((t) => (
                  <li
                    key={t.id}
                    className="flex items-start gap-2.5 rounded border border-border bg-ivory/20 p-2.5 text-xs"
                  >
                    <input
                      type="checkbox"
                      checked={t.status === "done"}
                      onChange={() =>
                        updateTaskStatus(t.id, t.status === "done" ? "in_progress" : "done")
                      }
                      className="mt-0.5 h-4 w-4 rounded border-border text-navy focus:ring-gold"
                    />
                    <div className="min-w-0 flex-1">
                      <span
                        className={`block font-medium ${
                          t.status === "done" ? "line-through text-muted-foreground" : "text-navy"
                        }`}
                      >
                        {t.title}
                      </span>
                      <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
                        <span className="font-semibold text-gold">{t.category}</span>
                        <span>•</span>
                        <span>Due {t.dueDate}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
