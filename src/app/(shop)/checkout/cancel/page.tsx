"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/commons/container";
import { PageBreadcrumb } from "@/components/commons/breadcrumb";

export default function CheckoutCancelPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutCancelContent />
    </Suspense>
  );
}

function CheckoutCancelContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#f2f4f5] h-18 flex items-center">
        <Container>
          <PageBreadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Shopping Cart", href: "/cart" },
              { label: "Checkout" },
            ]}
          />
        </Container>
      </div>

      <div className="flex flex-col gap-8 items-center justify-center py-31">
        <div className="flex flex-col gap-6 items-center justify-center">
          <svg width="88" height="88" viewBox="0 0 88 88" fill="none">
            <circle cx="44" cy="44" r="44" fill="#EE5858" fillOpacity="0.12" />
            <circle
              cx="44"
              cy="44"
              r="33"
              stroke="#EE5858"
              strokeWidth="2"
              fill="none"
            />
            <line
              x1="34"
              y1="34"
              x2="54"
              y2="54"
              stroke="#EE5858"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <line
              x1="54"
              y1="34"
              x2="34"
              y2="54"
              stroke="#EE5858"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>

          <div className="flex flex-col gap-3 items-center text-center">
            <p className="text-[24px] font-semibold leading-8 text-[#191c1f]">
              Checkout cancelled
            </p>
            <p className="text-[14px] leading-5 text-[#5f6c72] max-w-106">
              No charge was made. Your order is still saved — you can retry
              payment or choose a different payment method any time.
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 h-12 border-2 border-[#ffe7d6] rounded-xs text-[#fa8232] font-bold text-[14px] uppercase tracking-[0.012em] no-underline hover:bg-[#fff8f4] transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href={orderId ? `/account/orders/${orderId}` : "/account/orders"}
            className="flex items-center gap-2 px-6 h-12 bg-[#fa8232] rounded-xs text-white font-bold text-[14px] uppercase tracking-[0.012em] no-underline hover:opacity-90 transition-opacity"
          >
            Retry Payment
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
