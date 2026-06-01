import Link from "next/link";

export function SectionHeader({
  eyebrow,
  title,
  action,
  href = "#",
}: {
  eyebrow?: string;
  title: string;
  action?: string;
  href?: string;
}) {
  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        {eyebrow && (
          <div
            className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#5C5853] mb-2"
          >
            {eyebrow}
          </div>
        )}
        <h2
          className="text-[clamp(28px,3vw,36px)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#141210] m-0"
        >
          {title}
        </h2>
      </div>
      {action && (
        <Link
          href={href}
          className="text-[14px] font-semibold text-[#141210] flex items-center gap-1.5 no-underline hover:underline underline-offset-3"
        >
          {action}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      )}
    </div>
  );
}
