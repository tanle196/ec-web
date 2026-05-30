import Link from "next/link";
import type { EditorialPanel } from "../_data/categories";

function Panel({ panel }: { panel: EditorialPanel }) {
  return (
    <div
      className="relative rounded-[16px] overflow-hidden flex flex-col justify-between p-10"
      style={{ background: panel.bg, minHeight: 340, color: panel.textColor }}
    >
      {/* Background image */}
      <div
        className="absolute right-0 bottom-0 w-64 h-64 pointer-events-none"
        style={{ background: `url(${panel.imgSrc}) center/contain no-repeat`, opacity: 0.35 }}
      />

      {/* Badge */}
      <span
        className="inline-flex items-center px-2.5 py-1.25 rounded-full font-semibold text-[12px] leading-none whitespace-nowrap w-fit"
        style={{
          fontFamily: "var(--font-hanken), sans-serif",
          background: panel.badgeBg ?? "rgba(255,255,255,0.15)",
          color: panel.badgeColor ?? panel.textColor,
        }}
      >
        {panel.badge}
      </span>

      <div>
        <h3
          className="font-semibold leading-none tracking-[-0.02em] mb-3"
          style={{
            fontFamily: "var(--font-bricolage), sans-serif",
            fontSize: "clamp(28px, 3vw, 40px)",
            whiteSpace: "pre-line",
            color: panel.textColor,
          }}
        >
          {panel.headline}
        </h3>
        <p
          className="text-[15px] leading-relaxed max-w-85 mb-5"
          style={{
            fontFamily: "var(--font-hanken), sans-serif",
            color: panel.textColor === "white" ? "rgba(255,255,255,0.85)" : "#C9C2B5",
          }}
        >
          {panel.subtitle}
        </p>
        <Link
          href={panel.ctaHref}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-[8px] font-semibold text-[14px] leading-none no-underline hover:opacity-90 transition-opacity duration-150"
          style={{
            fontFamily: "var(--font-hanken), sans-serif",
            background: panel.ctaBg,
            color: panel.ctaTextColor,
          }}
        >
          {panel.cta}
        </Link>
      </div>
    </div>
  );
}

export function CategoryEditorial({
  left,
  right,
}: {
  left: EditorialPanel;
  right: EditorialPanel;
}) {
  return (
    <section className="max-w-360 mx-auto px-16 pt-18">
      <div className="grid grid-cols-2 gap-4">
        <Panel panel={left} />
        <Panel panel={right} />
      </div>
    </section>
  );
}
