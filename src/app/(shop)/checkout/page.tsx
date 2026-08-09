"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { ProductImage } from "@/components/commons/product-image";
import { useCart } from "@/queries/cart";
import { useCreateOrder } from "@/queries/orders";
import { useCreatePayment } from "@/queries/payments";
import { useAddresses } from "@/queries/addresses";
import { AddressFormDialog } from "@/components/account/address-form-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  PAYMENT_METHOD_OPTIONS,
  getPaymentRedirectUrl,
  type PaymentMethod,
} from "@/lib/payment-status";
import type { AddressResponseDto, UserProfileDto } from "@/api/main";
import { mapCartItem } from "@/lib/api/mappers";
import { Container } from "@/components/commons/container";
import { PageBreadcrumb } from "@/components/commons/breadcrumb";
import { useGetProfile } from "@/queries/auth";

const checkoutSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  company: z.string(),
  email: z.union([z.literal(""), z.email("Enter a valid email")]),
  phone: z.string().min(1, "Phone number is required"),
  payment: z.enum([
    "cod",
    "vnpay",
    "momo",
    "zalopay",
    "stripe",
    "bank_transfer",
  ]),
  note: z.string(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const defaultValues: CheckoutFormValues = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  payment: "cod",
  note: "",
};

function profileDefaultValues(
  profile: UserProfileDto,
): Pick<CheckoutFormValues, "firstName" | "lastName" | "email"> {
  // `name` is typed as required but the API can return null for users
  // who haven't set a display name yet.
  const trimmedName = (profile.name ?? "").trim();
  const [firstName = "", ...rest] = trimmedName ? trimmedName.split(/\s+/) : [];
  return { firstName, lastName: rest.join(" "), email: profile.email };
}

function getErrorMessage(err: unknown): string {
  const body = (err as { error?: { message?: string | string[] } })?.error;
  const message = body?.message;
  if (Array.isArray(message)) return message.join(", ");
  if (typeof message === "string") return message;
  return "Something went wrong. Please try again.";
}

function formatUSD(cents: number) {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

const inputCls =
  "w-full h-11 bg-white border border-[#e4e7e9] rounded-[2px] px-[15px] text-[14px] text-[#191c1f] leading-5 outline-none focus:border-[#2da5f3] transition-colors placeholder:text-[#77878f]";

function FieldLabel({
  children,
  optional,
}: {
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label className="text-[14px] leading-5 text-[#191c1f]">
      {children}
      {optional && <span className="text-[#929fa5]"> (Optional)</span>}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-[12px] leading-4 text-red-600">{message}</p>;
}

const PAYMENT_OPTIONS: {
  id: PaymentMethod;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "cod",
    label: "Cash on Delivery",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#191c1f"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
  },
  {
    id: "vnpay",
    label: "VNPay",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1a56db"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <line x1="14" y1="14" x2="21" y2="14" />
        <line x1="14" y1="21" x2="21" y2="21" />
        <line x1="17.5" y1="14" x2="17.5" y2="21" />
      </svg>
    ),
  },
  {
    id: "momo",
    label: "MoMo",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#d82d8b"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <path d="M15.5 12h2.5" />
      </svg>
    ),
  },
  {
    id: "zalopay",
    label: "ZaloPay",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0068ff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    id: "stripe",
    label: "Credit/Debit Card",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#635bff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <line x1="6" y1="15" x2="10" y2="15" />
      </svg>
    ),
  },
  {
    id: "bank_transfer",
    label: "Bank Transfer",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#5f6c72"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 10l9-6 9 6" />
        <rect x="4" y="10" width="16" height="9" rx="1" />
        <line x1="9" y1="13" x2="9" y2="16" />
        <line x1="15" y1="13" x2="15" y2="16" />
      </svg>
    ),
  },
];

function RadioCircle({ checked }: { checked: boolean }) {
  return (
    <div
      className={`w-5 h-5 rounded-full border flex items-center justify-center flex-none ${
        checked ? "bg-[#fa8232] border-[#fa8232]" : "bg-white border-[#c9cfd2]"
      }`}
    >
      {checked && <div className="w-2 h-2 rounded-full bg-white" />}
    </div>
  );
}

function AddressOption({
  address,
  selected,
  onSelect,
}: {
  address: AddressResponseDto;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full flex items-start gap-3 text-left border rounded-[4px] px-4 py-4 transition-colors cursor-pointer ${
        selected
          ? "border-[#fa8232] bg-[#fff8f4]"
          : "border-[#e4e7e9] hover:border-[#c9cfd2]"
      }`}
    >
      <div className="pt-0.5">
        <RadioCircle checked={selected} />
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-medium text-[#191c1f]">
            {address.fullName}
          </span>
          {address.isDefault && (
            <span className="text-[11px] font-semibold text-[#fa8232] bg-[#ffe7d6] px-2 py-0.5 rounded-[2px]">
              Default
            </span>
          )}
        </div>
        <p className="text-[13px] leading-5 text-[#5f6c72]">
          {address.addressLine1}
          {address.addressLine2 ? `, ${address.addressLine2}` : ""},{" "}
          {address.city}, {address.province}
          {address.country ? `, ${address.country}` : ""}
        </p>
        <p className="text-[13px] leading-5 text-[#5f6c72]">
          Phone: {address.phone}
        </p>
      </div>
    </button>
  );
}

function AddressSelectDialog({
  addresses,
  addressesPending,
  selectedId,
  onSelect,
}: {
  addresses?: AddressResponseDto[];
  addressesPending: boolean;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = addresses?.find((a) => a.id === selectedId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {selected ? (
          <button
            type="button"
            className="w-full flex items-start gap-3 text-left border border-[#e4e7e9] rounded-[4px] px-4 py-4 hover:border-[#c9cfd2] transition-colors cursor-pointer"
          >
            <div className="flex-1 min-w-0 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-medium text-[#191c1f]">
                  {selected.fullName}
                </span>
                {selected.isDefault && (
                  <span className="text-[11px] font-semibold text-[#fa8232] bg-[#ffe7d6] px-2 py-0.5 rounded-[2px]">
                    Default
                  </span>
                )}
              </div>
              <p className="text-[13px] leading-5 text-[#5f6c72]">
                {selected.addressLine1}
                {selected.addressLine2
                  ? `, ${selected.addressLine2}`
                  : ""}, {selected.city}, {selected.province}
                {selected.country ? `, ${selected.country}` : ""}
              </p>
              <p className="text-[13px] leading-5 text-[#5f6c72]">
                Phone: {selected.phone}
              </p>
            </div>
            <span className="text-[14px] font-semibold text-[#fa8232] flex-none">
              Change
            </span>
          </button>
        ) : (
          <button
            type="button"
            className="w-full h-11 border border-dashed border-[#c9cfd2] rounded-[4px] text-[14px] text-[#5f6c72] hover:border-[#fa8232] hover:text-[#fa8232] transition-colors cursor-pointer"
          >
            {addressesPending
              ? "Loading addresses..."
              : "Select a shipping address"}
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Shipping Address</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
          {addressesPending && (
            <p className="text-[14px] text-[#5f6c72]">Loading addresses...</p>
          )}
          {!addressesPending && (addresses?.length ?? 0) === 0 && (
            <p className="text-[14px] text-[#5f6c72]">
              You haven&apos;t added any address yet.
            </p>
          )}
          {addresses?.map((address) => (
            <AddressOption
              key={address.id}
              address={address}
              selected={address.id === selectedId}
              onSelect={() => {
                onSelect(address.id);
                setOpen(false);
              }}
            />
          ))}
        </div>
        <AddressFormDialog
          trigger={
            <button
              type="button"
              className="flex items-center gap-2 text-[14px] font-semibold text-[#fa8232] hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-0 p-0 self-start"
            >
              Add Address
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden
              >
                <path
                  d="M4 10h12M12 5l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          }
        />
      </DialogContent>
    </Dialog>
  );
}

export default function CheckoutPage() {
  const [placed, setPlaced] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);
  const [paymentWarning, setPaymentWarning] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues,
  });

  const payment = useWatch({ control, name: "payment" });

  const { data: profile } = useGetProfile();
  useEffect(() => {
    if (!profile) return;
    reset(
      (current) => ({ ...current, ...profileDefaultValues(profile) }),
      { keepDirtyValues: true },
    );
  }, [profile, reset]);

  const { data: cart, isLoading } = useCart();
  const createOrder = useCreateOrder();
  const createPayment = useCreatePayment();
  const { data: addresses, isPending: addressesPending } = useAddresses();
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const defaultAddressId =
    (addresses?.find((a) => a.isDefault) ?? addresses?.[0])?.id ?? null;
  const effectiveAddressId = selectedAddressId ?? defaultAddressId;

  const items = (cart?.items ?? []).map(mapCartItem);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 0 && subtotal < 500 ? 99 : 0;
  const discount = 0;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + shipping - discount + tax;

  const onSubmit = handleSubmit((values) => {
    setFormError(null);
    setPaymentWarning(null);

    if (!effectiveAddressId) {
      setFormError("Please select a shipping address.");
      return;
    }

    createOrder.mutate(
      {
        address_id: effectiveAddressId,
        items: (cart?.items ?? []).map((i) => ({
          variant_id: i.variant_id,
          quantity: i.quantity,
        })),
        notes: values.note || undefined,
      },
      {
        onSuccess: (order) => {
          setPlacedOrderId(order.id);
          createPayment.mutate(
            { order_id: order.id, method: values.payment },
            {
              onSuccess: (paymentRecord) => {
                const redirectUrl = getPaymentRedirectUrl(paymentRecord);
                if (redirectUrl) {
                  setRedirecting(true);
                  window.location.href = redirectUrl;
                  return;
                }
                setPlaced(true);
              },
              onError: (err) => {
                setPaymentWarning(getErrorMessage(err));
                setPlaced(true);
              },
            },
          );
        },
        onError: (err) => setFormError(getErrorMessage(err)),
      },
    );
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#fa8232] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (placed) {
    return (
      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="bg-[#f2f4f5] h-18 flex items-center">
          <Container>
            <PageBreadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Shopping Cart", href: "/cart" },
                { label: "Checkout" },
              ]}
            />
          </Container>
        </div>

        {/* Success content */}
        <div className="flex flex-col gap-8 items-center justify-center py-[124px]">
          <div className="flex flex-col gap-6 items-center justify-center">
            {/* Duotone check circle */}
            <svg width="88" height="88" viewBox="0 0 88 88" fill="none">
              <circle
                cx="44"
                cy="44"
                r="44"
                fill="#2DB224"
                fillOpacity="0.12"
              />
              <circle
                cx="44"
                cy="44"
                r="33"
                stroke="#2DB224"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points="29,44 40,55 59,33"
                stroke="#2DB224"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>

            <div className="flex flex-col gap-3 items-center text-center">
              <p className="text-[24px] font-semibold leading-8 text-[#191c1f]">
                Your order is successfully placed
              </p>
              <p className="text-[14px] leading-5 text-[#5f6c72] max-w-[424px]">
                Pellentesque sed lectus nec tortor tristique accumsan quis
                dictum risus. Donec volutpat mollis nulla non facilisis.
              </p>
              {paymentWarning && (
                <p className="text-[13px] leading-5 text-red-600 max-w-[424px]">
                  We couldn&apos;t process your payment automatically (
                  {paymentWarning}). You can retry payment from your order page.
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <Link
              href="/"
              className="flex items-center gap-2 px-6 h-12 border-2 border-[#ffe7d6] rounded-[2px] text-[#fa8232] font-bold text-[14px] uppercase tracking-[0.012em] no-underline hover:bg-[#fff8f4] transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="9" height="9" rx="1" />
                <rect x="13" y="3" width="9" height="9" rx="1" />
                <rect x="2" y="14" width="9" height="7" rx="1" />
                <rect x="13" y="14" width="9" height="7" rx="1" />
              </svg>
              Go to Dashboard
            </Link>
            <Link
              href={placedOrderId ? `/account/orders/${placedOrderId}` : "/"}
              className="flex items-center gap-2 px-6 h-12 bg-[#fa8232] rounded-[2px] text-white font-bold text-[14px] uppercase tracking-[0.012em] no-underline hover:opacity-90 transition-opacity"
            >
              View Order
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#f2f4f5] h-18 flex items-center">
        <Container>
          <PageBreadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Shopping Cart", href: "/cart" },
              { label: "Checkout" },
            ]}
          />
        </Container>
      </div>

      {/* Main */}
      <form onSubmit={onSubmit}>
        <Container className="py-18 pb-24 flex gap-6 items-start">
          {/* ── Left column ─────────────────────────────── */}
          <div className="flex-1 min-w-0 flex flex-col gap-10">
            {/* Billing Information */}
            <section className="flex flex-col gap-6">
              <h2 className="text-[18px] font-medium text-[#191c1f] leading-6">
                Billing Information
              </h2>
              <div className="flex flex-col gap-4">
                {/* Name row */}
                <div className="flex gap-4 items-start">
                  <div className="flex flex-col gap-2 w-51.5">
                    <FieldLabel>User name</FieldLabel>
                    <input
                      className={inputCls}
                      placeholder="First name"
                      {...register("firstName")}
                    />
                    <FieldError message={errors.firstName?.message} />
                  </div>
                  <div className="flex flex-col gap-2 w-51.5">
                    <FieldLabel>
                      <span className="invisible">User name</span>
                    </FieldLabel>
                    <input
                      className={inputCls}
                      placeholder="Last name"
                      {...register("lastName")}
                    />
                    <FieldError message={errors.lastName?.message} />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <FieldLabel optional>Company Name</FieldLabel>
                    <input className={inputCls} {...register("company")} />
                  </div>
                </div>

                {/* Email / Phone */}
                <div className="flex gap-4">
                  <div className="flex flex-col gap-2 flex-1">
                    <FieldLabel>Email</FieldLabel>
                    <input
                      className={inputCls}
                      type="email"
                      {...register("email")}
                    />
                    <FieldError message={errors.email?.message} />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <FieldLabel>Phone Number</FieldLabel>
                    <input
                      className={inputCls}
                      type="tel"
                      {...register("phone")}
                    />
                    <FieldError message={errors.phone?.message} />
                  </div>
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section className="flex flex-col gap-6">
              <h2 className="text-[18px] font-medium text-[#191c1f] leading-6">
                Shipping Address
              </h2>
              <AddressSelectDialog
                addresses={addresses}
                addressesPending={addressesPending}
                selectedId={effectiveAddressId}
                onSelect={setSelectedAddressId}
              />
            </section>

            {/* Payment Option */}
            <div className="bg-white border border-[#e4e7e9] rounded-[4px] overflow-hidden pb-8">
              <div className="px-6 py-5 border-b border-[#e4e7e9]">
                <h2 className="text-[18px] font-medium text-[#191c1f] leading-6">
                  Payment Option
                </h2>
              </div>

              {/* Payment method pills */}
              <div className="flex items-stretch border-b border-[#e4e7e9] px-6 py-6 gap-0">
                {PAYMENT_OPTIONS.map((opt, i) => (
                  <div key={opt.id} className="flex items-center">
                    {i > 0 && (
                      <div className="w-px self-stretch bg-[#e4e7e9] mx-0" />
                    )}
                    <button
                      type="button"
                      onClick={() => setValue("payment", opt.id)}
                      className="flex flex-col items-center gap-4 px-8 py-0 bg-transparent border-0 cursor-pointer"
                    >
                      {opt.icon}
                      <span className="text-[14px] font-medium text-[#191c1f] leading-5 text-center w-25">
                        {opt.label}
                      </span>
                      <RadioCircle checked={payment === opt.id} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Selected method description */}
              <div className="px-6 pt-6">
                <p className="text-[13px] leading-5 text-[#5f6c72]">
                  {
                    PAYMENT_METHOD_OPTIONS.find((m) => m.id === payment)
                      ?.description
                  }
                </p>
              </div>
            </div>

            {/* Additional Information */}
            <section className="flex flex-col gap-6">
              <h2 className="text-[18px] font-medium text-[#191c1f] leading-6">
                Additional Information
              </h2>
              <div className="flex flex-col gap-2">
                <FieldLabel optional>Order Notes</FieldLabel>
                <textarea
                  className="w-full h-31 bg-white border border-[#e4e7e9] rounded-xs px-3.75 py-2.75 text-[14px] text-[#191c1f] leading-5 outline-none focus:border-[#2da5f3] transition-colors placeholder:text-[#929fa5] resize-none"
                  placeholder="Notes about your order, e.g. special notes for delivery"
                  {...register("note")}
                />
              </div>
            </section>
          </div>

          {/* ── Right column: Order Summary ──────────────── */}
          <aside className="flex-none w-106 sticky top-8">
            <div className="bg-white border border-[#e4e7e9] rounded-[4px] overflow-hidden pb-6">
              {/* Heading */}
              <div className="px-6 py-5 border-b border-[#e4e7e9]">
                <h2 className="text-[18px] font-medium text-[#191c1f] leading-6">
                  Order Summary
                </h2>
              </div>

              {/* Products */}
              {items.length > 0 && (
                <div className="flex flex-col gap-4 px-6 py-6 border-b border-[#e4e7e9]">
                  {items.map((item) => (
                    <div key={item.lineId} className="flex gap-4 items-center">
                      <div className="w-16 h-16 rounded-xs overflow-hidden bg-[#f2f4f5] flex-none">
                        <ProductImage
                          src={item.img}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                        <p className="text-[14px] leading-5 text-[#191c1f] line-clamp-2">
                          {item.name}
                        </p>
                        <div className="flex gap-1 text-[14px] leading-5">
                          <span className="text-[#5f6c72]">{item.qty} x</span>
                          <span className="font-semibold text-[#2da5f3]">
                            {formatUSD(item.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Totals */}
              <div className="flex flex-col gap-3 px-6 py-6 border-b border-[#e4e7e9] text-[14px] leading-5">
                <div className="flex items-center justify-between">
                  <span className="text-[#5f6c72]">Sub-total</span>
                  <span className="font-medium text-[#191c1f]">
                    {formatUSD(subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#5f6c72]">Shipping</span>
                  <span className="font-medium text-[#191c1f]">
                    {shipping === 0 ? "Free" : formatUSD(shipping)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#5f6c72]">Discount</span>
                  <span className="font-medium text-[#191c1f]">
                    {formatUSD(discount)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#5f6c72]">Tax</span>
                  <span className="font-medium text-[#191c1f]">
                    {formatUSD(tax)}
                  </span>
                </div>
              </div>

              {/* Total + CTA */}
              <div className="flex flex-col gap-6 px-6 pt-6">
                <div className="flex items-center justify-between text-[16px] leading-6">
                  <span className="text-[#191c1f]">Total</span>
                  <span className="font-semibold text-[#191c1f]">
                    {formatUSD(total)} USD
                  </span>
                </div>

                {formError && (
                  <p className="text-[13px] leading-5 text-red-600">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={
                    createOrder.isPending ||
                    createPayment.isPending ||
                    redirecting ||
                    items.length === 0 ||
                    !effectiveAddressId
                  }
                  className="w-full h-14 bg-[#fa8232] text-white text-[16px] font-bold uppercase tracking-[0.012em] rounded-[3px] border-0 cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {createOrder.isPending ||
                  createPayment.isPending ||
                  redirecting ? (
                    <>
                      <svg
                        className="animate-spin"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      >
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      {redirecting
                        ? "Redirecting to payment..."
                        : "Processing..."}
                    </>
                  ) : (
                    <>
                      Place Order
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </aside>
        </Container>
      </form>
    </div>
  );
}
