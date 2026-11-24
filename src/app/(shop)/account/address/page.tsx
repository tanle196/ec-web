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
import type { AddressResponseDto } from "@/api/main";

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
      className="absolute top-8 right-0 z-20 min-w-[160px] rounded-[4px] border border-gray-100 bg-white py-2 shadow-[0px_8px_40px_rgba(0,0,0,0.12)]"
    >
      {!address.isDefault && (
        <button
          onClick={() => {
            setDefault.mutate(address.id);
            onClose();
          }}
          className="h-9 w-full cursor-pointer px-4 text-left text-[14px] text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
        >
          Set as Default
        </button>
      )}
      <button
        onClick={() => {
          deleteAddress.mutate(address.id);
          onClose();
        }}
        className="h-9 w-full cursor-pointer px-4 text-left text-[14px] text-danger-500 transition-colors hover:bg-gray-50"
      >
        Delete Address
      </button>
    </div>
  );
}

function AddressRow({ address }: { address: AddressResponseDto }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex items-center gap-4 border-b border-gray-100 px-6 py-3 transition-colors last:border-b-0 hover:bg-gray-50">
      <span className="w-45 flex-none truncate text-[14px] font-medium text-gray-900">
        {address.fullName}
      </span>
      <span className="min-w-0 flex-1 truncate text-[14px] text-gray-600">
        {address.addressLine1}
        {address.addressLine2 ? `, ${address.addressLine2}` : ""},{" "}
        {address.city}, {address.province}, {address.country}
      </span>
      <span className="w-35 flex-none truncate text-[14px] text-gray-600">
        {address.phone}
      </span>
      <span className="w-22.5 flex-none">
        {address.isDefault ? (
          <span className="rounded-[2px] bg-primary-50 px-2 py-0.5 text-[11px] font-semibold text-primary-500">
            Default
          </span>
        ) : (
          <span className="text-[13px] text-gray-400">—</span>
        )}
      </span>
      <div className="flex w-25 flex-none items-center justify-end gap-3">
        <AddressFormDialog
          address={address}
          trigger={
            <button className="cursor-pointer text-[14px] font-semibold text-secondary-500 transition-colors hover:text-secondary-600">
              Edit
            </button>
          }
        />
        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="cursor-pointer text-gray-400 transition-colors hover:text-gray-700"
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
    </div>
  );
}

export default function AddressPage() {
  const { data: addresses, isPending: addressesPending } = useAddresses();

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-6 pb-20">
        <PageBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Account", href: "/account" },
            { label: "Address" },
          ]}
        />

        <div className="mt-2 flex items-start gap-18">
          <DashboardSidebar />

          {/* Main content */}
          <div className="flex min-w-0 flex-1 flex-col gap-6">
            {/* Addresses */}
            <div className="rounded-[4px] border border-gray-100 bg-white">
              {/* Table heading */}
              <div className="flex h-13 items-center justify-between border-b border-gray-100 px-6">
                <span className="text-[14px] font-medium tracking-wide text-gray-900 uppercase">
                  Your Addresses
                </span>
                <AddressFormDialog
                  trigger={
                    <button className="flex cursor-pointer items-center gap-2 text-[14px] font-semibold text-primary-500 transition-colors hover:text-primary-600">
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

              {/* Column headers */}
              <div className="flex items-center gap-4 border-b border-gray-100 bg-gray-50 px-6 py-2.5 text-[12px] font-medium text-gray-700 uppercase">
                <span className="w-45 flex-none">Name</span>
                <span className="flex-1">Address</span>
                <span className="w-35 flex-none">Phone</span>
                <span className="w-22.5 flex-none">Default</span>
                <span className="w-25 flex-none text-right">Action</span>
              </div>

              {addressesPending && (
                <p className="px-6 py-6 text-[14px] text-gray-600">
                  Loading addresses...
                </p>
              )}
              {!addressesPending && addresses?.length === 0 && (
                <p className="px-6 py-6 text-[14px] text-gray-600">
                  You haven&apos;t added any address yet.
                </p>
              )}
              {addresses?.map((address) => (
                <AddressRow key={address.id} address={address} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
