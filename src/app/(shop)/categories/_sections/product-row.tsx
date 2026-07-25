import { ProductGrid } from "@/components/commons/product-grid";
import { SectionHeader } from "@/components/commons/section-header";
import { Container } from "@/components/commons/container";
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
    <Container size="wide" className="pt-16">
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        action={action}
        href={href}
      />
      <ProductGrid products={products} />
    </Container>
  );
}
