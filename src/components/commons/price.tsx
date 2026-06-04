function fmt(n: number) {
  return n.toLocaleString("vi-VN") + "₫";
}

const textSizes = { sm: "text-[14px]", md: "text-[18px]", lg: "text-[24px]", xl: "text-[40px]" };
const strikeSizes = { sm: "text-[11px]", md: "text-[12px]", lg: "text-[16px]", xl: "text-[28px]" };

export function Price({
  amount,
  was,
  size = "md",
}: {
  amount: number;
  was?: number | null;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  return (
    <span className="inline-flex items-baseline gap-2">
      <span
        className={`font-mono-marlo font-medium tabular-nums text-foreground ${textSizes[size]}`}
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {fmt(amount)}
      </span>
      {was && (
        <span
          className={`font-mono-marlo tabular-nums text-text-tertiary line-through ${strikeSizes[size]}`}
        >
          {fmt(was)}
        </span>
      )}
    </span>
  );
}
