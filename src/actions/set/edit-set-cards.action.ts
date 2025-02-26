"use server";

import { BASE_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import { TEditCardsInput, TEditCardsState, TSet } from "@/types/data/set.type";
import { revalidatePath } from "next/cache";

export async function editSetCards(
  previousState: TEditCardsState,
  formData: FormData,
) {
  const input: TEditCardsInput = {
    id: formData.get("id") as string,
    cards: JSON.parse(formData.get("cards") as string),
  };
  const accessToken = (await cookies()).get("access_token")?.value;

  const response = await fetch(`${BASE_URL}/set/${input.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken || "nothing"}`,
    },
    credentials: "include",
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    return {
      input: previousState.input,
      error: await response.json(),
    } as TEditCardsState;
  }

  const set: TSet = await response.json();

  revalidatePath(`/my-set/${set.id}`);

  return {
    input,
    error: undefined,
  } as TEditCardsState;
}
