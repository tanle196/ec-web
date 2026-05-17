import { ProductGrid } from "@/components/product/product-grid";

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Sản phẩm</h1>
      <ProductGrid />
    </div>
  );
}
