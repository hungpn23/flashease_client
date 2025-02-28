import { ErrorDetail } from "@/types/error.type";

export function showErrorBorder(details: ErrorDetail[], inputProperty: string) {
  return details.some(({ property }) => property === inputProperty)
    ? "border-destructive focus-visible:ring-destructive"
    : "";
}
