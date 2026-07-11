import logoUrl from "../../../assets/nk-logo.png";
import { cn } from "../ui/utils";

export function BrandLogo({
  className,
  imageClassName,
}: {
  className?: string;
  imageClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span className="flex h-11 w-16 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
        <img
          src={logoUrl}
          alt="NK logo"
          className={cn("h-10 w-14 object-contain", imageClassName)}
        />
      </span>
    </span>
  );
}
