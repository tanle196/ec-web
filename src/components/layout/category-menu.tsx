"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const categories = [
  { name: "Computer & Laptop", slug: "computer-laptop" },
  { name: "Computer Accessories", slug: "computer-accessories" },
  { name: "SmartPhone", slug: "smartphone", hasSubMenu: true },
  { name: "Headphone", slug: "headphone" },
  { name: "Mobile Accessories", slug: "mobile-accessories" },
  { name: "Gaming Console", slug: "gaming-console" },
  { name: "Camera & Photo", slug: "camera-photo" },
  { name: "TV & Homes Appliances", slug: "tv-appliances" },
  { name: "Watchs & Accessories", slug: "watches-accessories" },
  { name: "GPS & Navigation", slug: "gps-navigation" },
  { name: "Warable Technology", slug: "wearable" },
];

const smartphoneBrands = [
  "All",
  "iPhone",
  "Samsung",
  "Realme",
  "Xiaomi",
  "Oppo",
  "Vivo",
  "OnePlus",
  "Huawei",
  "Infinix",
  "Tecno",
];

const featuredPhones = [
  {
    id: 1,
    name: "Samsung Electronics Samsung Galaxy S21 5G",
    price: "$160",
    originalPrice: null,
    image: "/images/products/samsung-s21.jpg",
  },
  {
    id: 2,
    name: "Simple Mobile 5G LTE Galaxy 12 Mini 512GB Gaming Phone",
    price: "$1,500",
    originalPrice: null,
    image: "/images/products/gaming-phone.jpg",
  },
  {
    id: 3,
    name: "Sony DSCHX8 High Zoom Point & Shoot Camera",
    price: "$2,300",
    originalPrice: "$3200",
    image: "/images/products/sony-camera.jpg",
  },
];

export function CategoryMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCat, setActiveCat] = useState<string | null>(null);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => {
        setIsOpen(false);
        setActiveCat(null);
      }}
    >
      <button
        className="bg-primary-500 flex items-center gap-2 px-6 py-3.5 rounded-sm text-body-sm font-medium text-white whitespace-nowrap hover:bg-primary-600 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        All Category
        <ChevronDown
          size={16}
          aria-hidden
          className={cn(
            "transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 pt-1">
          <div className="bg-white border border-gray-100 shadow-[0_8px_40px_rgba(0,0,0,0.12)] flex">
            {/* Left panel: categories */}
            <ul className="w-60 py-3 shrink-0" role="menu">
              {categories.map((cat) => (
                <li key={cat.slug} role="none">
                  <Link
                    href={`/category/${cat.slug}`}
                    role="menuitem"
                    onMouseEnter={() =>
                      setActiveCat(cat.hasSubMenu ? cat.name : null)
                    }
                    className={cn(
                      "flex items-center justify-between h-9 px-4 text-body-sm transition-colors",
                      activeCat === cat.name
                        ? "bg-gray-50 font-medium text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    )}
                  >
                    {cat.name}
                    {cat.hasSubMenu && <ChevronRight size={12} aria-hidden />}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right panel: sub-menu (shown when a category with submenu is active) */}
            {activeCat === "SmartPhone" && (
              <div className="flex gap-5 p-5 border-l border-gray-100">
                {/* Brand list */}
                <ul className="w-41 flex flex-col shrink-0">
                  {smartphoneBrands.map((brand) => (
                    <li key={brand}>
                      <Link
                        href={`/category/smartphone?brand=${brand.toLowerCase()}`}
                        className={cn(
                          "h-9 flex items-center px-4 text-body-sm rounded-sm transition-colors",
                          brand === "All"
                            ? "text-gray-600 hover:bg-gray-50"
                            : "text-gray-600 hover:bg-gray-50",
                        )}
                      >
                        {brand}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Featured phones */}
                <div className="flex flex-col gap-4 shrink-0 w-78">
                  <h3 className="text-body-md font-semibold text-gray-900 uppercase tracking-wide">
                    Featured Phones
                  </h3>
                  <div className="flex flex-col gap-3">
                    {featuredPhones.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="border border-gray-100 rounded-sm p-3 flex gap-3 items-center hover:border-gray-200 transition-colors"
                      >
                        <div className="relative w-20 h-20 shrink-0 bg-gray-50 rounded-sm overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="text-body-sm text-gray-900 leading-5 line-clamp-2">
                            {product.name}
                          </p>
                          <div className="flex items-center gap-1">
                            {product.originalPrice && (
                              <span className="text-body-sm text-gray-400 line-through">
                                {product.originalPrice}
                              </span>
                            )}
                            <span className="text-body-sm font-semibold text-secondary-500">
                              {product.price}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Promo banner */}
                <div className="bg-warning-200 rounded-sm p-8 flex flex-col gap-6 items-center justify-center shrink-0 w-[312px]">
                  <div className="flex flex-col gap-3 items-center text-center">
                    <div className="relative w-[248px] h-24">
                      <Image
                        src="/images/promo/earbuds.png"
                        alt="Xiaomi Earbuds"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col gap-4 items-center">
                      <div className="flex flex-col gap-2">
                        <p className="font-semibold text-[28px] leading-8 text-gray-900">
                          21% Discount
                        </p>
                        <p className="text-body-md text-gray-700 w-[248px]">
                          Escape the noise, It&apos;s time to hear the magic
                          with Xiaomi Earbuds.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-body-sm text-gray-700">
                          Starting price:
                        </span>
                        <span className="bg-white px-3 py-1.5 rounded-sm text-body-md font-semibold text-gray-900">
                          $99 USD
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/category/smartphone"
                    className="bg-primary-500 hover:bg-primary-600 transition-colors w-[248px] flex items-center justify-center gap-2 py-3 rounded-sm text-white text-body-sm font-bold uppercase tracking-wide"
                  >
                    Shop now
                    <ChevronRight size={16} aria-hidden />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
