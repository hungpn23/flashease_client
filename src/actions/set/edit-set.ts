"use server";

import { BASE_URL, VisibleTo } from "@/lib/constants";
import { cookies } from "next/headers";
import { EditSetInput, EditSetState } from "@/types/set/edit-set.type";
import { revalidatePath } from "next/cache";

export async function editSetAction(
  setId: string,
  previousState: EditSetState,
  formData: FormData,
) {
  const input: EditSetInput = {
    name: formData.get("name") as string,
    description: formData.get("description") as string | undefined,
    visibleTo: formData.get("visibleTo") as VisibleTo,
    passcode: formData.get("passcode") as string,
    cards: JSON.parse(formData.get("cards") as string),
  };

  const accessToken = (await cookies()).get("access_token")?.value;
  const response = await fetch(`${BASE_URL}/set/edit-set/${setId}`, {
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
      success: false,
    } as EditSetState;
  }

  revalidatePath("/library");

  return {
    input: await response.json(),
    error: undefined,
    success: true,
  } as EditSetState;
}
