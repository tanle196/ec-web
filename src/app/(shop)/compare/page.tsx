"use client";

import Link from "next/link";
import { useQueries } from "@tanstack/react-query";
import { productsControllerFindOne } from "@/api/main";
import { mainService } from "@/lib/api/client";
import { productKeys } from "@/queries/products";
import { useAddToCart } from "@/queries/cart";
import { useCompareStore } from "@/stores/compare-store";
import { ProductImage } from "@/components/commons/product-image";
import type { ProductResponseDto } from "@/api/main";
import { Container } from "@/components/commons/container";
import { PageBreadcrumb } from "@/components/commons/breadcrumb";

const SLOTS = [0, 1, 2] as const;

const SPEC_ROWS: { key: string; label: string }[] = [
  { key: "feedback", label: "Customer feedback:" },
  { key: "price", label: "Price:" },
  { key: "sold_by", label: "Sold by:" },
  { key: "brand", label: "Brand:" },
  { key: "model", label: "Model:" },
  { key: "stock", label: "Stock status:" },
  { key: "size", label: "Size:" },
  { key: "weight", label: "Weight:" },
];

function getStockInfo(product: ProductResponseDto) {
  const totalStock = product.variants.reduce((s, v) => s + v.stock, 0);
  return totalStock > 0;
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg
            key={i}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={i <= rating ? "#fa8232" : "none"}
            stroke="#fa8232"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
      <span className="text-[13px] text-[#77878f]">
        ({count.toLocaleString()})
      </span>
    </div>
  );
}

function SpecCell({
  specKey,
  product,
}: {
  specKey: string;
  product: ProductResponseDto | null;
}) {
  if (!product) {
    return <span className="text-[#77878f]">—</span>;
  }

  switch (specKey) {
    case "feedback":
      return <StarRating rating={0} count={0} />;

    case "price": {
      const price = product.variants[0]?.price ?? product.basePrice;
      return (
        <span className="font-semibold text-[#2da5f3] text-[16px]">
          {(price / 100).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      );
    }

    case "sold_by":
      return <span>Marlo</span>;

    case "brand":
      return <span>{product.tags[0]?.name ?? "—"}</span>;

    case "model":
      return <span>{product.sku}</span>;

    case "stock": {
      const inStock = getStockInfo(product);
      return (
        <span
          className={`font-semibold text-[13px] uppercase tracking-wide ${
            inStock ? "text-[#2db224]" : "text-[#ee5858]"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      );
    }

    case "size":
      return <span>—</span>;

    case "weight":
      return <span>—</span>;

    default:
      return <span>—</span>;
  }
}

function AddToCartButton({ product }: { product: ProductResponseDto }) {
  const addToCart = useAddToCart();
  const firstVariant = product.variants[0];
  const inStock = getStockInfo(product);

  return (
    <button
      disabled={!firstVariant || !inStock || addToCart.isPending}
      onClick={() => {
        if (firstVariant) {
          addToCart.mutate({ variant_id: firstVariant.id, quantity: 1 });
        }
      }}
      className={`flex-1 flex items-center justify-center gap-2 h-12 rounded-[2px] text-[13px] font-bold uppercase tracking-wide text-white transition-opacity duration-150 ${
        inStock
          ? "bg-[#fa8232] hover:opacity-90 cursor-pointer"
          : "bg-[#adb7bc] cursor-not-allowed"
      }`}
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
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
      {addToCart.isPending ? "Adding…" : "Add to Cart"}
    </button>
  );
}

function EmptySlot() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-60 gap-4 text-[#77878f]">
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
      <Link
        href="/search"
        className="text-[14px] font-medium text-[#2da5f3] hover:underline no-underline"
      >
        Add a product
      </Link>
    </div>
  );
}

export default function ComparePage() {
  const { productIds, removeProduct } = useCompareStore();

  const results = useQueries({
    queries: SLOTS.map((i) => {
      const id = productIds[i];
      return {
        queryKey: id
          ? productKeys.detail(id)
          : (["compare", "empty", i] as const),
        queryFn: id
          ? () =>
              mainService.request(productsControllerFindOne)({ path: { id } })
          : () => null,
        enabled: !!id,
      };
    }),
  });

  const products = results.map((r) => r.data ?? null);
  const isLoading = results.some((r) => r.isLoading);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb strip */}
      <div className="bg-[#f2f4f5] h-18 flex items-center">
        <Container>
          <PageBreadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Compare" }]}
          />
        </Container>
      </div>

      {/* Main content */}
      <Container className="py-10 pb-24">
        {isLoading ? (
          <div className="flex items-center justify-center h-80">
            <div className="w-8 h-8 border-2 border-[#fa8232] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : productIds.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-80 gap-5 text-center">
            <svg
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#adb7bc"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" />
              <path d="M18 3h3v3" />
              <path d="M3 21 21 3" />
            </svg>
            <div>
              <h2 className="text-[20px] font-semibold text-[#191c1f] mb-2">
                No products to compare
              </h2>
              <p className="text-[14px] text-[#77878f] mb-5">
                Browse products and add up to 3 items to compare side by side.
              </p>
              <Link
                href="/search"
                className="inline-flex items-center gap-2 px-6 h-11 rounded-[2px] bg-[#fa8232] text-white text-[14px] font-bold uppercase tracking-wide no-underline hover:opacity-90 transition-opacity"
              >
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="border border-[#e4e7e9] rounded-sm overflow-hidden">
            {/* Product header grid */}
            <div
              className="grid divide-x divide-[#e4e7e9]"
              style={{ gridTemplateColumns: "200px 1fr 1fr 1fr" }}
            >
              {/* Empty label cell */}
              <div className="bg-[#f2f4f5] p-6" />

              {/* Product columns header */}
              {SLOTS.map((i) => {
                const product = products[i];
                return (
                  <div
                    key={i}
                    className="p-6 flex flex-col items-center gap-4 border-b border-[#e4e7e9]"
                  >
                    {product ? (
                      <>
                        {/* Remove button */}
                        <button
                          onClick={() => removeProduct(product.id)}
                          className="self-end w-7 h-7 rounded-full flex items-center justify-center text-[#77878f] hover:text-[#ee5858] hover:bg-[#f2f4f5] transition-colors border-0 bg-transparent cursor-pointer"
                          aria-label="Remove from compare"
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
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                          </svg>
                        </button>

                        {/* Product image */}
                        <div className="w-48 h-48 flex items-center justify-center">
                          <ProductImage
                            src={
                              product.images.find((img) => img.isPrimary)
                                ?.url ??
                              product.images[0]?.url ??
                              "/no-image.svg"
                            }
                            alt={product.name}
                            width={180}
                            height={180}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {/* Product name */}
                        <p className="text-[14px] leading-5 text-[#191c1f] text-center line-clamp-3 w-full">
                          {product.name}
                        </p>

                        {/* Action buttons */}
                        <div className="flex gap-2 w-full">
                          <AddToCartButton product={product} />
                          <button className="flex-none flex items-center justify-center w-12 h-12 border-[1.5px] border-[#ffe7d6] rounded-[2px] bg-transparent cursor-pointer hover:bg-[#fff5ef] transition-colors">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#fa8232"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                            </svg>
                          </button>
                        </div>
                      </>
                    ) : (
                      <EmptySlot />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Spec rows */}
            {SPEC_ROWS.map((row, rowIdx) => (
              <div
                key={row.key}
                className="grid divide-x divide-[#e4e7e9]"
                style={{ gridTemplateColumns: "200px 1fr 1fr 1fr" }}
              >
                {/* Label */}
                <div
                  className={`px-6 py-3 flex items-center text-[14px] text-[#475156] ${
                    rowIdx % 2 === 0 ? "bg-[#f2f4f5]" : "bg-white"
                  }`}
                >
                  {row.label}
                </div>

                {/* Values */}
                {SLOTS.map((i) => (
                  <div
                    key={i}
                    className={`px-6 py-3 flex items-center text-[14px] text-[#191c1f] ${
                      rowIdx % 2 === 0 ? "bg-[#f2f4f5]" : "bg-white"
                    }`}
                  >
                    <SpecCell specKey={row.key} product={products[i]} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
