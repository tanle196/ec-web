import { useMutation, useQuery } from "@tanstack/react-query";
import {
  authControllerActive,
  authControllerLogin,
  authControllerRegister,
  authControllerForgotPassword,
  usersControllerGetProfile,
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
import { queryClient } from "@/lib/query/client";

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
