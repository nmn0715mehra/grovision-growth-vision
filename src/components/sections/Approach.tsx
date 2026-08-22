import { Section, SectionHeading } from "../SectionHeading";
import { ProcessSteps } from "../ProcessSteps";

export function Approach({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  return (
    <Section id="approach" tone="navy">
      <SectionHeading
        as={heading}
        tone="inverted"
        eyebrow="Our Approach"
        title="From Vision to Growth."
        intro="Four steps, in this order. Strategy always comes before execution."
      />
      <ProcessSteps />
    </Section>
  );
}
