import { Package, RotateCcw, CreditCard, Headphones } from "lucide-react";
import { Container } from "@/components/commons/container";

const FEATURES = [
  {
    icon: Package,
    title: "Fasted Delivery",
    subtitle: "Delivery in 24/H",
  },
  {
    icon: RotateCcw,
    title: "24 Hours Return",
    subtitle: "100% money-back guarantee",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    subtitle: "Your money is safe",
  },
  {
    icon: Headphones,
    title: "Support 24/7",
    subtitle: "Live contact/message",
  },
] as const;

export function FeaturesBar() {
  return (
    <Container className="pb-6">
      <div className="flex items-center justify-between rounded-md border border-gray-100 bg-white px-4">
        {FEATURES.map(({ icon: Icon, title, subtitle }, i) => (
          <div key={title} className="flex items-center">
            {i > 0 && (
              <div
                className="mx-4 h-14 w-px shrink-0 bg-gray-100"
                aria-hidden
              />
            )}
            <div className="flex items-center gap-4 px-4 py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center text-gray-600">
                <Icon size={28} strokeWidth={1.5} aria-hidden />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-body-sm font-semibold tracking-wide text-gray-900 uppercase">
                  {title}
                </span>
                <span className="text-body-sm text-gray-600">{subtitle}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
