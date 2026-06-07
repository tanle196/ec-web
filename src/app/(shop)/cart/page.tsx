"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductImage } from "@/components/commons/product-image";
import { useCart, useUpdateCartItem, useRemoveCartItem } from "@/queries/cart";
import { mapCartItem } from "@/lib/api/mappers";

function formatUSD(cents: number) {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function QtyStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between bg-white border border-[#e4e7e9] rounded-[3px] w-37 px-5 py-3">
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        className="w-4 h-4 flex items-center justify-center text-gray-700 bg-transparent border-0 cursor-pointer hover:text-[#191c1f] transition-colors"
        aria-label="Decrease quantity"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <span className="text-[16px] leading-6 text-gray-700 font-normal tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        className="w-4 h-4 flex items-center justify-center text-gray-700 bg-transparent border-0 cursor-pointer hover:text-[#191c1f] transition-colors"
        aria-label="Increase quantity"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
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
  item: ReturnType<typeof mapCartItem>;
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}) {
  const subtotal = item.price * item.qty;
  return (
    <div className="flex items-center gap-6">
      {/* Remove + image + name */}
      <div className="flex items-center gap-3 min-w-0" style={{ width: 380, flexShrink: 0 }}>
        <button
          onClick={() => onRemove(item.lineId)}
          className="w-6 h-6 flex items-center justify-center text-[#adb7bc] hover:text-[#ee5858] transition-colors bg-transparent border-0 cursor-pointer flex-none"
          aria-label="Remove item"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </button>
        <div className="w-18 h-18 rounded-xs flex-none overflow-hidden bg-[#f2f4f5]">
          <ProductImage src={item.img} alt={item.name} width={72} height={72} className="w-full h-full object-cover" />
        </div>
        <p className="text-[14px] leading-5 text-[#191c1f] line-clamp-3 min-w-0">{item.name}</p>
      </div>

      {/* Price */}
      <div className="flex-none" style={{ width: 88 }}>
        <span className="text-[14px] leading-5 text-gray-700">{formatUSD(item.price)}</span>
      </div>

      {/* Quantity */}
      <div className="flex-none pr-6" style={{ width: 172 }}>
        <QtyStepper value={item.qty} onChange={(v) => onUpdateQty(item.lineId, v)} />
      </div>

      {/* Sub-total */}
      <div className="flex-none" style={{ width: 112 }}>
        <span className="text-[14px] font-medium text-[#191c1f]">{formatUSD(subtotal)}</span>
      </div>
    </div>
  );
}

export default function CartPage() {
  const [coupon, setCoupon] = useState("");

  const { data: cart, isLoading } = useCart();
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();

  const items = (cart?.items ?? []).map(mapCartItem);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 0 && subtotal < 5000 ? 999 : 0;
  const discount = 0;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + shipping - discount + tax;

  function handleUpdateQty(itemId: string, quantity: number) {
    updateItem.mutate({ itemId, body: { quantity } });
  }

  function handleRemove(itemId: string) {
    removeItem.mutate(itemId);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#fa8232] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#f2f4f5] h-18 flex items-center">
        <div className="max-w-7xl mx-auto px-16 w-full">
          <nav className="flex items-center gap-2 text-[14px] leading-5">
            <Link
              href="/"
              className="text-[#5f6c72] hover:text-[#191c1f] transition-colors no-underline flex items-center gap-1.5"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Home
            </Link>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#5f6c72]">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span className="font-medium text-[#2da5f3]">Shopping Cart</span>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-16 py-10 pb-24">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-80 gap-5 text-center">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#adb7bc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            <div>
              <h2 className="text-[20px] font-semibold text-[#191c1f] mb-2">Your cart is empty</h2>
              <p className="text-[14px] text-[#77878f] mb-5">
                Browse our products and find something you love.
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
          <div className="flex gap-6 items-start">
            {/* Left: Cart table */}
            <div className="flex-1 min-w-0 border border-[#e4e7e9] rounded-[4px]">
              {/* Heading */}
              <div className="px-6 py-5 border-b border-[#e4e7e9]">
                <h1 className="text-[18px] font-medium text-[#191c1f] leading-6">Shopping Cart</h1>
              </div>

              {/* Column headers */}
              <div className="flex items-center gap-6 bg-[#f2f4f5] border-b border-[#e4e7e9] px-6 py-2.5">
                <p className="text-[12px] font-medium text-gray-700 uppercase tracking-wide" style={{ width: 380, flexShrink: 0 }}>
                  Products
                </p>
                <p className="text-[12px] font-medium text-gray-700 uppercase tracking-wide flex-none" style={{ width: 88 }}>
                  Price
                </p>
                <p className="text-[12px] font-medium text-gray-700 uppercase tracking-wide flex-none" style={{ width: 172 }}>
                  Quantity
                </p>
                <p className="text-[12px] font-medium text-gray-700 uppercase tracking-wide flex-none" style={{ width: 112 }}>
                  Sub-Total
                </p>
              </div>

              {/* Rows */}
              <div className="px-6 py-6 flex flex-col gap-4">
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
                  className="flex items-center gap-2 border-2 border-[#2da5f3] text-[#2da5f3] text-[14px] font-bold uppercase tracking-wide px-6 h-12 rounded-xs no-underline hover:bg-[#2da5f3] hover:text-white transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  Return to Shop
                </Link>
                <button className="border-2 border-[#2da5f3] text-[#2da5f3] text-[14px] font-bold uppercase tracking-wide px-6 h-12 rounded-xs bg-transparent cursor-pointer hover:bg-[#2da5f3] hover:text-white transition-colors">
                  Update Cart
                </button>
              </div>
            </div>

            {/* Right: Card Totals + Coupon */}
            <div className="flex flex-col gap-4 flex-none" style={{ width: 424 }}>
              {/* Card Totals */}
              <div className="border border-[#e4e7e9] rounded-[4px] overflow-hidden">
                <div className="px-6 py-5 border-b border-[#e4e7e9]">
                  <h2 className="text-[18px] font-medium text-[#191c1f] leading-6">Card Totals</h2>
                </div>
                <div className="px-6 py-6 flex flex-col gap-4">
                  <div className="flex flex-col gap-3 text-[14px] leading-5">
                    <div className="flex items-center justify-between">
                      <span className="text-[#5f6c72]">Sub-total</span>
                      <span className="font-medium text-[#191c1f]">{formatUSD(subtotal)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#5f6c72]">Shipping</span>
                      <span className="font-medium text-[#191c1f]">
                        {shipping === 0 ? "Free" : formatUSD(shipping)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#5f6c72]">Discount</span>
                      <span className="font-medium text-[#191c1f]">{formatUSD(discount)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#5f6c72]">Tax</span>
                      <span className="font-medium text-[#191c1f]">{formatUSD(tax)}</span>
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
                    href="/checkout"
                    className="flex items-center justify-center gap-3 h-14 bg-[#fa8232] text-white text-[16px] font-bold uppercase tracking-wide rounded-[3px] no-underline hover:opacity-90 transition-opacity"
                  >
                    Proceed to Checkout
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="border border-[#e4e7e9] rounded-[4px] overflow-hidden">
                <div className="px-6 py-5 border-b border-[#e4e7e9]">
                  <h2 className="text-[18px] font-medium text-[#191c1f] leading-6">Coupon Code</h2>
                </div>
                <div className="px-6 py-6 flex flex-col gap-4">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter coupon code"
                    className="w-full h-11 border border-[#e4e7e9] rounded-xs px-4 text-[14px] text-[#191c1f] placeholder:text-[#77878f] outline-none focus:border-[#2da5f3] transition-colors"
                  />
                  <button className="h-12 bg-[#2da5f3] text-white text-[14px] font-bold uppercase tracking-wide rounded-xs border-0 cursor-pointer hover:opacity-90 transition-opacity">
                    Apply Coupon
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
