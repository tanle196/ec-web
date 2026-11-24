"use client";

import { useState } from "react";
import Link from "next/link";
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

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="flex h-18 items-center bg-[#f2f4f5]">
        <Container>
          <PageBreadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Forget Password" }]}
          />
        </Container>
      </div>

      {/* Form card */}
      <div className="flex justify-center py-25">
        <div className="flex w-[424px] flex-col gap-6 rounded-[4px] border border-[#e4e7e9] bg-white p-8 shadow-[0px_8px_20px_0px_rgba(0,0,0,0.12)]">
          {/* Heading */}
          <div className="flex flex-col gap-3">
            <h1 className="m-0 text-[20px] leading-7 font-semibold text-[#191c1f]">
              Forget Password
            </h1>
            <p className="m-0 text-[14px] leading-5 text-[#5f6c72]">
              Enter the email address or mobile phone number associated with
              your Clicon account.
            </p>
          </div>

          {submitted ? (
            <div className="flex flex-col gap-4">
              <p className="text-[14px] leading-5 text-[#191c1f]">
                If an account exists for <strong>{email}</strong>, we&apos;ve
                sent a reset code to that address.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="w-fit cursor-pointer border-0 bg-transparent p-0 text-left text-[14px] font-medium text-[#2da5f3] hover:underline"
              >
                Try a different email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Email field */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-[14px] leading-5 text-[#191c1f]"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 w-full rounded-[2px] border border-[#e4e7e9] bg-white px-3.5 text-[14px] leading-5 text-[#191c1f] transition-colors outline-none placeholder:text-[#77878f] focus:border-[#191c1f]"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xs border-0 bg-[#fa8232] text-[14px] font-bold tracking-[0.012em] text-white uppercase transition-opacity duration-150 hover:opacity-90"
              >
                Send Code
                <ArrowRightIcon />
              </button>
            </form>
          )}

          {/* Links */}
          <div className="flex flex-col gap-2 text-[14px] leading-5">
            <p className="m-0">
              <span className="text-[#5f6c72]">Already have account? </span>
              <Link
                href="/login"
                className="font-medium text-[#2da5f3] no-underline hover:underline"
              >
                Sign In
              </Link>
            </p>
            <p className="m-0">
              <span className="text-[#5f6c72]">Don&apos;t have account? </span>
              <Link
                href="/register"
                className="font-medium text-[#2da5f3] no-underline hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-[#e4e7e9]" />

          {/* Customer service note */}
          <p className="m-0 text-[14px] leading-5 text-[#475156]">
            You may contact{" "}
            <Link
              href="/contact"
              className="font-medium text-[#fa8232] no-underline hover:underline"
            >
              Customer Service
            </Link>{" "}
            for help restoring access to your account.
          </p>
        </div>
      </div>
    </div>
  );
}
