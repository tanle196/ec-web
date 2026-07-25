import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/commons/container";

/* ── Figma assets (expire 7 days) ─────────────────────────────────── */
const IMG_BANNER   = "https://www.figma.com/api/mcp/asset/d533b723-a754-46dd-a876-a0eef015971b";
const IMG_TOZO     = "https://www.figma.com/api/mcp/asset/f258da0a-a275-4d3d-893e-1d7f8a04f3b1";
const IMG_SAMSUNG  = "https://www.figma.com/api/mcp/asset/14c365f4-cc55-45a3-b098-6140c5cdbb57";
const IMG_HDMI     = "https://www.figma.com/api/mcp/asset/24d53fbd-cc48-4643-b28c-fab3a7f00e8d";
const IMG_WASHER   = "https://www.figma.com/api/mcp/asset/f169cef0-9acb-4618-bfc1-2ef82fb6fa09";
const IMG_HEADSET  = "https://www.figma.com/api/mcp/asset/992ebb0d-3654-4646-88a3-111d9712a388";
const IMG_TRIPOD   = "https://www.figma.com/api/mcp/asset/e4d14ecd-c176-46f9-bf56-ef28cc2ebc38";
const IMG_DELL     = "https://www.figma.com/api/mcp/asset/8d48eb8e-7673-479e-8420-cca07cc62f67";
const IMG_TV       = "https://www.figma.com/api/mcp/asset/900d28d3-d754-499d-bb43-b95f041d5c41";

/* ── Types ─────────────────────────────────────────────────────────── */
type Badge = { label: string; cls: string } | null;
interface GridProduct {
  img: string; name: string; price: string; was?: string;
  badge: Badge; stars: number; reviews: string;
}

/* ── Data ──────────────────────────────────────────────────────────── */
const PRODUCTS: GridProduct[] = [
  { img: IMG_TOZO,    name: "TOZO T6 True Wireless Earbuds Bluetooth Headphon…", price: "$70",    badge: { label: "HOT", cls: "bg-danger-500 text-white" },         stars: 5, reviews: "(738)" },
  { img: IMG_SAMSUNG, name: "Samsung Electronics Samsung Galaxy S21 5G",          price: "$2,300", badge: null,                                                       stars: 5, reviews: "(536)" },
  { img: IMG_HDMI,    name: "Amazon Basics High-Speed HDMI Cable (18 Gbps, 4K…", price: "$360",   badge: { label: "BEST DEALS", cls: "bg-secondary-500 text-white" }, stars: 5, reviews: "(423)" },
  { img: IMG_WASHER,  name: "Portable Washing Machine, 11lbs capacity Model 18NMF…", price: "$80", badge: null,                                                      stars: 4, reviews: "(816)" },
  { img: IMG_HEADSET, name: "Wired Over-Ear Gaming Headphones with USB",          price: "$1,500", badge: null,                                                       stars: 5, reviews: "(647)" },
  { img: IMG_TRIPOD,  name: "Polaroid 57-Inch Photo/Video Tripod with Deluxe Tripod Ca…", price: "$1,200", was: "$1600", badge: { label: "25% OFF", cls: "bg-warning-300 text-gray-900" }, stars: 4, reviews: "(877)" },
  { img: IMG_DELL,    name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor", price: "$250", badge: null,                                                        stars: 5, reviews: "(426)" },
  { img: IMG_TV,      name: "4K UHD LED Smart TV with Chromecast Built-in",       price: "$220",   badge: { label: "SALE", cls: "bg-success-500 text-white" },        stars: 5, reviews: "(583)" },
];

const TABS = ["All Product", "Smart Phone", "Laptop", "Headphone", "TV"] as const;

/* ── Star row ─────────────────────────────────────────────────────── */
function Stars({ filled, count }: { filled: number; count: string }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" aria-hidden
          fill={i < filled ? "#EFD33D" : "#E4E7E9"}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span className="text-body-xs text-gray-500 ml-0.5">{count}</span>
    </div>
  );
}

/* ── Product card (234×320) ──────────────────────────────────────── */
function ProductCard({ product }: { product: GridProduct }) {
  return (
    <div className="bg-white border border-gray-100 rounded-sm overflow-hidden flex flex-col group">
      <div className="h-[172px] relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.img} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
        {product.badge && (
          <span className={`absolute top-2.5 left-2.5 px-2.5 py-[5px] rounded-sm text-body-xs font-semibold ${product.badge.cls}`}>
            {product.badge.label}
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <Stars filled={product.stars} count={product.reviews} />
        <p className="text-body-sm text-gray-900 line-clamp-2 leading-5">{product.name}</p>
        <div className="flex items-center gap-1">
          {product.was && <span className="text-body-sm text-gray-400 line-through">{product.was}</span>}
          <span className="text-body-sm font-semibold text-secondary-500">{product.price}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Sidebar promotional banner ──────────────────────────────────── */
function SidebarBanner() {
  return (
    <div className="w-[312px] shrink-0 h-[716px] rounded-sm overflow-hidden relative bg-warning-300">
      {/* Text content */}
      <div className="absolute top-[32px] left-0 right-0 flex flex-col gap-4 items-center px-8 text-center">
        <div className="flex flex-col gap-2">
          <p className="text-body-sm font-semibold text-danger-600 uppercase">Computer & Accessories</p>
          <p className="text-heading-1 font-semibold text-gray-900 leading-10">32% Discount</p>
        </div>
        <p className="text-body-md text-gray-700">For all electronics products</p>
        <div className="flex items-center gap-2">
          <span className="text-body-sm font-medium text-gray-900">Offers ends in:</span>
          <span className="bg-white text-gray-900 font-semibold text-body-sm px-3 py-1.5 rounded-sm">
            ENDS OF CHRISTMAS
          </span>
        </div>
        <Link
          href="/sale"
          className="bg-primary-500 hover:bg-primary-600 transition-colors text-white font-bold text-body-md uppercase tracking-[0.192px] px-8 h-14 flex items-center gap-3 rounded-sm no-underline"
        >
          Shop now <ArrowRight size={22} strokeWidth={2} aria-hidden />
        </Link>
      </div>
      {/* Product image fills the bottom half */}
      <div className="absolute bottom-0 left-0 right-0 h-[60%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMG_BANNER} alt="" className="w-full h-full object-cover" aria-hidden />
      </div>
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────────── */
export function FeaturedGrid() {
  return (
    <section className="bg-white py-18">
      <Container>
        <div className="flex gap-6">
          <SidebarBanner />

          <div className="flex-1 flex flex-col gap-6">
            {/* Heading + tabs */}
            <div className="flex items-center justify-between">
              <h2 className="text-heading-3 font-semibold text-gray-900">Featured Products</h2>
              <div className="flex items-center gap-4">
                {/* Tabs */}
                <div className="flex">
                  {TABS.map((tab, i) => (
                    <button
                      key={tab}
                      className={`px-2 py-2 text-body-sm transition-colors whitespace-nowrap ${
                        i === 0
                          ? "font-semibold text-gray-900 border-b-2 border-primary-500"
                          : "font-normal text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <Link href="/products" className="flex items-center gap-2 text-body-sm font-semibold text-primary-500 whitespace-nowrap">
                  Browse All Product <ArrowRight size={18} strokeWidth={2} aria-hidden />
                </Link>
              </div>
            </div>

            {/* 4×2 product grid */}
            <div className="grid grid-cols-4 gap-4">
              {PRODUCTS.map((p) => (
                <ProductCard key={p.name} product={p} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
