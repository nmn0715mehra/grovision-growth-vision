import { Section, SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";

export function AboutSection({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  return (
    <Section id="about" tone="ivory">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <SectionHeading
          as={heading}
          eyebrow="About GROVISION"
          title="A brand built on direction, not noise."
          intro="GROVISION is a digital marketing brand created around one belief: growth becomes far more achievable when a business knows exactly where it is going."
        />
        <div className="space-y-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <Reveal>
            <p>
              Behind GROVISION is one person building this brand deliberately and openly. The
              current stage is honest: learning digital marketing in depth, building practical
              skills across strategy, content, search and paid media, preparing for internship
              experience and planning to begin freelancing.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <p>
              The long-term goal is for GROVISION to become a serious digital marketing business.
              That means the standards — thinking, craft and communication — are set now, before the
              scale arrives.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <p className="border-l-2 border-gold pl-5 text-navy">
              Strategy before execution. Creativity with purpose. Marketing connected to business
              goals. Long-term growth over short-term hype. Client success over simply selling
              services.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
