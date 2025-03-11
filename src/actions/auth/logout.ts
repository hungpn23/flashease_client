"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function Logout() {
  const cookieStore = await cookies();

  const response = await fetch(`${process.env.SERVER_URL}/auth/logout`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${cookieStore.get("access_token")?.value}`,
    },
    credentials: "include",
  });

  if (!response.ok) redirect("/");

  cookieStore.delete("access_token");

  redirect("/login");
}
