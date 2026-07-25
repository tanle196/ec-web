"use client";

import { useState, useRef, useEffect } from "react";
import { PageBreadcrumb } from "@/components/commons/breadcrumb";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { Container } from "@/components/commons/container";

type Card = {
  id: string;
  brand: "visa" | "mastercard";
  amount: string;
  currency: string;
  last4: string;
  holder: string;
  gradient: string;
};

const CARDS: Card[] = [
  {
    id: "visa-3814",
    brand: "visa",
    amount: "$95,400.00",
    currency: "USD",
    last4: "3814",
    holder: "Kevin Gilbert",
    gradient: "radial-gradient(circle at 0 0, #1b6392, #124261)",
  },
  {
    id: "mc-1761",
    brand: "mastercard",
    amount: "$87,583.00",
    currency: "USD",
    last4: "1761",
    holder: "Kevin Gilbert",
    gradient: "radial-gradient(circle at 0 0, #248e1d, #2db224)",
  },
];

type Address = {
  name: string;
  street: string;
  phone: string;
  email: string;
};

const BILLING: Address = {
  name: "Kevin Gilbert",
  street:
    "East Tejturi Bazar, Word No. 04, Road No. 13/x, House no. 1320/C, Flat No. 5D, Dhaka - 1200, Bangladesh",
  phone: "+1-202-555-0118",
  email: "kevin.gilbert@gmail.com",
};

const SHIPPING: Address = {
  name: "Kevin Gilbert",
  street:
    "East Tejturi Bazar, Word No. 04, Road No. 13/x, House no. 1320/C, Flat No. 5D, Dhaka - 1200, Bangladesh",
  phone: "+1-202-555-0118",
  email: "kevin.gilbert@gmail.com",
};

function DotsIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <circle cx="10" cy="10" r="1.5" />
      <circle cx="4" cy="10" r="1.5" />
      <circle cx="16" cy="10" r="1.5" />
    </svg>
  );
}

function CardDropdown({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute top-8 right-0 z-20 bg-white border border-gray-100 rounded-[4px] shadow-[0px_8px_40px_rgba(0,0,0,0.12)] py-2 min-w-[140px]"
    >
      {["Edit Card", "Delete Card"].map((label) => (
        <button
          key={label}
          onClick={onClose}
          className="w-full text-left px-4 h-9 text-[14px] text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer"
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function CreditCard({ card }: { card: Card }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="relative w-[296px] h-[196px] rounded-[4px] overflow-visible flex-none"
      style={{ background: card.gradient }}
    >
      {/* Amount */}
      <div className="absolute top-6 left-6">
        <p className="text-white text-[16px] leading-6">
          <span className="font-semibold">{card.amount} </span>
          <span className="font-normal opacity-80">{card.currency}</span>
        </p>
      </div>

      {/* Three-dot menu */}
      <div className="absolute top-6 right-6">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="text-white opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
          aria-label="Card options"
        >
          <DotsIcon />
        </button>
        <CardDropdown open={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>

      {/* Card number */}
      <div className="absolute top-[72px] left-6 flex flex-col gap-2">
        <p className="text-white text-[11px] font-medium uppercase opacity-70 tracking-widest">
          Card number
        </p>
        <p className="text-white text-[18px] font-normal tracking-widest">
          **** **** **** {card.last4}
        </p>
      </div>

      {/* Holder name */}
      <div className="absolute bottom-6 right-6">
        <p className="text-white text-[14px] font-medium">{card.holder}</p>
      </div>

      {/* Brand mark */}
      <div className="absolute bottom-6 left-6">
        {card.brand === "visa" ? (
          <span className="text-white text-[18px] font-extrabold tracking-widest italic">
            VISA
          </span>
        ) : (
          <div className="flex">
            <div className="w-7 h-7 rounded-full bg-yellow-400 opacity-95" />
            <div className="w-7 h-7 rounded-full bg-red-500 opacity-95 -ml-3" />
          </div>
        )}
      </div>
    </div>
  );
}

function AddressBlock({ title, address }: { title: string; address: Address }) {
  return (
    <div className="flex-1 bg-white border border-gray-100 rounded-[4px] p-6 flex flex-col gap-5">
      {/* Heading */}
      <div className="h-13 -mx-6 -mt-6 px-6 flex items-center border-b border-gray-100">
        <span className="text-[14px] font-medium text-gray-900 uppercase tracking-wide">
          {title}
        </span>
      </div>

      {/* Address details */}
      <div className="flex flex-col gap-2 text-[14px] leading-5">
        <p className="font-medium text-gray-900">{address.name}</p>
        <p className="text-gray-600">{address.street}</p>
        <p className="text-gray-600">
          <span className="text-gray-900">Phone Number: </span>
          {address.phone}
        </p>
        <p className="text-gray-600">
          <span className="text-gray-900">Email: </span>
          {address.email}
        </p>
      </div>

      {/* Edit button */}
      <button className="self-start border-2 border-secondary-100 rounded-[2px] px-6 h-10 text-[14px] font-bold text-secondary-500 uppercase tracking-[0.012em] hover:bg-secondary-50 transition-colors cursor-pointer">
        Edit Address
      </button>
    </div>
  );
}

export default function CardsAddressPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-6 pb-20">
        <PageBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Dashboard", href: "/account" },
            { label: "Cards & Address" },
          ]}
        />

        <div className="flex gap-18 items-start mt-2">
          <DashboardSidebar />

          {/* Main content */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            {/* Payment Option */}
            <div className="bg-white border border-gray-100 rounded-[4px]">
              {/* Section header */}
              <div className="flex items-center justify-between px-6 h-13 border-b border-gray-100">
                <span className="text-[14px] font-medium text-gray-900 uppercase tracking-wide">
                  Payment Option
                </span>
                <button className="flex items-center gap-2 text-[14px] font-semibold text-primary-500 hover:text-primary-600 transition-colors cursor-pointer">
                  Add Card
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
                </button>
              </div>

              {/* Cards */}
              <div className="flex gap-6 px-6 py-6">
                {CARDS.map((card) => (
                  <CreditCard key={card.id} card={card} />
                ))}
              </div>
            </div>

            {/* Billing + Shipping */}
            <div className="flex gap-6">
              <AddressBlock title="Billing Address" address={BILLING} />
              <AddressBlock title="Shipping Address" address={SHIPPING} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
