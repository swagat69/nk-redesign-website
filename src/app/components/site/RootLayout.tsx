import { useRef } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Toaster } from "../ui/sonner";
import { SmoothScroll } from "./SmoothScroll";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "../../lib/gsap";

export function RootLayout() {
  const mainRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useGSAP(
    () => {
      const main = mainRef.current;
      if (!main || prefersReducedMotion()) return;

      gsap.fromTo(
        main,
        { autoAlpha: 0, y: 10 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.36,
          ease: EASE,
          clearProps: "opacity,visibility,transform",
        },
      );

      gsap.set("[data-pressable]", { transformOrigin: "50% 50%" });

      const findTarget = (event: Event, selector: string) => {
        const target = event.target;
        return target instanceof Element ? target.closest<HTMLElement>(selector) : null;
      };

      const onPress = (target: HTMLElement) => {
        gsap.to(target, {
          scale: 0.97,
          duration: 0.14,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const onRelease = (target: HTMLElement) => {
        gsap.to(target, {
          scale: 1,
          duration: 0.22,
          ease: EASE,
          overwrite: "auto",
        });
      };

      const onPointerDown = (event: PointerEvent) => {
        const pressable = findTarget(event, "[data-pressable]");
        if (pressable) onPress(pressable);
      };

      const onPointerUp = (event: PointerEvent) => {
        const pressable = findTarget(event, "[data-pressable]");
        if (pressable) onRelease(pressable);
      };

      const onPointerCancel = (event: PointerEvent) => {
        const pressable = findTarget(event, "[data-pressable]");
        if (pressable) onRelease(pressable);
      };

      document.addEventListener("pointerdown", onPointerDown);
      document.addEventListener("pointerup", onPointerUp);
      document.addEventListener("pointercancel", onPointerCancel);

      return () => {
        document.removeEventListener("pointerdown", onPointerDown);
        document.removeEventListener("pointerup", onPointerUp);
        document.removeEventListener("pointercancel", onPointerCancel);
        gsap.killTweensOf("[data-pressable]");
      };
    },
    { scope: mainRef, dependencies: [location.pathname], revertOnUpdate: true },
  );

  return (
    <SmoothScroll>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-xl focus:bg-primary focus:px-4 focus:py-2 focus:text-[13px] focus:font-semibold focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <main id="main" ref={mainRef} className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration />
        <Toaster position="bottom-right" />
      </div>
    </SmoothScroll>
  );
}
