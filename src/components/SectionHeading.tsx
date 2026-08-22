import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "default" | "inverted";
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "default",
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "max-w-3xl",
        centered && "mx-auto text-center",
        tone === "inverted" ? "text-ivory" : "text-navy",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <p
            className={cn(
              "eyebrow flex items-center gap-3",
              centered && "justify-center",
              tone === "inverted" ? "text-gold-soft" : "text-gold",
            )}
          >
            <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={60}>
        <Tag
          className={cn(
            "mt-4 font-bold leading-[1.1]",
            Tag === "h1"
              ? "text-[2rem] sm:text-5xl lg:text-6xl"
              : "text-[1.75rem] sm:text-4xl lg:text-[2.75rem]",
          )}
        >
          {title}
        </Tag>
      </Reveal>
      {intro && (
        <Reveal delay={120}>
          <div
            className={cn(
              "mt-5 text-base leading-relaxed sm:text-lg",
              tone === "inverted" ? "text-ivory/75" : "text-muted-foreground",
            )}
          >
            {intro}
          </div>
        </Reveal>
      )}
    </div>
  );
}

export function Section({
  id,
  children,
  className,
  tone = "ivory",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "ivory" | "beige" | "navy";
}) {
  const tones = {
    ivory: "bg-ivory text-navy",
    beige: "bg-beige text-navy",
    navy: "bg-navy text-ivory",
  } as const;

  return (
    <section
      id={id}
      className={cn("scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 lg:py-28", tones[tone], className)}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
