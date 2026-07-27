import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { productsControllerFindBySlug } from "@/api/main";
import { mainService } from "@/lib/api/client";
import { PdpClient } from "./_components/pdp-client";
import { PageBreadcrumb } from "@/components/commons/breadcrumb";
import { Container } from "@/components/commons/container";

// No React `cache()` wrapper needed: the API client now runs on native fetch,
// which Next.js already dedupes per render (same URL+options called from
// generateMetadata and the page below hits the network once).
async function fetchProduct(slug: string) {
  try {
    return await mainService.request(productsControllerFindBySlug)({
      path: { slug },
    });
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

  const primaryImage = product.images.find((i) => i.isPrimary) ?? product.images[0];

  return {
    title: `${product.name} | Marlo`,
    description: `Mua ${product.name} chính hãng tại Marlo. Giao hàng nhanh, đổi trả miễn phí.`,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: primaryImage ? { images: [primaryImage.url] } : undefined,
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
      <Container className="py-6 pb-20">
        <PageBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/search" },
            { label: product.name },
          ]}
        />
        <PdpClient product={product} />
      </Container>
    </div>
  );
}
