"use server";

import { SERVER_URL } from "@/lib/constants";
import { HttpError } from "@/types/error.type";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function ResetFlashcard(setId: string) {
  const accessToken = (await cookies()).get("access_token")?.value;
  const response = await fetch(`${SERVER_URL}/set/flashcard/reset/${setId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken || "nothing"}`,
    },
    credentials: "include",
  });

  if (!response.ok) return (await response.json()) as HttpError;

  revalidatePath(`/library/${setId}`);
}
