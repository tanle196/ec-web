import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/commons/container";

interface Category {
  id: string;
  name: string;
  href: string;
  icon: ReactNode;
}

const CATEGORIES: Category[] = [
  {
    id: "phones",
    name: "Điện thoại",
    href: "/phones",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <circle cx="12" cy="17" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "laptop",
    name: "Laptop",
    href: "/categories/laptop",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
  {
    id: "audio",
    name: "Audio",
    href: "/categories/audio",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <rect x="3" y="15" width="4" height="6" rx="2" />
        <rect x="17" y="15" width="4" height="6" rx="2" />
      </svg>
    ),
  },
  {
    id: "home",
    name: "Nhà cửa",
    href: "/categories/home",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: "fashion",
    name: "Thời trang",
    href: "/categories/fashion",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    id: "grocery",
    name: "Thực phẩm",
    href: "/categories/grocery",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    id: "beauty",
    name: "Làm đẹp",
    href: "/categories/beauty",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z" />
      </svg>
    ),
  },
  {
    id: "sports",
    name: "Thể thao",
    href: "/categories/sports",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

export function CategorySection() {
  return (
    <Container size="wide" className="pt-12">
      <div className="grid grid-cols-8 gap-3.5">
        {CATEGORIES.map((c) => (
          <Link
            key={c.id}
            href={c.href}
            className="bg-white border border-marlo-border rounded-[16px] p-4 flex flex-col items-center gap-2.5 no-underline text-inherit transition-all duration-150 hover:-translate-y-0.5 hover:shadow-card-sm"
          >
            <span className="text-foreground">{c.icon}</span>
            <span
              className="text-[13px] font-semibold text-foreground text-center"
            >
              {c.name}
            </span>
          </Link>
        ))}
      </div>
    </Container>
  );
}
