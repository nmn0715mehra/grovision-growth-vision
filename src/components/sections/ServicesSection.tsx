import { Section, SectionHeading } from "../SectionHeading";
import { ServiceCard } from "../Cards";
import { Reveal } from "../Reveal";
import { services } from "@/lib/site";

export function ServicesSection({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  return (
    <Section id="services" tone="beige" className="border-t border-border/70">
      <SectionHeading
        as={heading}
        eyebrow="Services"
        title="Digital Marketing With Direction."
        intro="Six connected disciplines. Each one starts with your business goals and ends with something you can measure."
      />
      {/* Featured Strategic Execution Visual Showcase */}
      <Reveal delay={90} className="mt-12">
        <div className="group overflow-hidden rounded-xl border border-border bg-white shadow-card transition-all duration-300 hover:border-gold hover:shadow-lift grid lg:grid-cols-[1.15fr_0.85fr] items-stretch">
          <div className="relative min-h-[220px] sm:min-h-[260px] w-full overflow-hidden bg-navy/5">
            <img
              src="/images/site/services-digital-execution.jpg"
              alt="Strategic digital marketing execution across brand positioning, SEO, and paid performance"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-60" />
            <span className="absolute bottom-3 left-4 inline-flex items-center rounded bg-navy/85 px-2.5 py-1 text-[11px] font-mono text-gold border border-gold/30 backdrop-blur-md">
              Collaborative Strategy & Research
            </span>
          </div>
          <div className="p-6 sm:p-7 flex flex-col justify-between bg-ivory">
            <div>
              <span className="eyebrow text-gold text-[10px]">Connected disciplines</span>
              <h3 className="mt-2 text-base sm:text-lg font-bold text-navy">
                Strategy that compounds across every touchpoint.
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                We don’t treat SEO, paid media, or brand messaging as isolated silos. Every channel feeds customer insights, commercial intent, and conversion velocity into the next.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-border flex items-center justify-between text-xs text-navy font-semibold">
              <span className="text-[11px] text-muted-foreground font-mono">Full-Stack Execution</span>
              <span className="text-gold">Engineered for Scale</span>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal key={service.id} delay={(index % 3) * 80} className="h-full">
            <ServiceCard
              icon={service.icon}
              name={service.name}
              summary={service.summary}
              detail={service.detail}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
