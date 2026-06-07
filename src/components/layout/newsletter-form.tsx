"use client";

import { ArrowRight } from "lucide-react";

export function NewsletterForm() {
  return (
    <form className="flex w-full lg:w-auto gap-0">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        name="email"
        placeholder="Enter your email address"
        className="flex-1 lg:w-85 bg-white text-body-sm text-gray-900 placeholder:text-gray-400 px-5 py-3.5 outline-none rounded-l-sm border-0"
      />
      <button
        type="submit"
        className="bg-primary-500 hover:bg-primary-600 transition-colors text-white font-bold text-body-sm uppercase tracking-[0.168px] px-6 h-12 flex items-center gap-2 rounded-r-sm shrink-0"
      >
        Subscribe
        <ArrowRight size={18} strokeWidth={2} aria-hidden />
      </button>
    </form>
  );
}
