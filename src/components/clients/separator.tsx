import { cn } from "@/lib/utils";

export function Separator({
  direction = "vertical",
  className,
}: {
  direction?: "horizontal" | "vertical";
  className?: string;
}) {
  return direction === "vertical" ? (
    <span className={cn("h-4 w-px bg-border", className)} />
  ) : (
    <span className={cn("h-px w-4 bg-border", className)} />
  );
}
