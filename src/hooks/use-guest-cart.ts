"use client";

import { useGuestCartStore } from "@/stores/guest-cart-store";

export function useGuestCart() {
  const items = useGuestCartStore((s) => s.items);
  const addItem = useGuestCartStore((s) => s.addItem);
  const updateQuantity = useGuestCartStore((s) => s.updateQuantity);
  const removeItem = useGuestCartStore((s) => s.removeItem);
  const clearCart = useGuestCartStore((s) => s.clearCart);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return { items, totalItems, addItem, updateQuantity, removeItem, clearCart };
}
