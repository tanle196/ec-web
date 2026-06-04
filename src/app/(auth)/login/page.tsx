"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLogin } from "@/queries/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const login = useLogin();

  const inputCls =
    "w-full bg-cream border border-marlo-border rounded-[8px] px-3.5 py-3 text-[14px] text-foreground outline-none focus:border-foreground transition-colors placeholder:text-text-disabled";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login.mutate(
      { email, password },
      { onSuccess: () => router.push("/") },
    );
  }

  return (
    <div className="flex min-h-full items-center justify-center py-16 px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-[clamp(28px,3vw,36px)] font-semibold tracking-[-0.02em] text-foreground mb-2">
          Đăng nhập
        </h1>
        <p className="text-[14px] text-text-secondary mb-8">
          Chưa có tài khoản?{" "}
          <Link href="/register" className="text-foreground font-semibold underline underline-offset-3">
            Đăng ký
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-text-secondary">Email</label>
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputCls}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-text-secondary">Mật khẩu</label>
            <input
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputCls}
            />
          </div>

          {login.isError && (
            <p className="text-[13px] text-persimmon">
              Email hoặc mật khẩu không đúng. Vui lòng thử lại.
            </p>
          )}

          <button
            type="submit"
            disabled={login.isPending}
            className="w-full h-12 rounded-[8px] bg-persimmon text-white font-semibold text-[15px] border-0 cursor-pointer hover:bg-persimmon-hover transition-colors duration-150 mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {login.isPending ? (
              <>
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Đang đăng nhập...
              </>
            ) : (
              "Đăng nhập"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
