import { ProductCard } from "@/components/commons/product-card";
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
        <div className="grid grid-cols-4 gap-4">
          {FLAGSHIP.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Mid-range picks */}
      <section className="max-w-360 mx-auto px-16 pt-16">
        <SectionHeader
          eyebrow="Tầm giá 5–15 triệu"
          title="Hiệu năng cao, giá cực tốt"
          action="Xem thêm"
          href="/phones"
        />
        <div className="grid grid-cols-4 gap-4">
          {MID_RANGE.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
