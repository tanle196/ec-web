import type { ReactNode } from "react";

export type BadgeKind =
  | "new"
  | "sale"
  | "discount"
  | "gold"
  | "persimmon"
  | "default"
  | null;

const kindStyles: Record<string, string> = {
  new: "bg-foreground text-white tracking-[0.14em] uppercase text-[10px]",
  sale: "bg-destructive text-white",
  discount: "bg-primary-soft text-cta",
  gold: "bg-warning text-foreground",
  persimmon: "bg-primary-soft text-cta",
  default: "bg-transparent text-foreground border border-border-strong",
};

export function Badge({
  kind,
  children,
  className,
}: {
  kind?: BadgeKind;
  children: ReactNode;
  className?: string;
}) {
  const cls = kindStyles[kind ?? "default"] ?? kindStyles.default;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-[5px] rounded-full font-semibold text-[12px] leading-none whitespace-nowrap w-fit ${cls} ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
