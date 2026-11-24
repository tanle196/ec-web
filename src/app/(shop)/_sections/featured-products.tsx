"use client";

import { useProducts } from "@/queries/products";
import { mapProductListItem } from "@/lib/api/mappers";
import { ProductGrid } from "@/components/commons/product-grid";
import { SectionHeader } from "@/components/commons/section-header";
import { Container } from "@/components/commons/container";

function ProductRowSkeleton() {
  return (
    <div className="grid grid-cols-5 gap-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="aspect-3/4 animate-pulse rounded-[12px] border border-border-light bg-white p-2"
        />
      ))}
    </div>
  );
}

export function FeaturedProducts() {
  const featured = useProducts({
    isFeatured: true,
    status: "published",
    limit: 7,
  });
  const latest = useProducts({ status: "published", limit: 5 });

  const featuredProducts = featured.data?.data.map(mapProductListItem) ?? [];
  const latestProducts = latest.data?.data.map(mapProductListItem) ?? [];

  return (
    <>
      <Container size="wide" className="pt-16">
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
          <p className="py-8 text-[14px] text-text-secondary">
            Chưa có sản phẩm nổi bật.
          </p>
        )}
      </Container>

      <Container size="wide" className="pt-16">
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
          <p className="py-8 text-[14px] text-text-secondary">
            Chưa có sản phẩm nào.
          </p>
        )}
      </Container>
    </>
  );
}
