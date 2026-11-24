"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useVerifyEmail } from "@/queries/auth";
import { Container } from "@/components/commons/container";
import { PageBreadcrumb } from "@/components/commons/breadcrumb";

function ArrowRightIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
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
    verify.mutate({ token }, { onSuccess: () => router.push("/login") });
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="flex h-18 items-center bg-[#f2f4f5]">
        <Container>
          <PageBreadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Sign Up", href: "/register" },
              { label: "Email Verification" },
            ]}
          />
        </Container>
      </div>

      {/* Form card */}
      <div className="flex justify-center py-25">
        <div className="flex w-[424px] flex-col gap-6 rounded-[4px] border border-[#e4e7e9] bg-white p-8 shadow-[0px_8px_20px_0px_rgba(0,0,0,0.12)]">
          {/* Heading */}
          <div className="flex flex-col gap-3">
            <h1 className="m-0 text-[20px] leading-7 font-semibold text-[#191c1f]">
              Verify Your Email Address
            </h1>
            <p className="m-0 text-[14px] leading-5 text-[#5f6c72]">
              We&apos;ve sent a verification code to your email address. Enter
              the code below to verify your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Code field */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="token"
                  className="text-[14px] leading-5 text-[#191c1f]"
                >
                  Verification Code
                </label>
                <button
                  type="button"
                  className="cursor-pointer border-0 bg-transparent p-0 text-[14px] leading-5 font-medium text-[#2da5f3] hover:underline"
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
                className="h-11 w-full rounded-xs border border-[#e4e7e9] bg-white px-3.5 text-[14px] leading-5 text-[#191c1f] transition-colors outline-none placeholder:text-[#77878f] focus:border-[#191c1f]"
              />
            </div>

            {verify.isError && (
              <p className="m-0 text-[13px] text-[#fa4232]">
                Invalid or expired verification code. Please try again.
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={verify.isPending}
              className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xs border-0 bg-[#fa8232] text-[14px] font-bold tracking-[0.012em] text-white uppercase transition-opacity duration-150 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {verify.isPending ? (
                <>
                  <svg
                    className="animate-spin"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
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
