import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/commons/badge";
import type { HeroConfig } from "../_data/categories";

export function CategoryHero({ hero }: { hero: HeroConfig }) {
  const isDual = hero.images.length >= 2;

  return (
    <section className="max-w-360 mx-auto px-16 pt-8">
      <div
        className="relative rounded-[24px] overflow-hidden bg-[#141210]"
        style={{ minHeight: 520 }}
      >
        {/* Warm radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 70% 50%, rgba(255,91,46,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative grid grid-cols-2 gap-12 items-center px-14 py-16 h-full">
          {/* Left: Text */}
          <div className="flex flex-col gap-0">
            <Badge kind="persimmon">{hero.badge}</Badge>
            <h1
              className="text-[clamp(48px,4.5vw,72px)] font-bold leading-[0.96] tracking-[-0.035em] text-[#F6F1E8] mt-5 mb-4"
            >
              {hero.headlineLine1}
              <br />
              <span style={{ color: "#FF5B2E" }}>{hero.headlineLine2}</span>
            </h1>
            <p
              className="text-[18px] leading-relaxed text-[#C9C2B5] max-w-110 mb-7"
            >
              {hero.subtitle}
            </p>
            <div className="flex gap-3">
              <Link
                href={hero.primaryCta.href}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-[8px] bg-persimmon text-white font-semibold text-[16px] leading-none no-underline hover:bg-persimmon-hover transition-colors duration-150"
              >
                {hero.primaryCta.label}
              </Link>
              {hero.secondaryCta && (
                <Link
                  href={hero.secondaryCta.href}
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-[8px] font-semibold text-[16px] leading-none no-underline transition-colors duration-150"
                  style={{
                    background: "transparent",
                    color: "#F6F1E8",
                    border: "1px solid rgba(246,241,232,0.3)",
                  }}
                >
                  {hero.secondaryCta.label}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              )}
            </div>

            {/* Trust pills */}
            <div
              className="flex items-center gap-6 mt-8 pt-8"
              style={{
                borderTop: "1px solid rgba(246,241,232,0.1)",
              }}
            >
              {hero.trustPills.map(({ label, color }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 text-[13px] text-[#8A857E]"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-none"
                    style={{ background: color }}
                  />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Product image(s) */}
          <div
            className="relative flex items-center justify-center"
            style={{ height: 420 }}
          >
            {isDual ? (
              <>
                <div
                  className="absolute rounded-[20px] overflow-hidden"
                  style={{
                    width: 200,
                    height: 380,
                    background: "#1F1B18",
                    border: "1px solid rgba(246,241,232,0.1)",
                    right: 60,
                    top: 20,
                    boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <Image
                      src={hero.images[0]}
                      alt={hero.imgAlt}
                      width={160}
                      height={320}
                      className="object-contain"
                    />
                  </div>
                </div>
                <div
                  className="absolute rounded-[20px] overflow-hidden"
                  style={{
                    width: 180,
                    height: 340,
                    background: "#2C2823",
                    border: "1px solid rgba(246,241,232,0.08)",
                    right: 20,
                    top: 60,
                    boxShadow: "0 16px 48px rgba(0,0,0,0.3)",
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center p-4">
                    <Image
                      src={hero.images[1]}
                      alt=""
                      width={140}
                      height={280}
                      className="object-contain opacity-80"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <Image
                  src={hero.images[0]}
                  alt={hero.imgAlt}
                  width={340}
                  height={340}
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
