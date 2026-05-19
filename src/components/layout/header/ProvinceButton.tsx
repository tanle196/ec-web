"use client";

import { useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";

export function ProvinceButton() {
  const [province, setProvince] = useState("Hồ Chí Minh");

  return (
    <button className="navbar__item flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-white hover:bg-white/20">
      <MapPin className="h-4 w-4" />
      <span className="hidden lg:inline">
        <span className="text-xs text-white/70">Xem giá tại</span>{" "}
        <span className="font-medium">{province}</span>
      </span>
      <ChevronDown className="h-3.5 w-3.5" />
    </button>
  );
}
