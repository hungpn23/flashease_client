"use server";

import { BASE_URL } from "@/lib/constants";
import { User } from "@/types/data/user.type";
import { HttpError } from "@/types/error.type";
import { cookies } from "next/headers";

export async function findUser() {
  const accessToken = (await cookies()).get("access_token")?.value;
  const response = await fetch(`${BASE_URL}/user`, {
    headers: {
      Authorization: `Bearer ${accessToken || "nothing"}`,
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) return data as HttpError;

  return data as User;
}
