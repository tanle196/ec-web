import Link from "next/link";
import { Badge } from "@/components/commons/badge";

export function EditorialPair() {
  return (
    <section className="max-w-360 mx-auto px-16 pt-18">
      <div className="grid grid-cols-2 gap-4">
        {/* Home goods — deep green */}
        <div
          className="relative rounded-[16px] overflow-hidden flex flex-col justify-between p-10"
          style={{ background: "#1F4D3C", minHeight: 340 }}
        >
          <div
            className="absolute right-0 bottom-0 w-64 h-64 pointer-events-none"
            style={{
              background: "url(/headphones.svg) center/contain no-repeat",
              opacity: 0.35,
            }}
          />
          <Badge kind="gold">Bộ sưu tập mới</Badge>
          <div>
            <h3
              className="text-[clamp(32px,3vw,40px)] font-semibold leading-none tracking-[-0.02em] text-cream mb-3"
            >
              Đồ gia dụng thủ công,
              <br />
              giao nhanh 2 ngày.
            </h3>
            <p
              className="text-[15px] leading-relaxed text-[#C9C2B5] max-w-85 mb-5"
            >
              Sản phẩm từ các nhà làm thủ công độc lập. Giao tận nhà, đúng hẹn,
              không nói suông.
            </p>
            <Link
              href="/categories/home"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-[8px] font-semibold text-[14px] leading-none no-underline hover:opacity-90 transition-opacity duration-150"
              style={{
                background: "#F6F1E8",
                color: "#141210",
              }}
            >
              Khám phá nhà cửa
            </Link>
          </div>
        </div>

        {/* Audio flash sale — persimmon */}
        <div
          className="relative rounded-[16px] overflow-hidden flex flex-col justify-between p-10"
          style={{ background: "#FF5B2E", minHeight: 340 }}
        >
          <div
            className="absolute right-0 bottom-0 w-72 h-72 pointer-events-none"
            style={{
              background: "url(/headphones.svg) center/contain no-repeat",
              opacity: 0.9,
            }}
          />
          <span
            className="inline-flex items-center px-2.5 py-1.25 rounded-full font-semibold text-[12px] leading-none whitespace-nowrap bg-white text-persimmon w-fit"
          >
            Hôm nay thôi
          </span>
          <div>
            <h3
              className="text-[clamp(32px,3vw,40px)] font-semibold leading-none tracking-[-0.02em] text-white mb-3"
            >
              Audio, giảm 20%.
            </h3>
            <p
              className="text-[15px] leading-relaxed max-w-85 mb-5"
              style={{
                color: "rgba(255,255,255,0.85)",
              }}
            >
              Over-ear, true wireless, loa di động — một ngày, một mức giá. Số
              lượng có hạn.
            </p>
            <Link
              href="/categories/audio"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-[8px] font-semibold text-[14px] leading-none no-underline hover:opacity-90 transition-opacity duration-150"
              style={{
                background: "#141210",
                color: "white",
              }}
            >
              Mua ngay
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
