"use client";

import { useState } from "react";
import { PageBreadcrumb } from "@/components/commons/breadcrumb";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { Container } from "@/components/commons/container";

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M1 9s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M1 1l16 16M7.5 7.6A2.5 2.5 0 0 0 11.4 11.5M5.3 5.4C3.3 6.6 2 9 2 9s3 6 7 6a7 7 0 0 0 3.7-1.1M9 3C14 3 16 9 16 9s-.7 1.4-2 2.7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="pointer-events-none"
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[13px] text-gray-600 mb-1.5">{children}</label>
  );
}

function Input({
  placeholder,
  defaultValue,
  type = "text",
  className = "",
}: {
  placeholder?: string;
  defaultValue?: string;
  type?: string;
  className?: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className={`w-full h-10 border border-gray-200 rounded-[4px] px-3 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary-500 transition-colors bg-white ${className}`}
    />
  );
}

function Select({
  defaultValue,
  children,
}: {
  defaultValue?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        defaultValue={defaultValue}
        className="w-full h-10 border border-gray-200 rounded-[4px] px-3 pr-9 text-[14px] text-gray-900 appearance-none bg-white focus:outline-none focus:border-primary-500 transition-colors cursor-pointer"
      >
        {children}
      </select>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
        <ChevronDown />
      </span>
    </div>
  );
}

function PasswordInput({
  placeholder,
  label,
}: {
  placeholder?: string;
  label: string;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          className="w-full h-10 border-b border-gray-200 px-0 pr-8 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary-500 transition-colors bg-transparent"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          <EyeIcon open={visible} />
        </button>
      </div>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-13 -mx-6 -mt-6 px-6 flex items-center border-b border-gray-100 mb-6">
      <span className="text-[14px] font-medium text-gray-900 uppercase tracking-wide">
        {children}
      </span>
    </div>
  );
}

function SaveButton({ label = "Save Changes" }: { label?: string }) {
  return (
    <button
      type="button"
      className="h-11 px-8 bg-primary-500 text-white text-[14px] font-bold uppercase tracking-[0.04em] rounded-[2px] hover:bg-primary-600 transition-colors cursor-pointer"
    >
      {label}
    </button>
  );
}

function AddressForm() {
  return (
    <div className="flex flex-col gap-4">
      {/* First + Last Name */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>First Name</Label>
          <Input defaultValue="Kevin" />
        </div>
        <div>
          <Label>Last Name</Label>
          <Input defaultValue="Gilbert" />
        </div>
      </div>

      {/* Company Name */}
      <div>
        <Label>Company Name (Optional)</Label>
        <Input />
      </div>

      {/* Address */}
      <div>
        <Label>Address</Label>
        <Input defaultValue="Road No. 13/x, House no. 1320/C, Flat No. 5D" />
      </div>

      {/* Country */}
      <div>
        <Label>Country</Label>
        <Select defaultValue="BD">
          <option value="BD">Bangladesh</option>
          <option value="US">United States</option>
          <option value="UK">United Kingdom</option>
        </Select>
      </div>

      {/* Region/State */}
      <div>
        <Label>Region/State</Label>
        <Select defaultValue="">
          <option value="" disabled>
            Select...
          </option>
          <option value="dhaka">Dhaka</option>
          <option value="chittagong">Chittagong</option>
        </Select>
      </div>

      {/* City + Zip */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>City</Label>
          <Select defaultValue="dhaka">
            <option value="dhaka">Dhaka</option>
            <option value="ctg">Chittagong</option>
          </Select>
        </div>
        <div>
          <Label>Zip Code</Label>
          <Input defaultValue="1207" />
        </div>
      </div>

      {/* Email */}
      <div>
        <Label>Email</Label>
        <Input defaultValue="kevin12345@gmail.com" type="email" />
      </div>

      {/* Phone */}
      <div>
        <Label>Phone Number</Label>
        <Input defaultValue="+1-202-555-0118" type="tel" />
      </div>

      <SaveButton />
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-6 pb-20">
        <PageBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "User Account", href: "/account" },
            { label: "Setting" },
          ]}
        />

        <div className="flex gap-18 items-start mt-2">
          <DashboardSidebar />

          {/* Main content */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            {/* Account Setting */}
            <div className="bg-white border border-gray-100 rounded-[4px] p-6">
              <SectionHeading>Account Setting</SectionHeading>

              <div className="flex gap-8 items-start">
                {/* Avatar */}
                <div className="flex-none">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/user-avatar-placeholder"
                    alt="Kevin Gilbert"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/96/2DA5F3/white?text=KG";
                    }}
                    className="w-24 h-24 rounded-full object-cover bg-secondary-100"
                  />
                </div>

                {/* Fields */}
                <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <Label>Display name</Label>
                    <Input defaultValue="Kevin" />
                  </div>
                  <div>
                    <Label>Username</Label>
                    <Input placeholder="Display name" />
                  </div>
                  <div>
                    <Label>Full Name</Label>
                    <Input defaultValue="Kevin Gilbert" />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      defaultValue="Kevin.gilbert@gmail.com"
                      type="email"
                    />
                  </div>
                  <div>
                    <Label>Secondary Email</Label>
                    <Input defaultValue="kevin12345@gmail.com" type="email" />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input defaultValue="+1-202-555-0118" type="tel" />
                  </div>
                  <div>
                    <Label>Country/Region</Label>
                    <Select defaultValue="BD">
                      <option value="BD">Bangladesh</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>States</Label>
                      <Select defaultValue="dhaka">
                        <option value="dhaka">Dhaka</option>
                        <option value="ctg">Chittagong</option>
                      </Select>
                    </div>
                    <div>
                      <Label>Zip Code</Label>
                      <Input defaultValue="1207" />
                    </div>
                  </div>

                  <div className="col-span-2">
                    <SaveButton />
                  </div>
                </div>
              </div>
            </div>

            {/* Billing + Shipping Address */}
            <div className="flex gap-6">
              <div className="flex-1 bg-white border border-gray-100 rounded-[4px] p-6">
                <SectionHeading>Billing Address</SectionHeading>
                <AddressForm />
              </div>
              <div className="flex-1 bg-white border border-gray-100 rounded-[4px] p-6">
                <SectionHeading>Shipping Address</SectionHeading>
                <AddressForm />
              </div>
            </div>

            {/* Change Password */}
            <div className="bg-white border border-gray-100 rounded-[4px] p-6">
              <SectionHeading>Change Password</SectionHeading>
              <div className="max-w-lg flex flex-col gap-6">
                <PasswordInput label="Current Password" />
                <PasswordInput
                  label="New Password"
                  placeholder="6+ characters"
                />
                <PasswordInput label="Confirm Password" />
                <div>
                  <SaveButton label="Change Password" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
