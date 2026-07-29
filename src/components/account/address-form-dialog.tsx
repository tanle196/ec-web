"use client";

import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateAddress, useUpdateAddress } from "@/queries/addresses";
import type { AddressResponseDto, CreateAddressDto } from "@/api/main";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="block text-[13px] text-gray-600 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-[12px] text-red-600">{message}</p>;
}

const inputClass =
  "w-full h-10 border border-gray-200 rounded-[4px] px-3 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary-500 transition-colors bg-white";

const addressSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phone: z.string().min(1, "Phone number is required"),
  addressLine1: z.string().min(1, "Address is required"),
  addressLine2: z.string(),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province/State is required"),
  country: z.string(),
  postalCode: z.string(),
  isDefault: z.boolean(),
});

type AddressFormValues = z.infer<typeof addressSchema>;

function toFormValues(address?: AddressResponseDto): AddressFormValues {
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
  const createAddress = useCreateAddress();
  const updateAddress = useUpdateAddress();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: toFormValues(address),
  });

  const isEdit = !!address;
  const isSaving = createAddress.isPending || updateAddress.isPending;

  function handleOpenChange(next: boolean) {
    if (next) reset(toFormValues(address));
    setOpen(next);
  }

  const onSubmit = handleSubmit((values) => {
    const body: CreateAddressDto = {
      fullName: values.fullName,
      phone: values.phone,
      addressLine1: values.addressLine1,
      addressLine2: values.addressLine2 || undefined,
      city: values.city,
      province: values.province,
      country: values.country || undefined,
      postalCode: values.postalCode || undefined,
      isDefault: values.isDefault,
    };

    const mutation = isEdit
      ? updateAddress.mutateAsync({ id: address!.id, body })
      : createAddress.mutateAsync(body);

    mutation.then(() => setOpen(false));
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Address" : "Add Address"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Full Name">
              <input className={inputClass} {...register("fullName")} />
              <FieldError message={errors.fullName?.message} />
            </Field>
            <Field label="Phone Number">
              <input type="tel" className={inputClass} {...register("phone")} />
              <FieldError message={errors.phone?.message} />
            </Field>
          </div>
          <Field label="Address Line 1">
            <input className={inputClass} {...register("addressLine1")} />
            <FieldError message={errors.addressLine1?.message} />
          </Field>
          <Field label="Address Line 2 (Optional)">
            <input className={inputClass} {...register("addressLine2")} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="City">
              <input className={inputClass} {...register("city")} />
              <FieldError message={errors.city?.message} />
            </Field>
            <Field label="Province/State">
              <input className={inputClass} {...register("province")} />
              <FieldError message={errors.province?.message} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Country">
              <input className={inputClass} {...register("country")} />
            </Field>
            <Field label="Zip/Postal Code">
              <input className={inputClass} {...register("postalCode")} />
            </Field>
          </div>
          <label className="flex items-center gap-2 text-[14px] text-gray-700 cursor-pointer">
            <input type="checkbox" {...register("isDefault")} />
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
