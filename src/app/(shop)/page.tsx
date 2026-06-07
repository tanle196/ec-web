import type { Metadata } from "next";
import { HeroWidgets } from "./_sections/hero-widgets";
import { FeaturesBar } from "./_sections/features-bar";
import { BestDeals } from "./_sections/best-deals";
import { ShopCategories } from "./_sections/shop-categories";
import { FeaturedGrid } from "./_sections/featured-grid";
import { PromoBanners } from "./_sections/promo-banners";
import { MiniLists } from "./_sections/mini-lists";
import { LatestNews } from "./_sections/latest-news";
import { NewsletterSection } from "./_sections/newsletter-section";

export const metadata: Metadata = {
  title: "Clicon — Electronics eCommerce Marketplace",
  description:
    "Shop the best electronics deals — phones, laptops, audio and more. Fast delivery, free returns.",
};

export default function HomePage() {
  return (
    <div className="bg-white">
      <HeroWidgets />
      <FeaturesBar />
      <BestDeals />
      <ShopCategories />
      <FeaturedGrid />
      <PromoBanners />
      <MiniLists />
      <LatestNews />
      <NewsletterSection />
    </div>
  );
}
