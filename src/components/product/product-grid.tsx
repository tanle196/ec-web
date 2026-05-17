import { ProductCard } from "./product-card";

interface ProductGridProps {
  categorySlug?: string;
}

export function ProductGrid({ categorySlug: _categorySlug }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      <ProductCard
        id="1"
        name="Sản phẩm mẫu"
        price={299000}
        slug="san-pham-mau"
      />
    </div>
  );
}
