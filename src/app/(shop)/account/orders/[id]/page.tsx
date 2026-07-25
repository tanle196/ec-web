"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PageBreadcrumb } from "@/components/commons/breadcrumb";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { Container } from "@/components/commons/container";
import Image from "next/image";

const PRODUCT_IMG_PHONE =
  "https://www.figma.com/api/mcp/asset/f707e299-3c30-476c-b986-32c5bdf96c0c";
const PRODUCT_IMG_CASE =
  "https://www.figma.com/api/mcp/asset/b254e249-0218-4d04-9ea5-f6366e41ea60";

const STEPS = [
  {
    label: "Order Placed",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    label: "Packaging",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    label: "On The Road",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 5v3h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    label: "Delivered",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
];

type ActivityKind =
  | "delivered"
  | "pickup"
  | "hub"
  | "transit"
  | "verified"
  | "confirmed";

const ACTIVITY: { kind: ActivityKind; message: string; date: string }[] = [
  {
    kind: "delivered",
    message: "Your order has been delivered. Thank you for shopping at Clicon!",
    date: "23 Jan, 2021 at 7:32 PM",
  },
  {
    kind: "pickup",
    message:
      "Our delivery man (John Wick) Has picked up your order for delivery.",
    date: "23 Jan, 2021 at 3:09 PM",
  },
  {
    kind: "hub",
    message: "Your order has reached at last mile hub.",
    date: "22 Jan, 2021 at 8:04 AM",
  },
  {
    kind: "transit",
    message: "Your order is on the way to East mile hub.",
    date: "21 Jan, 2021 at 12:36 AM",
  },
  {
    kind: "verified",
    message: "Your order is successfully verified.",
    date: "20 Jan, 2021 at 7:32 PM",
  },
  {
    kind: "confirmed",
    message: "Your order has been confirmed.",
    date: "18 Jan, 2021 at 2:47 PM",
  },
];

const PRODUCTS = [
  {
    category: "SMARTPHONE",
    img: PRODUCT_IMG_PHONE,
    name: "Google Pixel 6 Pro, 5G Android Phone Unlocked Smartphone with Advanced Pixel Camera...",
    price: 699,
    qty: 1,
  },
  {
    category: "ACCESSORIES",
    img: PRODUCT_IMG_CASE,
    name: "Tech21 Evo Clear for Google Pixel 6 Pro - Crystal Clear Phone Case with 12ft Multi-Drop Protection",
    price: 39,
    qty: 1,
  },
];

const BILLING = {
  name: "Kevin Gilbert",
  address:
    "East Tejturi Bazar, Word No. 04, Road No. 13/x, House no. 1320/C, Flat No. 5D, Dhaka-1200, Bangladesh",
  phone: "+1-202-555-0118",
  email: "kevin.gilbert@gmail.com",
};

const ORDER_NOTES =
  "Donec ac vehicula turpis. Aenean sagittis est du arcu viverra augue et venenatis purus lobortis. Aliquam enim vulputat. Aliquam magna nibh.";

// Current step: 3 = "On The Road" (1-indexed)
const CURRENT_STEP = 3;

function ActivityIcon({ kind }: { kind: ActivityKind }) {
  const isGreen = kind === "delivered" || kind === "verified";
  const color = isGreen ? "#2db224" : "#2da5f3";
  const bg = isGreen
    ? "bg-success-50 border-[#d5f0d3]"
    : "bg-secondary-50 border-secondary-100";
  return (
    <div className={`flex-none p-3 rounded-xs border ${bg}`}>
      {kind === "delivered" && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
      {kind === "pickup" && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )}
      {kind === "hub" && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      )}
      {kind === "transit" && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
          <line x1="9" y1="3" x2="9" y2="18" />
          <line x1="15" y1="6" x2="15" y2="21" />
        </svg>
      )}
      {kind === "verified" && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      )}
      {kind === "confirmed" && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M9 2h6l1 3H8L9 2Z" />
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <line x1="8" y1="11" x2="16" y2="11" />
          <line x1="8" y1="15" x2="14" y2="15" />
        </svg>
      )}
    </div>
  );
}

function ProgressDot({ done, active }: { done: boolean; active: boolean }) {
  if (done || active) {
    return (
      <div className="w-6 h-6 rounded-full bg-primary-500 border-2 border-primary-500 flex items-center justify-center flex-none">
        {done && (
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
    );
  }
  return (
    <div className="w-6 h-6 rounded-full border-2 border-gray-100 bg-white flex-none" />
  );
}

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = typeof params.id === "string" ? `#${params.id}` : "#96459761";

  const progressPct = ((CURRENT_STEP - 1) / (STEPS.length - 1)) * 100;
  const subtotal = PRODUCTS.reduce((s, p) => s + p.price * p.qty, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-6 pb-20">
        <PageBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "User Account", href: "/account" },
            { label: "Order History", href: "/account/orders" },
            { label: "Order Details" },
          ]}
        />

        <div className="flex gap-18 items-start mt-2">
          <DashboardSidebar />

          {/* Main content */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            {/* Page header */}
            <div className="flex items-center justify-between">
              <Link
                href="/account/orders"
                className="flex items-center gap-2 text-[14px] font-medium text-gray-900 hover:text-primary-500 transition-colors no-underline"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M13 4l-6 6 6 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                ORDER DETAILS
              </Link>
              <button className="flex items-center gap-2 text-[14px] font-semibold text-primary-500 hover:text-primary-600 transition-colors cursor-pointer">
                Leave a Rating
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M7 4l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Order card + progress + activity */}
            <div className="bg-white border border-gray-100 rounded-[4px]">
              <div className="p-6 flex flex-col gap-6">
                {/* Order summary */}
                <div className="bg-[#fdfae7] border border-[#f7e99e] rounded-[4px] px-6 py-5 flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <p className="text-[20px] leading-7 font-normal text-gray-900">
                      {orderId}
                    </p>
                    <p className="text-[14px] text-gray-700">
                      {PRODUCTS.reduce((s, p) => s + p.qty, 0)} Products
                      <span className="mx-2">·</span>
                      Order Placed on 17 Jan, 2021 at 7:32 PM
                    </p>
                  </div>
                  <p className="text-[28px] font-semibold leading-8 text-secondary-500">
                    $
                    {subtotal.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>

                {/* Expected arrival */}
                <p className="text-[14px] leading-5">
                  <span className="text-gray-700">Order expected arrival </span>
                  <span className="font-medium text-gray-900">
                    23 Jan, 2021
                  </span>
                </p>

                {/* Progress stepper */}
                <div className="flex flex-col gap-6">
                  {/* Track bar */}
                  <div
                    className="relative flex items-center"
                    style={{ height: 24 }}
                  >
                    <div className="absolute left-3 right-3 h-2 bg-primary-100 rounded-full" />
                    <div
                      className="absolute left-3 h-2 bg-primary-500 rounded-full transition-all duration-500"
                      style={{
                        width: `calc(${progressPct}% * (100% - 24px) / 100)`,
                      }}
                    />
                    {STEPS.map((_, i) => {
                      const pct = i / (STEPS.length - 1);
                      const stepNum = i + 1;
                      return (
                        <div
                          key={i}
                          className="absolute"
                          style={{
                            left: `calc(${pct * 100}% * (100% - 24px) / 100)`,
                          }}
                        >
                          <ProgressDot
                            done={CURRENT_STEP > stepNum}
                            active={CURRENT_STEP === stepNum}
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Step labels */}
                  <div className="flex items-start">
                    {STEPS.map((step, i) => {
                      const stepNum = i + 1;
                      const isActive = CURRENT_STEP >= stepNum;
                      return (
                        <div
                          key={i}
                          className={`flex flex-col items-center gap-3 flex-1 ${!isActive ? "opacity-40" : ""}`}
                        >
                          <span
                            className={
                              isActive ? "text-primary-500" : "text-gray-500"
                            }
                          >
                            {step.icon}
                          </span>
                          <p className="text-[14px] font-medium text-gray-900 text-center">
                            {step.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Order Activity */}
              <div className="border-t border-gray-100 p-6 flex flex-col gap-5">
                <p className="text-[18px] font-medium text-gray-900">
                  Order Activity
                </p>
                <div className="flex flex-col gap-4">
                  {ACTIVITY.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <ActivityIcon kind={item.kind} />
                      <div className="flex flex-col gap-1 text-[14px] leading-5">
                        <p className="text-gray-900">{item.message}</p>
                        <p className="text-gray-500">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product table */}
            <div className="bg-white border border-gray-100 rounded-[4px]">
              <div className="px-6 h-13 flex items-center border-b border-gray-100">
                <span className="text-[14px] font-medium text-gray-900 uppercase tracking-wide">
                  Product ({PRODUCTS.length.toString().padStart(2, "0")})
                </span>
              </div>
              {/* Column headers */}
              <div className="grid grid-cols-[1fr_100px_100px_100px] gap-4 px-6 py-[10px] bg-gray-50 border-b border-gray-100 text-[12px] font-medium text-gray-700 uppercase">
                <span>Products</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Sub-Total</span>
              </div>
              {PRODUCTS.map((product, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[1fr_100px_100px_100px] gap-4 px-6 py-4 border-b border-gray-100 last:border-b-0 items-center"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={product.img}
                      alt={product.name}
                      className="w-14 h-14 object-contain flex-none"
                    />
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                        {product.category}
                      </span>
                      <p className="text-[14px] text-gray-900 leading-5 line-clamp-2">
                        {product.name}
                      </p>
                    </div>
                  </div>
                  <span className="text-[14px] text-gray-700">
                    ${product.price.toLocaleString("en-US")}
                  </span>
                  <span className="text-[14px] text-gray-700">
                    x{product.qty}
                  </span>
                  <span className="text-[14px] font-medium text-gray-900">
                    ${(product.price * product.qty).toLocaleString("en-US")}
                  </span>
                </div>
              ))}
            </div>

            {/* Billing / Shipping / Notes */}
            <div className="grid grid-cols-3 gap-6">
              {/* Billing Address */}
              <div className="bg-white border border-gray-100 rounded-[4px] p-6 flex flex-col gap-3">
                <p className="text-[14px] font-medium text-gray-900 uppercase tracking-wide">
                  Billing Address
                </p>
                <div className="flex flex-col gap-1 text-[14px] leading-5 text-gray-700">
                  <p className="font-medium text-gray-900">{BILLING.name}</p>
                  <p>{BILLING.address}</p>
                  <p>Phone Number: {BILLING.phone}</p>
                  <p>Email: {BILLING.email}</p>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white border border-gray-100 rounded-[4px] p-6 flex flex-col gap-3">
                <p className="text-[14px] font-medium text-gray-900 uppercase tracking-wide">
                  Shipping Address
                </p>
                <div className="flex flex-col gap-1 text-[14px] leading-5 text-gray-700">
                  <p className="font-medium text-gray-900">{BILLING.name}</p>
                  <p>{BILLING.address}</p>
                  <p>Phone Number: {BILLING.phone}</p>
                  <p>Email: {BILLING.email}</p>
                </div>
              </div>

              {/* Order Notes */}
              <div className="bg-white border border-gray-100 rounded-[4px] p-6 flex flex-col gap-3">
                <p className="text-[14px] font-medium text-gray-900 uppercase tracking-wide">
                  Order Notes
                </p>
                <p className="text-[14px] leading-5 text-gray-700">
                  {ORDER_NOTES}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
