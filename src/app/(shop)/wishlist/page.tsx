"use client";

import Link from "next/link";
import { useQueries } from "@tanstack/react-query";
import { productsControllerFindOne } from "@/api/main";
import { mainService } from "@/lib/api/client";
import { productKeys } from "@/queries/products";
import { useAddToCart } from "@/queries/cart";
import { useWishlistStore } from "@/stores/wishlist-store";
import { ProductImage } from "@/components/commons/product-image";
import type { ProductResponseDto } from "@/api/main";

function getStockInfo(product: ProductResponseDto) {
  return product.variants.reduce((s, v) => s + v.stock, 0) > 0;
}

function formatPrice(cents: number) {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function AddToCartBtn({ product }: { product: ProductResponseDto }) {
  const addToCart = useAddToCart();
  const inStock = getStockInfo(product);
  const firstVariant = product.variants[0];

  return (
    <button
      disabled={!firstVariant || !inStock || addToCart.isPending}
      onClick={() => {
        if (firstVariant) {
          addToCart.mutate({ variant_id: firstVariant.id, quantity: 1 });
        }
      }}
      className={`flex items-center gap-2 px-6 h-12 rounded-xs text-[13px] font-bold uppercase tracking-wide text-white transition-opacity ${
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

function RemoveBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-6 h-6 flex items-center justify-center text-[#adb7bc] hover:text-[#ee5858] transition-colors bg-transparent border-0 cursor-pointer"
      aria-label="Remove from wishlist"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    </button>
  );
}

function WishlistRow({
  product,
  onRemove,
}: {
  product: ProductResponseDto;
  onRemove: () => void;
}) {
  const inStock = getStockInfo(product);
  const firstVariant = product.variants[0];
  const primaryImg =
    product.images.find((img) => img.isPrimary)?.url ??
    product.images[0]?.url ??
    "/no-image.svg";

  const price = firstVariant?.price ?? product.basePrice;

  return (
    <div className="flex items-center gap-6 py-4 border-b border-[#e4e7e9] last:border-b-0">
      {/* Product: image + name */}
      <div className="flex items-center gap-4 flex-1 min-w-0 pr-4">
        <div className="w-18 h-18 flex-none rounded-xs overflow-hidden bg-[#f2f4f5]">
          <ProductImage
            src={primaryImg}
            alt={product.name}
            width={72}
            height={72}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-[14px] leading-5 text-gray-700 line-clamp-3">
          {product.name}
        </p>
      </div>

      {/* Price */}
      <div className="w-48 flex-none flex items-center gap-2.5">
        <span className="text-[14px] font-medium text-[#191c1f]">
          {formatPrice(price)}
        </span>
      </div>

      {/* Stock Status */}
      <div className="w-44 flex-none">
        <span
          className={`text-[14px] font-semibold uppercase ${
            inStock ? "text-[#2db224]" : "text-[#ee5858]"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6 flex-none">
        <AddToCartBtn product={product} />
        <RemoveBtn onClick={onRemove} />
      </div>
    </div>
  );
}

export default function WishlistPage() {
  const { productIds, removeProduct } = useWishlistStore();

  const results = useQueries({
    queries: productIds.map((id) => ({
      queryKey: productKeys.detail(id),
      queryFn: () =>
        mainService.request(productsControllerFindOne)({ path: { id } }),
    })),
  });

  const isLoading = results.some((r) => r.isLoading);
  const products = results.map((r) => r.data ?? null).filter(Boolean) as ProductResponseDto[];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb strip */}
      <div className="bg-[#f2f4f5] h-18 flex items-center">
        <div className="max-w-7xl mx-auto px-16 w-full">
          <nav className="flex items-center gap-2 text-[14px] leading-5">
            <Link
              href="/"
              className="text-[#5f6c72] hover:text-[#191c1f] transition-colors no-underline flex items-center gap-1.5"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Home
            </Link>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#5f6c72]"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span className="font-medium text-[#2da5f3]">Wishlist</span>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-16 py-10 pb-24">
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
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            <div>
              <h2 className="text-[20px] font-semibold text-[#191c1f] mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-[14px] text-[#77878f] mb-5">
                Save products you love and come back to them later.
              </p>
              <Link
                href="/search"
                className="inline-flex items-center gap-2 px-6 h-11 rounded-xs bg-[#fa8232] text-white text-[14px] font-bold uppercase tracking-wide no-underline hover:opacity-90 transition-opacity"
              >
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="border border-[#e4e7e9] rounded-[4px] overflow-hidden">
            {/* Heading */}
            <div className="px-6 py-5 border-b border-[#e4e7e9]">
              <h1 className="text-[18px] font-medium text-[#191c1f] leading-6">
                Wishlist
              </h1>
            </div>

            {/* Column headers */}
            <div className="flex items-center gap-6 bg-[#f2f4f5] border-b border-[#e4e7e9] px-6 py-2.5">
              <p className="flex-1 text-[12px] font-medium text-gray-700 uppercase tracking-wide">
                Products
              </p>
              <p className="w-48 flex-none text-[12px] font-medium text-gray-700 uppercase tracking-wide">
                Price
              </p>
              <p className="w-44 flex-none text-[12px] font-medium text-gray-700 uppercase tracking-wide">
                Stock Status
              </p>
              <p className="flex-none text-[12px] font-medium text-gray-700 uppercase tracking-wide" style={{ width: "calc(148px + 24px + 24px)" }}>
                Actions
              </p>
            </div>

            {/* Rows */}
            <div className="px-6">
              {products.map((product) => (
                <WishlistRow
                  key={product.id}
                  product={product}
                  onRemove={() => removeProduct(product.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
