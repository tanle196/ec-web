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
  new: "bg-[#141210] text-white tracking-[0.14em] uppercase text-[10px]",
  sale: "bg-[#D7263D] text-white",
  discount: "bg-[#FFE7DD] text-[#C73A12]",
  gold: "bg-[#FFD83D] text-[#141210]",
  persimmon: "bg-[#FFE7DD] text-[#C73A12]",
  default: "bg-transparent text-[#141210] border border-[#D4CCBE]",
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
