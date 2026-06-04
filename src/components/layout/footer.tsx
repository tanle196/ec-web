import Link from "next/link";

const COLUMNS = [
  {
    title: "Mua sắm",
    links: ["Điện thoại mới", "Ưu đãi hôm nay", "Cửa hàng outlet", "Thẻ quà tặng"],
  },
  {
    title: "Hỗ trợ",
    links: ["Trạng thái đơn hàng", "Đổi trả", "Vận chuyển", "Liên hệ"],
  },
  {
    title: "Người bán",
    links: ["Bán trên Marlo", "Trung tâm bán hàng", "Quảng cáo", "Fulfillment"],
  },
  {
    title: "Công ty",
    links: ["Về chúng tôi", "Tuyển dụng", "Báo chí", "Phát triển bền vững"],
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-foreground text-muted-foreground pt-16 pb-8">
      <div className="max-w-360 mx-auto px-16">
        {/* Top grid */}
        <div className="grid gap-12 mb-12" style={{ gridTemplateColumns: "1.4fr repeat(4, 1fr)" }}>
          {/* Brand column */}
          <div>
            <span
              className="text-[22px] font-bold tracking-[-0.04em] text-white"
            >
              marlo
            </span>
            <p
              className="mt-4 text-[14px] leading-relaxed text-muted-foreground max-w-70"
            >
              Marketplace đa danh mục. Điện thoại, laptop, thời trang, thực phẩm — bán hết, giao nhanh.
            </p>
          </div>

          {/* Link columns */}
          {COLUMNS.map(({ title, links }) => (
            <div key={title}>
              <h4
                className="text-[13px] font-semibold text-white tracking-[0.12em] uppercase mb-4"
              >
                {title}
              </h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                {links.map((label) => (
                  <li key={label}>
                    <Link
                      href="#"
                      className="text-[14px] text-muted-foreground no-underline hover:text-white transition-colors duration-150"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex items-center justify-between pt-6"
          style={{ borderTop: "1px solid rgb(255 255 255 / 0.1)" }}
        >
          <span
            className="text-[12px] text-muted-foreground"
          >
            © {new Date().getFullYear()} Marlo, Inc. All rights reserved.
          </span>
          <span className="flex gap-4">
            {["Điều khoản", "Quyền riêng tư", "Cookie"].map((label) => (
              <Link
                key={label}
                href="#"
                className="text-[12px] text-muted-foreground no-underline hover:text-white/80 transition-colors duration-150"
              >
                {label}
              </Link>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
