import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistStore {
  productIds: string[];
  addProduct: (id: string) => void;
  removeProduct: (id: string) => void;
  toggleProduct: (id: string) => void;
  hasProduct: (id: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      productIds: [],
      addProduct: (id) =>
        set((state) => {
          if (state.productIds.includes(id)) return state;
          return { productIds: [...state.productIds, id] };
        }),
      removeProduct: (id) =>
        set((state) => ({
          productIds: state.productIds.filter((pid) => pid !== id),
        })),
      toggleProduct: (id) => {
        const { productIds } = get();
        if (productIds.includes(id)) {
          set({ productIds: productIds.filter((pid) => pid !== id) });
        } else {
          set({ productIds: [...productIds, id] });
        }
      },
      hasProduct: (id) => get().productIds.includes(id),
      clearWishlist: () => set({ productIds: [] }),
    }),
    { name: "wishlist" }
  )
);
