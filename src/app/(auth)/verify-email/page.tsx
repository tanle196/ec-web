"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useVerifyEmail } from "@/queries/auth";

function ArrowRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const router = useRouter();
  const verify = useVerifyEmail();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    verify.mutate(
      { token },
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
            <Link href="/register" className="text-[#5f6c72] hover:text-[#191c1f] transition-colors no-underline">
              Sign Up
            </Link>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#5f6c72]">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span className="font-medium text-[#2da5f3]">Email Verification</span>
          </nav>
        </div>
      </div>

      {/* Form card */}
      <div className="flex justify-center py-25">
        <div className="bg-white border border-[#e4e7e9] rounded-[4px] shadow-[0px_8px_20px_0px_rgba(0,0,0,0.12)] w-[424px] p-8 flex flex-col gap-6">
          {/* Heading */}
          <div className="flex flex-col gap-3">
            <h1 className="text-[20px] font-semibold leading-7 text-[#191c1f] m-0">
              Verify Your Email Address
            </h1>
            <p className="text-[14px] leading-5 text-[#5f6c72] m-0">
              We&apos;ve sent a verification code to your email address. Enter the code below to verify your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Code field */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="token" className="text-[14px] leading-5 text-[#191c1f]">
                  Verification Code
                </label>
                <button
                  type="button"
                  className="text-[14px] leading-5 font-medium text-[#2da5f3] bg-transparent border-0 p-0 cursor-pointer hover:underline"
                >
                  Resend Code
                </button>
              </div>
              <input
                id="token"
                type="text"
                required
                autoComplete="one-time-code"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full bg-white border border-[#e4e7e9] rounded-xs h-11 px-3.5 text-[14px] leading-5 text-[#191c1f] placeholder:text-[#77878f] outline-none focus:border-[#191c1f] transition-colors"
              />
            </div>

            {verify.isError && (
              <p className="text-[13px] text-[#fa4232] m-0">
                Invalid or expired verification code. Please try again.
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={verify.isPending}
              className="w-full h-12 rounded-xs bg-[#fa8232] text-white text-[14px] font-bold tracking-[0.012em] uppercase border-0 cursor-pointer hover:opacity-90 transition-opacity duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {verify.isPending ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Verifying...
                </>
              ) : (
                <>
                  Verify Me
                  <ArrowRightIcon />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
