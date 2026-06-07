"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";

export function PromoBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="bg-gray-900 h-20 flex items-center">
      <div className="max-w-[1320px] mx-auto px-4 lg:px-8 w-full flex items-center justify-between gap-4">

        {/* "Black Friday" */}
        <div className="flex items-center gap-3 flex-none">
          <span className="bg-warning-300 text-gray-900 font-semibold text-body-xl px-2 py-0.5 -rotate-3 inline-block leading-snug">
            Black
          </span>
          <span className="text-white font-semibold text-heading-3 hidden sm:block">
            Friday
          </span>
        </div>

        {/* Discount */}
        <div className="flex items-center gap-2 flex-1 justify-center">
          <span className="text-white text-body-sm hidden sm:inline">Up to</span>
          <span className="text-warning-500 font-semibold text-display-4 leading-none">
            59%
          </span>
          <span className="text-white font-semibold text-body-xl">OFF</span>
        </div>

        {/* CTA + close */}
        <div className="flex items-center gap-3 flex-none">
          <Link
            href="/sale"
            className="bg-warning-500 text-gray-900 font-bold text-body-sm uppercase tracking-[0.168px] px-5 sm:px-6 h-12 flex items-center gap-2 rounded-sm no-underline hover:bg-warning-400 transition-colors"
          >
            <span className="hidden sm:inline">Shop now</span>
            <ArrowRight size={18} />
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="bg-gray-800 p-2 rounded-sm hover:bg-gray-700 transition-colors"
            aria-label="Close promotion"
          >
            <X size={16} className="text-white" />
          </button>
        </div>

      </div>
    </div>
  );
}
