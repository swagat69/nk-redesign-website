import {
  Ship,
  Plane,
  FileCheck,
  Truck,
  Warehouse,
  PackageCheck,
  MapPin,
  ArrowRight,
  ArrowDown,
  CircleDot,
  Factory,
  Split,
} from "lucide-react";
import {
  Container,
  SectionHeading,
  CTAButton,
  clayCardClasses,
} from "../components/site/primitives";
import { Reveal, RevealGroup } from "../components/site/anim";
import { PageHero } from "../components/site/PageHero";
import { img, PHOTO } from "../lib/images";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const FLOW_STEPS = [
  { icon: Factory, title: "Production Complete", body: "Finished goods leave NK's quality controlled production floor." },
  { icon: Ship, title: "Ocean or Air Freight", body: "Freight arranged around your volume, route, and timeline." },
  { icon: FileCheck, title: "Customs Coordination", body: "U.S. customs clearance support for NK managed shipments." },
  { icon: Truck, title: "Inland Transportation", body: "Cleared goods moved by a suitable ground service." },
  { icon: Split, title: "Choose a Delivery Path", body: "Direct delivery, or U.S. storage through Capital Apparel." },
];

const WAREHOUSE_BRANCH = [
  "Receive & inventory",
  "Managed storage",
  "Scheduled carton or pallet release",
  "Selected U.S. destination",
];

const SHIPPING_OPTIONS = [
  {
    icon: Ship,
    title: "Ocean Freight",
    body: "Coordinate Full Container Load or Less than Container Load according to volume, route, schedule, and cost.",
  },
  {
    icon: Plane,
    title: "Expedited Air Freight",
    body: "Quote time sensitive shipments according to quantity, weight, dimensions, destination, and timeline.",
  },
  {
    icon: FileCheck,
    title: "Customs Coordination",
    body: "Coordinate with the appropriate customs, brokerage, and logistics parties for NK managed shipments.",
  },
  {
    icon: Truck,
    title: "Inland Transportation",
    body: "Move cleared goods through parcel, pallet freight, LTL, FTL, or another suitable ground service.",
  },
];

const FULFILLMENT_POINTS = [
  "Receive cartons and pallets against the packing list",
  "Record and track inventory",
  "Hold carton or pallet quantities",
  "Release partial quantities on request or schedule",
  "Ship to selected U.S. destinations",
  "Coordinate outbound parcel or freight service",
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function LogisticsFulfillment() {
  return (
    <>
      <PageHero
        eyebrow="From Production to Destination"
        title={<>One coordinated path from finished goods to final delivery.</>}
        intro="NK coordinates ocean or air freight, U.S. customs support, and inland transportation for products completed through our manufacturing programs. Customers can ship directly to a selected destination or add U.S. storage, inventory management, and scheduled distribution through Capital Apparel."
        photo={img(PHOTO.fabricWarehouse, 1000, 760)}
        titleClassName="text-[var(--nk-red-subtle)]"
        actions={
          <>
            <CTAButton to="/contact" variant="primary" arrow>
              Discuss Your Delivery Plan
            </CTAButton>
            <CTAButton
              href="mailto:customerservice@capitalapparel.com"
              variant="secondary"
            >
              Contact Capital Apparel
            </CTAButton>
          </>
        }
      />

      <section className="pb-4 pt-2">
        <Container>
          <Reveal>
            <p className="max-w-[76ch] text-[15px] leading-[1.55] text-body">
              U.S. warehousing and fulfillment are available in collaboration with
              Capital Apparel, NK's long standing business partner.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ---------------- Section 2: End-to-End Flow ---------------- */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="End to End Flow"
            title="The full journey, step by step."
            intro="One clear flow carries every NK program from the production floor to its final U.S. destination."
            titleClassName="text-[var(--nk-red-subtle)]"
          />

          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {FLOW_STEPS.map((step, i) => {
              const Icon = step.icon;
              const last = i === FLOW_STEPS.length - 1;
              return (
                <div key={step.title} className="relative">
                  <div
                    className={`flex h-full flex-col rounded-[20px] p-6 ${
                      last
                        ? "bg-[var(--surface-card)] ring-1 ring-[var(--nk-red-border)]"
                        : "border border-[var(--hairline)] bg-card"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="flex size-10 items-center justify-center rounded-lg"
                        style={{
                          background: last ? "var(--clay-teal)" : "var(--clay-lavender)",
                          color: last ? "#ffffff" : "var(--ink)",
                        }}
                      >
                        <Icon className="size-5" strokeWidth={2} />
                      </span>
                      <span className="text-[13px] font-semibold text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-5 text-[17px] tracking-[-0.02em]" style={{ fontWeight: 600 }}>
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-[1.5] text-body">{step.body}</p>
                  </div>
                  {!last && (
                    <span
                      className="absolute -right-3.5 top-1/2 z-10 hidden -translate-y-1/2 text-[16px] font-semibold text-muted-foreground lg:block"
                      aria-hidden
                    >
                      &gt;
                    </span>
                  )}
                </div>
              );
            })}
          </RevealGroup>

          {/* Branch: two delivery paths */}
          <Reveal>
            <div className="mt-4 flex justify-center lg:justify-end lg:pr-[10%]">
              <ArrowDown className="size-4 text-muted-foreground" strokeWidth={2} aria-hidden />
            </div>
            <div className="mt-4 grid gap-4 lg:grid-cols-[2fr_3fr]">
              <div className={`flex flex-col gap-3 rounded-[20px] p-6 ${clayCardClasses.lavender}`}>
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-ink/8 text-ink">
                    <MapPin className="size-5" strokeWidth={2} />
                  </span>
                  <h3 className="text-[17px] tracking-[-0.02em]" style={{ fontWeight: 600 }}>
                    Direct Delivery
                  </h3>
                </div>
                <p className="text-[14px] leading-[1.5] text-ink/70">
                  Goods routed straight to the customer's selected U.S. destination after clearance.
                </p>
              </div>

              <div className={`flex flex-col gap-3 rounded-[20px] p-6 ${clayCardClasses.peach}`}>
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-ink/8 text-ink">
                    <Warehouse className="size-5" strokeWidth={2} />
                  </span>
                  <h3 className="text-[17px] tracking-[-0.02em]" style={{ fontWeight: 600 }}>
                    Capital Apparel Warehouse
                  </h3>
                </div>
                <div className="mt-auto flex flex-wrap items-center gap-x-1.5 gap-y-1.5 lg:flex-nowrap">
                  {WAREHOUSE_BRANCH.map((stage, i) => (
                    <span key={stage} className="flex items-center gap-1.5">
                      <span className="whitespace-nowrap rounded-full bg-ink/8 px-2.5 py-1.5 text-[11px] font-semibold text-ink">
                        {stage}
                      </span>
                      {i < WAREHOUSE_BRANCH.length - 1 && (
                        <span className="text-[13px] font-semibold text-ink/45" aria-hidden>
                          &gt;
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ---------------- Section 3: Shipping Options ---------------- */}
      <section className="py-10 md:py-14">
        <Container>
          <SectionHeading
            eyebrow="Shipping Options"
            title="Shipping planned around your volume, timing, and destination."
            titleClassName="text-[var(--nk-red-subtle)]"
          />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SHIPPING_OPTIONS.map((option, i) => {
              const Icon = option.icon;
              const colors = [
                { background: "var(--clay-lavender)", color: "var(--ink)" },
                { background: "var(--clay-peach)", color: "var(--ink)" },
                { background: "var(--clay-ochre)", color: "var(--ink)" },
                { background: "var(--clay-teal)", color: "#ffffff" },
              ];
              return (
                <div
                  key={option.title}
                  className="flex h-full flex-col rounded-[20px] border border-[var(--hairline)] bg-card p-6"
                >
                  <span
                    className="flex size-10 items-center justify-center rounded-lg"
                    style={colors[i % colors.length]}
                  >
                    <Icon className="size-5" strokeWidth={2} />
                  </span>
                  <h3 className="mt-5 text-[17px] tracking-[-0.02em]" style={{ fontWeight: 600 }}>
                    {option.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.5] text-body">{option.body}</p>
                </div>
              );
            })}
          </RevealGroup>
        </Container>
      </section>

      {/* ---------------- Section 4: Two Delivery Paths ---------------- */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Delivery Paths"
            title="Direct delivery or U.S. storage. Your call."
            intro="Both paths are equal options. Choose per program, per shipment, or split a single shipment across the two."
            titleClassName="text-[var(--nk-red-subtle)]"
          />
          <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-2 lg:gap-8">
            <Reveal>
              <div className={`flex h-full flex-col gap-6 rounded-[24px] p-8 ${clayCardClasses.lavender}`}>
                <span className="flex size-11 items-center justify-center rounded-xl bg-ink/8 text-ink">
                  <MapPin className="size-5" strokeWidth={1.9} />
                </span>
                <div>
                  <h3 className="text-[22px] leading-[1.25] tracking-[-0.02em]" style={{ fontWeight: 600 }}>
                    Direct Delivery
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.55] text-ink/70">
                    After customs clearance, finished goods can be routed directly to a
                    customer, distributor, office, project location, or another selected
                    U.S. destination.
                  </p>
                </div>
                <div className="mt-auto overflow-hidden rounded-2xl bg-black/10">
                  <div className="aspect-[16/10]">
                    <img
                      src={img("/stock/direct-delivery.jpg", 720, 450)}
                      alt="Delivery worker with cartons at a truck loaded for a U.S. destination"
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex h-full flex-col rounded-[24px] border border-[var(--hairline)] bg-card p-8 md:p-10">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-ink/8 text-ink">
                    <PackageCheck className="size-5" strokeWidth={1.9} />
                  </span>
                  <span className="rounded-full bg-ink/8 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink">
                    U.S. Partner Support
                  </span>
                </div>
                <h3 className="mt-5 text-[22px] leading-[1.25] tracking-[-0.02em]" style={{ fontWeight: 600 }}>
                  Storage & Fulfillment
                </h3>
                <p className="mt-3 text-[15px] leading-[1.55] text-body">
                  Customers who do not need their full shipment immediately can route
                  goods to Capital Apparel for receiving, inventory intake, managed
                  storage, and later distribution according to an agreed schedule.
                </p>
                <ul className="mt-6 space-y-3">
                  {FULFILLMENT_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <CircleDot
                        className="mt-0.5 size-4 shrink-0"
                        style={{ color: "var(--clay-peach)" }}
                        strokeWidth={1.8}
                      />
                      <span className="text-[15px] leading-[1.5] text-body">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <p className="mt-8 max-w-[90ch] text-[13px] leading-[1.6] text-muted-foreground">
              Monitoring, climate control, insurance, specialized handling, and approved
              third party payment coordination may be reviewed according to the needs of
              each program. For detailed requirements, please contact Capital Apparel
              directly.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ---------------- Section 5: Pricing & Contact ---------------- */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid items-center gap-10 overflow-hidden rounded-[24px] bg-[var(--surface-soft)] p-8 md:grid-cols-[1.1fr_0.9fr] md:p-14 lg:p-16">
            <div>
              <h2
                className="text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.04em] text-[var(--nk-red-subtle)]"
                style={{ fontWeight: 500 }}
              >
                Services tailored to each program.
              </h2>
              <p className="mt-5 max-w-[52ch] text-[1.0625rem] leading-[1.55] text-body">
                Capital Apparel storage, warehouse handling, inventory management,
                fulfillment, and related services can be inquired via email.
              </p>
              <p className="mt-4 max-w-[52ch] text-[14px] leading-[1.6] text-muted-foreground">
                Pricing may depend on shipment volume, carton or pallet count, storage
                duration, handling needs, release frequency, destination, transportation
                method, and specialized requirements.
              </p>
            </div>

            <div className="rounded-[20px] bg-[#242220] p-8 text-white md:p-10">
              <h3 className="text-[22px] leading-[1.25] tracking-[-0.02em]" style={{ fontWeight: 600 }}>
                Request a Logistics & Fulfillment Quote
              </h3>
              <p className="mt-4 text-[14px] leading-[1.6] text-white/75">
                Capital Apparel
                <br />
                <a
                  href="mailto:customerservice@capitalapparel.com"
                  className="underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
                >
                  customerservice@capitalapparel.com
                </a>
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <CTAButton
                  href="mailto:customerservice@capitalapparel.com"
                  variant="on-color"
                  arrow
                >
                  Email Capital Apparel
                </CTAButton>
                <CTAButton
                  to="/contact"
                  variant="on-color"
                  className="bg-transparent text-white ring-1 ring-white/25 hover:bg-white/10 hover:text-white"
                >
                  Talk to NK First
                </CTAButton>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
