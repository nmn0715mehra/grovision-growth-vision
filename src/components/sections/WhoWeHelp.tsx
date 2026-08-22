import { Section, SectionHeading } from "../SectionHeading";
import { IndustryCard } from "../Cards";
import { Reveal } from "../Reveal";
import { industries } from "@/lib/site";

export function WhoWeHelp() {
  return (
    <Section id="who-we-help" tone="ivory">
      <SectionHeading
        eyebrow="Who We Help"
        title="Built for businesses ready to grow."
        intro="GROVISION is designed to support these industries. If your business is ambitious and needs digital direction, the approach applies."
      />
      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry, index) => (
          <Reveal as="li" key={industry.name} delay={(index % 3) * 70}>
            <IndustryCard name={industry.name} note={industry.note} />
          </Reveal>
        ))}
      </ul>
      <Reveal>
        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Working with Indian businesses first, with the intention of supporting brands in the US,
          UK and Europe as GROVISION grows.
        </p>
      </Reveal>
    </Section>
  );
}
