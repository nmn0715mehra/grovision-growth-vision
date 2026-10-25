import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { useAdminStore } from "@/lib/admin-store";
import { Settings, Save, RotateCcw, Globe, Shield, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title: "SEO Settings | GROVISION SEO" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { settings, updateSettings, resetToSampleData } = useAdminStore();

  const [domain, setDomain] = useState(settings.domain);
  const [siteName, setSiteName] = useState(settings.siteName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [primaryLocation, setPrimaryLocation] = useState(settings.primaryLocation);
  const [sitemapUrl, setSitemapUrl] = useState(settings.sitemapUrl);
  const [robotsTxtUrl, setRobotsTxtUrl] = useState(settings.robotsTxtUrl);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      domain: domain.trim(),
      siteName: siteName.trim(),
      tagline: tagline.trim(),
      primaryLocation: primaryLocation.trim(),
      sitemapUrl: sitemapUrl.trim(),
      robotsTxtUrl: robotsTxtUrl.trim(),
    });
    toast.success("Website SEO settings saved successfully!");
  };

  return (
    <AdminShell
      title="Single-Site Configuration"
      subtitle="Core domain metadata, localization scopes, and search engine crawler instructions for grovision.shop"
    >
      <div className="space-y-6 max-w-4xl">
        {/* Dedicated Scope Badge */}
        <div className="rounded-lg border border-gold/40 bg-navy p-5 text-ivory flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded bg-navy-soft p-2.5 text-gold border border-gold/30">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-bold tracking-wide">
                  Scope Anchor: {settings.domain}
                </span>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30 text-[10px]">
                  Single-Site Enforced
                </Badge>
              </div>
              <p className="text-xs text-ivory/60 mt-0.5">
                All records, audits, keywords, and task items in this workspace are strictly scoped
                to this domain.
              </p>
            </div>
          </div>
        </div>

        {/* Configuration Form */}
        <form
          onSubmit={handleSave}
          className="rounded-lg border border-border bg-white p-6 shadow-sm space-y-6"
        >
          <h3 className="font-display text-base font-bold text-navy border-b border-border pb-3">
            Domain & Brand Parameters
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="set-domain" className="text-xs font-semibold text-navy">
                Primary Monitored Domain
              </Label>
              <Input
                id="set-domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                required
                className="mt-1 font-mono text-xs"
              />
              <span className="mt-1 block text-[10px] text-muted-foreground">
                Canonical host used in sitemaps and schema generation.
              </span>
            </div>

            <div>
              <Label htmlFor="set-name" className="text-xs font-semibold text-navy">
                Brand / Organization Name
              </Label>
              <Input
                id="set-name"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                required
                className="mt-1 text-xs"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="set-tagline" className="text-xs font-semibold text-navy">
                Brand Slogan / Tagline
              </Label>
              <Input
                id="set-tagline"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="mt-1 text-xs"
              />
            </div>

            <div>
              <Label htmlFor="set-location" className="text-xs font-semibold text-navy">
                Primary Geographic Focus
              </Label>
              <Input
                id="set-location"
                value={primaryLocation}
                onChange={(e) => setPrimaryLocation(e.target.value)}
                className="mt-1 text-xs"
              />
            </div>
          </div>

          <h3 className="font-display text-base font-bold text-navy border-b border-border pb-3 pt-2">
            Crawl Endpoints & End-State URLs
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="set-sitemap" className="text-xs font-semibold text-navy">
                Sitemap Index URL
              </Label>
              <Input
                id="set-sitemap"
                value={sitemapUrl}
                onChange={(e) => setSitemapUrl(e.target.value)}
                className="mt-1 font-mono text-xs"
              />
            </div>

            <div>
              <Label htmlFor="set-robots" className="text-xs font-semibold text-navy">
                Robots.txt Location
              </Label>
              <Input
                id="set-robots"
                value={robotsTxtUrl}
                onChange={(e) => setRobotsTxtUrl(e.target.value)}
                className="mt-1 font-mono text-xs"
              />
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetToSampleData();
                setDomain("grovision.shop");
                setSiteName("GROVISION");
                toast.info("Settings reset to defaults.");
              }}
              className="border-navy/20 text-xs text-navy hover:text-rose-600"
            >
              <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
              Reset All to Defaults
            </Button>

            <Button type="submit" className="bg-navy text-xs text-ivory hover:bg-navy-soft">
              <Save className="mr-1.5 h-3.5 w-3.5" />
              Save Configuration
            </Button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
