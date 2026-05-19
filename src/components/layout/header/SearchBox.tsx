"use client";

import { useState, useRef } from "react";
import { Search, X } from "lucide-react";

export function SearchBox() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
    }
  };

  return (
    <div className="box-search relative flex-1">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center rounded-full border border-white/30 bg-white px-3 py-1.5 focus-within:shadow-md">
          <button type="submit" className="mr-2 flex-shrink-0 text-zinc-400 hover:text-red-600">
            <Search className="h-4 w-4" />
          </button>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            placeholder="Bạn muốn mua gì hôm nay?"
            className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
          />

          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="ml-2 flex-shrink-0 text-zinc-400 hover:text-zinc-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Autocomplete dropdown */}
        {focused && query.length > 0 && (
          <div
            id="search_autocomplete"
            className="absolute left-0 top-full z-50 mt-1 w-full rounded-lg border bg-white shadow-lg"
          >
            <div className="p-3 text-xs text-zinc-400">Đang tìm kiếm...</div>
          </div>
        )}
      </form>

      {focused && (
        <div
          id="overlaySearch"
          className="fixed inset-0 z-40 bg-black/20"
          onClick={() => setFocused(false)}
        />
      )}
    </div>
  );
}
