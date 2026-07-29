import { useMutation, useQuery } from "@tanstack/react-query";
import {
  authControllerActive,
  authControllerLogin,
  authControllerRegister,
  authControllerForgotPassword,
  usersControllerGetProfile,
  cartsControllerAddItem,
} from "@/api/main";
import type {
  ActiveDto,
  LoginDto,
  RegisterDto,
  ForgotPasswordDto,
} from "@/api/main";
import { mainService } from "@/lib/api/client";
import { setCookie, getCookie } from "@/lib/cookies";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/cookies";
import { useAuthStore } from "@/stores/auth-store";
import { useGuestCartStore } from "@/stores/guest-cart-store";
import { queryClient } from "@/lib/query/client";
import { cartKeys } from "@/queries/cart";

export const PROFILE_QUERY_KEY = ["profile"] as const;

export function useGetProfile() {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: () => mainService.request(usersControllerGetProfile)(),
    enabled: !!getCookie(ACCESS_TOKEN),
    staleTime: Infinity,
  });
}

export function useLogin() {
  const setUser = useAuthStore((s) => s.setUser);
  return useMutation({
    mutationFn: (body: LoginDto) =>
      mainService.request(authControllerLogin)({ body }),
    onSuccess: async (data) => {
      setCookie(ACCESS_TOKEN, data.accessToken);
      setCookie(REFRESH_TOKEN, data.refreshToken);
      const profile = await queryClient.fetchQuery({
        queryKey: PROFILE_QUERY_KEY,
        queryFn: () => mainService.request(usersControllerGetProfile)(),
      });
      setUser(profile);

      const guestItems = useGuestCartStore.getState().items;
      if (guestItems.length > 0) {
        for (const item of guestItems) {
          await mainService.request(cartsControllerAddItem)({
            body: { variant_id: item.variantId, quantity: item.quantity },
          });
        }
        useGuestCartStore.getState().clearCart();
        queryClient.invalidateQueries({ queryKey: cartKeys.all });
      }
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (body: RegisterDto) =>
      mainService.request(authControllerRegister)({ body }),
  });
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: (body: ActiveDto) =>
      mainService.request(authControllerActive)({ body }),
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (body: ForgotPasswordDto) =>
      mainService.request(authControllerForgotPassword)({ body }),
  });
}
