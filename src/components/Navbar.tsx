import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-border bg-ivory/95 shadow-card backdrop-blur"
          : "border-transparent bg-ivory",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <Link to="/" aria-label="GROVISION home" className="shrink-0">
          <Logo variant="full" className="hidden sm:inline-flex" />
          <Logo variant="icon" className="sm:hidden" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              className="text-sm font-medium text-navy/75 transition-colors hover:text-navy"
              activeProps={{ className: "!text-navy font-semibold" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="border border-navy bg-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-soft hover:shadow-card"
          >
            Let&apos;s Grow Together
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center border border-border text-navy transition-colors hover:border-gold lg:hidden"
        >
          {open ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-border bg-ivory px-5 pb-6 pt-2 sm:px-8 lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              className="border-b border-border py-3.5 text-base font-medium text-navy/80"
              activeProps={{ className: "!text-navy font-semibold" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="mt-5 border border-navy bg-navy px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-ivory"
          >
            Let&apos;s Grow Together
          </Link>
        </nav>
      </div>
    </header>
  );
}
