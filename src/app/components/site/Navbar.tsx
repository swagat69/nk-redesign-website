import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { Container, CTAButton } from "./primitives";
import { BrandLogo } from "./BrandLogo";
import { cn } from "../ui/utils";

const NAV = [
  { to: "/", label: "Home", end: true },
  { to: "/capabilities", label: "Capabilities" },
  { to: "/portfolio", label: "Products" },
  { to: "/about", label: "About & Clients" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-[var(--hairline)] bg-[var(--background)]/90 backdrop-blur-md"
          : "border-b border-transparent bg-[var(--background)]",
      )}
    >
      <Container className="flex h-16 items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-4">
        <Link
          data-pressable="true"
          to="/"
          className="flex items-center gap-2.5 lg:justify-self-start"
          aria-label="Home"
        >
          <BrandLogo />
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center justify-center gap-1 lg:flex lg:justify-self-center"
          aria-label="Primary navigation"
        >
          {NAV.map((item) => (
            <NavLink
              data-pressable="true"
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "inline-flex h-10 items-center whitespace-nowrap rounded-lg px-3.5 text-[14px] font-medium transition-colors",
                  isActive
                    ? "bg-[var(--surface-card)] text-ink"
                    : "text-muted-foreground hover:text-[var(--nk-red-subtle)]",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center justify-end gap-2 lg:flex lg:justify-self-end">
          <Link
            data-pressable="true"
            to="/contact"
            className="inline-flex h-9 items-center rounded-lg px-2.5 text-[13px] font-medium text-ink transition-colors hover:text-[var(--nk-red-subtle)]"
          >
            Book
          </Link>
          <CTAButton to="/contact" variant="primary" className="h-9 px-4 text-[13px]">
            Quote
          </CTAButton>
        </div>

        {/* Mobile toggle */}
        <button
          data-pressable="true"
          className="flex size-10 items-center justify-center rounded-xl border border-[var(--hairline)] lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-[var(--hairline)] bg-[var(--background)] lg:hidden">
          <Container className="flex flex-col py-3">
            {NAV.map((item) => (
              <NavLink
                data-pressable="true"
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    "rounded-xl px-3 py-3 text-[15px] font-medium",
                    isActive ? "bg-[var(--surface-card)] text-ink" : "text-body hover:text-[var(--nk-red-subtle)]",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <CTAButton to="/contact" variant="primary" className="mt-3 h-10 w-full text-[13px]">
              Quote
            </CTAButton>
          </Container>
        </div>
      )}
    </header>
  );
}
