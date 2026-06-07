"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  {
    id: "track-order",
    label: "Track Order",
    active: true,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M4 8h16v14H4z" fill="#FA8232" opacity="0.2" />
        <path d="M4 8h16v14H4z" stroke="#FA8232" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M20 12h5l3 4v4h-8V12z" fill="#FA8232" opacity="0.2" />
        <path d="M20 12h5l3 4v4h-8V12z" stroke="#FA8232" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="9" cy="22" r="2" fill="#FA8232" />
        <circle cx="24" cy="22" r="2" fill="#FA8232" />
      </svg>
    ),
  },
  {
    id: "reset-password",
    label: "Reset Password",
    active: false,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect x="7" y="14" width="18" height="13" rx="2" fill="#FA8232" opacity="0.2" stroke="#FA8232" strokeWidth="1.5" />
        <path d="M11 14v-4a5 5 0 0 1 10 0v4" stroke="#FA8232" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="20" r="2" fill="#FA8232" />
      </svg>
    ),
  },
  {
    id: "payment-option",
    label: "Payment Option",
    active: false,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect x="4" y="7" width="24" height="18" rx="2" fill="#FA8232" opacity="0.2" stroke="#FA8232" strokeWidth="1.5" />
        <path d="M4 12h24" stroke="#FA8232" strokeWidth="1.5" />
        <rect x="8" y="17" width="6" height="3" rx="1" fill="#FA8232" />
      </svg>
    ),
  },
  {
    id: "my-account",
    label: "My Account",
    active: false,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <circle cx="16" cy="11" r="5" fill="#FA8232" opacity="0.2" stroke="#FA8232" strokeWidth="1.5" />
        <path d="M6 27c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#FA8232" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "return-items",
    label: "Return Items",
    active: false,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M6 14h14a6 6 0 0 1 0 12H6" stroke="#FA8232" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 10L6 14l4 4" stroke="#FA8232" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "order",
    label: "Order",
    active: false,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect x="6" y="5" width="20" height="24" rx="2" fill="#FA8232" opacity="0.2" stroke="#FA8232" strokeWidth="1.5" />
        <path d="M11 12h10M11 17h10M11 22h6" stroke="#FA8232" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "delivery",
    label: "Delivery",
    active: false,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M2 10h18v12H2z" fill="#FA8232" opacity="0.2" stroke="#FA8232" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M20 14h6l4 5v3h-10V14z" fill="#FA8232" opacity="0.2" stroke="#FA8232" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="7" cy="22" r="2.5" fill="white" stroke="#FA8232" strokeWidth="1.5" />
        <circle cx="25" cy="22" r="2.5" fill="white" stroke="#FA8232" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "shipping-payment",
    label: "Shipping & Payment",
    active: false,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M4 8h24v16H4z" fill="#FA8232" opacity="0.2" stroke="#FA8232" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M4 13h24M12 18h4" stroke="#FA8232" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "shopping-cart",
    label: "Shopping Cart & Wallet",
    active: false,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M4 5h4l3 14h14" stroke="#FA8232" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 10h18l-2 8H10L8 10z" fill="#FA8232" opacity="0.2" stroke="#FA8232" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="13" cy="25" r="2" fill="#FA8232" />
        <circle cx="23" cy="25" r="2" fill="#FA8232" />
      </svg>
    ),
  },
  {
    id: "sell-on-clicon",
    label: "Sell on Clicon",
    active: false,
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M4 14l12-9 12 9v13H4V14z" fill="#FA8232" opacity="0.2" stroke="#FA8232" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="11" y="19" width="10" height="8" rx="1" fill="white" stroke="#FA8232" strokeWidth="1.5" />
      </svg>
    ),
  },
];

const POPULAR_TOPICS = [
  [
    { text: "How do I return my item?", active: false },
    { text: "What is Clicons Returns Policy?", active: true },
    { text: "How long is the refund process?", active: false },
  ],
  [
    { text: "What are the 'Delivery Timelines'?", active: false },
    { text: "What is 'Discover Your Daraz Campaign 2022'?", active: false },
    { text: "What is the Voucher & Gift Offer in this Campaign?", active: false },
  ],
  [
    { text: "How to cancel Clicon Order.", active: false },
    { text: "Ask the Digital and Device Community", active: false },
    { text: "How to change my shop name?", active: false },
  ],
];

const CONTACT_CARDS = [
  {
    id: "call",
    title: "Call us now",
    description: "we are available online from 9:00 AM to 5:00 PM (GMT95:45) Talk with use now",
    contact: "+1-202-555-0126",
    buttonLabel: "Call now",
    buttonColor: "bg-[#2da5f3]",
    iconBg: "bg-[#eaf6fe]",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
        <path d="M8 10a2 2 0 0 1 2-2h4l3 8-3.5 2a24 24 0 0 0 14.5 14.5L30 29l8 3v4a2 2 0 0 1-2 2A32 32 0 0 1 8 10z" fill="#2da5f3" opacity="0.3" />
        <path d="M8 10a2 2 0 0 1 2-2h4l3 8-3.5 2a24 24 0 0 0 14.5 14.5L30 29l8 3v4a2 2 0 0 1-2 2A32 32 0 0 1 8 10z" stroke="#2da5f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "chat",
    title: "Chat with us",
    description: "we are available online from 9:00 AM to 5:00 PM (GMT95:45) Talk with use now",
    contact: "Support@clicon.com",
    buttonLabel: "Contact Us",
    buttonColor: "bg-[#2db224]",
    iconBg: "bg-[#eaf7e9]",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
        <path d="M24 6C14.06 6 6 13.16 6 22c0 4.84 2.44 9.16 6.28 12.16L11 42l7.56-3.44A20 20 0 0 0 24 39c9.94 0 18-7.16 18-17S33.94 6 24 6z" fill="#2db224" opacity="0.3" />
        <path d="M24 6C14.06 6 6 13.16 6 22c0 4.84 2.44 9.16 6.28 12.16L11 42l7.56-3.44A20 20 0 0 0 24 39c9.94 0 18-7.16 18-17S33.94 6 24 6z" stroke="#2db224" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="22" r="2" fill="#2db224" />
        <circle cx="24" cy="22" r="2" fill="#2db224" />
        <circle cx="32" cy="22" r="2" fill="#2db224" />
      </svg>
    ),
  },
  {
    id: "email",
    title: "Email us",
    description: "we are available online from 9:00 AM to 5:00 PM (GMT95:45) Talk with use now",
    contact: "info@clicon.com",
    buttonLabel: "Send Email",
    buttonColor: "bg-[#fa8232]",
    iconBg: "bg-[#fff3e9]",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
        <rect x="6" y="10" width="36" height="28" rx="3" fill="#fa8232" opacity="0.3" />
        <rect x="6" y="10" width="36" height="28" rx="3" stroke="#fa8232" strokeWidth="2" />
        <path d="M6 14l18 13L42 14" stroke="#fa8232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function ArrowRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function CustomerSupportPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("track-order");

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#f2f4f5] h-18 flex items-center">
        <div className="max-w-7xl mx-auto px-16 w-full">
          <nav className="flex items-center gap-2 text-[14px] leading-5">
            <Link
              href="/"
              className="text-[#5f6c72] hover:text-foreground transition-colors no-underline flex items-center gap-1.5"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Home
            </Link>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#5f6c72]">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span className="font-medium text-[#2da5f3]">Customer Support</span>
          </nav>
        </div>
      </div>

      {/* Hero / Search */}
      <section className="relative overflow-hidden bg-white shadow-[inset_0px_-1px_0px_0px_#e4e7e9] h-[332px]">
        {/* Customer support agent image */}
        <div className="absolute top-0 right-0 h-full w-[42%] pointer-events-none overflow-hidden">
          <Image
            src="https://www.figma.com/api/mcp/asset/248b72bd-8a6c-4655-b10b-9bdf56f072c8"
            alt=""
            fill
            className="object-contain object-right"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-16 h-full flex items-center">
          <div className="flex flex-col gap-6 max-w-[536px]">
            <div className="flex flex-col gap-4">
              <span className="inline-flex items-center self-start bg-[#efd33d] text-[#191c1f] text-[14px] font-semibold px-4 py-2 rounded-[2px]">
                HELP CENTER
              </span>
              <h1 className="text-[32px] font-semibold leading-[40px] text-[#191c1f]">
                How we can help you!
              </h1>
            </div>

            {/* Search bar */}
            <div className="flex items-center gap-3 bg-white border border-[#e4e7e9] rounded-[4px] p-3">
              <div className="flex items-center gap-3 flex-1 bg-white h-12 rounded-[2px] px-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#77878f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Enter your question or keyword"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 text-[16px] leading-6 text-[#191c1f] placeholder:text-[#77878f] outline-none border-0 bg-transparent"
                />
              </div>
              <button
                type="button"
                className="bg-[#fa8232] text-white text-[14px] font-bold uppercase tracking-[0.168px] h-12 px-6 rounded-[2px] hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Buttons */}
      <section className="py-18">
        <div className="max-w-7xl mx-auto px-16 flex flex-col gap-10">
          <h2 className="text-[32px] font-semibold leading-10 text-[#191c1f] text-center">
            What can we assist you with today?
          </h2>

          <div className="flex flex-col gap-6">
            {/* Row 1 */}
            <div className="grid grid-cols-4 gap-6">
              {CATEGORIES.slice(0, 4).map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex gap-4 items-center justify-center p-6 rounded-[4px] border-2 transition-all cursor-pointer text-left ${
                      isActive
                        ? "border-[#fa8232] shadow-[0px_8px_20px_rgba(250,130,50,0.12)]"
                        : "border-[#ffe7d6] hover:border-[#fa8232]/50"
                    }`}
                  >
                    {cat.icon}
                    <span className="text-[16px] font-medium leading-6 text-[#191c1f] flex-1">{cat.label}</span>
                  </button>
                );
              })}
            </div>
            {/* Row 2 */}
            <div className="grid grid-cols-4 gap-6">
              {CATEGORIES.slice(4, 8).map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex gap-4 items-center justify-center p-6 rounded-[4px] border-2 transition-all cursor-pointer text-left ${
                      isActive
                        ? "border-[#fa8232] shadow-[0px_8px_20px_rgba(250,130,50,0.12)]"
                        : "border-[#ffe7d6] hover:border-[#fa8232]/50"
                    }`}
                  >
                    {cat.icon}
                    <span className="text-[16px] font-medium leading-6 text-[#191c1f] flex-1">{cat.label}</span>
                  </button>
                );
              })}
            </div>
            {/* Row 3 */}
            <div className="grid grid-cols-4 gap-6">
              {CATEGORIES.slice(8).map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex gap-4 items-center justify-center p-6 rounded-[4px] border-2 transition-all cursor-pointer text-left ${
                      isActive
                        ? "border-[#fa8232] shadow-[0px_8px_20px_rgba(250,130,50,0.12)]"
                        : "border-[#ffe7d6] hover:border-[#fa8232]/50"
                    }`}
                  >
                    {cat.icon}
                    <span className="text-[16px] font-medium leading-6 text-[#191c1f] flex-1">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-18 border-t border-[#e4e7e9]">
        <div className="max-w-7xl mx-auto px-16 flex flex-col gap-10">
          <h2 className="text-[24px] font-semibold leading-8 text-[#191c1f] text-center">
            Popular Topics
          </h2>

          <div className="grid grid-cols-3 gap-6">
            {POPULAR_TOPICS.map((column, colIdx) => (
              <ul key={colIdx} className="flex flex-col gap-4">
                {column.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <Link
                      href="#"
                      className={`flex items-start gap-2 text-[16px] leading-6 no-underline list-disc ${
                        item.active
                          ? "text-[#fa8232] font-semibold"
                          : "text-[#191c1f] font-normal hover:text-[#fa8232]"
                      } transition-colors`}
                    >
                      <span className="mt-2 w-2 h-2 rounded-full shrink-0 bg-current" />
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="bg-[#f2f4f5] py-18">
        <div className="max-w-7xl mx-auto px-16 flex flex-col gap-10 items-center">
          {/* Heading */}
          <div className="flex flex-col gap-4 items-center">
            <span className="inline-flex items-center self-center bg-[#2da5f3] text-white text-[14px] font-semibold px-4 py-2 rounded-[2px]">
              CONTACT US
            </span>
            <h2 className="text-[32px] font-semibold leading-10 text-[#191c1f] text-center">
              Don&apos;t find your answer.<br />Contact with us
            </h2>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-3 gap-6 w-full">
            {CONTACT_CARDS.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-[4px] shadow-[0px_24px_16px_rgba(25,28,31,0.08)] p-8 flex gap-6 items-start"
              >
                {/* Icon */}
                <div className={`${card.iconBg} p-6 rounded-[4px] shrink-0`}>
                  {card.icon}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-6 flex-1 min-w-0">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <p className="text-[18px] font-semibold leading-6 text-[#191c1f]">{card.title}</p>
                      <p className="text-[14px] leading-5 text-[#5f6c72]">{card.description}</p>
                    </div>
                    <p className="text-[24px] leading-8 text-[#191c1f]">{card.contact}</p>
                  </div>

                  <button
                    type="button"
                    className={`inline-flex items-center gap-2 self-start ${card.buttonColor} text-white text-[14px] font-bold uppercase tracking-[0.168px] h-12 px-6 rounded-[2px] hover:opacity-90 transition-opacity cursor-pointer`}
                  >
                    {card.buttonLabel}
                    <ArrowRightIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
