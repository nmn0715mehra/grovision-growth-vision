import { Reveal } from "../Reveal";
import { brand } from "@/lib/site";

const beliefs = [
  { title: "Strategy before execution", body: "Direction first. Activity second." },
  { title: "Creativity with purpose", body: "Every idea answers a business question." },
  { title: "Marketing tied to goals", body: "Work is judged by outcomes, not output." },
  { title: "Long-term over hype", body: "Compounding progress beats short bursts." },
];

export function Philosophy() {
  return (
    <section id="philosophy" className="relative overflow-hidden bg-navy px-5 py-24 text-ivory sm:px-8 sm:py-28 lg:py-32">
      <div aria-hidden="true" className="absolute inset-0 opacity-25">
        <div className="spin-slow absolute -right-24 -top-24 h-80 w-80 rounded-full border border-gold/30" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full border border-ivory/10" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-gold-soft">
              <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
              Our Philosophy
            </p>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="mt-6 text-[1.9rem] font-bold leading-[1.12] sm:text-4xl lg:text-[3rem]">
              We believe every ambitious business deserves a clear direction for growth.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="eyebrow mt-8 text-gold">{brand.tagline}</p>
          </Reveal>
        </div>

        <ul className="grid gap-px self-center border border-ivory/15 bg-ivory/15">
          {beliefs.map((belief, index) => (
            <Reveal as="li" key={belief.title} delay={index * 80} className="bg-navy p-5 sm:p-6">
              <h3 className="text-base font-bold text-ivory">{belief.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ivory/70">{belief.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
