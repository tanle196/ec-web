import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  paymentsControllerFindMine,
  paymentsControllerCreate,
} from "@/api/main";
import type {
  PaymentsControllerFindMineData,
  CreatePaymentDto,
} from "@/api/main";
import { mainService } from "@/lib/api/client";
import { orderKeys } from "./orders";

export const paymentKeys = {
  all: ["payments"] as const,
  list: (params?: PaymentsControllerFindMineData["query"]) =>
    [...paymentKeys.all, "list", params] as const,
};

export function useMyPayments(params?: PaymentsControllerFindMineData["query"]) {
  return useQuery({
    queryKey: paymentKeys.list(params),
    queryFn: () =>
      mainService.request(paymentsControllerFindMine)({ query: params }),
  });
}

export function useOrderPayments(orderId: string) {
  return useQuery({
    queryKey: paymentKeys.list({ order_id: orderId }),
    queryFn: () =>
      mainService.request(paymentsControllerFindMine)({
        query: { order_id: orderId },
      }),
    enabled: !!orderId,
  });
}

export function useCreatePayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreatePaymentDto) =>
      mainService.request(paymentsControllerCreate)({ body }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: paymentKeys.all });
      queryClient.invalidateQueries({
        queryKey: orderKeys.detail(variables.order_id),
      });
    },
  });
}
