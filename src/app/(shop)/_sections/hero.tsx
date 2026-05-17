import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="bg-zinc-900 text-white">
      <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center gap-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Mua sắm thông minh
          <br />
          <span className="text-zinc-400">giá tốt mỗi ngày</span>
        </h1>
        <p className="max-w-md text-zinc-400 text-lg">
          Hàng nghìn sản phẩm chính hãng, giao nhanh toàn quốc.
        </p>
        <div className="flex gap-3">
          <Button asChild size="lg">
            <Link href="/products">Khám phá ngay</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-zinc-600 text-white hover:bg-zinc-800">
            <Link href="/categories">Danh mục</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
