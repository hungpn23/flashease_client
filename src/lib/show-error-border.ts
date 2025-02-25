import { ErrorDetailType } from "@/types/error.type";

export function showErrorBorder(
  details: ErrorDetailType[],
  inputProperty: string,
) {
  return details.some(({ property }) => property === inputProperty)
    ? "border-red-500 focus-visible:ring-red-500"
    : "";
}
