import { ProductGrid } from "@/components/commons/product-grid";
import { SectionHeader } from "@/components/commons/section-header";
import { FLAGSHIP, MID_RANGE } from "@/app/(shop)/categories/_data/phones";

export function FeaturedProducts() {
  return (
    <>
      {/* Flagship deals */}
      <section className="max-w-360 mx-auto px-16 pt-16">
        <SectionHeader
          eyebrow="Ưu đãi hôm nay · kết thúc sau 4 giờ"
          title="Tiết kiệm lớn với điện thoại"
          action="Xem tất cả deals"
          href="/phones"
        />
        <ProductGrid products={FLAGSHIP} />
      </section>

      {/* Mid-range picks */}
      <section className="max-w-360 mx-auto px-16 pt-16">
        <SectionHeader
          eyebrow="Tầm giá 5–15 triệu"
          title="Hiệu năng cao, giá cực tốt"
          action="Xem thêm"
          href="/phones"
        />
        <ProductGrid products={MID_RANGE} />
      </section>
    </>
  );
}
