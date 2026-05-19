"use client";

import Link from "next/link";
import { UserCircle2 } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";

export function LoginButton() {
  const { user, logout } = useAuthStore();

  if (user) {
    return (
      <div className="flex flex-col items-center gap-0.5 px-2 py-1 text-xs text-white">
        <UserCircle2 className="h-5 w-5" />
        <span className="hidden max-w-[80px] truncate lg:block">{user.name}</span>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="navbar__item flex flex-col items-center gap-0.5 px-2 py-1 text-xs text-white hover:text-white/80"
    >
      <UserCircle2 className="h-5 w-5" />
      <span className="hidden lg:block">Đăng nhập</span>
    </Link>
  );
}
