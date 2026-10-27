import { Link } from "@tanstack/react-router";
import { Section, SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";
import { caseStudyFramework } from "@/lib/site";

export function CaseStudiesSection({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  return (
    <Section id="case-studies" tone="beige">
      <SectionHeading
        as={heading}
        eyebrow="Case Studies"
        title="Case studies coming soon."
        intro="As GROVISION grows, this space will showcase real strategies, challenges, solutions and measurable outcomes."
      />

      <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {caseStudyFramework.map((block, index) => (
          <Reveal key={block.title} delay={(index % 3) * 70} className="bg-ivory p-6 sm:p-7">
            <span className="eyebrow text-gold">0{index + 1}</span>
            <h3 className="mt-4 text-base font-bold text-navy sm:text-lg">{block.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{block.body}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12">
        <div className="group overflow-hidden rounded-xl border border-border bg-white shadow-card transition-all duration-300 hover:border-gold hover:shadow-lift grid lg:grid-cols-[1.1fr_0.9fr] items-stretch">
          <div className="relative min-h-[260px] sm:min-h-[300px] w-full overflow-hidden bg-navy/5">
            <img
              src="/images/site/growth-funnel-collaboration.jpg"
              alt="Data-driven marketing funnel analysis and performance strategy"
              loading="lazy"
              decoding="async"
              width={1100}
              height={614}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent opacity-60" />
            <span className="absolute bottom-3 left-4 inline-flex items-center rounded bg-navy/85 px-2.5 py-1 text-[11px] font-mono text-gold border border-gold/30 backdrop-blur-md">
              Measurable Full-Funnel Outcomes
            </span>
          </div>

          <div className="p-6 sm:p-8 flex flex-col justify-between bg-ivory">
            <div>
              <span className="eyebrow text-gold">The Analytical Standard</span>
              <h3 className="mt-2 text-lg sm:text-xl font-bold text-navy">
                Data-backed decisions, not guesswork.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Every campaign is tracked across the entire funnel — from organic intent acquisition and blended ROAS to conversion efficiency and customer retention.
              </p>
            </div>
            <div className="mt-6 pt-5 border-t border-border/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <span className="text-xs text-muted-foreground font-mono">
                Attribution • ROAS • CAC Optimization
              </span>
              <Link
                to="/"
                hash="lets-grow-together"
                className="inline-flex items-center justify-center border border-navy bg-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-ivory transition-all duration-300 hover:bg-gold hover:text-navy hover:border-gold self-start sm:self-auto"
              >
                Let’s Discuss Growth
              </Link>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-10 flex flex-col items-start gap-4 border border-navy/15 bg-ivory p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            Every future case study will follow this structure, so the reasoning behind the work is
            as visible as the result.
          </p>
          <Link
            to="/"
            hash="lets-grow-together"
            className="shrink-0 border border-navy bg-navy px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-soft hover:shadow-card"
          >
            Start a Conversation
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
