"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import { ProductGrid } from "@/components/commons/product-grid";
import { useProducts } from "@/queries/products";
import { mapProductListItem } from "@/lib/api/mappers";

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
    <div className="border-b border-marlo-border py-5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between bg-transparent border-0 cursor-pointer p-0 text-[14px] font-semibold text-ink"
      >
        <span>{title}</span>
        <ChevronDown
          size={16}
          className="transition-transform duration-150 flex-none"
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
    <label className="flex items-center gap-2.5 cursor-pointer py-1.5 text-[14px] text-ink select-none">
      <span
        onClick={onChange}
        className="w-4.5 h-4.5 flex-none rounded-[4px] border border-marlo-border-strong flex items-center justify-center transition-colors duration-100"
        style={{ background: checked ? "var(--foreground)" : "white" }}
      >
        {checked && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="flex-1">{label}</span>
      {count != null && (
        <span className="font-mono-marlo text-[13px] text-text-tertiary">{count}</span>
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
  onChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onClear: () => void;
}) {
  return (
    <aside className="w-60 flex-none">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[16px] font-semibold text-ink m-0">Bộ lọc</h3>
        <button
          onClick={onClear}
          className="bg-transparent border-0 text-[13px] text-text-secondary cursor-pointer underline underline-offset-2 p-0"
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
        <div className="flex items-center gap-2 mt-1">
          <input
            placeholder="0đ"
            value={filters.priceMin}
            onChange={(e) => onChange("priceMin", e.target.value)}
            className="font-mono-marlo flex-1 bg-white border border-marlo-border rounded-[8px] px-2.5 py-2 text-[13px] outline-none w-0"
          />
          <span className="text-text-tertiary flex-none">–</span>
          <input
            placeholder="∞"
            value={filters.priceMax}
            onChange={(e) => onChange("priceMax", e.target.value)}
            className="font-mono-marlo flex-1 bg-white border border-marlo-border rounded-[8px] px-2.5 py-2 text-[13px] outline-none w-0"
          />
        </div>
        <div className="flex gap-1.5 mt-3 flex-wrap">
          {PRICE_PRESETS.map((preset) => {
            const active =
              filters.priceMin === preset.min && filters.priceMax === preset.max;
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
                className="rounded-full px-2.5 py-1 text-[12px] cursor-pointer transition-colors border"
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

  const apiParams = useMemo(() => ({
    name: query || undefined,
    status: "published" as const,
    isFeatured: filters.isFeatured || undefined,
    limit: page * PAGE_SIZE,
  }), [query, filters.isFeatured, page]);

  const { data, isLoading } = useProducts(apiParams);

  const allProducts = data?.data.map(mapProductListItem) ?? [];

  const filtered = useMemo(() => {
    let products = allProducts;

    const minP = filters.priceMin ? Number(filters.priceMin) : 0;
    const maxP = filters.priceMax ? Number(filters.priceMax) : Infinity;
    if (minP > 0 || maxP < Infinity) {
      products = products.filter((p) => p.price >= minP && p.price <= maxP);
    }

    if (sort === "price-asc") return [...products].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...products].sort((a, b) => b.price - a.price);
    return products;
  }, [allProducts, filters.priceMin, filters.priceMax, sort]);

  const total = data?.total ?? 0;
  const hasMore = allProducts.length < total;

  function updateFilter<K extends keyof FilterState>(key: K, value: FilterState[K]) {
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
    else if (chipId === "price") setFilters((f) => ({ ...f, priceMin: "", priceMax: "" }));
    setPage(1);
  }

  return (
    <div className="max-w-7xl mx-auto px-16 py-8 pb-20">
      {/* Breadcrumb */}
      <nav className="text-[13px] text-text-secondary mb-4">
        <Link href="/" className="text-text-secondary hover:text-ink transition-colors no-underline">
          Trang chủ
        </Link>
        {" · "}
        <span className="text-ink font-semibold">Tìm kiếm</span>
      </nav>

      {/* Title */}
      <h1 className="text-[clamp(32px,3.5vw,44px)] font-semibold leading-[1.02] tracking-[-0.02em] text-ink mb-8">
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
        <FilterSidebar filters={filters} onChange={updateFilter} onClear={clearAll} />

        <div className="flex-1 min-w-0">
          {/* Sort bar */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-[14px] text-text-secondary">
              <span className="text-ink font-semibold">{filtered.length}</span> kết quả
              {query && (
                <> cho <span className="text-ink font-semibold">&ldquo;{query}&rdquo;</span></>
              )}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-[13px] text-text-secondary">Sắp xếp</span>
              <select
                value={sort}
                onChange={(e) => { setSort(e.target.value); setPage(1); }}
                className="bg-white border border-marlo-border rounded-[8px] px-3 py-2 text-[14px] text-ink cursor-pointer outline-none"
              >
                <option value="featured">Nổi bật</option>
                <option value="price-asc">Giá: thấp đến cao</option>
                <option value="price-desc">Giá: cao đến thấp</option>
              </select>
            </div>
          </div>

          {/* Active chips */}
          {chips.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap mb-5">
              {chips.map((chip) => (
                <button
                  key={chip.id}
                  onClick={() => removeChip(chip.id)}
                  className="inline-flex items-center gap-1.5 bg-ink text-white rounded-full px-3 py-1.5 text-[13px] font-medium cursor-pointer border-0 hover:opacity-80 transition-opacity"
                >
                  {chip.label}
                  <X size={12} strokeWidth={2} />
                </button>
              ))}
            </div>
          )}

          {/* Product grid */}
          {isLoading ? (
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white border border-border-light rounded-[12px] p-2 aspect-3/4 animate-pulse" />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <ProductGrid products={filtered} />
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <svg
                width="48" height="48" viewBox="0 0 24 24" fill="none"
                stroke="var(--color-border-strong)" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" className="mb-4"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <p className="text-[18px] font-semibold text-ink mb-2">Không tìm thấy sản phẩm</p>
              <p className="text-[14px] text-text-secondary">Thử từ khóa khác hoặc bỏ bớt bộ lọc.</p>
            </div>
          )}

          {/* Load more */}
          {hasMore && !isLoading && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setPage((p) => p + 1)}
                className="border border-marlo-border rounded-full px-8 py-3 text-[14px] font-semibold text-ink bg-white hover:bg-cream-2 transition-colors cursor-pointer"
              >
                Xem thêm ({total - allProducts.length} sản phẩm)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
