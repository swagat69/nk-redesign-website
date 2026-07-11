import {
  PenTool,
  Factory,
  Truck,
  Leaf,
  MessageSquareText,
  Ruler,
  ClipboardList,
  Package,
  CircleDot,
} from "lucide-react";
import {
  Container,
  SectionHeading,
  CTAButton,
  CLAY_CYCLE,
  clayCardClasses,
} from "../components/site/primitives";
import { Reveal, RevealGroup } from "../components/site/anim";
import { CTASection } from "../components/site/CTASection";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { PageHero } from "../components/site/PageHero";
import { img } from "../lib/images";
import { CAPABILITIES, PROCESS } from "../lib/content";

const CAPABILITY_ICONS = [PenTool, Factory, Truck, Leaf];
const PROCESS_ICONS = [MessageSquareText, Ruler, Factory, ClipboardList, Package];
const CAPABILITY_ICON_COLORS = [
  { background: "var(--clay-lavender)", color: "var(--ink)" },
  { background: "var(--clay-peach)", color: "var(--ink)" },
  { background: "var(--clay-ochre)", color: "var(--ink)" },
  { background: "var(--clay-mint)", color: "var(--ink)" },
];
const PROCESS_ICON_COLORS = [
  { background: "var(--clay-lavender)", color: "var(--ink)" },
  { background: "var(--clay-peach)", color: "var(--ink)" },
  { background: "var(--clay-ochre)", color: "var(--ink)" },
  { background: "var(--clay-mint)", color: "var(--ink)" },
  { background: "var(--clay-teal)", color: "#ffffff" },
];

export default function Capabilities() {
  return (
    <>
      <PageHero
        eyebrow="Services & Process"
        title={<>The full production journey, made scannable.</>}
        intro="The live NK site describes a practical flow: communication, quote, proto sample, purchase order, first-run approval, production updates, 100% QC, packaging, customs, and delivery."
        photo={img(CAPABILITIES[1].photo, 1000, 760)}
        titleClassName="text-[var(--nk-red-subtle)]"
        actions={
          <>
            <CTAButton to="/contact" variant="primary" arrow>
              Book a Consultation
            </CTAButton>
            <CTAButton to="/contact" variant="secondary">
              Get a Capabilities Deck
            </CTAButton>
          </>
        }
      />

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Overview"
            title="Every stage, clearly owned."
            intro="NK brings product development, production, QC, logistics, customs support, packaging, and sustainability into one accountable flow with fewer hand-offs and clearer responsibility."
            titleClassName="text-[var(--nk-red-subtle)]"
            introClassName="max-w-none 2xl:whitespace-nowrap"
          />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((c, i) => {
              const Icon = CAPABILITY_ICONS[i % CAPABILITY_ICONS.length];
              return (
                <a
                  data-clickable-card
                  key={c.id}
                  href={`#${c.id}`}
                  className="rounded-[20px] border border-[var(--hairline)] bg-card p-6 transition-colors hover:bg-[var(--surface-card)]"
                >
                  <span
                    className="flex size-11 items-center justify-center rounded-xl"
                    style={CAPABILITY_ICON_COLORS[i % CAPABILITY_ICON_COLORS.length]}
                  >
                    <Icon className="size-5" strokeWidth={2} />
                  </span>
                  <h3 className="mt-4 text-[18px] leading-tight tracking-[-0.02em]" style={{ fontWeight: 600 }}>
                    {c.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.5] text-body">{c.summary}</p>
                </a>
              );
            })}
          </RevealGroup>
        </Container>
      </section>

      <section className="py-10 md:py-14">
        <Container>
          <RevealGroup className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Logistics without extra mark-up",
                body: "NK coordinates ocean or air freight, customs, and local transportation while passing through the actual logistics cost.",
              },
              {
                title: "Inspection from fabric to finish",
                body: "The live site emphasizes daily QC through the system rather than relying only on small final random checks.",
              },
              {
                title: "Buyer approval before scale",
                body: "Proto samples and first-run production samples keep the customer involved before full production moves ahead.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-[20px] bg-[var(--surface-card)] p-7">
                <h3 className="text-[1.15rem] tracking-[-0.02em]" style={{ fontWeight: 600 }}>
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-body">{item.body}</p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {CAPABILITIES.map((c, i) => {
        const flip = i % 2 === 1;
        const color = CLAY_CYCLE[i % CLAY_CYCLE.length];
        return (
          <section id={c.id} key={c.id} className="scroll-mt-24 py-10 md:py-14">
            <Container>
              <div
                className={`grid items-stretch gap-5 lg:grid-cols-2 lg:gap-8 ${
                  flip ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Reveal>
                  <div className={`flex h-full flex-col gap-6 rounded-[24px] p-8 ${clayCardClasses[color]}`}>
                    <h2 className="text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1.1] tracking-[-0.03em]" style={{ fontWeight: 500 }}>
                      {c.title}
                    </h2>
                    <div className="mt-auto overflow-hidden rounded-2xl bg-black/10">
                      <div className="aspect-[16/10]">
                        <ImageWithFallback src={img(c.photo, 720, 450)} alt={c.title} className="size-full object-cover" />
                      </div>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.08}>
                  <div className="flex h-full flex-col justify-center rounded-[24px] border border-[var(--hairline)] bg-card p-8 md:p-10">
                    <p className="text-[1.0625rem] leading-[1.55] text-body-strong">{c.summary}</p>
                    <ul className="mt-7 space-y-3.5">
                      {c.points.map((p) => (
                        <li key={p} className="flex items-start gap-3">
                          <CircleDot
                            className="mt-0.5 size-4 shrink-0"
                            style={{ color: CAPABILITY_ICON_COLORS[i % CAPABILITY_ICON_COLORS.length].background }}
                            strokeWidth={1.8}
                          />
                          <span className="text-[15px] leading-[1.5] text-body">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </Container>
          </section>
        );
      })}

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Process Timeline"
            title="From consultation to delivery."
            intro="Every project moves through the live-site workflow: communication, quote, proto sample, PO, progress updates, first-run approval, QC, and delivery."
            titleClassName="text-[var(--nk-red-subtle)]"
            introClassName="max-w-none 2xl:whitespace-nowrap"
          />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS.map((p, i) => {
              const Icon = PROCESS_ICONS[i % PROCESS_ICONS.length];
              return (
                <div key={p.id} className="flex h-full flex-col rounded-[20px] border border-[var(--hairline)] bg-card p-6">
                  <span
                    className="flex size-10 items-center justify-center rounded-lg"
                    style={PROCESS_ICON_COLORS[i % PROCESS_ICON_COLORS.length]}
                  >
                    <Icon className="size-5" strokeWidth={2} />
                  </span>
                  <h3 className="mt-5 text-[17px] tracking-[-0.02em]" style={{ fontWeight: 600 }}>
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.5] text-body">{p.body}</p>
                </div>
              );
            })}
          </RevealGroup>
        </Container>
      </section>

      <CTASection
        eyebrow="Get a Capabilities Deck"
        title="See the full process in detail."
        body="Request our capabilities deck or book a call to walk through materials, MOQs, and timelines for your specific project."
        primaryLabel="Book a Consultation"
        secondaryLabel="Request a Quote"
      />
    </>
  );
}
