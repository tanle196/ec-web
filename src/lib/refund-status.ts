import type { RefundRequestResponseDto } from "@/api/main";

export type RefundRequestStatus = RefundRequestResponseDto["status"];

export function refundRequestStatusLabel(status: RefundRequestStatus) {
  switch (status) {
    case "pending":
      return "Pending Review";
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
  }
}

export function refundRequestStatusColor(status: RefundRequestStatus) {
  switch (status) {
    case "pending":
      return "text-primary-500";
    case "approved":
      return "text-success-500";
    case "rejected":
      return "text-danger-500";
  }
}
