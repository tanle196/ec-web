"use client";

import { useState } from "react";
import Link from "next/link";

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
      <div className="bg-[#f2f4f5] h-18 flex items-center">
        <div className="max-w-7xl mx-auto px-16 w-full">
          <nav className="flex items-center gap-2 text-[14px] leading-5">
            <Link href="/" className="text-text-secondary hover:text-foreground transition-colors no-underline flex items-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Home
            </Link>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span className="text-text-secondary">Pages</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span className="font-medium text-[#2da5f3]">Track Order</span>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-16 pt-12 pb-31">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-4">
            <h1 className="text-[32px] font-semibold leading-10 text-[#191c1f]">
              Track Order
            </h1>
            <p className="text-[16px] leading-6 text-[#5f6c72] max-w-190">
              To track your order please enter your order ID in the input field
              below and press the &ldquo;Track Order&rdquo; button. This was
              given to you on your receipt and in the confirmation email you
              should have received.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex gap-6">
              {/* Order ID */}
              <div className="flex flex-col gap-4 w-106">
                <div className="flex flex-col gap-2">
                  <label htmlFor="order-id" className="text-[14px] leading-5 text-[#191c1f]">
                    Order ID
                  </label>
                  <input
                    id="order-id"
                    type="text"
                    placeholder="ID..."
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="w-full bg-white border border-[#e4e7e9] rounded-xs px-3.75 h-11 text-[14px] leading-5 text-[#191c1f] placeholder:text-[#77878f] outline-none focus:border-[#191c1f] transition-colors"
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
              <div className="flex flex-col gap-2 w-106">
                <label htmlFor="billing-email" className="text-[14px] leading-5 text-[#191c1f]">
                  Billing Email
                </label>
                <input
                  id="billing-email"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-[#e4e7e9] rounded-xs px-3.75 h-11 text-[14px] leading-5 text-[#191c1f] placeholder:text-[#77878f] outline-none focus:border-[#191c1f] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="self-start inline-flex items-center gap-3 px-8 h-14 rounded-[3px] bg-[#fa8232] text-white text-[16px] font-bold tracking-[0.012em] uppercase border-0 cursor-pointer hover:opacity-90 transition-opacity duration-150"
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
      </div>
    </div>
  );
}
