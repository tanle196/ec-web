import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addressesControllerFindAll,
  addressesControllerCreate,
  addressesControllerUpdate,
  addressesControllerRemove,
  addressesControllerSetDefault,
} from "@/api/main";
import type { CreateAddressDto, UpdateAddressDto } from "@/api/main";
import { mainService } from "@/lib/api/client";

export const addressKeys = {
  all: ["addresses"] as const,
};

export function useAddresses() {
  return useQuery({
    queryKey: addressKeys.all,
    queryFn: () => mainService.request(addressesControllerFindAll)({}),
  });
}

export function useCreateAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateAddressDto) =>
      mainService.request(addressesControllerCreate)({ body }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: addressKeys.all }),
  });
}

export function useUpdateAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateAddressDto }) =>
      mainService.request(addressesControllerUpdate)({ path: { id }, body }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: addressKeys.all }),
  });
}

export function useDeleteAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      mainService.request(addressesControllerRemove)({ path: { id } }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: addressKeys.all }),
  });
}

export function useSetDefaultAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      mainService.request(addressesControllerSetDefault)({ path: { id } }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: addressKeys.all }),
  });
}
