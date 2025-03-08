import { ErrorDetail } from "@/types/error.type";

export function showErrorDetail(details: ErrorDetail[], inputProperty: string) {
  return details.map(({ property, code, message }) => {
    if (property === inputProperty) {
      return (
        <div key={code} className="text-[0.8rem] font-medium text-destructive">
          {message}
        </div>
      );
    }
  });
}
