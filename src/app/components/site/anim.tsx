import * as React from "react";
import { useRef } from "react";
import { gsap, useGSAP, EASE, EASE_EXPO, prefersReducedMotion } from "../../lib/gsap";
import { cn } from "../ui/utils";

/* ------------------------------------------------------------------ */
/* AnimatedText — word-masked reveal (line-by-line feel)               */
/* ------------------------------------------------------------------ */
export function AnimatedText({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  trigger = false,
  stagger = 0.06,
}: {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  /** if true, animate on scroll into view; else animate on mount */
  trigger?: boolean;
  stagger?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const targets = ref.current!.querySelectorAll(".aw-word");
      gsap.set(targets, { yPercent: 115 });
      gsap.to(targets, {
        yPercent: 0,
        duration: 0.62,
        ease: EASE_EXPO,
        stagger,
        delay,
        ...(trigger
          ? {
              scrollTrigger: {
                trigger: ref.current,
                start: "top 85%",
                once: true,
              },
            }
          : {}),
      });
    },
    { scope: ref },
  );

  return React.createElement(
    Tag,
    { ref, className },
    words.map((w, i) => (
      <span
        key={i}
        className="inline-block overflow-hidden align-bottom"
        style={{ paddingBottom: "0.16em", marginRight: "0.24em" }}
      >
        <span className="aw-word inline-block will-change-transform">{w}</span>
      </span>
    )),
  );
}

/* ------------------------------------------------------------------ */
/* Reveal — fade + rise on scroll                                      */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: keyof JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.set(ref.current, { willChange: "transform,opacity" });
      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: EASE,
          delay,
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
          onComplete: () => gsap.set(ref.current, { clearProps: "willChange" }),
        },
      );
    },
    { scope: ref },
  );
  return React.createElement(Tag, { ref, className }, children);
}

/* ------------------------------------------------------------------ */
/* RevealGroup — staggers direct children on scroll                    */
/* ------------------------------------------------------------------ */
export function RevealGroup({
  children,
  className,
  stagger = 0.055,
  y = 22,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const kids = ref.current!.children;
      gsap.set(kids, { willChange: "transform,opacity" });
      gsap.fromTo(
        kids,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.58,
          ease: EASE,
          stagger,
          scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
          onComplete: () => gsap.set(kids, { clearProps: "willChange" }),
        },
      );
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Parallax — translates child as it scrolls through viewport          */
/* ------------------------------------------------------------------ */
export function Parallax({
  children,
  className,
  amount = 80,
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shift = Math.min(amount / 16, 5); // keep the motion present but not floaty
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ref.current!.querySelector(".aw-parallax-inner"),
        { yPercent: -shift },
        {
          yPercent: shift,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <div className="aw-parallax-inner absolute inset-x-0 -top-[12%] h-[124%] w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Counter — counts up to a number when scrolled into view             */
/* ------------------------------------------------------------------ */
export function Counter({
  value,
  suffix = "",
  prefix = "",
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(
    () => {
      const el = ref.current!;
      if (prefersReducedMotion()) {
        el.textContent = `${prefix}${value}${suffix}`;
        return;
      }
      const obj = { v: 0 };
      gsap.to(obj, {
        v: value,
        duration: 1.15,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(obj.v)}${suffix}`;
        },
      });
    },
    { scope: ref },
  );
  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* MagneticButton — element drifts toward the cursor                   */
/* ------------------------------------------------------------------ */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion()) return;
    const el = ref.current!;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.5, ease: EASE });
  };
  const onLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
  };

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("inline-block", className)}
    >
      {children}
    </span>
  );
}
