import type { Metadata } from "next";
import { Hero } from "./_sections/hero";
import { CategorySection } from "./_sections/category-section";
import { FeaturedProducts } from "./_sections/featured-products";
import { EditorialPair } from "./_sections/editorial-pair";
import { TrustStrip } from "./_sections/trust-strip";

export const metadata: Metadata = {
  title: "Marlo — Mua sắm thông minh, giá tốt mỗi ngày",
  description:
    "Marketplace đa danh mục: điện thoại, laptop, audio, thời trang và hơn 4.000 người bán. Giao nhanh, đổi trả miễn phí.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream pb-20">
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <EditorialPair />
      <TrustStrip />
    </div>
  );
}
