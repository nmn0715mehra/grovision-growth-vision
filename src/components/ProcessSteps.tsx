import { processSteps } from "@/lib/site";
import { Reveal } from "./Reveal";

export function ProcessSteps() {
  return (
    <ol className="mt-14 grid gap-px border border-ivory/15 bg-ivory/15 sm:grid-cols-2 lg:grid-cols-4">
      {processSteps.map((step, index) => (
        <Reveal as="li" key={step.step} delay={index * 90} className="bg-navy p-6 sm:p-8">
          <span className="block text-3xl font-bold text-gold sm:text-4xl">{step.step}</span>
          <h3 className="mt-4 text-lg font-bold text-ivory sm:text-xl">{step.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-ivory/70">{step.body}</p>
        </Reveal>
      ))}
    </ol>
  );
}
