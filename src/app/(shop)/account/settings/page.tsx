"use client";

import { useState } from "react";
import { PageBreadcrumb } from "@/components/commons/breadcrumb";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { Container } from "@/components/commons/container";
import { AddressFormDialog } from "@/components/account/address-form-dialog";
import { useGetProfile, useForgotPassword } from "@/queries/auth";
import { useAddresses } from "@/queries/addresses";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mx-6 -mt-6 mb-6 flex h-13 items-center border-b border-gray-100 px-6">
      <span className="text-[14px] font-medium tracking-wide text-gray-900 uppercase">
        {children}
      </span>
    </div>
  );
}

export default function SettingsPage() {
  const { data: profile, isPending: profilePending } = useGetProfile();
  const { data: addresses } = useAddresses();
  const forgotPassword = useForgotPassword();
  const [resetSent, setResetSent] = useState(false);

  function handleSendResetLink() {
    if (!profile?.email) return;
    forgotPassword.mutate(
      { email: profile.email },
      { onSuccess: () => setResetSent(true) },
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-6 pb-20">
        <PageBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Account", href: "/account" },
            { label: "Setting" },
          ]}
        />

        <div className="mt-2 flex items-start gap-18">
          <DashboardSidebar />

          {/* Main content */}
          <div className="flex min-w-0 flex-1 flex-col gap-6">
            {/* Account Setting */}
            <div className="rounded-[4px] border border-gray-100 bg-white p-6">
              <SectionHeading>Account Info</SectionHeading>

              {profilePending ? (
                <p className="text-[14px] text-gray-600">Loading...</p>
              ) : (
                <div className="flex items-start gap-8">
                  {/* Avatar */}
                  <div className="flex-none">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary-100 text-[28px] font-semibold text-secondary-500">
                      {profile?.name?.[0]?.toUpperCase() ?? "?"}
                    </div>
                  </div>

                  {/* Fields */}
                  <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                      <label className="mb-1.5 block text-[13px] text-gray-600">
                        Display name
                      </label>
                      <p className="flex h-10 items-center text-[14px] text-gray-900">
                        {profile?.name ?? "-"}
                      </p>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[13px] text-gray-600">
                        Email
                      </label>
                      <p className="flex h-10 items-center text-[14px] text-gray-900">
                        {profile?.email ?? "-"}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <label className="mb-1.5 block text-[13px] text-gray-600">
                        Roles
                      </label>
                      <p className="text-[14px] text-gray-900">
                        {profile?.roles?.length
                          ? profile.roles.join(", ")
                          : "-"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Addresses */}
            <div className="rounded-[4px] border border-gray-100 bg-white p-6">
              <div className="-mx-6 -mt-6 mb-6 flex h-13 items-center justify-between border-b border-gray-100 px-6">
                <span className="text-[14px] font-medium tracking-wide text-gray-900 uppercase">
                  Addresses
                </span>
                <AddressFormDialog
                  trigger={
                    <button className="cursor-pointer text-[14px] font-semibold text-primary-500 transition-colors hover:text-primary-600">
                      Add Address
                    </button>
                  }
                />
              </div>

              {!addresses || addresses.length === 0 ? (
                <p className="text-[14px] text-gray-600">
                  You haven&apos;t added any address yet.
                </p>
              ) : (
                <div className="flex flex-col gap-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className="flex items-center justify-between gap-4 rounded-[4px] border border-gray-100 px-4 py-3"
                    >
                      <div className="text-[14px] leading-5">
                        <p className="flex items-center gap-2 font-medium text-gray-900">
                          {address.fullName}
                          {address.isDefault && (
                            <span className="rounded-[2px] bg-primary-50 px-2 py-0.5 text-[11px] font-semibold text-primary-500">
                              Default
                            </span>
                          )}
                        </p>
                        <p className="text-gray-600">
                          {address.addressLine1}
                          {address.addressLine2
                            ? `, ${address.addressLine2}`
                            : ""}
                          , {address.city}, {address.province},{" "}
                          {address.country}
                        </p>
                        <p className="text-gray-600">
                          Phone Number: {address.phone}
                        </p>
                      </div>
                      <AddressFormDialog
                        address={address}
                        trigger={
                          <button className="h-9 flex-none cursor-pointer rounded-[2px] border-2 border-secondary-100 px-4 text-[13px] font-bold tracking-[0.012em] text-secondary-500 uppercase transition-colors hover:bg-secondary-50">
                            Edit
                          </button>
                        }
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Reset Password */}
            <div className="rounded-[4px] border border-gray-100 bg-white p-6">
              <SectionHeading>Password</SectionHeading>
              <div className="flex max-w-lg flex-col gap-4">
                <p className="text-[14px] leading-5 text-gray-600">
                  We&apos;ll send a password reset link to{" "}
                  <span className="font-medium text-gray-900">
                    {profile?.email ?? "your email"}
                  </span>
                  .
                </p>
                <div>
                  <button
                    type="button"
                    onClick={handleSendResetLink}
                    disabled={forgotPassword.isPending || !profile?.email}
                    className="h-11 cursor-pointer rounded-[2px] bg-primary-500 px-8 text-[14px] font-bold tracking-[0.04em] text-white uppercase transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {forgotPassword.isPending
                      ? "Sending..."
                      : "Send Reset Link"}
                  </button>
                </div>
                {resetSent && (
                  <p className="text-[13px] text-success-500">
                    Reset link sent. Please check your inbox.
                  </p>
                )}
                {forgotPassword.isError && (
                  <p className="text-[13px] text-danger-500">
                    Something went wrong. Please try again.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
