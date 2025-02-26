import { TErrorDetail } from "@/types/error.type";

export function showErrorBorder(
  details: TErrorDetail[],
  inputProperty: string,
) {
  return details.some(({ property }) => property === inputProperty)
    ? "border-red-500 focus-visible:ring-red-500"
    : "";
}
