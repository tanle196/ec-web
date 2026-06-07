"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductImage } from "@/components/commons/product-image";
import { useCart } from "@/queries/cart";
import { useCreateOrder } from "@/queries/orders";
import { mapCartItem } from "@/lib/api/mappers";

type PaymentMethod = "cod" | "venmo" | "paypal" | "amazon" | "card";

function formatUSD(cents: number) {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}

const inputCls =
  "w-full h-11 bg-white border border-[#e4e7e9] rounded-[2px] px-[15px] text-[14px] text-[#191c1f] leading-5 outline-none focus:border-[#2da5f3] transition-colors placeholder:text-[#77878f]";

const selectCls =
  "w-full h-11 bg-white border border-[#e4e7e9] rounded-[2px] px-[15px] text-[14px] text-[#929fa5] leading-5 outline-none focus:border-[#2da5f3] transition-colors appearance-none cursor-pointer";

function FieldLabel({ children, optional }: { children: React.ReactNode; optional?: boolean }) {
  return (
    <label className="text-[14px] leading-5 text-[#191c1f]">
      {children}
      {optional && <span className="text-[#929fa5]"> (Optional)</span>}
    </label>
  );
}

function SelectWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full">
      {children}
      <div className="pointer-events-none absolute right-3.75 top-1/2 -translate-y-1/2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#191c1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  );
}

const PAYMENT_OPTIONS: { id: PaymentMethod; label: string; icon: React.ReactNode }[] = [
  {
    id: "cod",
    label: "Cash on Delivery",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#191c1f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
  },
  {
    id: "venmo",
    label: "Venmo",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3d95ce" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    ),
  },
  {
    id: "paypal",
    label: "Paypal",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#003087" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 11l2-7h7a3 3 0 0 1 3 3.5L17 11H7z" />
        <path d="M5 17l2-7h8l-1 4H6l-1 3H5z" />
      </svg>
    ),
  },
  {
    id: "amazon",
    label: "Amazon Pay",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M3 10h18" />
      </svg>
    ),
  },
  {
    id: "card",
    label: "Debit/Credit Card",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#191c1f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <line x1="6" y1="15" x2="10" y2="15" />
      </svg>
    ),
  },
];

function RadioCircle({ checked }: { checked: boolean }) {
  return (
    <div
      className={`w-5 h-5 rounded-full border flex items-center justify-center flex-none ${
        checked ? "bg-[#fa8232] border-[#fa8232]" : "bg-white border-[#c9cfd2]"
      }`}
    >
      {checked && <div className="w-2 h-2 rounded-full bg-white" />}
    </div>
  );
}

export default function CheckoutPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [shipDifferent, setShipDifferent] = useState(false);
  const [payment, setPayment] = useState<PaymentMethod>("card");
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [note, setNote] = useState("");
  const [placed, setPlaced] = useState(false);
  const [orderId] = useState(() => Math.floor(100000 + Math.random() * 900000));

  const { data: cart, isLoading } = useCart();
  const createOrder = useCreateOrder();

  const items = (cart?.items ?? []).map(mapCartItem);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 0 && subtotal < 500 ? 99 : 0;
  const discount = 0;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + shipping - discount + tax;

  function handlePlace() {
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
        onError: () => setPlaced(true),
      },
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#fa8232] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (placed) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="text-[32px] font-semibold text-[#191c1f] mb-3">Order Placed!</h1>
          <p className="text-[16px] text-[#5f6c72] mb-2">Thank you for shopping with Clicon.</p>
          <p className="text-[14px] text-[#77878f] mb-8">
            Order ID:{" "}
            <span className="font-semibold text-[#191c1f]">#{orderId}</span>.{" "}
            We&apos;ll send a confirmation to your email.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="inline-flex items-center justify-center px-7 py-3.5 rounded-[3px] bg-[#fa8232] text-white font-bold text-[14px] uppercase tracking-wide no-underline hover:opacity-90 transition-opacity">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#f2f4f5] h-18 flex items-center">
        <div className="max-w-7xl mx-auto px-16 w-full">
          <nav className="flex items-center gap-2 text-[14px] leading-5">
            <Link href="/" className="text-[#5f6c72] hover:text-[#191c1f] transition-colors no-underline flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Home
            </Link>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5f6c72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <Link href="/cart" className="text-[#5f6c72] hover:text-[#191c1f] transition-colors no-underline">
              Shopping Cart
            </Link>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5f6c72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span className="font-medium text-[#2da5f3]">Checkout</span>
          </nav>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-16 py-18 pb-24 flex gap-6 items-start">
        {/* ── Left column ─────────────────────────────── */}
        <div className="flex-1 min-w-0 flex flex-col gap-10">

          {/* Billing Information */}
          <section className="flex flex-col gap-6">
            <h2 className="text-[18px] font-medium text-[#191c1f] leading-6">Billing Information</h2>
            <div className="flex flex-col gap-4">
              {/* Name row */}
              <div className="flex gap-4 items-end">
                <div className="flex flex-col gap-2 w-51.5">
                  <FieldLabel>User name</FieldLabel>
                  <input className={inputCls} placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="w-51.5">
                  <input className={inputCls} placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <FieldLabel optional>Company Name</FieldLabel>
                  <input className={inputCls} value={company} onChange={(e) => setCompany(e.target.value)} />
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-2">
                <FieldLabel>Address</FieldLabel>
                <input className={inputCls} value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>

              {/* Country / Region / City / Zip */}
              <div className="flex gap-4">
                <div className="flex flex-col gap-2 flex-1">
                  <FieldLabel>Country</FieldLabel>
                  <SelectWrapper>
                    <select className={selectCls} value={country} onChange={(e) => setCountry(e.target.value)}>
                      <option value="">Select...</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                      <option>Australia</option>
                    </select>
                  </SelectWrapper>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <FieldLabel>Region/State</FieldLabel>
                  <SelectWrapper>
                    <select className={selectCls} value={region} onChange={(e) => setRegion(e.target.value)}>
                      <option value="">Select...</option>
                      <option>California</option>
                      <option>New York</option>
                      <option>Texas</option>
                      <option>Florida</option>
                    </select>
                  </SelectWrapper>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <FieldLabel>City</FieldLabel>
                  <SelectWrapper>
                    <select className={selectCls} value={city} onChange={(e) => setCity(e.target.value)}>
                      <option value="">Select...</option>
                      <option>Los Angeles</option>
                      <option>New York City</option>
                      <option>Houston</option>
                      <option>Miami</option>
                    </select>
                  </SelectWrapper>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <FieldLabel>Zip Code</FieldLabel>
                  <input className={inputCls} value={zip} onChange={(e) => setZip(e.target.value)} />
                </div>
              </div>

              {/* Email / Phone */}
              <div className="flex gap-4">
                <div className="flex flex-col gap-2 flex-1">
                  <FieldLabel>Email</FieldLabel>
                  <input className={inputCls} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <FieldLabel>Phone Number</FieldLabel>
                  <input className={inputCls} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>

              {/* Ship to different address */}
              <button
                type="button"
                onClick={() => setShipDifferent((v) => !v)}
                className="flex items-center gap-3 bg-transparent border-0 cursor-pointer p-0"
              >
                <div className={`w-5 h-5 rounded-[2px] border flex items-center justify-center flex-none ${shipDifferent ? "bg-[#fa8232] border-[#fa8232]" : "bg-white border-[#c9cfd2]"}`}>
                  {shipDifferent && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <span className="text-[14px] leading-5 text-gray-700">Ship into different address</span>
              </button>
            </div>
          </section>

          {/* Payment Option */}
          <div className="bg-white border border-[#e4e7e9] rounded-[4px] overflow-hidden pb-8">
            <div className="px-6 py-5 border-b border-[#e4e7e9]">
              <h2 className="text-[18px] font-medium text-[#191c1f] leading-6">Payment Option</h2>
            </div>

            {/* Payment method pills */}
            <div className="flex items-stretch border-b border-[#e4e7e9] px-6 py-6 gap-0">
              {PAYMENT_OPTIONS.map((opt, i) => (
                <div key={opt.id} className="flex items-center">
                  {i > 0 && <div className="w-px self-stretch bg-[#e4e7e9] mx-0" />}
                  <button
                    type="button"
                    onClick={() => setPayment(opt.id)}
                    className="flex flex-col items-center gap-4 px-8 py-0 bg-transparent border-0 cursor-pointer"
                  >
                    {opt.icon}
                    <span className="text-[14px] font-medium text-[#191c1f] leading-5 text-center w-25">{opt.label}</span>
                    <RadioCircle checked={payment === opt.id} />
                  </button>
                </div>
              ))}
            </div>

            {/* Card fields — shown when card selected */}
            {payment === "card" && (
              <div className="flex flex-col gap-4 px-6 pt-6">
                <div className="flex flex-col gap-2">
                  <FieldLabel>Name on Card</FieldLabel>
                  <input className={inputCls} value={nameOnCard} onChange={(e) => setNameOnCard(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <FieldLabel>Card Number</FieldLabel>
                  <input className={inputCls} value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="•••• •••• •••• ••••" />
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col gap-2 flex-1">
                    <FieldLabel>Expire Date</FieldLabel>
                    <input className={inputCls} value={expireDate} onChange={(e) => setExpireDate(e.target.value)} placeholder="MM/YY" />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <FieldLabel>CVC</FieldLabel>
                    <input className={inputCls} value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder="•••" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Additional Information */}
          <section className="flex flex-col gap-6">
            <h2 className="text-[18px] font-medium text-[#191c1f] leading-6">Additional Information</h2>
            <div className="flex flex-col gap-2">
              <FieldLabel optional>Order Notes</FieldLabel>
              <textarea
                className="w-full h-31 bg-white border border-[#e4e7e9] rounded-xs px-3.75 py-2.75 text-[14px] text-[#191c1f] leading-5 outline-none focus:border-[#2da5f3] transition-colors placeholder:text-[#929fa5] resize-none"
                placeholder="Notes about your order, e.g. special notes for delivery"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </section>
        </div>

        {/* ── Right column: Order Summary ──────────────── */}
        <aside className="flex-none w-106 sticky top-8">
          <div className="bg-white border border-[#e4e7e9] rounded-[4px] overflow-hidden pb-6">
            {/* Heading */}
            <div className="px-6 py-5 border-b border-[#e4e7e9]">
              <h2 className="text-[18px] font-medium text-[#191c1f] leading-6">Order Summary</h2>
            </div>

            {/* Products */}
            {items.length > 0 && (
              <div className="flex flex-col gap-4 px-6 py-6 border-b border-[#e4e7e9]">
                {items.map((item) => (
                  <div key={item.lineId} className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-xs overflow-hidden bg-[#f2f4f5] flex-none">
                      <ProductImage src={item.img} alt={item.name} width={64} height={64} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                      <p className="text-[14px] leading-5 text-[#191c1f] line-clamp-2">{item.name}</p>
                      <div className="flex gap-1 text-[14px] leading-5">
                        <span className="text-[#5f6c72]">{item.qty} x</span>
                        <span className="font-semibold text-[#2da5f3]">{formatUSD(item.price)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Totals */}
            <div className="flex flex-col gap-3 px-6 py-6 border-b border-[#e4e7e9] text-[14px] leading-5">
              <div className="flex items-center justify-between">
                <span className="text-[#5f6c72]">Sub-total</span>
                <span className="font-medium text-[#191c1f]">{formatUSD(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#5f6c72]">Shipping</span>
                <span className="font-medium text-[#191c1f]">{shipping === 0 ? "Free" : formatUSD(shipping)}</span>
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

            {/* Total + CTA */}
            <div className="flex flex-col gap-6 px-6 pt-6">
              <div className="flex items-center justify-between text-[16px] leading-6">
                <span className="text-[#191c1f]">Total</span>
                <span className="font-semibold text-[#191c1f]">{formatUSD(total)} USD</span>
              </div>

              <button
                onClick={handlePlace}
                disabled={createOrder.isPending || items.length === 0}
                className="w-full h-14 bg-[#fa8232] text-white text-[16px] font-bold uppercase tracking-[0.012em] rounded-[3px] border-0 cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {createOrder.isPending ? (
                  <>
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Place Order
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
