import { Container, CTAButton } from "../components/site/primitives";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center pt-16">
      <Container className="text-center">
        <h1
          className="text-[clamp(3rem,8vw,6rem)] leading-[1.0] tracking-[-0.05em] text-ink"
          style={{ fontWeight: 500 }}
        >
          This thread came loose.
        </h1>
        <p className="mx-auto mt-5 max-w-[46ch] text-[1.125rem] leading-[1.55] text-body">
          The page you're looking for isn't here. Let's get you back to something
          useful.
        </p>
        <div className="mt-9 flex justify-center gap-3">
          <CTAButton to="/" variant="primary" arrow>
            Back to Home
          </CTAButton>
          <CTAButton to="/contact" variant="secondary">
            Request a Quote
          </CTAButton>
        </div>
      </Container>
    </section>
  );
}
