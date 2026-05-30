import type { ReactNode } from "react";

interface TrustItem {
  icon: ReactNode;
  title: string;
  desc: string;
}

const items: TrustItem[] = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 17H3a1 1 0 0 1-1-1V4h14v12h-3M16 8h4l3 4v4a1 1 0 0 1-1 1h-2" />
        <circle cx="7.5" cy="17.5" r="2.5" />
        <circle cx="17.5" cy="17.5" r="2.5" />
      </svg>
    ),
    title: "Miễn phí vận chuyển",
    desc: "Đơn từ 500.000₫ trở lên",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
      </svg>
    ),
    title: "Đổi trả miễn phí",
    desc: "Trong vòng 30 ngày, không hỏi lý do",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Bảo vệ người mua",
    desc: "Hoàn tiền 100% nếu không hài lòng",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <polyline points="12 22 12 13" />
        <path d="m3.3 7 8.7 5 8.7-5" />
      </svg>
    ),
    title: "Thời gian giao thật",
    desc: "Không phóng đại, không hứa hão",
  },
];

export function TrustStrip() {
  return (
    <section
      className="max-w-360 mx-auto"
      style={{ borderTop: "1px solid #E6DFD4", borderBottom: "1px solid #E6DFD4", padding: "40px 64px", margin: "72px auto 0" }}
    >
      <div className="grid grid-cols-4 gap-8">
        {items.map((item) => (
          <div key={item.title} className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#FFE7DD] flex items-center justify-center text-[#C73A12] flex-none">
              {item.icon}
            </div>
            <div>
              <div
                className="text-[15px] font-semibold text-[#141210]"
                style={{ fontFamily: "var(--font-hanken), sans-serif" }}
              >
                {item.title}
              </div>
              <div
                className="text-[13px] text-[#5C5853]"
                style={{ fontFamily: "var(--font-hanken), sans-serif" }}
              >
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
