import { Section, SectionHeading } from "../SectionHeading";
import { PortfolioCard } from "../Cards";
import { Reveal } from "../Reveal";
import { portfolioItems } from "@/lib/site";

export function PortfolioSection({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  const cardHeadingTag = heading === "h1" ? "h2" : "h3";

  return (
    <Section id="portfolio" tone="ivory">
      <SectionHeading
        as={heading}
        eyebrow="Selected Work"
        title="Creative Concepts."
        intro="GROVISION is early in its journey, so everything below is self-initiated concept work created to demonstrate thinking and craft — not client projects."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {portfolioItems.map((item, index) => (
          <Reveal key={item.id} delay={(index % 3) * 80} className="h-full">
            <PortfolioCard
              headingTag={cardHeadingTag}
              title={item.title}
              label={item.label}
              discipline={item.discipline}
              focus={item.focus}
              scope={item.scope}
              image={item.image}
            />
          </Reveal>
        ))}
      </div>

      {/* Execution Disciplines & Standards */}
      <div className="mt-14 border-t border-border pt-12">
        <Reveal>
          <div className="max-w-3xl">
            <span className="eyebrow text-gold font-bold uppercase tracking-widest text-xs">
              Execution Disciplines
            </span>
            <h3 className="mt-2 text-xl sm:text-2xl font-bold text-navy">
              Standards Behind Every Concept
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Every concept piece in our portfolio reflects the operational disciplines we bring to
              market: thorough research, structural clarity, and conversion-focused execution.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <Reveal delay={60} className="border border-border bg-white p-6 shadow-sm">
            <h4 className="text-sm font-bold uppercase tracking-wider text-navy">
              Brand Positioning Systems
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Articulating clear value propositions and market differentiation that help brands
              stand apart from commodity competitors.
            </p>
          </Reveal>

          <Reveal delay={120} className="border border-border bg-white p-6 shadow-sm">
            <h4 className="text-sm font-bold uppercase tracking-wider text-navy">
              Organic Search Architecture
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Designing interconnected topic clusters, semantic headers, and fast technical delivery
              to capture sustainable organic rankings.
            </p>
          </Reveal>

          <Reveal delay={180} className="border border-border bg-white p-6 shadow-sm">
            <h4 className="text-sm font-bold uppercase tracking-wider text-navy">
              Conversion Architecture
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Structuring intuitive visual layouts, compelling headlines, and low-friction inquiry
              paths that convert traffic into qualified inquiries.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
