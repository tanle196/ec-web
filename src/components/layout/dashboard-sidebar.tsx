"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";
import { removeCookie } from "@/lib/cookies";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/cookies";

const NAV_ITEMS = [
  {
    href: "/account",
    label: "Account",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <rect
          x="2"
          y="2"
          width="7"
          height="7"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="11"
          y="2"
          width="7"
          height="7"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="2"
          y="11"
          width="7"
          height="7"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="11"
          y="11"
          width="7"
          height="7"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    href: "/account/orders",
    label: "Order History",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path
          d="M3 5h11v10H3V5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M14 8h3l2 3v4h-5V8z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle
          cx="6"
          cy="17"
          r="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle
          cx="16"
          cy="17"
          r="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    href: "/account/cards",
    label: "Cards & Address",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <rect
          x="3"
          y="3"
          width="12"
          height="15"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M6 8h6M6 11h4M6 14h2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M7 3V2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/account/history",
    label: "Browsing History",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M10 6v4l3 2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/account/settings",
    label: "Setting",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <circle
          cx="10"
          cy="10"
          r="2.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/logout",
    label: "Log-out",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path
          d="M13 10H3M13 10l-3-3M13 10l-3 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 3h5a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    removeCookie(ACCESS_TOKEN);
    removeCookie(REFRESH_TOKEN);
    logout();
    router.push("/");
  };

  return (
    <aside className="w-[264px] flex-none bg-white border border-gray-100 rounded-[4px] shadow-[0px_8px_20px_rgba(0,0,0,0.08)] py-4">
      {NAV_ITEMS.map((item) => {
        if (item.href === "/logout") {
          return (
            <button
              key={item.href}
              type="button"
              onClick={handleLogout}
              className="w-full h-10 flex items-center gap-4 px-6 transition-colors text-left text-gray-600 hover:bg-gray-50"
            >
              <span className="flex-none">{item.icon}</span>
              <span className="text-[14px] leading-5 font-normal">
                {item.label}
              </span>
            </button>
          );
        }

        const isActive =
          item.href === "/account"
            ? pathname === "/account"
            : pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`w-full h-10 flex items-center gap-4 px-6 transition-colors text-left ${
              isActive
                ? "bg-primary-500 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span className="flex-none">{item.icon}</span>
            <span
              className={`text-[14px] leading-5 ${isActive ? "font-semibold" : "font-normal"}`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </aside>
  );
}
