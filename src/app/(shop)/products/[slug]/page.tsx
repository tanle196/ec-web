import { ProductGallery } from "@/components/product/product-gallery";

export default async function ProductDetailPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductGallery slug={slug} />
    </div>
  );
}
