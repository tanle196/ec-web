"use client";

import { Product, ProductCard } from "@/components/commons/product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const COLS = 5;

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length <= COLS) {
    return (
      <div className="grid grid-cols-5 gap-4">
        {products.map((p, i) => (
          <ProductCard key={`${p.id}-${i}`} product={p} />
        ))}
      </div>
    );
  }

  return (
    <Carousel opts={{ align: "start", loop: true }} className="w-full">
      <CarouselContent>
        {products.map((p, i) => (
          <CarouselItem key={`${p.id}-${i}`} className="basis-1/5">
            <ProductCard product={p} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
