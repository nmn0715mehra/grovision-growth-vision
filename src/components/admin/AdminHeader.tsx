import { Menu, Globe, Bell, Sparkles, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AdminHeaderProps {
  title: string;
  subtitle?: string | undefined;
  onOpenMobileMenu?: (() => void) | undefined;
  actions?: React.ReactNode | undefined;
}

export function AdminHeader({ title, subtitle, onOpenMobileMenu, actions }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-ivory/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="rounded p-2 text-navy hover:bg-beige md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-display text-lg font-bold tracking-tight text-navy sm:text-xl">
              {title}
            </h1>
            <Badge
              variant="outline"
              className="hidden border-gold bg-gold/10 text-[10px] font-semibold text-navy sm:inline-flex"
            >
              grovision.shop
            </Badge>
          </div>
          {subtitle && <p className="hidden text-xs text-muted-foreground sm:block">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {actions}

        {/* Live Site Shortcut */}
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-1.5 rounded border border-navy/20 bg-ivory px-3 py-1.5 text-xs font-medium text-navy transition-colors hover:border-gold hover:text-gold sm:inline-flex"
        >
          <Globe className="h-3.5 w-3.5 text-gold" />
          <span>View Public Site</span>
          <ExternalLink className="h-3 w-3 opacity-60" />
        </a>

        {/* Sample Data Badge */}
        <div className="flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-800">
          <Sparkles className="h-3 w-3 text-amber-600" />
          <span className="hidden md:inline">Sample Benchmark Mode</span>
          <span className="md:hidden">Demo</span>
        </div>
      </div>
    </header>
  );
}
