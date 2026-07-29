import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface GuestCartItem {
  variantId: string;
  productSlug: string;
  name: string;
  variantName: string;
  price: number;
  image: string;
  quantity: number;
}

interface GuestCartStore {
  items: GuestCartItem[];
  addItem: (item: Omit<GuestCartItem, "quantity">, quantity?: number) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
}

export const useGuestCartStore = create<GuestCartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item, quantity = 1) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.variantId === item.variantId,
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.variantId === item.variantId
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity }] };
        }),
      updateQuantity: (variantId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.variantId === variantId ? { ...i, quantity } : i,
          ),
        })),
      removeItem: (variantId) =>
        set((state) => ({
          items: state.items.filter((i) => i.variantId !== variantId),
        })),
      clearCart: () => set({ items: [] }),
    }),
    { name: "guest-cart" },
  ),
);
