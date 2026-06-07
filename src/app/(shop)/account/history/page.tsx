"use client";

import { useState } from "react";
import { PageBreadcrumb } from "@/components/commons/breadcrumb";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

type Product = {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  badge?: "sale" | "hot" | "new";
  image: string;
};

type HistoryGroup = {
  date: string;
  products: Product[];
};

const HISTORY: HistoryGroup[] = [
  {
    date: "17 NOV 2020",
    products: [
      {
        id: "p1",
        name: "Samsung Galaxy Tab S6 Lite",
        price: "$69.00",
        originalPrice: "$89.00",
        rating: 4,
        reviews: 75,
        badge: "sale",
        image:
          "https://via.placeholder.com/180x160/f5f5f5/999?text=Tablet",
      },
      {
        id: "p2",
        name: "Samsung Galaxy A72 5G Dual SIM",
        price: "$90.00",
        rating: 3,
        reviews: 63,
        image:
          "https://via.placeholder.com/180x160/f5f5f5/999?text=Phone",
      },
      {
        id: "p3",
        name: "Midea 1.5 Ton Inverter AC",
        price: "$280.00",
        originalPrice: "$350.00",
        rating: 5,
        reviews: 130,
        badge: "hot",
        image:
          "https://via.placeholder.com/180x160/f5f5f5/999?text=AC",
      },
      {
        id: "p4",
        name: "Sony WH-1000XM4 Wireless Headphones",
        price: "$200.00",
        originalPrice: "$280.00",
        rating: 4,
        reviews: 52,
        badge: "sale",
        image:
          "https://via.placeholder.com/180x160/f5f5f5/999?text=Headphones",
      },
    ],
  },
  {
    date: "17 OCT 2020",
    products: [
      {
        id: "p5",
        name: "Urbanista London Wireless Headphones",
        price: "$99.00",
        rating: 4,
        reviews: 44,
        image:
          "https://via.placeholder.com/180x160/f5f5f5/999?text=Headphones",
      },
      {
        id: "p6",
        name: "Portable Wireless Gaming Headphones",
        price: "$84.00",
        originalPrice: "$120.00",
        rating: 3,
        reviews: 20,
        badge: "sale",
        image:
          "https://via.placeholder.com/180x160/f5f5f5/999?text=Gaming+HP",
      },
      {
        id: "p7",
        name: "Redragon K552 RGB Mechanical Keyboard",
        price: "$39.00",
        rating: 4,
        reviews: 86,
        badge: "new",
        image:
          "https://via.placeholder.com/180x160/f5f5f5/999?text=Keyboard",
      },
    ],
  },
  {
    date: "24 MAR 2020",
    products: [
      {
        id: "p8",
        name: "JBL Tune 510BT Wireless Headphones",
        price: "$49.00",
        originalPrice: "$70.00",
        rating: 4,
        reviews: 91,
        badge: "sale",
        image:
          "https://via.placeholder.com/180x160/f5f5f5/999?text=JBL",
      },
      {
        id: "p9",
        name: "Sony WH-CH710N Wireless Headphones",
        price: "$149.00",
        rating: 5,
        reviews: 38,
        image:
          "https://via.placeholder.com/180x160/f5f5f5/999?text=Sony+HP",
      },
      {
        id: "p10",
        name: "Redragon K582 RGB Gaming Keyboard",
        price: "$55.00",
        originalPrice: "$75.00",
        rating: 4,
        reviews: 63,
        badge: "sale",
        image:
          "https://via.placeholder.com/180x160/f5f5f5/999?text=Gaming+KB",
      },
      {
        id: "p11",
        name: "Canon PIXMA MG2540S All-in-One Printer",
        price: "$69.00",
        rating: 3,
        reviews: 27,
        image:
          "https://via.placeholder.com/180x160/f5f5f5/999?text=Printer",
      },
    ],
  },
  {
    date: "21 SEP 2020",
    products: [
      {
        id: "p12",
        name: "DJI Mini 2 Fly More Combo Drone",
        price: "$599.00",
        originalPrice: "$699.00",
        rating: 5,
        reviews: 112,
        badge: "hot",
        image:
          "https://via.placeholder.com/180x160/f5f5f5/999?text=Drone",
      },
      {
        id: "p13",
        name: "Epson EcoTank L3150 Wi-Fi Printer",
        price: "$249.00",
        rating: 4,
        reviews: 58,
        badge: "new",
        image:
          "https://via.placeholder.com/180x160/f5f5f5/999?text=Epson",
      },
      {
        id: "p14",
        name: "VIZIO 4K UHD Smart TV 50 inch",
        price: "$398.00",
        originalPrice: "$499.00",
        rating: 4,
        reviews: 74,
        badge: "sale",
        image:
          "https://via.placeholder.com/180x160/f5f5f5/999?text=TV",
      },
      {
        id: "p15",
        name: "Samsung 7 kg Fully Automatic Washing Machine",
        price: "$350.00",
        rating: 5,
        reviews: 43,
        image:
          "https://via.placeholder.com/180x160/f5f5f5/999?text=Washer",
      },
    ],
  },
];

const BADGE_STYLE: Record<string, string> = {
  sale: "bg-danger-500",
  hot:  "bg-primary-500",
  new:  "bg-success-500",
};

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill={i < rating ? "#FA8232" : "none"}
            aria-hidden
          >
            <path
              d="M6 1l1.27 2.57 2.84.41-2.05 2 .48 2.83L6 7.57 3.46 8.81l.48-2.83-2.05-2 2.84-.41z"
              stroke={i < rating ? "#FA8232" : "#D1D5DB"}
              strokeWidth="0.8"
            />
          </svg>
        ))}
      </div>
      <span className="text-[12px] text-gray-400">({reviews})</span>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white border border-gray-100 rounded-[4px] p-4 flex flex-col gap-3 hover:shadow-md transition-shadow cursor-pointer">
      {/* Image */}
      <div className="relative">
        {product.badge && (
          <span
            className={`absolute top-2 left-2 z-10 px-2 py-0.5 text-[11px] font-bold text-white uppercase rounded-[2px] ${BADGE_STYLE[product.badge]}`}
          >
            {product.badge}
          </span>
        )}
        <div className="h-[160px] flex items-center justify-center bg-gray-50 rounded-[2px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </div>

      {/* Rating */}
      <StarRating rating={product.rating} reviews={product.reviews} />

      {/* Name */}
      <p className="text-[14px] font-medium text-gray-900 leading-5 line-clamp-2">
        {product.name}
      </p>

      {/* Price */}
      <div className="flex items-center gap-2">
        <span className="text-[16px] font-bold text-gray-900">
          {product.price}
        </span>
        {product.originalPrice && (
          <span className="text-[13px] text-gray-400 line-through">
            {product.originalPrice}
          </span>
        )}
      </div>
    </div>
  );
}

function HistoryToggle({
  on,
  onToggle,
}: {
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[13px] text-gray-600">
        Turn Browsing History {on ? "off" : "on"}
      </span>
      <button
        onClick={onToggle}
        role="switch"
        aria-checked={on}
        className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer flex-none ${
          on ? "bg-primary-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
            on ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export default function BrowsingHistoryPage() {
  const [historyOn, setHistoryOn] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-330 mx-auto px-6 py-6 pb-20">
        <PageBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "User Account", href: "/account" },
            { label: "Dashboard", href: "/account" },
            { label: "Browsing History" },
          ]}
        />

        <div className="flex gap-18 items-start mt-2">
          <DashboardSidebar />

          {/* Main content */}
          <div className="flex-1 min-w-0 flex flex-col gap-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[20px] font-semibold text-gray-900">
                Browsing History
              </h2>
              <HistoryToggle
                on={historyOn}
                onToggle={() => setHistoryOn((v) => !v)}
              />
            </div>

            {/* Date groups */}
            {HISTORY.map((group) => (
              <div key={group.date} className="mb-6">
                {/* Date label */}
                <p className="text-[13px] font-medium text-gray-500 uppercase tracking-wide mb-3">
                  {group.date}
                </p>

                {/* Product grid */}
                <div className="grid grid-cols-4 gap-4">
                  {group.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ))}

            {/* Load more */}
            <div className="flex justify-center mt-4">
              <button className="px-8 h-11 border-2 border-primary-500 text-[14px] font-bold text-primary-500 uppercase tracking-[0.04em] rounded-[2px] hover:bg-primary-50 transition-colors cursor-pointer">
                Load More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
