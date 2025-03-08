"use client";

import { Logout } from "@/actions/auth/logout";
import { useTransition } from "react";

export function LogoutBtn() {
  const [isPending, startTransition] = useTransition();
  const onLogout = () => {
    startTransition(() => {
      Logout();
    });
  };

  return (
    <button
      disabled={isPending}
      onClick={onLogout}
      className="mr-4 text-base font-medium last:mr-4 hover:underline hover:underline-offset-4"
    >
      Logout
    </button>
  );
}
