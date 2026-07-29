import type { OrderResponseDto } from "@/api/main";

export type OrderStatus = OrderResponseDto["status"];

export function orderStatusLabel(status: OrderStatus) {
  switch (status) {
    case "delivered":
      return "COMPLETED";
    case "cancelled":
    case "refunded":
    case "partially_refunded":
      return "CANCELED";
    default:
      return "IN PROGRESS";
  }
}

export function orderStatusColor(status: OrderStatus) {
  switch (status) {
    case "delivered":
      return "text-success-500";
    case "cancelled":
    case "refunded":
    case "partially_refunded":
      return "text-danger-500";
    default:
      return "text-primary-500";
  }
}
