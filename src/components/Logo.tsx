import { cn } from "@/lib/utils";

/**
 * GROVISION logo.
 *
 * NOTE: no official logo asset files were supplied. This component renders a
 * neutral placeholder mark + wordmark. To use the official assets, drop them in
 * `src/assets/` and replace ONLY the markup inside `LogoMark`/`Logo` with the
 * imported images — do not alter the supplied artwork.
 */

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label="GROVISION icon"
      className={cn("h-8 w-8", className)}
    >
      <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M14 32 L21 24 L27 28 L36 15"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="square"
      />
      <circle cx="24" cy="24" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

type LogoProps = {
  /** "full" shows the wordmark, "icon" is for compact/mobile contexts. */
  variant?: "full" | "icon";
  /** Use "inverted" on navy/dark backgrounds. */
  tone?: "default" | "inverted";
  className?: string;
};

export function Logo({ variant = "full", tone = "default", className }: LogoProps) {
  const toneClass = tone === "inverted" ? "text-ivory" : "text-navy";

  return (
    <span className={cn("inline-flex items-center gap-2.5", toneClass, className)}>
      <LogoMark className={cn("h-8 w-8 shrink-0", tone === "default" && "text-gold")} />
      {variant === "full" && (
        <span className="text-base font-bold leading-none tracking-[0.2em] sm:text-lg">
          GROVISION
        </span>
      )}
      <span className="sr-only">GROVISION</span>
    </span>
  );
}
