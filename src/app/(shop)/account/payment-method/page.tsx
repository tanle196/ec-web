"use client";

import { PageBreadcrumb } from "@/components/commons/breadcrumb";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { Container } from "@/components/commons/container";
import { useMyPayments } from "@/queries/payments";
import { formatCurrency, formatDate } from "@/lib/utils";
import { PAYMENT_METHOD_LABEL, paymentStatusLabel } from "@/lib/payment-status";

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

        <div className="mt-2 flex items-start gap-18">
          <DashboardSidebar />

          {/* Main content */}
          <div className="flex min-w-0 flex-1 flex-col gap-6">
            {/* Payment History */}
            <div className="rounded-[4px] border border-gray-100 bg-white">
              {/* Section header */}
              <div className="flex h-13 items-center justify-between border-b border-gray-100 px-6">
                <span className="text-[14px] font-medium tracking-wide text-gray-900 uppercase">
                  Payment History
                </span>
              </div>

              {/* Cards */}
              <div className="flex flex-wrap gap-6 px-6 py-6">
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
                    className="relative h-[196px] w-[296px] flex-none overflow-hidden rounded-[4px]"
                    style={{ background: GRADIENTS[i % GRADIENTS.length] }}
                  >
                    <div className="absolute top-6 left-6">
                      <p className="text-[16px] leading-6 text-white">
                        <span className="font-semibold">
                          {formatCurrency(payment.amount)}
                        </span>
                      </p>
                    </div>
                    <div className="absolute top-[72px] left-6 flex flex-col gap-2">
                      <p className="text-[11px] font-medium tracking-widest text-white uppercase opacity-70">
                        Method
                      </p>
                      <p className="text-[18px] font-normal tracking-wide text-white">
                        {PAYMENT_METHOD_LABEL[payment.method]}
                      </p>
                    </div>
                    <div className="absolute bottom-6 left-6">
                      <span
                        className={`text-[13px] font-bold tracking-widest text-white uppercase`}
                      >
                        {paymentStatusLabel(payment.status)}
                      </span>
                    </div>
                    <div className="absolute right-6 bottom-6">
                      <p className="text-[12px] text-white opacity-80">
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
