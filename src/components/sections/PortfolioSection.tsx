import { Section, SectionHeading } from "../SectionHeading";
import { PortfolioCard } from "../Cards";
import { Reveal } from "../Reveal";
import { portfolioItems } from "@/lib/site";

export function PortfolioSection({ heading = "h2" }: { heading?: "h1" | "h2" }) {
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
              title={item.title}
              label={item.label}
              discipline={item.discipline}
              focus={item.focus}
              scope={item.scope}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
