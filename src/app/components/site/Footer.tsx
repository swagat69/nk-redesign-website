import { Link } from "react-router";
import { Phone, MapPin, CalendarClock, Award } from "lucide-react";
import logoUrl from "../../../assets/nk-logo.png";
import { Container } from "./primitives";
import { BrandLogo } from "./BrandLogo";

const COLUMNS = [
  {
    title: "Navigate",
    links: [
      { to: "/", label: "Home" },
      { to: "/capabilities", label: "Capabilities" },
      { to: "/portfolio", label: "Products" },
      { to: "/about", label: "About & Clients" },
      { to: "/logistics-fulfillment", label: "Logistics & Fulfillment" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Capabilities",
    links: [
      { to: "/capabilities", label: "Design & Prototyping" },
      { to: "/capabilities", label: "Manufacturing" },
      { to: "/capabilities", label: "Logistics" },
      { to: "/logistics-fulfillment", label: "Storage & Fulfillment" },
      { to: "/portfolio", label: "Product Range" },
      { to: "/contact", label: "Request a Quote" },
    ],
  },
];

const FOOTER_CONTACTS = [
  {
    name: "Ali",
    role: "Marketing Manager",
    email: "sales@nkinternationalusa.com",
    phones: [
      { region: "USA", number: "+1 (202) 820-4561", tel: "+12028204561" },
      { region: "PAK", number: "+92 322 825 2300", tel: "+923228252300" },
    ],
  },
  {
    name: "Primary Contact",
    role: "NK International",
    email: "sales@nkinternationalusa.com",
    phones: [
      { region: "USA", number: "+1 (202) 341-4493", tel: "+12023414493" },
      { region: "PAK", number: "+92 313 821 8379", tel: "+923138218379" },
    ],
  },
];

function Horizon() {
  return (
    <div className="relative h-32 w-full md:h-44" aria-hidden>
      <svg
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        className="block h-full w-full"
      >
        {/* Brand horizon: NK logo colors only (white, NK red, ink black) so
            the footer closes on the brand identity instead of the clay
            illustration palette. The top wave is white with an ink outline;
            the outline is a separate open path so the shape's bottom/side
            edges stay unstroked, and vector-effect keeps the line uniform
            despite the non-uniform stretch. */}
        <path d="M0 220 V120 Q240 60 480 110 T960 105 T1440 95 V220 Z" fill="#ffffff" />
        <path
          d="M0 120 Q240 60 480 110 T960 105 T1440 95"
          fill="none"
          stroke="var(--ink)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <path d="M0 220 V150 Q300 100 620 140 T1140 140 T1440 130 V220 Z" fill="var(--nk-red)" />
        <path d="M0 220 V180 Q360 150 760 175 T1440 170 V220 Z" fill="var(--ink)" />
      </svg>
      {/* The brand mark sits outside the SVG: preserveAspectRatio="none"
          stretches the hills to any width by design, which would distort
          anything drawn inside. The kite logo floats where the old sun sat
          (percentages mirror cx/cy 1180/1440, 70/220). */}
      <img
        src={logoUrl}
        alt=""
        className="absolute w-16 md:w-24"
        style={{ left: "81.944%", top: "28%", transform: "translate(-50%, -50%)" }}
      />
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-[var(--surface-soft)] text-body">
      <Container className="pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <BrandLogo />
            <p className="mt-5 max-w-[34ch] text-[15px] leading-[1.6] text-body">
              A family owned custom apparel manufacturing partner turning ideas
              into finished garments with maximum quality control and care.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-[13px] font-medium text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CalendarClock className="size-4 text-[var(--nk-red)]" />
                Since 2000
              </span>
              <span aria-hidden>/</span>
              <span className="inline-flex items-center gap-1.5">
                <Award className="size-4 text-[var(--nk-red)]" />
                Maximum Quality Control
              </span>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link, i) => (
                  <li key={`${col.title}-${i}`}>
                    <Link
                      to={link.to}
                      className="inline-flex min-h-8 items-center text-[15px] text-body transition-colors hover:text-[var(--nk-red)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Get in touch
            </h3>
            <ul className="mt-5 grid gap-5 text-[15px]">
              {FOOTER_CONTACTS.map((c) => (
                <li key={c.name} className="grid grid-cols-[24px_minmax(0,1fr)] items-start gap-4 text-body">
                  <span className="flex h-7 w-6 items-center justify-center text-[var(--nk-red)]">
                    <Phone className="size-4 shrink-0" />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <div className="text-[14px] font-semibold text-ink">
                      {c.name}
                      <span className="font-normal text-muted-foreground"> {"/"} {c.role}</span>
                    </div>
                    <div className="mt-1.5 grid gap-1 text-[14px]">
                      <a href={`mailto:${c.email}`} className="grid grid-cols-[34px_minmax(0,1fr)] items-baseline gap-2 leading-[1.45] transition-colors hover:text-[var(--nk-red)]">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Email</span>
                        <span className="min-w-0 truncate text-[13px]">{c.email}</span>
                      </a>
                      {c.phones.map((p) => (
                        <a key={p.tel} href={`tel:${p.tel}`} className="grid grid-cols-[34px_minmax(0,1fr)] items-baseline gap-2 leading-[1.45] transition-colors hover:text-[var(--nk-red)]">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{p.region}</span>
                          <span className="whitespace-nowrap">{p.number}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
              <li className="grid grid-cols-[24px_minmax(0,1fr)] items-start gap-4 text-body">
                <span className="flex h-7 w-6 items-center justify-center text-[var(--nk-red)]">
                  <MapPin className="size-4 shrink-0" />
                </span>
                <span className="min-w-0 pt-0.5 leading-[1.45]">
                  New Jersey, USA
                  <br />
                  Karachi, Pakistan
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[var(--hairline)] pt-6 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>Copyright NK</span>
          <span>Quality / Transparency / Ethical Manufacturing</span>
        </div>
      </Container>

      <Horizon />
    </footer>
  );
}
