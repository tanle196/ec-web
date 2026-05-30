import Link from "next/link";
import { BRANDS } from "../_data/phones";
import type { Brand } from "../_data/phones";

export function BrandStrip({
  brands = BRANDS,
  categorySlug = "phones",
}: {
  brands?: Brand[];
  categorySlug?: string;
}) {
  return (
    <section className="max-w-360 mx-auto px-16 pt-12">
      <div className="grid grid-cols-8 gap-3.5">
        {brands.map((b) => (
          <Link
            key={b.id}
            href={`/categories/${categorySlug}?brand=${b.id}`}
            className="bg-white border border-marlo-border rounded-[16px] p-4 flex flex-col items-center gap-2 no-underline text-inherit transition-all duration-150 hover:-translate-y-0.5 hover:shadow-card-sm"
          >
            <div
              className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-[11px] font-bold"
              style={{ color: "#141210", fontFamily: "var(--font-bricolage), sans-serif", letterSpacing: "-0.02em" }}
            >
              {b.name.slice(0, 2)}
            </div>
            <span className="text-[13px] font-semibold text-[#141210]" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>
              {b.name}
            </span>
            <span className="text-[11px] text-text-tertiary" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>
              {b.count} mẫu
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
