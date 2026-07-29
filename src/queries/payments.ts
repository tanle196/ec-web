import { useQuery } from "@tanstack/react-query";
import { paymentsControllerFindMine } from "@/api/main";
import type { PaymentsControllerFindMineData } from "@/api/main";
import { mainService } from "@/lib/api/client";

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
