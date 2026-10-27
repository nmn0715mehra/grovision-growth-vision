import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
};

// Singleton shared observer to eliminate 50+ observer allocations on page load
let sharedObserver: IntersectionObserver | null = null;
const observerCallbacks = new Map<Element, () => void>();

function getSharedObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
    return null;
  }
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const cb = observerCallbacks.get(entry.target);
            if (cb) {
              cb();
              observerCallbacks.delete(entry.target);
              sharedObserver?.unobserve(entry.target);
            }
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );
  }
  return sharedObserver;
}

/** Subtle fade-up on first scroll into view. Honours prefers-reduced-motion via CSS. */
export function Reveal({ children, className, delay = 0, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = getSharedObserver();
    if (!observer) {
      setShown(true);
      return;
    }

    observerCallbacks.set(node, () => setShown(true));
    observer.observe(node);

    return () => {
      observerCallbacks.delete(node);
      observer.unobserve(node);
    };
  }, []);

  return (
    <Tag
      ref={ref as never}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn("reveal", shown && "reveal-in", className)}
    >
      {children}
    </Tag>
  );
}
