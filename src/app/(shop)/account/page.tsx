"use client";

import { PageBreadcrumb } from "@/components/commons/breadcrumb";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

const imgUserAvatar =
  "https://www.figma.com/api/mcp/asset/22b3c6d0-39a3-4d05-8723-697ef67828aa";
const imgProduct1 =
  "https://www.figma.com/api/mcp/asset/fee931d8-36b7-47f4-b683-9e4a96c38cd6";
const imgProduct2 =
  "https://www.figma.com/api/mcp/asset/d72852a2-0fca-4ae2-bef6-d84bb123ebf3";
const imgProduct3 =
  "https://www.figma.com/api/mcp/asset/f7a1aa9a-7a99-42bd-b732-3629ae018d76";
const imgProduct4 =
  "https://www.figma.com/api/mcp/asset/626db840-8813-4182-b4d6-200a6975baea";

const ORDERS = [
  { id: "#96459761", status: "IN PROGRESS", statusColor: "text-primary-500", date: "Dec 30, 2019 05:18", total: "$1,500 (5 Products)" },
  { id: "#71667167", status: "COMPLETED",   statusColor: "text-success-500", date: "Feb 2, 2019 19:28",  total: "$80 (11 Products)" },
  { id: "#95214362", status: "CANCELED",    statusColor: "text-danger-500",  date: "Mar 20, 2019 23:14", total: "$160 (3 Products)" },
  { id: "#71667167", status: "COMPLETED",   statusColor: "text-success-500", date: "Feb 2, 2019 19:28",  total: "$80 (1 Products)" },
  { id: "#51746385", status: "COMPLETED",   statusColor: "text-success-500", date: "Feb 2, 2019 19:28",  total: "$2,300 (2 Products)" },
  { id: "#51746385", status: "CANCELED",    statusColor: "text-danger-500",  date: "Dec 30, 2019 07:52", total: "$70 (1 Products)" },
  { id: "#673971743", status: "COMPLETED",  statusColor: "text-success-500", date: "Dec 7, 2019 23:26",  total: "$220 (1 Products)" },
];

const BROWSING_PRODUCTS = [
  { img: imgProduct1, name: "TOZO T6 True Wireless Earbuds Bluetooth Headphon...", rating: 5, reviews: 738, price: "$70", badge: { label: "HOT", color: "bg-danger-500" } },
  { img: imgProduct2, name: "Samsung Electronics Samsung Galaxy S21 5G", rating: 5, reviews: 536, price: "$2,300", badge: null },
  { img: imgProduct3, name: "Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K/6...", rating: 5, reviews: 423, price: "$360", badge: { label: "BEST DEALS", color: "bg-secondary-500" } },
  { img: imgProduct4, name: "Portable Washing Machine, 11lbs capacity Model 18NMF...", rating: 4, reviews: 816, price: "$80", badge: null },
];

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center">
      {Array.from({ length: max }, (_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.93L8 10.27l-3.52 1.08.67-3.93L2.3 5.64l3.94-.57L8 1.5z"
            fill={i < rating ? "#FA8232" : "none"}
            stroke={i < rating ? "#FA8232" : "#ADB7BC"}
            strokeWidth="1.2"
          />
        </svg>
      ))}
    </div>
  );
}

function SectionHeading({ title, action }: { title: string; action?: string }) {
  return (
    <div className="flex items-center justify-between px-6 h-13 border-b border-gray-100">
      <span className="text-[14px] font-medium text-gray-900 uppercase tracking-wide">{title}</span>
      {action && (
        <button className="flex items-center gap-2 text-[14px] font-semibold text-primary-500 hover:text-primary-600 transition-colors cursor-pointer">
          {action}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M4 10h12M12 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default function AccountDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-330 mx-auto px-6 py-6 pb-20">
        <PageBreadcrumb items={[{ label: "Home", href: "/" }, { label: "Dashboard" }]} />

        <div className="flex gap-18 items-start mt-2">
          <DashboardSidebar />

          {/* Main content */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            {/* Welcome heading */}
            <div>
              <h1 className="text-[24px] font-semibold text-gray-900 leading-7">Hello, Kevin</h1>
              <p className="mt-2 text-[14px] text-gray-600 leading-5 max-w-[423px]">
                From your account dashboard. you can easily check &amp; view your Recent Orders,
                manage your Shipping and Billing Addresses and edit your Password and Account Details.
              </p>
            </div>

            {/* Top row: Account Info + Billing Address + Stats */}
            <div className="flex gap-6">
              {/* Account Info */}
              <div className="w-[312px] flex-none bg-white border border-gray-100 rounded-[4px]">
                <SectionHeading title="Account Info" />
                <div className="px-6 pt-[22px] pb-6 flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={imgUserAvatar}
                      alt="Kevin Gilbert"
                      width={48}
                      height={48}
                      className="rounded-full size-12 object-cover flex-none"
                    />
                    <div>
                      <p className="text-[16px] font-semibold text-gray-900 leading-6">Kevin Gilbert</p>
                      <p className="text-[14px] text-gray-600 leading-5">Dhaka - 1207, Bangladesh</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 text-[14px] leading-5">
                    <div className="flex gap-1">
                      <span className="text-gray-900">Email:</span>
                      <span className="text-gray-600"> kevin.gilbert@gmail.com</span>
                    </div>
                    <div className="flex gap-1">
                      <span className="text-gray-900">Sec Email:</span>
                      <span className="text-gray-600"> kevin12345@gmail.com</span>
                    </div>
                    <div className="flex gap-1">
                      <span className="text-gray-900">Phone:</span>
                      <span className="text-gray-600"> +1-202-555-0118</span>
                    </div>
                  </div>
                  <button className="self-start border-2 border-secondary-100 rounded-[2px] px-6 h-12 text-[14px] font-bold text-secondary-500 uppercase tracking-[0.012em] hover:bg-secondary-50 transition-colors cursor-pointer">
                    Edit Account
                  </button>
                </div>
              </div>

              {/* Billing Address */}
              <div className="w-[312px] flex-none bg-white border border-gray-100 rounded-[4px]">
                <SectionHeading title="Billing Address" />
                <div className="px-6 pt-[22px] pb-6 flex flex-col gap-5">
                  <div className="flex flex-col gap-2 text-[14px] leading-5">
                    <p className="font-medium text-gray-900">Kevin Gilbert</p>
                    <p className="text-gray-600">
                      East Tejturi Bazar, Word No. 04, Road No. 13/x, House no. 1320/C, Flat No. 5D,
                      Dhaka - 1200, Bangladesh
                    </p>
                    <div className="flex gap-1">
                      <span className="text-gray-900">Phone Number:</span>
                      <span className="text-gray-600"> +1-202-555-0118</span>
                    </div>
                    <div className="flex gap-1">
                      <span className="text-gray-900">Email:</span>
                      <span className="text-gray-600"> kevin.gilbert@gmail.com</span>
                    </div>
                  </div>
                  <button className="self-start border-2 border-secondary-100 rounded-[2px] px-6 h-12 text-[14px] font-bold text-secondary-500 uppercase tracking-[0.012em] hover:bg-secondary-50 transition-colors cursor-pointer">
                    Edit Address
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex-1 flex flex-col gap-6">
                <div className="flex items-center gap-4 p-4 bg-secondary-50 rounded-[4px]">
                  <div className="bg-white p-3 rounded-[2px] flex-none">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
                      <path d="M16 4L28 10v12L16 28 4 22V10L16 4z" fill="#2DA5F3" opacity="0.2" />
                      <path d="M16 4L28 10v12L16 28 4 22V10L16 4z" stroke="#2DA5F3" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M16 28V16M4 10l12 6 12-6" stroke="#2DA5F3" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[20px] font-semibold text-gray-900 leading-7">154</p>
                    <p className="text-[14px] text-gray-700 leading-5">Total Orders</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-[4px]">
                  <div className="bg-white p-3 rounded-[2px] flex-none">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
                      <rect x="8" y="6" width="16" height="20" rx="1" fill="#FA8232" opacity="0.2" />
                      <rect x="8" y="6" width="16" height="20" rx="1" stroke="#FA8232" strokeWidth="1.5" />
                      <path d="M12 13h8M12 17h6M12 21h4" stroke="#FA8232" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[20px] font-semibold text-gray-900 leading-7">05</p>
                    <p className="text-[14px] text-gray-700 leading-5">Pending Orders</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-success-50 rounded-[4px]">
                  <div className="bg-white p-3 rounded-[2px] flex-none">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
                      <path d="M6 10l10 10 10-10" fill="#2DB224" opacity="0.2" />
                      <path d="M6 10l10 10 10-10" stroke="#2DB224" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[20px] font-semibold text-gray-900 leading-7">149</p>
                    <p className="text-[14px] text-gray-700 leading-5">Completed Orders</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Option */}
            <div className="bg-white border border-gray-100 rounded-[4px]">
              <SectionHeading title="Payment Option" action="Add Card" />
              <div className="flex gap-6 px-6 py-[22px]">
                <div
                  className="relative w-[296px] h-[196px] rounded-[4px] overflow-hidden flex-none"
                  style={{ background: "radial-gradient(circle at 0 0, #1b6392, #124261)" }}
                >
                  <div className="absolute top-6 left-6">
                    <p className="text-white text-[16px] leading-6">
                      <span className="font-semibold">$95,400.00 </span>
                      <span className="font-normal">USD</span>
                    </p>
                  </div>
                  <div className="absolute top-[72px] left-6">
                    <p className="text-white text-[11px] font-medium uppercase opacity-70 mb-2">Card number</p>
                    <p className="text-white text-[20px] font-normal tracking-wide">**** **** **** 3814</p>
                  </div>
                  <div className="absolute bottom-[54px] right-6">
                    <p className="text-white text-[14px] font-medium">Kevin Gilbert</p>
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <span className="text-white text-[16px] font-bold tracking-widest">VISA</span>
                  </div>
                  <button className="absolute top-6 right-6 text-white opacity-70 hover:opacity-100 cursor-pointer">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <circle cx="12" cy="12" r="2" /><circle cx="5" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
                    </svg>
                  </button>
                </div>
                <div
                  className="relative w-[296px] h-[196px] rounded-[4px] overflow-hidden flex-none"
                  style={{ background: "radial-gradient(circle at 0 0, #248e1d, #2db224)" }}
                >
                  <div className="absolute top-6 left-6">
                    <p className="text-white text-[16px] leading-6">
                      <span className="font-semibold">$87,583.00 </span>
                      <span className="font-normal">USD</span>
                    </p>
                  </div>
                  <div className="absolute top-[72px] left-6">
                    <p className="text-white text-[11px] font-medium uppercase opacity-70 mb-2">Card number</p>
                    <p className="text-white text-[20px] font-normal tracking-wide">**** **** **** 1761</p>
                  </div>
                  <div className="absolute bottom-[54px] right-6">
                    <p className="text-white text-[14px] font-medium">Kevin Gilbert</p>
                  </div>
                  <div className="absolute bottom-6 right-6 flex">
                    <div className="w-7 h-7 rounded-full bg-yellow-400 opacity-90" />
                    <div className="w-7 h-7 rounded-full bg-red-500 opacity-90 -ml-3" />
                  </div>
                  <button className="absolute top-6 right-6 text-white opacity-70 hover:opacity-100 cursor-pointer">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <circle cx="12" cy="12" r="2" /><circle cx="5" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white border border-gray-100 rounded-[4px]">
              <SectionHeading title="Recent Order" action="View All" />
              <div className="flex items-center gap-6 px-6 py-[10px] bg-gray-50 border-y border-gray-100 text-[12px] font-medium text-gray-700 uppercase">
                <span className="w-[124px] flex-none">Order ID</span>
                <span className="w-[152px] flex-none">Status</span>
                <span className="w-[200px] flex-none">Date</span>
                <span className="w-[248px] flex-none">Total</span>
                <span className="flex-none">Action</span>
              </div>
              {ORDERS.map((order, i) => (
                <div key={i} className="flex items-center gap-6 px-6 py-3 border-b border-gray-100 last:border-b-0">
                  <span className="w-[124px] flex-none text-[14px] font-medium text-gray-900">{order.id}</span>
                  <span className={`w-[152px] flex-none text-[14px] font-semibold ${order.statusColor}`}>{order.status}</span>
                  <span className="w-[200px] flex-none text-[14px] text-gray-600">{order.date}</span>
                  <span className="w-[248px] flex-none text-[14px] text-gray-700">{order.total}</span>
                  <button className="flex items-center gap-2 text-[14px] font-semibold text-secondary-500 hover:text-secondary-600 transition-colors cursor-pointer">
                    View Details
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path d="M2 8h12M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Browsing History */}
            <div className="bg-white border border-gray-100 rounded-[4px]">
              <SectionHeading title="Browsing History" action="View All" />
              <div className="grid grid-cols-4 divide-x divide-gray-100 px-3 pt-5 pb-3">
                {BROWSING_PRODUCTS.map((product, i) => (
                  <div key={i} className="px-3 flex flex-col gap-3">
                    <div className="relative">
                      <img src={product.img} alt={product.name} className="w-full h-[172px] object-contain" />
                      {product.badge && (
                        <span className={`absolute top-3 left-3 ${product.badge.color} text-white text-[12px] font-semibold px-[10px] py-[5px] rounded-[2px]`}>
                          {product.badge.label}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <StarRating rating={product.rating} />
                      <span className="text-[12px] text-gray-500">({product.reviews})</span>
                    </div>
                    <p className="text-[14px] text-gray-900 leading-5 line-clamp-2">{product.name}</p>
                    <p className="text-[14px] font-semibold text-secondary-500">{product.price}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-4 pb-6 pt-2">
                <button className="w-10 h-10 rounded-full border-[1.5px] border-primary-500 flex items-center justify-center text-primary-500 hover:bg-primary-50 transition-colors cursor-pointer">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className="flex items-center gap-2">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className={`h-2 rounded-full transition-all ${i === 0 ? "w-4 bg-primary-500" : "w-2 bg-primary-200"}`} />
                  ))}
                </div>
                <button className="w-10 h-10 rounded-full border-[1.5px] border-primary-500 flex items-center justify-center text-primary-500 hover:bg-primary-50 transition-colors cursor-pointer">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
