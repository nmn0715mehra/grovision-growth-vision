import { useState } from "react";
import {
  ArrowUpRight,
  Compass,
  Gem,
  Search,
  Share2,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  compass: Compass,
  gem: Gem,
  "trending-up": TrendingUp,
  "share-2": Share2,
  search: Search,
  target: Target,
};

export function ServiceCard({
  icon,
  name,
  summary,
  detail,
}: {
  icon: string;
  name: string;
  summary: string;
  detail: string;
}) {
  const [open, setOpen] = useState(false);
  const Icon = iconMap[icon] ?? Compass;

  return (
    <article className="group flex h-full flex-col border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lift sm:p-8">
      <span className="flex h-11 w-11 items-center justify-center border border-gold/40 bg-beige text-navy transition-colors duration-300 group-hover:bg-gold group-hover:text-navy">
        <Icon aria-hidden="true" className="h-5 w-5" />
      </span>
      <h3 className="mt-6 text-lg font-bold sm:text-xl">{name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{summary}</p>

      <div className="mt-auto pt-5">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="eyebrow inline-flex cursor-pointer items-center gap-2 text-navy transition-colors hover:text-gold"
        >
          {open ? "Show less" : "Learn more"}
          <ArrowUpRight
            aria-hidden="true"
            className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-90")}
          />
        </button>
        <p
          className={cn(
            "grid overflow-hidden text-sm leading-relaxed text-muted-foreground transition-all duration-300",
            open ? "mt-4 max-h-40 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          {detail}
        </p>
      </div>
    </article>
  );
}

export function IndustryCard({ name, note }: { name: string; note: string }) {
  return (
    <article className="group border border-border bg-ivory p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:shadow-card">
      <h3 className="text-sm font-bold tracking-wide text-navy sm:text-base">{name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{note}</p>
    </article>
  );
}

export function PortfolioCard({
  title,
  label,
  discipline,
  focus,
  scope,
}: {
  title: string;
  label: string;
  discipline: string;
  focus: string;
  scope: readonly string[];
}) {
  return (
    <article className="group flex h-full flex-col border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div
        aria-hidden="true"
        className="grid-lines relative flex h-40 items-end overflow-hidden border-b border-border bg-beige p-5 sm:h-48"
      >
        <span className="absolute -right-8 -top-10 h-32 w-32 rounded-full border border-gold/40" />
        <span className="absolute right-6 top-8 h-16 w-16 rounded-full border border-navy/15" />
        <span className="text-4xl font-bold tracking-tight text-navy/15 sm:text-5xl">
          {discipline}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <span className="eyebrow inline-flex w-fit border border-gold/50 px-2.5 py-1 text-gold">
          {label}
        </span>
        <h3 className="mt-4 text-lg font-bold sm:text-xl">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{focus}</p>
        <ul className="mt-5 flex flex-wrap gap-2 pt-1">
          {scope.map((item) => (
            <li key={item} className="border border-border bg-beige px-2.5 py-1 text-xs text-navy">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
