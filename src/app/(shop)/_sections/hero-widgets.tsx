import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/commons/container";

/* ── Temporary placeholder images (Figma assets, 7-day URLs) ────── */
const IMG_XBOX =
  "https://www.figma.com/api/mcp/asset/06305d2c-4baf-4c7d-8cb6-8fb50d287055";
const IMG_PIXEL =
  "https://www.figma.com/api/mcp/asset/98bfe0b7-d931-42b9-b43d-1037c326c6fc";
const IMG_XIAOMI =
  "https://www.figma.com/api/mcp/asset/f51b6755-2546-499d-982a-57a07567a343";

/* ── Shared Button ───────────────────────────────────────────────── */

type ButtonSize = "lg" | "sm";

function ShopNowButton({
  href = "#",
  size = "sm",
}: {
  href?: string;
  size?: ButtonSize;
}) {
  const cls =
    size === "lg"
      ? "px-8 h-14 gap-3 text-body-md tracking-[0.192px]"
      : "px-6 h-12 gap-2 text-body-sm tracking-[0.168px]";

  return (
    <Link
      href={href}
      className={`inline-flex shrink-0 items-center rounded-sm bg-primary-500 font-bold text-white uppercase no-underline transition-colors hover:bg-primary-600 ${cls}`}
    >
      Shop Now
      <ArrowRight size={size === "lg" ? 22 : 18} strokeWidth={2} aria-hidden />
    </Link>
  );
}

/* ── Large hero widget (Xbox Consoles) ───────────────────────────── */

function HeroSlide() {
  return (
    <article className="relative h-64 min-w-0 flex-1 overflow-hidden rounded-md bg-gray-50 lg:h-[520px]">
      {/* Grid: left content | right image */}
      <div className="grid h-full grid-cols-2">
        {/* Left: text + CTA */}
        <div className="flex flex-col justify-center gap-4 py-8 pr-4 pl-8 lg:gap-6 lg:pl-14">
          {/* Caption */}
          <div className="flex items-center gap-2">
            <span
              className="block h-0.5 w-6 shrink-0 bg-secondary-600"
              aria-hidden
            />
            <span className="text-body-sm font-semibold whitespace-nowrap text-secondary-600 uppercase">
              The best place to play
            </span>
          </div>

          {/* Heading + body */}
          <div className="flex flex-col gap-3 lg:gap-4">
            <h2 className="text-[clamp(28px,4vw,48px)] leading-tight font-semibold text-gray-900">
              Xbox Consoles
            </h2>
            <p className="hidden max-w-[356px] text-body-sm text-gray-700 lg:block lg:text-body-lg">
              Save up to 50% on select Xbox games. Get 3 months of PC Game Pass
              for $2 USD.
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
            className="absolute inset-0 h-full w-full object-contain p-6 lg:p-8"
          />
        </div>
      </div>

      {/* Price badge */}
      <div
        className="absolute top-10 right-10 flex h-[72px] w-[72px] items-center justify-center rounded-full border-4 border-white bg-secondary-500 lg:h-[88px] lg:w-[88px]"
        aria-label="Price: $299"
      >
        <span className="text-[18px] leading-none font-semibold text-white lg:text-[22px]">
          $299
        </span>
      </div>

      {/* Slide indicators */}
      <div
        className="absolute bottom-10 left-8 flex items-center gap-2 lg:left-14"
        role="tablist"
        aria-label="Slides"
      >
        <button
          role="tab"
          aria-selected="true"
          aria-label="Slide 1"
          className="h-2.5 w-2.5 rounded-full bg-primary-500"
        />
        <button
          role="tab"
          aria-selected="false"
          aria-label="Slide 2"
          className="h-2.5 w-2.5 rounded-full bg-gray-300"
        />
        <button
          role="tab"
          aria-selected="false"
          aria-label="Slide 3"
          className="h-2.5 w-2.5 rounded-full bg-gray-300"
        />
      </div>
    </article>
  );
}

/* ── Dark mini widget (Google Pixel 6 Pro) ───────────────────────── */

function DarkWidget() {
  return (
    <article className="relative h-[248px] overflow-hidden rounded-md bg-gray-900">
      {/* Product image — bleeds from right side */}
      <div className="absolute inset-y-0 right-0 w-[60%]" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG_PIXEL}
          alt=""
          className="h-full w-full object-cover object-left-top"
        />
      </div>

      {/* Discount badge */}
      <div className="absolute top-6 right-6 z-10 rounded-sm bg-warning-400 px-4 py-2 text-body-md font-semibold text-gray-900">
        29% OFF
      </div>

      {/* Content */}
      <div className="absolute top-[46px] left-10 z-10 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-body-sm font-medium text-warning-500 uppercase">
            Summer Sales
          </span>
          <h3 className="w-40 text-heading-3 leading-tight font-semibold text-white">
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
    <article className="flex items-center gap-5 overflow-hidden rounded-md bg-gray-50 py-10 pr-10 pl-8">
      {/* Product image */}
      <div className="h-40 w-40 shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG_XIAOMI}
          alt="Xiaomi FlipBuds Pro"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <h3 className="w-[172px] text-heading-3 leading-tight font-semibold text-gray-900">
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
    <section aria-label="Featured products">
      <Container className="py-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          <HeroSlide />
          <div className="flex shrink-0 flex-col gap-6 lg:w-[424px]">
            <DarkWidget />
            <LightWidget />
          </div>
        </div>
      </Container>
    </section>
  );
}
