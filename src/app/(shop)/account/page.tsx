"use client";

import Link from "next/link";
import { PageBreadcrumb } from "@/components/commons/breadcrumb";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { Container } from "@/components/commons/container";
import Image from "next/image";
import { useGetProfile } from "@/queries/auth";
import { useAddresses } from "@/queries/addresses";
import { useMyOrders } from "@/queries/orders";
import { useMyPayments } from "@/queries/payments";
import { formatCurrency, formatDate } from "@/lib/utils";
import { orderStatusColor, orderStatusLabel } from "@/lib/order-status";
import type { PaymentResponseDto } from "@/api/main";

const imgUserAvatar =
  "https://www.figma.com/api/mcp/asset/22b3c6d0-39a3-4d05-8723-697ef67828aa";
const imgProduct1 =
  "https://www.figma.com/api/mcp/asset/fee931d8-36b7-47f4-b683-9e4a96c38cd6";
const imgProduct2 =
  "https://www.figma.com/api/mcp/asset/d72852a2-0fca-4ae2-bef6-d84bb123ebf3";
const imgProduct3 =
  "https://www.figma.com/api/mcp/asset/f7a1aa9a-7a99-42bd-b683-9e4a96c38cd6";
const imgProduct4 =
  "https://www.figma.com/api/mcp/asset/626db840-8813-4182-b4d6-200a6975baea";

const BROWSING_PRODUCTS = [
  {
    img: imgProduct1,
    name: "TOZO T6 True Wireless Earbuds Bluetooth Headphon...",
    rating: 5,
    reviews: 738,
    price: "$70",
    badge: { label: "HOT", color: "bg-danger-500" },
  },
  {
    img: imgProduct2,
    name: "Samsung Electronics Samsung Galaxy S21 5G",
    rating: 5,
    reviews: 536,
    price: "$2,300",
    badge: null,
  },
  {
    img: imgProduct3,
    name: "Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K/6...",
    rating: 5,
    reviews: 423,
    price: "$360",
    badge: { label: "BEST DEALS", color: "bg-secondary-500" },
  },
  {
    img: imgProduct4,
    name: "Portable Washing Machine, 11lbs capacity Model 18NMF...",
    rating: 4,
    reviews: 816,
    price: "$80",
    badge: null,
  },
];

const PAYMENT_METHOD_LABEL: Record<PaymentResponseDto["method"], string> = {
  cod: "Cash on Delivery",
  vnpay: "VNPay",
  momo: "MoMo",
  zalopay: "ZaloPay",
  stripe: "Stripe",
  bank_transfer: "Bank Transfer",
};

const PAYMENT_GRADIENTS = [
  "radial-gradient(circle at 0 0, #1b6392, #124261)",
  "radial-gradient(circle at 0 0, #248e1d, #2db224)",
];

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center">
      {Array.from({ length: max }, (_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden
        >
          <path
            d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.93L8 10.27l-3.52 1.08.67-3.93L2.3 5.64l3.94-.57L8 1.5z"
            fill={i < rating ? "#FA8232" : "none"}
            stroke={i < rating ? "#FA8232" : "#ADB7BC"}
            strokeWidth="1.2"
          />
        </svg>
      ))}
    </div>
  );
}

function SectionHeading({
  title,
  action,
  actionHref,
}: {
  title: string;
  action?: string;
  actionHref?: string;
}) {
  return (
    <div className="flex items-center justify-between px-6 h-13 border-b border-gray-100">
      <span className="text-[14px] font-medium text-gray-900 uppercase tracking-wide">
        {title}
      </span>
      {action && (
        <Link
          href={actionHref ?? "#"}
          className="flex items-center gap-2 text-[14px] font-semibold text-primary-500 hover:text-primary-600 transition-colors no-underline"
        >
          {action}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden
          >
            <path
              d="M4 10h12M12 5l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      )}
    </div>
  );
}

export default function AccountDashboardPage() {
  const { data: profile } = useGetProfile();
  const { data: addresses } = useAddresses();
  const { data: orders } = useMyOrders({
    limit: 200,
    sort_by: "createdAt",
    sort_order: "DESC",
  });
  const { data: payments } = useMyPayments({ limit: 2 });

  const defaultAddress = addresses?.find((a) => a.isDefault) ?? addresses?.[0];

  const totalOrders = orders?.total ?? 0;
  const pendingOrders =
    orders?.data.filter((o) =>
      ["pending", "confirmed", "processing", "shipped"].includes(o.status),
    ).length ?? 0;
  const completedOrders =
    orders?.data.filter((o) => o.status === "delivered").length ?? 0;

  const recentOrders = orders?.data.slice(0, 7) ?? [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-6 pb-20">
        <PageBreadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Account" }]}
        />

        <div className="flex gap-18 items-start mt-2">
          <DashboardSidebar />

          {/* Main content */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            {/* Welcome heading */}
            <div>
              <h1 className="text-[24px] font-semibold text-gray-900 leading-7">
                Hello, {profile?.name?.split(" ")[0] ?? "there"}
              </h1>
              <p className="mt-2 text-[14px] text-gray-600 leading-5 max-w-105.75">
                From your account dashboard. you can easily check &amp; view
                your Recent Orders, manage your Shipping and Billing Addresses
                and edit your Password and Account Details.
              </p>
            </div>

            {/* Top row: Account Info + Billing Address + Stats */}
            <div className="flex gap-6">
              {/* Account Info */}
              <div className="w-78 flex-none bg-white border border-gray-100 rounded-[4px]">
                <SectionHeading title="Account Info" />
                <div className="px-6 pt-5.5 pb-6 flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <Image
                      src={imgUserAvatar}
                      alt={profile?.name ?? "User avatar"}
                      width={48}
                      height={48}
                      className="rounded-full size-12 object-cover flex-none"
                    />
                    <div>
                      <p className="text-[16px] font-semibold text-gray-900 leading-6">
                        {profile?.name ?? "-"}
                      </p>
                      <p className="text-[14px] text-gray-600 leading-5">
                        {defaultAddress
                          ? `${defaultAddress.city}, ${defaultAddress.country}`
                          : "No address added"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 text-[14px] leading-5">
                    <div className="flex gap-1">
                      <span className="text-gray-900">Email:</span>
                      <span className="text-gray-600">
                        {" "}
                        {profile?.email ?? "-"}
                      </span>
                    </div>
                    {defaultAddress && (
                      <div className="flex gap-1">
                        <span className="text-gray-900">Phone:</span>
                        <span className="text-gray-600">
                          {" "}
                          {defaultAddress.phone}
                        </span>
                      </div>
                    )}
                  </div>
                  <Link
                    href="/account/settings"
                    className="self-start border-2 border-secondary-100 rounded-[2px] px-6 h-12 flex items-center text-[14px] font-bold text-secondary-500 uppercase tracking-[0.012em] hover:bg-secondary-50 transition-colors no-underline"
                  >
                    Edit Account
                  </Link>
                </div>
              </div>

              {/* Billing Address */}
              <div className="w-[312px] flex-none bg-white border border-gray-100 rounded-[4px]">
                <SectionHeading title="Billing Address" />
                <div className="px-6 pt-[22px] pb-6 flex flex-col gap-5">
                  {defaultAddress ? (
                    <div className="flex flex-col gap-2 text-[14px] leading-5">
                      <p className="font-medium text-gray-900">
                        {defaultAddress.fullName}
                      </p>
                      <p className="text-gray-600">
                        {defaultAddress.addressLine1}
                        {defaultAddress.addressLine2
                          ? `, ${defaultAddress.addressLine2}`
                          : ""}
                        , {defaultAddress.city}, {defaultAddress.province},{" "}
                        {defaultAddress.country}
                      </p>
                      <div className="flex gap-1">
                        <span className="text-gray-900">Phone Number:</span>
                        <span className="text-gray-600">
                          {" "}
                          {defaultAddress.phone}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <span className="text-gray-900">Email:</span>
                        <span className="text-gray-600">
                          {" "}
                          {profile?.email ?? "-"}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-[14px] text-gray-600 leading-5">
                      You haven&apos;t added an address yet.
                    </p>
                  )}
                  <Link
                    href="/account/cards"
                    className="self-start border-2 border-secondary-100 rounded-[2px] px-6 h-12 flex items-center text-[14px] font-bold text-secondary-500 uppercase tracking-[0.012em] hover:bg-secondary-50 transition-colors no-underline"
                  >
                    Edit Address
                  </Link>
                </div>
              </div>

              {/* Stats */}
              <div className="flex-1 flex flex-col gap-6">
                <div className="flex items-center gap-4 p-4 bg-secondary-50 rounded-[4px]">
                  <div className="bg-white p-3 rounded-[2px] flex-none">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M16 4L28 10v12L16 28 4 22V10L16 4z"
                        fill="#2DA5F3"
                        opacity="0.2"
                      />
                      <path
                        d="M16 4L28 10v12L16 28 4 22V10L16 4z"
                        stroke="#2DA5F3"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 28V16M4 10l12 6 12-6"
                        stroke="#2DA5F3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[20px] font-semibold text-gray-900 leading-7">
                      {String(totalOrders).padStart(2, "0")}
                    </p>
                    <p className="text-[14px] text-gray-700 leading-5">
                      Total Orders
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-[4px]">
                  <div className="bg-white p-3 rounded-[2px] flex-none">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      aria-hidden
                    >
                      <rect
                        x="8"
                        y="6"
                        width="16"
                        height="20"
                        rx="1"
                        fill="#FA8232"
                        opacity="0.2"
                      />
                      <rect
                        x="8"
                        y="6"
                        width="16"
                        height="20"
                        rx="1"
                        stroke="#FA8232"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M12 13h8M12 17h6M12 21h4"
                        stroke="#FA8232"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[20px] font-semibold text-gray-900 leading-7">
                      {String(pendingOrders).padStart(2, "0")}
                    </p>
                    <p className="text-[14px] text-gray-700 leading-5">
                      Pending Orders
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-success-50 rounded-[4px]">
                  <div className="bg-white p-3 rounded-[2px] flex-none">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M6 10l10 10 10-10"
                        fill="#2DB224"
                        opacity="0.2"
                      />
                      <path
                        d="M6 10l10 10 10-10"
                        stroke="#2DB224"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[20px] font-semibold text-gray-900 leading-7">
                      {String(completedOrders).padStart(2, "0")}
                    </p>
                    <p className="text-[14px] text-gray-700 leading-5">
                      Completed Orders
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Option */}
            <div className="bg-white border border-gray-100 rounded-[4px]">
              <SectionHeading
                title="Payment Option"
                action="View All"
                actionHref="/account/cards"
              />
              <div className="flex gap-6 px-6 py-[22px]">
                {payments && payments.data.length > 0 ? (
                  payments.data.map((payment, i) => (
                    <div
                      key={payment.id}
                      className="relative w-[296px] h-[196px] rounded-[4px] overflow-hidden flex-none"
                      style={{
                        background:
                          PAYMENT_GRADIENTS[i % PAYMENT_GRADIENTS.length],
                      }}
                    >
                      <div className="absolute top-6 left-6">
                        <p className="text-white text-[16px] leading-6">
                          <span className="font-semibold">
                            {formatCurrency(payment.amount)}{" "}
                          </span>
                        </p>
                      </div>
                      <div className="absolute top-[72px] left-6">
                        <p className="text-white text-[11px] font-medium uppercase opacity-70 mb-2">
                          Method
                        </p>
                        <p className="text-white text-[18px] font-normal tracking-wide">
                          {PAYMENT_METHOD_LABEL[payment.method]}
                        </p>
                      </div>
                      <div className="absolute bottom-6 left-6">
                        <span className="text-white text-[13px] font-semibold uppercase tracking-wide">
                          {payment.status}
                        </span>
                      </div>
                      <div className="absolute bottom-6 right-6">
                        <p className="text-white text-[12px] opacity-80">
                          {formatDate(payment.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[14px] text-gray-600">
                    No payment records yet.
                  </p>
                )}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white border border-gray-100 rounded-[4px]">
              <SectionHeading
                title="Recent Order"
                action="View All"
                actionHref="/account/orders"
              />
              <div className="flex items-center gap-6 px-6 py-[10px] bg-gray-50 border-y border-gray-100 text-[12px] font-medium text-gray-700 uppercase">
                <span className="w-[124px] flex-none">Order ID</span>
                <span className="w-[152px] flex-none">Status</span>
                <span className="w-[200px] flex-none">Date</span>
                <span className="w-[248px] flex-none">Total</span>
                <span className="flex-none">Action</span>
              </div>
              {recentOrders.length === 0 && (
                <p className="px-6 py-6 text-[14px] text-gray-600">
                  You have no orders yet.
                </p>
              )}
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center gap-6 px-6 py-3 border-b border-gray-100 last:border-b-0"
                >
                  <span className="w-[124px] flex-none text-[14px] font-medium text-gray-900">
                    {order.orderNumber}
                  </span>
                  <span
                    className={`w-[152px] flex-none text-[14px] font-semibold ${orderStatusColor(order.status)}`}
                  >
                    {orderStatusLabel(order.status)}
                  </span>
                  <span className="w-[200px] flex-none text-[14px] text-gray-600">
                    {formatDate(order.createdAt)}
                  </span>
                  <span className="w-[248px] flex-none text-[14px] text-gray-700">
                    {formatCurrency(order.total)}
                  </span>
                  <Link
                    href={`/account/orders/${order.id}`}
                    className="flex items-center gap-2 text-[14px] font-semibold text-secondary-500 hover:text-secondary-600 transition-colors no-underline"
                  >
                    View Details
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M2 8h12M10 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>

            {/* Browsing History */}
            <div className="bg-white border border-gray-100 rounded-[4px]">
              <SectionHeading
                title="Browsing History"
                action="View All"
                actionHref="/account/history"
              />
              <div className="grid grid-cols-4 divide-x divide-gray-100 px-3 pt-5 pb-3">
                {BROWSING_PRODUCTS.map((product, i) => (
                  <div key={i} className="px-3 flex flex-col gap-3">
                    <div className="relative h-43">
                      <Image
                        src={product.img}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-contain"
                      />
                      {product.badge && (
                        <span
                          className={`absolute top-3 left-3 ${product.badge.color} text-white text-[12px] font-semibold px-[10px] py-[5px] rounded-[2px]`}
                        >
                          {product.badge.label}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <StarRating rating={product.rating} />
                      <span className="text-[12px] text-gray-500">
                        ({product.reviews})
                      </span>
                    </div>
                    <p className="text-[14px] text-gray-900 leading-5 line-clamp-2">
                      {product.name}
                    </p>
                    <p className="text-[14px] font-semibold text-secondary-500">
                      {product.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
