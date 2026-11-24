"use client";

import { useState } from "react";
import Link from "next/link";
import { PageBreadcrumb } from "@/components/commons/breadcrumb";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { Container } from "@/components/commons/container";
import { useMyOrders } from "@/queries/orders";
import { formatCurrency, formatDate } from "@/lib/utils";
import { orderStatusColor, orderStatusLabel } from "@/lib/order-status";
import type { OrderListItemDto } from "@/api/main";

const PAGE_SIZE = 10;

function ArrowIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      {dir === "left" ? (
        <path
          d="M13 4l-6 6 6 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M7 4l6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export default function OrderHistoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredOrder, setHoveredOrder] = useState<OrderListItemDto | null>(
    null,
  );

  const { data: orders, isPending } = useMyOrders({
    page: currentPage,
    limit: PAGE_SIZE,
    sort_by: "createdAt",
    sort_order: "DESC",
  });

  const totalPages = orders
    ? Math.max(1, Math.ceil(orders.total / orders.limit))
    : 1;

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-6 pb-20">
        <PageBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Account", href: "/account" },
            { label: "Order History" },
          ]}
        />

        <div className="mt-2 flex items-start gap-18">
          <DashboardSidebar />

          {/* Main content */}
          <div className="min-w-0 flex-1">
            <div className="rounded-[4px] border border-gray-100 bg-white">
              {/* Table heading */}
              <div className="flex h-13 items-center border-b border-gray-100 px-6">
                <span className="text-[14px] font-medium tracking-wide text-gray-900 uppercase">
                  Order History
                </span>
              </div>

              {/* Column headers */}
              <div className="flex items-center gap-6 border-b border-gray-100 bg-gray-50 px-6 py-[10px] text-[12px] font-medium text-gray-700 uppercase">
                <span className="w-[124px] flex-none">Order ID</span>
                <span className="w-[152px] flex-none">Status</span>
                <span className="w-[200px] flex-none">Date</span>
                <span className="flex-1">Total</span>
                <span className="w-[116px] flex-none">Action</span>
              </div>

              {isPending && (
                <p className="px-6 py-6 text-[14px] text-gray-600">
                  Loading orders...
                </p>
              )}

              {!isPending && orders?.data.length === 0 && (
                <p className="px-6 py-6 text-[14px] text-gray-600">
                  You have no orders yet.
                </p>
              )}

              {/* Rows */}
              {orders?.data.map((order) => (
                <div
                  key={order.id}
                  className="group relative flex items-center gap-6 border-b border-gray-100 px-6 py-3 transition-colors last:border-b-0 hover:bg-gray-50"
                  onMouseEnter={() => setHoveredOrder(order)}
                  onMouseLeave={() => setHoveredOrder(null)}
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
                  <span className="flex-1 text-[14px] text-gray-700">
                    {formatCurrency(order.total)}
                  </span>
                  <Link
                    href={`/account/orders/${order.id}`}
                    className="flex w-[116px] flex-none items-center gap-2 text-[14px] font-semibold text-secondary-500 no-underline transition-colors hover:text-secondary-600"
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

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 border-t border-gray-100 py-5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-100 text-gray-600 transition-colors hover:border-primary-500 hover:text-primary-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowIcon dir="left" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`h-10 w-10 cursor-pointer rounded-full text-[14px] font-medium transition-colors ${
                        page === currentPage
                          ? "bg-primary-500 text-white"
                          : "border border-gray-100 text-gray-600 hover:border-primary-500 hover:text-primary-500"
                      }`}
                    >
                      {String(page).padStart(2, "0")}
                    </button>
                  ),
                )}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-100 text-gray-600 transition-colors hover:border-primary-500 hover:text-primary-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowIcon dir="right" />
                </button>
              </div>
            </div>

            {/* Hover preview card */}
            {hoveredOrder && (
              <div className="mt-4 inline-flex items-center gap-4 rounded-[4px] border border-gray-100 bg-white px-5 py-4 shadow-[0px_8px_20px_rgba(0,0,0,0.08)]">
                <div className="flex flex-col gap-1">
                  <span
                    className={`text-[12px] font-semibold ${orderStatusColor(hoveredOrder.status)}`}
                  >
                    {orderStatusLabel(hoveredOrder.status)}
                  </span>
                  <p className="text-[14px] font-medium text-gray-900">
                    Order {hoveredOrder.orderNumber}
                  </p>
                  <p className="text-[13px] text-gray-600">
                    {formatDate(hoveredOrder.createdAt)}
                  </p>
                  <p className="text-[16px] font-semibold text-gray-900">
                    {formatCurrency(hoveredOrder.total)}
                  </p>
                </div>
                <Link
                  href={`/account/orders/${hoveredOrder.id}`}
                  className="flex h-10 w-10 flex-none cursor-pointer items-center justify-center rounded-full bg-primary-500 text-white transition-colors hover:bg-primary-600"
                >
                  <ArrowIcon dir="right" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
