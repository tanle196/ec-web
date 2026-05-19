"use client";

import { Bell } from "lucide-react";

interface Props {
  count?: number;
}

export function NotificationButton({ count = 0 }: Props) {
  return (
    <button className="navbar__item relative flex flex-col items-center gap-0.5 px-2 py-1 text-xs text-white hover:text-white/80">
      <div className="relative">
        <Bell className="h-5 w-5" />
        {count > 0 && (
          <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </div>
      <span className="hidden lg:block">Thông báo</span>
    </button>
  );
}
