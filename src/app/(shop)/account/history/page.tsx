"use client";

import { useState } from "react";
import { PageBreadcrumb } from "@/components/commons/breadcrumb";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { Container } from "@/components/commons/container";

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
        image: "https://via.placeholder.com/180x160/f5f5f5/999?text=Tablet",
      },
      {
        id: "p2",
        name: "Samsung Galaxy A72 5G Dual SIM",
        price: "$90.00",
        rating: 3,
        reviews: 63,
        image: "https://via.placeholder.com/180x160/f5f5f5/999?text=Phone",
      },
      {
        id: "p3",
        name: "Midea 1.5 Ton Inverter AC",
        price: "$280.00",
        originalPrice: "$350.00",
        rating: 5,
        reviews: 130,
        badge: "hot",
        image: "https://via.placeholder.com/180x160/f5f5f5/999?text=AC",
      },
      {
        id: "p4",
        name: "Sony WH-1000XM4 Wireless Headphones",
        price: "$200.00",
        originalPrice: "$280.00",
        rating: 4,
        reviews: 52,
        badge: "sale",
        image: "https://via.placeholder.com/180x160/f5f5f5/999?text=Headphones",
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
        image: "https://via.placeholder.com/180x160/f5f5f5/999?text=Headphones",
      },
      {
        id: "p6",
        name: "Portable Wireless Gaming Headphones",
        price: "$84.00",
        originalPrice: "$120.00",
        rating: 3,
        reviews: 20,
        badge: "sale",
        image: "https://via.placeholder.com/180x160/f5f5f5/999?text=Gaming+HP",
      },
      {
        id: "p7",
        name: "Redragon K552 RGB Mechanical Keyboard",
        price: "$39.00",
        rating: 4,
        reviews: 86,
        badge: "new",
        image: "https://via.placeholder.com/180x160/f5f5f5/999?text=Keyboard",
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
        image: "https://via.placeholder.com/180x160/f5f5f5/999?text=JBL",
      },
      {
        id: "p9",
        name: "Sony WH-CH710N Wireless Headphones",
        price: "$149.00",
        rating: 5,
        reviews: 38,
        image: "https://via.placeholder.com/180x160/f5f5f5/999?text=Sony+HP",
      },
      {
        id: "p10",
        name: "Redragon K582 RGB Gaming Keyboard",
        price: "$55.00",
        originalPrice: "$75.00",
        rating: 4,
        reviews: 63,
        badge: "sale",
        image: "https://via.placeholder.com/180x160/f5f5f5/999?text=Gaming+KB",
      },
      {
        id: "p11",
        name: "Canon PIXMA MG2540S All-in-One Printer",
        price: "$69.00",
        rating: 3,
        reviews: 27,
        image: "https://via.placeholder.com/180x160/f5f5f5/999?text=Printer",
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
        image: "https://via.placeholder.com/180x160/f5f5f5/999?text=Drone",
      },
      {
        id: "p13",
        name: "Epson EcoTank L3150 Wi-Fi Printer",
        price: "$249.00",
        rating: 4,
        reviews: 58,
        badge: "new",
        image: "https://via.placeholder.com/180x160/f5f5f5/999?text=Epson",
      },
      {
        id: "p14",
        name: "VIZIO 4K UHD Smart TV 50 inch",
        price: "$398.00",
        originalPrice: "$499.00",
        rating: 4,
        reviews: 74,
        badge: "sale",
        image: "https://via.placeholder.com/180x160/f5f5f5/999?text=TV",
      },
      {
        id: "p15",
        name: "Samsung 7 kg Fully Automatic Washing Machine",
        price: "$350.00",
        rating: 5,
        reviews: 43,
        image: "https://via.placeholder.com/180x160/f5f5f5/999?text=Washer",
      },
    ],
  },
];

const BADGE_STYLE: Record<string, string> = {
  sale: "bg-danger-500",
  hot: "bg-primary-500",
  new: "bg-success-500",
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
    <div className="flex cursor-pointer flex-col gap-3 rounded-[4px] border border-gray-100 bg-white p-4 transition-shadow hover:shadow-md">
      {/* Image */}
      <div className="relative">
        {product.badge && (
          <span
            className={`absolute top-2 left-2 z-10 rounded-[2px] px-2 py-0.5 text-[11px] font-bold text-white uppercase ${BADGE_STYLE[product.badge]}`}
          >
            {product.badge}
          </span>
        )}
        <div className="flex h-[160px] items-center justify-center rounded-[2px] bg-gray-50">
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
      <p className="line-clamp-2 text-[14px] leading-5 font-medium text-gray-900">
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
        className={`relative h-5 w-10 flex-none cursor-pointer rounded-full transition-colors ${
          on ? "bg-primary-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
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
      <Container className="py-6 pb-20">
        <PageBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Account", href: "/account" },
            { label: "Browsing History" },
          ]}
        />

        <div className="mt-2 flex items-start gap-18">
          <DashboardSidebar />

          {/* Main content */}
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
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
                <p className="mb-3 text-[13px] font-medium tracking-wide text-gray-500 uppercase">
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
            <div className="mt-4 flex justify-center">
              <button className="h-11 cursor-pointer rounded-[2px] border-2 border-primary-500 px-8 text-[14px] font-bold tracking-[0.04em] text-primary-500 uppercase transition-colors hover:bg-primary-50">
                Load More
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
