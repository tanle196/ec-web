import Link from "next/link";
import { ArrowRight } from "lucide-react";

/* ── Temporary placeholder images (Figma assets, 7-day URLs) ────── */
const IMG_XBOX =
  "https://www.figma.com/api/mcp/asset/06305d2c-4baf-4c7d-8cb6-8fb50d287055";
const IMG_PIXEL =
  "https://www.figma.com/api/mcp/asset/98bfe0b7-d931-42b9-b43d-1037c326c6fc";
const IMG_XIAOMI =
  "https://www.figma.com/api/mcp/asset/f51b6755-2546-499d-982a-57a07567a343";

/* ── Shared Button ───────────────────────────────────────────────── */

type ButtonSize = "lg" | "sm";

function ShopNowButton({ href = "#", size = "sm" }: { href?: string; size?: ButtonSize }) {
  const cls =
    size === "lg"
      ? "px-8 h-14 gap-3 text-body-md tracking-[0.192px]"
      : "px-6 h-12 gap-2 text-body-sm tracking-[0.168px]";

  return (
    <Link
      href={href}
      className={`bg-primary-500 hover:bg-primary-600 transition-colors text-white font-bold uppercase rounded-sm inline-flex items-center no-underline shrink-0 ${cls}`}
    >
      Shop Now
      <ArrowRight size={size === "lg" ? 22 : 18} strokeWidth={2} aria-hidden />
    </Link>
  );
}

/* ── Large hero widget (Xbox Consoles) ───────────────────────────── */

function HeroSlide() {
  return (
    <article className="relative bg-gray-50 rounded-md overflow-hidden h-64 lg:h-[520px] flex-1 min-w-0">

      {/* Grid: left content | right image */}
      <div className="grid grid-cols-2 h-full">

        {/* Left: text + CTA */}
        <div className="flex flex-col justify-center gap-4 lg:gap-6 pl-8 lg:pl-14 py-8 pr-4">
          {/* Caption */}
          <div className="flex items-center gap-2">
            <span className="block w-6 h-0.5 bg-secondary-600 shrink-0" aria-hidden />
            <span className="text-secondary-600 text-body-sm font-semibold uppercase whitespace-nowrap">
              The best place to play
            </span>
          </div>

          {/* Heading + body */}
          <div className="flex flex-col gap-3 lg:gap-4">
            <h2 className="text-[clamp(28px,4vw,48px)] font-semibold text-gray-900 leading-tight">
              Xbox Consoles
            </h2>
            <p className="text-body-sm lg:text-body-lg text-gray-700 max-w-[356px] hidden lg:block">
              Save up to 50% on select Xbox games. Get 3 months of PC Game
              Pass for $2 USD.
            </p>
          </div>

          <ShopNowButton href="/products/xbox" size="lg" />
        </div>

        {/* Right: product image */}
        <div className="relative p-6 lg:p-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMG_XBOX}
            alt="Xbox Console"
            className="absolute inset-0 w-full h-full object-contain p-6 lg:p-8"
          />
        </div>
      </div>

      {/* Price badge */}
      <div
        className="absolute top-10 right-10 bg-secondary-500 border-4 border-white rounded-full w-[72px] h-[72px] lg:w-[88px] lg:h-[88px] flex items-center justify-center"
        aria-label="Price: $299"
      >
        <span className="text-white font-semibold text-[18px] lg:text-[22px] leading-none">
          $299
        </span>
      </div>

      {/* Slide indicators */}
      <div
        className="absolute bottom-10 left-8 lg:left-14 flex items-center gap-2"
        role="tablist"
        aria-label="Slides"
      >
        <button
          role="tab"
          aria-selected="true"
          aria-label="Slide 1"
          className="w-2.5 h-2.5 rounded-full bg-primary-500"
        />
        <button
          role="tab"
          aria-selected="false"
          aria-label="Slide 2"
          className="w-2.5 h-2.5 rounded-full bg-gray-300"
        />
        <button
          role="tab"
          aria-selected="false"
          aria-label="Slide 3"
          className="w-2.5 h-2.5 rounded-full bg-gray-300"
        />
      </div>
    </article>
  );
}

/* ── Dark mini widget (Google Pixel 6 Pro) ───────────────────────── */

function DarkWidget() {
  return (
    <article className="relative bg-gray-900 rounded-md overflow-hidden h-[248px]">

      {/* Product image — bleeds from right side */}
      <div
        className="absolute right-0 inset-y-0 w-[60%]"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG_PIXEL}
          alt=""
          className="h-full w-full object-cover object-left-top"
        />
      </div>

      {/* Discount badge */}
      <div className="absolute top-6 right-6 bg-warning-400 text-gray-900 font-semibold text-body-md px-4 py-2 rounded-sm z-10">
        29% OFF
      </div>

      {/* Content */}
      <div className="absolute left-10 top-[46px] flex flex-col gap-4 z-10">
        <div className="flex flex-col gap-1">
          <span className="text-warning-500 text-body-sm font-medium uppercase">
            Summer Sales
          </span>
          <h3 className="text-heading-3 font-semibold text-white leading-tight w-40">
            New Google Pixel 6 Pro
          </h3>
        </div>
        <ShopNowButton href="/products/pixel-6-pro" size="sm" />
      </div>
    </article>
  );
}

/* ── Light mini widget (Xiaomi FlipBuds Pro) ─────────────────────── */

function LightWidget() {
  return (
    <article className="bg-gray-50 rounded-md overflow-hidden flex items-center gap-5 pl-8 pr-10 py-10">

      {/* Product image */}
      <div className="shrink-0 w-40 h-40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG_XIAOMI}
          alt="Xiaomi FlipBuds Pro"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <h3 className="text-heading-3 font-semibold text-gray-900 leading-tight w-[172px]">
            Xiaomi FlipBuds Pro
          </h3>
          <p className="text-body-lg font-semibold text-secondary-500">
            $299 USD
          </p>
        </div>
        <ShopNowButton href="/products/xiaomi-flipbuds-pro" size="sm" />
      </div>
    </article>
  );
}

/* ── Section export ──────────────────────────────────────────────── */

export function HeroWidgets() {
  return (
    <section
      className="max-w-330 mx-auto px-4 lg:px-8 py-6"
      aria-label="Featured products"
    >
      <div className="flex flex-col lg:flex-row gap-6">
        <HeroSlide />
        <div className="flex flex-col gap-6 lg:w-[424px] shrink-0">
          <DarkWidget />
          <LightWidget />
        </div>
      </div>
    </section>
  );
}
