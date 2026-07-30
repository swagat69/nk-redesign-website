import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Container, SectionHeading } from "./primitives";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { img } from "../../lib/images";
import { cn } from "../ui/utils";

/* Curated selection from the client's 2026-07 photo batch — a showcase, not
   the catalog. Kept to strong, distinct pieces per family so the strip stays
   easy on the eyes; the full set lives on the Products page. */
const SHOWCASE_GROUPS = [
  {
    label: "Polos",
    items: [
      { id: "polo-cream-tipped", name: "Cream Tipped Polo" },
      { id: "polo-cream-contrast", name: "Contrast Shoulder Polo" },
      { id: "polo-blue-print", name: "Printed Performance Polo" },
      { id: "polo-pique-red", name: "Pique Polo, Red" },
    ],
  },
  {
    label: "Woven shirts",
    items: [
      { id: "woven-blue-gingham", name: "Blue Gingham Shirt" },
      { id: "woven-green-check", name: "Green Check Shirt" },
      { id: "woven-plaid-flannel", name: "Plaid Flannel Shirt" },
      { id: "woven-white-oxford", name: "White Oxford Shirt" },
    ],
  },
  {
    label: "Knits & tees",
    items: [
      { id: "henley-ls-black", name: "Long Sleeve Henley" },
      { id: "henley-tee-green", name: "Henley Tee, Green" },
      { id: "tee-vneck-blue", name: "V Neck Tee" },
      { id: "tank-graphic-navy", name: "Graphic Tank" },
    ],
  },
  {
    label: "Outerwear",
    items: [
      { id: "hoodie-quilted-olive", name: "Quilted Hoodie, Olive" },
      { id: "hoodie-quilted-grey", name: "Quilted Hoodie, Grey" },
      { id: "hoodie-zip-navy", name: "Zip Hoodie, Navy" },
    ],
  },
  {
    label: "Bottoms",
    items: [
      { id: "shorts-cargo-olive", name: "Cargo Shorts, Olive" },
      { id: "pants-cargo-brown", name: "Cargo Pants, Brown" },
      { id: "pants-linen-khaki", name: "Linen Pants, Khaki" },
      { id: "shorts-sweat-set-a", name: "Sweat Shorts Range" },
    ],
  },
];

export function ClientShowcase() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [activeGroup, setActiveGroup] = useState(0);
  const groupRefs = useRef<(HTMLDivElement | null)[]>([]);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
    // Track which group is under the left edge for the pill state.
    let current = 0;
    groupRefs.current.forEach((g, i) => {
      if (g && g.offsetLeft - el.scrollLeft < el.clientWidth * 0.33) current = i;
    });
    setActiveGroup(current);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const nudge = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.75, behavior: "smooth" });
  };

  const jumpToGroup = (i: number) => {
    const el = scrollerRef.current;
    const g = groupRefs.current[i];
    if (!el || !g) return;
    el.scrollTo({ left: g.offsetLeft - 4, behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-24" id="client-showcase">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Production gallery"
            title="Made on NK's floor."
            intro="A curated look at recent client production, browse by product family or open the full range."
            titleClassName="text-[var(--nk-red-subtle)]"
          />
          <div className="flex shrink-0 items-center gap-2">
            <button
              data-pressable="true"
              type="button"
              aria-label="Scroll showcase left"
              onClick={() => nudge(-1)}
              disabled={!canPrev}
              className="flex size-11 items-center justify-center rounded-xl border border-[var(--hairline)] bg-card text-ink transition-colors hover:border-[var(--nk-red)] hover:text-[var(--nk-red)] disabled:opacity-35 disabled:hover:border-[var(--hairline)] disabled:hover:text-ink"
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              data-pressable="true"
              type="button"
              aria-label="Scroll showcase right"
              onClick={() => nudge(1)}
              disabled={!canNext}
              className="flex size-11 items-center justify-center rounded-xl border border-[var(--hairline)] bg-card text-ink transition-colors hover:border-[var(--nk-red)] hover:text-[var(--nk-red)] disabled:opacity-35 disabled:hover:border-[var(--hairline)] disabled:hover:text-ink"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          {SHOWCASE_GROUPS.map((group, i) => (
            <button
              data-pressable="true"
              key={group.label}
              type="button"
              onClick={() => jumpToGroup(i)}
              aria-pressed={activeGroup === i}
              className={cn(
                "inline-flex h-9 items-center rounded-full px-4 text-[13px] font-semibold transition-colors",
                activeGroup === i
                  ? "bg-[var(--nk-red)] text-white"
                  : "bg-[var(--surface-card)] text-muted-foreground hover:text-[var(--nk-red-subtle)]",
              )}
            >
              {group.label}
            </button>
          ))}
        </div>
      </Container>

      {/* Full-bleed scroller; padding keeps the first/last card aligned to the
          container edges. */}
      <div
        ref={scrollerRef}
        className="mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] md:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] [&::-webkit-scrollbar]:hidden"
      >
        {SHOWCASE_GROUPS.map((group, gi) => (
          <div
            key={group.label}
            ref={(node) => {
              groupRefs.current[gi] = node;
            }}
            className="flex shrink-0 gap-4"
          >
            {group.items.map((item, ii) => (
              <Link
                data-clickable-card="true"
                key={item.id}
                to="/portfolio#product-range"
                className="group relative w-64 shrink-0 snap-start overflow-hidden rounded-[24px] bg-[var(--surface-card)] outline-none ring-1 ring-black/[0.05] transition-shadow duration-300 hover:shadow-[0_18px_44px_rgba(68,55,35,0.14)] focus-visible:ring-2 focus-visible:ring-[var(--nk-red)] sm:w-72"
                aria-label={`${item.name} in the product range`}
              >
                <div className="aspect-[3/4] overflow-hidden bg-white">
                  <ImageWithFallback
                    src={img(`/client-gallery/${item.id}.webp`, 640, 854)}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                  />
                </div>
                {ii === 0 && (
                  <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                    {group.label}
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/60 via-black/25 to-transparent p-4 pt-10">
                  <span className="text-[14px] font-semibold text-white">{item.name}</span>
                  <ArrowRight className="size-4 shrink-0 text-white/80 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
