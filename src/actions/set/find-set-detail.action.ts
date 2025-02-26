"use server";

import { BASE_URL } from "@/lib/constants";
import { TSetDetail } from "@/types/data/set.type";
import { THttpError } from "@/types/error.type";
import { cookies } from "next/headers";

export async function findSetDetail(setId: string, path: "my-set" | "public") {
  const accessToken = (await cookies()).get("access_token")?.value;
  const response = await fetch(`${BASE_URL}/set/${path}/${setId}`, {
    headers: {
      Authorization: `Bearer ${accessToken || "nothing"}`,
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) return data as THttpError;

  return data as TSetDetail;
}
