"use server";

import { SERVER_URL } from "@/lib/constants";
import { HttpError } from "@/types/error.type";
import { User } from "@/types/user";
import { cookies } from "next/headers";

export async function LoadUser() {
  const accessToken = (await cookies()).get("access_token")?.value;
  const response = await fetch(`${SERVER_URL}/user`, {
    headers: {
      Authorization: `Bearer ${accessToken || "nothing"}`,
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) return data as HttpError;

  return data as User;
}
