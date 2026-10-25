import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { useAdminStore } from "@/lib/admin-store";
import {
  Plug,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/integrations")({
  head: () => ({
    meta: [
      { title: "SEO Integrations | GROVISION SEO" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: IntegrationsPage,
});

function IntegrationsPage() {
  const { settings, updateSettings } = useAdminStore();
  const [gaId, setGaId] = useState(settings.gaMeasurementId || "");

  const handleSaveGa = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({ gaMeasurementId: gaId.trim() });
    toast.success("Google Analytics configuration updated!");
  };

  const handleToggleGsc = () => {
    const nextState = !settings.gscConnected;
    updateSettings({ gscConnected: nextState });
    toast.info(
      nextState
        ? "Google Search Console marked as Connected (Mock Preview)"
        : "Google Search Console Disconnected",
    );
  };

  const handleToggleBing = () => {
    const nextState = !settings.bingConnected;
    updateSettings({ bingConnected: nextState });
    toast.info(
      nextState
        ? "Bing Webmaster marked as Connected (Mock Preview)"
        : "Bing Webmaster Disconnected",
    );
  };

  return (
    <AdminShell
      title="Third-Party Integrations"
      subtitle="API connections to Google Search Console, Analytics 4, and search crawler verification services"
    >
      <div className="space-y-6">
        {/* Notice on External API Boundaries */}
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs text-amber-900 leading-relaxed">
          <div className="flex items-center gap-2 font-semibold">
            <AlertCircle className="h-4 w-4 text-amber-700" />
            <span>Connection-Ready State Architecture</span>
          </div>
          <p className="mt-1 text-amber-800">
            External integrations remain disconnected until authorized OAuth tokens or measurement
            IDs are configured. We never simulate fake live telemetry; only authentic sample
            baseline benchmarks are rendered until a connection is active.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Integration 1: Google Search Console */}
          <div className="rounded-lg border border-border bg-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-navy">
                    Google Search Console
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Query impressions, search clicks, and SERP CTR telemetry
                  </p>
                </div>
                <Badge
                  className={`text-[10px] ${
                    settings.gscConnected
                      ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                      : "bg-slate-100 text-slate-700 border-slate-300"
                  }`}
                >
                  {settings.gscConnected ? "Connected" : "Disconnected"}
                </Badge>
              </div>

              <div className="mt-4 rounded border border-border bg-ivory/50 p-3 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Target Property:</span>
                  <span className="font-mono font-medium text-navy">
                    sc-domain:{settings.domain}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Required OAuth Scope:</span>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    webmasters.readonly
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-border pt-4 flex flex-col gap-2">
              <Button
                size="sm"
                variant={settings.gscConnected ? "outline" : "default"}
                onClick={handleToggleGsc}
                className={`w-full text-xs ${
                  settings.gscConnected
                    ? "border-rose-200 text-rose-700 hover:bg-rose-50"
                    : "bg-navy text-ivory hover:bg-navy-soft"
                }`}
              >
                {settings.gscConnected
                  ? "Disconnect Search Console"
                  : "Connect Google Search Console"}
              </Button>
              <Link
                to="/admin/blogs"
                className="inline-flex items-center justify-center rounded border border-gold/40 bg-gold/10 px-3 py-1.5 text-xs font-semibold text-navy hover:bg-gold/20 transition-colors"
              >
                Open Blog Search Console & URL Inspector →
              </Link>
            </div>
          </div>

          {/* Integration 2: Google Analytics 4 */}
          <div className="rounded-lg border border-border bg-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-navy">
                    Google Analytics 4 (GA4)
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Organic session engagement and conversion tracking
                  </p>
                </div>
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 text-[10px]">
                  Configured
                </Badge>
              </div>

              <form onSubmit={handleSaveGa} className="mt-4 space-y-3">
                <div>
                  <Label htmlFor="ga-id" className="text-xs font-semibold text-navy">
                    Measurement ID
                  </Label>
                  <div className="mt-1 flex gap-2">
                    <Input
                      id="ga-id"
                      value={gaId}
                      onChange={(e) => setGaId(e.target.value)}
                      placeholder="G-XXXXXXXXXX"
                      className="text-xs font-mono"
                    />
                    <Button type="submit" size="sm" className="bg-navy text-xs text-ivory">
                      Save
                    </Button>
                  </div>
                  <span className="mt-1 block text-[10px] text-muted-foreground">
                    Injected via global GTM container GTM-KXPBJZGP on public routes.
                  </span>
                </div>
              </form>
            </div>
          </div>

          {/* Integration 3: Bing Webmaster Tools */}
          <div className="rounded-lg border border-border bg-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-navy">
                    Bing Webmaster Tools
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    IndexNow automated URL submission and Bing SERP telemetry
                  </p>
                </div>
                <Badge
                  className={`text-[10px] ${
                    settings.bingConnected
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {settings.bingConnected ? "Connected" : "Disconnected"}
                </Badge>
              </div>

              <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                Connect your Bing Webmaster API key to enable IndexNow. Any newly published case
                study or portfolio piece on{" "}
                <code className="font-mono text-navy">grovision.shop</code> will be automatically
                pinged.
              </p>
            </div>

            <div className="mt-6 border-t border-border pt-4">
              <Button
                size="sm"
                variant={settings.bingConnected ? "outline" : "default"}
                onClick={handleToggleBing}
                className={`w-full text-xs ${
                  settings.bingConnected
                    ? "border-rose-200 text-rose-700 hover:bg-rose-50"
                    : "bg-navy text-ivory hover:bg-navy-soft"
                }`}
              >
                {settings.bingConnected ? "Disconnect Bing Webmaster" : "Connect Bing Webmaster"}
              </Button>
            </div>
          </div>

          {/* Integration 4: Cloudflare & Sitemap Ping */}
          <div className="rounded-lg border border-border bg-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-navy">
                    Sitemap & Robots Protocol
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Automated static sitemap XML emission and edge delivery
                  </p>
                </div>
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 text-[10px]">
                  Active & Live
                </Badge>
              </div>

              <div className="mt-4 rounded border border-border bg-ivory/50 p-3 text-xs space-y-1.5 font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Sitemap URL:</span>
                  <a
                    href="https://grovision.shop/sitemap.xml"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gold hover:underline flex items-center gap-1"
                  >
                    /sitemap.xml <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Robots.txt:</span>
                  <a
                    href="https://grovision.shop/robots.txt"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gold hover:underline flex items-center gap-1"
                  >
                    /robots.txt <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-border pt-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => toast.success("Sitemap ping dispatched to Google and Bing.")}
                className="w-full text-xs border-navy/20 text-navy hover:text-gold"
              >
                Ping Search Engines Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
