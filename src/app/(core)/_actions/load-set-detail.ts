"use server";

import { SERVER_URL } from "@/lib/constants";
import { HttpError } from "@/types/error.type";
import { SetDetail } from "@/types/data/set";
import { cookies } from "next/headers";

export async function LoadSetDetail(setId: string) {
  const accessToken = (await cookies()).get("access_token")?.value;
  const response = await fetch(`${SERVER_URL}/set/flashcard/${setId}`, {
    headers: {
      Authorization: `Bearer ${accessToken || "nothing"}`,
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) return data as HttpError;

  return data as SetDetail;
}
