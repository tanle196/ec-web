export type BadgeKind = "new" | "sale" | "discount" | "gold" | null;

export interface Phone {
  id: string;
  name: string;
  seller: string;
  price: number;
  was?: number | null;
  rating: number;
  reviews: number;
  badge: BadgeKind;
  discount?: number;
  img: string;
}

export interface Brand {
  id: string;
  name: string;
  count: number;
}

export const FLAGSHIP: Phone[] = [
  { id: "iphone-16-pro-max", name: "iPhone 16 Pro Max 256GB", seller: "Apple Store VN", price: 33990000, was: 37990000, rating: 4.9, reviews: 8421, badge: "new", img: "/phone-orange.svg" },
  { id: "samsung-s25-ultra", name: "Samsung Galaxy S25 Ultra 256GB", seller: "Samsung Premium", price: 29990000, was: 33990000, rating: 4.8, reviews: 5234, badge: "discount", discount: 12, img: "/phone-green.svg" },
  { id: "google-pixel-9-pro", name: "Google Pixel 9 Pro 128GB", seller: "Google Store VN", price: 22990000, rating: 4.7, reviews: 1840, badge: "new", img: "/phone-orange.svg" },
  { id: "xiaomi-15-ultra", name: "Xiaomi 15 Ultra 256GB", seller: "Xiaomi Việt Nam", price: 19990000, was: 23990000, rating: 4.6, reviews: 2341, badge: "sale", img: "/phone-green.svg" },
];

export const MID_RANGE: Phone[] = [
  { id: "iphone-16", name: "iPhone 16 128GB", seller: "Apple Store VN", price: 22990000, rating: 4.8, reviews: 12421, badge: "new", img: "/phone-orange.svg" },
  { id: "samsung-a56", name: "Samsung Galaxy A56 5G 256GB", seller: "Samsung Premium", price: 9990000, was: 11990000, rating: 4.6, reviews: 3420, badge: "discount", discount: 17, img: "/phone-green.svg" },
  { id: "redmi-note-14-pro", name: "Redmi Note 14 Pro+ 5G 256GB", seller: "Xiaomi Việt Nam", price: 7490000, was: 8990000, rating: 4.5, reviews: 6789, badge: "sale", img: "/phone-orange.svg" },
  { id: "oppo-reno13", name: "OPPO Reno 13 Pro 256GB", seller: "OPPO Việt Nam", price: 8990000, rating: 4.4, reviews: 2103, badge: null, img: "/phone-green.svg" },
];

export const BRANDS: Brand[] = [
  { id: "apple", name: "Apple", count: 24 },
  { id: "samsung", name: "Samsung", count: 31 },
  { id: "google", name: "Google", count: 8 },
  { id: "xiaomi", name: "Xiaomi", count: 19 },
  { id: "oppo", name: "OPPO", count: 14 },
  { id: "vivo", name: "Vivo", count: 11 },
  { id: "sony", name: "Sony", count: 6 },
  { id: "nokia", name: "Nokia", count: 7 },
];
