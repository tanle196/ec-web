"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import { ProductGrid } from "@/components/commons/product-grid";
import { FLAGSHIP, MID_RANGE, BRANDS } from "@/app/(shop)/categories/_data/phones";

const ALL_PRODUCTS = [...FLAGSHIP, ...MID_RANGE];

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
        className="w-[18px] h-[18px] flex-none rounded-[4px] border border-marlo-border-strong flex items-center justify-center transition-colors duration-100"
        style={{ background: checked ? "#141210" : "white" }}
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
  brands: string[];
  priceMin: string;
  priceMax: string;
  conditions: string[];
  rating: number | null;
  shipping: string[];
};

const CONDITIONS = [
  { id: "new", label: "Mới", count: 412 },
  { id: "refurb", label: "Hàng tân trang", count: 92 },
  { id: "used", label: "Đã qua sử dụng", count: 64 },
];

const SHIPPING_OPTIONS = [
  { id: "free", label: "Miễn phí vận chuyển", count: 381 },
  { id: "express", label: "Giao nhanh 2 ngày", count: 142 },
];

const PRICE_PRESETS = [
  { label: "Dưới 5tr", min: "0", max: "5000000" },
  { label: "5 – 10tr", min: "5000000", max: "10000000" },
  { label: "10 – 20tr", min: "10000000", max: "20000000" },
  { label: "Trên 20tr", min: "20000000", max: "" },
];

function toggleItem<T>(arr: T[], item: T): T[] {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
}

function FilterSidebar({
  filters,
  onChange,
  onClear,
}: {
  filters: FilterState;
  onChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onClear: () => void;
}) {
  const [showAllBrands, setShowAllBrands] = useState(false);
  const visibleBrands = showAllBrands ? BRANDS : BRANDS.slice(0, 4);

  return (
    <aside className="w-60 flex-none">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[16px] font-semibold text-ink m-0">
          Bộ lọc
        </h3>
        <button
          onClick={onClear}
          className="bg-transparent border-0 text-[13px] text-text-secondary cursor-pointer underline underline-offset-2 p-0"
        >
          Xóa tất cả
        </button>
      </div>

      {/* Brand */}
      <FilterGroup title="Thương hiệu">
        {visibleBrands.map((brand) => (
          <CheckItem
            key={brand.id}
            label={brand.name}
            count={brand.count}
            checked={filters.brands.includes(brand.id)}
            onChange={() => onChange("brands", toggleItem(filters.brands, brand.id))}
          />
        ))}
        <button
          onClick={() => setShowAllBrands((s) => !s)}
          className="bg-transparent border-0 text-[13px] font-semibold text-ink cursor-pointer p-0 pt-2"
        >
          {showAllBrands
            ? "Thu gọn"
            : `Xem thêm ${BRANDS.length - 4} thương hiệu`}
        </button>
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
                  background: active ? "#141210" : "white",
                  color: active ? "white" : "#141210",
                  borderColor: active ? "#141210" : "#E6DFD4",
                }}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      {/* Condition */}
      <FilterGroup title="Tình trạng">
        {CONDITIONS.map((c) => (
          <CheckItem
            key={c.id}
            label={c.label}
            count={c.count}
            checked={filters.conditions.includes(c.id)}
            onChange={() =>
              onChange("conditions", toggleItem(filters.conditions, c.id))
            }
          />
        ))}
      </FilterGroup>

      {/* Rating */}
      <FilterGroup title="Đánh giá">
        {[4, 3, 2].map((r) => (
          <label
            key={r}
            className="flex items-center gap-2.5 cursor-pointer py-1.5 select-none"
            onClick={() => onChange("rating", filters.rating === r ? null : r)}
          >
            <span
              className="w-[18px] h-[18px] flex-none rounded-full border border-marlo-border-strong flex items-center justify-center transition-colors duration-100"
              style={{ background: filters.rating === r ? "#141210" : "white" }}
            >
              {filters.rating === r && (
                <span className="w-2 h-2 rounded-full bg-white" />
              )}
            </span>
            <span className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill={i < r ? "#141210" : "#D4CCBE"}
                  stroke={i < r ? "#141210" : "#D4CCBE"}
                  strokeWidth="1"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </span>
            <span className="text-[14px] text-text-secondary">
              trở lên
            </span>
          </label>
        ))}
      </FilterGroup>

      {/* Shipping */}
      <FilterGroup title="Vận chuyển">
        {SHIPPING_OPTIONS.map((s) => (
          <CheckItem
            key={s.id}
            label={s.label}
            count={s.count}
            checked={filters.shipping.includes(s.id)}
            onChange={() =>
              onChange("shipping", toggleItem(filters.shipping, s.id))
            }
          />
        ))}
      </FilterGroup>
    </aside>
  );
}

// ─── SearchResults ────────────────────────────────────────────────────────────

const PAGE_SIZE = 12;

export function SearchResults({ query }: { query: string }) {
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    priceMin: "",
    priceMax: "",
    conditions: [],
    rating: null,
    shipping: [],
  });
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);

  function updateFilter<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  }

  function clearAll() {
    setFilters({
      brands: [],
      priceMin: "",
      priceMax: "",
      conditions: [],
      rating: null,
      shipping: [],
    });
    setPage(1);
  }

  // ── Active chips ──────────────────────────────────────────────────────────
  const chips = useMemo(() => {
    const result: { id: string; label: string }[] = [];

    filters.brands.forEach((id) => {
      const brand = BRANDS.find((b) => b.id === id);
      if (brand) result.push({ id: `brand:${id}`, label: brand.name });
    });

    if (filters.priceMin || filters.priceMax) {
      const lo = filters.priceMin
        ? `${Number(filters.priceMin).toLocaleString("vi")}đ`
        : "0đ";
      const hi = filters.priceMax
        ? `${Number(filters.priceMax).toLocaleString("vi")}đ`
        : "∞";
      result.push({ id: "price", label: `${lo} – ${hi}` });
    }

    filters.conditions.forEach((c) => {
      const label =
        c === "new" ? "Mới" : c === "refurb" ? "Tân trang" : "Đã dùng";
      result.push({ id: `condition:${c}`, label });
    });

    if (filters.rating !== null) {
      result.push({ id: "rating", label: `${filters.rating}★ trở lên` });
    }

    filters.shipping.forEach((s) => {
      result.push({
        id: `shipping:${s}`,
        label: s === "free" ? "Miễn phí ship" : "Giao nhanh",
      });
    });

    return result;
  }, [filters]);

  function removeChip(chipId: string) {
    if (chipId.startsWith("brand:")) {
      const id = chipId.slice(6);
      setFilters((f) => ({ ...f, brands: f.brands.filter((b) => b !== id) }));
    } else if (chipId === "price") {
      setFilters((f) => ({ ...f, priceMin: "", priceMax: "" }));
    } else if (chipId.startsWith("condition:")) {
      const c = chipId.slice(10);
      setFilters((f) => ({
        ...f,
        conditions: f.conditions.filter((x) => x !== c),
      }));
    } else if (chipId === "rating") {
      setFilters((f) => ({ ...f, rating: null }));
    } else if (chipId.startsWith("shipping:")) {
      const s = chipId.slice(9);
      setFilters((f) => ({
        ...f,
        shipping: f.shipping.filter((x) => x !== s),
      }));
    }
    setPage(1);
  }

  // ── Filter + sort ─────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let products = ALL_PRODUCTS;

    if (query) {
      const q = query.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.seller.toLowerCase().includes(q)
      );
    }

    if (filters.brands.length > 0) {
      products = products.filter((p) =>
        filters.brands.some((brandId) => {
          const brand = BRANDS.find((b) => b.id === brandId);
          return (
            brand && p.seller.toLowerCase().includes(brand.name.toLowerCase())
          );
        })
      );
    }

    const minP = filters.priceMin ? Number(filters.priceMin) : 0;
    const maxP = filters.priceMax ? Number(filters.priceMax) : Infinity;
    if (minP > 0 || maxP < Infinity) {
      products = products.filter((p) => p.price >= minP && p.price <= maxP);
    }

    if (filters.rating !== null) {
      products = products.filter((p) => p.rating >= filters.rating!);
    }

    const sorted = [...products];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);

    return sorted;
  }, [query, filters, sort]);

  const displayed = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = displayed.length < filtered.length;

  return (
    <div className="max-w-7xl mx-auto px-16 py-8 pb-20">
      {/* Breadcrumb */}
      <nav className="text-[13px] text-text-secondary mb-4">
        <Link
          href="/"
          className="text-text-secondary hover:text-ink transition-colors no-underline"
        >
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
        <FilterSidebar
          filters={filters}
          onChange={updateFilter}
          onClear={clearAll}
        />

        <div className="flex-1 min-w-0">
          {/* Sort bar */}
          <div className="flex items-center justify-between mb-6">
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
              <span className="text-[13px] text-text-secondary">
                Sắp xếp
              </span>
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
                className="bg-white border border-marlo-border rounded-[8px] px-3 py-2 text-[14px] text-ink cursor-pointer outline-none"
              >
                <option value="featured">Nổi bật</option>
                <option value="price-asc">Giá: thấp đến cao</option>
                <option value="price-desc">Giá: cao đến thấp</option>
                <option value="rating">Đánh giá cao nhất</option>
                <option value="newest">Mới nhất</option>
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
          {displayed.length > 0 ? (
            <ProductGrid products={displayed} />
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#D4CCBE"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-4"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <p className="text-[18px] font-semibold text-ink mb-2">
                Không tìm thấy sản phẩm
              </p>
              <p className="text-[14px] text-text-secondary">
                Thử từ khóa khác hoặc bỏ bớt bộ lọc.
              </p>
            </div>
          )}

          {/* Load more */}
          {hasMore && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setPage((p) => p + 1)}
                className="border border-marlo-border rounded-full px-8 py-3 text-[14px] font-semibold text-ink bg-white hover:bg-cream-2 transition-colors cursor-pointer"
              >
                Xem thêm ({filtered.length - displayed.length} sản phẩm)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
