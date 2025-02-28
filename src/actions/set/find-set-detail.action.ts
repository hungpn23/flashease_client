"use server";

import { BASE_URL } from "@/lib/constants";
import { HttpError } from "@/types/error.type";
import { Set } from "@/types/set";
import { cookies } from "next/headers";

export async function findSet(setId: string, path: "library" | "explore") {
  const accessToken = (await cookies()).get("access_token")?.value;
  const response = await fetch(`${BASE_URL}/set/${path}/${setId}`, {
    headers: {
      Authorization: `Bearer ${accessToken || "nothing"}`,
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) return data as HttpError;

  return data as Set;
}
