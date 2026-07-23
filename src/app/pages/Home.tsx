import {
  useRef,
} from "react";
import {
  PenTool,
  Factory,
  Truck,
  Globe,
  Handshake,
  Award,
  CalendarClock,
  UsersRound,
  MapPinned,
  MessageSquareText,
  Ruler,
  ClipboardList,
  Package,
  Quote,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router";
import {
  Container,
  CTAButton,
  SectionHeading,
  ArrowLink,
  CLAY_CYCLE,
} from "../components/site/primitives";
import { Reveal, RevealGroup } from "../components/site/anim";
import { FeatureCard } from "../components/site/FeatureCard";
import { CTASection } from "../components/site/CTASection";
import { ClientLogoCards } from "../components/site/ClientLogos";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { img, PHOTO } from "../lib/images";
import { gsap, useGSAP, EASE, EASE_EXPO, prefersReducedMotion } from "../lib/gsap";
import {
  STATS,
  PROCESS,
  DIFFERENTIATORS,
  TESTIMONIALS,
  PRODUCTS,
  type ProductItem,
} from "../lib/content";

const CAP_PREVIEW = [
  {
    color: "pink" as const,
    icon: PenTool,
    title: "Design & Prototyping",
    body: "Detailed communication, quote planning, fabric selection, proto samples, and first run approvals.",
    photo: PHOTO.cuttingFabric,
  },
  {
    color: "teal" as const,
    icon: Factory,
    title: "Manufacturing & Customization",
    body: "Uniforms and fashion apparel, including tees, polos, woven shirts, bottoms, belts, socks, aprons, overalls, and private label collections.",
    photo: PHOTO.sewingWorkshop,
  },
  {
    color: "lavender" as const,
    icon: Truck,
    title: "Logistics",
    body: "Door Deliveries are available which includes all custom needs and local transportation without any charges.",
    photo: PHOTO.fabricWarehouse,
  },
];

const DIFF_ICONS = [Handshake, Truck, Award, Factory, Globe];
const STAT_ICONS = [CalendarClock, UsersRound, Award, MapPinned];
const PROCESS_ICONS = [MessageSquareText, Ruler, Factory, ClipboardList, Package];
const PROCESS_ICON_COLORS = [
  { background: "var(--clay-lavender)", color: "var(--ink)" },
  { background: "var(--clay-peach)", color: "var(--ink)" },
  { background: "var(--clay-ochre)", color: "var(--ink)" },
  { background: "var(--clay-mint)", color: "var(--ink)" },
  { background: "var(--clay-teal)", color: "#ffffff" },
];
const HOME_PRODUCT_STORIES = [
  PRODUCTS.find((product) => product.id === "pants-jeans"),
  PRODUCTS.find((product) => product.id === "chino-pants"),
].filter(Boolean) as ProductItem[];

const HOME_PRODUCT_COPY: Record<string, { label: string; headline: string; headlineLines?: [string, string] }> = {
  "pants-jeans": {
    label: "Denim range",
    headline: "Wash controlled denim with buyer ready fit families.",
    headlineLines: ["Wash controlled denim with", "buyer ready fit families."],
  },
  "chino-pants": {
    label: "Non denim range",
    headline: "Chinos, cargos, shorts, and wovens.",
  },
};

function HomeProductStory({ product }: { product: ProductItem }) {
  const copy = HOME_PRODUCT_COPY[product.id] ?? {
    label: "Product range",
    headline: product.blurb,
  };
  const isPdfVisual = product.photo.startsWith("/product-pdfs/");

  return (
    <Link
      data-clickable-card="true"
      to="/portfolio#product-range"
      className="group flex flex-col overflow-hidden rounded-[30px] bg-ink text-white shadow-[0_22px_64px_rgba(45,34,18,0.16)] outline-none ring-1 ring-black/[0.08] transition duration-300 focus-visible:ring-2 focus-visible:ring-[var(--nk-red)]"
      aria-label={`Explore ${copy.label}`}
    >
      <div className="relative m-3 aspect-[16/10] overflow-hidden rounded-[24px] bg-white">
        <ImageWithFallback
          src={img(product.photo, 760, 520)}
          alt={product.name}
          className={`absolute inset-0 size-full ${
            isPdfVisual ? "object-contain p-5" : "object-cover"
          }`}
        />
      </div>
      <div className="flex flex-1 flex-col p-6 pt-4 md:p-7 md:pt-5">
        <div>
          <h3 className="min-h-[2em] text-[clamp(1.35rem,1.9vw,1.75rem)] leading-[1] tracking-[-0.052em] text-white">
            {copy.headlineLines ? (
              <>
                <span className="block whitespace-nowrap">{copy.headlineLines[0]}</span>
                <span className="block whitespace-nowrap">{copy.headlineLines[1]}</span>
              </>
            ) : (
              copy.headline
            )}
          </h3>
          <p className="mt-3 line-clamp-2 text-[13px] leading-[1.55] text-white/66">{product.blurb}</p>
        </div>

        <dl className="mt-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06]">
          <div className="grid gap-1.5 px-4 py-3 sm:grid-cols-[6.25rem_1fr] sm:gap-4">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/42">Made from</dt>
            <dd className="text-[12px] leading-[1.42] text-white/76">
              <span className="line-clamp-2 block">{product.madeFrom}</span>
              <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-[var(--nk-red)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-white">
                <Sparkles className="size-3" strokeWidth={2.5} />
                Fully customizable
              </span>
            </dd>
          </div>
          <div className="grid gap-1.5 border-t border-white/[0.08] px-4 py-3 sm:grid-cols-[6.25rem_1fr] sm:gap-4">
            <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/42">Finishes</dt>
            <dd className="line-clamp-2 text-[12px] leading-[1.42] text-white/76">Variety of Finishes available as per client requirements, locally or imported.</dd>
          </div>
        </dl>

        <div className="mt-4">
          <span className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-5 text-[14px] font-semibold leading-none text-ink transition-all duration-200 group-hover:bg-[var(--nk-red)] group-hover:text-white group-active:bg-[var(--nk-red)] group-active:text-white">
            View collection
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">
              &rarr;
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const q = gsap.utils.selector(heroRef);
      const timeline = gsap.timeline({ defaults: { ease: EASE_EXPO } });

      timeline
        .fromTo(q("[data-hero-bg]"), { scale: 1.05 }, { scale: 1, duration: 1.45 })
        .fromTo(
          q("[data-hero-title]"),
          { autoAlpha: 0, y: 44 },
          { autoAlpha: 1, y: 0, duration: 0.82, clearProps: "opacity,visibility,transform" },
          "-=1.08",
        )
        .fromTo(
          q("[data-hero-copy]"),
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.62, ease: EASE, clearProps: "opacity,visibility,transform" },
          "-=0.48",
        )
        .fromTo(
          q("[data-hero-actions] > *"),
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: EASE,
            stagger: 0.08,
            clearProps: "opacity,visibility,transform",
          },
          "-=0.32",
        )
        .fromTo(
          q("[data-hero-chips] > *"),
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: EASE,
            stagger: 0.1,
            clearProps: "opacity,visibility,transform",
          },
          "-=0.34",
        );
    },
    { scope: heroRef },
  );

  return (
    <>
      <section className="bg-background pt-16">
        <Container className="py-4 md:py-6">
          <div ref={heroRef}>
            <div className="relative isolate h-[calc(100svh-6rem)] min-h-[540px] overflow-hidden rounded-[26px] bg-ink text-white shadow-[0_28px_80px_rgba(68,55,35,0.16)] md:h-[calc(100svh-7rem)] md:rounded-[36px]">
              <ImageWithFallback
                data-hero-bg
                src={img(PHOTO.factoryFloor, 1800, 1100)}
                alt="Workers sewing garments on the production floor"
                className="absolute inset-0 -z-20 size-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-black/45" />

              <div className="flex h-full flex-col justify-end p-6 sm:p-8 md:p-10 lg:p-12">
                <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                  <div>
                    <h1
                      data-hero-title
                      className="max-w-[18ch] text-balance text-[clamp(2.4rem,4.6vw,4.6rem)] leading-[0.95] tracking-[-0.05em] text-white"
                      style={{ fontWeight: 500 }}
                    >
                      Custom clothing supplier for U.S. buyers and global collections.
                    </h1>

                    <p data-hero-copy className="mt-5 max-w-[52ch] text-[1rem] leading-[1.6] text-white/80 md:text-[1.1rem]">
                      NK specializes in uniforms of all types, streetwear and trendy
                      fashion, merchant based apparel, men, women, and children lines,
                      and 100% customized private labels, all made from fabric NK
                      develops to each buyer's spec.
                    </p>

                    <div data-hero-actions className="mt-7 flex flex-wrap gap-3">
                      <CTAButton
                        to="/contact"
                        variant="primary"
                        arrow
                        className="h-11 rounded-xl bg-white px-5 text-[13px] text-ink hover:bg-[var(--nk-red)] hover:text-white active:bg-[var(--nk-red)] active:text-white sm:h-12 sm:px-6 sm:text-[14px]"
                      >
                        Request a Quote
                      </CTAButton>
                      <CTAButton
                        to="/capabilities"
                        variant="secondary"
                        className="h-11 rounded-xl border-white/24 bg-black/20 px-5 text-[13px] text-white backdrop-blur-md hover:border-white/42 hover:bg-white/16 hover:text-white active:border-[var(--nk-red)] active:bg-[var(--nk-red)] active:text-white sm:h-12 sm:px-6 sm:text-[14px]"
                      >
                        View Capabilities
                      </CTAButton>
                    </div>
                  </div>

                  <div data-hero-chips className="hidden lg:flex lg:flex-col lg:gap-3">
                    {[STATS[0], STATS[1]].map((s) => (
                      <div
                        key={s.label}
                        className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-md"
                      >
                        <div className="text-[1.05rem] leading-none text-white" style={{ fontWeight: 600 }}>
                          {s.label}
                        </div>
                        <p className="mt-1.5 max-w-[26ch] text-[0.8rem] leading-[1.45] text-white/70">
                          {s.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Trusted by brands and buyers worldwide
          </p>
          <div className="mx-auto mt-7 max-w-5xl">
            <ClientLogoCards />
          </div>
          <RevealGroup className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {STATS.map((s, i) => {
              const Icon = STAT_ICONS[i % STAT_ICONS.length];
              return (
                <div
                  key={s.label}
                  className="rounded-2xl bg-[var(--surface-card)] px-6 py-7 text-center"
                >
                  <span className="mx-auto flex size-11 items-center justify-center rounded-xl bg-background text-ink">
                    <Icon className="size-5 text-[var(--nk-red)]" strokeWidth={2} />
                  </span>
                  <div
                    className="mt-4 text-[1.35rem] leading-none tracking-[-0.03em] text-ink"
                    style={{ fontWeight: 600 }}
                  >
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

      <section className="py-14 md:py-20" id="featured-products">
        <Container>
          <div className="relative isolate overflow-hidden rounded-[30px] bg-[var(--surface-soft)] p-5 shadow-[0_24px_70px_rgba(68,55,35,0.1)] md:p-8 lg:p-10">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_88%_18%,rgba(164,212,197,0.16),transparent_30%)]" />
            <div className="grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
              <div>
                <h2
                  className="max-w-[11ch] text-[clamp(2.2rem,4.6vw,4rem)] leading-[0.98] tracking-[-0.06em] text-[var(--nk-red-subtle)]"
                  style={{ fontWeight: 500 }}
                >
                  Denim & Non Denim.
                </h2>
              </div>
              <div className="lg:justify-self-end">
                <p className="max-w-[54ch] text-[1rem] leading-[1.6] text-body">
                  Explore NK's denim and non denim ranges, each produced to your specification with material and finish detail carried through to every product.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <CTAButton to="/portfolio#product-launch" variant="primary" arrow>
                    Explore products
                  </CTAButton>
                  <CTAButton to="/contact" variant="secondary">
                    Request quote
                  </CTAButton>
                </div>
              </div>
            </div>
            <RevealGroup className="mt-8 grid items-start gap-4 xl:grid-cols-2" stagger={0.06}>
              {HOME_PRODUCT_STORIES.map((product) => (
                <HomeProductStory key={product.id} product={product} />
              ))}
            </RevealGroup>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="mb-14 grid gap-5 rounded-[24px] bg-[var(--surface-soft)] p-7 md:grid-cols-[0.8fr_1.2fr] md:p-10">
            <div>
              <h2 className="text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.08] tracking-[-0.04em] text-ink" style={{ fontWeight: 500 }}>
                Finding the right apparel partner is tough.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Qualifying yarn", "Custom Designs", "Premium finished garments", "Custom Packaging", "Reliable shipping"].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-background px-5 py-4 text-[15px] font-semibold text-ink transition-colors duration-300 hover:text-[var(--nk-red)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Capabilities"
              title="Every service under accountable ownership."
              intro="From design to door delivery, NK keeps sampling, production, quality control, packaging, customs, and all logistics seamlessly connected."
              titleClassName="text-[var(--nk-red)]"
              introClassName="max-w-none lg:whitespace-nowrap"
            />
            <ArrowLink to="/capabilities" className="shrink-0">
              All capabilities
            </ArrowLink>
          </div>

          <RevealGroup className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CAP_PREVIEW.map((c) => (
              <FeatureCard
                key={c.title}
                color={c.color}
                icon={c.icon}
                title={c.title}
                body={c.body}
                photo={img(c.photo, 600, 380)}
                photoAlt={c.title}
              />
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="A clear path from brief to delivery."
            intro="Door to door delivery is available, including customs clearance and local transportation at no additional charge."
            titleClassName="text-[var(--nk-red-subtle)]"
            introClassName="max-w-none xl:whitespace-nowrap"
          />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS.map((p, i) => {
              const Icon = PROCESS_ICONS[i % PROCESS_ICONS.length];
              return (
                <div
                  key={p.id}
                  className="flex h-full flex-col rounded-[20px] border border-[var(--hairline)] bg-card p-6"
                >
                  <span
                    className="flex size-10 items-center justify-center rounded-lg"
                    style={PROCESS_ICON_COLORS[i % PROCESS_ICON_COLORS.length]}
                  >
                    <Icon className="size-5" strokeWidth={2} />
                  </span>
                  <h3 className="mt-5 text-[18px] tracking-[-0.02em]" style={{ fontWeight: 600 }}>
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.5] text-body">{p.body}</p>
                </div>
              );
            })}
          </RevealGroup>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Why NK"
            title="NK Partnerships Built to Last"
            intro="We have maintained customer relationships spanning over two decades, a reflection of the care, confidence, and trust behind every partnership."
            titleClassName="text-[var(--nk-red-subtle)]"
            introClassName="max-w-none 2xl:whitespace-nowrap"
          />
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DIFFERENTIATORS.map((d, i) => (
              <FeatureCard
                key={d.title}
                color={CLAY_CYCLE[i % CLAY_CYCLE.length]}
                icon={DIFF_ICONS[i % DIFF_ICONS.length]}
                title={d.title}
                body={d.body}
              />
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="Client proof"
            title="Live site proof, not filler testimonials."
            intro="The redesigned proof cards use client names and product examples surfaced on NK's current website."
            titleClassName="text-[var(--nk-red-subtle)]"
            introClassName="max-w-none xl:whitespace-nowrap"
          />
          <RevealGroup className="mt-12 grid gap-5 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="flex h-full flex-col rounded-[20px] bg-[var(--surface-card)] p-7"
              >
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
          <div className="mt-10 flex justify-center">
            <ArrowLink to="/about">Read client success stories</ArrowLink>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
