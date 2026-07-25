import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/commons/container";

/* ── Figma assets (expire 7 days) ─────────────────────────────────── */
const IMG_HOMEPOD = "https://www.figma.com/api/mcp/asset/50006c90-0394-4e06-bbad-c8560645b0c3";
const IMG_XIAOMI  = "https://www.figma.com/api/mcp/asset/1dc47794-87cb-49de-98cf-d940be26ce94";

export function PromoBanners() {
  return (
    <section className="bg-white py-4">
      <Container>
        <div className="flex gap-6">

          {/* Left — light banner (Apple Homepod Mini) */}
          <div className="flex-1 bg-gray-50 rounded-sm flex items-center justify-between gap-10 p-11 overflow-hidden">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <div className="bg-secondary-500 text-white font-semibold text-body-sm px-3 py-1.5 rounded-sm inline-block w-fit">
                  INTRODUCING
                </div>
                <h3 className="text-heading-1 font-semibold text-gray-900 leading-10">
                  New Apple<br />Homepod Mini
                </h3>
              </div>
              <p className="text-body-md text-gray-700 max-w-[280px]">
                Jam-packed with innovation, HomePod mini delivers unexpectedly.
              </p>
              <Link
                href="/products/homepod-mini"
                className="bg-primary-500 hover:bg-primary-600 transition-colors text-white font-bold text-body-sm uppercase tracking-[0.168px] px-6 h-12 flex items-center gap-2 rounded-sm no-underline w-fit"
              >
                Shop now <ArrowRight size={18} strokeWidth={2} aria-hidden />
              </Link>
            </div>
            <div className="shrink-0 w-60 h-60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG_HOMEPOD} alt="Apple Homepod Mini" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Right — dark banner (Xiaomi Mi 11 Ultra) */}
          <div className="flex-1 bg-gray-900 rounded-sm relative overflow-hidden p-11">
            {/* Text */}
            <div className="relative z-10 flex flex-col gap-5 max-w-[280px]">
              <div className="flex flex-col gap-2">
                <div className="bg-warning-300 text-gray-900 font-semibold text-body-sm px-3 py-1.5 rounded-sm inline-block w-fit">
                  INTRODUCING NEW
                </div>
                <h3 className="text-heading-1 font-semibold text-white leading-10">
                  Xiaomi Mi 11 Ultra<br />12GB+256GB
                </h3>
              </div>
              <p className="text-body-md text-gray-300">
                *Data provided by internal laboratories. Industry measurement.
              </p>
              <Link
                href="/products/xiaomi-mi-11-ultra"
                className="bg-primary-500 hover:bg-primary-600 transition-colors text-white font-bold text-body-sm uppercase tracking-[0.168px] px-6 h-12 flex items-center gap-2 rounded-sm no-underline w-fit"
              >
                Shop now <ArrowRight size={18} strokeWidth={2} aria-hidden />
              </Link>
            </div>
            {/* Price badge */}
            <div className="absolute top-6 right-24 bg-secondary-500 text-white font-semibold text-body-xl px-5 py-7 rounded-full flex items-center justify-center">
              $590
            </div>
            {/* Phone image */}
            <div className="absolute right-0 top-0 bottom-0 w-[312px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG_XIAOMI} alt="Xiaomi Mi 11 Ultra" className="absolute inset-0 w-full h-full object-contain object-right" />
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
