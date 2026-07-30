import { useEffect, useRef, useState } from "react";
import { img } from "../../lib/images";

// Visual weight is normalized per logo instead of one shared box: wide
// wordmarks read smaller at the same height, so each entry carries its own
// height cap (px at the lg breakpoint; ~0.82x below sm via CSS clamp).
const CLIENT_LOGOS: { name: string; src: string; h: number }[] = [
  { name: "IdleAire Technologies", src: "/client-logos/client-logo-01.png", h: 64 },
  { name: "Trail Life", src: "/client-logos/trail-life.png", h: 60 },
  { name: "Taco Bell", src: "/client-logos/taco-bell.png", h: 64 },
  { name: "Dollar General", src: "/client-logos/dollar-general.png", h: 46 },
  { name: "Columbia", src: "/client-logos/columbia.png", h: 30 },
  { name: "Ace Hardware", src: "/client-logos/ace-hardware.png", h: 54 },
  { name: "IHOP", src: "/client-logos/ihop.png", h: 46 },
  { name: "Checkers", src: "/client-logos/checkers.png", h: 48 },
  { name: "Dairy Queen", src: "/client-logos/dairy-queen.png", h: 52 },
  { name: "The UPS Store", src: "/client-logos/ups-store.png", h: 30 },
  { name: "Carquest Auto Parts", src: "/client-logos/carquest.png", h: 36 },
  { name: "Dunbrooke", src: "/client-logos/dunbrooke.png", h: 58 },
];

function LogoTile({ logo }: { logo: (typeof CLIENT_LOGOS)[number] }) {
  return (
    <div className="flex h-24 shrink-0 items-center justify-center">
      <img
        src={img(logo.src)}
        alt={`${logo.name} logo`}
        className="w-auto max-w-[152px] object-contain sm:max-w-[168px]"
        style={{ maxHeight: `${logo.h}px` }}
        loading="lazy"
      />
    </div>
  );
}

export function ClientLogoCards() {
  const [reduced, setReduced] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Reduced motion (also used for the Figma capture recipe): static wrap grid.
  if (reduced) {
    return (
      <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 md:gap-x-16 lg:gap-x-20">
        {CLIENT_LOGOS.map((logo) => (
          <li key={logo.name}>
            <LogoTile logo={logo} />
          </li>
        ))}
      </ul>
    );
  }

  // Continuous marquee: the track holds the list twice and translates by
  // exactly half its own width, so the loop point is seamless at any size.
  return (
    <div
      className="group relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        ref={trackRef}
        className="flex w-max items-center [animation:logo-marquee_48s_linear_infinite] group-hover:[animation-play-state:paused]"
      >
        {[0, 1].map((pass) => (
          <div
            key={pass}
            aria-hidden={pass === 1}
            className="flex items-center gap-10 pr-10 md:gap-16 md:pr-16 lg:gap-20 lg:pr-20"
          >
            {CLIENT_LOGOS.map((logo) => (
              <LogoTile key={`${pass}-${logo.name}`} logo={logo} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
