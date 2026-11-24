"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductImage } from "@/components/commons/product-image";
import { useCart, useUpdateCartItem, useRemoveCartItem } from "@/queries/cart";
import { mapCartItem, type CartLine } from "@/lib/api/mappers";
import { useAuth } from "@/hooks/use-auth";
import { useGuestCart } from "@/hooks/use-guest-cart";
import { Container } from "@/components/commons/container";
import { PageBreadcrumb } from "@/components/commons/breadcrumb";

function formatUSD(cents: number) {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function QtyStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex w-37 items-center justify-between rounded-[3px] border border-[#e4e7e9] bg-white px-5 py-3">
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        className="flex h-4 w-4 cursor-pointer items-center justify-center border-0 bg-transparent text-gray-700 transition-colors hover:text-[#191c1f]"
        aria-label="Decrease quantity"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <span className="text-[16px] leading-6 font-normal text-gray-700 tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        className="flex h-4 w-4 cursor-pointer items-center justify-center border-0 bg-transparent text-gray-700 transition-colors hover:text-[#191c1f]"
        aria-label="Increase quantity"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
}

function CartRow({
  item,
  onUpdateQty,
  onRemove,
}: {
  item: CartLine;
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}) {
  const subtotal = item.price * item.qty;
  return (
    <div className="flex items-center gap-6">
      {/* Remove + image + name */}
      <div
        className="flex min-w-0 items-center gap-3"
        style={{ width: 380, flexShrink: 0 }}
      >
        <button
          onClick={() => onRemove(item.lineId)}
          className="flex h-6 w-6 flex-none cursor-pointer items-center justify-center border-0 bg-transparent text-[#adb7bc] transition-colors hover:text-[#ee5858]"
          aria-label="Remove item"
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
        <div className="h-18 w-18 flex-none overflow-hidden rounded-xs bg-[#f2f4f5]">
          <ProductImage
            src={item.img}
            alt={item.name}
            width={72}
            height={72}
            className="h-full w-full object-cover"
          />
        </div>
        <p className="line-clamp-3 min-w-0 text-[14px] leading-5 text-[#191c1f]">
          {item.name}
        </p>
      </div>

      {/* Price */}
      <div className="flex-none" style={{ width: 88 }}>
        <span className="text-[14px] leading-5 text-gray-700">
          {formatUSD(item.price)}
        </span>
      </div>

      {/* Quantity */}
      <div className="flex-none pr-6" style={{ width: 172 }}>
        <QtyStepper
          value={item.qty}
          onChange={(v) => onUpdateQty(item.lineId, v)}
        />
      </div>

      {/* Sub-total */}
      <div className="flex-none" style={{ width: 112 }}>
        <span className="text-[14px] font-medium text-[#191c1f]">
          {formatUSD(subtotal)}
        </span>
      </div>
    </div>
  );
}

export default function CartPage() {
  const [coupon, setCoupon] = useState("");

  const { isLoggedIn } = useAuth();
  const { data: cart, isLoading: isCartLoading } = useCart({
    enabled: isLoggedIn,
  });
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();
  const guestCart = useGuestCart();

  const isLoading = isLoggedIn && isCartLoading;

  const items: CartLine[] = isLoggedIn
    ? (cart?.items ?? []).map(mapCartItem)
    : guestCart.items.map((i) => ({
        lineId: i.variantId,
        img: i.image,
        name: i.name,
        seller: "Marlo",
        variant: i.variantName,
        price: i.price,
        qty: i.quantity,
      }));

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 0 && subtotal < 5000 ? 999 : 0;
  const discount = 0;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + shipping - discount + tax;

  function handleUpdateQty(itemId: string, quantity: number) {
    if (isLoggedIn) {
      updateItem.mutate({ itemId, body: { quantity } });
    } else {
      guestCart.updateQuantity(itemId, quantity);
    }
  }

  function handleRemove(itemId: string) {
    if (isLoggedIn) {
      removeItem.mutate(itemId);
    } else {
      guestCart.removeItem(itemId);
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#fa8232] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="flex h-18 items-center bg-[#f2f4f5]">
        <Container>
          <PageBreadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Shopping Cart" }]}
          />
        </Container>
      </div>

      {/* Main content */}
      <Container className="py-10 pb-24">
        {items.length === 0 ? (
          <div className="flex h-80 flex-col items-center justify-center gap-5 text-center">
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
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            <div>
              <h2 className="mb-2 text-[20px] font-semibold text-[#191c1f]">
                Your cart is empty
              </h2>
              <p className="mb-5 text-[14px] text-[#77878f]">
                Browse our products and find something you love.
              </p>
              <Link
                href="/search"
                className="inline-flex h-11 items-center gap-2 rounded-xs bg-[#fa8232] px-6 text-[14px] font-bold tracking-wide text-white uppercase no-underline transition-opacity hover:opacity-90"
              >
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-6">
            {/* Left: Cart table */}
            <div className="min-w-0 flex-1 rounded-[4px] border border-[#e4e7e9]">
              {/* Heading */}
              <div className="border-b border-[#e4e7e9] px-6 py-5">
                <h1 className="text-[18px] leading-6 font-medium text-[#191c1f]">
                  Shopping Cart
                </h1>
              </div>

              {/* Column headers */}
              <div className="flex items-center gap-6 border-b border-[#e4e7e9] bg-[#f2f4f5] px-6 py-2.5">
                <p
                  className="text-[12px] font-medium tracking-wide text-gray-700 uppercase"
                  style={{ width: 380, flexShrink: 0 }}
                >
                  Products
                </p>
                <p
                  className="flex-none text-[12px] font-medium tracking-wide text-gray-700 uppercase"
                  style={{ width: 88 }}
                >
                  Price
                </p>
                <p
                  className="flex-none text-[12px] font-medium tracking-wide text-gray-700 uppercase"
                  style={{ width: 172 }}
                >
                  Quantity
                </p>
                <p
                  className="flex-none text-[12px] font-medium tracking-wide text-gray-700 uppercase"
                  style={{ width: 112 }}
                >
                  Sub-Total
                </p>
              </div>

              {/* Rows */}
              <div className="flex flex-col gap-4 px-6 py-6">
                {items.map((item) => (
                  <CartRow
                    key={item.lineId}
                    item={item}
                    onUpdateQty={handleUpdateQty}
                    onRemove={handleRemove}
                  />
                ))}
              </div>

              <div className="border-t border-[#e4e7e9]" />

              {/* Footer buttons */}
              <div className="flex items-center justify-between px-6 py-6">
                <Link
                  href="/search"
                  className="flex h-12 items-center gap-2 rounded-xs border-2 border-[#2da5f3] px-6 text-[14px] font-bold tracking-wide text-[#2da5f3] uppercase no-underline transition-colors hover:bg-[#2da5f3] hover:text-white"
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
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  Return to Shop
                </Link>
                <button className="h-12 cursor-pointer rounded-xs border-2 border-[#2da5f3] bg-transparent px-6 text-[14px] font-bold tracking-wide text-[#2da5f3] uppercase transition-colors hover:bg-[#2da5f3] hover:text-white">
                  Update Cart
                </button>
              </div>
            </div>

            {/* Right: Card Totals + Coupon */}
            <div
              className="flex flex-none flex-col gap-4"
              style={{ width: 424 }}
            >
              {/* Card Totals */}
              <div className="overflow-hidden rounded-[4px] border border-[#e4e7e9]">
                <div className="border-b border-[#e4e7e9] px-6 py-5">
                  <h2 className="text-[18px] leading-6 font-medium text-[#191c1f]">
                    Card Totals
                  </h2>
                </div>
                <div className="flex flex-col gap-4 px-6 py-6">
                  <div className="flex flex-col gap-3 text-[14px] leading-5">
                    <div className="flex items-center justify-between">
                      <span className="text-[#5f6c72]">Sub-total</span>
                      <span className="font-medium text-[#191c1f]">
                        {formatUSD(subtotal)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#5f6c72]">Shipping</span>
                      <span className="font-medium text-[#191c1f]">
                        {shipping === 0 ? "Free" : formatUSD(shipping)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#5f6c72]">Discount</span>
                      <span className="font-medium text-[#191c1f]">
                        {formatUSD(discount)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#5f6c72]">Tax</span>
                      <span className="font-medium text-[#191c1f]">
                        {formatUSD(tax)}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-[#e4e7e9]" />

                  <div className="flex items-center justify-between text-[16px] leading-6">
                    <span className="text-[#191c1f]">Total</span>
                    <span className="font-semibold text-[#191c1f]">
                      {formatUSD(total)}
                    </span>
                  </div>

                  <Link
                    href={isLoggedIn ? "/checkout" : "/login"}
                    className="flex h-14 items-center justify-center gap-3 rounded-[3px] bg-[#fa8232] text-[16px] font-bold tracking-wide text-white uppercase no-underline transition-opacity hover:opacity-90"
                  >
                    Proceed to Checkout
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="overflow-hidden rounded-[4px] border border-[#e4e7e9]">
                <div className="border-b border-[#e4e7e9] px-6 py-5">
                  <h2 className="text-[18px] leading-6 font-medium text-[#191c1f]">
                    Coupon Code
                  </h2>
                </div>
                <div className="flex flex-col gap-4 px-6 py-6">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter coupon code"
                    className="h-11 w-full rounded-xs border border-[#e4e7e9] px-4 text-[14px] text-[#191c1f] transition-colors outline-none placeholder:text-[#77878f] focus:border-[#2da5f3]"
                  />
                  <button className="h-12 cursor-pointer rounded-xs border-0 bg-[#2da5f3] text-[14px] font-bold tracking-wide text-white uppercase transition-opacity hover:opacity-90">
                    Apply Coupon
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
