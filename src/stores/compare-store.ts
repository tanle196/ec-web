import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_COMPARE = 3;

interface CompareStore {
  productIds: string[];
  addProduct: (id: string) => void;
  removeProduct: (id: string) => void;
  clearCompare: () => void;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set) => ({
      productIds: [],
      addProduct: (id) =>
        set((state) => {
          if (state.productIds.includes(id) || state.productIds.length >= MAX_COMPARE) {
            return state;
          }
          return { productIds: [...state.productIds, id] };
        }),
      removeProduct: (id) =>
        set((state) => ({
          productIds: state.productIds.filter((pid) => pid !== id),
        })),
      clearCompare: () => set({ productIds: [] }),
    }),
    { name: "compare" }
  )
);
