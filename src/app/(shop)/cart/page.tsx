"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Price } from "@/components/commons/price";
import { SectionHeader } from "@/components/commons/section-header";
import { ProductGrid } from "@/components/commons/product-grid";
import { useCart, useUpdateCartItem, useRemoveCartItem } from "@/queries/cart";
import { useProducts } from "@/queries/products";
import { mapCartItem, mapProductListItem } from "@/lib/api/mappers";

function QtyStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="inline-flex items-center bg-white border border-marlo-border rounded-full h-10 px-1">
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        className="w-8 h-8 rounded-full border-0 bg-transparent cursor-pointer flex items-center justify-center text-foreground hover:bg-cream-2 transition-colors duration-150"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <span className="font-mono-marlo text-[14px] font-semibold px-3 min-w-7 text-center text-foreground">
        {value}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        className="w-8 h-8 rounded-full border-0 bg-transparent cursor-pointer flex items-center justify-center text-foreground hover:bg-cream-2 transition-colors duration-150"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
}

function CartLineItem({
  item,
  onUpdateQty,
  onRemove,
}: {
  item: ReturnType<typeof mapCartItem>;
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div
      className="grid items-center gap-5 py-6 border-b border-marlo-border"
      style={{ gridTemplateColumns: "120px 1fr auto auto" }}
    >
      <div className="w-30 h-30 bg-cream rounded-[12px] p-2 flex items-center justify-center flex-none">
        <Image src={item.img} alt={item.name} width={100} height={100} className="w-full h-full object-contain" />
      </div>

      <div className="flex flex-col gap-1 min-w-0">
        <span className="text-[12px] font-medium tracking-[0.04em] uppercase text-text-tertiary">
          {item.seller}
        </span>
        <span className="text-[16px] font-semibold text-foreground leading-snug">{item.name}</span>
        <span className="text-[13px] text-text-secondary">{item.variant}</span>
        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={() => onRemove(item.lineId)}
            className="bg-transparent border-0 text-foreground text-[13px] font-medium cursor-pointer underline underline-offset-3 p-0 hover:text-text-secondary transition-colors"
          >
            Xóa
          </button>
        </div>
      </div>

      <QtyStepper value={item.qty} onChange={(v) => onUpdateQty(item.lineId, v)} />

      <div className="text-right min-w-30">
        <Price amount={item.price * item.qty} size="lg" />
        {item.was && (
          <div className="font-mono-marlo text-[12px] text-text-tertiary line-through mt-1">
            {(item.was * item.qty).toLocaleString("vi-VN")}₫
          </div>
        )}
      </div>
    </div>
  );
}

export default function CartPage() {
  const [promo, setPromo] = useState("");

  const { data: cart, isLoading } = useCart();
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();
  const recommendedQuery = useProducts({ status: "published", limit: 3 });

  const items = (cart?.items ?? []).map(mapCartItem);
  const recommended = (recommendedQuery.data?.data ?? []).slice(0, 3).map(mapProductListItem);

  function handleUpdateQty(itemId: string, quantity: number) {
    updateItem.mutate({ itemId, body: { quantity } });
  }

  function handleRemove(itemId: string) {
    removeItem.mutate(itemId);
  }

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 0 && subtotal < 500000 ? 30000 : 0;
  const total = subtotal + shipping;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center max-w-md px-8">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-5">
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
          <h1 className="text-[clamp(28px,3vw,36px)] font-semibold tracking-[-0.02em] text-foreground mb-3">
            Giỏ hàng trống.
          </h1>
          <p className="text-[16px] text-text-secondary mb-6">
            Xem qua deal — chắc chắn có thứ gì đó đáng mua.
          </p>
          <Link href="/" className="inline-flex items-center px-7 py-4 rounded-[8px] bg-persimmon text-white font-semibold text-[15px] no-underline hover:bg-persimmon-hover transition-colors duration-150">
            Bắt đầu mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-16 py-8 pb-20">
        <h1 className="text-[clamp(32px,3.5vw,44px)] font-semibold leading-[1.02] tracking-[-0.02em] text-foreground mb-8">
          Giỏ hàng{" "}
          <span className="text-text-tertiary font-medium">· {items.length} sản phẩm</span>
        </h1>

        <div className="grid gap-12 items-start" style={{ gridTemplateColumns: "1fr 380px" }}>
          {/* Left: Items */}
          <div>
            <div className="bg-white border border-marlo-border rounded-lg px-6 pt-1 pb-6">
              <div className="flex items-center gap-2.5 py-5 border-b border-marlo-border">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-success/10 text-success">
                  NGƯỜI BÁN UY TÍN
                </span>
                <span className="text-[14px] font-semibold text-foreground">
                  Bán bởi Marlo
                </span>
              </div>
              {items.map((item) => (
                <CartLineItem
                  key={item.lineId}
                  item={item}
                  onUpdateQty={handleUpdateQty}
                  onRemove={handleRemove}
                />
              ))}
            </div>

            {recommended.length > 0 && (
              <div className="mt-12">
                <SectionHeader title="Bạn có thể cần thêm" eyebrow="Gợi ý" />
                <div className="grid grid-cols-3 gap-4">
                  {recommended.map((p) => (
                    <ProductGrid key={p.id} products={[p]} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Order summary */}
          <aside className="sticky top-32.5 bg-white border border-marlo-border rounded-lg p-6">
            <h3 className="text-[18px] font-semibold text-foreground mb-5">Tóm tắt đơn hàng</h3>

            <div className="flex flex-col gap-3 pb-4 border-b border-marlo-border">
              {[
                { label: "Tạm tính", amount: subtotal, color: undefined, override: undefined },
                {
                  label: "Vận chuyển",
                  amount: shipping,
                  color: shipping === 0 ? "var(--color-success)" : undefined,
                  override: shipping === 0 ? "Miễn phí" : undefined,
                },
              ].map(({ label, amount, color, override }) => (
                <div key={label} className="flex justify-between text-[14px]">
                  <span className="text-text-secondary">{label}</span>
                  <span className="font-mono-marlo font-medium" style={{ color: color ?? "var(--foreground)" }}>
                    {override ?? `${amount.toLocaleString("vi-VN")}₫`}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-baseline py-4">
              <span className="text-[16px] font-semibold text-foreground">Tổng cộng</span>
              <Price amount={total} size="lg" />
            </div>

            <Link
              href="/checkout"
              className="w-full h-12 rounded-[8px] bg-persimmon text-white font-semibold text-[15px] border-0 cursor-pointer hover:bg-persimmon-hover transition-colors duration-150 mt-2 flex items-center justify-center no-underline"
            >
              Thanh toán an toàn
            </Link>

            <div className="flex items-center gap-2 mt-4 text-[12px] text-text-secondary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Marlo bảo vệ mọi đơn hàng — hoàn tiền 100% nếu có vấn đề.
            </div>

            {/* Promo code */}
            <div className="mt-5 pt-5 border-t border-marlo-border">
              <label className="block text-[12px] font-semibold text-text-secondary mb-2">
                Mã khuyến mãi
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder="Nhập mã"
                  className="flex-1 bg-cream border border-marlo-border rounded-[8px] px-3 py-2.5 text-[14px] text-foreground outline-none focus:border-foreground transition-colors"
                />
                <button className="px-4 h-10 rounded-[8px] bg-white border border-marlo-border text-[13px] font-semibold text-foreground cursor-pointer hover:bg-cream-2 transition-colors duration-150 whitespace-nowrap">
                  Áp dụng
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
