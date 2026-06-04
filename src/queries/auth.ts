import { useMutation } from "@tanstack/react-query";
import { authControllerLogin, authControllerRegister } from "@/api/main";
import type { LoginDto, RegisterDto } from "@/api/main";
import { mainService } from "@/lib/api/client";
import { setCookie } from "@/lib/cookies";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/cookies";
import { useAuthStore } from "@/stores/auth-store";

export function useLogin() {
  const setUser = useAuthStore((s) => s.setUser);
  return useMutation({
    mutationFn: (body: LoginDto) =>
      mainService.request(authControllerLogin)({ body }),
    onSuccess: (data) => {
      setCookie(ACCESS_TOKEN, data.accessToken);
      setCookie(REFRESH_TOKEN, data.refreshToken);
      // Decode a minimal user object from the token payload
      try {
        const payload = JSON.parse(atob(data.accessToken.split(".")[1]));
        setUser({
          id: payload.sub ?? "",
          email: payload.email ?? "",
          name: payload.name ?? payload.email ?? "",
        });
      } catch {
        // token not decodable — user stays null
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
