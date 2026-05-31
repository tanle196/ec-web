import type { Metadata } from "next";
import { SearchResults } from "./_components/search-results";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Tìm kiếm "${q}" | Marlo` : "Tìm kiếm | Marlo",
    description: q ? `Kết quả tìm kiếm cho "${q}" trên Marlo.` : undefined,
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  return (
    <div className="min-h-screen bg-cream">
      <SearchResults query={q} />
    </div>
  );
}
