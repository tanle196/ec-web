import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { productsControllerFindOne } from "@/api/main";
import { mainService } from "@/lib/api/client";
import { PdpClient } from "./_components/pdp-client";
import { PageBreadcrumb } from "@/components/commons/breadcrumb";

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
    <div className="min-h-screen bg-muted">
      <div className="max-w-7xl mx-auto px-6 py-6 pb-20">
        <PageBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/search" },
            { label: product.name },
          ]}
        />
        <PdpClient product={product} />
      </div>
    </div>
  );
}
