import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/commons/badge";

export function Hero() {
  return (
    <section className="max-w-360 mx-auto px-16 pt-8">
      <div
        className="rounded-[24px] border border-marlo-border grid grid-cols-2 gap-12 items-center px-14 py-16"
        style={{ background: "#F6F1E8" }}
      >
        {/* Text */}
        <div>
          <Badge kind="persimmon">Mới ra mắt · Tháng 5/2026</Badge>
          <h1
            className="text-[clamp(52px,5.5vw,80px)] font-bold leading-[0.97] tracking-[-0.03em] text-[#141210] mt-5 mb-4"
            style={{ fontFamily: "var(--font-bricolage), sans-serif" }}
          >
            Ngày mua sắm.
            <br />
            <span style={{ color: "#FF5B2E" }}>Tiết kiệm đến 8 triệu.</span>
          </h1>
          <p
            className="text-[18px] leading-relaxed text-text-secondary max-w-110 mb-7"
            style={{ fontFamily: "var(--font-hanken), sans-serif" }}
          >
            Đổi máy cũ, nhận credit ngay — mua điện thoại mới với giá tốt nhất
            thị trường. Giao miễn phí, đổi trả miễn phí.
          </p>
          <div className="flex gap-3">
            <Link
              href="/phones"
              className="inline-flex items-center px-7 py-4 rounded-[8px] bg-persimmon text-white font-semibold text-[16px] leading-none no-underline hover:bg-persimmon-hover transition-colors duration-150"
              style={{ fontFamily: "var(--font-hanken), sans-serif" }}
            >
              Mua điện thoại
            </Link>
            <Link
              href="/trade-in"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-[8px] border border-marlo-border-strong font-semibold text-[16px] leading-none no-underline text-[#141210] hover:bg-cream-2 transition-colors duration-150"
              style={{ fontFamily: "var(--font-hanken), sans-serif" }}
            >
              Ước tính thu đổi
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
          </div>
        </div>

        {/* Image */}
        <div
          className="flex items-center justify-center"
          style={{ height: 400 }}
        >
          <Image
            src="/hero-products.svg"
            alt="Sản phẩm nổi bật"
            width={520}
            height={400}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
