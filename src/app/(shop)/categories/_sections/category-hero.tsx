import Link from "next/link";
import { Badge } from "@/components/commons/badge";
import { ProductImage } from "@/components/commons/product-image";
import type { CategoryResponseDto } from "@/api/main";
import { Container } from "@/components/commons/container";

export function CategoryHero({ category }: { category: CategoryResponseDto }) {
  const description = category.description
    ? String(category.description)
    : undefined;
  const image = category.image ? String(category.image) : "/no-image.svg";

  return (
    <Container>
      <div
        className="relative overflow-hidden rounded-[24px] bg-foreground"
        style={{ minHeight: 420 }}
      >
        {/* Warm radial glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 70% 50%, color-mix(in srgb, var(--color-cta) 12%, transparent) 0%, transparent 70%)",
          }}
        />

        <div className="relative grid h-full grid-cols-2 items-center gap-12 px-14 py-16">
          {/* Left: Text */}
          <div className="flex flex-col gap-0">
            <Badge kind="persimmon">Danh mục</Badge>
            <h1 className="mt-5 mb-4 text-[clamp(40px,4.5vw,64px)] leading-[0.96] font-bold tracking-[-0.035em] text-muted">
              {category.name}
            </h1>
            {description && (
              <p className="mb-7 max-w-110 text-[18px] leading-relaxed text-text-tertiary">
                {description}
              </p>
            )}
            <Link
              href={`/search?category=${category.slug}`}
              className="bg-persimmon hover:bg-persimmon-hover inline-flex w-fit items-center gap-2 rounded-[8px] px-7 py-4 text-[16px] leading-none font-semibold text-white no-underline transition-colors duration-150"
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
    </Container>
  );
}
