"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({
  href,
  children,
  className,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        `mr-4 text-base font-medium last:mr-4 hover:underline hover:underline-offset-4 ${
          pathname === href ? "underline underline-offset-4" : ""
        }`,
        className,
      )}
    >
      {children}
    </Link>
  );
}
