"use client";

import { useState } from "react";
import Link from "next/link";
import { PageBreadcrumb } from "@/components/commons/breadcrumb";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { Container } from "@/components/commons/container";

type Order = {
  id: string;
  status: "IN PROGRESS" | "COMPLETED" | "CANCELED";
  date: string;
  total: string;
  amount: string;
  products: number;
};

const STATUS_COLOR: Record<Order["status"], string> = {
  "IN PROGRESS": "text-primary-500",
  COMPLETED: "text-success-500",
  CANCELED: "text-danger-500",
};

const ORDERS: Order[] = [
  {
    id: "#96459761",
    status: "IN PROGRESS",
    date: "Dec 30, 2019 07:52",
    total: "$80 (5 Products)",
    amount: "$80.00",
    products: 5,
  },
  {
    id: "#71667167",
    status: "COMPLETED",
    date: "Dec 7, 2019 23:26",
    total: "$70 (4 Products)",
    amount: "$70.00",
    products: 4,
  },
  {
    id: "#95214362",
    status: "CANCELED",
    date: "Dec 7, 2019 23:26",
    total: "$2,300 (3 Products)",
    amount: "$2,300.00",
    products: 3,
  },
  {
    id: "#71667167",
    status: "COMPLETED",
    date: "Feb 2, 2019",
    total: "$250 (1 Products)",
    amount: "$250.00",
    products: 1,
  },
  {
    id: "#51746385",
    status: "COMPLETED",
    date: "Dec 30, 2019 07:52",
    total: "$360 (2 Products)",
    amount: "$360.00",
    products: 2,
  },
  {
    id: "#51746385",
    status: "COMPLETED",
    date: "Dec 30, 2019",
    total: "$220 (7 Products)",
    amount: "$220.00",
    products: 7,
  },
  {
    id: "#673971743",
    status: "COMPLETED",
    date: "Feb 2, 2019 19:28",
    total: "$80 (1 Products)",
    amount: "$80.00",
    products: 1,
  },
  {
    id: "#673971743",
    status: "COMPLETED",
    date: "Mar 20, 2019",
    total: "$160 (1 Products)",
    amount: "$160.00",
    products: 1,
  },
  {
    id: "#673971743",
    status: "COMPLETED",
    date: "Dec 4, 2019 21:42",
    total: "$1,500 (3 Products)",
    amount: "$1,500.00",
    products: 3,
  },
  {
    id: "#673971743",
    status: "COMPLETED",
    date: "Dec 30, 2019 07:52",
    total: "$1,200 (9 Products)",
    amount: "$1,200.00",
    products: 9,
  },
  {
    id: "#673971743",
    status: "CANCELED",
    date: "Dec 30, 2019 05:18",
    total: "$1,500 (1 Products)",
    amount: "$1,500.00",
    products: 1,
  },
  {
    id: "#673971743",
    status: "COMPLETED",
    date: "Dec 30, 2019 07:52",
    total: "$80 (1 Products)",
    amount: "$80.00",
    products: 1,
  },
];

const TOTAL_PAGES = 6;

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
  const [hoveredOrder, setHoveredOrder] = useState<Order | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-6 pb-20">
        <PageBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "User Account", href: "/account" },
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

              {/* Rows */}
              {ORDERS.map((order, i) => (
                <div
                  key={i}
                  className="relative flex items-center gap-6 px-6 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors group"
                  onMouseEnter={() => setHoveredOrder(order)}
                  onMouseLeave={() => setHoveredOrder(null)}
                >
                  <span className="w-[124px] flex-none text-[14px] font-medium text-gray-900">
                    {order.id}
                  </span>
                  <span
                    className={`w-[152px] flex-none text-[14px] font-semibold ${STATUS_COLOR[order.status]}`}
                  >
                    {order.status}
                  </span>
                  <span className="w-[200px] flex-none text-[14px] text-gray-600">
                    {order.date}
                  </span>
                  <span className="flex-1 text-[14px] text-gray-700">
                    {order.total}
                  </span>
                  <Link
                    href={`/account/orders/${order.id.replace("#", "")}`}
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

                {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map(
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
                    setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))
                  }
                  disabled={currentPage === TOTAL_PAGES}
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
                    className={`text-[12px] font-semibold ${STATUS_COLOR[hoveredOrder.status]}`}
                  >
                    {hoveredOrder.status}
                  </span>
                  <p className="text-[14px] font-medium text-gray-900">
                    Order {hoveredOrder.id}
                  </p>
                  <p className="text-[13px] text-gray-600">
                    {hoveredOrder.date} · {hoveredOrder.products} Products
                  </p>
                  <p className="text-[16px] font-semibold text-gray-900">
                    {hoveredOrder.amount} USD
                  </p>
                </div>
                <button className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white hover:bg-primary-600 transition-colors cursor-pointer flex-none">
                  <ArrowIcon dir="right" />
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
