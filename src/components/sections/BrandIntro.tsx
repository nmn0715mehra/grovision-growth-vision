import { Section, SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";

const pillars = [
  { title: "Vision", body: "The ambition you already have for your business." },
  { title: "Strategy", body: "The thinking that turns ambition into decisions." },
  { title: "Creativity", body: "Work with purpose behind every idea." },
  { title: "Execution", body: "Digital activity delivered consistently." },
  { title: "Growth", body: "Progress you can measure and repeat." },
];

export function BrandIntro() {
  return (
    <Section id="brand" tone="ivory">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <SectionHeading
          eyebrow="The GROVISION Idea"
          title={
            <>
              Growth needs more than visibility.
              <br />
              It needs direction.
            </>
          }
          intro={
            <>
              <p>
                Many businesses have a strong idea, a good product and a real willingness to grow.
                What they are missing is direction — a clear view of what to do, in what order and
                why.
              </p>
              <p className="mt-4">
                GROVISION exists to close that gap. We connect vision with strategy, creativity with
                purpose, and digital execution with the outcomes your business actually cares about.
              </p>
            </>
          }
        />

        <div className="grid gap-px self-start border border-border bg-border sm:grid-cols-2 lg:grid-cols-1">
          {pillars.map((pillar, index) => (
            <Reveal
              key={pillar.title}
              delay={index * 70}
              className="flex items-baseline gap-5 bg-ivory p-5 sm:p-6"
            >
              <span className="eyebrow shrink-0 text-gold">0{index + 1}</span>
              <span>
                <span className="block text-base font-bold text-navy">{pillar.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                  {pillar.body}
                </span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
