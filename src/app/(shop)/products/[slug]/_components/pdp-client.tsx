"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductImage } from "@/components/commons/product-image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useAddToCart } from "@/queries/cart";
import { useProducts, useProductReviews } from "@/queries/products";
import { mapProductListItem } from "@/lib/api/mappers";
import type { ProductResponseDto, ProductVariantResponseDto } from "@/api/main";

const PLACEHOLDER_IMG = "/no-image.svg";

/* ── Stars ────────────────────────────────────────────────────────────────── */

function StarRow({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg
            key={i}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={rating >= i ? "#FA8232" : "none"}
            stroke="#FA8232"
            strokeWidth="1.5"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
      <span className="text-[13px] font-semibold text-gray-800">
        {rating > 0 ? rating.toFixed(1) : "0.0"} Star Rating
      </span>
      <span className="text-gray-300">|</span>
      <span className="text-[13px] text-gray-500">
        {count.toLocaleString()} User Feedback
      </span>
    </div>
  );
}

function MiniStars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill={rating >= i ? "#FA8232" : "none"}
          stroke="#FA8232"
          strokeWidth="1.5"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

/* ── Qty stepper ──────────────────────────────────────────────────────────── */

function QtyStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="inline-flex items-center border border-border rounded h-12">
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-muted transition-colors cursor-pointer"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <span className="min-w-14 text-center text-[15px] font-semibold border-x border-border h-full flex items-center justify-center">
        {value}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-muted transition-colors cursor-pointer"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
}

/* ── Gallery (thumbnails below) ───────────────────────────────────────────── */

function Gallery({ images, mainAlt }: { images: string[]; mainAlt: string }) {
  const [active, setActive] = useState(0);
  const srcs = images.length > 0 ? images : [PLACEHOLDER_IMG];

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-square bg-gray-50 border border-border rounded-lg overflow-hidden group">
        <ProductImage
          src={srcs[active]}
          alt={mainAlt}
          fill
          className="object-contain p-8"
        />
        {srcs.length > 1 && (
          <>
            <button
              onClick={() =>
                setActive((a) => (a - 1 + srcs.length) % srcs.length)
              }
              aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border border-border"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => setActive((a) => (a + 1) % srcs.length)}
              aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border border-border"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {srcs.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex-none w-18 h-18 rounded border-2 p-1.5 bg-gray-50 cursor-pointer transition-all ${
              active === i
                ? "border-primary"
                : "border-border hover:border-gray-400"
            }`}
          >
            <ProductImage
              src={src}
              alt=""
              width={52}
              height={52}
              className="w-full h-full object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Horizontal product card (for bottom sections) ────────────────────────── */

function HorizontalProductCard({
  img,
  name,
  price,
  slug,
}: {
  img: string;
  name: string;
  price: number;
  slug: string;
}) {
  return (
    <Link
      href={`/products/${slug}`}
      className="flex gap-3 items-center group no-underline py-2"
    >
      <div className="w-16 h-16 flex-none rounded bg-gray-50 border border-border overflow-hidden p-1">
        <ProductImage
          src={img}
          alt={name}
          width={56}
          height={56}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] text-gray-800 font-medium leading-snug line-clamp-2 group-hover:text-primary transition-colors m-0">
          {name}
        </p>
        <p className="text-[13px] font-bold text-primary mt-0.5 m-0">
          {price.toLocaleString("vi-VN")}₫
        </p>
      </div>
    </Link>
  );
}

/* ── Main component ───────────────────────────────────────────────────────── */

export function PdpClient({ product }: { product: ProductResponseDto }) {
  const [selectedVariant, setSelectedVariant] =
    useState<ProductVariantResponseDto | null>(product.variants[0] ?? null);
  const [qty, setQty] = useState(1);
  const [addedMsg, setAddedMsg] = useState("");

  const addToCart = useAddToCart();
  const reviewsQuery = useProductReviews(product.id);
  const relatedQuery = useProducts({ status: "published", limit: 9 });

  const allRelated = (relatedQuery.data?.data ?? [])
    .filter((p) => p.id !== product.id)
    .map(mapProductListItem);

  const galleryImages = product.images
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((i) => i.url);

  const displayPrice = selectedVariant?.price ?? product.basePrice;
  const reviews = reviewsQuery.data?.data ?? [];
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      : 0;

  function handleAddToCart() {
    if (!selectedVariant) return;
    addToCart.mutate(
      { variant_id: selectedVariant.id, quantity: qty },
      {
        onSuccess: () => {
          setAddedMsg("Added!");
          setTimeout(() => setAddedMsg(""), 2000);
        },
      },
    );
  }

  /* Split related into 4 groups */
  const chunk = Math.ceil(allRelated.length / 4) || 1;
  const sections = [
    { title: "RELATED PRODUCT", items: allRelated.slice(0, chunk) },
    { title: "PRODUCT ACCESSORIES", items: allRelated.slice(chunk, chunk * 2) },
    { title: "APPLE PRODUCT", items: allRelated.slice(chunk * 2, chunk * 3) },
    { title: "FEATURED PRODUCTS", items: allRelated.slice(chunk * 3) },
  ].filter((s) => s.items.length > 0);

  return (
    <>
      {/* ── Product section ─────────────────────────────────────────────── */}
      <div className="bg-white border border-border rounded-sm flex gap-8 items-start p-6">
        {/* Gallery */}
        <div className="w-105 flex-none">
          <Gallery images={galleryImages} mainAlt={product.name} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 pt-1">
          <StarRow rating={avgRating} count={reviews.length} />

          <h1 className="text-[22px] font-semibold text-gray-900 leading-snug mt-3 mb-3">
            {product.name}
          </h1>

          {/* SKU / Availability / Brand / Category */}
          <div className="flex items-center gap-0 text-[13px] text-gray-500 mb-4 flex-wrap divide-x divide-border">
            <span className="pr-3">
              SKU:{" "}
              <span className="text-gray-800 font-medium">{product.sku}</span>
            </span>
            <span className="px-3 flex items-center gap-1.5">
              Availability:{" "}
              <span className="text-green-600 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                In Stock
              </span>
            </span>
            <span className="px-3">
              Brand:{" "}
              <span className="text-secondary-500 font-medium">Official</span>
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[30px] font-bold text-primary leading-none">
              {displayPrice.toLocaleString("vi-VN")}₫
            </span>
            {/* Show strikethrough if multiple variants with different prices */}
            {product.variants.length > 1 &&
              (() => {
                const maxPrice = Math.max(
                  ...product.variants.map((v) => v.price),
                );
                if (maxPrice > displayPrice) {
                  const pct = Math.round(
                    ((maxPrice - displayPrice) / maxPrice) * 100,
                  );
                  return (
                    <>
                      <span className="text-[18px] text-gray-400 line-through leading-none">
                        {maxPrice.toLocaleString("vi-VN")}₫
                      </span>
                      <span className="bg-primary text-white text-[12px] font-bold px-2 py-1 rounded">
                        {pct}% OFF
                      </span>
                    </>
                  );
                }
                return null;
              })()}
          </div>

          <div className="border-t border-border mb-5" />

          {/* Variant selector */}
          {product.variants.length > 0 && (
            <div className="flex items-start gap-6 mb-5 flex-wrap">
              <div>
                <div className="text-[13px] text-gray-500 mb-2">
                  Variant:{" "}
                  <span className="font-semibold text-gray-800">
                    {selectedVariant?.name}
                  </span>
                </div>
                <ToggleGroup
                  type="single"
                  value={selectedVariant?.id ?? ""}
                  onValueChange={(v) => {
                    if (!v) return;
                    const found = product.variants.find((vr) => vr.id === v);
                    if (found) setSelectedVariant(found);
                  }}
                  spacing={1}
                  className="gap-2 flex-wrap"
                >
                  {product.variants.map((vr) => (
                    <ToggleGroupItem
                      key={vr.id}
                      value={vr.id}
                      disabled={vr.stock === 0}
                      className="h-auto px-4 py-2 rounded border border-border bg-white text-[13px] font-medium text-gray-700 data-[state=on]:border-primary data-[state=on]:text-primary data-[state=on]:bg-orange-50 disabled:opacity-40 disabled:line-through hover:border-gray-400 transition-colors"
                    >
                      {vr.name}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            </div>
          )}

          {/* Qty + Add to Cart + Buy Now */}
          <div className="flex items-center gap-3 mb-4">
            <QtyStepper value={qty} onChange={setQty} />
            <button
              onClick={handleAddToCart}
              disabled={addToCart.isPending || !selectedVariant}
              className="flex-1 h-12 rounded bg-secondary-500 text-white font-semibold text-[14px] cursor-pointer hover:bg-secondary-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {addedMsg
                ? addedMsg
                : addToCart.isPending
                  ? "Adding..."
                  : "ADD TO CART"}
            </button>
            <button className="flex-1 h-12 rounded bg-primary text-white font-semibold text-[14px] cursor-pointer hover:bg-primary-hover transition-colors">
              BUY NOW
            </button>
          </div>

          {/* Wishlist / Compare / Share */}
          <div className="flex items-center gap-5 text-[13px] text-gray-500 mb-5">
            <button className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              Add to Wishlist
            </button>
            <button className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 20V10M12 20V4M6 20v-6" />
              </svg>
              Add to Compare
            </button>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">Share product:</span>
            {[
              "M24 12C24 5.37 18.63 0 12 0S0 5.37 0 12c0 5.99 4.39 10.95 10.12 11.85V15.47H7.08v-3.48h3.04v-2.65c0-3 1.79-4.66 4.52-4.66 1.31 0 2.68.23 2.68.23v2.95h-1.51c-1.49 0-1.95.93-1.95 1.87v2.25h3.32l-.53 3.48h-2.79v8.38C19.61 22.95 24 17.99 24 12z",
              "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
              "M23.953 4.57a10 10 0 0 1-2.825.775 4.958 4.958 0 0 0 2.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 0 0-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 0 0-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 0 1-2.228-.616v.06a4.923 4.923 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.212.085 4.936 4.936 0 0 0 4.604 3.417 9.867 9.867 0 0 1-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0 0 7.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0 0 24 4.59z",
            ].map((d, idx) => (
              <button
                key={idx}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d={d} />
                </svg>
              </button>
            ))}
          </div>

          {/* 100% Satisfy Checkout */}
          <div className="border border-border rounded p-3 flex items-center gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2DB224"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-[13px] font-semibold text-gray-800">
              100% Guarantee Safe Checkout
            </span>
            <div className="ml-auto flex items-center gap-1.5">
              {["Visa", "MC", "AmEx", "PayPal"].map((name) => (
                <div
                  key={name}
                  className="h-6 px-2 bg-gray-100 rounded text-[10px] font-bold text-gray-600 flex items-center"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabs ─────────────────────────────────────────────────────────── */}
      <div className="mt-5 bg-white border border-border rounded-sm overflow-hidden">
        <Tabs defaultValue="description" className="flex flex-col gap-0">
          <TabsList
            variant="line"
            className="w-full justify-start rounded-none bg-transparent border-b border-border pb-0 gap-0 h-auto"
          >
            {(
              [
                ["description", "DESCRIPTION"],
                ["additional", "ADDITIONAL INFORMATION"],
                ["specification", "SPECIFICATION"],
                ["reviews", "REVIEW"],
              ] as [string, string][]
            ).map(([value, label]) => (
              <TabsTrigger
                key={value}
                value={value}
                id={value === "reviews" ? "reviews" : undefined}
                className="flex-none h-auto rounded-none px-6 py-4 text-[13px] font-semibold tracking-wide"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Description */}
          <TabsContent value="description" className="p-8">
            <div className="grid grid-cols-3 gap-10">
              <div>
                <h3 className="text-[15px] font-semibold text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-[14px] leading-relaxed text-gray-600">
                  {product.description
                    ? String(product.description)
                    : `${product.name} — an authentic product. Includes 12-month seller warranty, premium packaging, and same-day dispatch.`}
                </p>
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-gray-900 mb-3">
                  Features
                </h3>
                <ul className="space-y-2.5">
                  {[
                    "1 Year Warranty",
                    "Free Shipping & Delivery",
                    "100% Money Back Guarantee",
                    "24/7 Customer Support",
                    "Secure payment method",
                  ].map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-[14px] text-gray-600"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#2DB224"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-gray-900 mb-3">
                  Shipping Information
                </h3>
                <div className="space-y-2 text-[14px]">
                  {(
                    [
                      ["Courier:", "2-4 days, Free Shipping"],
                      ["Local Shipping:", "Up to one week, $19"],
                      ["UPS Ground Shipping:", "4-6 days, $29.00"],
                      ["Unishop Global Export:", "3-4 days, $39"],
                    ] as [string, string][]
                  ).map(([k, v]) => (
                    <div key={k} className="flex gap-2">
                      <span className="text-gray-500 shrink-0 w-36">{k}</span>
                      <span className="text-gray-700">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Additional Info */}
          <TabsContent value="additional" className="p-8">
            <table className="w-full text-[14px] border-collapse">
              <tbody>
                {(
                  [
                    ["SKU", product.sku],
                    ["Status", product.status],
                    [
                      "Variants",
                      product.variants.length > 0
                        ? `${product.variants.length} available`
                        : "None",
                    ],
                    ["Featured", product.isFeatured ? "Yes" : "No"],
                  ] as [string, string][]
                ).map(([k, v]) => (
                  <tr key={k} className="border-b border-border">
                    <td className="py-3 pr-8 text-gray-500 w-44 font-medium">
                      {k}
                    </td>
                    <td className="py-3 text-gray-900 capitalize">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabsContent>

          {/* Specification */}
          <TabsContent value="specification" className="p-8">
            {product.variants.length > 0 ? (
              <table className="w-full text-[14px] border-collapse">
                <tbody>
                  {product.variants.map((vr) => (
                    <tr key={vr.id} className="border-b border-border">
                      <td className="py-3 pr-8 text-gray-500 w-48 font-medium">
                        {vr.name}
                      </td>
                      <td className="py-3 text-gray-900">
                        {vr.price.toLocaleString("vi-VN")}₫ · Stock: {vr.stock}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 text-[14px]">
                No specifications available.
              </p>
            )}
          </TabsContent>

          {/* Reviews */}
          <TabsContent value="reviews" className="p-8" id="reviews">
            <div className="grid grid-cols-[1fr_260px] gap-10">
              <div>
                {reviews.length === 0 ? (
                  <p className="text-gray-500 text-[14px]">No reviews yet.</p>
                ) : (
                  reviews.map((r) => (
                    <div key={r.id} className="py-5 border-b border-border">
                      <div className="flex items-center gap-3 mb-2">
                        <MiniStars rating={r.rating} />
                        <span className="text-[14px] font-semibold text-gray-900">
                          {r.user.fullName
                            ? String(r.user.fullName)
                            : "Anonymous"}
                        </span>
                      </div>
                      {r.content && (
                        <p className="text-[14px] leading-relaxed text-gray-500 m-0">
                          {String(r.content)}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
              <aside className="bg-muted rounded p-6 self-start text-center">
                <div className="text-[52px] font-bold text-gray-900 leading-none mb-2">
                  {avgRating.toFixed(1)}
                </div>
                <div className="flex justify-center gap-0.5 mb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill={avgRating >= i ? "#FA8232" : "none"}
                      stroke="#FA8232"
                      strokeWidth="1.5"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="text-[13px] text-gray-500">
                  {reviews.length} Ratings
                </p>
              </aside>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* ── Related products (4-column sections) ─────────────────────────── */}
      {allRelated.length > 0 && (
        <div className="mt-5 grid grid-cols-4 gap-4">
          {sections.map(({ title, items }) => (
            <div
              key={title}
              className="bg-white border border-border rounded-sm p-4"
            >
              <h3 className="text-[13px] font-bold text-gray-900 tracking-wide mb-3 pb-2 border-b border-border">
                {title}
              </h3>
              <div className="divide-y divide-border">
                {items.map((p) => (
                  <HorizontalProductCard
                    key={p.id}
                    img={p.img}
                    name={p.name}
                    price={p.price}
                    slug={p.id}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
