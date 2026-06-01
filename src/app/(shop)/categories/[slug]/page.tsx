import type { Metadata } from "next";
import { getCategoryBySlug, CATEGORIES } from "../_data/categories";
import { CategoryHero } from "../_sections/category-hero";
import { CategoryEditorial } from "../_sections/category-editorial";
import { ProductRow } from "../_sections/product-row";
import { TrustStrip } from "../_sections/trust-strip";
import { BrandStrip } from "../_sections/brand-strip";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/categories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  return {
    title: cat ? `${cat.name} | Marlo` : "Danh mục | Marlo",
    description: cat?.description,
  };
}

export default async function CategoryPage({
  params,
}: PageProps<"/categories/[slug]">) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);

  // ── Fallback for unknown slugs ─────────────────────────────────────────
  if (!cat) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="max-w-7xl mx-auto px-16 py-16">
          <h1
            className="text-[clamp(32px,3.5vw,48px)] font-semibold tracking-[-0.02em] text-[#141210] mb-2 capitalize"
          >
            {slug.replace(/-/g, " ")}
          </h1>
          <p className="text-[16px] text-text-secondary mb-12">
            Đang tải sản phẩm cho danh mục này…
          </p>
          <TrustStrip />
        </div>
      </div>
    );
  }

  // ── Full category page ─────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-cream pb-20">
      <CategoryHero hero={cat.hero} />

      {cat.brands && <BrandStrip brands={cat.brands} categorySlug={cat.slug} />}

      {cat.rows.map((row) => (
        <ProductRow
          key={row.eyebrow}
          phones={row.products}
          eyebrow={row.eyebrow}
          title={row.title}
          action={row.action}
          href={row.href}
        />
      ))}

      {cat.editorial && (
        <CategoryEditorial left={cat.editorial.left} right={cat.editorial.right} />
      )}

      <TrustStrip />
    </div>
  );
}
