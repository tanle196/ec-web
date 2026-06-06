"use client";

import { useState } from "react";
import { ProductImage } from "@/components/commons/product-image";
import { Price } from "@/components/commons/price";
import { Stars } from "@/components/commons/stars";
import { SectionHeader } from "@/components/commons/section-header";
import { ProductGrid } from "@/components/commons/product-grid";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useAddToCart } from "@/queries/cart";
import { useProducts, useProductReviews } from "@/queries/products";
import { mapProductListItem } from "@/lib/api/mappers";
import type { ProductResponseDto, ProductVariantResponseDto } from "@/api/main";

const TABS = [
  { value: "details", label: "Chi tiết" },
  { value: "specs", label: "Thông số" },
  { value: "reviews", label: "Đánh giá" },
  { value: "shipping", label: "Vận chuyển" },
];

const PLACEHOLDER_IMG = "/no-image.svg";

function QtyStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="inline-flex items-center bg-white border border-marlo-border rounded-full h-12 px-1">
      <button
        onClick={() => onChange(Math.max(1, value - 1))}
        className="w-10 h-10 rounded-full border-0 bg-transparent cursor-pointer flex items-center justify-center text-foreground hover:bg-muted transition-colors duration-150"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <span className="font-mono-marlo font-semibold text-[15px] px-4 min-w-8 text-center text-foreground">
        {value}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        className="w-10 h-10 rounded-full border-0 bg-transparent cursor-pointer flex items-center justify-center text-foreground hover:bg-muted transition-colors duration-150"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
}

function Gallery({ images, mainAlt }: { images: string[]; mainAlt: string }) {
  const [active, setActive] = useState(0);
  const srcs = images.length > 0 ? images : [PLACEHOLDER_IMG];

  function prev() {
    setActive((a) => (a - 1 + srcs.length) % srcs.length);
  }
  function next() {
    setActive((a) => (a + 1) % srcs.length);
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-square bg-muted rounded-lg p-8 overflow-hidden group">
        <div className="relative w-full h-full">
          <ProductImage
            src={srcs[active]}
            alt={mainAlt}
            fill
            className="object-contain"
          />
        </div>
        {srcs.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Ảnh trước"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 border border-marlo-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 cursor-pointer hover:bg-white"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Ảnh sau"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 border border-marlo-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 cursor-pointer hover:bg-white"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {srcs.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {srcs.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="flex-none w-16 h-16 rounded-[8px] bg-muted p-1.5 cursor-pointer transition-all duration-150"
              style={{
                border:
                  active === i
                    ? "2px solid var(--foreground)"
                    : "1px solid var(--border)",
              }}
            >
              <ProductImage
                src={src}
                alt=""
                width={52}
                height={52}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function PdpClient({ product }: { product: ProductResponseDto }) {
  const [selectedVariant, setSelectedVariant] =
    useState<ProductVariantResponseDto | null>(product.variants[0] ?? null);
  const [qty, setQty] = useState(1);
  const [addedMsg, setAddedMsg] = useState("");

  const addToCart = useAddToCart();
  const reviewsQuery = useProductReviews(product.id);
  const relatedQuery = useProducts({ status: "published", limit: 4 });

  const relatedProducts = (relatedQuery.data?.data ?? [])
    .filter((p) => p.id !== product.id)
    .slice(0, 4)
    .map(mapProductListItem);

  const galleryImages = product.images
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((i) => i.url);

  const displayPrice = selectedVariant?.price ?? product.basePrice;
  const reviews = reviewsQuery.data?.data ?? [];

  function handleAddToCart() {
    if (!selectedVariant) return;
    addToCart.mutate(
      { variant_id: selectedVariant.id, quantity: qty },
      {
        onSuccess: () => {
          setAddedMsg("Đã thêm vào giỏ!");
          setTimeout(() => setAddedMsg(""), 2000);
        },
      },
    );
  }

  return (
    <>
      <div className="flex gap-10 items-start">
        <div className="flex-[1.2]">
          <Gallery images={galleryImages} mainAlt={product.name} />
        </div>

        <div className="flex-1">
          <div className="text-[12px] font-semibold tracking-[0.14em] uppercase text-text-secondary mb-1.5">
            Marlo
          </div>
          <h1 className="text-[clamp(28px,2.5vw,36px)] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground mb-3">
            {product.name}
          </h1>
          <div className="flex items-center gap-3.5 mb-6">
            <Stars rating={0} count={reviews.length} />
            <span className="text-text-tertiary">·</span>
            <a
              href="#reviews"
              className="text-[13px] text-foreground underline underline-offset-3"
            >
              {reviews.length} đánh giá
            </a>
          </div>

          <div className="flex items-baseline gap-3 mb-2">
            <Price amount={displayPrice} size="xl" />
          </div>
          <div className="text-[13px] text-text-secondary mb-7">
            hoặc 4 kỳ{" "}
            <strong className="text-foreground">
              {(displayPrice / 4).toLocaleString("vi-VN")}₫
            </strong>{" "}
            với Marlo Pay
          </div>

          {/* Variants */}
          {product.variants.length > 0 && (
            <div className="mb-7">
              <div className="flex items-baseline gap-2 mb-2.5">
                <span className="text-[13px] font-semibold tracking-[0.04em] uppercase text-text-secondary">
                  Phiên bản
                </span>
                {selectedVariant && (
                  <span className="text-[14px] text-foreground">
                    {selectedVariant.name}
                  </span>
                )}
              </div>
              <ToggleGroup
                type="single"
                value={selectedVariant?.id ?? ""}
                onValueChange={(v) => {
                  if (!v) return;
                  const found = product.variants.find((vr) => vr.id === v);
                  if (found) setSelectedVariant(found);
                }}
                spacing={1}
                className="gap-1.5 flex-wrap"
              >
                {product.variants.map((vr) => (
                  <ToggleGroupItem
                    key={vr.id}
                    value={vr.id}
                    disabled={vr.stock === 0}
                    className="h-auto px-4 py-2.5 rounded-[8px] border border-marlo-border bg-white text-[13px] font-semibold text-ink data-[state=on]:bg-ink data-[state=on]:text-white data-[state=on]:border-ink disabled:line-through disabled:text-text-disabled hover:bg-cream-2 data-[state=on]:hover:bg-ink"
                  >
                    {vr.name}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          )}

          {/* Add to cart */}
          <div className="flex items-center gap-3 mb-3">
            <QtyStepper value={qty} onChange={setQty} />
            <button
              onClick={handleAddToCart}
              disabled={addToCart.isPending || !selectedVariant}
              className="flex-1 h-12 rounded-[8px] bg-cta text-white font-semibold text-[15px] border-0 cursor-pointer hover:bg-cta-hover transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {addedMsg
                ? addedMsg
                : addToCart.isPending
                  ? "Đang thêm..."
                  : `Thêm vào giỏ · ${(displayPrice * qty).toLocaleString("vi-VN")}₫`}
            </button>
          </div>
          <button className="w-full h-12 rounded-[8px] bg-white border border-marlo-border font-semibold text-[15px] text-foreground cursor-pointer hover:bg-muted transition-colors duration-150 mb-5">
            Mua ngay
          </button>

          {/* Trust box */}
          <div className="flex flex-col gap-3 p-5 bg-white border border-marlo-border rounded-[12px]">
            {(
              [
                [
                  "truck",
                  <span key="ship">
                    <strong className="text-foreground">
                      Miễn phí vận chuyển
                    </strong>{" "}
                    · giao trong 2–3 ngày
                  </span>,
                ],
                [
                  "refresh",
                  <span key="ret">
                    <strong className="text-foreground">
                      Đổi trả miễn phí 30 ngày
                    </strong>{" "}
                    · không tính phí hoàn trả
                  </span>,
                ],
                [
                  "shield",
                  <span key="prot">
                    <strong className="text-foreground">
                      Bảo vệ người mua
                    </strong>{" "}
                    từ Marlo · bảo đảm 90 ngày
                  </span>,
                ],
              ] as [string, React.ReactNode][]
            ).map(([icon, text]) => (
              <div
                key={icon}
                className="flex items-center gap-3 text-[13px] text-text-secondary"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--foreground)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {icon === "truck" && (
                    <>
                      <path d="M5 17H3a1 1 0 0 1-1-1V4h14v12h-3M16 8h4l3 4v4a1 1 0 0 1-1 1h-2" />
                      <circle cx="7.5" cy="17.5" r="2.5" />
                      <circle cx="17.5" cy="17.5" r="2.5" />
                    </>
                  )}
                  {icon === "refresh" && (
                    <>
                      <polyline points="1 4 1 10 7 10" />
                      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                    </>
                  )}
                  {icon === "shield" && (
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  )}
                </svg>
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="details" className="mt-16 flex flex-col gap-0">
        <TabsList
          variant="line"
          className="w-full justify-start rounded-none bg-transparent border-b border-marlo-border pb-0 gap-0 h-auto"
        >
          {TABS.map((t) => (
            <TabsTrigger
              key={t.value}
              value={t.value}
              id={t.value === "reviews" ? "reviews" : undefined}
              className="flex-none h-auto rounded-none px-4 py-3.5 text-[14px] font-semibold"
            >
              {t.value === "reviews"
                ? `${t.label} · ${reviews.length}`
                : t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="details" className="pt-8">
          <div className="text-[15px] leading-[1.7] text-ink">
            {product.description ? (
              <p>{String(product.description)}</p>
            ) : (
              <p>
                {product.name} — sản phẩm chính hãng được bán và giao bởi{" "}
                <strong>Marlo</strong>. Bao gồm bảo hành 12 tháng từ người bán.
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="specs" className="pt-8">
          {product.variants.length > 0 ? (
            <table className="w-full border-collapse text-[14px]">
              <tbody>
                {product.variants.map((vr) => (
                  <tr key={vr.id} className="border-b border-marlo-border">
                    <td className="py-3 text-text-secondary w-48">{vr.name}</td>
                    <td className="py-3 text-ink font-semibold">
                      {vr.price.toLocaleString("vi-VN")}₫ · Còn {vr.stock} sản
                      phẩm
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-text-secondary text-[14px]">
              Chưa có thông số kỹ thuật.
            </p>
          )}
        </TabsContent>

        <TabsContent
          value="reviews"
          className="pt-8 grid grid-cols-[2fr_1fr] gap-12"
        >
          <div>
            {reviews.length === 0 ? (
              <p className="text-text-secondary text-[14px]">
                Chưa có đánh giá nào.
              </p>
            ) : (
              reviews.map((r) => (
                <div key={r.id} className="py-5 border-b border-marlo-border">
                  <div className="flex items-center gap-3 mb-2">
                    <Stars rating={r.rating} count={0} />
                    <span className="text-[14px] font-semibold text-ink">
                      {r.user.fullName
                        ? String(r.user.fullName)
                        : "Người dùng ẩn danh"}
                    </span>
                  </div>
                  <p className="text-[14px] leading-relaxed text-text-secondary m-0">
                    {r.content ? String(r.content) : ""}
                  </p>
                </div>
              ))
            )}
          </div>
          <aside className="bg-white border border-marlo-border rounded-[12px] p-6 self-start">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-[56px] font-semibold text-ink leading-none tracking-[-0.03em]">
                0
              </span>
              <span className="text-[14px] text-text-secondary">/ 5</span>
            </div>
            <Stars rating={0} count={reviews.length} />
          </aside>
        </TabsContent>

        <TabsContent value="shipping" className="pt-8">
          <div className="text-[15px] leading-relaxed text-ink space-y-3">
            <p>
              Giao hàng miễn phí. Dự kiến trong{" "}
              <strong>2–3 ngày làm việc</strong>.
            </p>
            <p className="text-text-secondary">
              Thành viên Marlo Prime nhận giao trong 2 giờ tại các quận nội
              thành, hoàn toàn miễn phí.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related */}
      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <SectionHeader
            eyebrow="Người mua cũng xem"
            title="Có thể bạn thích"
            action="Xem thêm"
            href="/search"
          />
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </>
  );
}
