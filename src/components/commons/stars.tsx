export function Stars({ rating, count }: { rating: number; count: number }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[13px] text-text-secondary"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="var(--foreground)"
        stroke="var(--foreground)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
      <span className="font-semibold text-foreground">{rating}</span>
      <span className="text-text-tertiary">· {count.toLocaleString("vi-VN")}</span>
    </span>
  );
}
