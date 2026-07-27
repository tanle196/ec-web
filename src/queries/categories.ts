import { useQuery } from "@tanstack/react-query";
import {
  categoriesControllerFindAll,
  categoriesControllerFindBySlug,
  categoriesControllerFindOne,
  categoriesControllerFindTree,
} from "@/api/main";
import { mainService } from "@/lib/api/client";

export const categoryKeys = {
  all: ["categories"] as const,
  list: () => [...categoryKeys.all, "list"] as const,
  tree: () => [...categoryKeys.all, "tree"] as const,
  detail: (id: string) => [...categoryKeys.all, "detail", id] as const,
  bySlug: (slug: string) => [...categoryKeys.all, "slug", slug] as const,
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

export function useCategoryBySlug(slug: string) {
  return useQuery({
    queryKey: categoryKeys.bySlug(slug),
    queryFn: () =>
      mainService.request(categoriesControllerFindBySlug)({
        path: { slug },
      }),
    enabled: !!slug,
  });
}
