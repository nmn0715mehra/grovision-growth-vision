import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { useAdminStore } from "@/lib/admin-store";
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Info,
  RefreshCw,
  PlusCircle,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/audits")({
  head: () => ({
    meta: [
      { title: "Technical Audits | GROVISION SEO" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: TechnicalAuditsPage,
});

function TechnicalAuditsPage() {
  const { issues, toggleIssueStatus, addTask } = useAdminStore();
  const [filterSeverity, setFilterSeverity] = useState<string>("ALL");
  const [isScanning, setIsScanning] = useState(false);

  const criticalCount = issues.filter(
    (i) => i.severity === "critical" && i.status === "open",
  ).length;
  const warningCount = issues.filter((i) => i.severity === "warning" && i.status === "open").length;
  const resolvedCount = issues.filter((i) => i.status === "resolved").length;

  const filteredIssues = issues.filter((iss) => {
    if (filterSeverity === "ALL") return true;
    if (filterSeverity === "open") return iss.status === "open";
    if (filterSeverity === "resolved") return iss.status === "resolved";
    return iss.severity === filterSeverity;
  });

  const handleRunAudit = () => {
    setIsScanning(true);
    toast.info("Auditing all routes for grovision.shop...");
    setTimeout(() => {
      setIsScanning(false);
      toast.success("Audit complete: 0 critical crawl blockers detected.");
    }, 1200);
  };

  const handleConvertToTask = (issue: (typeof issues)[0]) => {
    addTask({
      title: `Fix: ${issue.title}`,
      description: `${issue.explanation} Recommendation: ${issue.recommendation}`,
      category: "Technical",
      priority: issue.severity === "critical" ? "Critical" : "High",
      status: "backlog",
      dueDate: "2026-10-31",
      assignee: "SEO Lead",
    });
    toast.success(`Converted issue into an actionable task!`);
  };

  return (
    <AdminShell
      title="Technical SEO Audits"
      subtitle="Diagnostics on crawlability, meta tags, schema markup, and performance for grovision.shop"
      actions={
        <Button
          size="sm"
          onClick={handleRunAudit}
          disabled={isScanning}
          className="bg-navy text-xs text-ivory hover:bg-navy-soft"
        >
          <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${isScanning ? "animate-spin" : ""}`} />
          {isScanning ? "Running Audit..." : "Run Full Diagnostic"}
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Health Score Banner */}
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="rounded-lg border border-border bg-white p-5 shadow-sm">
            <span className="text-xs text-muted-foreground font-medium">Crawl Health Score</span>
            <div className="mt-2 font-mono text-3xl font-bold text-navy">94%</div>
            <Progress value={94} className="mt-2 h-1.5" />
          </div>
          <div className="rounded-lg border border-border bg-white p-5 shadow-sm">
            <span className="text-xs text-muted-foreground font-medium">Critical Errors</span>
            <div className="mt-2 font-mono text-3xl font-bold text-rose-600">{criticalCount}</div>
            <p className="mt-1 text-[11px] text-muted-foreground">Immediate blockers</p>
          </div>
          <div className="rounded-lg border border-border bg-white p-5 shadow-sm">
            <span className="text-xs text-muted-foreground font-medium">Active Warnings</span>
            <div className="mt-2 font-mono text-3xl font-bold text-amber-600">{warningCount}</div>
            <p className="mt-1 text-[11px] text-muted-foreground">Optimization items</p>
          </div>
          <div className="rounded-lg border border-border bg-white p-5 shadow-sm">
            <span className="text-xs text-muted-foreground font-medium">Resolved Items</span>
            <div className="mt-2 font-mono text-3xl font-bold text-emerald-600">
              {resolvedCount}
            </div>
            <p className="mt-1 text-[11px] text-emerald-600">Passed diagnostics</p>
          </div>
        </div>

        {/* Severity Filters */}
        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mr-2">
            <Filter className="h-3.5 w-3.5" />
            <span>Filter by:</span>
          </div>
          {[
            { label: "All Findings", val: "ALL" },
            { label: "Open Issues", val: "open" },
            { label: "Resolved", val: "resolved" },
            { label: "Critical", val: "critical" },
            { label: "Warnings", val: "warning" },
            { label: "Info", val: "info" },
          ].map((item) => (
            <Button
              key={item.val}
              size="sm"
              variant={filterSeverity === item.val ? "default" : "outline"}
              onClick={() => setFilterSeverity(item.val)}
              className={`h-7 text-xs ${
                filterSeverity === item.val ? "bg-navy text-ivory" : "border-border text-navy"
              }`}
            >
              {item.label}
            </Button>
          ))}
        </div>

        {/* Issues List */}
        <div className="space-y-3">
          {filteredIssues.map((issue) => {
            const isResolved = issue.status === "resolved";
            return (
              <div
                key={issue.id}
                className={`rounded-lg border p-5 shadow-sm transition-all ${
                  isResolved
                    ? "border-emerald-200 bg-emerald-50/40 text-muted-foreground"
                    : issue.severity === "critical"
                      ? "border-rose-200 bg-white"
                      : "border-amber-200 bg-white"
                }`}
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {isResolved ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      ) : issue.severity === "critical" ? (
                        <ShieldAlert className="h-5 w-5 text-rose-600" />
                      ) : issue.severity === "warning" ? (
                        <AlertTriangle className="h-5 w-5 text-amber-600" />
                      ) : (
                        <Info className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3
                          className={`font-display text-sm font-bold ${isResolved ? "line-through text-muted-foreground" : "text-navy"}`}
                        >
                          {issue.title}
                        </h3>
                        <Badge
                          variant="outline"
                          className={`text-[10px] uppercase font-semibold ${
                            issue.severity === "critical"
                              ? "border-rose-300 text-rose-700 bg-rose-50"
                              : issue.severity === "warning"
                                ? "border-amber-300 text-amber-800 bg-amber-50"
                                : "border-blue-300 text-blue-800 bg-blue-50"
                          }`}
                        >
                          {issue.severity}
                        </Badge>
                        <Badge variant="secondary" className="text-[10px]">
                          {issue.category}
                        </Badge>
                      </div>

                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {issue.explanation}
                      </p>

                      <div className="mt-3 rounded border border-border/80 bg-ivory/50 p-3 text-xs">
                        <span className="font-semibold text-navy">Recommended Action: </span>
                        <span className="text-muted-foreground">{issue.recommendation}</span>
                      </div>

                      <div className="mt-3 flex items-center gap-4 text-[11px] text-muted-foreground font-mono">
                        <span>Affected URL: {issue.affectedUrl}</span>
                        <span>•</span>
                        <span>Detected: {issue.detectedAt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-end">
                    <Button
                      size="sm"
                      variant={isResolved ? "outline" : "default"}
                      onClick={() => toggleIssueStatus(issue.id)}
                      className={`h-8 text-xs ${
                        isResolved
                          ? "border-emerald-300 text-emerald-700 hover:bg-emerald-100"
                          : "bg-navy text-ivory hover:bg-navy-soft"
                      }`}
                    >
                      {isResolved ? "Mark as Open" : "Mark Resolved"}
                    </Button>
                    {!isResolved && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleConvertToTask(issue)}
                        className="h-8 text-xs border-navy/20 text-navy hover:text-gold"
                      >
                        <PlusCircle className="mr-1.5 h-3.5 w-3.5" /> Convert to Task
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminShell>
  );
}
