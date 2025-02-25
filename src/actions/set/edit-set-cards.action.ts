"use server";

import { BASE_URL } from "@/lib/constants";
import { cookies } from "next/headers";
import {
  EditSetCardsInputType,
  EditSetCardsStateType,
  SetType,
} from "@/types/data/set.type";
import { revalidatePath } from "next/cache";
import { error } from "console";

export async function editSetCards(
  previousState: EditSetCardsStateType,
  formData: FormData,
) {
  const input: EditSetCardsInputType = {
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
    } as EditSetCardsStateType;
  }

  const set: SetType = await response.json();

  revalidatePath(`/my-set/${set.id}`);

  return {
    input,
    error: undefined,
  } as EditSetCardsStateType;
}
