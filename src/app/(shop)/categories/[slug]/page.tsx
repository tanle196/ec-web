import { ProductGrid } from "@/components/product/product-grid";

export default async function CategoryPage({
  params,
}: PageProps<"/categories/[slug]">) {
  const { slug } = await params;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6 capitalize">{slug}</h1>
      <ProductGrid categorySlug={slug} />
    </div>
  );
}
