"use client";

import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useOrderPayments } from "@/queries/payments";
import { useOrderRefundRequests, useCreateRefundRequest } from "@/queries/refunds";
import {
  refundRequestStatusColor,
  refundRequestStatusLabel,
} from "@/lib/refund-status";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { OrderResponseDto } from "@/api/main";

const REFUNDABLE_PAYMENT_STATUSES = new Set(["completed", "partially_refunded"]);

function getErrorMessage(err: unknown): string {
  const body = (err as { error?: { message?: string | string[] } })?.error;
  const message = body?.message;
  if (Array.isArray(message)) return message.join(", ");
  if (typeof message === "string") return message;
  return "Something went wrong. Please try again.";
}

const refundSchema = z
  .object({
    items: z.array(
      z.object({ orderItemId: z.string(), quantity: z.number().min(0) }),
    ),
    reason: z.string().min(1, "Please tell us why you're requesting a refund"),
  })
  .refine((data) => data.items.some((i) => i.quantity > 0), {
    message: "Select at least one item to refund",
    path: ["items"],
  });

type RefundFormValues = z.infer<typeof refundSchema>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-[12px] text-danger-500">{message}</p>;
}

function QuantityStepper({
  value,
  max,
  onChange,
}: {
  value: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center gap-2 flex-none">
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        disabled={value <= 0}
        className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded-[2px] text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        −
      </button>
      <span className="w-6 text-center text-[14px] text-gray-900">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded-[2px] text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        +
      </button>
    </div>
  );
}

function defaultRefundValues(order: OrderResponseDto): RefundFormValues {
  return {
    items: order.items.map((item) => ({ orderItemId: item.id, quantity: 0 })),
    reason: "",
  };
}

function RequestRefundDialog({
  order,
  paymentId,
}: {
  order: OrderResponseDto;
  paymentId: string;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const createRefundRequest = useCreateRefundRequest();

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<RefundFormValues>({
    resolver: zodResolver(refundSchema),
    defaultValues: defaultRefundValues(order),
  });

  const items = useWatch({ control, name: "items" });

  function handleOpenChange(next: boolean) {
    if (createRefundRequest.isPending) return;
    setError(null);
    if (!next) reset(defaultRefundValues(order));
    setOpen(next);
  }

  const onSubmit = handleSubmit((values) => {
    setError(null);
    const items = values.items
      .filter((i) => i.quantity > 0)
      .map((i) => ({ order_item_id: i.orderItemId, quantity: i.quantity }));

    createRefundRequest.mutate(
      { payment_id: paymentId, items, reason: values.reason.trim() },
      {
        onSuccess: () => handleOpenChange(false),
        onError: (err) => setError(getErrorMessage(err)),
      },
    );
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="h-11 px-6 border border-gray-200 text-gray-900 text-[14px] font-bold uppercase tracking-[0.04em] rounded-[2px] hover:bg-gray-50 transition-colors cursor-pointer self-start"
        >
          Request Refund
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Request Refund for Order {order.orderNumber}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-[13px] font-medium text-gray-700">
              Select items to refund
            </p>
            <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
              {order.items.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 border border-gray-100 rounded-[4px] px-4 py-3"
                >
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-[14px] text-gray-900 truncate">
                      {item.productName}
                    </span>
                    <span className="text-[13px] text-gray-600">
                      {formatCurrency(item.unitPrice)} × {item.quantity}
                    </span>
                  </div>
                  <QuantityStepper
                    value={items?.[index]?.quantity ?? 0}
                    max={item.quantity}
                    onChange={(value) =>
                      setValue(`items.${index}.quantity`, value, {
                        shouldValidate: true,
                      })
                    }
                  />
                </div>
              ))}
            </div>
            <FieldError message={errors.items?.message} />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="refund-reason"
              className="text-[13px] font-medium text-gray-700"
            >
              Reason
            </label>
            <Textarea
              id="refund-reason"
              placeholder="Tell us why you're requesting a refund"
              rows={3}
              {...register("reason")}
            />
            <FieldError message={errors.reason?.message} />
          </div>

          {error && <p className="text-[13px] text-danger-500">{error}</p>}

          <button
            type="submit"
            disabled={createRefundRequest.isPending}
            className="h-11 px-8 bg-primary-500 text-white text-[14px] font-bold uppercase tracking-[0.04em] rounded-[2px] hover:bg-primary-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed self-start"
          >
            {createRefundRequest.isPending ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function OrderRefundPanel({ order }: { order: OrderResponseDto }) {
  const { data: payments } = useOrderPayments(order.id);
  const { data: refundRequests, isPending } = useOrderRefundRequests(order.id);

  const latestPayment = useMemo(() => {
    if (!payments?.data.length) return null;
    return [...payments.data].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )[0];
  }, [payments]);

  const requests = useMemo(
    () =>
      [...(refundRequests?.data ?? [])].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [refundRequests],
  );

  const hasPendingRequest = requests.some((r) => r.status === "pending");

  const canRequestRefund =
    !!latestPayment &&
    REFUNDABLE_PAYMENT_STATUSES.has(latestPayment.status) &&
    !hasPendingRequest;

  if (!isPending && requests.length === 0 && !canRequestRefund) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-100 rounded-[4px] p-6 flex flex-col gap-4">
      <p className="text-[14px] font-medium text-gray-900 uppercase tracking-wide">
        Refund
      </p>

      {requests.length > 0 && (
        <div className="flex flex-col gap-3">
          {requests.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between gap-4 border border-gray-100 rounded-[4px] px-4 py-3"
            >
              <div className="flex flex-col gap-1 text-[14px] leading-5">
                <span className="text-gray-900">
                  {formatCurrency(request.amount)} ·{" "}
                  {request.items.reduce((s, i) => s + i.quantity, 0)} item(s)
                </span>
                <span className="text-gray-500 text-[13px]">
                  Requested on {formatDate(request.createdAt)}
                </span>
              </div>
              <span
                className={`text-[13px] font-semibold flex-none ${refundRequestStatusColor(request.status)}`}
              >
                {refundRequestStatusLabel(request.status)}
              </span>
            </div>
          ))}
        </div>
      )}

      {canRequestRefund && latestPayment && (
        <RequestRefundDialog order={order} paymentId={latestPayment.id} />
      )}
    </div>
  );
}
