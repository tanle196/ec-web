import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export type BreadcrumbSegment = {
  label: string;
  href?: string;
};

export function PageBreadcrumb({ items }: { items: BreadcrumbSegment[] }) {
  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList className="text-[13px] text-gray-500 gap-1">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <BreadcrumbItem key={i}>
              {isLast || !item.href ? (
                <BreadcrumbPage className="font-medium text-gray-900 max-w-75 truncate">
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.href} className="hover:text-gray-900 transition-colors no-underline">
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              )}
              {!isLast && <BreadcrumbSeparator className="text-gray-300" />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
