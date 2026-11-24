"use client";

import { ArrowRight } from "lucide-react";
import { Container } from "@/components/commons/container";

/* Partner logos (Figma assets, expire 7 days) */
const IMG_GOOGLE =
  "https://www.figma.com/api/mcp/asset/32ec5a48-ca7d-48be-b93f-b0748ccfc5d9";
const IMG_AMAZON =
  "https://www.figma.com/api/mcp/asset/6da48f9d-a9cd-4b12-8ddc-b5e76af099fd";
const IMG_PHILIPS =
  "https://www.figma.com/api/mcp/asset/ee185225-9607-4f79-9d3c-aa46c52dd0a9";
const IMG_TOSHIBA =
  "https://www.figma.com/api/mcp/asset/55d8b357-37e7-4d59-a2a3-639212a264d5";
const IMG_SAMSUNG =
  "https://www.figma.com/api/mcp/asset/d7a17fd5-c5db-4440-9fe3-226d1c5594de";

const LOGOS = [
  { src: IMG_GOOGLE, alt: "Google" },
  { src: IMG_AMAZON, alt: "Amazon" },
  { src: IMG_PHILIPS, alt: "Philips" },
  { src: IMG_TOSHIBA, alt: "Toshiba" },
  { src: IMG_SAMSUNG, alt: "Samsung" },
];

export function NewsletterSection() {
  return (
    <section className="bg-secondary-700 py-18">
      <Container className="flex flex-col items-center gap-8">
        {/* Heading */}
        <div className="flex flex-col items-center gap-3 text-center text-white">
          <h2 className="text-heading-1 font-semibold">
            Subscribe to our newsletter
          </h2>
          <p className="max-w-[536px] text-body-md opacity-70">
            Praesent fringilla erat a lacinia egestas. Donec vehicula tempor
            libero et cursus. Donec non quam urna. Quisque vitae porta ipsum.
          </p>
        </div>

        {/* Email form */}
        <div className="flex items-center gap-4 rounded-sm bg-white p-3 shadow-[0_12px_12px_rgba(0,0,0,0.12)]">
          <input
            type="email"
            placeholder="Email address"
            aria-label="Email address"
            className="h-12 w-[424px] border-0 bg-transparent px-4 text-body-md text-gray-900 outline-none placeholder:text-gray-500"
          />
          <button
            type="button"
            className="flex h-12 shrink-0 items-center gap-2 rounded-sm bg-primary-500 px-6 text-body-sm font-bold tracking-[0.168px] text-white uppercase transition-colors hover:bg-primary-600"
          >
            Subscribe <ArrowRight size={18} strokeWidth={2} aria-hidden />
          </button>
        </div>

        {/* Partner logos */}
        <div className="flex flex-col items-center gap-0">
          <div className="h-px w-[424px] bg-white/20" aria-hidden />
          <div className="flex items-center gap-12 pt-0 opacity-60">
            {LOGOS.map(({ src, alt }) => (
              <div
                key={alt}
                className="flex h-18 w-18 items-center justify-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={alt}
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
