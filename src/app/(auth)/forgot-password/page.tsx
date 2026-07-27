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
      <div className="bg-[#f2f4f5] h-18 flex items-center">
        <Container>
          <PageBreadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Forget Password" }]}
          />
        </Container>
      </div>

      {/* Form card */}
      <div className="flex justify-center py-25">
        <div className="bg-white border border-[#e4e7e9] rounded-[4px] shadow-[0px_8px_20px_0px_rgba(0,0,0,0.12)] w-[424px] p-8 flex flex-col gap-6">
          {/* Heading */}
          <div className="flex flex-col gap-3">
            <h1 className="text-[20px] font-semibold leading-7 text-[#191c1f] m-0">
              Forget Password
            </h1>
            <p className="text-[14px] leading-5 text-[#5f6c72] m-0">
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
                className="text-[14px] font-medium text-[#2da5f3] bg-transparent border-0 p-0 cursor-pointer text-left w-fit hover:underline"
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
                  className="w-full bg-white border border-[#e4e7e9] rounded-[2px] h-11 px-3.5 text-[14px] leading-5 text-[#191c1f] placeholder:text-[#77878f] outline-none focus:border-[#191c1f] transition-colors"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full h-12 rounded-xs bg-[#fa8232] text-white text-[14px] font-bold tracking-[0.012em] uppercase border-0 cursor-pointer hover:opacity-90 transition-opacity duration-150 flex items-center justify-center gap-2"
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
          <div className="h-px bg-[#e4e7e9] w-full" />

          {/* Customer service note */}
          <p className="text-[14px] leading-5 text-[#475156] m-0">
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
