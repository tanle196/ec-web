"use client";

import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useOrderPayments, useCreatePayment } from "@/queries/payments";
import {
  PAYMENT_METHOD_LABEL,
  PAYMENT_METHOD_OPTIONS,
  getPaymentRedirectUrl,
  paymentStatusColor,
  paymentStatusLabel,
  type PaymentMethod,
} from "@/lib/payment-status";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { OrderResponseDto } from "@/api/main";

const NOT_PAYABLE_STATUSES = new Set([
  "cancelled",
  "refunded",
  "partially_refunded",
]);

function getErrorMessage(err: unknown): string {
  const body = (err as { error?: { message?: string | string[] } })?.error;
  const message = body?.message;
  if (Array.isArray(message)) return message.join(", ");
  if (typeof message === "string") return message;
  return "Something went wrong. Please try again.";
}

function RadioDot({ checked }: { checked: boolean }) {
  return (
    <div
      className={`flex h-5 w-5 flex-none items-center justify-center rounded-full border transition-colors ${
        checked
          ? "border-primary-500 bg-primary-500"
          : "border-gray-200 bg-white"
      }`}
    >
      {checked && <div className="h-2 w-2 rounded-full bg-white" />}
    </div>
  );
}

function PayNowDialog({
  order,
  label,
}: {
  order: OrderResponseDto;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const [method, setMethod] = useState<PaymentMethod>("cod");
  const [error, setError] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);
  const createPayment = useCreatePayment();

  function handleOpenChange(next: boolean) {
    if (createPayment.isPending || redirecting) return;
    setError(null);
    setOpen(next);
  }

  function handleConfirm() {
    setError(null);
    createPayment.mutate(
      { order_id: order.id, method },
      {
        onSuccess: (payment) => {
          const redirectUrl = getPaymentRedirectUrl(payment);
          if (redirectUrl) {
            setRedirecting(true);
            window.location.href = redirectUrl;
            return;
          }
          setOpen(false);
        },
        onError: (err) => setError(getErrorMessage(err)),
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="h-11 cursor-pointer self-start rounded-[2px] bg-primary-500 px-6 text-[14px] font-bold tracking-[0.04em] text-white uppercase transition-colors hover:bg-primary-600"
        >
          {label}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Pay for Order {order.orderNumber}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 text-[14px]">
            <span className="text-gray-600">Amount due</span>
            <span className="font-semibold text-gray-900">
              {formatCurrency(order.total)}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {PAYMENT_METHOD_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setMethod(opt.id)}
                className={`flex w-full cursor-pointer items-start gap-3 rounded-[4px] border px-4 py-3 text-left transition-colors ${
                  method === opt.id
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className="pt-0.5">
                  <RadioDot checked={method === opt.id} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[14px] font-medium text-gray-900">
                    {opt.label}
                  </span>
                  <span className="text-[13px] text-gray-600">
                    {opt.description}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {error && <p className="text-[13px] text-danger-500">{error}</p>}

          <button
            type="button"
            onClick={handleConfirm}
            disabled={createPayment.isPending || redirecting}
            className="h-11 cursor-pointer self-start rounded-[2px] bg-primary-500 px-8 text-[14px] font-bold tracking-[0.04em] text-white uppercase transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {redirecting
              ? "Redirecting to payment provider..."
              : createPayment.isPending
                ? "Processing..."
                : "Confirm Payment"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function OrderPaymentPanel({ order }: { order: OrderResponseDto }) {
  const { data: payments, isPending } = useOrderPayments(order.id);

  const latestPayment = useMemo(() => {
    if (!payments?.data.length) return null;
    return [...payments.data].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )[0];
  }, [payments]);

  const isPaid = latestPayment?.status === "completed";
  const canPay =
    !isPaid &&
    !NOT_PAYABLE_STATUSES.has(order.status) &&
    latestPayment?.status !== "pending";

  return (
    <div className="flex flex-col gap-4 rounded-[4px] border border-gray-100 bg-white p-6">
      <div className="flex items-center justify-between">
        <p className="text-[14px] font-medium tracking-wide text-gray-900 uppercase">
          Payment
        </p>
        {latestPayment && (
          <span
            className={`text-[13px] font-semibold ${paymentStatusColor(latestPayment.status)}`}
          >
            {paymentStatusLabel(latestPayment.status)}
          </span>
        )}
      </div>

      {isPending && (
        <p className="text-[14px] text-gray-600">Loading payment status...</p>
      )}

      {!isPending && latestPayment && (
        <div className="flex flex-col gap-1 text-[14px] leading-5 text-gray-700">
          <p>
            Method:{" "}
            <span className="font-medium text-gray-900">
              {PAYMENT_METHOD_LABEL[latestPayment.method]}
            </span>
          </p>
          <p>
            Amount:{" "}
            <span className="font-medium text-gray-900">
              {formatCurrency(latestPayment.amount)}
            </span>
          </p>
          {latestPayment.status === "completed" && (
            <p className="text-gray-500">
              Paid on {formatDate(latestPayment.updatedAt)}
            </p>
          )}
          {latestPayment.status === "pending" &&
            latestPayment.method === "cod" && (
              <p className="text-gray-500">
                You will pay in cash when your order arrives.
              </p>
            )}
          {latestPayment.status === "pending" &&
            latestPayment.method !== "cod" && (
              <p className="text-gray-500">
                We are waiting for your payment to be confirmed.
              </p>
            )}
          {latestPayment.status === "failed" && (
            <p className="text-danger-500">
              Your last payment attempt failed. Please try again.
            </p>
          )}
        </div>
      )}

      {!isPending &&
        !latestPayment &&
        !NOT_PAYABLE_STATUSES.has(order.status) && (
          <p className="text-[14px] text-gray-600">
            This order hasn&apos;t been paid yet.
          </p>
        )}

      {!isPending && canPay && (
        <PayNowDialog
          order={order}
          label={
            latestPayment?.status === "failed" ? "Retry Payment" : "Pay Now"
          }
        />
      )}
    </div>
  );
}
