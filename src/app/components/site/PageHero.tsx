import * as React from "react";
import { Container } from "./primitives";
import { Reveal, Parallax } from "./anim";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { cn } from "../ui/utils";

export function PageHero({
  eyebrow,
  title,
  intro,
  photo,
  actions,
  titleClassName,
  introClassName,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  photo?: string;
  actions?: React.ReactNode;
  titleClassName?: string;
  introClassName?: string;
}) {
  void eyebrow;
  return (
    <section className="bg-background pt-16">
      <Container className="grid gap-10 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <Reveal delay={0.05}>
            <h1
              className={cn(
                "text-[clamp(2.5rem,5.4vw,4.5rem)] leading-[1.02] tracking-[-0.045em] text-ink",
                titleClassName,
              )}
              style={{ fontWeight: 500 }}
            >
              {title}
            </h1>
          </Reveal>
          {intro && (
            <Reveal delay={0.12}>
              <p
                className={cn(
                  "mt-6 max-w-[52ch] text-[1.125rem] leading-[1.55] text-body",
                  introClassName,
                )}
              >
                {intro}
              </p>
            </Reveal>
          )}
          {actions && (
            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
            </Reveal>
          )}
        </div>

        {photo && (
          <Reveal delay={0.1}>
            <Parallax
              className="aspect-[4/3] rounded-[24px] bg-[var(--surface-soft)]"
              amount={50}
            >
              <ImageWithFallback src={photo} alt="" className="size-full object-cover" />
            </Parallax>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
