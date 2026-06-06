"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { useGetProfile } from "@/queries/auth";

export function AuthInitializer() {
  const setUser = useAuthStore((s) => s.setUser);
  const { data: profile } = useGetProfile();

  useEffect(() => {
    if (profile) setUser(profile);
  }, [profile, setUser]);

  return null;
}
