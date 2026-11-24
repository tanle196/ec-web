"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import { ProductGrid } from "@/components/commons/product-grid";
import { useProducts } from "@/queries/products";
import { mapProductListItem } from "@/lib/api/mappers";
import { Container } from "@/components/commons/container";

// ─── FilterGroup ──────────────────────────────────────────────────────────────

function FilterGroup({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-marlo-border border-b py-5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-ink flex w-full cursor-pointer items-center justify-between border-0 bg-transparent p-0 text-[14px] font-semibold"
      >
        <span>{title}</span>
        <ChevronDown
          size={16}
          className="flex-none transition-transform duration-150"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && <div className="mt-3.5">{children}</div>}
    </div>
  );
}

// ─── CheckItem ───────────────────────────────────────────────────────────────

function CheckItem({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count?: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="text-ink flex cursor-pointer items-center gap-2.5 py-1.5 text-[14px] select-none">
      <span
        onClick={onChange}
        className="border-marlo-border-strong flex h-4.5 w-4.5 flex-none items-center justify-center rounded-[4px] border transition-colors duration-100"
        style={{ background: checked ? "var(--foreground)" : "white" }}
      >
        {checked && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M2 5L4 7L8 3"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span className="flex-1">{label}</span>
      {count != null && (
        <span className="font-mono-marlo text-[13px] text-text-tertiary">
          {count}
        </span>
      )}
    </label>
  );
}

// ─── FilterSidebar ───────────────────────────────────────────────────────────

type FilterState = {
  priceMin: string;
  priceMax: string;
  isFeatured: boolean;
};

const PRICE_PRESETS = [
  { label: "Dưới 500k", min: "0", max: "500000" },
  { label: "500k – 2tr", min: "500000", max: "2000000" },
  { label: "2 – 10tr", min: "2000000", max: "10000000" },
  { label: "Trên 10tr", min: "10000000", max: "" },
];

function FilterSidebar({
  filters,
  onChange,
  onClear,
}: {
  filters: FilterState;
  onChange: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void;
  onClear: () => void;
}) {
  return (
    <aside className="w-60 flex-none">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-ink m-0 text-[16px] font-semibold">Bộ lọc</h3>
        <button
          onClick={onClear}
          className="cursor-pointer border-0 bg-transparent p-0 text-[13px] text-text-secondary underline underline-offset-2"
        >
          Xóa tất cả
        </button>
      </div>

      {/* Featured */}
      <FilterGroup title="Loại sản phẩm">
        <CheckItem
          label="Sản phẩm nổi bật"
          checked={filters.isFeatured}
          onChange={() => onChange("isFeatured", !filters.isFeatured)}
        />
      </FilterGroup>

      {/* Price */}
      <FilterGroup title="Khoảng giá">
        <div className="mt-1 flex items-center gap-2">
          <input
            placeholder="0đ"
            value={filters.priceMin}
            onChange={(e) => onChange("priceMin", e.target.value)}
            className="font-mono-marlo border-marlo-border w-0 flex-1 rounded-[8px] border bg-white px-2.5 py-2 text-[13px] outline-none"
          />
          <span className="flex-none text-text-tertiary">–</span>
          <input
            placeholder="∞"
            value={filters.priceMax}
            onChange={(e) => onChange("priceMax", e.target.value)}
            className="font-mono-marlo border-marlo-border w-0 flex-1 rounded-[8px] border bg-white px-2.5 py-2 text-[13px] outline-none"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {PRICE_PRESETS.map((preset) => {
            const active =
              filters.priceMin === preset.min &&
              filters.priceMax === preset.max;
            return (
              <button
                key={preset.label}
                onClick={() => {
                  if (active) {
                    onChange("priceMin", "");
                    onChange("priceMax", "");
                  } else {
                    onChange("priceMin", preset.min);
                    onChange("priceMax", preset.max);
                  }
                }}
                className="cursor-pointer rounded-full border px-2.5 py-1 text-[12px] transition-colors"
                style={{
                  background: active ? "var(--foreground)" : "white",
                  color: active ? "white" : "var(--foreground)",
                  borderColor: active ? "var(--foreground)" : "var(--border)",
                }}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </FilterGroup>
    </aside>
  );
}

// ─── SearchResults ────────────────────────────────────────────────────────────

export function SearchResults({ query }: { query: string }) {
  const [filters, setFilters] = useState<FilterState>({
    priceMin: "",
    priceMax: "",
    isFeatured: false,
  });
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 12;

  const apiParams = useMemo(
    () => ({
      name: query || undefined,
      status: "published" as const,
      isFeatured: filters.isFeatured || undefined,
      limit: page * PAGE_SIZE,
    }),
    [query, filters.isFeatured, page],
  );

  const { data, isLoading } = useProducts(apiParams);

  const allProducts = useMemo(
    () => data?.data.map(mapProductListItem) ?? [],
    [data?.data],
  );

  const filtered = useMemo(() => {
    let products = allProducts;

    const minP = filters.priceMin ? Number(filters.priceMin) : 0;
    const maxP = filters.priceMax ? Number(filters.priceMax) : Infinity;
    if (minP > 0 || maxP < Infinity) {
      products = products.filter((p) => p.price >= minP && p.price <= maxP);
    }

    if (sort === "price-asc")
      return [...products].sort((a, b) => a.price - b.price);
    if (sort === "price-desc")
      return [...products].sort((a, b) => b.price - a.price);
    return products;
  }, [allProducts, filters.priceMin, filters.priceMax, sort]);

  const total = data?.total ?? 0;
  const hasMore = allProducts.length < total;

  function updateFilter<K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  }

  function clearAll() {
    setFilters({ priceMin: "", priceMax: "", isFeatured: false });
    setPage(1);
  }

  // ── Active chips ──────────────────────────────────────────────────────────
  const chips = useMemo(() => {
    const result: { id: string; label: string }[] = [];
    if (filters.isFeatured) result.push({ id: "featured", label: "Nổi bật" });
    if (filters.priceMin || filters.priceMax) {
      const lo = filters.priceMin
        ? `${Number(filters.priceMin).toLocaleString("vi")}đ`
        : "0đ";
      const hi = filters.priceMax
        ? `${Number(filters.priceMax).toLocaleString("vi")}đ`
        : "∞";
      result.push({ id: "price", label: `${lo} – ${hi}` });
    }
    return result;
  }, [filters]);

  function removeChip(chipId: string) {
    if (chipId === "featured") setFilters((f) => ({ ...f, isFeatured: false }));
    else if (chipId === "price")
      setFilters((f) => ({ ...f, priceMin: "", priceMax: "" }));
    setPage(1);
  }

  return (
    <Container className="py-8 pb-20">
      {/* Breadcrumb */}
      <nav className="mb-4 text-[13px] text-text-secondary">
        <Link
          href="/"
          className="hover:text-ink text-text-secondary no-underline transition-colors"
        >
          Trang chủ
        </Link>
        {" · "}
        <span className="text-ink font-semibold">Tìm kiếm</span>
      </nav>

      {/* Title */}
      <h1 className="text-ink mb-8 text-[clamp(32px,3.5vw,44px)] leading-[1.02] font-semibold tracking-[-0.02em]">
        {query ? (
          <>
            Kết quả cho{" "}
            <span className="text-persimmon">&ldquo;{query}&rdquo;</span>
          </>
        ) : (
          "Tất cả sản phẩm"
        )}
      </h1>

      <div className="flex gap-8">
        <FilterSidebar
          filters={filters}
          onChange={updateFilter}
          onClear={clearAll}
        />

        <div className="min-w-0 flex-1">
          {/* Sort bar */}
          <div className="mb-6 flex items-center justify-between">
            <span className="text-[14px] text-text-secondary">
              <span className="text-ink font-semibold">{filtered.length}</span>{" "}
              kết quả
              {query && (
                <>
                  {" "}
                  cho{" "}
                  <span className="text-ink font-semibold">
                    &ldquo;{query}&rdquo;
                  </span>
                </>
              )}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-[13px] text-text-secondary">Sắp xếp</span>
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
                className="border-marlo-border text-ink cursor-pointer rounded-[8px] border bg-white px-3 py-2 text-[14px] outline-none"
              >
                <option value="featured">Nổi bật</option>
                <option value="price-asc">Giá: thấp đến cao</option>
                <option value="price-desc">Giá: cao đến thấp</option>
              </select>
            </div>
          </div>

          {/* Active chips */}
          {chips.length > 0 && (
            <div className="mb-5 flex flex-wrap items-center gap-2">
              {chips.map((chip) => (
                <button
                  key={chip.id}
                  onClick={() => removeChip(chip.id)}
                  className="bg-ink inline-flex cursor-pointer items-center gap-1.5 rounded-full border-0 px-3 py-1.5 text-[13px] font-medium text-white transition-opacity hover:opacity-80"
                >
                  {chip.label}
                  <X size={12} strokeWidth={2} />
                </button>
              ))}
            </div>
          )}

          {/* Product grid */}
          {filtered.length > 0 ? (
            <ProductGrid products={filtered} cols={4} carousel={false} />
          ) : !isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-border-strong)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-4"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <p className="text-ink mb-2 text-[18px] font-semibold">
                Không tìm thấy sản phẩm
              </p>
              <p className="text-[14px] text-text-secondary">
                Thử từ khóa khác hoặc bỏ bớt bộ lọc.
              </p>
            </div>
          ) : null}

          {/* Skeleton khi đang load lần đầu */}
          {isLoading && allProducts.length === 0 && (
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="border-marlo-border aspect-3/4 animate-pulse rounded-[12px] border bg-white p-2"
                />
              ))}
            </div>
          )}

          {/* Load more */}
          {hasMore && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={isLoading}
                className="border-marlo-border text-ink hover:bg-cream-2 cursor-pointer rounded-full border bg-white px-8 py-3 text-[14px] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading
                  ? "Đang tải..."
                  : `Xem thêm (${total - allProducts.length} sản phẩm)`}
              </button>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
