"use client";

import { Badge } from "@/components/commons/badge";
import { Price } from "@/components/commons/price";
import { ProductCard } from "@/components/commons/product-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { FLAGSHIP } from "@/app/(shop)/categories/_data/phones";
import Image from "next/image";

type Tab = "orders" | "saved" | "addresses" | "payment" | "settings";

const NAV_ITEMS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  {
    id: "orders",
    label: "Đơn hàng",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <polyline points="12 22 12 13" />
        <path d="m3.3 7 8.7 5 8.7-5" />
      </svg>
    ),
  },
  {
    id: "saved",
    label: "Đã lưu",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
  },
  {
    id: "addresses",
    label: "Địa chỉ",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    id: "payment",
    label: "Thanh toán",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" x2="22" y1="10" y2="10" />
      </svg>
    ),
  },
  {
    id: "settings",
    label: "Cài đặt",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

const ORDERS = [
  {
    id: "M-2026-58291",
    date: "14 tháng 3, 2026",
    status: "Đang giao",
    statusKind: "info" as const,
    total: 33990000,
    imgs: ["/phone-orange.svg"],
    eta: "Dự kiến Thứ 3, 17/3 — đang trên đường giao",
  },
  {
    id: "M-2026-58102",
    date: "6 tháng 3, 2026",
    status: "Đã giao",
    statusKind: "success" as const,
    total: 29990000,
    imgs: ["/phone-green.svg", "/phone-orange.svg"],
    eta: "Đã giao 9/3 — để tại cửa trước",
  },
  {
    id: "M-2026-57804",
    date: "18 tháng 2, 2026",
    status: "Đã giao",
    statusKind: "success" as const,
    total: 9990000,
    imgs: ["/phone-green.svg"],
    eta: "Đã giao 21/2",
  },
];

const STATUS_STYLES: Record<string, string> = {
  info: "bg-[#E0EBFB] text-[#2A6FDB]",
  success: "bg-[#E0F2EA] text-[#1F8A5B]",
  default: "bg-[#EFE8DB] text-[#5C5853]",
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[clamp(22px,2.5vw,28px)] font-semibold tracking-[-0.02em] text-[#141210] mb-5">
      {children}
    </h2>
  );
}

function OrderCard({ order }: { order: (typeof ORDERS)[number] }) {
  return (
    <div className="bg-white border border-marlo-border rounded-[12px] mb-4 overflow-hidden">
      {/* Header */}
      <div
        className="grid items-center gap-8 px-5 py-4 border-b border-marlo-border bg-[#FBF7F0]"
        style={{ gridTemplateColumns: "auto auto auto 1fr" }}
      >
        <div>
          <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-text-secondary mb-0.5">
            Đơn hàng
          </div>
          <div className="font-mono-marlo text-[14px] font-medium text-[#141210]">
            {order.id}
          </div>
        </div>
        <div>
          <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-text-secondary mb-0.5">
            Ngày đặt
          </div>
          <div className="text-[14px] text-[#141210]">
            {order.date}
          </div>
        </div>
        <div>
          <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-text-secondary mb-0.5">
            Tổng tiền
          </div>
          <Price amount={order.total} size="sm" />
        </div>
        <div className="justify-self-end">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold ${STATUS_STYLES[order.statusKind]}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current flex-none" />
            {order.status}
          </span>
        </div>
      </div>
      {/* Body */}
      <div className="flex items-center gap-4 px-5 py-4">
        <div className="flex gap-2">
          {order.imgs.map((src, i) => (
            <div
              key={i}
              className="w-16 h-16 bg-cream rounded-[8px] p-1.5 flex items-center justify-center"
            >
              <Image
                src={src}
                alt=""
                width={52}
                height={52}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
        <div className="flex-1 text-[14px] text-text-secondary">
          {order.eta}
        </div>
        <div className="flex gap-2">
          {(["Theo dõi", "Xem đơn"] as const).map((label) => (
            <button
              key={label}
              className="px-4 py-2 rounded-[8px] bg-white border border-marlo-border text-[13px] font-semibold text-[#141210] cursor-pointer hover:bg-cream-2 transition-colors duration-150"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-16 py-8 pb-20">
        <h1 className="text-[clamp(32px,3.5vw,44px)] font-semibold leading-[1.02] tracking-[-0.02em] text-ink mb-8">
          Tài khoản của bạn
        </h1>

        <Tabs
          defaultValue="orders"
          orientation="vertical"
          className="flex gap-12 items-start"
        >
          {/* Sidebar */}
          <aside className="w-64 flex-none flex flex-col">
            {/* Avatar */}
            <div className="flex items-center gap-3.5 pb-6 border-b border-marlo-border">
              <div className="w-12 h-12 rounded-full bg-persimmon flex items-center justify-center text-white text-[20px] font-semibold flex-none">
                K
              </div>
              <div>
                <div className="text-[15px] font-semibold text-ink">
                  Kira Lee
                </div>
                <div className="text-[13px] text-text-secondary">
                  kira@hey.com
                </div>
              </div>
            </div>

            {/* Nav */}
            <TabsList
              variant="line"
              orientation="vertical"
              className="pt-4 flex-col gap-0.5 bg-transparent rounded-none w-full h-auto"
            >
              {NAV_ITEMS.map((item) => (
                <TabsTrigger
                  key={item.id}
                  value={item.id}
                  className="w-full justify-start gap-3 px-3 py-2.5 h-auto rounded-[8px] text-[14px] font-medium text-text-secondary data-[state=active]:bg-cream-2 data-[state=active]:text-ink data-[state=active]:font-semibold"
                >
                  {item.icon}
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <TabsContent value="orders">
              <div className="flex items-end justify-between mb-5">
                <SectionTitle>Đơn hàng gần đây</SectionTitle>
                <Select defaultValue="6m">
                  <SelectTrigger
                    className="bg-white border-marlo-border text-[14px] text-ink rounded-[8px] h-9.5"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6m">6 tháng gần nhất</SelectItem>
                    <SelectItem value="1y">1 năm gần nhất</SelectItem>
                    <SelectItem value="all">Tất cả</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {ORDERS.map((o) => (
                <OrderCard key={o.id} order={o} />
              ))}
            </TabsContent>

            <TabsContent value="saved">
              <SectionTitle>Sản phẩm đã lưu</SectionTitle>
              <div className="grid grid-cols-4 gap-4">
                {FLAGSHIP.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="addresses">
              <div className="flex items-end justify-between mb-5">
                <SectionTitle>Địa chỉ</SectionTitle>
                <button
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[8px] bg-persimmon text-white text-[13px] font-semibold border-0 cursor-pointer hover:bg-persimmon-hover transition-colors duration-150"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Thêm địa chỉ
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    label: "Nhà",
                    name: "Kira Lee",
                    line1: "42 Trần Hưng Đạo, Căn hộ 4B",
                    line2: "Hoàn Kiếm, Hà Nội",
                    isDefault: true,
                  },
                  {
                    label: "Công ty",
                    name: "Kira Lee",
                    line1: "88 Lý Thường Kiệt, Tầng 12",
                    line2: "Đống Đa, Hà Nội",
                    isDefault: false,
                  },
                ].map(({ label, name, line1, line2, isDefault }) => (
                  <div
                    key={label}
                    className="bg-white border border-marlo-border rounded-[12px] p-5"
                  >
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="text-[13px] font-semibold text-ink">
                        {label}
                      </span>
                      {isDefault && <Badge kind="persimmon">Mặc định</Badge>}
                    </div>
                    <div className="text-[14px] text-ink leading-relaxed">
                      {name}
                      <br />
                      {line1}
                      <br />
                      {line2}
                    </div>
                    <div className="flex gap-4 mt-4">
                      {(["Sửa", "Xóa"] as const).map((action) => (
                        <button
                          key={action}
                          className="bg-transparent border-0 text-[13px] font-medium cursor-pointer underline underline-offset-3 p-0 hover:text-text-secondary transition-colors"
                          style={{
                            color: action === "Sửa" ? "#141210" : "#5C5853",
                          }}
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="payment">
              <SectionTitle>Phương thức thanh toán</SectionTitle>
              <div className="flex flex-col gap-3">
                {[
                  {
                    brand: "VISA",
                    last: "••• 4421",
                    exp: "08/28",
                    isDefault: true,
                  },
                  {
                    brand: "MC",
                    last: "••• 9013",
                    exp: "03/27",
                    isDefault: false,
                  },
                ].map(({ brand, last, exp, isDefault }) => (
                  <div
                    key={last}
                    className="bg-white border border-marlo-border rounded-[12px] p-5 flex items-center gap-4"
                  >
                    <div className="w-14 h-9 rounded-[6px] bg-ink flex items-center justify-center text-cream text-[11px] font-bold tracking-wider flex-none">
                      {brand}
                    </div>
                    <div>
                      <div className="font-mono-marlo text-[14px] text-ink">
                        {last}
                      </div>
                      <div className="text-[12px] text-text-secondary">
                        Hết hạn {exp}
                      </div>
                    </div>
                    {isDefault && <Badge kind="persimmon">Mặc định</Badge>}
                    <button className="ml-auto bg-transparent border-0 text-text-secondary cursor-pointer hover:text-ink transition-colors p-1">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="m19 6-.867 12.142A2 2 0 0 1 16.138 20H7.862a2 2 0 0 1-1.995-1.858L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <SectionTitle>Cài đặt tài khoản</SectionTitle>
              <div className="bg-white border border-marlo-border rounded-[12px] p-6 flex flex-col gap-5">
                {[
                  { label: "Họ và tên", value: "Kira Lee" },
                  { label: "Email", value: "kira@hey.com" },
                  { label: "Số điện thoại", value: "+84 90 123 4567" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <label className="block text-[12px] font-semibold tracking-[0.08em] uppercase text-text-secondary mb-1.5">
                      {label}
                    </label>
                    <input
                      defaultValue={value}
                      className="w-full bg-cream border border-marlo-border rounded-[8px] px-3 py-2.5 text-[14px] text-ink outline-none focus:border-ink transition-colors"
                    />
                  </div>
                ))}
                <div className="pt-2">
                  <button className="px-6 py-3 rounded-[8px] bg-persimmon text-white text-[14px] font-semibold border-0 cursor-pointer hover:bg-persimmon-hover transition-colors duration-150">
                    Lưu thay đổi
                  </button>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
