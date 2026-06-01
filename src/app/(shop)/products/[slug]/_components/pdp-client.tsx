"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/commons/badge";
import { Price } from "@/components/commons/price";
import { Stars } from "@/components/commons/stars";
import { SectionHeader } from "@/components/commons/section-header";
import { ProductGrid } from "@/components/commons/product-grid";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FLAGSHIP, MID_RANGE } from "@/app/(shop)/categories/_data/phones";
import type { Phone } from "@/app/(shop)/categories/_data/phones";

const ALL_PHONES = [...FLAGSHIP, ...MID_RANGE];

const COLORS = [
  { label: "Persimmon", hex: "#FF5B2E" },
  { label: "Onyx", hex: "#141210" },
  { label: "Pine", hex: "#3A4A3A" },
  { label: "Cream", hex: "#EFE8DB" },
];
const STORAGE_OPTIONS = ["128 GB", "256 GB", "512 GB", "1 TB"];
const TABS = [
  { value: "details", label: "Chi tiết" },
  { value: "specs", label: "Thông số" },
  { value: "reviews", label: "Đánh giá · 2.341" },
  { value: "shipping", label: "Vận chuyển" },
];

const REVIEWS = [
  {
    name: "Maya R.",
    rating: 5,
    when: "2 tuần trước",
    verified: true,
    title: "Upgrade tuyệt vời",
    body: "Pin là điểm cải thiện lớn nhất. Dễ dàng dùng 2 ngày với tải bình thường. Camera trong nhà tốt hơn hẳn.",
  },
  {
    name: "Minh T.",
    rating: 4,
    when: "3 tuần trước",
    verified: true,
    title: "Màu đẹp, ốp hơi chật",
    body: "Màu Persimmon là thứ thu hút tôi. Xứng đáng. Chỉ một điểm nhỏ: ốp cũ không vừa vì cụm camera lớn hơn.",
  },
  {
    name: "Ji-eun P.",
    rating: 5,
    when: "1 tháng trước",
    verified: true,
    title: "Bayside giao cực nhanh",
    body: "Đặt Chủ nhật, nhận Thứ ba với nhãn Marlo. Hộp nguyên seal, đúng thông số, y như mô tả.",
  },
];

const SPECS = [
  ["Màn hình", '6.1" Super Retina OLED'],
  ["Chip", "H14 Bionic"],
  ["Dung lượng", "256 GB"],
  ["Pin", "24 giờ xem video"],
  ["Kết nối", "5G, Wi-Fi 6E, USB-C"],
  ["Kháng nước", "IP68"],
  ["Khối lượng", "187 g"],
];

function QtyStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="inline-flex items-center bg-white border border-marlo-border rounded-full h-12 px-1">
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        className="w-10 h-10 rounded-full border-0 bg-transparent cursor-pointer flex items-center justify-center text-[#141210] hover:bg-[#EFE8DB] transition-colors duration-150"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <span className="font-mono-marlo font-semibold text-[15px] px-4 min-w-[32px] text-center text-[#141210]">
        {value}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        className="w-10 h-10 rounded-full border-0 bg-transparent cursor-pointer flex items-center justify-center text-[#141210] hover:bg-[#EFE8DB] transition-colors duration-150"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
}

function Gallery({ images, mainAlt }: { images: string[]; mainAlt: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="flex flex-col gap-2 flex-none">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="w-[72px] h-[72px] rounded-[8px] bg-[#F6F1E8] p-1.5 cursor-pointer transition-all duration-150"
            style={{
              border: active === i ? "2px solid #141210" : "1px solid #E6DFD4",
            }}
          >
            <Image
              src={src}
              alt=""
              width={60}
              height={60}
              className="w-full h-full object-contain"
            />
          </button>
        ))}
      </div>
      {/* Main image */}
      <div className="relative flex-1 aspect-square bg-[#F6F1E8] rounded-[16px] p-8 flex items-center justify-center">
        <Image
          src={images[active]}
          alt={mainAlt}
          width={400}
          height={400}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}

export function PdpClient({ phone }: { phone: Phone }) {
  const [color, setColor] = useState("Persimmon");
  const [storage, setStorage] = useState("256 GB");
  const [qty, setQty] = useState(1);

  const galleryImages = [
    phone.img,
    phone.img === "/phone-orange.svg"
      ? "/phone-green.svg"
      : "/phone-orange.svg",
    phone.img,
    phone.img === "/phone-orange.svg"
      ? "/phone-green.svg"
      : "/phone-orange.svg",
  ];
  const related = ALL_PHONES.filter((p) => p.id !== phone.id).slice(0, 4);

  function discountPct(price: number, was: number) {
    return Math.round((1 - price / was) * 100);
  }

  return (
    <>
      {/* Main grid */}
      <div className="grid grid-cols-[1.1fr_1fr] gap-12">
        <Gallery images={galleryImages} mainAlt={phone.name} />

        {/* Right: Info */}
        <div>
          <div className="text-[12px] font-semibold tracking-[0.14em] uppercase text-text-secondary mb-1.5">
            {phone.seller}
          </div>
          <h1 className="text-[clamp(28px,2.5vw,36px)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#141210] mb-3">
            {phone.name}
          </h1>
          <div className="flex items-center gap-3.5 mb-6">
            <Stars rating={phone.rating} count={phone.reviews} />
            <span className="text-[#D4CCBE]">·</span>
            <a
              href="#reviews"
              className="text-[13px] text-[#141210] underline underline-offset-3"
            >
              312 câu hỏi
            </a>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-2">
            <Price
              amount={phone.price}
              was={phone.was ?? undefined}
              size="xl"
            />
            {phone.was && (
              <Badge kind="persimmon">
                −{discountPct(phone.price, phone.was)}%
              </Badge>
            )}
          </div>
          <div className="text-[13px] text-text-secondary mb-7">
            hoặc 4 kỳ{" "}
            <strong className="text-[#141210]">
              {(phone.price / 4).toLocaleString("vi-VN")}₫
            </strong>{" "}
            với Marlo Pay
          </div>

          {/* Color */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2 mb-2.5">
              <span className="text-[13px] font-semibold tracking-[0.04em] uppercase text-text-secondary">
                Màu
              </span>
              <span className="text-[14px] text-[#141210]">
                {color}
              </span>
            </div>
            <div className="flex gap-2.5">
              {COLORS.map((c) => (
                <button
                  key={c.label}
                  onClick={() => setColor(c.label)}
                  aria-label={c.label}
                  className="w-8 h-8 rounded-full cursor-pointer p-0 border-[2px] border-[#F6F1E8] transition-all duration-150"
                  style={{
                    background: c.hex,
                    outline:
                      color === c.label
                        ? "2px solid #141210"
                        : "1px solid #D4CCBE",
                    outlineOffset: color === c.label ? "2px" : "0",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Storage */}
          <div className="mb-7">
            <div className="flex items-baseline gap-2 mb-2.5">
              <span className="text-[13px] font-semibold tracking-[0.04em] uppercase text-text-secondary">
                Bộ nhớ
              </span>
              <span className="text-[14px] text-[#141210]">
                {storage}
              </span>
            </div>
            <ToggleGroup
              type="single"
              value={storage}
              onValueChange={(v) => v && setStorage(v)}
              spacing={1}
              className="gap-1.5"
            >
              {STORAGE_OPTIONS.map((s) => (
                <ToggleGroupItem
                  key={s}
                  value={s}
                  disabled={s === "1 TB"}
                  className="h-auto px-4 py-2.5 rounded-[8px] border border-marlo-border bg-white text-[13px] font-semibold text-ink data-[state=on]:bg-ink data-[state=on]:text-white data-[state=on]:border-ink disabled:line-through disabled:text-text-disabled hover:bg-cream-2 data-[state=on]:hover:bg-ink"
                >
                  {s}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {/* Add to cart */}
          <div className="flex items-center gap-3 mb-3">
            <QtyStepper value={qty} onChange={setQty} />
            <button
              className="flex-1 h-12 rounded-[8px] bg-[#FF5B2E] text-white font-semibold text-[15px] border-0 cursor-pointer hover:bg-[#E84A1E] transition-colors duration-150"
            >
              Thêm vào giỏ ·{" "}
              <span className="font-mono-marlo">
                {(phone.price * qty).toLocaleString("vi-VN")}₫
              </span>
            </button>
          </div>
          <button
            className="w-full h-12 rounded-[8px] bg-white border border-marlo-border font-semibold text-[15px] text-[#141210] cursor-pointer hover:bg-[#EFE8DB] transition-colors duration-150 mb-5"
          >
            Mua ngay
          </button>

          {/* Trust box */}
          <div className="flex flex-col gap-3 p-5 bg-white border border-marlo-border rounded-[12px]">
            {(
              [
                [
                  "truck",
                  <span key="ship">
                    <strong className="text-[#141210]">
                      Miễn phí vận chuyển
                    </strong>{" "}
                    · giao{" "}
                    <strong className="text-[#141210]">Thứ 3, 3/6</strong> đến
                    Hà Nội
                  </span>,
                ],
                [
                  "refresh",
                  <span key="ret">
                    <strong className="text-[#141210]">
                      Đổi trả miễn phí 30 ngày
                    </strong>{" "}
                    · không tính phí hoàn trả
                  </span>,
                ],
                [
                  "shield",
                  <span key="prot">
                    <strong className="text-[#141210]">Bảo vệ người mua</strong>{" "}
                    từ Marlo · bảo đảm 90 ngày
                  </span>,
                ],
              ] as [string, React.ReactNode][]
            ).map(([icon, text]) => (
              <div
                key={icon}
                className="flex items-center gap-3 text-[13px] text-text-secondary"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#141210"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {icon === "truck" && (
                    <>
                      <path d="M5 17H3a1 1 0 0 1-1-1V4h14v12h-3M16 8h4l3 4v4a1 1 0 0 1-1 1h-2" />
                      <circle cx="7.5" cy="17.5" r="2.5" />
                      <circle cx="17.5" cy="17.5" r="2.5" />
                    </>
                  )}
                  {icon === "refresh" && (
                    <>
                      <polyline points="1 4 1 10 7 10" />
                      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                    </>
                  )}
                  {icon === "shield" && (
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  )}
                </svg>
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="details" className="mt-16 flex flex-col gap-0">
        <TabsList
          variant="line"
          className="w-full justify-start rounded-none bg-transparent border-b border-marlo-border pb-0 gap-0 h-auto"
        >
          {TABS.map((t) => (
            <TabsTrigger
              key={t.value}
              value={t.value}
              id={t.value === "reviews" ? "reviews" : undefined}
              className="flex-none h-auto rounded-none px-4 py-3.5 text-[14px] font-semibold"
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="details" className="pt-8">
          <div className="text-[15px] leading-[1.7] text-ink">
            <p className="mb-4">
              {phone.name} được xây dựng cho những ai dùng điện thoại cho mọi
              thứ. Màn hình OLED 6.1&quot;, chip H14 mới nhất, và hệ thống 3
              camera được tinh chỉnh cho ánh sáng yếu.
            </p>
            <p className="mb-4">
              Bán và giao bởi <strong>{phone.seller}</strong>, người bán được
              Marlo xác minh. Bao gồm cáp USB-C, nhãn đổi trả 30 ngày Marlo và
              bảo hành 12 tháng từ người bán.
            </p>
            <ul className="pl-5 text-text-secondary space-y-1.5 m-0">
              <li>Mở khóa, dùng được mọi nhà mạng</li>
              <li>5G sub-6 + mmWave</li>
              <li>Kháng nước và bụi IP68</li>
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="specs" className="pt-8">
          <table className="w-full border-collapse text-[14px]">
            <tbody>
              {SPECS.map(([k, v]) => (
                <tr key={k} className="border-b border-marlo-border">
                  <td className="py-3 text-text-secondary w-48">{k}</td>
                  <td className="py-3 text-ink font-semibold">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabsContent>

        <TabsContent
          value="reviews"
          className="pt-8 grid grid-cols-[2fr_1fr] gap-12"
        >
          <div>
            {REVIEWS.map((r) => (
              <div key={r.name} className="py-5 border-b border-marlo-border">
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill={i < r.rating ? "#141210" : "#D4CCBE"}
                        stroke={i < r.rating ? "#141210" : "#D4CCBE"}
                        strokeWidth="1.5"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </span>
                  <span className="text-[14px] font-semibold text-ink">
                    {r.name}
                  </span>
                  <span className="text-[13px] text-text-secondary">
                    · {r.when}
                  </span>
                  {r.verified && <Badge kind="new">Đã mua</Badge>}
                </div>
                <h4 className="text-[15px] font-semibold text-ink mb-1.5 mt-0">
                  {r.title}
                </h4>
                <p className="text-[14px] leading-relaxed text-text-secondary m-0">
                  {r.body}
                </p>
              </div>
            ))}
          </div>

          <aside className="bg-white border border-marlo-border rounded-[12px] p-6 self-start">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-[56px] font-semibold text-ink leading-none tracking-[-0.03em]">
                {phone.rating}
              </span>
              <span className="text-[14px] text-text-secondary">
                / 5
              </span>
            </div>
            <Stars rating={phone.rating} count={phone.reviews} />
            <div className="mt-5 flex flex-col gap-1.5">
              {(
                [
                  [5, 72],
                  [4, 18],
                  [3, 6],
                  [2, 2],
                  [1, 2],
                ] as [number, number][]
              ).map(([star, pct]) => (
                <div
                  key={star}
                  className="flex items-center gap-2.5 text-[12px] text-text-secondary"
                >
                  <span className="w-3 text-right">{star}</span>
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="#141210"
                    stroke="#141210"
                    strokeWidth="1.5"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <div className="flex-1 h-1.5 bg-cream-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="font-mono-marlo w-8 text-right">
                    {pct}%
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-5 h-10 rounded-[8px] bg-white border border-marlo-border text-[14px] font-semibold text-ink cursor-pointer hover:bg-cream-2 transition-colors duration-150">
              Viết đánh giá
            </button>
          </aside>
        </TabsContent>

        <TabsContent value="shipping" className="pt-8">
          <div className="text-[15px] leading-relaxed text-ink space-y-3">
            <p>
              Giao hàng miễn phí đến <strong>Hà Nội</strong>. Dự kiến{" "}
              <strong>Thứ 3, 3/6</strong>.
            </p>
            <p className="text-text-secondary">
              Muốn nhanh hơn? Thành viên Marlo Prime nhận giao trong 2 giờ tại
              các quận nội thành, hoàn toàn miễn phí.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related */}
      <section className="mt-20">
        <SectionHeader
          eyebrow="Người mua cũng xem"
          title="Có thể bạn thích"
          action="Xem thêm"
          href="/phones"
        />
        <ProductGrid products={related} />
      </section>
    </>
  );
}
