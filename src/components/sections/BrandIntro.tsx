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

      <Reveal delay={160} className="mt-14 sm:mt-16">
        <div className="group overflow-hidden rounded-xl border border-border bg-white shadow-card transition-all duration-300 hover:border-gold hover:shadow-lift">
          <div className="border-b border-border/80 bg-navy px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-ivory">
            <div>
              <span className="eyebrow text-gold text-[10px]">Strategic Framework</span>
              <h3 className="text-sm sm:text-base font-bold text-ivory">The Full-Funnel Growth Architecture</h3>
            </div>
            <span className="self-start sm:self-auto rounded bg-white/10 px-2.5 py-1 text-[11px] font-mono text-ivory/80 border border-white/10">
              Positioning • Intent SEO • Performance • Scale
            </span>
          </div>
          <div className="relative aspect-[16/9] w-full bg-navy/5 overflow-hidden">
            <img
              src="/images/site/growth-framework-infographic.jpg"
              alt="GROVISION Growth Architecture Infographic"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
          <div className="border-t border-border bg-ivory/60 px-5 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-muted-foreground">
            <span>A systematic direction connecting market positioning to compounding commercial revenue.</span>
            <span className="font-semibold text-navy shrink-0">Built for Scalable Execution</span>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
