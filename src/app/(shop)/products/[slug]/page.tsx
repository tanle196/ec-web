import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { productsControllerFindOne } from "@/api/main";
import { mainService } from "@/lib/api/client";
import { PdpClient } from "./_components/pdp-client";
import Link from "next/link";

async function fetchProduct(id: string) {
  try {
    return await mainService.request(productsControllerFindOne)({ path: { id } });
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} | Marlo`,
    description: `Mua ${product.name} chính hãng tại Marlo. Giao hàng nhanh, đổi trả miễn phí.`,
  };
}

export default async function ProductDetailPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await fetchProduct(slug);
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-16 py-8 pb-20">
        <nav className="text-[13px] text-text-secondary mb-5">
          <Link
            href="/"
            className="hover:text-foreground transition-colors no-underline"
          >
            Trang chủ
          </Link>
          {" · "}
          <Link
            href="/search"
            className="hover:text-foreground transition-colors no-underline"
          >
            Sản phẩm
          </Link>
          {" · "}
          <span className="text-foreground font-semibold">{product.name}</span>
        </nav>
        <PdpClient product={product} />
      </div>
    </div>
  );
}
