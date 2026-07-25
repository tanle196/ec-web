import { cn } from "@/lib/utils";

export function Container({
  fluid = false,
  size = "default",
  className,
  children,
}: {
  fluid?: boolean;
  size?: "default" | "wide";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        size === "wide" ? "px-16" : "px-4 lg:px-8 py-4",
        !fluid && (size === "wide" ? "max-w-360" : "max-w-330"),
        className,
      )}
    >
      {children}
    </div>
  );
}
