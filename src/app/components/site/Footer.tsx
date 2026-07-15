import { Link } from "react-router";
import { Mail, Phone, MapPin, CalendarClock, Award } from "lucide-react";
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
      { to: "/blog", label: "Blog" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Capabilities",
    links: [
      { to: "/capabilities", label: "Design & Prototyping" },
      { to: "/capabilities", label: "Manufacturing" },
      { to: "/capabilities", label: "Logistics & QC" },
      { to: "/capabilities", label: "Sustainability" },
      { to: "/portfolio", label: "Product Range" },
      { to: "/blog", label: "Resources" },
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
        <path d="M0 220 V120 Q240 60 480 110 T960 105 T1440 95 V220 Z" fill="var(--clay-ochre)" />
        <path d="M0 220 V150 Q300 100 620 140 T1140 140 T1440 130 V220 Z" fill="var(--clay-peach)" />
        <path d="M0 220 V180 Q360 150 760 175 T1440 170 V220 Z" fill="var(--clay-teal)" />
      </svg>
      {/* The sun sits outside the SVG: preserveAspectRatio="none" stretches the
          hills to any width by design, which would squash a <circle> into an
          ellipse. Percentages mirror the old cx/cy (1180/1440, 70/220) so it
          tracks the hills as they stretch. */}
      <span
        className="absolute flex size-10 items-center justify-center rounded-full bg-[var(--nk-red)] md:size-[54px]"
        style={{ left: "81.944%", top: "31.818%", transform: "translate(-50%, -50%)" }}
      >
        {/* NK has no descenders, so centring the line box leaves the caps
            sitting 0.106em low (Inter: cap height 0.73em, baseline 0.971em
            from box top). Nudge up to optically centre the glyphs; em keeps
            it correct at both type sizes. */}
        <span
          className="text-[15px] leading-none text-white md:text-[20px]"
          style={{ fontWeight: 600, letterSpacing: "0.01em", transform: "translateY(-0.106em)" }}
        >
          NK
        </span>
      </span>
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
              into finished garments with transparent pricing, QC, and care.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-[13px] font-medium text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CalendarClock className="size-4 text-[var(--nk-red)]" />
                Since 2000
              </span>
              <span aria-hidden>/</span>
              <span className="inline-flex items-center gap-1.5">
                <Award className="size-4 text-[var(--nk-red)]" />
                100% QC
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
            <ul className="mt-5 grid gap-4 text-[15px]">
              <li className="grid grid-cols-[24px_minmax(0,1fr)] items-start gap-4 text-body">
                <span className="flex h-7 w-6 items-center justify-center text-[var(--nk-red)]">
                  <Mail className="size-4 shrink-0" />
                </span>
                <a href="mailto:sales@nkinternationalusa.com" className="min-w-0 pt-0.5 leading-[1.45] transition-colors hover:text-[var(--nk-red)]">
                  sales@nkinternationalusa.com
                </a>
              </li>
              <li className="grid grid-cols-[24px_minmax(0,1fr)] items-start gap-4 text-body">
                <span className="flex h-7 w-6 items-center justify-center text-[var(--nk-red)]">
                  <Phone className="size-4 shrink-0" />
                </span>
                <a href="tel:+12015551234" className="min-w-0 pt-0.5 leading-[1.45] transition-colors hover:text-[var(--nk-red)]">
                  +1 (201) 555-1234
                </a>
              </li>
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
