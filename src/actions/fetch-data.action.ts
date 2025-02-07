"use server";

import { BASE_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import type { HttpErrorType } from "@/types/error.type";
import type { UserType } from "@/types/data.type";

export async function getUser() {
  const accessToken = (await cookies()).get("access_token")?.value;
  const response = await fetch(`${BASE_URL}/user`, {
    headers: {
      Authorization: `Bearer ${accessToken || "nothing"}`,
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) return data as HttpErrorType;

  return data as UserType;
}
