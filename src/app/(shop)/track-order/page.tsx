"use client";

import { useState } from "react";
import { Container } from "@/components/commons/container";
import { PageBreadcrumb } from "@/components/commons/breadcrumb";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire up tracking API
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb strip */}
      <div className="flex h-18 items-center bg-[#f2f4f5]">
        <Container>
          <PageBreadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Track Order" }]}
          />
        </Container>
      </div>

      {/* Main content */}
      <Container className="pt-12 pb-31">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-4">
            <h1 className="text-[32px] leading-10 font-semibold text-[#191c1f]">
              Track Order
            </h1>
            <p className="max-w-190 text-[16px] leading-6 text-[#5f6c72]">
              To track your order please enter your order ID in the input field
              below and press the &ldquo;Track Order&rdquo; button. This was
              given to you on your receipt and in the confirmation email you
              should have received.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex gap-6">
              {/* Order ID */}
              <div className="flex w-106 flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="order-id"
                    className="text-[14px] leading-5 text-[#191c1f]"
                  >
                    Order ID
                  </label>
                  <input
                    id="order-id"
                    type="text"
                    placeholder="ID..."
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="h-11 w-full rounded-xs border border-[#e4e7e9] bg-white px-3.75 text-[14px] leading-5 text-[#191c1f] transition-colors outline-none placeholder:text-[#77878f] focus:border-[#191c1f]"
                  />
                </div>
                <div className="flex items-center gap-1.5 text-[14px] leading-5 text-[#5f6c72]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-none"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  Order ID that we sended to your in your email address.
                </div>
              </div>

              {/* Billing Email */}
              <div className="flex w-106 flex-col gap-2">
                <label
                  htmlFor="billing-email"
                  className="text-[14px] leading-5 text-[#191c1f]"
                >
                  Billing Email
                </label>
                <input
                  id="billing-email"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 w-full rounded-xs border border-[#e4e7e9] bg-white px-3.75 text-[14px] leading-5 text-[#191c1f] transition-colors outline-none placeholder:text-[#77878f] focus:border-[#191c1f]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex h-14 cursor-pointer items-center gap-3 self-start rounded-[3px] border-0 bg-[#fa8232] px-8 text-[16px] font-bold tracking-[0.012em] text-white uppercase transition-opacity duration-150 hover:opacity-90"
            >
              Track Order
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
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}
