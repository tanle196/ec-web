import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/commons/container";

/* ── Figma assets (expire 7 days) ─────────────────────────────────── */
const IMG_HOMEPOD =
  "https://www.figma.com/api/mcp/asset/50006c90-0394-4e06-bbad-c8560645b0c3";
const IMG_XIAOMI =
  "https://www.figma.com/api/mcp/asset/1dc47794-87cb-49de-98cf-d940be26ce94";

export function PromoBanners() {
  return (
    <section className="bg-white py-4">
      <Container>
        <div className="flex gap-6">
          {/* Left — light banner (Apple Homepod Mini) */}
          <div className="flex flex-1 items-center justify-between gap-10 overflow-hidden rounded-sm bg-gray-50 p-11">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <div className="inline-block w-fit rounded-sm bg-secondary-500 px-3 py-1.5 text-body-sm font-semibold text-white">
                  INTRODUCING
                </div>
                <h3 className="text-heading-1 leading-10 font-semibold text-gray-900">
                  New Apple
                  <br />
                  Homepod Mini
                </h3>
              </div>
              <p className="max-w-[280px] text-body-md text-gray-700">
                Jam-packed with innovation, HomePod mini delivers unexpectedly.
              </p>
              <Link
                href="/products/homepod-mini"
                className="flex h-12 w-fit items-center gap-2 rounded-sm bg-primary-500 px-6 text-body-sm font-bold tracking-[0.168px] text-white uppercase no-underline transition-colors hover:bg-primary-600"
              >
                Shop now <ArrowRight size={18} strokeWidth={2} aria-hidden />
              </Link>
            </div>
            <div className="h-60 w-60 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMG_HOMEPOD}
                alt="Apple Homepod Mini"
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          {/* Right — dark banner (Xiaomi Mi 11 Ultra) */}
          <div className="relative flex-1 overflow-hidden rounded-sm bg-gray-900 p-11">
            {/* Text */}
            <div className="relative z-10 flex max-w-[280px] flex-col gap-5">
              <div className="flex flex-col gap-2">
                <div className="inline-block w-fit rounded-sm bg-warning-300 px-3 py-1.5 text-body-sm font-semibold text-gray-900">
                  INTRODUCING NEW
                </div>
                <h3 className="text-heading-1 leading-10 font-semibold text-white">
                  Xiaomi Mi 11 Ultra
                  <br />
                  12GB+256GB
                </h3>
              </div>
              <p className="text-body-md text-gray-300">
                *Data provided by internal laboratories. Industry measurement.
              </p>
              <Link
                href="/products/xiaomi-mi-11-ultra"
                className="flex h-12 w-fit items-center gap-2 rounded-sm bg-primary-500 px-6 text-body-sm font-bold tracking-[0.168px] text-white uppercase no-underline transition-colors hover:bg-primary-600"
              >
                Shop now <ArrowRight size={18} strokeWidth={2} aria-hidden />
              </Link>
            </div>
            {/* Price badge */}
            <div className="absolute top-6 right-24 flex items-center justify-center rounded-full bg-secondary-500 px-5 py-7 text-body-xl font-semibold text-white">
              $590
            </div>
            {/* Phone image */}
            <div className="absolute top-0 right-0 bottom-0 w-[312px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMG_XIAOMI}
                alt="Xiaomi Mi 11 Ultra"
                className="absolute inset-0 h-full w-full object-contain object-right"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
