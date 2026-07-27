import Link from "next/link";
import { ArrowRight, Heart, ShoppingCart, Eye } from "lucide-react";
import { Container } from "@/components/commons/container";

/* ── Figma assets (expire 7 days) ─────────────────────────────────── */
const IMG_XBOX     = "https://www.figma.com/api/mcp/asset/8ad7dc3a-15b0-4e90-a0c4-1c70c97afb2f";
const IMG_SONY_CAM = "https://www.figma.com/api/mcp/asset/9e7842ea-56df-4c29-8576-69c0bd2d9e9d";
const IMG_JBL      = "https://www.figma.com/api/mcp/asset/9fd27f97-fe3c-4a75-84ee-40b6af902e62";
const IMG_TV       = "https://www.figma.com/api/mcp/asset/c2dd1d81-40a3-4593-b824-9f7d9b8b264e";
const IMG_CARB     = "https://www.figma.com/api/mcp/asset/55e51f60-0bd8-4c34-ae51-0799a1f36c8d";
const IMG_PHONE    = "https://www.figma.com/api/mcp/asset/8ea1f04e-32ec-4edf-a831-92e22b34d9a5";
const IMG_WASHER   = "https://www.figma.com/api/mcp/asset/5fb3c2c7-ff54-4de3-a41d-4635d2a0a90a";
const IMG_BOSE     = "https://www.figma.com/api/mcp/asset/4d3018bd-b1b1-4224-8e28-57e2af95f1f3";
const IMG_DELL     = "https://www.figma.com/api/mcp/asset/dfec408f-5d9d-4d5b-80db-6e18cbf923e7";

/* ── Types ─────────────────────────────────────────────────────────── */
type BadgeType = { label: string; cls: string } | null;
interface SmallProduct {
  img: string; name: string; price: string; was?: string; badge: BadgeType;
}

/* ── Data ──────────────────────────────────────────────────────────── */
const SMALL_PRODUCTS: SmallProduct[] = [
  { img: IMG_BOSE,   name: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear…", price: "$2,300", badge: { label: "SOLD OUT", cls: "bg-gray-400 text-white" } },
  { img: IMG_PHONE,  name: "Simple Mobile 4G LTE Prepaid Smartphone", price: "$220", badge: null },
  { img: IMG_TV,     name: "4K UHD LED Smart TV with Chromecast Built-in", price: "$1,50", was: "$865", badge: { label: "19% OFF", cls: "bg-warning-300 text-gray-900" } },
  { img: IMG_SONY_CAM, name: "Sony DSCHX8 High Zoom Point & Shoot Camera", price: "$1,200", badge: null },
  { img: IMG_DELL,   name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor", price: "$299", badge: null },
  { img: IMG_WASHER, name: "Portable Washing Machine, 11lbs capacity Model 18NMFIAM", price: "$70", was: "$865.99", badge: null },
  { img: IMG_CARB,   name: "2-Barrel Carburetor Carb 2100 Engine Increase Horsepower", price: "$160", badge: { label: "HOT", cls: "bg-danger-500 text-white" } },
  { img: IMG_JBL,    name: "JBL FLIP 4 - Waterproof Portable Bluetooth Speaker - Black", price: "$250", was: "$360", badge: { label: "32% OFF", cls: "bg-warning-300 text-gray-900" } },
];

/* ── Small product card ────────────────────────────────────────────── */
function SmallCard({ product }: { product: SmallProduct }) {
  return (
    <div className="bg-white border border-gray-100 overflow-hidden group relative">
      {/* Image */}
      <div className="h-[188px] relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.img} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center" aria-label="Add to wishlist">
            <Heart size={20} className="text-white" />
          </button>
          <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center" aria-label="Add to cart">
            <ShoppingCart size={20} className="text-gray-900" />
          </button>
          <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center" aria-label="Quick view">
            <Eye size={20} className="text-gray-900" />
          </button>
        </div>
        {product.badge && (
          <span className={`absolute top-3 left-3 px-2.5 py-[5px] rounded-sm text-body-xs font-semibold ${product.badge.cls}`}>
            {product.badge.label}
          </span>
        )}
      </div>
      {/* Info */}
      <div className="p-4 flex flex-col gap-2">
        <p className="text-body-sm text-gray-900 line-clamp-2 leading-5">{product.name}</p>
        <div className="flex items-center gap-1">
          {product.was && <span className="text-body-sm text-gray-300 line-through">{product.was}</span>}
          <span className="text-body-sm font-semibold text-secondary-500">{product.price}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Star row ─────────────────────────────────────────────────────── */
function Stars({ filled = 5, count }: { filled?: number; count: string }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="20" height="20" viewBox="0 0 24 24" aria-hidden
          fill={i < filled ? "#EFD33D" : "#E4E7E9"}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span className="text-body-sm text-gray-500 ml-1">{count}</span>
    </div>
  );
}

/* ── Large featured card ──────────────────────────────────────────── */
function LargeCard() {
  return (
    <div className="bg-white border border-gray-100 w-[328px] shrink-0 relative flex flex-col">
      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
        <span className="px-2.5 py-[5px] rounded-sm text-body-xs font-semibold bg-warning-300 text-gray-900">32% OFF</span>
        <span className="px-2.5 py-[5px] rounded-sm text-body-xs font-semibold bg-danger-500 text-white">HOT</span>
      </div>
      {/* Image */}
      <div className="h-[296px] relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMG_XBOX} alt="Xbox Series S" className="absolute inset-0 w-full h-full object-contain p-4" />
      </div>
      {/* Info */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <Stars filled={4} count="(52,677)" />
        <p className="text-body-md text-gray-900 leading-6">
          Xbox Series S - 512GB SSD Console with Wireless Controller - EU Version
        </p>
        <div className="flex items-center gap-1">
          <span className="text-body-md text-gray-300 line-through">$865.99</span>
          <span className="text-body-lg font-semibold text-secondary-500">$442.12</span>
        </div>
        <p className="text-body-sm text-gray-600 leading-5">
          Games built using the Xbox Series X|S development kit showcase unparalleled load times, visuals.
        </p>
      </div>
      {/* Actions */}
      <div className="flex items-center gap-2 px-4 pb-4">
        <button className="w-12 h-12 bg-primary-100 flex items-center justify-center rounded-sm shrink-0" aria-label="Wishlist">
          <Heart size={20} className="text-primary-500" />
        </button>
        <button className="flex-1 h-12 bg-primary-500 hover:bg-primary-600 transition-colors text-white font-bold text-body-sm uppercase tracking-[0.168px] flex items-center justify-center gap-2 rounded-sm">
          <ShoppingCart size={18} aria-hidden />
          Add to Cart
        </button>
        <button className="w-12 h-12 bg-primary-100 flex items-center justify-center rounded-sm shrink-0" aria-label="Quick view">
          <Eye size={20} className="text-primary-500" />
        </button>
      </div>
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────────── */
export function BestDeals() {
  return (
    <section className="bg-white py-18">
      <Container>
        {/* Heading */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <h2 className="text-heading-3 font-semibold text-gray-900">Best Deals</h2>
            <div className="flex items-center gap-3">
              <span className="text-body-sm text-gray-900">Deals ends in</span>
              <div className="bg-warning-300 text-gray-900 font-semibold text-body-md px-3 py-1.5 rounded-sm flex items-center gap-1.5">
                <span>16d</span><span>:</span><span>21h</span><span>:</span><span>57m</span><span>:</span><span>23s</span>
              </div>
            </div>
          </div>
          <Link href="/products" className="flex items-center gap-2 text-body-sm font-semibold text-secondary-500">
            Browse All Product <ArrowRight size={18} strokeWidth={2} aria-hidden />
          </Link>
        </div>

        {/* Product layout */}
        <div className="flex gap-4">
          <LargeCard />
          <div className="grid grid-cols-4 gap-4 flex-1">
            {SMALL_PRODUCTS.map((p) => (
              <SmallCard key={p.name} product={p} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
