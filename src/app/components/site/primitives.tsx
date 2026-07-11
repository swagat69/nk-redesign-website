import * as React from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "../ui/utils";

/* ------------------------------------------------------------------ */
/* Container — 1280px centered                                         */
/* ------------------------------------------------------------------ */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1280px] px-5 md:px-8", className)}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Clay feature-card color cycle (no repeats adjacent)                 */
/* ------------------------------------------------------------------ */
export type ClayColor = "pink" | "teal" | "lavender" | "peach" | "ochre" | "cream";

export const CLAY_CYCLE: ClayColor[] = [
  "pink",
  "teal",
  "lavender",
  "peach",
  "ochre",
  "cream",
];

export const clayCardClasses: Record<ClayColor, string> = {
  pink: "bg-[var(--clay-pink)] text-white",
  teal: "bg-[var(--clay-teal)] text-white",
  lavender: "bg-[var(--clay-lavender)] text-ink",
  peach: "bg-[var(--clay-peach)] text-ink",
  ochre: "bg-[var(--clay-ochre)] text-ink",
  cream: "bg-[var(--surface-card)] text-ink",
};

/* ------------------------------------------------------------------ */
/* Eyebrow intentionally renders nothing: the latest direction removes
   small section labels across the site. */
/* ------------------------------------------------------------------ */
export function Eyebrow({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "light";
}) {
  void children;
  void className;
  void tone;
  return null;
}

/* ------------------------------------------------------------------ */
/* Section heading — Clay display (Inter 500, negative tracking)       */
/* ------------------------------------------------------------------ */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "default",
  className,
  titleClassName,
  introClassName,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  tone?: "default" | "light";
  className?: string;
  titleClassName?: string;
  introClassName?: string;
}) {
  void eyebrow;
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <h2
        className={cn(
          "max-w-[20ch] text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.05] tracking-[-0.04em]",
          tone === "light" ? "text-white" : "text-ink",
          align === "center" && "max-w-[24ch]",
          titleClassName,
        )}
        style={{ fontWeight: 500 }}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "max-w-[76ch] text-[1.0625rem] leading-[1.55]",
            tone === "light" ? "text-white/75" : "text-body",
            introClassName,
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CTA button (router Link / anchor)                                   */
/* ------------------------------------------------------------------ */
type CTAVariant = "primary" | "secondary" | "on-color" | "ink-outline";

const ctaStyles: Record<CTAVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-[var(--nk-red-subtle)] active:bg-[var(--nk-red)]",
  secondary:
    "bg-[var(--canvas,#fffaf0)] bg-background text-ink border border-[var(--hairline)] hover:border-[var(--nk-red-border)] hover:bg-[var(--nk-red-surface)] hover:text-[var(--nk-red-subtle)] active:text-[var(--nk-red)]",
  "on-color": "bg-white text-ink hover:text-[var(--nk-red-subtle)] hover:bg-white/90 active:text-[var(--nk-red)]",
  "ink-outline":
    "bg-transparent text-ink border border-ink/20 hover:border-[var(--nk-red-border)] hover:bg-[var(--nk-red-surface)] hover:text-[var(--nk-red-subtle)] active:text-[var(--nk-red)]",
};

export function CTAButton({
  to,
  href,
  children,
  variant = "primary",
  className,
  arrow = false,
  onClick,
}: {
  to?: string;
  href?: string;
  children: React.ReactNode;
  variant?: CTAVariant;
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
}) {
  const classes = cn(
    "group inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-[14px] font-semibold leading-none transition-all duration-200 active:scale-[0.98]",
    ctaStyles[variant],
    className,
  );
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </>
  );
  if (href) {
    return (
      <a data-pressable="true" href={href} className={classes} onClick={onClick}>
        {inner}
      </a>
    );
  }
  return (
    <Link data-pressable="true" to={to ?? "#"} className={classes} onClick={onClick}>
      {inner}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Inline arrow link                                                   */
/* ------------------------------------------------------------------ */
export function ArrowLink({
  to,
  children,
  className,
  tone = "default",
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "light";
}) {
  return (
    <Link
      data-pressable="true"
      to={to}
      className={cn(
        "group inline-flex min-h-10 items-center gap-1.5 text-[14px] font-semibold transition-colors",
        tone === "light" ? "text-white hover:text-white/80" : "text-ink hover:text-[var(--nk-red-subtle)]",
        className,
      )}
    >
      <span>{children}</span>
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
