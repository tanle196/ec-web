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
      <div className="bg-white border border-gray-100 rounded-md flex items-center justify-between px-4">
        {FEATURES.map(({ icon: Icon, title, subtitle }, i) => (
          <div key={title} className="flex items-center">
            {i > 0 && (
              <div className="w-px h-14 bg-gray-100 shrink-0 mx-4" aria-hidden />
            )}
            <div className="flex items-center gap-4 px-4 py-4">
              <div className="shrink-0 w-10 h-10 flex items-center justify-center text-gray-600">
                <Icon size={28} strokeWidth={1.5} aria-hidden />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-body-sm font-semibold text-gray-900 uppercase tracking-wide">
                  {title}
                </span>
                <span className="text-body-sm text-gray-600">
                  {subtitle}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
