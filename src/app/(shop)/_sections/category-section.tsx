"use client";

import Link from "next/link";
import { useCategoryTree } from "@/queries/categories";

export function CategorySection() {
  const { data: categories, isLoading } = useCategoryTree();

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-24 rounded-xl bg-zinc-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!categories?.length) return null;

  return (
    <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/categories/${cat.slug}`}
          className="flex flex-col items-center gap-2 rounded-xl border bg-white p-4 text-center hover:border-zinc-400 transition-colors"
        >
          <div className="h-10 w-10 rounded-full bg-zinc-100" />
          <span className="text-xs font-medium text-zinc-700 line-clamp-2">
            {cat.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
