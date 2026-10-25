import { Link } from "@tanstack/react-router";
import { ArrowRight, Search, Target, TrendingUp, Layers, CheckCircle2 } from "lucide-react";
import { Reveal } from "../Reveal";
import { brand } from "@/lib/site";

function StrategicGrowthCard() {
  const pillars = [
    {
      num: "01",
      title: "Commercial Intent SEO",
      desc: "Capturing high-intent search queries that drive actual pipeline, not empty vanity volume.",
      badge: "Organic Pipeline",
      icon: Search,
    },
    {
      num: "02",
      title: "Brand Positioning & Clarity",
      desc: "Sharpening your value proposition so you stand apart from rivals and lower customer acquisition cost.",
      badge: "CAC Reduction",
      icon: Target,
    },
    {
      num: "03",
      title: "Performance Advertising",
      desc: "Targeted campaigns measured by blended Marketing Efficiency Ratio (MER), not inflated platform metrics.",
      badge: "Disciplined Scale",
      icon: TrendingUp,
    },
    {
      num: "04",
      title: "Conversion Architecture",
      desc: "Full-funnel execution turning attention and traffic into qualified, high-conviction client inquiries.",
      badge: "Pipeline Growth",
      icon: Layers,
    },
  ];

  return (
    <div className="relative mx-auto w-full max-w-lg">
      {/* Decorative ambient subtle glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-gold/25 via-transparent to-navy/10 blur-xl opacity-60"
      />

      <div className="relative overflow-hidden rounded-xl border border-border/80 bg-white shadow-card transition-all duration-300 hover:border-gold/50 hover:shadow-lift">
        {/* Card Header */}
        <div className="border-b border-border/60 bg-ivory/70 px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-gold animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-navy/85">
              The GROVISION Framework
            </span>
          </div>
          <span className="rounded border border-navy/10 bg-white px-2 py-0.5 text-[10px] font-mono font-medium text-navy/70">
            Full-Funnel Direction
          </span>
        </div>

        {/* 4 Pillars List */}
        <div className="divide-y divide-border/50 p-2 sm:p-2.5">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="group flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-beige/40"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-ivory text-navy group-hover:border-gold group-hover:text-gold transition-colors">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-navy group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                    <span className="shrink-0 text-[10px] font-medium text-gold-dark bg-gold/15 px-2 py-0.5 rounded font-mono">
                      {item.badge}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Card Footer Banner */}
        <div className="border-t border-border/60 bg-navy px-5 py-3 flex items-center justify-between text-ivory">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-gold shrink-0" />
            <span className="text-[11px] text-ivory/80">
              Free First Strategic Consultation
            </span>
          </div>
          <Link
            to="/"
            hash="lets-grow-together"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:text-gold-soft transition-colors"
          >
            Start Direction <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-beige px-5 pb-12 pt-16 sm:px-8 sm:pb-14 sm:pt-20 lg:pb-16 lg:pt-24">
      <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-70" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow text-navy/60">{brand.name}</p>
          </Reveal>
          <Reveal delay={70}>
            <p className="eyebrow mt-3 flex items-center gap-3 text-gold">
              <span aria-hidden="true" className="h-px w-8 bg-current" />
              {brand.tagline}
            </p>
          </Reveal>
          <Reveal delay={140}>
            <h1 className="mt-6 text-[2.25rem] font-bold leading-[1.05] text-navy sm:text-5xl lg:text-[4rem]">
              Turn Your Vision Into Growth.
            </h1>
          </Reveal>
          <Reveal delay={210}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-navy/75 sm:text-lg">
              Strategic digital marketing for ambitious businesses that know where they want to go —
              but need the right direction to get there.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/"
                hash="lets-grow-together"
                className="group inline-flex items-center justify-center gap-2 border border-navy bg-navy px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-soft hover:shadow-lift"
              >
                Let&apos;s Grow Together
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 border border-navy/25 px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-navy transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-ivory"
              >
                Explore Services
              </Link>
            </div>

            {/* Mobile-only compact reassurance pills: takes minimal vertical space on phones */}
            <div className="mt-6 flex flex-wrap items-center gap-2 lg:hidden">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-navy/15 bg-white/70 px-3 py-1 text-[11px] font-medium text-navy">
                <CheckCircle2 className="h-3 w-3 text-gold" /> Intent-Driven SEO
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-navy/15 bg-white/70 px-3 py-1 text-[11px] font-medium text-navy">
                <CheckCircle2 className="h-3 w-3 text-gold" /> Brand Positioning
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-navy/15 bg-white/70 px-3 py-1 text-[11px] font-medium text-navy">
                <CheckCircle2 className="h-3 w-3 text-gold" /> Free Consultation
              </span>
            </div>
          </Reveal>
        </div>

        {/* Desktop-only high-value Strategic Growth card: hidden on mobile so it never pushes down the page */}
        <div className="hidden lg:block">
          <Reveal delay={200}>
            <StrategicGrowthCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
