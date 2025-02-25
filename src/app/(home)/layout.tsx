"use client";

import { Container } from "@/components/layouts/container";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.includes(path)
      ? "border-b-2 border-primary text-link "
      : "";
  };

  return (
    <Container className="flex flex-col gap-8 border-2">
      <nav>
        <ul className="grid grid-cols-3 text-center">
          <li>
            <Link
              href="/my-set"
              className={`block py-2 ${isActive("/my-set")}`}
            >
              My Set
            </Link>
          </li>
          <li>
            <Link
              href="/my-progress"
              className={`block py-2 ${isActive("/my-progress")}`}
            >
              My Progress
            </Link>
          </li>
          <li>
            <Link
              href="/explore"
              className={`block py-2 ${isActive("/explore")}`}
            >
              Explore
            </Link>
          </li>
        </ul>
      </nav>

      {children}
    </Container>
  );
}
