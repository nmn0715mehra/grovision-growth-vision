import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { useAdminStore } from "@/lib/admin-store";
import {
  BarChart3,
  Download,
  Printer,
  Calendar,
  CheckCircle2,
  TrendingUp,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/reports")({
  head: () => ({
    meta: [
      { title: "SEO Reports | GROVISION SEO" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ReportsPage,
});

function ReportsPage() {
  const { settings, keywords, pages, issues, tasks } = useAdminStore();
  const [reportPeriod, setReportPeriod] = useState("October 2026");

  const top10Keywords = keywords.filter((k) => k.currentRank <= 10);
  const completedTasks = tasks.filter((t) => t.status === "done");
  const resolvedIssues = issues.filter((i) => i.status === "resolved");

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    toast.success("Executive SEO Summary generated for download.");
  };

  return (
    <AdminShell
      title="SEO Performance Reports"
      subtitle="Executive growth summaries and monthly movement reports for grovision.shop"
      actions={
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handlePrint}
            className="border-navy/20 text-xs text-navy hover:border-gold hover:text-gold"
          >
            <Printer className="mr-1.5 h-3.5 w-3.5" />
            Print Report
          </Button>
          <Button
            size="sm"
            onClick={handleExport}
            className="bg-navy text-xs text-ivory hover:bg-navy-soft"
          >
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Download Summary
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Period Selector */}
        <div className="flex items-center justify-between rounded-lg border border-border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold text-navy">
            <Calendar className="h-4 w-4 text-gold" />
            <span>Reporting Cycle:</span>
            <select
              value={reportPeriod}
              onChange={(e) => setReportPeriod(e.target.value)}
              className="rounded border border-border bg-white px-2.5 py-1 text-xs text-navy"
            >
              <option value="October 2026">October 2026 (Current)</option>
              <option value="September 2026">September 2026</option>
              <option value="Q3 2026">Q3 2026 Full Quarter</option>
            </select>
          </div>
          <span className="text-xs text-muted-foreground">
            Target Domain: <strong className="text-navy">{settings.domain}</strong>
          </span>
        </div>

        {/* Printable Executive Report Sheet */}
        <div className="rounded-lg border border-border bg-white p-8 shadow-sm print:border-none print:shadow-none">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-border pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold">
                Executive Briefing
              </span>
              <h2 className="mt-1 font-display text-2xl font-bold text-navy">
                GROVISION Organic Search Report
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Domain: <span className="font-mono text-navy font-semibold">{settings.domain}</span>{" "}
                • Period: {reportPeriod}
              </p>
            </div>
            <div className="text-right">
              <Badge className="bg-navy text-ivory text-xs px-3 py-1">
                Health Score: {settings.healthScore}/100
              </Badge>
              <span className="block mt-1 text-[11px] text-muted-foreground">
                Generated Oct 22, 2026
              </span>
            </div>
          </div>

          {/* Key Findings Summary */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded border border-border bg-ivory/40 p-4">
              <span className="text-xs font-semibold text-muted-foreground">
                First Page Rankings
              </span>
              <div className="mt-2 font-mono text-2xl font-bold text-navy">
                {top10Keywords.length} of {keywords.length}
              </div>
              <p className="mt-1 text-[11px] text-emerald-600 font-medium">
                {Math.round((top10Keywords.length / (keywords.length || 1)) * 100)}% Top 10
                penetration
              </p>
            </div>

            <div className="rounded border border-border bg-ivory/40 p-4">
              <span className="text-xs font-semibold text-muted-foreground">Technical Health</span>
              <div className="mt-2 font-mono text-2xl font-bold text-navy">
                {settings.healthScore}%
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {resolvedIssues.length} optimizations verified
              </p>
            </div>

            <div className="rounded border border-border bg-ivory/40 p-4">
              <span className="text-xs font-semibold text-muted-foreground">Tasks Executed</span>
              <div className="mt-2 font-mono text-2xl font-bold text-navy">
                {completedTasks.length}
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">Sprint deliverables resolved</p>
            </div>
          </div>

          {/* Keywords Breakdown */}
          <div className="mt-8">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-navy">
              1. Top Organic Keyword Standings
            </h3>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-left text-xs border border-border">
                <thead className="bg-ivory/60 text-navy border-b border-border font-semibold">
                  <tr>
                    <th className="p-2.5">Term</th>
                    <th className="p-2.5">Target URL</th>
                    <th className="p-2.5 text-center">Rank</th>
                    <th className="p-2.5">Monthly Volume</th>
                    <th className="p-2.5">Intent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {keywords.map((k) => (
                    <tr key={k.id}>
                      <td className="p-2.5 font-semibold text-navy">{k.term}</td>
                      <td className="p-2.5 font-mono text-muted-foreground">{k.targetUrl}</td>
                      <td className="p-2.5 text-center font-mono font-bold text-navy">
                        #{k.currentRank}
                      </td>
                      <td className="p-2.5 text-muted-foreground">
                        {k.searchVolume.toLocaleString()}
                      </td>
                      <td className="p-2.5 text-muted-foreground">{k.intent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Strategic Next Steps */}
          <div className="mt-8 border-t border-border pt-6">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-navy">
              2. Forward Growth Priorities for Next Cycle
            </h3>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <span>
                  Expand FAQ Schema across all strategic service offerings on{" "}
                  <code className="font-mono text-navy">/services</code>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <span>
                  Publish high-intent editorial playbook targeting{" "}
                  <code className="font-mono text-navy">"b2b saas demand generation playbook"</code>
                  .
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <span>
                  Connect Google Search Console credentials in Settings once production DNS
                  propagation is finalized.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
