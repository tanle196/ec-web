"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMyOrder } from "@/queries/orders";
import type { OrderResponseDto } from "@/api/main";
import { Container } from "@/components/commons/container";
import { PageBreadcrumb } from "@/components/commons/breadcrumb";

type OrderStatus = OrderResponseDto["status"];

const STATUS_STEPS: Record<OrderStatus, number> = {
  pending: 1,
  confirmed: 1,
  processing: 2,
  shipped: 3,
  delivered: 4,
  cancelled: 0,
  refunded: 0,
};

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
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
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
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

type ActivityEntry = {
  icon: "check" | "user" | "map-pin" | "map" | "circle-check" | "notepad";
  message: string;
  date: string;
};

function activityFromStatus(
  status: OrderStatus,
  createdAt: Date,
): ActivityEntry[] {
  const fmt = (d: Date) =>
    d.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const entries: ActivityEntry[] = [];
  const created = new Date(createdAt);

  if (status === "delivered") {
    const deliveredAt = new Date(created);
    deliveredAt.setDate(deliveredAt.getDate() + 6);
    entries.push({
      icon: "check",
      message: "Your order has been delivered. Thank you for shopping!",
      date: fmt(deliveredAt),
    });
  }

  if (["delivered", "shipped"].includes(status)) {
    const shippedAt = new Date(created);
    shippedAt.setDate(shippedAt.getDate() + 4);
    entries.push({
      icon: "user",
      message: "Our delivery man has picked up your order for delivery.",
      date: fmt(shippedAt),
    });
    entries.push({
      icon: "map-pin",
      message: "Your order has reached at last mile hub.",
      date: fmt(new Date(shippedAt.getTime() - 18 * 3600 * 1000)),
    });
    entries.push({
      icon: "map",
      message: "Your order is on the way to the last mile hub.",
      date: fmt(new Date(shippedAt.getTime() - 48 * 3600 * 1000)),
    });
  }

  if (["delivered", "shipped", "processing"].includes(status)) {
    entries.push({
      icon: "circle-check",
      message: "Your order is successfully verified.",
      date: fmt(new Date(created.getTime() + 1 * 3600 * 1000)),
    });
  }

  entries.push({
    icon: "notepad",
    message: "Your order has been confirmed.",
    date: fmt(created),
  });

  return entries;
}

function ActivityIcon({ kind }: { kind: ActivityEntry["icon"] }) {
  const isGreen = kind === "check" || kind === "circle-check";
  return (
    <div
      className={`flex-none p-3 rounded-[2px] border ${isGreen ? "bg-[#eaf7e9] border-[#d5f0d3]" : "bg-[#eaf6fe] border-[#d5edfd]"}`}
    >
      {kind === "check" && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isGreen ? "#2db224" : "#2da5f3"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
      {kind === "user" && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#2da5f3"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )}
      {kind === "map-pin" && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#2da5f3"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      )}
      {kind === "map" && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#2da5f3"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
          <line x1="9" y1="3" x2="9" y2="18" />
          <line x1="15" y1="6" x2="15" y2="21" />
        </svg>
      )}
      {kind === "circle-check" && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#2db224"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      )}
      {kind === "notepad" && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#2da5f3"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
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

function fmt(n: number) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2 });
}

function fmtDate(d: Date) {
  return new Date(d).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function ProgressDot({ done, active }: { done: boolean; active: boolean }) {
  if (done || active) {
    return (
      <div className="w-6 h-6 rounded-full bg-[#fa8232] border-2 border-[#fa8232] flex items-center justify-center flex-none">
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
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
    );
  }
  return (
    <div className="w-6 h-6 rounded-full border-2 border-[#e4e7e9] bg-white flex-none" />
  );
}

function TrackOrderDetailContent({ order }: { order: OrderResponseDto }) {
  const currentStep = STATUS_STEPS[order.status] ?? 0;
  const activity = activityFromStatus(order.status, order.createdAt);
  const progressPct =
    currentStep === 0 ? 0 : ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#f2f4f5] h-18 flex items-center">
        <Container>
          <PageBreadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Track Order", href: "/track-order" },
              { label: "Details" },
            ]}
          />
        </Container>
      </div>

      {/* Content */}
      <Container className="py-18">
        <div className="border border-[#e4e7e9] rounded-[4px] overflow-hidden">
          {/* Product Tracking */}
          <div className="p-6 flex flex-col gap-6">
            {/* Order header */}
            <div className="bg-[#fdfae7] border border-[#f7e99e] rounded-[4px] p-6 flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-[20px] leading-7 font-normal text-[#191c1f]">
                  #{order.orderNumber}
                </p>
                <div className="flex items-center gap-2 text-[14px] leading-5 text-[#475156]">
                  <span>
                    {order.items.length} Product
                    {order.items.length !== 1 ? "s" : ""}
                  </span>
                  <span>•</span>
                  <span>Order Placed on {fmtDate(order.createdAt)}</span>
                </div>
              </div>
              <p className="text-[28px] font-semibold leading-8 text-[#2da5f3]">
                {fmt(order.total)}
              </p>
            </div>

            {/* Arrival */}
            <p className="text-[14px] leading-5 text-[#191c1f]">
              <span className="text-[#475156]">Order expected arrival </span>
              <span className="font-medium">
                {fmtDate(
                  new Date(
                    new Date(order.createdAt).getTime() + 7 * 24 * 3600 * 1000,
                  ),
                )}
              </span>
            </p>

            {/* Progress */}
            <div className="flex flex-col gap-6">
              {/* Bar + dots */}
              <div
                className="relative flex items-center"
                style={{ height: "24px" }}
              >
                {/* Track */}
                <div className="absolute left-3 right-3 h-2 bg-[#ffe7d6] rounded-full" />
                {/* Fill */}
                <div
                  className="absolute left-3 h-2 bg-[#fa8232] rounded-full transition-all duration-500"
                  style={{
                    width: `calc(${progressPct}% * (100% - 24px) / 100)`,
                  }}
                />
                {/* Dots */}
                {STEPS.map((_, i) => {
                  const stepNum = i + 1;
                  const pct = i / (STEPS.length - 1);
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
                      className={`flex flex-col items-center gap-3 flex-1 ${!isActive ? "opacity-50" : ""}`}
                    >
                      <div
                        className={`${isActive ? "text-[#fa8232]" : "text-[#77878f]"}`}
                      >
                        {step.icon}
                      </div>
                      <p className="text-[14px] font-medium leading-5 text-[#191c1f] text-center">
                        {step.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Order Activity */}
          <div className="border-t border-[#e4e7e9] p-6 flex flex-col gap-6">
            <p className="text-[18px] font-medium leading-6 text-[#191c1f]">
              Order Activity
            </p>
            <div className="flex flex-col gap-4">
              {activity.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <ActivityIcon kind={item.icon} />
                  <div className="flex flex-col gap-2 text-[14px] leading-5">
                    <p className="text-[#191c1f]">{item.message}</p>
                    <p className="text-[#77878f]">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#f2f4f5] h-18" />
      <Container className="py-18">
        <div className="border border-[#e4e7e9] rounded-[4px] p-6 flex flex-col gap-6 animate-pulse">
          <div className="bg-[#f2f4f5] rounded-[4px] h-20" />
          <div className="h-5 bg-[#f2f4f5] rounded w-56" />
          <div className="h-8 bg-[#f2f4f5] rounded" />
        </div>
      </Container>
    </div>
  );
}

function NotFoundState() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center flex flex-col gap-4">
        <p className="text-[18px] text-[#191c1f] font-medium">
          Order not found
        </p>
        <Link
          href="/track-order"
          className="text-[#2da5f3] text-[14px] no-underline hover:underline"
        >
          ← Back to Track Order
        </Link>
      </div>
    </div>
  );
}

export default function TrackOrderDetailPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const { data: order, isLoading, isError } = useMyOrder(id);

  if (isLoading) return <LoadingState />;
  if (isError || !order) return <NotFoundState />;

  return <TrackOrderDetailContent order={order} />;
}
