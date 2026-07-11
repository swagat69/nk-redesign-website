import * as React from "react";
import { type LucideIcon } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { type ClayColor, clayCardClasses } from "./primitives";
import { cn } from "../ui/utils";

const isDark = (c: ClayColor) => c === "pink" || c === "teal";

/**
 * Clay saturated feature card. Carries an optional icon chip, a title, body,
 * and an embedded photo "product fragment" sitting in a rounded inner frame.
 */
export function FeatureCard({
  color,
  icon: Icon,
  eyebrow,
  title,
  body,
  photo,
  photoAlt,
  className,
  children,
}: {
  color: ClayColor;
  icon?: LucideIcon;
  eyebrow?: string;
  title: string;
  body?: string;
  photo?: string;
  photoAlt?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const dark = isDark(color);
  const subtle = dark ? "text-white/75" : "text-ink/70";
  const chip = dark ? "bg-white/15 text-white" : "bg-ink/8 text-ink";
  void eyebrow;

  return (
    <div
      className={cn(
        "flex flex-col gap-5 rounded-[24px] p-8",
        clayCardClasses[color],
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        {Icon && (
          <span className={cn("flex size-11 items-center justify-center rounded-xl", chip)}>
            <Icon className="size-5" strokeWidth={1.9} />
          </span>
        )}
      </div>

      <div>
        <h3 className="text-[22px] leading-[1.25] tracking-[-0.02em]" style={{ fontWeight: 600 }}>
          {title}
        </h3>
        {body && (
          <p className={cn("mt-3 text-[15px] leading-[1.55]", subtle)}>{body}</p>
        )}
      </div>

      {photo && (
        <div className="mt-auto overflow-hidden rounded-2xl bg-black/10">
          <div className="aspect-[16/10]">
            <ImageWithFallback
              src={photo}
              alt={photoAlt ?? title}
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
          </div>
        </div>
      )}

      {children}
    </div>
  );
}
