import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FLAGSHIP, MID_RANGE } from "@/app/(shop)/categories/_data/phones";
import { PdpClient } from "./_components/pdp-client";
import Link from "next/link";

const ALL_PHONES = [...FLAGSHIP, ...MID_RANGE];

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const phone = ALL_PHONES.find((p) => p.id === slug);
  if (!phone) return {};
  return {
    title: `${phone.name} | Marlo`,
    description: `Mua ${phone.name} chính hãng tại Marlo. Giao hàng nhanh, đổi trả miễn phí.`,
  };
}

export default async function ProductDetailPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const phone = ALL_PHONES.find((p) => p.id === slug);
  if (!phone) notFound();

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-16 py-8 pb-20">
        {/* Breadcrumb */}
        <nav
          className="text-[13px] text-text-secondary mb-5"
        >
          <Link
            href="/"
            className="hover:text-[#141210] transition-colors no-underline"
          >
            Trang chủ
          </Link>
          {" · "}
          <Link
            href="/phones"
            className="hover:text-[#141210] transition-colors no-underline"
          >
            Điện thoại
          </Link>
          {" · "}
          <span className="text-[#141210] font-semibold">{phone.name}</span>
        </nav>
        <PdpClient phone={phone} />
      </div>
    </div>
  );
}
