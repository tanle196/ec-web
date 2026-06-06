"use client";

import { Product, ProductCard } from "@/components/commons/product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const COL_TO_BASIS: Record<number, string> = {
  2: "basis-1/2",
  3: "basis-1/3",
  4: "basis-1/4",
  5: "basis-1/5",
  6: "basis-1/6",
};

const COL_TO_GRID: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

export function ProductGrid({
  products,
  cols = 5,
  carousel = true,
}: {
  products: Product[];
  cols?: number;
  carousel?: boolean;
}) {
  const gridClass = COL_TO_GRID[cols] ?? `grid-cols-${cols}`;
  const basisClass = COL_TO_BASIS[cols] ?? `basis-1/${cols}`;

  if (!carousel || products.length <= cols) {
    return (
      <div className={`grid ${gridClass} gap-4`}>
        {products.map((p, i) => (
          <ProductCard key={`${p.id}-${i}`} product={p} className="h-full" />
        ))}
      </div>
    );
  }

  return (
    <Carousel opts={{ align: "start", loop: true }} className="w-full">
      <CarouselContent>
        {products.map((p, i) => (
          <CarouselItem key={`${p.id}-${i}`} className={`${basisClass} h-full`}>
            <ProductCard product={p} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
