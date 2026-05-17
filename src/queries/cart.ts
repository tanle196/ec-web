import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cartsControllerGetCart,
  cartsControllerAddItem,
  cartsControllerUpdateItem,
  cartsControllerRemoveItem,
  cartsControllerClearCart,
} from "@/api/main";
import type { AddCartItemDto, UpdateCartItemDto } from "@/api/main";
import { mainService } from "@/lib/api/client";

export const cartKeys = {
  all: ["cart"] as const,
};

export function useCart() {
  return useQuery({
    queryKey: cartKeys.all,
    queryFn: () => mainService.request(cartsControllerGetCart)({}),
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: AddCartItemDto) =>
      mainService.request(cartsControllerAddItem)({ body }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: cartKeys.all }),
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      itemId,
      body,
    }: {
      itemId: string;
      body: UpdateCartItemDto;
    }) =>
      mainService.request(cartsControllerUpdateItem)({
        path: { itemId },
        body,
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: cartKeys.all }),
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (itemId: string) =>
      mainService.request(cartsControllerRemoveItem)({ path: { itemId } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: cartKeys.all }),
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => mainService.request(cartsControllerClearCart)({}),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: cartKeys.all }),
  });
}
