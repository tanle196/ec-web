"use client";

import { useState, useRef, useEffect } from "react";
import { PageBreadcrumb } from "@/components/commons/breadcrumb";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { Container } from "@/components/commons/container";
import { AddressFormDialog } from "@/components/account/address-form-dialog";
import {
  useAddresses,
  useDeleteAddress,
  useSetDefaultAddress,
} from "@/queries/addresses";
import { useMyPayments } from "@/queries/payments";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { AddressResponseDto, PaymentResponseDto } from "@/api/main";

const PAYMENT_METHOD_LABEL: Record<PaymentResponseDto["method"], string> = {
  cod: "Cash on Delivery",
  vnpay: "VNPay",
  momo: "MoMo",
  zalopay: "ZaloPay",
  stripe: "Stripe",
  bank_transfer: "Bank Transfer",
};

const GRADIENTS = [
  "radial-gradient(circle at 0 0, #1b6392, #124261)",
  "radial-gradient(circle at 0 0, #248e1d, #2db224)",
  "radial-gradient(circle at 0 0, #8e1d6b, #61124f)",
  "radial-gradient(circle at 0 0, #8e6b1d, #614a12)",
];

function DotsIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <circle cx="10" cy="10" r="1.5" />
      <circle cx="4" cy="10" r="1.5" />
      <circle cx="16" cy="10" r="1.5" />
    </svg>
  );
}

function AddressDropdown({
  open,
  onClose,
  address,
}: {
  open: boolean;
  onClose: () => void;
  address: AddressResponseDto;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const setDefault = useSetDefaultAddress();
  const deleteAddress = useDeleteAddress();

  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute top-8 right-0 z-20 bg-white border border-gray-100 rounded-[4px] shadow-[0px_8px_40px_rgba(0,0,0,0.12)] py-2 min-w-[160px]"
    >
      {!address.isDefault && (
        <button
          onClick={() => {
            setDefault.mutate(address.id);
            onClose();
          }}
          className="w-full text-left px-4 h-9 text-[14px] text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer"
        >
          Set as Default
        </button>
      )}
      <button
        onClick={() => {
          deleteAddress.mutate(address.id);
          onClose();
        }}
        className="w-full text-left px-4 h-9 text-[14px] text-danger-500 hover:bg-gray-50 transition-colors cursor-pointer"
      >
        Delete Address
      </button>
    </div>
  );
}

function AddressBlock({ address }: { address: AddressResponseDto }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex-1 bg-white border border-gray-100 rounded-[4px] p-6 flex flex-col gap-5">
      {/* Heading */}
      <div className="h-13 -mx-6 -mt-6 px-6 flex items-center justify-between border-b border-gray-100">
        <span className="text-[14px] font-medium text-gray-900 uppercase tracking-wide flex items-center gap-2">
          {address.fullName}
          {address.isDefault && (
            <span className="text-[11px] font-semibold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-[2px] normal-case">
              Default
            </span>
          )}
        </span>
        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            aria-label="Address options"
          >
            <DotsIcon />
          </button>
          <AddressDropdown
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            address={address}
          />
        </div>
      </div>

      {/* Address details */}
      <div className="flex flex-col gap-2 text-[14px] leading-5">
        <p className="text-gray-600">
          {address.addressLine1}
          {address.addressLine2 ? `, ${address.addressLine2}` : ""},{" "}
          {address.city}, {address.province}, {address.country}
        </p>
        <p className="text-gray-600">
          <span className="text-gray-900">Phone Number: </span>
          {address.phone}
        </p>
      </div>

      {/* Edit button */}
      <AddressFormDialog
        address={address}
        trigger={
          <button className="self-start border-2 border-secondary-100 rounded-[2px] px-6 h-10 text-[14px] font-bold text-secondary-500 uppercase tracking-[0.012em] hover:bg-secondary-50 transition-colors cursor-pointer">
            Edit Address
          </button>
        }
      />
    </div>
  );
}

export default function CardsAddressPage() {
  const { data: addresses, isPending: addressesPending } = useAddresses();
  const { data: payments, isPending: paymentsPending } = useMyPayments({
    limit: 10,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-6 pb-20">
        <PageBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Account", href: "/account" },
            { label: "Cards & Address" },
          ]}
        />

        <div className="flex gap-18 items-start mt-2">
          <DashboardSidebar />

          {/* Main content */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            {/* Payment History */}
            <div className="bg-white border border-gray-100 rounded-[4px]">
              {/* Section header */}
              <div className="flex items-center justify-between px-6 h-13 border-b border-gray-100">
                <span className="text-[14px] font-medium text-gray-900 uppercase tracking-wide">
                  Payment History
                </span>
              </div>

              {/* Cards */}
              <div className="flex gap-6 px-6 py-6 flex-wrap">
                {paymentsPending && (
                  <p className="text-[14px] text-gray-600">
                    Loading payments...
                  </p>
                )}
                {!paymentsPending && payments?.data.length === 0 && (
                  <p className="text-[14px] text-gray-600">
                    No payment records yet.
                  </p>
                )}
                {payments?.data.map((payment, i) => (
                  <div
                    key={payment.id}
                    className="relative w-[296px] h-[196px] rounded-[4px] overflow-hidden flex-none"
                    style={{ background: GRADIENTS[i % GRADIENTS.length] }}
                  >
                    <div className="absolute top-6 left-6">
                      <p className="text-white text-[16px] leading-6">
                        <span className="font-semibold">
                          {formatCurrency(payment.amount)}
                        </span>
                      </p>
                    </div>
                    <div className="absolute top-[72px] left-6 flex flex-col gap-2">
                      <p className="text-white text-[11px] font-medium uppercase opacity-70 tracking-widest">
                        Method
                      </p>
                      <p className="text-white text-[18px] font-normal tracking-wide">
                        {PAYMENT_METHOD_LABEL[payment.method]}
                      </p>
                    </div>
                    <div className="absolute bottom-6 left-6">
                      <span
                        className={`text-white text-[13px] font-bold uppercase tracking-widest`}
                      >
                        {payment.status}
                      </span>
                    </div>
                    <div className="absolute bottom-6 right-6">
                      <p className="text-white text-[12px] opacity-80">
                        {formatDate(payment.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Addresses */}
            <div className="flex items-center justify-between">
              <p className="text-[16px] font-semibold text-gray-900">
                Your Addresses
              </p>
              <AddressFormDialog
                trigger={
                  <button className="flex items-center gap-2 text-[14px] font-semibold text-primary-500 hover:text-primary-600 transition-colors cursor-pointer">
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
            </div>
            <div className="flex gap-6 flex-wrap">
              {addressesPending && (
                <p className="text-[14px] text-gray-600">
                  Loading addresses...
                </p>
              )}
              {!addressesPending && addresses?.length === 0 && (
                <p className="text-[14px] text-gray-600">
                  You haven&apos;t added any address yet.
                </p>
              )}
              {addresses?.map((address) => (
                <AddressBlock key={address.id} address={address} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
