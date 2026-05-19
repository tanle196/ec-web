"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";

export function CartButton() {
  const items = useCartStore((s) => s.items);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <Link
      href="/cart"
      className="navbar__item relative flex flex-col items-center gap-0.5 px-2 py-1 text-xs text-white hover:text-white/80"
    >
      <div className="relative">
        <ShoppingCart className="h-5 w-5" />
        {count > 0 && (
          <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </div>
      <span className="hidden lg:block">Giỏ hàng</span>
    </Link>
  );
}
