import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  refundRequestsControllerCreate,
  refundRequestsControllerFindMine,
  refundRequestsControllerFindMineOne,
} from "@/api/main";
import type {
  CreateRefundRequestDto,
  RefundRequestsControllerFindMineData,
} from "@/api/main";
import { mainService } from "@/lib/api/client";
import { paymentKeys } from "./payments";

export const refundRequestKeys = {
  all: ["refund-requests"] as const,
  list: (params?: RefundRequestsControllerFindMineData["query"]) =>
    [...refundRequestKeys.all, "list", params] as const,
  detail: (id: string) => [...refundRequestKeys.all, "detail", id] as const,
};

export function useMyRefundRequests(
  params?: RefundRequestsControllerFindMineData["query"],
) {
  return useQuery({
    queryKey: refundRequestKeys.list(params),
    queryFn: () =>
      mainService.request(refundRequestsControllerFindMine)({
        query: params,
      }),
  });
}

export function useOrderRefundRequests(orderId: string) {
  return useQuery({
    queryKey: refundRequestKeys.list({ order_id: orderId }),
    queryFn: () =>
      mainService.request(refundRequestsControllerFindMine)({
        query: { order_id: orderId },
      }),
    enabled: !!orderId,
  });
}

export function useRefundRequest(id: string) {
  return useQuery({
    queryKey: refundRequestKeys.detail(id),
    queryFn: () =>
      mainService.request(refundRequestsControllerFindMineOne)({
        path: { id },
      }),
    enabled: !!id,
  });
}

export function useCreateRefundRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateRefundRequestDto) =>
      mainService.request(refundRequestsControllerCreate)({ body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: refundRequestKeys.all });
      queryClient.invalidateQueries({ queryKey: paymentKeys.all });
    },
  });
}
