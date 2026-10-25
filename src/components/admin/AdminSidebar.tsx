import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Search,
  FileText,
  ShieldAlert,
  Sparkles,
  Link2,
  Users,
  CheckSquare,
  BarChart3,
  History,
  Plug,
  Settings,
  Globe,
  LogOut,
  ExternalLink,
  ChevronRight,
  Database,
  BookOpen,
} from "lucide-react";
import { useAdminStore } from "@/lib/admin-store";
import { Badge } from "@/components/ui/badge";

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

export function AdminSidebar({ onCloseMobile }: AdminSidebarProps) {
  const { user, logout, settings, resetToSampleData } = useAdminStore();
  const currentPath = useRouterState({ select: (s) => s.location.pathname });

  const navigationGroups = [
    {
      group: "Core SEO",
      items: [
        { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { label: "Keywords", href: "/admin/keywords", icon: Search },
        { label: "Pages & Health", href: "/admin/pages", icon: FileText },
        { label: "Technical Audits", href: "/admin/audits", icon: ShieldAlert },
      ],
    },
    {
      group: "Growth & Analysis",
      items: [
        { label: "Blog & Articles", href: "/admin/blogs", icon: BookOpen },
        { label: "Content Opps", href: "/admin/content", icon: Sparkles },
        { label: "Backlinks", href: "/admin/backlinks", icon: Link2 },
        { label: "Competitors", href: "/admin/competitors", icon: Users },
        { label: "Action Tasks", href: "/admin/tasks", icon: CheckSquare },
      ],
    },
    {
      group: "Reporting & Setup",
      items: [
        { label: "Reports", href: "/admin/reports", icon: BarChart3 },
        { label: "Activity Log", href: "/admin/activity", icon: History },
        { label: "Integrations", href: "/admin/integrations", icon: Plug },
        { label: "Site Settings", href: "/admin/settings", icon: Settings },
      ],
    },
  ];

  return (
    <aside className="flex h-full w-64 flex-col border-r border-navy/20 bg-navy text-ivory">
      {/* Brand & Site Scope Header */}
      <div className="border-b border-navy-soft p-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded border border-gold/40 bg-navy-soft text-sm font-bold tracking-wider text-gold">
            GV
          </span>
          <div>
            <span className="block font-display text-sm font-bold tracking-wider text-ivory">
              GROVISION
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-widest text-gold">
              SEO Command Center
            </span>
          </div>
        </div>

        {/* Dedicated Single-Site Target Badge */}
        <div className="mt-4 rounded border border-gold/20 bg-navy-soft/60 p-2.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground/80 flex items-center gap-1.5 font-medium text-ivory/70">
              <Globe className="h-3 w-3 text-gold" />
              Dedicated Site:
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="font-mono text-xs font-semibold text-gold">{settings.domain}</span>
            <a
              href={`https://${settings.domain}`}
              target="_blank"
              rel="noreferrer"
              className="text-ivory/60 transition-colors hover:text-gold"
              title="Visit live site"
            >
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Nav Menu Items */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        {navigationGroups.map((group) => (
          <div key={group.group}>
            <span className="px-3 text-[10px] font-semibold uppercase tracking-widest text-ivory/40">
              {group.group}
            </span>
            <ul className="mt-2 space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/admin"
                    ? currentPath === "/admin" || currentPath === "/admin/"
                    : currentPath.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      onClick={onCloseMobile}
                      className={`group flex items-center justify-between rounded px-3 py-2 text-xs font-medium transition-all ${
                        isActive
                          ? "border-l-2 border-gold bg-gold/15 text-gold font-semibold shadow-sm"
                          : "text-ivory/80 hover:bg-navy-soft hover:text-ivory"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`h-4 w-4 shrink-0 transition-colors ${
                            isActive ? "text-gold" : "text-ivory/60 group-hover:text-gold"
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                      {isActive && <ChevronRight className="h-3 w-3 text-gold" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer Area: User, Sample Mode & Sign Out */}
      <div className="border-t border-navy-soft p-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="min-w-0">
            <span className="block truncate text-xs font-medium text-ivory">
              {user.name || "Administrator"}
            </span>
            <span className="block truncate text-[10px] text-ivory/50">{user.email}</span>
          </div>
          <Badge variant="outline" className="border-gold/40 text-[10px] text-gold uppercase">
            {user.role}
          </Badge>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={resetToSampleData}
            title="Reload initial SEO benchmark data"
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded border border-navy-soft bg-navy-soft/80 px-2 py-1.5 text-[10px] font-medium text-ivory/80 hover:bg-navy-soft hover:text-gold transition-colors"
          >
            <Database className="h-3 w-3" />
            Reset Data
          </button>
          <button
            type="button"
            onClick={logout}
            title="Sign out of admin workspace"
            className="inline-flex items-center justify-center rounded border border-rose-500/30 bg-rose-950/30 px-2.5 py-1.5 text-[10px] font-medium text-rose-300 hover:bg-rose-900/50 transition-colors"
          >
            <LogOut className="h-3 w-3" />
          </button>
        </div>
      </div>
    </aside>
  );
}
