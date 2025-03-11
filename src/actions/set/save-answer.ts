"use server";

import { HttpError } from "@/types/error.type";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function SaveAnswer(
  setId: string,
  cardId: string,
  isCorrect: boolean,
) {
  const accessToken = (await cookies()).get("access_token")?.value;
  const response = await fetch(
    `${process.env.SERVER_URL}/set/flashcard/save-answer/${cardId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken || "nothing"}`,
      },
      credentials: "include",
      body: JSON.stringify({ isCorrect }),
    },
  );

  if (!response.ok) return (await response.json()) as HttpError;

  revalidatePath(`/flashcard/${setId}`);
}
