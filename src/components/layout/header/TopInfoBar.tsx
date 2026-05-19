import Link from "next/link";
import { BadgeCheck, Truck, RefreshCw, MapPin, ClipboardList, Phone } from "lucide-react";

export function TopInfoBar() {
  return (
    <div id="topInfoBar" className="hidden border-b bg-zinc-50 text-xs text-zinc-600 md:block">
      <div className="container mx-auto flex items-center justify-between px-4 py-1.5">
        {/* Promo Info */}
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1">
            <BadgeCheck className="h-3.5 w-3.5 text-red-600" />
            <span>
              Sản phẩm <strong>Chính hãng - Xuất VAT</strong> đầy đủ
            </span>
          </span>

          <span className="flex items-center gap-1">
            <Truck className="h-3.5 w-3.5 text-red-600" />
            <span>
              <strong>Giao nhanh - Miễn phí</strong> cho đơn 300k
            </span>
          </span>

          <span className="flex items-center gap-1">
            <RefreshCw className="h-3.5 w-3.5 text-red-600" />
            <span>
              <strong>Thu cũ</strong> giá ngon - <strong>Lên đời</strong> tiết kiệm
            </span>
          </span>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-4">
          <Link href="/dia-chi-cua-hang" className="flex items-center gap-1 hover:text-red-600">
            <MapPin className="h-3.5 w-3.5" />
            <span>Cửa hàng gần bạn</span>
          </Link>

          <Link href="/order" className="flex items-center gap-1 hover:text-red-600">
            <ClipboardList className="h-3.5 w-3.5" />
            <span>Tra cứu đơn hàng</span>
          </Link>

          <a href="tel:18002097" className="flex items-center gap-1 hover:text-red-600">
            <Phone className="h-3.5 w-3.5" />
            <span>1800 2097</span>
          </a>
        </div>
      </div>
    </div>
  );
}
