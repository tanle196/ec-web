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

function AddressRow({ address }: { address: AddressResponseDto }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex items-center gap-4 px-6 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
      <span className="w-45 flex-none text-[14px] font-medium text-gray-900 truncate">
        {address.fullName}
      </span>
      <span className="flex-1 min-w-0 text-[14px] text-gray-600 truncate">
        {address.addressLine1}
        {address.addressLine2 ? `, ${address.addressLine2}` : ""},{" "}
        {address.city}, {address.province}, {address.country}
      </span>
      <span className="w-35 flex-none text-[14px] text-gray-600 truncate">
        {address.phone}
      </span>
      <span className="w-22.5 flex-none">
        {address.isDefault ? (
          <span className="text-[11px] font-semibold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-[2px]">
            Default
          </span>
        ) : (
          <span className="text-[13px] text-gray-400">—</span>
        )}
      </span>
      <div className="w-25 flex-none flex items-center justify-end gap-3">
        <AddressFormDialog
          address={address}
          trigger={
            <button className="text-[14px] font-semibold text-secondary-500 hover:text-secondary-600 transition-colors cursor-pointer">
              Edit
            </button>
          }
        />
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

        <div className="flex gap-18 items-start mt-2">
          <DashboardSidebar />

          {/* Main content */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            {/* Addresses */}
            <div className="bg-white border border-gray-100 rounded-[4px]">
              {/* Table heading */}
              <div className="px-6 h-13 flex items-center justify-between border-b border-gray-100">
                <span className="text-[14px] font-medium text-gray-900 uppercase tracking-wide">
                  Your Addresses
                </span>
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

              {/* Column headers */}
              <div className="flex items-center gap-4 px-6 py-2.5 bg-gray-50 border-b border-gray-100 text-[12px] font-medium text-gray-700 uppercase">
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
