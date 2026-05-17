"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CartSheet() {
  return (
    <Button variant="ghost" size="icon" aria-label="Giỏ hàng">
      <ShoppingCart className="h-5 w-5" />
    </Button>
  );
}
