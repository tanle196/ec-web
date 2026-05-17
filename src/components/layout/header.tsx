import Link from "next/link";
import { Nav } from "./nav";
import { CartSheet } from "@/components/cart/cart-sheet";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          EC Shop
        </Link>
        <Nav />
        <CartSheet />
      </div>
    </header>
  );
}
