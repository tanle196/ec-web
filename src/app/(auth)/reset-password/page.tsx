"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const inputCls =
    "w-full bg-white border border-[#e4e7e9] rounded-[2px] h-11 px-3.5 pr-11 text-[14px] leading-5 text-[#191c1f] placeholder:text-[#77878f] outline-none focus:border-[#191c1f] transition-colors";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#f2f4f5] h-18 flex items-center">
        <div className="max-w-7xl mx-auto px-16 w-full">
          <nav className="flex items-center gap-2 text-[14px] leading-5">
            <Link href="/" className="text-[#5f6c72] hover:text-[#191c1f] transition-colors no-underline flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Home
            </Link>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#5f6c72]">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span className="text-[#5f6c72]">User Account</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#5f6c72]">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <Link href="/login" className="text-[#5f6c72] hover:text-[#191c1f] transition-colors no-underline">
              Sign In
            </Link>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#5f6c72]">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <Link href="/forgot-password" className="text-[#5f6c72] hover:text-[#191c1f] transition-colors no-underline">
              Forget Password
            </Link>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#5f6c72]">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span className="font-medium text-[#2da5f3]">Reset Password</span>
          </nav>
        </div>
      </div>

      {/* Form card */}
      <div className="flex justify-center py-25">
        <div className="bg-white border border-[#e4e7e9] rounded-[4px] shadow-[0px_8px_20px_0px_rgba(0,0,0,0.12)] w-[424px] p-8 flex flex-col gap-6">
          {/* Heading */}
          <div className="flex flex-col gap-3">
            <h1 className="text-[20px] font-semibold leading-7 text-[#191c1f] m-0">
              Reset Password
            </h1>
            <p className="text-[14px] leading-5 text-[#5f6c72] m-0">
              Enter a new password for your account. Make sure it&apos;s at least 8 characters.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Password */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-[14px] leading-5 text-[#191c1f]">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  placeholder="8+ characters"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputCls}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#77878f] hover:text-[#191c1f] transition-colors border-0 bg-transparent cursor-pointer p-0"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-2">
              <label htmlFor="confirm-password" className="text-[14px] leading-5 text-[#191c1f]">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showConfirm ? "text" : "password"}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={inputCls}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#77878f] hover:text-[#191c1f] transition-colors border-0 bg-transparent cursor-pointer p-0"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
            </div>

            {error && (
              <p className="text-[13px] text-[#fa4232] m-0">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-12 rounded-xs bg-[#fa8232] text-white text-[14px] font-bold tracking-[0.012em] uppercase border-0 cursor-pointer hover:opacity-90 transition-opacity duration-150 flex items-center justify-center gap-2 mt-2"
            >
              Reset Password
              <ArrowRightIcon />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
