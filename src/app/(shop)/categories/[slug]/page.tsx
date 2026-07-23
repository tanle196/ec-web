import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categoriesControllerFindBySlug, productsControllerFindAll } from "@/api/main";
import { mainService } from "@/lib/api/client";
import { mapProductListItem } from "@/lib/api/mappers";
import { CategoryHero } from "../_sections/category-hero";
import { ProductRow } from "../_sections/product-row";
import { TrustStrip } from "../_sections/trust-strip";

async function fetchCategory(slug: string) {
  try {
    return await mainService.request(categoriesControllerFindBySlug)({
      path: { slug },
    });
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps<"/categories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = await fetchCategory(slug);
  if (!category) return {};
  return {
    title: `${category.name} | Marlo`,
    description: category.description ? String(category.description) : undefined,
  };
}

export default async function CategoryPage({
  params,
}: PageProps<"/categories/[slug]">) {
  const { slug } = await params;
  const category = await fetchCategory(slug);
  if (!category) notFound();

  const products = await mainService.request(productsControllerFindAll)({
    query: { category_id: category.id, status: "published", limit: 20 },
  });
  const items = products.data.map(mapProductListItem);

  return (
    <div className="min-h-screen bg-cream pb-20">
      <CategoryHero category={category} />

      {items.length > 0 && (
        <ProductRow
          products={items}
          eyebrow="Sản phẩm"
          title={`Tất cả ${category.name}`}
          action="Xem tất cả"
          href={`/search?category=${category.slug}`}
        />
      )}

      <TrustStrip />
    </div>
  );
}
