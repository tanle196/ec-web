"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PageBreadcrumb } from "@/components/commons/breadcrumb";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { Container } from "@/components/commons/container";
import { useMyOrder, useOrderHistory, useCancelOrder } from "@/queries/orders";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { AddressResponseDto } from "@/api/main";

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

const STATUS_STEP: Record<string, number> = {
  pending: 1,
  confirmed: 1,
  processing: 2,
  shipped: 3,
  delivered: 4,
};

const STATUS_MESSAGE: Record<string, string> = {
  pending: "Order has been placed and is awaiting confirmation.",
  confirmed: "Order has been confirmed.",
  processing: "Order is being packaged.",
  shipped: "Order is on the way.",
  delivered: "Order has been delivered. Thank you for shopping with us!",
  cancelled: "Order has been cancelled.",
  partially_refunded: "Order has been partially refunded.",
  refunded: "Order has been refunded.",
};

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

function isAddress(value: unknown): value is AddressResponseDto {
  return (
    !!value &&
    typeof value === "object" &&
    "addressLine1" in value &&
    "fullName" in value
  );
}

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = typeof params.id === "string" ? params.id : "";

  const { data: order, isPending } = useMyOrder(orderId);
  const { data: history } = useOrderHistory(orderId);
  const cancelOrder = useCancelOrder();

  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Container className="py-6 pb-20">
          <p className="text-[14px] text-gray-600">Loading order...</p>
        </Container>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Container className="py-6 pb-20">
          <p className="text-[14px] text-gray-600">Order not found.</p>
        </Container>
      </div>
    );
  }

  const isCancelled = ["cancelled", "refunded", "partially_refunded"].includes(
    order.status,
  );
  const currentStep = STATUS_STEP[order.status] ?? 1;
  const progressPct = isCancelled
    ? 0
    : ((currentStep - 1) / (STEPS.length - 1)) * 100;
  const address = isAddress(order.address_id) ? order.address_id : null;
  const canCancel = order.status === "pending" || order.status === "confirmed";

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-6 pb-20">
        <PageBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Account", href: "/account" },
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
              {canCancel && (
                <button
                  onClick={() => cancelOrder.mutate(order.id)}
                  disabled={cancelOrder.isPending}
                  className="flex items-center gap-2 text-[14px] font-semibold text-danger-500 hover:text-danger-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cancelOrder.isPending ? "Cancelling..." : "Cancel Order"}
                </button>
              )}
            </div>

            {/* Order card + progress + activity */}
            <div className="bg-white border border-gray-100 rounded-[4px]">
              <div className="p-6 flex flex-col gap-6">
                {/* Order summary */}
                <div className="bg-[#fdfae7] border border-[#f7e99e] rounded-[4px] px-6 py-5 flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <p className="text-[20px] leading-7 font-normal text-gray-900">
                      {order.orderNumber}
                    </p>
                    <p className="text-[14px] text-gray-700">
                      {order.items.reduce((s, i) => s + i.quantity, 0)} Products
                      <span className="mx-2">·</span>
                      Order Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <p className="text-[28px] font-semibold leading-8 text-secondary-500">
                    {formatCurrency(order.total)}
                  </p>
                </div>

                {isCancelled ? (
                  <p className="text-[14px] leading-5 font-medium text-danger-500">
                    {STATUS_MESSAGE[order.status]}
                  </p>
                ) : (
                  <>
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
                                done={currentStep > stepNum}
                                active={currentStep === stepNum}
                              />
                            </div>
                          );
                        })}
                      </div>

                      {/* Step labels */}
                      <div className="flex items-start">
                        {STEPS.map((step, i) => {
                          const stepNum = i + 1;
                          const isActive = currentStep >= stepNum;
                          return (
                            <div
                              key={i}
                              className={`flex flex-col items-center gap-3 flex-1 ${!isActive ? "opacity-40" : ""}`}
                            >
                              <span
                                className={
                                  isActive
                                    ? "text-primary-500"
                                    : "text-gray-500"
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
                  </>
                )}
              </div>

              {/* Order Activity */}
              <div className="border-t border-gray-100 p-6 flex flex-col gap-5">
                <p className="text-[18px] font-medium text-gray-900">
                  Order Activity
                </p>
                <div className="flex flex-col gap-4">
                  {!history || history.length === 0 ? (
                    <p className="text-[14px] text-gray-600">
                      No activity recorded yet.
                    </p>
                  ) : (
                    [...history]
                      .sort(
                        (a, b) =>
                          new Date(b.createdAt).getTime() -
                          new Date(a.createdAt).getTime(),
                      )
                      .map((item) => (
                        <div key={item.id} className="flex items-start gap-4">
                          <div className="flex-none p-3 rounded-xs border bg-secondary-50 border-secondary-100">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#2da5f3"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                          <div className="flex flex-col gap-1 text-[14px] leading-5">
                            <p className="text-gray-900">
                              {STATUS_MESSAGE[item.toStatus] ??
                                `Order status changed to ${item.toStatus}.`}
                            </p>
                            <p className="text-gray-500">
                              {formatDate(item.createdAt)}
                            </p>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>

            {/* Product table */}
            <div className="bg-white border border-gray-100 rounded-[4px]">
              <div className="px-6 h-13 flex items-center border-b border-gray-100">
                <span className="text-[14px] font-medium text-gray-900 uppercase tracking-wide">
                  Product ({order.items.length.toString().padStart(2, "0")})
                </span>
              </div>
              {/* Column headers */}
              <div className="grid grid-cols-[1fr_100px_100px_100px] gap-4 px-6 py-[10px] bg-gray-50 border-b border-gray-100 text-[12px] font-medium text-gray-700 uppercase">
                <span>Products</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Sub-Total</span>
              </div>
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[1fr_100px_100px_100px] gap-4 px-6 py-4 border-b border-gray-100 last:border-b-0 items-center"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 flex-none rounded-[4px] bg-gray-50 border border-gray-100" />
                    <div className="flex flex-col gap-1">
                      <p className="text-[14px] text-gray-900 leading-5 line-clamp-2">
                        {item.productName}
                      </p>
                    </div>
                  </div>
                  <span className="text-[14px] text-gray-700">
                    {formatCurrency(item.unitPrice)}
                  </span>
                  <span className="text-[14px] text-gray-700">
                    x{item.quantity}
                  </span>
                  <span className="text-[14px] font-medium text-gray-900">
                    {formatCurrency(item.total)}
                  </span>
                </div>
              ))}
              <div className="flex flex-col gap-2 px-6 py-4 items-end text-[14px]">
                <div className="flex gap-8">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="w-24 text-right text-gray-900">
                    {formatCurrency(order.subtotal)}
                  </span>
                </div>
                <div className="flex gap-8">
                  <span className="text-gray-600">Shipping Fee</span>
                  <span className="w-24 text-right text-gray-900">
                    {formatCurrency(order.shippingFee)}
                  </span>
                </div>
                {order.discount > 0 && (
                  <div className="flex gap-8">
                    <span className="text-gray-600">Discount</span>
                    <span className="w-24 text-right text-danger-500">
                      -{formatCurrency(order.discount)}
                    </span>
                  </div>
                )}
                <div className="flex gap-8">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="w-24 text-right font-semibold text-gray-900">
                    {formatCurrency(order.total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Address / Notes */}
            <div className="grid grid-cols-2 gap-6">
              {/* Delivery Address */}
              <div className="bg-white border border-gray-100 rounded-[4px] p-6 flex flex-col gap-3">
                <p className="text-[14px] font-medium text-gray-900 uppercase tracking-wide">
                  Delivery Address
                </p>
                {address ? (
                  <div className="flex flex-col gap-1 text-[14px] leading-5 text-gray-700">
                    <p className="font-medium text-gray-900">
                      {address.fullName}
                    </p>
                    <p>
                      {address.addressLine1}
                      {address.addressLine2 ? `, ${address.addressLine2}` : ""},{" "}
                      {address.city}, {address.province}, {address.country}
                    </p>
                    <p>Phone Number: {address.phone}</p>
                  </div>
                ) : (
                  <p className="text-[14px] text-gray-600">
                    No address on file for this order.
                  </p>
                )}
              </div>

              {/* Order Notes */}
              <div className="bg-white border border-gray-100 rounded-[4px] p-6 flex flex-col gap-3">
                <p className="text-[14px] font-medium text-gray-900 uppercase tracking-wide">
                  Order Notes
                </p>
                <p className="text-[14px] leading-5 text-gray-700">
                  {typeof order.notes === "string" && order.notes
                    ? order.notes
                    : "No notes for this order."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
