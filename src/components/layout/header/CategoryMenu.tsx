"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutGrid, ChevronRight, ChevronDown } from "lucide-react";

const categories = [
  {
    label: "Điện thoại & Tablet",
    icon: "📱",
    links: [
      { href: "/mobile.html", label: "Điện thoại" },
      { href: "/tablet.html", label: "Tablet" },
    ],
  },
  { label: "Laptop", icon: "💻", href: "/laptop.html" },
  { label: "Âm thanh", icon: "🎧", href: "/am-thanh.html" },
  { label: "Đồng hồ thông minh", icon: "⌚", href: "/dong-ho-thong-minh.html" },
  { label: "Phụ kiện", icon: "🔌", href: "/phu-kien.html" },
  { label: "Nhà thông minh", icon: "🏠", href: "/nha-thong-minh.html" },
];

export function CategoryMenu() {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        setOpen(false);
        setActiveIndex(null);
      }}
    >
      <button
        className="navbar__item flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white/20"
        aria-expanded={open}
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="hidden lg:inline">Danh mục</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          id="menu-main"
          className="absolute left-0 top-full z-50 flex w-72 rounded-b-lg border bg-white shadow-lg"
        >
          {/* Menu tree */}
          <div className="w-full py-1">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="group relative flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm hover:bg-red-50 hover:text-red-600"
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="flex items-center gap-2">
                  <span>{cat.icon}</span>
                  {cat.links ? (
                    <div className="flex gap-2">
                      {cat.links.map((l) => (
                        <Link
                          key={l.href}
                          href={l.href}
                          className="hover:underline"
                          onClick={() => setOpen(false)}
                        >
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={cat.href!}
                      className="block w-full"
                      onClick={() => setOpen(false)}
                    >
                      {cat.label}
                    </Link>
                  )}
                </div>
                <ChevronRight className="h-3.5 w-3.5 opacity-40" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
