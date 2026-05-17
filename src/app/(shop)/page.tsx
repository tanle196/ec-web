import { Hero } from "./_sections/hero";
import { CategorySection } from "./_sections/category-section";
import { FeaturedProducts, FeaturedProductsHeader } from "./_sections/featured-products";

export default function HomePage() {
  return (
    <>
      <Hero />

      <div className="container mx-auto px-4 py-12 space-y-14">
        <section>
          <h2 className="text-xl font-semibold mb-6">Danh mục</h2>
          <CategorySection />
        </section>

        <section>
          <FeaturedProductsHeader />
          <FeaturedProducts />
        </section>
      </div>
    </>
  );
}
