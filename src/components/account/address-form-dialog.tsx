"use client";

import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateAddress, useUpdateAddress } from "@/queries/addresses";
import type { AddressResponseDto, CreateAddressDto } from "@/api/main";

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="block text-[13px] text-gray-600 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full h-10 border border-gray-200 rounded-[4px] px-3 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary-500 transition-colors bg-white";

type FormState = {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
};

function toFormState(address?: AddressResponseDto): FormState {
  return {
    fullName: address?.fullName ?? "",
    phone: address?.phone ?? "",
    addressLine1: address?.addressLine1 ?? "",
    addressLine2:
      typeof address?.addressLine2 === "string" ? address.addressLine2 : "",
    city: address?.city ?? "",
    province: address?.province ?? "",
    country: address?.country ?? "Vietnam",
    postalCode:
      typeof address?.postalCode === "string" ? address.postalCode : "",
    isDefault: address?.isDefault ?? false,
  };
}

export function AddressFormDialog({
  address,
  trigger,
}: {
  address?: AddressResponseDto;
  trigger: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(() => toFormState(address));
  const createAddress = useCreateAddress();
  const updateAddress = useUpdateAddress();

  const isEdit = !!address;
  const isSaving = createAddress.isPending || updateAddress.isPending;

  function handleOpenChange(next: boolean) {
    if (next) setForm(toFormState(address));
    setOpen(next);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body: CreateAddressDto = {
      fullName: form.fullName,
      phone: form.phone,
      addressLine1: form.addressLine1,
      addressLine2: form.addressLine2 || undefined,
      city: form.city,
      province: form.province,
      country: form.country || undefined,
      postalCode: form.postalCode || undefined,
      isDefault: form.isDefault,
    };

    const mutation = isEdit
      ? updateAddress.mutateAsync({ id: address!.id, body })
      : createAddress.mutateAsync(body);

    mutation.then(() => setOpen(false));
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Address" : "Add Address"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Full Name">
              <input
                required
                className={inputClass}
                value={form.fullName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, fullName: e.target.value }))
                }
              />
            </Field>
            <Field label="Phone Number">
              <input
                required
                type="tel"
                className={inputClass}
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
              />
            </Field>
          </div>
          <Field label="Address Line 1">
            <input
              required
              className={inputClass}
              value={form.addressLine1}
              onChange={(e) =>
                setForm((f) => ({ ...f, addressLine1: e.target.value }))
              }
            />
          </Field>
          <Field label="Address Line 2 (Optional)">
            <input
              className={inputClass}
              value={form.addressLine2}
              onChange={(e) =>
                setForm((f) => ({ ...f, addressLine2: e.target.value }))
              }
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="City">
              <input
                required
                className={inputClass}
                value={form.city}
                onChange={(e) =>
                  setForm((f) => ({ ...f, city: e.target.value }))
                }
              />
            </Field>
            <Field label="Province/State">
              <input
                required
                className={inputClass}
                value={form.province}
                onChange={(e) =>
                  setForm((f) => ({ ...f, province: e.target.value }))
                }
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Country">
              <input
                className={inputClass}
                value={form.country}
                onChange={(e) =>
                  setForm((f) => ({ ...f, country: e.target.value }))
                }
              />
            </Field>
            <Field label="Zip/Postal Code">
              <input
                className={inputClass}
                value={form.postalCode}
                onChange={(e) =>
                  setForm((f) => ({ ...f, postalCode: e.target.value }))
                }
              />
            </Field>
          </div>
          <label className="flex items-center gap-2 text-[14px] text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(e) =>
                setForm((f) => ({ ...f, isDefault: e.target.checked }))
              }
            />
            Set as default address
          </label>
          <button
            type="submit"
            disabled={isSaving}
            className="h-11 px-8 bg-primary-500 text-white text-[14px] font-bold uppercase tracking-[0.04em] rounded-[2px] hover:bg-primary-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed self-start"
          >
            {isSaving ? "Saving..." : "Save Address"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
