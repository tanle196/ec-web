"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "./badge";
import { Price } from "./price";
import { Stars } from "./stars";
import { ProductImage } from "./product-image";

export interface Product {
  id: string;
  slug: string;
  name: string;
  seller: string;
  price: number;
  was?: number | null;
  rating: number;
  reviews: number;
  badge: "new" | "sale" | "discount" | "gold" | null;
  discount?: number;
  img: string;
}

function discountPct(price: number, was: number) {
  return Math.round((1 - price / was) * 100);
}

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const [saved, setSaved] = useState(false);

  return (
    <Link
      href={`/products/${product.slug}`}
      className={`${"group relative flex h-full flex-col rounded-[12px] border border-border-light bg-white p-[8px_8px_14px] text-inherit no-underline transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_4px_8px_rgba(15,23,42,0.06),0_8px_24px_rgba(15,23,42,0.08)]"} ${className ?? ""}`}
    >
      {/* Badges top-left */}
      <div className="absolute top-4 left-4 z-10 flex gap-1.5">
        {product.badge === "new" && <Badge kind="new">NEW</Badge>}
        {product.badge === "sale" && <Badge kind="sale">SALE</Badge>}
        {product.badge === "gold" && <Badge kind="gold">★ Bestseller</Badge>}
        {product.badge === "discount" && product.discount != null && (
          <Badge kind="discount">−{product.discount}%</Badge>
        )}
      </div>

      {/* Save button top-right */}
      <button
        className="absolute top-4 right-4 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-0 bg-background/92 transition-colors duration-150 hover:bg-muted"
        aria-label={saved ? "Đã lưu" : "Lưu"}
        onClick={(e) => {
          e.preventDefault();
          setSaved((s) => !s);
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={saved ? "var(--color-cta)" : "none"}
          stroke={saved ? "var(--color-cta)" : "var(--foreground)"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      </button>

      {/* Image area */}
      <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-[8px] bg-muted">
        <ProductImage
          src={product.img}
          alt={product.name}
          width={200}
          height={200}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1 px-1.5 pt-3">
        <span className="text-[11px] font-medium tracking-[0.04em] text-text-tertiary uppercase">
          {product.seller}
        </span>
        <span className="text-[14px] leading-snug font-semibold text-foreground">
          {product.name}
        </span>
        <div className="mt-1">
          <Price amount={product.price} was={product.was} />
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          {product.was && (
            <Badge kind="persimmon">
              −{discountPct(product.price, product.was)}%
            </Badge>
          )}
          <Stars rating={product.rating} count={product.reviews} />
        </div>
      </div>
    </Link>
  );
}
