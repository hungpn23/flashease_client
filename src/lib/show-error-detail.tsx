import { TErrorDetail } from "@/types/error.type";

export function showErrorDetail(
  details: TErrorDetail[],
  inputProperty: string,
) {
  return details.map(({ property, code, message }) => {
    if (property === inputProperty) {
      return (
        <span key={code} className="ml-4 text-sm text-red-500">
          - {message}
        </span>
      );
    }
  });
}
