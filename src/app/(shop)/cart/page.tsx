import { CartItem } from "@/components/cart/cart-item";

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Giỏ hàng</h1>
      <CartItem />
    </div>
  );
}
