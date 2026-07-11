import { Container, CTAButton } from "./primitives";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { img, PHOTO } from "../../lib/images";

export function CTASection({
  eyebrow = "Start Your Project",
  title = "Let's build your next collection.",
  body = "Tell us what you are making. We will come back with materials, MOQs, timeline, and a transparent quote within a few business days.",
  primaryLabel = "Request a Quote",
  primaryTo = "/contact",
  secondaryLabel = "Book a Consultation",
  secondaryTo = "/contact",
  photo = PHOTO.foldedShirts,
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  photo?: string;
}) {
  void eyebrow;
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-10 overflow-hidden rounded-[24px] bg-[var(--surface-soft)] p-8 md:grid-cols-[1.1fr_0.9fr] md:p-14 lg:p-16">
          <div>
            <h2
              className="text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.04em] text-[var(--nk-red-subtle)]"
              style={{ fontWeight: 500 }}
            >
              {title}
            </h2>
            <p className="mt-5 max-w-[48ch] text-[1.0625rem] leading-[1.55] text-body">
              {body}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTAButton to={primaryTo} variant="primary" arrow>
                {primaryLabel}
              </CTAButton>
              <CTAButton to={secondaryTo} variant="secondary">
                {secondaryLabel}
              </CTAButton>
            </div>
          </div>

          <div className="overflow-hidden rounded-[20px] bg-[var(--surface-card)]">
            <div className="aspect-[4/3]">
              <ImageWithFallback
                src={img(photo, 800, 600)}
                alt=""
                loading="lazy"
                decoding="async"
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
