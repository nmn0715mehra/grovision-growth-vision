import { cn } from "@/lib/utils";
import horizontalAsset from "@/assets/logo-horizontal.png.asset.json";
import stackedNavyAsset from "@/assets/logo-stacked-navy.png.asset.json";
import stackedLightAsset from "@/assets/logo-stacked-light.png.asset.json";
import iconNavyAsset from "@/assets/logo-icon-navy.png.asset.json";
import iconLightAsset from "@/assets/logo-icon-light.png.asset.json";

/**
 * GROVISION logo — official supplied brand artwork.
 * Artwork is used exactly as provided; only scale changes.
 */

export function LogoMark({
  className,
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "inverted";
}) {
  const src = tone === "inverted" ? iconLightAsset.url : iconNavyAsset.url;
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className={cn("h-8 w-auto object-contain", className)}
    />
  );
}

type LogoProps = {
  /** "full" = horizontal lockup, "stacked" = vertical lockup, "icon" = mark only. */
  variant?: "full" | "stacked" | "icon";
  /** Use "inverted" on navy/dark backgrounds. */
  tone?: "default" | "inverted";
  className?: string;
};

export function Logo({ variant = "full", tone = "default", className }: LogoProps) {
  if (variant === "icon") {
    return (
      <span className={cn("inline-flex items-center", className)}>
        <LogoMark tone={tone} className="h-9 w-auto" />
        <span className="sr-only">GROVISION</span>
      </span>
    );
  }

  const src =
    variant === "stacked"
      ? tone === "inverted"
        ? stackedLightAsset.url
        : stackedNavyAsset.url
      : tone === "inverted"
        ? stackedLightAsset.url
        : horizontalAsset.url;

  return (
    <img
      src={src}
      alt="GROVISION — where vision meets growth"
      width={variant === "stacked" ? 700 : 900}
      height={variant === "stacked" ? 487 : 219}
      className={cn(
        "w-auto max-w-full object-contain",
        variant === "stacked" ? "h-24" : "h-9 sm:h-10",
        className,
      )}
    />
  );
}
