import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/commons/badge";
import { Container } from "@/components/commons/container";

export function Hero() {
  return (
    <Container size="wide" className="pt-8">
      <div
        className="border-marlo-border grid grid-cols-2 items-center gap-12 rounded-[24px] border px-14 py-16"
        style={{ background: "var(--muted)" }}
      >
        {/* Text */}
        <div>
          <Badge kind="persimmon">Mới ra mắt · Tháng 5/2026</Badge>
          <h1 className="mt-5 mb-4 text-[clamp(52px,5.5vw,80px)] leading-[0.97] font-bold tracking-[-0.03em] text-foreground">
            Ngày mua sắm.
            <br />
            <span style={{ color: "var(--color-cta)" }}>
              Tiết kiệm đến 8 triệu.
            </span>
          </h1>
          <p className="mb-7 max-w-110 text-[18px] leading-relaxed text-text-secondary">
            Đổi máy cũ, nhận credit ngay — mua điện thoại mới với giá tốt nhất
            thị trường. Giao miễn phí, đổi trả miễn phí.
          </p>
          <div className="flex gap-3">
            <Link
              href="/phones"
              className="bg-persimmon hover:bg-persimmon-hover inline-flex items-center rounded-[8px] px-7 py-4 text-[16px] leading-none font-semibold text-white no-underline transition-colors duration-150"
            >
              Mua điện thoại
            </Link>
            <Link
              href="/trade-in"
              className="border-marlo-border-strong hover:bg-cream-2 inline-flex items-center gap-2 rounded-[8px] border px-7 py-4 text-[16px] leading-none font-semibold text-foreground no-underline transition-colors duration-150"
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
    </Container>
  );
}
