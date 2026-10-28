import { Section, SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";

export function AboutSection({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  return (
    <Section id="about" tone="beige">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 items-center">
        <div>
          <SectionHeading
            as={heading}
            eyebrow="About GROVISION"
            title="A brand built on direction, not noise."
            intro="GROVISION is a digital marketing brand created around one belief: growth becomes far more achievable when a business knows exactly where it is going."
          />
          <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
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
              <p className="border-l-2 border-gold pl-5 text-navy font-medium">
                Strategy before execution. Creativity with purpose. Marketing connected to business
                goals. Long-term growth over short-term hype. Client success over simply selling
                services.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={120}>
          <div className="group relative overflow-hidden rounded-lg border border-border bg-card shadow-card transition-all duration-300 hover:border-gold hover:shadow-lift">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy/5">
              <img
                src="/images/site/about-strategy-studio.jpg"
                alt="GROVISION strategic workspace and brand direction"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="font-semibold uppercase tracking-wider text-ivory/90">
                  Deliberate Craft & Strategy
                </span>
                <span className="rounded bg-navy/80 px-2 py-0.5 text-[10px] font-mono text-gold border border-gold/30 backdrop-blur-sm">
                  Standards First
                </span>
              </div>
            </div>
            <div className="border-t border-border bg-ivory/60 p-4 sm:p-5">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Every strategy is engineered on deep audience research, crisp positioning, and authentic business outcomes.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
