"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useGuestCart } from "@/hooks/use-guest-cart";
import { useCart } from "@/queries/cart";

export function CartBadge() {
  const { isLoggedIn } = useAuth();
  const { data: cart } = useCart({ enabled: isLoggedIn });
  const guestCart = useGuestCart();

  const count = isLoggedIn
    ? (cart?.items ?? []).reduce((sum, item) => sum + item.quantity, 0)
    : guestCart.totalItems;

  return (
    <Link href="/cart" className="relative" aria-label={`Cart, ${count} items`}>
      <ShoppingCart size={30} className="text-white" strokeWidth={1.5} />
      {count > 0 && (
        <span
          aria-hidden
          className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full border-[1.5px] border-secondary-700 bg-white text-[11px] leading-none font-semibold text-secondary-700"
        >
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}
