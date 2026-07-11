import { useEffect } from "react";
import { useLocation } from "react-router";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../../lib/gsap";

let lenisInstance: Lenis | null = null;

export function scrollToTop(immediate = true) {
  if (lenisInstance) lenisInstance.scrollTo(0, { immediate });
  else window.scrollTo(0, 0);
}

/** Height of the fixed header plus breathing room, for anchor offsets. */
const ANCHOR_OFFSET = -88;

function onAnchorClick(e: MouseEvent) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
  const anchor = (e.target as HTMLElement).closest?.('a[href^="#"]');
  if (!(anchor instanceof HTMLAnchorElement)) return;
  const id = decodeURIComponent(anchor.getAttribute("href")!.slice(1));
  const target = id && document.getElementById(id);
  if (!target) return;
  e.preventDefault();
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: ANCHOR_OFFSET });
  } else {
    // Reduced motion / no Lenis: rely on the section's scroll-mt for offset.
    target.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }
  // Keep keyboard and screen-reader focus in sync with the visual scroll
  // (also keeps the skip-link working now that default jump is prevented).
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  window.history.replaceState(null, "", `#${id}`);
}

/**
 * Mounts a single Lenis smooth-scroll instance and wires it to the GSAP
 * ticker + ScrollTrigger so scrubbed animations stay perfectly in sync.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  // Route in-page anchor clicks through Lenis so they glide instead of
  // jumping, and land clear of the fixed header.
  useEffect(() => {
    document.addEventListener("click", onAnchorClick);
    return () => document.removeEventListener("click", onAnchorClick);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 0.82,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.15,
    });
    lenisInstance = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  // Reset scroll + refresh triggers on route change.
  useEffect(() => {
    scrollToTop(true);
    // Let the new page paint, then recalc trigger positions.
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return <>{children}</>;
}
