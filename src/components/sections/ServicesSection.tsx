import { Section, SectionHeading } from "../SectionHeading";
import { ServiceCard } from "../Cards";
import { Reveal } from "../Reveal";
import { services } from "@/lib/site";

export function ServicesSection({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  return (
    <Section id="services" tone="beige">
      <SectionHeading
        as={heading}
        eyebrow="Services"
        title="Digital Marketing With Direction."
        intro="Six connected disciplines. Each one starts with your business goals and ends with something you can measure."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
