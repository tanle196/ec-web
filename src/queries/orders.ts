import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ordersControllerFindMine,
  ordersControllerFindMineOne,
  ordersControllerCreate,
  ordersControllerCancel,
  ordersControllerGetHistory,
} from "@/api/main";
import type { CreateOrderDto, OrdersControllerFindMineData } from "@/api/main";
import { mainService } from "@/lib/api/client";
import { cartKeys } from "./cart";

export const orderKeys = {
  all: ["orders"] as const,
  mine: (params?: OrdersControllerFindMineData["query"]) =>
    [...orderKeys.all, "mine", params] as const,
  detail: (id: string) => [...orderKeys.all, "detail", id] as const,
  history: (id: string) => [...orderKeys.all, "history", id] as const,
};

export function useMyOrders(params?: OrdersControllerFindMineData["query"]) {
  return useQuery({
    queryKey: orderKeys.mine(params),
    queryFn: () =>
      mainService.request(ordersControllerFindMine)({ query: params }),
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

export function useOrderHistory(id: string) {
  return useQuery({
    queryKey: orderKeys.history(id),
    queryFn: () =>
      mainService.request(ordersControllerGetHistory)({ path: { id } }),
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateOrderDto) =>
      mainService.request(ordersControllerCreate)({ body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
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
      queryClient.invalidateQueries({ queryKey: orderKeys.all }),
  });
}
