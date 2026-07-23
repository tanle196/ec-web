import Link from "next/link";
import { Badge } from "@/components/commons/badge";
import { ProductImage } from "@/components/commons/product-image";
import type { CategoryResponseDto } from "@/api/main";

export function CategoryHero({ category }: { category: CategoryResponseDto }) {
  const description = category.description
    ? String(category.description)
    : undefined;
  const image = category.image ? String(category.image) : "/no-image.svg";

  return (
    <section className="max-w-360 mx-auto px-16 pt-8">
      <div
        className="relative rounded-[24px] overflow-hidden bg-foreground"
        style={{ minHeight: 420 }}
      >
        {/* Warm radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 70% 50%, color-mix(in srgb, var(--color-cta) 12%, transparent) 0%, transparent 70%)",
          }}
        />

        <div className="relative grid grid-cols-2 gap-12 items-center px-14 py-16 h-full">
          {/* Left: Text */}
          <div className="flex flex-col gap-0">
            <Badge kind="persimmon">Danh mục</Badge>
            <h1 className="text-[clamp(40px,4.5vw,64px)] font-bold leading-[0.96] tracking-[-0.035em] text-muted mt-5 mb-4">
              {category.name}
            </h1>
            {description && (
              <p className="text-[18px] leading-relaxed text-text-tertiary max-w-110 mb-7">
                {description}
              </p>
            )}
            <Link
              href={`/search?category=${category.slug}`}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-[8px] bg-persimmon text-white font-semibold text-[16px] leading-none no-underline hover:bg-persimmon-hover transition-colors duration-150 w-fit"
            >
              Mua ngay
            </Link>
          </div>

          {/* Right: Category image */}
          <div
            className="relative flex items-center justify-center"
            style={{ height: 340 }}
          >
            <ProductImage
              src={image}
              alt={category.name}
              width={320}
              height={320}
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
