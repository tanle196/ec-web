import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  slug: string;
  imageUrl?: string;
}

export function ProductCard({ name, price, slug }: ProductCardProps) {
  return (
    <Link href={`/products/${slug}`} className="group block">
      <div className="aspect-square bg-zinc-100 rounded-lg mb-3 overflow-hidden">
        <div className="w-full h-full bg-zinc-200 group-hover:bg-zinc-300 transition-colors" />
      </div>
      <h3 className="font-medium text-sm">{name}</h3>
      <p className="text-sm text-zinc-500 mt-0.5">
        {price.toLocaleString("vi-VN")}₫
      </p>
    </Link>
  );
}
