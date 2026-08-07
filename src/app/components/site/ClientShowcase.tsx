import { useRef, useState } from "react";
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

// Flattened deck the carousel steps through; each entry keeps its group index
// so the wheel and dots can highlight the family under the center card.
const FLAT_ITEMS = SHOWCASE_GROUPS.flatMap((group, gi) =>
  group.items.map((item) => ({ ...item, group: group.label, gi })),
);
const GROUP_STARTS = SHOWCASE_GROUPS.map((group) =>
  FLAT_ITEMS.findIndex((item) => item.group === group.label),
);

// Ring layout: 5 cards visible (center + 2 each side). Each ring steps a bit
// less than the last so the deck reads as a stack receding to the edges.
const RING_X = [0, 85, 150]; // translateX % of card width per |offset|
const RING_SCALE = [1, 0.8, 0.64];
const RING_OPACITY = [1, 1, 0.75];

export function ClientShowcase() {
  const [active, setActive] = useState(1);
  const touchX = useRef<number | null>(null);

  const activeGroup = FLAT_ITEMS[active].gi;
  const nudge = (dir: 1 | -1) =>
    setActive((a) => Math.min(FLAT_ITEMS.length - 1, Math.max(0, a + dir)));

  return (
    <section className="py-16 md:py-24" id="client-showcase">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Production gallery"
            title="Made on NK's floor."
            intro="A curated look at recent client production, browse by product family or open the full range."
            titleClassName="text-[var(--nk-red-subtle)]"
          />
          <div className="shrink-0 text-[15px] font-semibold tracking-[0.02em] text-ink md:pb-1">
            {String(active + 1).padStart(2, "0")}
            <span className="text-muted-foreground/60"> / {FLAT_ITEMS.length}</span>
          </div>
        </div>

        <div className="mt-8 grid items-center gap-8 md:mt-12 lg:grid-cols-[1fr_240px] lg:gap-4 xl:grid-cols-[1fr_280px]">
          {/* Stacked carousel: center card full size, neighbors scaled back
              and tucked slightly underneath, edges clipped at the wrapper. */}
          <div className="min-w-0 lg:order-first">
            <div
              className="relative -mx-5 overflow-hidden sm:mx-0"
              aria-roledescription="carousel"
              aria-label="Production gallery carousel"
              onTouchStart={(e) => {
                touchX.current = e.touches[0].clientX;
              }}
              onTouchEnd={(e) => {
                if (touchX.current == null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                if (Math.abs(dx) > 40) nudge(dx < 0 ? 1 : -1);
                touchX.current = null;
              }}
            >
              <div className="relative h-[340px] sm:h-[400px] md:h-[460px]">
                {FLAT_ITEMS.map((item, i) => {
                  const offset = i - active;
                  const dist = Math.abs(offset);
                  const ring = Math.min(dist, 2);
                  const dir = Math.sign(offset);
                  const isCenter = offset === 0;
                  const shown = dist <= 2;
                  const card = (
                    <>
                      <div className="aspect-[3/4] overflow-hidden bg-white">
                        <ImageWithFallback
                          src={img(`/client-gallery/${item.id}.webp`, 640, 854)}
                          alt={item.name}
                          // Eager-load the visible window plus two lookahead
                          // cards each side so a newly centered image never
                          // pops in half-loaded mid-transition.
                          loading={Math.abs(offset) <= 3 ? "eager" : "lazy"}
                          decoding="async"
                          className="size-full object-cover"
                        />
                      </div>
                      <div
                        className={cn(
                          "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent p-4 pt-10 transition-opacity duration-500",
                          isCenter ? "opacity-100" : "opacity-0",
                        )}
                      >
                        <span className="text-[14px] font-semibold text-white">
                          {item.name}
                        </span>
                      </div>
                    </>
                  );
                  const shared = {
                    "aria-hidden": !isCenter,
                    className: cn(
                      "group absolute left-1/2 top-1/2 block w-[230px] overflow-hidden rounded-[24px] bg-[var(--surface-card)] outline-none ring-1 ring-black/[0.05] transition-[transform,opacity,box-shadow] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform sm:w-[270px] md:w-[310px]",
                      isCenter
                        ? "shadow-[0_16px_40px_rgba(68,55,35,0.13)] focus-visible:ring-2 focus-visible:ring-[var(--nk-red)]"
                        : "cursor-pointer shadow-[0_8px_22px_rgba(68,55,35,0.07)]",
                      !shown && "pointer-events-none",
                    ),
                    style: {
                      transform: `translate(-50%, -50%) translateX(${dir * RING_X[ring]}%) scale(${RING_SCALE[ring]})`,
                      opacity: shown ? RING_OPACITY[ring] : 0,
                      zIndex: 30 - ring * 10,
                    },
                  };
                  // Always the same element type so React never remounts a
                  // card when it becomes/stops being the center one — a
                  // remount would skip the CSS transition and pop in place.
                  return (
                    <Link
                      key={item.id}
                      to="/portfolio#product-range"
                      tabIndex={isCenter ? 0 : -1}
                      aria-label={`${item.name} in the product range`}
                      onClick={(e) => {
                        if (!isCenter) {
                          e.preventDefault();
                          setActive(i);
                        }
                      }}
                      {...shared}
                    >
                      {card}
                    </Link>
                  );
                })}
              </div>

              <button
                data-pressable="true"
                type="button"
                aria-label="Previous product"
                onClick={() => nudge(-1)}
                disabled={active === 0}
                className="absolute left-3 top-1/2 z-40 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--hairline)] bg-card/90 text-ink transition-colors hover:border-[var(--nk-red)] hover:text-[var(--nk-red)] disabled:opacity-35 disabled:hover:border-[var(--hairline)] disabled:hover:text-ink sm:left-0"
              >
                <ArrowLeft className="size-5" />
              </button>
              <button
                data-pressable="true"
                type="button"
                aria-label="Next product"
                onClick={() => nudge(1)}
                disabled={active === FLAT_ITEMS.length - 1}
                className="absolute right-3 top-1/2 z-40 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--hairline)] bg-card/90 text-ink transition-colors hover:border-[var(--nk-red)] hover:text-[var(--nk-red)] disabled:opacity-35 disabled:hover:border-[var(--hairline)] disabled:hover:text-ink sm:right-0"
              >
                <ArrowRight className="size-5" />
              </button>
            </div>

            <div className="mt-6 flex justify-center gap-1.5">
              {SHOWCASE_GROUPS.map((group, i) => (
                <button
                  data-pressable="true"
                  key={group.label}
                  type="button"
                  aria-label={`Jump to ${group.label}`}
                  onClick={() => setActive(GROUP_STARTS[i])}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === activeGroup
                      ? "w-7 bg-ink"
                      : "w-3.5 bg-ink/20 hover:bg-ink/40",
                  )}
                />
              ))}
            </div>
          </div>

          {/* Wheel-style family picker: active label in red lettering,
              neighbors fading with distance, like a vertical option wheel. */}
          <ul className="flex flex-row flex-wrap items-center justify-center gap-x-5 gap-y-1 lg:flex-col lg:items-end lg:gap-3">
            {SHOWCASE_GROUPS.map((group, i) => {
              const dist = Math.abs(i - activeGroup);
              return (
                <li key={group.label}>
                  <button
                    data-pressable="true"
                    type="button"
                    onClick={() => setActive(GROUP_STARTS[i])}
                    aria-pressed={i === activeGroup}
                    className={cn(
                      "py-1 text-[16px] font-semibold tracking-[-0.01em] transition-all duration-500 ease-out md:text-[18px] lg:text-[22px] xl:text-[24px]",
                      i === activeGroup
                        ? "text-[var(--nk-red)] lg:text-[26px] xl:text-[30px]"
                        : "text-ink hover:opacity-70",
                    )}
                    style={
                      i === activeGroup
                        ? undefined
                        : { opacity: dist === 1 ? 0.4 : 0.16 }
                    }
                  >
                    {group.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
