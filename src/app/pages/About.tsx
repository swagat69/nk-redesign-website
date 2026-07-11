import {
  CalendarClock,
  UsersRound,
  Award,
  MapPinned,
  Flag,
  Factory,
  Building2,
  Package,
  Globe,
  ShieldCheck,
  Eye,
  Leaf,
  Handshake,
  Check,
  X,
  Quote,
} from "lucide-react";
import {
  Container,
  SectionHeading,
} from "../components/site/primitives";
import { Reveal, RevealGroup } from "../components/site/anim";
import { CTASection } from "../components/site/CTASection";
import { PageHero } from "../components/site/PageHero";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { img, PHOTO } from "../lib/images";
import { STATS, TESTIMONIALS, DIFFERENTIATORS } from "../lib/content";

const VALUES = [
  { title: "Quality", body: "NK checks work from fabric through final shipment rather than relying on small final random checks." },
  { title: "Transparency", body: "Freight, customs, and local transportation support are coordinated without extra NK mark-up." },
  { title: "Ethical manufacturing", body: "Factory partners are selected for quality, sustainable practices, and responsible production." },
  { title: "Client partnership", body: "The Trail Life relationship shows the kind of long-term trust NK wants to build." },
];

const JOURNEY = [
  { marker: "Karachi", title: "Small warehouse roots", body: "NK's story begins in Karachi and grows into a custom clothing supplier for international buyers." },
  { marker: "2000", title: "Long-running buyer support", body: "Since 2000, NK has helped U.S. and European businesses with overseas and local production matters." },
  { marker: "U.S. base", title: "Stateside service", body: "A U.S. presence keeps buyers close to quotes, approvals, progress updates, timelines, and logistics." },
  { marker: "Overseas", title: "Production and QC office", body: "An overseas office, crew, and QC inspectors connect buyer communication with factory execution." },
  { marker: "Now", title: "Design to delivery", body: "Sampling, production, packaging, freight, customs, local transport, and QC move in one accountable flow." },
];

const COMPARISON = [
  { label: "Family-owned accountability", nk: true, them: false },
  { label: "Zero mark-up freight, customs, and local transport", nk: true, them: false },
  { label: "100% final quality control", nk: true, them: false },
  { label: "U.S.-based service team", nk: true, them: false },
  { label: "Sustainable material options", nk: true, them: false },
  { label: "Hidden brokerage and handling fees", nk: false, them: true },
];

const STAT_ICONS = [CalendarClock, UsersRound, Award, MapPinned];
const JOURNEY_ICONS = [Flag, Factory, Building2, Package, Globe];
const VALUE_ICONS = [ShieldCheck, Eye, Leaf, Handshake];
const VALUE_ACCENTS = [
  { background: "var(--clay-lavender)", color: "var(--ink)" },
  { background: "var(--clay-peach)", color: "var(--ink)" },
  { background: "var(--clay-mint)", color: "var(--ink)" },
  { background: "var(--clay-ochre)", color: "var(--ink)" },
];
const JOURNEY_ACCENTS = [
  { background: "var(--clay-lavender)", color: "var(--ink)", text: "#5b4c84" },
  { background: "var(--clay-peach)", color: "var(--ink)", text: "#805038" },
  { background: "var(--clay-ochre)", color: "var(--ink)", text: "#6c5422" },
  { background: "var(--clay-teal)", color: "#ffffff", text: "var(--clay-teal)" },
  { background: "var(--clay-mint)", color: "var(--ink)", text: "#2f5f55" },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About & Clients"
        title={<>Built on family ownership and buyer confidence.</>}
        intro="NK is a family-owned, U.S.-based custom clothing supplier with overseas production, crew, and QC support for buyers in the United States, Europe, and beyond."
        photo={img(PHOTO.factoryGroup, 1000, 760)}
        titleClassName="text-[var(--nk-red-subtle)]"
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div>
                <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.1] tracking-[-0.04em] text-[var(--nk-red-subtle)]" style={{ fontWeight: 500 }}>
                  Operating since 2000 with family accountability.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-5 text-[1.0625rem] leading-[1.7] text-body">
                <p>
                  NK International began from small warehouse roots in Karachi and
                  developed into a custom clothing supplier for U.S. and European
                  business owners. The company has been helping buyers with overseas
                  and local production matters since 2000.
                </p>
                <p>
                  Today, NK pairs U.S.-based service with an overseas office, crew,
                  and QC inspectors. That structure lets buyers stay close to
                  communication, samples, purchase orders, production updates,
                  quality checks, freight, customs, and delivery.
                </p>
                <p>
                  The redesigned site keeps that story close to the proof: zero
                  mark-up logistics support, 100% inspection, sustainable materials,
                  ethical factories, and long-term client relationships such as Trail Life.
                </p>
              </div>
            </Reveal>
          </div>

          <RevealGroup className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
            {STATS.map((s, i) => {
              const Icon = STAT_ICONS[i % STAT_ICONS.length];
              return (
                <div key={s.label} className="rounded-2xl bg-[var(--surface-card)] px-6 py-7 text-center">
                  <span className="mx-auto flex size-11 items-center justify-center rounded-xl bg-background text-ink">
                    <Icon className="size-5 text-[var(--nk-red)]" strokeWidth={2} />
                  </span>
                  <div className="mt-4 text-[1.25rem] leading-none tracking-[-0.03em] text-ink" style={{ fontWeight: 600 }}>
                    {s.label}
                  </div>
                  <p className="mx-auto mt-2 max-w-[24ch] text-[14px] leading-[1.45] text-body">
                    {s.body}
                  </p>
                </div>
              );
            })}
          </RevealGroup>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Mission & Values"
            title="What we do not compromise on."
            titleClassName="text-[var(--nk-red-subtle)]"
          />
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => {
              const Icon = VALUE_ICONS[i % VALUE_ICONS.length];
              return (
                <div key={v.title} className="rounded-[20px] border border-[var(--hairline)] bg-card p-7">
                  <span
                    className="flex size-11 items-center justify-center rounded-xl"
                    style={VALUE_ACCENTS[i % VALUE_ACCENTS.length]}
                  >
                    <Icon className="size-5" strokeWidth={1.9} />
                  </span>
                  <h3 className="mt-5 text-[1.2rem] tracking-[-0.02em] text-ink" style={{ fontWeight: 600 }}>
                    {v.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.6] text-body">{v.body}</p>
                </div>
              );
            })}
          </RevealGroup>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Journey"
            title="From a Karachi workshop to a global supplier."
            titleClassName="text-[var(--nk-red-subtle)]"
          />
          <ol className="mt-12">
            {JOURNEY.map((j, i) => {
              const Icon = JOURNEY_ICONS[i % JOURNEY_ICONS.length];
              const accent = JOURNEY_ACCENTS[i % JOURNEY_ACCENTS.length];
              return (
                <Reveal key={j.title} delay={i * 0.05}>
                  <li className="grid grid-cols-[auto_1fr] gap-6 border-t border-[var(--hairline)] py-7 md:grid-cols-[160px_1fr] md:gap-10">
                    <div
                      className="flex items-center gap-3"
                      style={{ color: accent.text }}
                    >
                      <span
                        className="flex size-10 items-center justify-center rounded-xl"
                        style={{ background: accent.background, color: accent.color }}
                      >
                        <Icon className="size-5" strokeWidth={2} />
                      </span>
                      <span className="hidden text-[12px] font-semibold uppercase tracking-[0.12em] md:inline">
                        {j.marker}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-[1.25rem] tracking-[-0.02em]" style={{ fontWeight: 600 }}>{j.title}</h3>
                      <p className="mt-2 max-w-[60ch] text-[15px] leading-[1.6] text-body">{j.body}</p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Leadership & Team"
            title="U.S. service and overseas production, connected daily."
            intro="The live website emphasizes NK's combined U.S. base and overseas office, making it clear who supports approvals, production, quality, freight, customs, and delivery."
            titleClassName="text-[var(--nk-red-subtle)]"
          />
          <RevealGroup className="mt-12 grid gap-5 md:grid-cols-2">
            {[
              { place: "New Jersey, USA", role: "Client Service & Sales", body: "Your day-to-day contact for quotes, approvals, timelines, and logistics in your timezone.", photo: PHOTO.storeInterior, color: "lavender" as const },
              { place: "Karachi, Pakistan", role: "Production & Quality", body: "Pattern makers, line supervisors, and QC inspectors who turn approved samples into bulk reality.", photo: PHOTO.sewingWorkshop, color: "peach" as const },
            ].map((t) => (
              <div key={t.place} className={`overflow-hidden rounded-[24px] p-3 ${t.color === "lavender" ? "bg-[var(--clay-lavender)]" : "bg-[var(--clay-peach)]"}`}>
                <div className="overflow-hidden rounded-[18px] bg-black/10">
                  <div className="aspect-[16/9]">
                    <ImageWithFallback src={img(t.photo, 800, 450)} alt={t.place} className="size-full object-cover" />
                  </div>
                </div>
                <div className="px-5 py-6 text-ink">
                  <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/70">{t.role}</div>
                  <h3 className="mt-2 text-[1.4rem] tracking-[-0.02em]" style={{ fontWeight: 600 }}>{t.place}</h3>
                  <p className="mt-3 text-[15px] leading-[1.55] text-ink/80">{t.body}</p>
                </div>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Differentiators"
            title="Why buyers choose NK."
            titleClassName="text-[var(--nk-red-subtle)]"
          />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DIFFERENTIATORS.map((d) => (
              <div key={d.title} className="rounded-[20px] border border-[var(--hairline)] bg-card p-7">
                <h3 className="text-[1.2rem] tracking-[-0.02em]" style={{ fontWeight: 600 }}>{d.title}</h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-body">{d.body}</p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Why Choose NK"
            title="NK vs. a generic manufacturer."
            intro="The difference between a vendor and a partner shows up in accountability, pricing, QC, and support."
            titleClassName="text-[var(--nk-red-subtle)]"
          />
          <div className="mt-12 overflow-hidden rounded-[24px] border border-[var(--hairline)] bg-card">
            <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-[var(--hairline)] bg-[var(--surface-card)] px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.1em] text-muted-foreground md:gap-8 md:px-8">
              <span>Capability</span>
              <span className="w-16 text-center text-[var(--nk-red-subtle)]">NK</span>
              <span className="w-16 text-center">Generic</span>
            </div>
            {COMPARISON.map((row) => (
              <div key={row.label} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-[var(--hairline)] px-6 py-4 last:border-0 md:gap-8 md:px-8">
                <span className="text-[15px]">{row.label}</span>
                <span className="flex w-16 justify-center text-[var(--nk-red)]" aria-label={row.nk ? "Yes" : "No"}>
                  {row.nk ? <Check className="size-5" strokeWidth={2.2} aria-hidden /> : <X className="size-5" strokeWidth={2.2} aria-hidden />}
                </span>
                <span className="flex w-16 justify-center text-muted-foreground" aria-label={row.them ? "Yes" : "No"}>
                  {row.them ? <Check className="size-5" strokeWidth={2.2} aria-hidden /> : <X className="size-5" strokeWidth={2.2} aria-hidden />}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Clients & Proof"
            title="Buyer proof from the live NK site."
            intro="Trail Life, Taco Bell, and Dollar General appear across the current NK website as credibility markers, with Trail Life called out as a 10+ year relationship."
            titleClassName="text-[var(--nk-red-subtle)]"
          />
        </Container>
        <Container>
          <RevealGroup className="mt-12 grid gap-5 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="flex h-full flex-col rounded-[20px] bg-[var(--surface-card)] p-7">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-ink text-[15px] font-semibold text-white">
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <div className="text-[15px] font-semibold text-ink">{t.name}</div>
                    <div className="text-[13px] text-muted-foreground">{t.role}</div>
                  </div>
                  <Quote className="ml-auto size-6 text-[var(--nk-red)]" strokeWidth={1.8} />
                </div>
                <p className="mt-5 flex-1 text-[16px] leading-[1.55] text-body-strong">
                  {t.quote}
                </p>
              </figure>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <CTASection
        eyebrow="Meet with Our Team"
        title="Start with a clear manufacturing conversation."
        body="Tell us about the product, quantity, timeline, fabric direction, and references. We will help map the right path from sample to delivery."
        primaryLabel="Start Your Project"
        secondaryLabel="View Products"
        secondaryTo="/portfolio"
        photo={PHOTO.foldedShirts}
      />
    </>
  );
}
