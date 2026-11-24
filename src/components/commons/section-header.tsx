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
    <div className="mb-6 flex items-end justify-between">
      <div>
        {eyebrow && (
          <div className="mb-2 text-[11px] font-semibold tracking-[0.14em] text-text-secondary uppercase">
            {eyebrow}
          </div>
        )}
        <h2 className="m-0 text-[clamp(28px,3vw,36px)] leading-[1.05] font-semibold tracking-[-0.02em] text-foreground">
          {title}
        </h2>
      </div>
      {action && (
        <Link
          href={href}
          className="flex items-center gap-1.5 text-[14px] font-semibold text-foreground no-underline underline-offset-3 hover:underline"
        >
          {action}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      )}
    </div>
  );
}
