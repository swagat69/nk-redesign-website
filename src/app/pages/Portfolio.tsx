import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  ExternalLink,
  Layers,
  Recycle,
  Sparkles,
} from "lucide-react";
import {
  Container,
  CTAButton,
  SectionHeading,
} from "../components/site/primitives";
import { Reveal, RevealGroup } from "../components/site/anim";
import { FeatureCard } from "../components/site/FeatureCard";
import { CTASection } from "../components/site/CTASection";
import { PageHero } from "../components/site/PageHero";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { img, PHOTO } from "../lib/images";
import {
  PRODUCTS,
  PRODUCT_PAGE_FILTERS,
  type ProductGroup,
  type ProductItem,
} from "../lib/content";
import { cn } from "../components/ui/utils";
import { ScrollTrigger } from "../lib/gsap";

const PRODUCT_LAUNCH: Array<{
  group: ProductGroup;
  title: string;
  headline: string;
  body: string;
  imageProductId: string;
  featureIds: string[];
  facts: string[];
  pdfHref: string;
  surface: string;
}> = [
  {
    group: "denim",
    title: "Denim",
    headline: "Wash-controlled fit families for retail-ready bottoms.",
    body: "A focused denim story for straight, easy, and authentic-fit pants with fabric, wash, and hardware notes visible.",
    imageProductId: "pants-jeans",
    featureIds: ["pants-jeans", "denim-jackets", "denim-cargo"],
    facts: ["99% cotton / 1% elastane", "Straight, easy, and authentic fits", "Wash standards and hardware choices"],
    pdfHref: "https://drive.google.com/file/d/1lZldwlhHSugTI_j7GHdS--xu8jnv9U6m/view?usp=share_link",
    surface: "bg-[linear-gradient(135deg,#141414_0%,#211f1a_58%,#2c211c_100%)] text-white",
  },
  {
    group: "non-denim",
    title: "Non-Denim",
    headline: "Chinos, cargos, shorts, and woven ranges with specs up front.",
    body: "A quick-scan woven range covering chinos, cargos, shorts, stretch twill, canvas, hemp, and herringbone.",
    imageProductId: "chino-pants",
    featureIds: ["chino-pants", "shorts", "overalls"],
    facts: ["Cotton, hemp, ripstop, canvas, and stretch twill", "Formal, jogger, cargo, straight, and short styles", "GSM, colorway, and construction notes"],
    pdfHref: "https://drive.google.com/file/d/115ByIrXrPKgwITZpRGBGqze0ej8XqA5I/view?usp=share_link",
    surface: "bg-[linear-gradient(135deg,#141414_0%,#211f1a_58%,#2c211c_100%)] text-white",
  },
];

const FABRIC_HIGHLIGHTS = [
  {
    color: "teal" as const,
    icon: Sparkles,
    title: "Attention to detail",
    body: "Quality begins with attention to detail at every step, from design through manufacturing.",
  },
  {
    color: "peach" as const,
    icon: Layers,
    title: "High-quality fabrics",
    body: "High-grade polyester, sustainably grown crops, specialty knits, and custom fabrics sourced to spec.",
  },
  {
    color: "ochre" as const,
    icon: Recycle,
    title: "Sustainable & custom sourcing",
    body: "Factories, fabric choices, packaging, and shipping are selected with quality and sustainability in mind.",
  },
];

const CASE_STUDIES = [
  {
    photo: "/old-site/factory-qc-tees.jpg",
    client: "Trail Life customized uniforms",
    challenge: "Uniform pieces for a national youth organization, produced season after season with consistent sizing and branding.",
    proof: "A long-running program covering badges, decoration, and replenishment runs from one supplier.",
  },
  {
    photo: PHOTO.crewShirt,
    client: "Taco Bell tees",
    challenge: "Branded tees produced to buyer artwork, with approved fits and repeatable sizing across reorders.",
    proof: "Retail-recognizable merchandise work with print clarity and hand feel held consistent run after run.",
  },
  {
    photo: "/old-site/tl-belt.jpg",
    client: "TL uniform belts",
    challenge: "Accessory pieces built to match the wider uniform collection in color, hardware, and packaging.",
    proof: "Belts kept in step with the garments, so uniform kits arrive complete from one order.",
  },
];

const CASE_ACCENTS = [
  { border: "var(--clay-lavender)", color: "#5b4c84" },
  { border: "var(--clay-ochre)", color: "#6c5422" },
  { border: "var(--clay-mint)", color: "#2f5f55" },
];

function filterProduct(product: ProductItem, filter: string) {
  if (filter === "all") return true;
  return product.group === filter || product.category === filter;
}

/* Range (denim / non-denim) and category are different dimensions, so the
   pills render as two labeled clusters instead of one mixed row. */
const RANGE_FILTER_IDS = ["all", "denim", "non-denim"];
const RANGE_FILTERS = PRODUCT_PAGE_FILTERS.filter((f) => RANGE_FILTER_IDS.includes(f.id));
const CATEGORY_FILTERS = PRODUCT_PAGE_FILTERS.filter((f) => !RANGE_FILTER_IDS.includes(f.id));

function filterPillClasses(active: boolean) {
  return cn(
    "inline-flex h-10 shrink-0 items-center justify-center rounded-xl border px-4 text-[13px] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--nk-red-border)] focus-visible:ring-offset-4 focus-visible:ring-offset-background",
    active
      ? "border-[var(--nk-red)] bg-[var(--nk-red)] text-white"
      : "border-transparent bg-[var(--surface-card)] text-muted-foreground hover:border-[var(--nk-red-border)] hover:bg-[var(--nk-red-surface)] hover:text-[var(--nk-red-subtle)]",
  );
}

function ProductSpecSummary({ product }: { product: ProductItem }) {
  return (
    <dl className="mt-4 overflow-hidden rounded-[20px] border border-[var(--hairline)] bg-background/70 transition-colors duration-300 group-hover:border-[var(--nk-red-border)]">
      <div className="grid gap-1.5 px-4 py-3 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
        <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Made from
        </dt>
        <dd className="line-clamp-2 text-[11px] leading-[1.45] text-body">{product.madeFrom}</dd>
      </div>
      <div className="grid gap-1.5 border-t border-[var(--hairline)] px-4 py-3 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
        <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Finish
        </dt>
        <dd className="line-clamp-2 text-[11px] leading-[1.45] text-body">{product.finish}</dd>
      </div>
    </dl>
  );
}

function ProductLaunchCard({ launch }: { launch: (typeof PRODUCT_LAUNCH)[number] }) {
  const heroProduct = PRODUCTS.find((product) => product.id === launch.imageProductId);
  const featured = launch.featureIds
    .map((id) => PRODUCTS.find((product) => product.id === id))
    .filter(Boolean) as ProductItem[];
  const isPdfVisual = heroProduct?.photo.startsWith("/product-pdfs/");

  return (
    <article
      className={cn(
        "relative isolate flex h-full flex-col overflow-hidden rounded-[26px] p-3 shadow-[0_20px_54px_rgba(40,32,18,0.1)] md:p-4",
        launch.surface,
      )}
    >
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),transparent_42%)]"
      />

      <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]">
        {heroProduct && (
          <ImageWithFallback
            src={img(heroProduct.photo, 820, 520)}
            alt={heroProduct.name}
            className={cn(
              "absolute inset-0 size-full",
              isPdfVisual ? "object-contain p-4" : "object-cover",
            )}
          />
        )}
        <div className={cn("absolute inset-x-0 bottom-0 p-4", isPdfVisual ? "hidden" : "bg-gradient-to-t from-black/54 to-transparent")}>
          <p className="line-clamp-2 max-w-[34ch] text-[12px] leading-[1.45] text-white/84">
            {heroProduct?.madeFrom}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3 md:p-4">
        <div className="lg:min-h-[128px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
            {launch.title} collection
          </p>
          <h2 className="mt-3 max-w-[31ch] text-[clamp(1.45rem,2.15vw,1.95rem)] leading-[1.08] tracking-[-0.045em] text-white">
            {launch.headline}
          </h2>
        </div>

        <div className="mt-5 grid gap-2 lg:min-h-[126px]">
          {launch.facts.map((fact) => (
            <span
              key={fact}
              className="inline-flex min-h-10 items-center rounded-lg bg-white/[0.08] px-3 py-2 text-[12px] leading-[1.25] text-white/74"
            >
              {fact}
            </span>
          ))}
        </div>

        <div className="mt-5 grid gap-2 border-t border-white/14 pt-4">
          {featured.map((product) => (
            <a
              data-clickable-card="true"
              key={product.id}
              href="#product-range"
              className="group/link flex items-center justify-between gap-3 rounded-xl bg-white/[0.06] px-3 py-2.5 transition-colors hover:bg-white/[0.1]"
            >
              <span>
                <span className="block text-[13px] font-semibold">{product.name}</span>
                <span className="mt-0.5 block line-clamp-1 text-[11px] text-white/68">
                  {product.madeFrom}
                </span>
              </span>
              <ArrowRight className="size-4 shrink-0 transition-transform group-hover/link:translate-x-0.5" />
            </a>
          ))}
        </div>

        <div className="mt-auto pt-5">
          <a
            data-pressable="true"
            href={launch.pdfHref}
            target="_blank"
            rel="noreferrer"
            aria-label={`View ${launch.title} product sheet`}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-[14px] font-semibold text-ink transition duration-300 hover:bg-[var(--nk-red)] hover:text-white active:scale-[0.98]"
          >
            View product sheet
            <ExternalLink className="size-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

function ProductCard({ product }: { product: ProductItem }) {
  const isPdfVisual = product.photo.startsWith("/product-pdfs/");

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[30px] border border-[var(--hairline)] bg-[linear-gradient(180deg,var(--card),var(--surface-card))] p-2 transition-[border-color,box-shadow,transform] duration-500 ease-out hover:-translate-y-1 hover:border-[var(--nk-red-border)] hover:shadow-[0_18px_54px_rgba(68,55,35,0.10)]">
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-80" />
      <div className="p-2 pb-0">
        <div className={cn("relative aspect-[4/3] overflow-hidden rounded-[24px] ring-1 ring-black/[0.04]", isPdfVisual ? "bg-white" : "bg-[var(--surface-card)]")}>
          <ImageWithFallback
            src={img(product.photo, 760, 570)}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className={cn(
              "size-full transition-transform duration-700 ease-out group-hover:scale-[1.025]",
              isPdfVisual ? "object-contain p-2" : "object-cover",
            )}
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_38%,rgba(0,0,0,0.08))] opacity-70 transition-opacity duration-500 group-hover:opacity-45" />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4 md:px-6 md:pb-5">
        <div className="mb-2.5 flex items-center gap-3">
          <span className="text-[10px] font-semibold uppercase leading-none tracking-[0.18em] text-[var(--nk-red)]">
            {product.category.replace("-", " ")}
          </span>
        </div>
        <h3 className="text-[1.28rem] leading-[1.12] tracking-[-0.035em] text-ink transition-colors duration-300 group-hover:text-[var(--nk-red-subtle)]">
          {product.name}
        </h3>

        <ProductSpecSummary product={product} />

        <div className="mt-4">
          <Link
            data-pressable="true"
            to={`/contact?product=${encodeURIComponent(product.name)}`}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-[var(--hairline)] bg-background/80 text-[14px] font-semibold text-ink transition-all duration-300 hover:border-[var(--nk-red)] hover:bg-[var(--nk-red)] hover:text-white active:scale-[0.985]"
          >
            Quote this product
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Portfolio() {
  const [filter, setFilter] = useState("all");
  const visibleProducts = useMemo(
    () => PRODUCTS.filter((product) => filterProduct(product, filter)),
    [filter],
  );

  // Filtering resizes the grid by thousands of pixels; without a refresh the
  // scroll-reveal triggers below keep stale positions and can end up past the
  // page's max scroll, leaving those sections permanently invisible.
  useEffect(() => {
    // The DOM is committed by the time this effect runs, so refresh
    // synchronously (rAF can be throttled), then once more after layout
    // and images settle.
    ScrollTrigger.refresh();
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => window.clearTimeout(id);
  }, [filter]);

  return (
    <>
      <PageHero
        eyebrow="Products"
        title={<>Products built from real buyer references.</>}
        intro="Browse denim, non-denim, uniforms, tees, accessories, and private-label collections with key material and finish notes kept visible."
        photo={img(PHOTO.boutiqueRacks, 1000, 760)}
        titleClassName="text-[var(--nk-red-subtle)]"
        actions={
          <>
            <CTAButton to="#product-launch" href="#product-launch" variant="primary" arrow>
              View launch
            </CTAButton>
            <CTAButton to="#product-range" href="#product-range" variant="secondary">
              Browse range
            </CTAButton>
          </>
        }
      />

      <section id="product-launch" className="scroll-mt-24 py-14 md:py-20">
        <Container>
          <div className="mb-8">
            <SectionHeading
              title="Denim & Non-Denim."
              intro="A premium product focus area for the new bottoms range, with materials, finishes, and buyer-ready product sheets visible up front."
              titleClassName="text-[var(--nk-red-subtle)]"
              introClassName="max-w-none 2xl:whitespace-nowrap"
            />
          </div>

          <RevealGroup className="grid gap-5 lg:grid-cols-2" stagger={0.08}>
            {PRODUCT_LAUNCH.map((launch) => (
              <ProductLaunchCard key={launch.group} launch={launch} />
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section id="product-range" className="scroll-mt-24 py-16 md:py-24">
        <Container>
          <SectionHeading
            title="Browse the product range."
            intro="Filter by category and scan the essentials without losing momentum."
            titleClassName="text-[var(--nk-red)]"
            introClassName="max-w-none xl:whitespace-nowrap"
          />

          <div className="sticky top-16 z-30 mt-9 rounded-2xl border border-[var(--hairline)] bg-[var(--background)]/95 px-4 py-3 backdrop-blur-md">
            <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
              <div role="group" aria-label="Product range filters" className="flex flex-wrap items-center gap-2">
                <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Range
                </span>
                {RANGE_FILTERS.map((item) => (
                  <button
                    data-pressable="true"
                    key={item.id}
                    type="button"
                    onClick={() => setFilter(item.id)}
                    aria-pressed={filter === item.id}
                    className={filterPillClasses(filter === item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div role="group" aria-label="Product category filters" className="flex flex-wrap items-center gap-2">
                <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Category
                </span>
                {CATEGORY_FILTERS.map((item) => (
                  <button
                    data-pressable="true"
                    key={item.id}
                    type="button"
                    onClick={() => setFilter(item.id)}
                    aria-pressed={filter === item.id}
                    className={filterPillClasses(filter === item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {visibleProducts.length === 0 ? (
            <div className="mt-10 rounded-[24px] border border-dashed border-[var(--hairline)] bg-card p-12 text-center">
              <p className="text-[1.15rem] tracking-[-0.02em] text-ink" style={{ fontWeight: 500 }}>
                No products in this view yet.
              </p>
              <p className="mx-auto mt-2 max-w-[44ch] text-[14px] leading-[1.55] text-body">
                Tell us what you are looking for and we will build it to your reference.
              </p>
              <div className="mt-6 flex justify-center">
                <CTAButton to="/contact" variant="primary" arrow>
                  Request a custom quote
                </CTAButton>
              </div>
            </div>
          ) : (
            <RevealGroup className="mt-10 grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.035}>
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </RevealGroup>
          )}
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            title="The details buyers feel first."
            intro="NK positions quality as a design-to-door-delivery discipline: careful materials, ethical factories, secure packaging, and reliable shipping."
            titleClassName="text-[var(--nk-red)]"
            introClassName="max-w-none 2xl:whitespace-nowrap"
          />
          <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3">
            {FABRIC_HIGHLIGHTS.map((h) => (
              <FeatureCard key={h.title} color={h.color} icon={h.icon} title={h.title} body={h.body} />
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            title="Programs buyers already recognize."
            intro="Real examples from NK's uniform and merchandise work — delivered as repeat programs, not one-off samples."
            titleClassName="text-[var(--nk-red)]"
            introClassName="max-w-none xl:whitespace-nowrap"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {CASE_STUDIES.map((c, i) => (
              <Reveal key={c.client} delay={i * 0.05}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[var(--hairline)] bg-card transition-colors duration-300 hover:border-[var(--nk-red-border)]">
                  <div className="p-3">
                    <div className="aspect-[4/3] overflow-hidden rounded-[18px] bg-[var(--surface-card)]">
                      <ImageWithFallback
                        src={img(c.photo, 720, 540)}
                        alt={c.client}
                        loading="lazy"
                        decoding="async"
                        className="size-full object-cover transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6 pt-3 md:p-7 md:pt-4">
                    <h3 className="text-[1.35rem] leading-tight tracking-[-0.03em]" style={{ fontWeight: 500 }}>
                      {c.client}
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.55] text-body">{c.challenge}</p>
                    <p
                      className="mt-5 border-l-2 pl-4 text-[15px] leading-[1.55]"
                      style={{
                        borderColor: CASE_ACCENTS[i % CASE_ACCENTS.length].border,
                        color: CASE_ACCENTS[i % CASE_ACCENTS.length].color,
                      }}
                    >
                      {c.proof}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Products"
        title="Have a product in mind?"
        body="Share your reference, tech pack, or sketch. We will show you how we would build it and what it would take."
        primaryLabel="Request a Quote"
        secondaryLabel="See Capabilities"
        secondaryTo="/capabilities"
        photo={PHOTO.hoodieModel}
      />
    </>
  );
}
