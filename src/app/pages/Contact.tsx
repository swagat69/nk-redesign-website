import { useState } from "react";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Upload,
  ChevronDown,
} from "lucide-react";
import {
  Container,
  SectionHeading,
  CTAButton,
} from "../components/site/primitives";
import { cn } from "../components/ui/utils";

const ROUTES = [
  { id: "project", label: "New Project" },
  { id: "capabilities", label: "Capabilities Question" },
  { id: "general", label: "General Inquiry" },
];

const PRODUCT_TYPES = [
  "Uniforms",
  "T-Shirts & Polos",
  "Shirts & Blouses",
  "Outerwear / Hoodies",
  "Pants & Jeans",
  "Chef Coats & Aprons",
  "Shorts / Socks / Overalls",
  "Accessories",
  "Private Label / Other",
];

const OFFICES = [
  {
    country: "United States",
    address: "1200 Harbor Blvd, Suite 210\nWeehawken, NJ 07086",
    phone: "+1 (201) 555-1234",
    email: "sales@nkinternationalusa.com",
  },
  {
    country: "Pakistan",
    address: "Plot 14, Korangi Industrial Area\nKarachi 74900",
    phone: "+92 21 555 0199",
    email: "production@nkinternationalusa.com",
  },
];

const FAQS = [
  {
    q: "What are your minimum order quantities?",
    a: "MOQs vary by product, fabric, decoration, and sourcing. Share your project details and we will confirm exact minimums in the quote.",
  },
  {
    q: "How does sampling work?",
    a: "We develop or review the tech pack, produce a physical prototype, refine fit, and approve a gold seal sample before bulk production.",
  },
  {
    q: "What are typical lead times?",
    a: "Sampling and bulk production timelines depend on volume, decoration, and materials. Every quote includes a clear production schedule.",
  },
  {
    q: "Which materials can you source?",
    a: "Combed and ringspun cotton, performance polyester, blends, fleece, twills, specialty knits, organic options, recycled materials, and custom fabric development.",
  },
  {
    q: "How do you handle quoting?",
    a: "Send product type, quantity, target timeline, and any reference or tech pack. We return materials, MOQs, pricing, and lead time within a few business days.",
  },
];

export default function Contact() {
  const [route, setRoute] = useState("project");
  const [fileName, setFileName] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // "Quote this product" links arrive as /contact?product=<name>; preselect
  // the matching category or carry the name into the description.
  const [searchParams] = useSearchParams();
  const productParam = searchParams.get("product") ?? "";
  const matchedType = PRODUCT_TYPES.find(
    (p) => p.toLowerCase() === productParam.toLowerCase(),
  );
  const descriptionPrefill = productParam && !matchedType
    ? `Quote request for: ${productParam}.\n`
    : undefined;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Inquiry sent", {
      description: "Thanks - our team will reply within a few business days with next steps.",
    });
    (e.target as HTMLFormElement).reset();
    setFileName(null);
  };

  const inputCls =
    "h-11 w-full rounded-xl border border-[var(--hairline)] bg-background px-4 text-[15px] text-ink outline-none transition-colors placeholder:text-muted-soft focus:border-[var(--nk-red-border)]";
  const labelCls = "mb-2 block text-[13px] font-semibold text-ink";

  return (
    <>
      <section className="bg-background pt-16">
        <Container className="py-14 md:py-20">
          <h1 className="max-w-[20ch] text-[clamp(2.5rem,5.4vw,4.5rem)] leading-[1.02] tracking-[-0.05em] text-[var(--nk-red-subtle)]" style={{ fontWeight: 500 }}>
            Request a quote or start a project.
          </h1>
          <p className="mt-6 max-w-[54ch] text-[1.125rem] leading-[1.55] text-body">
            Tell us what you are making. The more detail you share, the faster we can
            come back with materials, MOQs, timeline, and transparent pricing.
          </p>
        </Container>
      </section>

      <section className="pb-16 md:pb-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
            <div>
              <div className="flex flex-wrap gap-2">
                {ROUTES.map((r) => (
                  <button
                    data-pressable="true"
                    key={r.id}
                    onClick={() => setRoute(r.id)}
                    aria-pressed={route === r.id}
                    className={cn(
                      "inline-flex h-10 items-center rounded-lg px-4 text-[14px] font-medium transition-colors",
                      route === r.id
                        ? "bg-[var(--nk-red-subtle)] text-white"
                        : "bg-[var(--surface-card)] text-muted-foreground hover:text-[var(--nk-red-subtle)]",
                    )}
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="mt-7 rounded-[24px] border border-[var(--hairline)] bg-card p-6 md:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelCls} htmlFor="name">Full name *</label>
                    <input id="name" name="name" required className={inputCls} placeholder="Jordan Avery" />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="email">Email *</label>
                    <input id="email" name="email" type="email" required className={inputCls} placeholder="you@brand.com" />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="company">Company</label>
                    <input id="company" name="company" className={inputCls} placeholder="Brand or business name" />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="product">Product type</label>
                    <div className="relative">
                      <select id="product" name="product" className={cn(inputCls, "appearance-none pr-10")} defaultValue={matchedType ?? ""}>
                        <option value="" disabled>Select a category</option>
                        {PRODUCT_TYPES.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="quantity">Estimated quantity</label>
                    <input id="quantity" name="quantity" className={inputCls} placeholder="Estimated run size" />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="timeline">Target timeline</label>
                    <input id="timeline" name="timeline" className={inputCls} placeholder="Target launch window" />
                  </div>
                </div>

                <div className="mt-5">
                  <label className={labelCls} htmlFor="description">Project description *</label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={5}
                    defaultValue={descriptionPrefill}
                    className="w-full resize-y rounded-xl border border-[var(--hairline)] bg-background px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-muted-soft focus:border-[var(--nk-red-border)]"
                    placeholder="Tell us about the product, fabrics, decoration, references, and anything else that helps us quote accurately."
                  />
                </div>

                <div className="mt-5">
                  <label className={labelCls}>Attach tech pack or reference</label>
                  <label
                    data-clickable-card="true"
                    htmlFor="file"
                    className="group flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-[var(--hairline)] bg-background px-4 py-4 text-[14px] text-muted-foreground transition-colors hover:border-[var(--nk-red-border)] hover:text-[var(--nk-red-subtle)]"
                  >
                    <Upload className="size-5 text-[var(--nk-red)] transition-colors" />
                    <span>{fileName ?? "Upload a PDF, image, or tech pack (optional)"}</span>
                    <input id="file" name="file" type="file" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)} />
                  </label>
                </div>

                <input type="hidden" name="inquiryType" value={route} />

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <button data-pressable="true" type="submit" className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-[14px] font-semibold text-primary-foreground transition-all hover:bg-[var(--nk-red-subtle)] active:scale-[0.98] active:bg-[var(--nk-red)]">
                    Send Inquiry
                  </button>
                  <span className="text-[14px] text-muted-foreground">We typically reply within a few business days.</span>
                </div>
              </form>
            </div>

            <aside className="space-y-5">
              <div className="rounded-[20px] bg-[var(--clay-teal)] p-7 text-white">
                <h3 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-white/70">Support Channels</h3>
                <ul className="mt-5 grid gap-4">
                  <li className="grid grid-cols-[32px_minmax(0,1fr)] items-start gap-4">
                    <span className="flex h-8 w-8 items-center justify-center text-[var(--clay-mint)]">
                      <Phone className="size-5 shrink-0" />
                    </span>
                    <div>
                      <a href="tel:+12015551234" className="inline-flex min-h-8 items-center hover:underline">+1 (201) 555-1234</a>
                      <p className="text-[13px] text-white/65">Weekday business hours ET</p>
                    </div>
                  </li>
                  <li className="grid grid-cols-[32px_minmax(0,1fr)] items-start gap-4">
                    <span className="flex h-8 w-8 items-center justify-center text-[var(--clay-mint)]">
                      <Mail className="size-5 shrink-0" />
                    </span>
                    <a href="mailto:sales@nkinternationalusa.com" className="min-w-0 pt-0.5 leading-[1.45] break-all hover:underline">sales@nkinternationalusa.com</a>
                  </li>
                  <li className="grid grid-cols-[32px_minmax(0,1fr)] items-start gap-4">
                    <span className="flex h-8 w-8 items-center justify-center text-[var(--clay-mint)]">
                      <MessageCircle className="size-5 shrink-0" />
                    </span>
                    <div>
                      <span>WhatsApp Business</span>
                      <p className="text-[13px] text-white/65">Fastest for quick questions</p>
                    </div>
                  </li>
                  <li className="grid grid-cols-[32px_minmax(0,1fr)] items-start gap-4">
                    <span className="flex h-8 w-8 items-center justify-center text-[var(--clay-mint)]">
                      <Clock className="size-5 shrink-0" />
                    </span>
                    <p className="pt-0.5 text-[14px] leading-[1.45] text-white/75">Quote requests answered within a few business days.</p>
                  </li>
                </ul>
              </div>

              {OFFICES.map((o) => (
                <div key={o.country} className="rounded-[20px] border border-[var(--hairline)] bg-card p-7">
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 text-[var(--nk-red)]" />
                    <h3 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{o.country}</h3>
                  </div>
                  <p className="mt-4 whitespace-pre-line text-[15px] leading-[1.6] text-ink">{o.address}</p>
                  <div className="mt-5 grid gap-2 text-[14px] text-muted-foreground">
                    <a href={`tel:${o.phone}`} className="grid grid-cols-[22px_minmax(0,1fr)] items-start gap-3 transition-colors hover:text-[var(--nk-red)]">
                      <Phone className="mt-1 size-4 shrink-0 text-[var(--nk-red)]" />
                      <span className="min-w-0 leading-[1.45]">{o.phone}</span>
                    </a>
                    <a href={`mailto:${o.email}`} className="grid grid-cols-[22px_minmax(0,1fr)] items-start gap-3 transition-colors hover:text-[var(--nk-red)]">
                      <Mail className="mt-1 size-4 shrink-0 text-[var(--nk-red)]" />
                      <span className="min-w-0 break-all leading-[1.45]">{o.email}</span>
                    </a>
                  </div>
                </div>
              ))}
            </aside>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            eyebrow="FAQ / Help Links"
            title="Answers before you ask."
            intro="Common questions about manufacturing, sampling, timelines, materials, and quoting."
            titleClassName="text-[var(--nk-red-subtle)]"
            introClassName="max-w-none xl:whitespace-nowrap"
          />
          <div className="mx-auto mt-12 max-w-[820px] overflow-hidden rounded-[24px] border border-[var(--hairline)] bg-card">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="border-b border-[var(--hairline)] last:border-0">
                  <button
                    data-pressable="true"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[var(--nk-red-surface)]"
                  >
                    <span className="text-[1.05rem] tracking-[-0.01em] transition-colors group-hover:text-[var(--nk-red-subtle)]" style={{ fontWeight: 600 }}>{f.q}</span>
                    <ChevronDown className={cn("size-5 shrink-0 text-[var(--nk-red)] transition-transform duration-300", open && "rotate-180")} />
                  </button>
                  <div className={cn("grid transition-all duration-300 ease-out", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-[15px] leading-[1.65] text-body">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <p className="text-body">Still have a question?</p>
            <CTAButton href="mailto:sales@nkinternationalusa.com" variant="primary">Email Our Team</CTAButton>
          </div>
        </Container>
      </section>
    </>
  );
}
