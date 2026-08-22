import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { LogoMark } from "../Logo";
import { Reveal } from "../Reveal";
import { brand } from "@/lib/site";

function GrowthVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-md">
      <div className="spin-slow absolute inset-0 rounded-full border border-navy/12" />
      <div className="absolute inset-[12%] rounded-full border border-gold/40" />
      <div className="absolute inset-[26%] rounded-full border border-navy/10" />
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        <path
          d="M30 150 L70 110 L100 128 L145 55"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="2"
        />
        <circle cx="30" cy="150" r="3.5" fill="var(--color-navy)" />
        <circle cx="70" cy="110" r="3.5" fill="var(--color-navy)" />
        <circle cx="100" cy="128" r="3.5" fill="var(--color-navy)" />
        <circle cx="145" cy="55" r="5" fill="var(--color-gold)" />
        <path d="M145 55 L160 40" stroke="var(--color-navy)" strokeWidth="1.5" />
      </svg>
      <div className="float-slow absolute inset-0 flex items-center justify-center">
        <LogoMark className="h-20 w-20 text-navy/80 sm:h-24 sm:w-24" />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-beige px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:pb-32 lg:pt-24">
      <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-70" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow text-navy/60">{brand.name}</p>
          </Reveal>
          <Reveal delay={70}>
            <p className="eyebrow mt-3 flex items-center gap-3 text-gold">
              <span aria-hidden="true" className="h-px w-8 bg-current" />
              {brand.tagline}
            </p>
          </Reveal>
          <Reveal delay={140}>
            <h1 className="mt-6 text-[2.25rem] font-bold leading-[1.05] text-navy sm:text-5xl lg:text-[4rem]">
              Turn Your Vision Into Growth.
            </h1>
          </Reveal>
          <Reveal delay={210}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-navy/75 sm:text-lg">
              Strategic digital marketing for ambitious businesses that know where they want to go —
              but need the right direction to get there.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 border border-navy bg-navy px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-soft hover:shadow-lift"
              >
                Let&apos;s Grow Together
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 border border-navy/25 px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-navy transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-ivory"
              >
                Explore Services
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <GrowthVisual />
        </Reveal>
      </div>
    </section>
  );
}
