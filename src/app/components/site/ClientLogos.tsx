const CLIENT_LOGOS = [
  {
    name: "Featured NK client",
    src: "/client-logos/client-logo-01.png",
  },
  {
    name: "Trail Life",
    src: "/client-logos/trail-life.png",
  },
  {
    name: "Taco Bell",
    src: "/client-logos/taco-bell.png",
  },
  {
    name: "Dollar General",
    src: "/client-logos/dollar-general.png",
  },
];

export function ClientLogoCards() {
  return (
    <div>
      <ul className="grid grid-cols-2 items-center gap-x-8 gap-y-7 sm:gap-x-12 lg:grid-cols-4">
        {CLIENT_LOGOS.map((logo) => (
          <li key={logo.name}>
            <div className="flex h-20 items-center justify-center px-2 py-2 sm:h-24">
              <img
                src={logo.src}
                alt={`${logo.name} logo`}
                className="max-h-16 max-w-[88%] object-contain sm:max-h-20"
                loading="lazy"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
