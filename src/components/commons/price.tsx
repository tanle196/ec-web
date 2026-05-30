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
        className={`font-medium tabular-nums text-[#141210] ${textSizes[size]}`}
        style={{ fontFamily: "var(--font-jetbrains), monospace", fontVariantNumeric: "tabular-nums" }}
      >
        {fmt(amount)}
      </span>
      {was && (
        <span
          className={`tabular-nums text-[#8A857E] line-through ${strikeSizes[size]}`}
          style={{ fontFamily: "var(--font-jetbrains), monospace" }}
        >
          {fmt(was)}
        </span>
      )}
    </span>
  );
}
