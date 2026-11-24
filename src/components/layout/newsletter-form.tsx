"use client";

import { ArrowRight } from "lucide-react";

export function NewsletterForm() {
  return (
    <form className="flex w-full gap-0 lg:w-auto">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        name="email"
        placeholder="Enter your email address"
        className="flex-1 rounded-l-sm border-0 bg-white px-5 py-3.5 text-body-sm text-gray-900 outline-none placeholder:text-gray-400 lg:w-85"
      />
      <button
        type="submit"
        className="flex h-12 shrink-0 items-center gap-2 rounded-r-sm bg-primary-500 px-6 text-body-sm font-bold tracking-[0.168px] text-white uppercase transition-colors hover:bg-primary-600"
      >
        Subscribe
        <ArrowRight size={18} strokeWidth={2} aria-hidden />
      </button>
    </form>
  );
}
