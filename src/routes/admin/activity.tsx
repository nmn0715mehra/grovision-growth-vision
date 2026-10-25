import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { useAdminStore } from "@/lib/admin-store";
import { History, User, Clock, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/activity")({
  head: () => ({
    meta: [
      { title: "Activity Audit Log | GROVISION SEO" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ActivityLogPage,
});

function ActivityLogPage() {
  const { activity } = useAdminStore();

  return (
    <AdminShell
      title="Activity & Audit Log"
      subtitle="Immutable event log of SEO adjustments, keyword changes, and administrative actions on grovision.shop"
    >
      <div className="space-y-6">
        <div className="rounded-lg border border-border bg-white shadow-sm overflow-hidden">
          <div className="border-b border-border bg-ivory/60 p-4">
            <h3 className="font-display text-sm font-bold text-navy flex items-center gap-2">
              <History className="h-4 w-4 text-gold" />
              Recent Workspace Events ({activity.length})
            </h3>
          </div>

          <div className="divide-y divide-border">
            {activity.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between p-4 hover:bg-ivory/20 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-navy/10 p-2 text-navy">
                    <ShieldCheck className="h-4 w-4 text-gold" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-navy">{item.action}</span>
                      <Badge variant="outline" className="text-[10px] border-navy/20 text-navy">
                        {item.user}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground shrink-0 ml-4">
                  <Clock className="h-3 w-3 text-gold/70" />
                  <span>{item.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
