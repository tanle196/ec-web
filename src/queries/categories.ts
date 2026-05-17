import { useQuery } from "@tanstack/react-query";
import {
  categoriesControllerFindAll,
  categoriesControllerFindOne,
  categoriesControllerFindTree,
} from "@/api/main";
import { mainService } from "@/lib/api/client";

export const categoryKeys = {
  all: ["categories"] as const,
  list: () => [...categoryKeys.all, "list"] as const,
  tree: () => [...categoryKeys.all, "tree"] as const,
  detail: (id: string) => [...categoryKeys.all, "detail", id] as const,
};

export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.list(),
    queryFn: () => mainService.request(categoriesControllerFindAll)({}),
  });
}

export function useCategoryTree() {
  return useQuery({
    queryKey: categoryKeys.tree(),
    queryFn: () => mainService.request(categoriesControllerFindTree)({}),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: () =>
      mainService.request(categoriesControllerFindOne)({ path: { id } }),
    enabled: !!id,
  });
}
