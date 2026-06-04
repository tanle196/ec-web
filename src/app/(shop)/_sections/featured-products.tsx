"use client";

import { useProducts } from "@/queries/products";
import { mapProductListItem } from "@/lib/api/mappers";
import { ProductGrid } from "@/components/commons/product-grid";
import { SectionHeader } from "@/components/commons/section-header";

function ProductRowSkeleton() {
  return (
    <div className="grid grid-cols-5 gap-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="bg-white border border-border-light rounded-[12px] p-2 aspect-3/4 animate-pulse"
        />
      ))}
    </div>
  );
}

export function FeaturedProducts() {
  const featured = useProducts({ isFeatured: true, status: "published", limit: 7 });
  const latest = useProducts({ status: "published", limit: 5 });

  const featuredProducts = featured.data?.data.map(mapProductListItem) ?? [];
  const latestProducts = latest.data?.data.map(mapProductListItem) ?? [];

  return (
    <>
      <section className="max-w-360 mx-auto px-16 pt-16">
        <SectionHeader
          eyebrow="Ưu đãi hôm nay · kết thúc sau 4 giờ"
          title="Sản phẩm nổi bật"
          action="Xem tất cả"
          href="/search"
        />
        {featured.isLoading ? (
          <ProductRowSkeleton />
        ) : featuredProducts.length > 0 ? (
          <ProductGrid products={featuredProducts} />
        ) : (
          <p className="text-text-secondary text-[14px] py-8">
            Chưa có sản phẩm nổi bật.
          </p>
        )}
      </section>

      <section className="max-w-360 mx-auto px-16 pt-16">
        <SectionHeader
          eyebrow="Mới nhất"
          title="Sản phẩm mới"
          action="Xem thêm"
          href="/search"
        />
        {latest.isLoading ? (
          <ProductRowSkeleton />
        ) : latestProducts.length > 0 ? (
          <ProductGrid products={latestProducts} />
        ) : (
          <p className="text-text-secondary text-[14px] py-8">
            Chưa có sản phẩm nào.
          </p>
        )}
      </section>
    </>
  );
}
