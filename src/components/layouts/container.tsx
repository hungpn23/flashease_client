import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={cn(
        "container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8",
        className,
      )}
    >
      {children}
    </main>
  );
}
