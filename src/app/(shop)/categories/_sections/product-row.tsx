import { ProductGrid } from "@/components/commons/product-grid";
import { SectionHeader } from "@/components/commons/section-header";
import type { Product } from "@/components/commons/product-card";

export function ProductRow({
  products,
  eyebrow,
  title,
  action,
  href = "#",
}: {
  products: Product[];
  eyebrow?: string;
  title: string;
  action?: string;
  href?: string;
}) {
  return (
    <section className="max-w-360 mx-auto px-16 pt-16">
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        action={action}
        href={href}
      />
      <ProductGrid products={products} />
    </section>
  );
}
