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
    <div className="h-13 -mx-6 -mt-6 px-6 flex items-center border-b border-gray-100 mb-6">
      <span className="text-[14px] font-medium text-gray-900 uppercase tracking-wide">
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

        <div className="flex gap-18 items-start mt-2">
          <DashboardSidebar />

          {/* Main content */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            {/* Account Setting */}
            <div className="bg-white border border-gray-100 rounded-[4px] p-6">
              <SectionHeading>Account Info</SectionHeading>

              {profilePending ? (
                <p className="text-[14px] text-gray-600">Loading...</p>
              ) : (
                <div className="flex gap-8 items-start">
                  {/* Avatar */}
                  <div className="flex-none">
                    <div className="w-24 h-24 rounded-full bg-secondary-100 flex items-center justify-center text-[28px] font-semibold text-secondary-500">
                      {profile?.name?.[0]?.toUpperCase() ?? "?"}
                    </div>
                  </div>

                  {/* Fields */}
                  <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                      <label className="block text-[13px] text-gray-600 mb-1.5">
                        Display name
                      </label>
                      <p className="text-[14px] text-gray-900 h-10 flex items-center">
                        {profile?.name ?? "-"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-600 mb-1.5">
                        Email
                      </label>
                      <p className="text-[14px] text-gray-900 h-10 flex items-center">
                        {profile?.email ?? "-"}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[13px] text-gray-600 mb-1.5">
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
            <div className="bg-white border border-gray-100 rounded-[4px] p-6">
              <div className="-mx-6 -mt-6 mb-6 px-6 h-13 flex items-center justify-between border-b border-gray-100">
                <span className="text-[14px] font-medium text-gray-900 uppercase tracking-wide">
                  Addresses
                </span>
                <AddressFormDialog
                  trigger={
                    <button className="text-[14px] font-semibold text-primary-500 hover:text-primary-600 transition-colors cursor-pointer">
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
                      className="flex items-center justify-between gap-4 border border-gray-100 rounded-[4px] px-4 py-3"
                    >
                      <div className="text-[14px] leading-5">
                        <p className="font-medium text-gray-900 flex items-center gap-2">
                          {address.fullName}
                          {address.isDefault && (
                            <span className="text-[11px] font-semibold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-[2px]">
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
                          <button className="flex-none border-2 border-secondary-100 rounded-[2px] px-4 h-9 text-[13px] font-bold text-secondary-500 uppercase tracking-[0.012em] hover:bg-secondary-50 transition-colors cursor-pointer">
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
            <div className="bg-white border border-gray-100 rounded-[4px] p-6">
              <SectionHeading>Password</SectionHeading>
              <div className="max-w-lg flex flex-col gap-4">
                <p className="text-[14px] text-gray-600 leading-5">
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
                    className="h-11 px-8 bg-primary-500 text-white text-[14px] font-bold uppercase tracking-[0.04em] rounded-[2px] hover:bg-primary-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
