"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import { Container } from "@/components/commons/container";

export function PromoBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="flex h-20 items-center bg-gray-900">
      <Container className="flex items-center justify-between gap-4">
        {/* "Black Friday" */}
        <div className="flex flex-none items-center gap-3">
          <span className="inline-block -rotate-3 bg-warning-300 px-2 py-0.5 text-body-xl leading-snug font-semibold text-gray-900">
            Black
          </span>
          <span className="hidden text-heading-3 font-semibold text-white sm:block">
            Friday
          </span>
        </div>

        {/* Discount */}
        <div className="flex flex-1 items-center justify-center gap-2">
          <span className="hidden text-body-sm text-white sm:inline">
            Up to
          </span>
          <span className="text-display-4 leading-none font-semibold text-warning-500">
            59%
          </span>
          <span className="text-body-xl font-semibold text-white">OFF</span>
        </div>

        {/* CTA + close */}
        <div className="flex flex-none items-center gap-3">
          <Link
            href="/sale"
            className="flex h-12 items-center gap-2 rounded-sm bg-warning-500 px-5 text-body-sm font-bold tracking-[0.168px] text-gray-900 uppercase no-underline transition-colors hover:bg-warning-400 sm:px-6"
          >
            <span className="hidden sm:inline">Shop now</span>
            <ArrowRight size={18} />
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="rounded-sm bg-gray-800 p-2 transition-colors hover:bg-gray-700"
            aria-label="Close promotion"
          >
            <X size={16} className="text-white" />
          </button>
        </div>
      </Container>
    </div>
  );
}
