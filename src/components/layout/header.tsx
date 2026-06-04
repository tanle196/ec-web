import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const CATEGORIES = [
  { label: "Tất cả", href: "/categories" },
  { label: "Điện thoại", href: "/categories/phones" },
  { label: "Laptop", href: "/categories/laptop" },
  { label: "Audio", href: "/categories/audio" },
  { label: "Nhà cửa", href: "/categories/home" },
  { label: "Thời trang", href: "/categories/fashion" },
  { label: "Thực phẩm", href: "/categories/grocery" },
  { label: "Làm đẹp", href: "/categories/beauty" },
  { label: "Thể thao", href: "/categories/sports" },
];

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-marlo-border bg-background/92 backdrop-blur-md"
    >
      {/* Main row */}
      <div className="max-w-360 mx-auto px-16 h-16 flex items-center gap-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-[22px] font-bold tracking-[-0.04em] text-ink no-underline flex-none"
        >
          marlo
        </Link>

        {/* Search — server-side form */}
        <form
          action="/search"
          method="GET"
          className="flex-1 max-w-140 flex items-center bg-white border border-marlo-border rounded-full px-1.5 pl-4.5 h-11"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-text-tertiary)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            name="q"
            placeholder="Tìm điện thoại, laptop, tai nghe…"
            className="flex-1 ml-3 border-0 outline-none bg-transparent text-[14px] text-ink placeholder:text-text-disabled"
          />
          <button
            type="submit"
            className="bg-persimmon text-white border-0 h-8 px-4 rounded-full font-semibold text-[13px] cursor-pointer hover:bg-persimmon-hover transition-colors duration-150"
          >
            Tìm
          </button>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-auto">
          <Link
            href="/account"
            className="flex items-center gap-2 text-[14px] font-medium text-ink no-underline px-2.5 py-2 rounded-[8px] hover:bg-cream-2 transition-colors duration-150"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Tài khoản
          </Link>
          <Link
            href="/wishlist"
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-ink hover:bg-cream-2 transition-colors duration-150"
            aria-label="Danh sách yêu thích"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </Link>
          <Button variant="ghost" size="icon" aria-label="Giỏ hàng">
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Category nav */}
      <nav
        className="max-w-360 mx-auto px-16 h-11 flex items-center gap-1 text-[13px]"
        aria-label="Danh mục"
      >
        {CATEGORIES.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="px-3 py-1.5 rounded-full no-underline font-medium transition-colors duration-150 hover:bg-cream-2 text-text-secondary"
          >
            {c.label}
          </Link>
        ))}
        <span className="ml-auto flex items-center gap-1.5 text-text-secondary text-[13px]">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M12 22s7-7.58 7-13a7 7 0 1 0-14 0c0 5.42 7 13 7 13z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          Giao đến <strong className="text-ink font-semibold">Hà Nội</strong>
        </span>
      </nav>
    </header>
  );
}
