import type { PaymentResponseDto } from "@/api/main";

export type PaymentMethod = PaymentResponseDto["method"];
export type PaymentStatus = PaymentResponseDto["status"];

export const PAYMENT_METHOD_LABEL: Record<PaymentMethod, string> = {
  cod: "Cash on Delivery",
  vnpay: "VNPay",
  momo: "MoMo",
  zalopay: "ZaloPay",
  stripe: "Stripe",
  bank_transfer: "Bank Transfer",
};

export const PAYMENT_METHOD_OPTIONS: {
  id: PaymentMethod;
  label: string;
  description: string;
}[] = [
  {
    id: "cod",
    label: "Cash on Delivery",
    description: "Pay in cash when your order arrives",
  },
  {
    id: "vnpay",
    label: "VNPay",
    description: "Pay via VNPay e-wallet, ATM or Visa/Master card",
  },
  {
    id: "momo",
    label: "MoMo",
    description: "Pay via MoMo e-wallet",
  },
  {
    id: "zalopay",
    label: "ZaloPay",
    description: "Pay via ZaloPay e-wallet",
  },
  {
    id: "stripe",
    label: "Credit / Debit Card",
    description: "Pay securely with Stripe",
  },
  {
    id: "bank_transfer",
    label: "Bank Transfer",
    description: "Transfer directly to our bank account",
  },
];

export function paymentStatusLabel(status: PaymentStatus) {
  switch (status) {
    case "completed":
      return "Paid";
    case "pending":
      return "Awaiting Payment";
    case "failed":
      return "Payment Failed";
    case "refunded":
      return "Refunded";
    case "partially_refunded":
      return "Partially Refunded";
  }
}

export function paymentStatusColor(status: PaymentStatus) {
  switch (status) {
    case "completed":
      return "text-success-500";
    case "pending":
      return "text-primary-500";
    case "failed":
      return "text-danger-500";
    case "refunded":
    case "partially_refunded":
      return "text-gray-600";
  }
}

/**
 * Gateway-backed methods (currently Stripe) return a hosted checkout URL in
 * `payment.metadata.checkoutUrl` — the user must be redirected there to
 * finish paying. Methods with no gateway (cod, bank_transfer, ...) don't set
 * this, so the payment is already in its final actionable state.
 */
export function getPaymentRedirectUrl(
  payment: PaymentResponseDto,
): string | null {
  const url = payment.metadata?.checkoutUrl;
  return typeof url === "string" && url.length > 0 ? url : null;
}
