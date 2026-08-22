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

      <Reveal>
        <div className="mt-12 flex flex-col items-start gap-4 border border-navy/15 bg-ivory p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            Every future case study will follow this structure, so the reasoning behind the work is
            as visible as the result.
          </p>
          <Link
            to="/contact"
            className="shrink-0 border border-navy bg-navy px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-soft hover:shadow-card"
          >
            Start a Conversation
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
