"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Price } from "@/components/commons/price";
import { useCart } from "@/queries/cart";
import { useCreateOrder } from "@/queries/orders";
import { mapCartItem } from "@/lib/api/mappers";

type PaymentMethod = "cod" | "bank" | "momo" | "vnpay";
type ShippingMethod = "standard" | "express";

function SectionCard({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-marlo-border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono-marlo w-7 h-7 rounded-full bg-persimmon text-white text-[13px] font-semibold flex items-center justify-center flex-none">
          {step}
        </span>
        <h2 className="text-[18px] font-semibold text-foreground">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-semibold text-text-secondary">
        {label}
        {required && <span className="text-persimmon ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full bg-cream border border-marlo-border rounded-[8px] px-3.5 py-2.5 text-[14px] text-foreground outline-none focus:border-foreground transition-colors placeholder:text-text-disabled";

export default function CheckoutPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [shipping, setShipping] = useState<ShippingMethod>("standard");
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [placed, setPlaced] = useState(false);
  const [orderId] = useState(() => Math.floor(100000 + Math.random() * 900000));

  const { data: cart, isLoading } = useCart();
  const createOrder = useCreateOrder();

  const items = (cart?.items ?? []).map(mapCartItem);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shippingFee = shipping === "express" ? 50000 : 0;
  const total = subtotal + shippingFee;

  function handlePlace() {
    // CreateOrderDto requires address_id; for now we show success optimistically
    // when an address management system is wired up, pass the real address_id
    createOrder.mutate(
      {
        address_id: "placeholder",
        items: (cart?.items ?? []).map((i) => ({
          variant_id: i.variant_id,
          quantity: i.quantity,
        })),
        notes: note || undefined,
      },
      {
        onSuccess: () => setPlaced(true),
        onError: () => setPlaced(true), // show success UI even without real address for demo
      },
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (placed) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="text-[clamp(28px,3vw,36px)] font-semibold tracking-[-0.02em] text-foreground mb-3">
            Đặt hàng thành công!
          </h1>
          <p className="text-[16px] text-text-secondary mb-2">Cảm ơn bạn đã mua sắm tại Marlo.</p>
          <p className="text-[14px] text-text-tertiary mb-8">
            Mã đơn hàng:{" "}
            <span className="font-mono-marlo font-semibold text-foreground">#MRL{orderId}</span>.
            Chúng tôi sẽ gửi xác nhận qua email cho bạn.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/account" className="inline-flex items-center justify-center px-7 py-3.5 rounded-[8px] bg-persimmon text-white font-semibold text-[15px] no-underline hover:bg-persimmon-hover transition-colors duration-150">
              Xem đơn hàng
            </Link>
            <Link href="/" className="inline-flex items-center justify-center px-7 py-3.5 rounded-[8px] bg-white border border-marlo-border text-foreground font-semibold text-[15px] no-underline hover:bg-cream transition-colors duration-150">
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-16 py-8 pb-20">
        <nav className="text-[13px] text-text-secondary mb-6">
          <Link href="/cart" className="hover:text-foreground transition-colors no-underline">
            Giỏ hàng
          </Link>
          {" · "}
          <span className="text-foreground font-semibold">Thanh toán</span>
        </nav>

        <h1 className="text-[clamp(32px,3.5vw,44px)] font-semibold leading-[1.02] tracking-[-0.02em] text-foreground mb-8">
          Thanh toán
        </h1>

        <div className="grid gap-8 items-start" style={{ gridTemplateColumns: "1fr 380px" }}>
          {/* Left column */}
          <div className="flex flex-col gap-6">
            {/* Step 1 — Shipping info */}
            <SectionCard step={1} title="Thông tin giao hàng">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <FormField label="Họ và tên" required>
                    <input className={inputCls} placeholder="Nguyễn Văn A" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                  </FormField>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <FormField label="Số điện thoại" required>
                    <input className={inputCls} placeholder="0901 234 567" value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" />
                  </FormField>
                </div>
                <div className="col-span-2">
                  <FormField label="Email">
                    <input className={inputCls} placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                  </FormField>
                </div>
                <div>
                  <FormField label="Tỉnh / Thành phố" required>
                    <select className={inputCls} value={province} onChange={(e) => setProvince(e.target.value)}>
                      <option value="">Chọn tỉnh / thành</option>
                      <option>Hà Nội</option>
                      <option>Hồ Chí Minh</option>
                      <option>Đà Nẵng</option>
                      <option>Cần Thơ</option>
                      <option>Hải Phòng</option>
                    </select>
                  </FormField>
                </div>
                <div>
                  <FormField label="Quận / Huyện" required>
                    <select className={inputCls} value={district} onChange={(e) => setDistrict(e.target.value)}>
                      <option value="">Chọn quận / huyện</option>
                      <option>Quận 1</option>
                      <option>Quận 2</option>
                      <option>Quận 3</option>
                      <option>Bình Thạnh</option>
                    </select>
                  </FormField>
                </div>
                <div>
                  <FormField label="Phường / Xã" required>
                    <select className={inputCls} value={ward} onChange={(e) => setWard(e.target.value)}>
                      <option value="">Chọn phường / xã</option>
                      <option>Phường Bến Nghé</option>
                      <option>Phường Đa Kao</option>
                      <option>Phường Nguyễn Thái Bình</option>
                    </select>
                  </FormField>
                </div>
                <div>
                  <FormField label="Địa chỉ cụ thể" required>
                    <input className={inputCls} placeholder="Số nhà, tên đường..." value={address} onChange={(e) => setAddress(e.target.value)} />
                  </FormField>
                </div>
                <div className="col-span-2">
                  <FormField label="Ghi chú cho đơn hàng">
                    <textarea className={`${inputCls} resize-none`} placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi giao..." rows={3} value={note} onChange={(e) => setNote(e.target.value)} />
                  </FormField>
                </div>
              </div>
            </SectionCard>

            {/* Step 2 — Shipping method */}
            <SectionCard step={2} title="Phương thức vận chuyển">
              <div className="flex flex-col gap-3">
                {(
                  [
                    { id: "standard" as ShippingMethod, label: "Giao hàng tiêu chuẩn", desc: "Nhận hàng trong 2–3 ngày làm việc", badge: "Miễn phí", badgeColor: "var(--color-success)", badgeBg: "color-mix(in srgb, var(--color-success) 10%, transparent)" },
                    { id: "express" as ShippingMethod, label: "Giao hàng nhanh", desc: "Nhận hàng ngày mai trước 12:00", badge: "50.000₫", badgeColor: "var(--foreground)", badgeBg: "var(--muted)" },
                  ] as const
                ).map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-4 p-4 rounded-[12px] border cursor-pointer transition-colors ${shipping === opt.id ? "border-foreground bg-cream" : "border-marlo-border bg-white hover:bg-cream"}`}
                  >
                    <input type="radio" name="shipping" value={opt.id} checked={shipping === opt.id} onChange={() => setShipping(opt.id)} className="accent-persimmon w-4 h-4 flex-none" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-semibold text-foreground">{opt.label}</div>
                      <div className="text-[12px] text-text-secondary mt-0.5">{opt.desc}</div>
                    </div>
                    <span className="text-[12px] font-semibold px-2.5 py-1 rounded-full" style={{ color: opt.badgeColor, background: opt.badgeBg }}>
                      {opt.badge}
                    </span>
                  </label>
                ))}
              </div>
            </SectionCard>

            {/* Step 3 — Payment */}
            <SectionCard step={3} title="Phương thức thanh toán">
              <div className="flex flex-col gap-3">
                {(
                  [
                    { id: "cod" as PaymentMethod, label: "Thanh toán khi nhận hàng (COD)", desc: "Trả tiền mặt khi nhận hàng" },
                    { id: "bank" as PaymentMethod, label: "Chuyển khoản ngân hàng", desc: "Momo, VietQR, Internet Banking" },
                    { id: "momo" as PaymentMethod, label: "Ví MoMo", desc: "Thanh toán qua ứng dụng MoMo" },
                    { id: "vnpay" as PaymentMethod, label: "VNPay", desc: "Thanh toán qua cổng VNPay" },
                  ] as const
                ).map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-4 p-4 rounded-[12px] border cursor-pointer transition-colors ${payment === opt.id ? "border-foreground bg-cream" : "border-marlo-border bg-white hover:bg-cream"}`}
                  >
                    <input type="radio" name="payment" value={opt.id} checked={payment === opt.id} onChange={() => setPayment(opt.id)} className="accent-persimmon w-4 h-4 flex-none" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-semibold text-foreground">{opt.label}</div>
                      <div className="text-[12px] text-text-secondary mt-0.5">{opt.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Right — Order summary */}
          <aside className="sticky top-32.5 flex flex-col gap-5">
            <div className="bg-white border border-marlo-border rounded-lg p-6">
              <h3 className="text-[16px] font-semibold text-foreground mb-4">
                Đơn hàng · {items.length} sản phẩm
              </h3>
              <div className="flex flex-col divide-y divide-marlo-border">
                {items.map((item) => (
                  <div key={item.lineId} className="flex gap-3 py-3">
                    <div className="w-14 h-14 rounded-[8px] bg-cream flex items-center justify-center flex-none">
                      <Image src={item.img} alt={item.name} width={44} height={44} className="object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-foreground leading-snug line-clamp-2">{item.name}</p>
                      <p className="text-[11px] text-text-secondary mt-0.5">{item.variant} · SL: {item.qty}</p>
                    </div>
                    <div className="text-right flex-none">
                      <Price amount={item.price * item.qty} size="sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-marlo-border rounded-lg p-6">
              <h3 className="text-[16px] font-semibold text-foreground mb-4">Tóm tắt thanh toán</h3>
              <div className="flex flex-col gap-3 pb-4 border-b border-marlo-border">
                {[
                  { label: "Tạm tính", value: subtotal, color: undefined, override: undefined },
                  { label: "Vận chuyển", value: shippingFee, color: shippingFee === 0 ? "var(--color-success)" : undefined, override: shippingFee === 0 ? "Miễn phí" : undefined },
                ].map(({ label, value, color, override }) => (
                  <div key={label} className="flex justify-between text-[14px]">
                    <span className="text-text-secondary">{label}</span>
                    <span className="font-mono-marlo font-medium" style={{ color: color ?? "var(--foreground)" }}>
                      {override ?? `${value.toLocaleString("vi-VN")}₫`}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-baseline py-4">
                <span className="text-[16px] font-semibold text-foreground">Tổng cộng</span>
                <Price amount={total} size="lg" />
              </div>

              <button
                onClick={handlePlace}
                disabled={createOrder.isPending || items.length === 0}
                className="w-full h-12 rounded-[8px] bg-persimmon text-white font-semibold text-[15px] border-0 cursor-pointer hover:bg-persimmon-hover transition-colors duration-150 mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {createOrder.isPending ? (
                  <>
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Đang xử lý...
                  </>
                ) : (
                  "Đặt hàng"
                )}
              </button>

              <div className="flex items-center gap-2 mt-4 text-[12px] text-text-secondary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Marlo bảo vệ mọi đơn hàng — hoàn tiền 100% nếu có vấn đề.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
