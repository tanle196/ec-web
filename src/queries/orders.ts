import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ordersControllerFindMine,
  ordersControllerFindMineOne,
  ordersControllerCreate,
  ordersControllerCancel,
} from "@/api/main";
import type { CreateOrderDto } from "@/api/main";
import { mainService } from "@/lib/api/client";
import { cartKeys } from "./cart";

export const orderKeys = {
  all: ["orders"] as const,
  mine: () => [...orderKeys.all, "mine"] as const,
  detail: (id: string) => [...orderKeys.all, "detail", id] as const,
};

export function useMyOrders() {
  return useQuery({
    queryKey: orderKeys.mine(),
    queryFn: () => mainService.request(ordersControllerFindMine)({}),
  });
}

export function useMyOrder(id: string) {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () =>
      mainService.request(ordersControllerFindMineOne)({ path: { id } }),
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateOrderDto) =>
      mainService.request(ordersControllerCreate)({ body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.mine() });
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      mainService.request(ordersControllerCancel)({ path: { id } }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: orderKeys.mine() }),
  });
}
