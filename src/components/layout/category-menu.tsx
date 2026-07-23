"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useCategoryTree } from "@/queries/categories";
import { useProducts } from "@/queries/products";
import type { CategoryTreeNodeDto } from "@/api/main/types.gen";

function formatPrice(n: number) {
  return "$" + n.toLocaleString("en-US");
}

function SubMenu({ cat }: { cat: CategoryTreeNodeDto }) {
  const { data, isLoading } = useProducts({
    category_id: cat.id,
    isFeatured: true,
    status: "published",
    limit: 3,
  });

  const products = data?.data ?? [];

  return (
    <div className="flex gap-5 p-5 border-l border-gray-100">
      {/* Sub-category list */}
      <ul className="w-41 flex flex-col shrink-0">
        {cat.children!.map((child) => (
          <li key={child.id}>
            <Link
              href={`/categories/${child.slug}`}
              className="h-9 flex items-center px-4 text-body-sm text-gray-600 rounded-sm hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              {child.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Featured products */}
      <div className="flex flex-col gap-4 shrink-0 w-78">
        <h3 className="text-body-md font-semibold text-gray-900 uppercase tracking-wide">
          Featured Products
        </h3>
        <div className="flex flex-col gap-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="border border-gray-100 rounded-sm p-3 flex gap-3 items-center"
                >
                  <div className="w-20 h-20 shrink-0 bg-gray-100 rounded-sm animate-pulse" />
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="h-3 bg-gray-100 rounded animate-pulse w-full" />
                    <div className="h-3 bg-gray-100 rounded animate-pulse w-1/2" />
                  </div>
                </div>
              ))
            : products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="border border-gray-100 rounded-sm p-3 flex gap-3 items-center hover:border-gray-200 transition-colors"
                >
                  <div className="relative w-20 h-20 shrink-0 bg-gray-50 rounded-sm overflow-hidden">
                    <Image
                      src="/no-image.svg"
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-body-sm text-gray-900 leading-5 line-clamp-2">
                      {product.name}
                    </p>
                    <span className="text-body-sm font-semibold text-secondary-500">
                      {formatPrice(product.basePrice)}
                    </span>
                  </div>
                </Link>
              ))}
          {!isLoading && products.length === 0 && (
            <p className="text-body-sm text-gray-400">No featured products.</p>
          )}
        </div>
      </div>

      {/* Promo banner */}
      <div className="bg-warning-200 rounded-sm p-8 flex flex-col gap-6 items-center justify-center shrink-0 w-78">
        <div className="flex flex-col gap-3 items-center text-center">
          <div className="relative w-62 h-24">
            <Image
              src="/images/promo/earbuds.png"
              alt="Xiaomi Earbuds"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col gap-4 items-center">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[28px] leading-8 text-gray-900">
                21% Discount
              </p>
              <p className="text-body-md text-gray-700 w-62">
                Escape the noise, It&apos;s time to hear the magic with Xiaomi
                Earbuds.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-body-sm text-gray-700">
                Starting price:
              </span>
              <span className="bg-white px-3 py-1.5 rounded-sm text-body-md font-semibold text-gray-900">
                $99 USD
              </span>
            </div>
          </div>
        </div>
        <Link
          href={`/category/${cat.slug}`}
          className="bg-primary-500 hover:bg-primary-600 transition-colors w-62 flex items-center justify-center gap-2 py-3 rounded-sm text-white text-body-sm font-bold uppercase tracking-wide"
        >
          Shop now
          <ChevronRight size={16} aria-hidden />
        </Link>
      </div>
    </div>
  );
}

export function CategoryMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCat, setActiveCat] = useState<CategoryTreeNodeDto | null>(null);
  const { data: tree, isLoading } = useCategoryTree();

  const categories = tree ?? [];

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => {
        setIsOpen(false);
        setActiveCat(null);
      }}
    >
      <button
        className="bg-primary-500 flex items-center gap-2 px-6 py-3.5 rounded-sm text-body-sm font-medium text-white whitespace-nowrap hover:bg-primary-600 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        All Category
        <ChevronDown
          size={16}
          aria-hidden
          className={cn(
            "transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 pt-1">
          <div className="bg-white border border-gray-100 shadow-[0_8px_40px_rgba(0,0,0,0.12)] flex">
            {/* Left panel: categories */}
            <ul className="w-60 py-3 shrink-0" role="menu">
              {isLoading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <li key={i} className="h-9 px-4 flex items-center">
                      <div className="h-3 bg-gray-100 rounded animate-pulse w-3/4" />
                    </li>
                  ))
                : categories.map((cat) => {
                    const hasChildren = (cat.children?.length ?? 0) > 0;
                    return (
                      <li key={cat.id} role="none">
                        <Link
                          href={`/categories/${cat.slug}`}
                          role="menuitem"
                          onMouseEnter={() =>
                            setActiveCat(hasChildren ? cat : null)
                          }
                          className={cn(
                            "flex items-center justify-between h-9 px-4 text-body-sm transition-colors",
                            activeCat?.id === cat.id
                              ? "bg-gray-50 font-medium text-gray-900"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          )}
                        >
                          {cat.name}
                          {hasChildren && (
                            <ChevronRight size={12} aria-hidden />
                          )}
                        </Link>
                      </li>
                    );
                  })}
            </ul>

            {/* Right panel: sub-menu */}
            {activeCat && (activeCat.children?.length ?? 0) > 0 && (
              <SubMenu cat={activeCat} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
