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

        <div className="flex gap-18 items-start mt-2">
          <DashboardSidebar />

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white border border-gray-100 rounded-[4px]">
              {/* Table heading */}
              <div className="px-6 h-13 flex items-center border-b border-gray-100">
                <span className="text-[14px] font-medium text-gray-900 uppercase tracking-wide">
                  Order History
                </span>
              </div>

              {/* Column headers */}
              <div className="flex items-center gap-6 px-6 py-[10px] bg-gray-50 border-b border-gray-100 text-[12px] font-medium text-gray-700 uppercase">
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
                  className="relative flex items-center gap-6 px-6 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors group"
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
                    className="w-[116px] flex-none flex items-center gap-2 text-[14px] font-semibold text-secondary-500 hover:text-secondary-600 transition-colors no-underline"
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
              <div className="flex items-center justify-center gap-2 py-5 border-t border-gray-100">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-600 hover:border-primary-500 hover:text-primary-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ArrowIcon dir="left" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-full text-[14px] font-medium transition-colors cursor-pointer ${
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
                  className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-600 hover:border-primary-500 hover:text-primary-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ArrowIcon dir="right" />
                </button>
              </div>
            </div>

            {/* Hover preview card */}
            {hoveredOrder && (
              <div className="mt-4 inline-flex items-center gap-4 bg-white border border-gray-100 rounded-[4px] shadow-[0px_8px_20px_rgba(0,0,0,0.08)] px-5 py-4">
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
                  className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white hover:bg-primary-600 transition-colors cursor-pointer flex-none"
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
