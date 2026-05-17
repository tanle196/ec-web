"use client";

import Link from "next/link";
import { useProducts } from "@/queries/products";
import { ProductCard } from "@/components/product/product-card";

export function FeaturedProducts() {
  const { data, isLoading } = useProducts({ status: "published", limit: 8 });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-square rounded-lg bg-zinc-100 animate-pulse" />
            <div className="h-4 w-3/4 rounded bg-zinc-100 animate-pulse" />
            <div className="h-4 w-1/2 rounded bg-zinc-100 animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  const products = data?.data ?? [];

  if (!products.length) return null;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.basePrice}
          slug={product.slug}
        />
      ))}
    </div>
  );
}

export function FeaturedProductsHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-semibold">Sản phẩm mới</h2>
      <Link
        href="/products"
        className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
      >
        Xem tất cả →
      </Link>
    </div>
  );
}
