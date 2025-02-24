"use server";

import { BASE_URL } from "@/lib/constants";
import { SetDetailType } from "@/types/data/set.type";
import { HttpErrorType } from "@/types/error.type";
import { cookies } from "next/headers";

export async function findSetDetail(id: string, path: "my-set" | "public") {
  const accessToken = (await cookies()).get("access_token")?.value;
  const response = await fetch(`${BASE_URL}/set/${path}/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken || "nothing"}`,
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) return data as HttpErrorType;

  return data as SetDetailType;
}
