"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRegister } from "@/queries/auth";

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

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 814 1000" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.8 0 663.3 0 541.4 0 347.2 116.1 243.8 229.4 243.8c66.3 0 121.5 43.4 162.9 43.4 39.5 0 101.2-46 176.6-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
    </svg>
  );
}

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();
  const register = useRegister();

  const inputCls =
    "w-full bg-white border border-[#e4e7e9] rounded-[2px] h-11 px-3.5 text-[14px] leading-5 text-[#191c1f] placeholder:text-[#77878f] outline-none focus:border-[#191c1f] transition-colors";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password !== confirm) return;
    register.mutate(
      { email, password },
      { onSuccess: () => router.push("/login") },
    );
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
            <span className="font-medium text-[#2da5f3]">Sign Up</span>
          </nav>
        </div>
      </div>

      {/* Form card */}
      <div className="flex justify-center py-25">
        <div className="bg-white border border-[#e4e7e9] rounded-[4px] shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)] w-106 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-[#e4e7e9]">
            <Link
              href="/login"
              className="flex-1 py-4 text-center text-[20px] font-semibold leading-7 text-[#77878f] no-underline hover:text-[#191c1f] transition-colors border-r border-[#e4e7e9]"
            >
              Sign In
            </Link>
            <div className="flex-1 py-4 text-center text-[20px] font-semibold leading-7 text-[#191c1f] shadow-[inset_0px_-3px_0px_0px_#fa8232]">
              Sign Up
            </div>
          </div>

          {/* Form body */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-8 pt-8 pb-8">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-[14px] leading-5 text-[#191c1f]">Name</label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputCls}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[14px] leading-5 text-[#191c1f]">Email Address</label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputCls}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-[14px] leading-5 text-[#191c1f]">Password</label>
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
                  className={`${inputCls} pr-11`}
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
              <label htmlFor="confirm" className="text-[14px] leading-5 text-[#191c1f]">Confirm Password</label>
              <div className="relative">
                <input
                  id="confirm"
                  type={showConfirm ? "text" : "password"}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className={`${inputCls} pr-11`}
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
              {confirm && password !== confirm && (
                <p className="text-[13px] text-[#fa4232] m-0">Passwords do not match.</p>
              )}
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-2 cursor-pointer">
              <div className="relative shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-xs border flex items-center justify-center transition-colors ${agreed ? "bg-[#fa8232] border-[#fa8232]" : "bg-white border-[#e4e7e9]"}`}>
                  {agreed && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-[14px] leading-5 text-gray-700">
                Are you agree to Clicon{" "}
                <Link href="/terms" className="font-medium text-[#2da5f3] no-underline hover:underline">
                  Terms of Condition
                </Link>
                {" "}and{" "}
                <Link href="/privacy" className="font-medium text-[#2da5f3] no-underline hover:underline">
                  Privacy Policy.
                </Link>
              </span>
            </label>

            {register.isError && (
              <p className="text-[13px] text-[#fa4232] m-0">
                Registration failed. This email may already be in use.
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={register.isPending || !agreed || (!!confirm && password !== confirm)}
              className="w-full h-12 rounded-xs bg-[#fa8232] text-white text-[14px] font-bold tracking-[0.012em] uppercase border-0 cursor-pointer hover:opacity-90 transition-opacity duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {register.isPending ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Signing up...
                </>
              ) : (
                <>
                  Sign Up
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-[#e4e7e9]" />
              <span className="text-[14px] leading-5 text-[#77878f]">or</span>
              <div className="flex-1 h-px bg-[#e4e7e9]" />
            </div>

            {/* Social sign-up */}
            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="w-full h-11 rounded-xs border border-[#e4e7e9] bg-white text-[14px] text-gray-700 flex items-center justify-center gap-2 cursor-pointer hover:border-[#191c1f] transition-colors"
              >
                <GoogleIcon />
                Sign up with Google
              </button>
              <button
                type="button"
                className="w-full h-11 rounded-xs border border-[#e4e7e9] bg-white text-[14px] text-gray-700 flex items-center justify-center gap-2 cursor-pointer hover:border-[#191c1f] transition-colors"
              >
                <AppleIcon />
                Sign up with Apple
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
