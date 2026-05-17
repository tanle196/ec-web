import { useQuery } from "@tanstack/react-query";
import {
  productsControllerFindAll,
  productsControllerFindOne,
  productReviewsControllerFindApproved,
} from "@/api/main";
import type { ProductsControllerFindAllData } from "@/api/main";
import { mainService } from "@/lib/api/client";

export const productKeys = {
  all: ["products"] as const,
  list: (params?: ProductsControllerFindAllData["query"]) =>
    [...productKeys.all, "list", params] as const,
  detail: (id: string) => [...productKeys.all, "detail", id] as const,
  reviews: (productId: string) =>
    [...productKeys.all, "reviews", productId] as const,
};

export function useProducts(params?: ProductsControllerFindAllData["query"]) {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () =>
      mainService.request(productsControllerFindAll)({ query: params }),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () =>
      mainService.request(productsControllerFindOne)({ path: { id } }),
    enabled: !!id,
  });
}

export function useProductReviews(productId: string) {
  return useQuery({
    queryKey: productKeys.reviews(productId),
    queryFn: () =>
      mainService.request(productReviewsControllerFindApproved)({
        path: { productId },
      }),
    enabled: !!productId,
  });
}
