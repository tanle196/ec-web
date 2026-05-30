import { FLAGSHIP, MID_RANGE, BRANDS } from "./phones";
import type { Phone, Brand } from "./phones";

export type { Phone, Brand };

export interface TrustPill {
  label: string;
  color: string;
}

export interface HeroConfig {
  badge: string;
  headlineLine1: string;
  headlineLine2: string; // rendered in persimmon
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  trustPills: TrustPill[];
  images: string[]; // 1 = single centered, 2 = dual mockup
  imgAlt: string;
}

export interface ProductRowConfig {
  eyebrow: string;
  title: string;
  action: string;
  href: string;
  products: Phone[];
}

export interface EditorialPanel {
  bg: string;
  textColor: string;
  badge: string;
  badgeBg?: string;
  badgeColor?: string;
  headline: string;
  subtitle: string;
  cta: string;
  ctaHref: string;
  ctaBg: string;
  ctaTextColor: string;
  imgSrc: string;
}

export interface CategoryConfig {
  slug: string;
  name: string;
  description: string;
  hero: HeroConfig;
  rows: ProductRowConfig[];
  editorial?: { left: EditorialPanel; right: EditorialPanel };
  brands?: Brand[];
}

// ─── Laptop products ───────────────────────────────────────────────────────
const LAPTOPS_PREMIUM: Phone[] = [
  { id: "macbook-pro-16-m4", name: "MacBook Pro 16\" M4 Pro 24GB", seller: "Apple Store VN", price: 79990000, was: 85990000, rating: 4.9, reviews: 3241, badge: "new", img: "/phone-orange.svg" },
  { id: "dell-xps-15-oled", name: "Dell XPS 15 OLED i9 32GB", seller: "Dell Việt Nam", price: 54990000, was: 62990000, rating: 4.7, reviews: 1820, badge: "discount", discount: 11, img: "/phone-green.svg" },
  { id: "asus-proart-16", name: "ASUS ProArt Studiobook 16 OLED", seller: "ASUS Việt Nam", price: 46990000, was: 52990000, rating: 4.6, reviews: 987, badge: "sale", img: "/phone-orange.svg" },
  { id: "msi-creator-z16", name: "MSI Creator Z16 HX Studio", seller: "MSI Việt Nam", price: 49990000, rating: 4.5, reviews: 612, badge: null, img: "/phone-green.svg" },
];

const LAPTOPS_MIDRANGE: Phone[] = [
  { id: "macbook-air-m3", name: "MacBook Air 15\" M3 16GB", seller: "Apple Store VN", price: 38990000, rating: 4.8, reviews: 8421, badge: "new", img: "/phone-orange.svg" },
  { id: "thinkpad-x1-carbon", name: "Lenovo ThinkPad X1 Carbon Gen 12", seller: "Lenovo VN", price: 42990000, was: 49990000, rating: 4.6, reviews: 1204, badge: "discount", discount: 14, img: "/phone-green.svg" },
  { id: "hp-spectre-x360-14", name: "HP Spectre x360 14\" OLED", seller: "HP Việt Nam", price: 34990000, was: 39990000, rating: 4.5, reviews: 743, badge: "sale", img: "/phone-orange.svg" },
  { id: "surface-pro-11", name: "Surface Pro 11 Copilot+ 16GB", seller: "Microsoft VN", price: 32990000, rating: 4.4, reviews: 529, badge: null, img: "/phone-green.svg" },
];

// ─── Audio products ────────────────────────────────────────────────────────
const AUDIO_HEADPHONES: Phone[] = [
  { id: "sony-wh1000xm6", name: "Sony WH-1000XM6 Wireless NC", seller: "Sony Việt Nam", price: 8990000, was: 10990000, rating: 4.9, reviews: 5621, badge: "sale", img: "/headphones.svg" },
  { id: "airpods-max-2", name: "AirPods Max 2 USB-C", seller: "Apple Store VN", price: 14990000, rating: 4.8, reviews: 3420, badge: "new", img: "/headphones.svg" },
  { id: "bose-qc45-ii", name: "Bose QuietComfort 45 II", seller: "Bose VN", price: 6990000, was: 8490000, rating: 4.7, reviews: 2103, badge: "discount", discount: 18, img: "/headphones.svg" },
  { id: "jabra-evolve2-85", name: "Jabra Evolve2 85 ANC", seller: "Jabra VN", price: 9490000, was: 11990000, rating: 4.6, reviews: 841, badge: "sale", img: "/headphones.svg" },
];

const AUDIO_EARBUDS: Phone[] = [
  { id: "airpods-pro-3", name: "AirPods Pro 3 USB-C", seller: "Apple Store VN", price: 6490000, rating: 4.9, reviews: 12841, badge: "new", img: "/headphones.svg" },
  { id: "samsung-buds3-pro", name: "Samsung Galaxy Buds3 Pro", seller: "Samsung Premium", price: 4990000, was: 5990000, rating: 4.7, reviews: 3241, badge: "discount", discount: 17, img: "/headphones.svg" },
  { id: "jbl-flip-7", name: "JBL Flip 7 Portable Speaker", seller: "JBL Việt Nam", price: 2990000, was: 3490000, rating: 4.6, reviews: 6782, badge: "sale", img: "/headphones.svg" },
  { id: "bose-soundlink-flex", name: "Bose SoundLink Flex Gen 2", seller: "Bose VN", price: 4490000, rating: 4.5, reviews: 1923, badge: null, img: "/headphones.svg" },
];

// ─── Home products ─────────────────────────────────────────────────────────
const HOME_FEATURED: Phone[] = [
  { id: "dyson-v15-detect", name: "Dyson V15 Detect Absolute", seller: "Dyson Việt Nam", price: 18990000, was: 22990000, rating: 4.8, reviews: 2341, badge: "sale", img: "/phone-orange.svg" },
  { id: "xiaomi-robot-s20", name: "Xiaomi Robot Vacuum S20 Max+", seller: "Xiaomi Việt Nam", price: 6990000, was: 8490000, rating: 4.6, reviews: 3102, badge: "discount", discount: 18, img: "/phone-green.svg" },
  { id: "panasonic-inverter-18", name: "Panasonic Inverter 18.000 BTU", seller: "Panasonic VN", price: 12990000, rating: 4.5, reviews: 1820, badge: "new", img: "/phone-orange.svg" },
  { id: "samsung-bespoke-ai", name: "Samsung Bespoke AI Fridge 660L", seller: "Samsung Premium", price: 29990000, was: 34990000, rating: 4.7, reviews: 892, badge: "discount", discount: 12, img: "/phone-green.svg" },
];

const HOME_KITCHEN: Phone[] = [
  { id: "bosch-series-8-washer", name: "Bosch Series 8 Máy giặt 10kg", seller: "Bosch Việt Nam", price: 22990000, was: 26990000, rating: 4.7, reviews: 1204, badge: "sale", img: "/phone-orange.svg" },
  { id: "philips-airfryer-xxl", name: "Philips Air Fryer XXL 7.3L", seller: "Philips VN", price: 3990000, was: 4990000, rating: 4.6, reviews: 8421, badge: "discount", discount: 20, img: "/phone-green.svg" },
  { id: "delonghi-magnifica-evo", name: "De'Longhi Magnifica Evo Máy pha cà phê", seller: "De'Longhi VN", price: 14990000, was: 17990000, rating: 4.8, reviews: 2103, badge: "sale", img: "/phone-orange.svg" },
  { id: "xiaomi-purifier-4-pro", name: "Xiaomi Smart Air Purifier 4 Pro", seller: "Xiaomi Việt Nam", price: 4490000, rating: 4.5, reviews: 5621, badge: "new", img: "/phone-green.svg" },
];

// ─── Category configs ──────────────────────────────────────────────────────
export const CATEGORIES: CategoryConfig[] = [
  {
    slug: "phones",
    name: "Điện thoại",
    description: "iPhone, Samsung, Google Pixel, Xiaomi — tất cả chính hãng, bảo hành đầy đủ.",
    hero: {
      badge: "Mới ra mắt · Tháng 5/2026",
      headlineLine1: "Điện thoại mới.",
      headlineLine2: "Giá không tưởng.",
      subtitle: "iPhone, Samsung, Google Pixel, Xiaomi — tất cả chính hãng, bảo hành đầy đủ, giao hàng trong 2 giờ.",
      primaryCta: { label: "Mua ngay", href: "/categories/phones" },
      secondaryCta: { label: "So sánh giá", href: "/categories/phones" },
      trustPills: [
        { label: "Chính hãng 100%", color: "#2A6FDB" },
        { label: "Bảo hành 12 tháng", color: "#1F8A5B" },
        { label: "Giao trong 2 giờ", color: "#FF5B2E" },
      ],
      images: ["/phone-orange.svg", "/phone-green.svg"],
      imgAlt: "Điện thoại mới nhất",
    },
    rows: [
      { eyebrow: "Flagship 2025 · 2026", title: "Flagship xịn nhất năm", action: "Xem tất cả", href: "/categories/phones", products: FLAGSHIP },
      { eyebrow: "Tầm giá 5–15 triệu", title: "Hiệu năng cao, giá cực tốt", action: "Xem thêm", href: "/categories/phones", products: MID_RANGE },
    ],
    editorial: {
      left: {
        bg: "#1F4D3C", textColor: "#F6F1E8",
        badge: "Đổi máy cũ", badgeBg: "#FFD83D", badgeColor: "#141210",
        headline: "Đổi máy cũ,\nnhận ưu đãi\nlên đến 5 triệu.",
        subtitle: "Trade-in điện thoại cũ của bạn, nhận ngay credit để mua máy mới với giá tốt hơn.",
        cta: "Ước tính giá thu đổi", ctaHref: "/trade-in",
        ctaBg: "#F6F1E8", ctaTextColor: "#141210",
        imgSrc: "/phone-orange.svg",
      },
      right: {
        bg: "#FF5B2E", textColor: "white",
        badge: "Hôm nay thôi", badgeBg: "white", badgeColor: "#FF5B2E",
        headline: "Flash sale\nđiện thoại.\nGiảm đến 30%.",
        subtitle: "Số lượng có hạn. Nhanh tay kẻo hết — deal xịn chỉ trong hôm nay.",
        cta: "Xem flash sale", ctaHref: "/categories/phones",
        ctaBg: "#141210", ctaTextColor: "white",
        imgSrc: "/phone-green.svg",
      },
    },
    brands: BRANDS,
  },
  {
    slug: "laptop",
    name: "Laptop",
    description: "MacBook, Dell XPS, ThinkPad, Surface — laptop cho mọi nhu cầu làm việc và sáng tạo.",
    hero: {
      badge: "Mùa tựu trường · Giảm đến 7 triệu",
      headlineLine1: "Làm việc không giới hạn.",
      headlineLine2: "Laptop cho người thật sự dùng.",
      subtitle: "MacBook, Dell XPS, ThinkPad, Surface — hiệu năng thật, pin thật, không thổi phồng thông số.",
      primaryCta: { label: "Khám phá laptop", href: "/categories/laptop" },
      secondaryCta: { label: "So sánh cấu hình", href: "/categories/laptop" },
      trustPills: [
        { label: "Windows & macOS", color: "#2A6FDB" },
        { label: "Bảo hành chính hãng", color: "#1F8A5B" },
        { label: "Đổi trả 30 ngày", color: "#FF5B2E" },
      ],
      images: ["/phone-orange.svg"],
      imgAlt: "Laptop",
    },
    rows: [
      { eyebrow: "Workstation & Creator", title: "Hiệu năng đỉnh, không thỏa hiệp", action: "Xem tất cả", href: "/categories/laptop", products: LAPTOPS_PREMIUM },
      { eyebrow: "Tầm giá 15–45 triệu", title: "Mỏng nhẹ, pin trâu, giá hợp lý", action: "Xem thêm", href: "/categories/laptop", products: LAPTOPS_MIDRANGE },
    ],
    editorial: {
      left: {
        bg: "#141210", textColor: "#F6F1E8",
        badge: "Dành cho sinh viên", badgeBg: "#FFD83D", badgeColor: "#141210",
        headline: "Laptop đầu tiên.\nChọn đúng\nngay từ đầu.",
        subtitle: "Tư vấn miễn phí từ chuyên gia Marlo — tìm laptop phù hợp ngân sách và nhu cầu của bạn.",
        cta: "Nhận tư vấn", ctaHref: "/categories/laptop",
        ctaBg: "#FF5B2E", ctaTextColor: "white",
        imgSrc: "/phone-orange.svg",
      },
      right: {
        bg: "#2A6FDB", textColor: "white",
        badge: "Trả góp 0%", badgeBg: "white", badgeColor: "#2A6FDB",
        headline: "Trả góp 0%,\n12 tháng,\nkhông điều kiện.",
        subtitle: "Mua laptop tầm 20–80 triệu, trả góp qua thẻ tín dụng không phí phát sinh.",
        cta: "Xem điều kiện", ctaHref: "/categories/laptop",
        ctaBg: "#141210", ctaTextColor: "white",
        imgSrc: "/phone-green.svg",
      },
    },
  },
  {
    slug: "audio",
    name: "Audio",
    description: "Tai nghe, loa, earbuds — âm thanh chất lượng studio, giá Marlo.",
    hero: {
      badge: "Flash sale · Giảm đến 20%",
      headlineLine1: "Nghe thật. Cảm thật.",
      headlineLine2: "Không thỏa hiệp âm thanh.",
      subtitle: "Sony, Apple, Bose, JBL — tai nghe chống ồn đỉnh, loa di động bền, earbuds kết nối mượt.",
      primaryCta: { label: "Mua audio", href: "/categories/audio" },
      secondaryCta: { label: "Nghe thử", href: "/categories/audio" },
      trustPills: [
        { label: "Chống ồn ANC", color: "#2A6FDB" },
        { label: "Pin 30+ giờ", color: "#1F8A5B" },
        { label: "Hàng chính hãng", color: "#FF5B2E" },
      ],
      images: ["/headphones.svg"],
      imgAlt: "Tai nghe cao cấp",
    },
    rows: [
      { eyebrow: "Over-ear · Chống ồn", title: "Tai nghe cao cấp, tập trung tuyệt đối", action: "Xem tất cả", href: "/categories/audio", products: AUDIO_HEADPHONES },
      { eyebrow: "Earbuds & Loa", title: "Nhỏ gọn, âm thanh lớn", action: "Xem thêm", href: "/categories/audio", products: AUDIO_EARBUDS },
    ],
    editorial: {
      left: {
        bg: "#1F1B18", textColor: "#F6F1E8",
        badge: "Dành cho dân audiophile", badgeBg: "#FFD83D", badgeColor: "#141210",
        headline: "Studio-grade.\nVề tận nhà bạn.",
        subtitle: "Tai nghe planar magnetic, DAC/AMP, cable cao cấp — dành cho người nghe nhạc nghiêm túc.",
        cta: "Khám phá Hi-Fi", ctaHref: "/categories/audio",
        ctaBg: "#FF5B2E", ctaTextColor: "white",
        imgSrc: "/headphones.svg",
      },
      right: {
        bg: "#FF5B2E", textColor: "white",
        badge: "Hôm nay thôi", badgeBg: "white", badgeColor: "#FF5B2E",
        headline: "Audio, giảm 20%.\nMột ngày.\nMột giá.",
        subtitle: "Over-ear, true wireless, loa di động — số lượng có hạn, hết là thôi.",
        cta: "Mua ngay", ctaHref: "/categories/audio",
        ctaBg: "#141210", ctaTextColor: "white",
        imgSrc: "/headphones.svg",
      },
    },
  },
  {
    slug: "home",
    name: "Nhà cửa",
    description: "Đồ gia dụng thông minh, thiết bị bếp, máy lọc không khí — nhà đẹp hơn mỗi ngày.",
    hero: {
      badge: "Nhà thông minh · Tiết kiệm đến 5 triệu",
      headlineLine1: "Nhà thông minh hơn.",
      headlineLine2: "Bắt đầu từ hôm nay.",
      subtitle: "Dyson, Xiaomi, Bosch, Philips — thiết bị gia dụng chất lượng cao, giao nhanh, lắp đặt tận nhà.",
      primaryCta: { label: "Mua đồ gia dụng", href: "/categories/home" },
      trustPills: [
        { label: "Lắp đặt tận nhà", color: "#2A6FDB" },
        { label: "Bảo hành 2 năm", color: "#1F8A5B" },
        { label: "Đổi trả 30 ngày", color: "#FF5B2E" },
      ],
      images: ["/phone-orange.svg"],
      imgAlt: "Đồ gia dụng",
    },
    rows: [
      { eyebrow: "Điện gia dụng · Smart home", title: "Sống hiện đại, tiết kiệm điện", action: "Xem tất cả", href: "/categories/home", products: HOME_FEATURED },
      { eyebrow: "Bếp & Nhà bếp", title: "Nấu ăn dễ hơn, ngon hơn", action: "Xem thêm", href: "/categories/home", products: HOME_KITCHEN },
    ],
    editorial: {
      left: {
        bg: "#3A4A3A", textColor: "#F6F1E8",
        badge: "Bộ sưu tập mới", badgeBg: "#FFD83D", badgeColor: "#141210",
        headline: "Thủ công.\nGiao nhanh 2 ngày.",
        subtitle: "Sản phẩm handmade từ các nhà làm độc lập. Chất liệu tự nhiên, thiết kế tối giản.",
        cta: "Khám phá thủ công mỹ nghệ", ctaHref: "/categories/home",
        ctaBg: "#F6F1E8", ctaTextColor: "#141210",
        imgSrc: "/phone-orange.svg",
      },
      right: {
        bg: "#FF5B2E", textColor: "white",
        badge: "Combo smart home", badgeBg: "white", badgeColor: "#FF5B2E",
        headline: "Bộ nhà thông minh.\nTiết kiệm 30%.",
        subtitle: "Đèn, ổ cắm, camera, robot hút bụi — mua combo tiết kiệm hơn mua lẻ.",
        cta: "Xem combo", ctaHref: "/categories/home",
        ctaBg: "#141210", ctaTextColor: "white",
        imgSrc: "/phone-green.svg",
      },
    },
  },
];

export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
