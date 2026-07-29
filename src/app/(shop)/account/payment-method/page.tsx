"use client";

import { PageBreadcrumb } from "@/components/commons/breadcrumb";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { Container } from "@/components/commons/container";
import { useMyPayments } from "@/queries/payments";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { PaymentResponseDto } from "@/api/main";

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

export default function PaymentMethodPage() {
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
            { label: "Payment Method" },
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
          </div>
        </div>
      </Container>
    </div>
  );
}
