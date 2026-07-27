import type {
  ProductListItemDto,
  ProductResponseDto,
  CartItemResponseDto,
} from "@/api/main";
import type { Product } from "@/components/commons/product-card";

const PLACEHOLDER_IMG = "/no-image.svg";

export function mapProductListItem(p: ProductListItemDto): Product {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    seller: "Marlo",
    price: p.basePrice,
    was: null,
    rating: 0,
    reviews: 0,
    badge: p.isFeatured ? "gold" : null,
    img: PLACEHOLDER_IMG,
  };
}

export function mapProductResponse(p: ProductResponseDto): Product {
  const primary = p.images.find((i) => i.isPrimary) ?? p.images[0];
  const firstVariant = p.variants[0];
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    seller: "Marlo",
    price: firstVariant?.price ?? p.basePrice,
    was: null,
    rating: 0,
    reviews: 0,
    badge: p.isFeatured ? "gold" : null,
    img: primary?.url ?? PLACEHOLDER_IMG,
  };
}

export interface CartLine {
  lineId: string;
  img: string;
  name: string;
  seller: string;
  variant: string;
  price: number;
  was?: number;
  qty: number;
}

export function mapCartItem(item: CartItemResponseDto): CartLine {
  return {
    lineId: item.id,
    img: PLACEHOLDER_IMG,
    name: item.variant.name,
    seller: "Marlo",
    variant: item.variant.name,
    price: item.variant.price,
    qty: item.quantity,
  };
}
