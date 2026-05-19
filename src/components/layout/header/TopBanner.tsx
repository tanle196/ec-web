import Link from "next/link";

export function TopBanner() {
  return (
    <div id="topBarHeader">
      <div className="top-banner flex items-center justify-center gap-2 bg-red-600 py-2 text-sm text-white">
        <span className="animate-pulse h-2 w-2 rounded-full bg-white" />
        <Link href="/qua-tang-8-3" className="hover:underline">
          8/3 Quà she mê - Deal đúng ý! Mua ngay!
        </Link>
      </div>
    </div>
  );
}
