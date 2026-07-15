import { useDeferredValue, useState } from "react";
import {
  ArrowRight,
  Factory,
  Leaf,
  Mail,
  PackageCheck,
  Ruler,
  Search,
  Shirt,
  Truck,
} from "lucide-react";
import { Container, CTAButton, SectionHeading } from "../components/site/primitives";
import { RevealGroup } from "../components/site/anim";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { PageHero } from "../components/site/PageHero";
import { cn } from "../components/ui/utils";
import { img, PHOTO } from "../lib/images";

const CATEGORIES = [
  "All",
  "Manufacturing",
  "Fabric Selection",
  "Quality",
  "Sustainability",
  "Logistics",
  "Company News",
];

const POSTS = [
  {
    title: "How to plan a custom apparel order before sampling begins",
    category: "Manufacturing",
    read: "7 min guide",
    body: "A practical buyer checklist for product specs, quantities, target price, shipment mode, and the approvals NK needs before moving from quote to proto sample.",
    icon: Factory,
    photo: PHOTO.cuttingFabric,
  },
  {
    title: "Choosing fabrics for uniforms, streetwear, and private label collections",
    category: "Fabric Selection",
    read: "6 min read",
    body: "How to compare cotton, polyester, blends, specialty knits, sustainable crops, and custom fabric development before committing to production.",
    icon: Shirt,
    photo: PHOTO.fabricWarehouse,
  },
  {
    title: "What buyer approval should look like before bulk production",
    category: "Quality",
    read: "5 min read",
    body: "Why proto samples and first run production samples reduce risk before the full purchase order moves through the factory floor.",
    icon: Ruler,
    photo: PHOTO.embroidery,
  },
  {
    title: "Daily inspection, final shipment checks, and 100% QC",
    category: "Quality",
    read: "4 min read",
    body: "A plain language breakdown of quality control from fabric through final shipment, without relying only on small random checks.",
    icon: PackageCheck,
    photo: PHOTO.sewingMachine,
  },
  {
    title: "Zero markup logistics: what buyers should ask before shipping",
    category: "Logistics",
    read: "5 min read",
    body: "Questions to clarify ocean freight, air freight, customs support, local transport, and how actual logistics costs are handled.",
    icon: Truck,
    photo: PHOTO.fabricWarehouse,
  },
  {
    title: "Sustainable materials and ethical factory choices",
    category: "Sustainability",
    read: "6 min read",
    body: "How sustainable fabrics, ethical factories, eco friendly packaging, and responsible production fit into a modern apparel collection.",
    icon: Leaf,
    photo: PHOTO.factoryFloor,
  },
  {
    title: "From Karachi roots to U.S. buyer support",
    category: "Company News",
    read: "3 min note",
    body: "A short company note on NK's family owned story, U.S. presence, overseas office, crew, and QC support for global buyers.",
    icon: Factory,
    photo: PHOTO.factoryGroup,
  },
];

export default function Blog() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const query = deferredSearch.trim().toLowerCase();
  const posts = POSTS.filter((post) => {
    const categoryMatch = category === "All" || post.category === category;
    const searchMatch =
      !query ||
      [post.title, post.category, post.body].some((value) =>
        value.toLowerCase().includes(query),
      );
    return categoryMatch && searchMatch;
  });

  return (
    <>
      <PageHero
        eyebrow="Resource Center"
        title={<>Resources for smarter apparel sourcing.</>}
        intro="Practical guides on manufacturing, fabric selection, sustainability, logistics, quality control, and NK company updates."
        photo={img(PHOTO.cuttingFabric, 1000, 760)}
        titleClassName="text-[var(--nk-red-subtle)]"
        actions={
          <>
            <CTAButton to="/contact" variant="primary" arrow>
              Ask a Manufacturing Question
            </CTAButton>
            <CTAButton to="/capabilities" variant="secondary">
              Review Capabilities
            </CTAButton>
          </>
        }
      />

      <section className="py-14 md:py-20">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              title="Articles and guides."
              intro="Use filters or search to find practical resources before starting a quote conversation."
              titleClassName="text-[var(--nk-red-subtle)]"
              introClassName="max-w-none xl:whitespace-nowrap"
              className="md:max-w-[620px]"
            />
            <div className="relative w-full md:w-[360px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search resources"
                className="h-11 w-full rounded-xl border border-[var(--hairline)] bg-card pl-11 pr-4 text-[15px] text-ink outline-none transition-colors placeholder:text-muted-soft focus:border-[var(--nk-red-border)]"
              />
            </div>
          </div>

          <div className="mt-9 flex flex-wrap gap-2">
            {CATEGORIES.map((item) => (
              <button
                data-pressable="true"
                key={item}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
                className={cn(
                  "inline-flex h-10 items-center rounded-lg px-4 text-[14px] font-medium transition-colors",
                  category === item
                    ? "bg-[var(--nk-red-subtle)] text-white"
                    : "bg-[var(--surface-card)] text-muted-foreground hover:text-[var(--nk-red-subtle)]",
                )}
              >
                {item}
              </button>
            ))}
          </div>

          <RevealGroup className="mt-10 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const Icon = post.icon;
              return (
                <article
                  data-clickable-card="true"
                  key={post.title}
                  className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[22px] border border-[var(--hairline)] bg-card transition-colors duration-300 hover:border-[var(--nk-red-border)]"
                >
                  <div className="p-3">
                    <div className="aspect-[16/10] overflow-hidden rounded-[16px] bg-[var(--surface-card)]">
                      <ImageWithFallback
                        src={img(post.photo, 680, 425)}
                        alt=""
                        className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6 pt-3">
                    <div className="flex items-center justify-between gap-4">
                      <span className="flex size-10 items-center justify-center rounded-lg bg-[var(--surface-card)] text-[var(--nk-red)]">
                        <Icon className="size-5" strokeWidth={1.9} />
                      </span>
                      <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                        {post.read}
                      </span>
                    </div>
                    <h3 className="mt-5 text-[1.25rem] leading-tight tracking-[-0.03em] text-ink transition-colors duration-300 group-hover:text-[var(--nk-red)]" style={{ fontWeight: 600 }}>
                      {post.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[14px] leading-[1.6] text-body">
                      {post.body}
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-[var(--hairline)] pt-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors duration-300 group-hover:text-[var(--nk-red)]">
                      Read guide
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </article>
              );
            })}
          </RevealGroup>

          {posts.length === 0 && (
            <div className="mt-10 rounded-[22px] border border-[var(--hairline)] bg-card p-8 text-center">
              <p className="text-[15px] text-body">
                No resources match that search yet. Try another topic or ask NK directly.
              </p>
              <CTAButton to="/contact" variant="primary" className="mt-5">
                Contact the Team
              </CTAButton>
            </div>
          )}
        </Container>
      </section>

      <section className="pb-16 md:pb-24">
        <Container>
          <div className="grid gap-8 rounded-[26px] bg-[var(--surface-soft)] p-7 md:grid-cols-[1fr_0.9fr] md:items-center md:p-10 lg:p-12">
            <div>
              <div className="flex size-11 items-center justify-center rounded-xl bg-[var(--nk-red-surface)] text-[var(--nk-red)]">
                <Mail className="size-5" strokeWidth={1.9} />
              </div>
              <h2 className="mt-6 max-w-[16ch] text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.06] tracking-[-0.04em] text-ink" style={{ fontWeight: 500 }}>
                Get practical manufacturing notes before your next project.
              </h2>
              <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.65] text-body">
                Subscribe for NK updates on materials, sampling, QC, sustainability,
                and logistics. Keep it useful, not noisy.
              </p>
            </div>
            <form className="rounded-[22px] bg-background p-5" onSubmit={(event) => event.preventDefault()}>
              <label htmlFor="blog-email" className="text-[13px] font-semibold text-ink">
                Email address
              </label>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <input
                  id="blog-email"
                  type="email"
                  placeholder="you@company.com"
                  className="h-11 min-w-0 flex-1 rounded-xl border border-[var(--hairline)] bg-card px-4 text-[15px] text-ink outline-none transition-colors placeholder:text-muted-soft focus:border-[var(--nk-red-border)]"
                />
                <button
                  data-pressable="true"
                  type="submit"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-[14px] font-semibold text-white transition-colors hover:bg-[var(--nk-red-subtle)]"
                >
                  Subscribe
                </button>
              </div>
              <p className="mt-3 text-[12px] leading-[1.5] text-muted-foreground">
                For quote requests, use the project form so NK can respond with materials,
                MOQs, timelines, and pricing.
              </p>
            </form>
          </div>
        </Container>
      </section>

      <section className="pb-16 md:pb-24">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { title: "Need the full process?", body: "Review design, sampling, production, QC, and delivery.", to: "/capabilities", action: "See Capabilities" },
              { title: "Want product proof?", body: "Browse uniforms, tees, accessories, private label, and more.", to: "/portfolio", action: "View Products" },
              { title: "Ready to talk?", body: "Send product type, quantity, timeline, and reference details.", to: "/contact", action: "Request a Quote" },
            ].map((item) => (
              <div key={item.title} className="rounded-[22px] border border-[var(--hairline)] bg-card p-7">
                <h3 className="text-[1.25rem] tracking-[-0.03em] text-ink" style={{ fontWeight: 600 }}>
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-body">
                  {item.body}
                </p>
                <CTAButton to={item.to} variant="secondary" className="mt-6">
                  {item.action}
                </CTAButton>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
