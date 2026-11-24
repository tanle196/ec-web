import Link from "next/link";
import { Badge } from "@/components/commons/badge";
import { Container } from "@/components/commons/container";

export function EditorialPair() {
  return (
    <Container size="wide" className="pt-18">
      <div className="grid grid-cols-2 gap-4">
        {/* Home goods — deep green */}
        <div
          className="relative flex flex-col justify-between overflow-hidden rounded-[16px] p-10"
          style={{ background: "var(--color-success)", minHeight: 340 }}
        >
          <div
            className="pointer-events-none absolute right-0 bottom-0 h-64 w-64"
            style={{
              background: "url(/headphones.svg) center/contain no-repeat",
              opacity: 0.35,
            }}
          />
          <Badge kind="gold">Bộ sưu tập mới</Badge>
          <div>
            <h3 className="text-cream mb-3 text-[clamp(32px,3vw,40px)] leading-none font-semibold tracking-[-0.02em]">
              Đồ gia dụng thủ công,
              <br />
              giao nhanh 2 ngày.
            </h3>
            <p className="mb-5 max-w-85 text-[15px] leading-relaxed text-text-tertiary">
              Sản phẩm từ các nhà làm thủ công độc lập. Giao tận nhà, đúng hẹn,
              không nói suông.
            </p>
            <Link
              href="/categories/home"
              className="inline-flex items-center gap-2 rounded-[8px] px-5 py-3 text-[14px] leading-none font-semibold no-underline transition-opacity duration-150 hover:opacity-90"
              style={{
                background: "var(--muted)",
                color: "var(--foreground)",
              }}
            >
              Khám phá nhà cửa
            </Link>
          </div>
        </div>

        {/* Audio flash sale — persimmon */}
        <div
          className="relative flex flex-col justify-between overflow-hidden rounded-[16px] p-10"
          style={{ background: "var(--color-cta)", minHeight: 340 }}
        >
          <div
            className="pointer-events-none absolute right-0 bottom-0 h-72 w-72"
            style={{
              background: "url(/headphones.svg) center/contain no-repeat",
              opacity: 0.9,
            }}
          />
          <span className="text-persimmon inline-flex w-fit items-center rounded-full bg-white px-2.5 py-1.25 text-[12px] leading-none font-semibold whitespace-nowrap">
            Hôm nay thôi
          </span>
          <div>
            <h3 className="mb-3 text-[clamp(32px,3vw,40px)] leading-none font-semibold tracking-[-0.02em] text-white">
              Audio, giảm 20%.
            </h3>
            <p className="mb-5 max-w-85 text-[15px] leading-relaxed text-white/85">
              Over-ear, true wireless, loa di động — một ngày, một mức giá. Số
              lượng có hạn.
            </p>
            <Link
              href="/categories/audio"
              className="inline-flex items-center gap-2 rounded-[8px] px-5 py-3 text-[14px] leading-none font-semibold no-underline transition-opacity duration-150 hover:opacity-90"
              style={{
                background: "var(--foreground)",
                color: "white",
              }}
            >
              Mua ngay
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
