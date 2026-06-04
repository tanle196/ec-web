"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRegister } from "@/queries/auth";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [done, setDone] = useState(false);
  const router = useRouter();
  const register = useRegister();

  const inputCls =
    "w-full bg-cream border border-marlo-border rounded-[8px] px-3.5 py-3 text-[14px] text-foreground outline-none focus:border-foreground transition-colors placeholder:text-text-disabled";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) return;
    register.mutate(
      { email, password },
      {
        onSuccess: () => {
          setDone(true);
          setTimeout(() => router.push("/login"), 2000);
        },
      },
    );
  }

  if (done) {
    return (
      <div className="flex min-h-full items-center justify-center py-16 px-4">
        <div className="text-center max-w-sm">
          <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-[22px] font-semibold text-foreground mb-2">Đăng ký thành công!</h2>
          <p className="text-[14px] text-text-secondary">Đang chuyển đến trang đăng nhập…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-full items-center justify-center py-16 px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-[clamp(28px,3vw,36px)] font-semibold tracking-[-0.02em] text-foreground mb-2">
          Đăng ký
        </h1>
        <p className="text-[14px] text-text-secondary mb-8">
          Đã có tài khoản?{" "}
          <Link href="/login" className="text-foreground font-semibold underline underline-offset-3">
            Đăng nhập
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
              autoComplete="new-password"
              placeholder="Tối thiểu 8 ký tự"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputCls}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-text-secondary">Xác nhận mật khẩu</label>
            <input
              type="password"
              required
              autoComplete="new-password"
              placeholder="Nhập lại mật khẩu"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className={inputCls}
            />
            {confirm && password !== confirm && (
              <p className="text-[12px] text-persimmon">Mật khẩu không khớp.</p>
            )}
          </div>

          {register.isError && (
            <p className="text-[13px] text-persimmon">
              Đăng ký thất bại. Email có thể đã được sử dụng.
            </p>
          )}

          <button
            type="submit"
            disabled={register.isPending || (!!confirm && password !== confirm)}
            className="w-full h-12 rounded-[8px] bg-persimmon text-white font-semibold text-[15px] border-0 cursor-pointer hover:bg-persimmon-hover transition-colors duration-150 mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {register.isPending ? (
              <>
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Đang đăng ký...
              </>
            ) : (
              "Tạo tài khoản"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
